/**
 * 非玛吉斯商品管理页面
 * 出售中， 仓库中， 审核中
 * 公共页面查询， 初始化数据方法
 */
import {
  listItemInfoByPage,
  listItemCategory,
  listItemLabel,
  listItemBrand
} from "@/api/product/manage";

export default {

  data() {
    return {
      // 商品分类下拉框数据
      "itemCategoryOptions": [],
      // 商品标签下拉框数据
      "itemLabelRefOptions": [],
      // 商品品牌下拉框数据
      "itemBrandOptions": [],
      "tableLoading": false,
      "searchData": {
        // 非玛吉斯商品
        "itemType": 2,
        "categoryType": 2,
        // 商品名称或编码 (模糊)
        "itemKeyword": "",
        // 商品类别编码
        "categoryNo": "",
        // 商品标签编码
        "labelNo": "",
        // 商品品牌编码
        "brandNo": "",
        "pageNum": 1,
        "pageSize": 10
      },
      "total": 0,
      "tableData": []
    };
  },
  "methods": {
    searchButtonClick() {
      this.searchData.pageNum = 1;
      this.listTableData();
    },
    /**
     * 初始化所有下拉框
     * @returns {Promise<void>}
     */
    async initPageOptions() {
      await this.getItemCategoryOptions();
      await this.getItemLabelOptions();
      await this.getItemBrandOptions();
    },
    /**
     * 获取页面数据
     */
    listTableData() {
      this.tableLoading = true;
      listItemInfoByPage(this.$jsonFormat(this.searchData)).then((result) => {
        if (result.code === 200) {
          this.tableData = result.data.records.map(item => {
            item.storeCount = item.storeCount ? item.storeCount : 0 + "家";
            return item;
          });
          this.total = result.data.total;
          this.searchData.pageSize = result.data.size;
          this.searchData.pageNum = result.data.pages;
        } else {
          this.$message.error(result.msg);
        }
      }).finally(() => { this.tableLoading = false; });
    },
    /**
     * 获取商品分类下拉狂选项
     * @returns {Promise<void>}
     */
    async getItemCategoryOptions() {
      const result = await listItemCategory(this.$jsonFormat({
        "categoryType": this.searchData.categoryType,
        "keyword": ""
      }));
      if (result.code === 200) {
        this.itemCategoryOptions = result.data;
      } else {
        this.$message.error(result.msg);
      }
    },
    /**
     * 获取商品标签下拉框选项
     * @returns {Promise<void>}
     */
    async getItemLabelOptions() {
      const result = await listItemLabel({ "request": { "pageNum": 1, "pageSize": -1 } });
      console.log(result);
      if (result.code === 200) {
        this.itemLabelRefOptions = result.data.records;
      } else {
        this.$message.error(result.msg);
      }
    },
    /**
     * 获取商品品牌下拉框选项
     * @returns {Promise<void>}
     */
    async getItemBrandOptions() {
      const result = await listItemBrand();
      if (result.code === 200) {
        this.itemBrandOptions = result.data;
      } else {
        this.$message.error(result.msg);
      }
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.searchData.pageSize = val;
      this.listTableData();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.searchData.pageNum = val;
      this.listTableData();
    }
  }
};
