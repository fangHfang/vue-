import { pageSearchOrderPresellList } from "@/api/product/orderPresell";
import {
  listItemCategory,
  listItemLabel,
  listItemBrand
} from "@/api/product/manage";
export default {
  "name": "OutStock",
  "components": {
  },
  data() {
    return {
      // 商品分类下拉框数据
      "itemCategoryOptions": [],
      // 商品标签下拉框数据
      "itemLabelRefOptions": [],
      // 商品品牌下拉框数据
      "itemBrandOptions": [],
      "toolBar": {
        "storeKey": "",
        "date": "",
        "orderNo": "",
        "specification": "",
        "dealer": "",
        "state": {
          "value": "",
          "options": [
            { "label": "是", "value": "1" },
            { "label": "否", "value": "0" }
          ]
        },
        "brand": "",
        "category": "",
        "label": "",
        "itemName": ""
      },
      "tableData": [],
      "tableLoading": false,
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "dialogVisible": false
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.listOrderPresellByPage();
    this.initPageOptions();
  },
  "methods": {

    searchTableData() {
      this.pagination.current = 1;
      this.listOrderPresellByPage();
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.size = val;
      this.listOrderPresellByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.listOrderPresellByPage();
    },
    /**
     * 分页查询数据
     * @param clear 是否清空
     */
    listOrderPresellByPage() {
      // 加载遮罩
      this.tableLoading = true;
      // 入参
      const params = {
        "pageReq.pageNum": this.pagination.current,
        "pageReq.pageSize": this.pagination.size,
        "presellStatus": this.toolBar.state.value,
        "goodsTime": this.toolBar.date ? this.$moment(this.toolBar.date).format("yyyy-MM-DD HH:mm:ss") : "",
        "orderNo": this.toolBar.orderNo,
        "itemSpecDetail": this.toolBar.specification,
        "itemBrand": this.toolBar.brand,
        "itemLabel": this.toolBar.label,
        "itemCategoryBackendNo": this.toolBar.category,
        "itemName": this.toolBar.itemName,
        "storeNo": this.toolBar.storeKey,
        "dealerNo": this.toolBar.dealerKey
      };
      // 序号
      const totalIndex = this.pagination.size * (this.pagination.current - 1) + 1;
      // 接口调用
      pageSearchOrderPresellList(params).then(res => {
        if (res.code === 200) {
          res.data.records.forEach((element, index) => {
            element.index = totalIndex + index;
          });
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
        this.tableLoading = false;
      }).catch((error) => {
        console.info(error);
        this.tableLoading = false;
      });
    },
    /**
     * 重置
     * @returns {Promise<void>}
     */
    resetOrderPresellSearch() {
      this.$refs.store.cleanStore();
      this.$refs.dealer.cleanDealer();
      this.toolBar.storeKey = "";
      this.toolBar.state.value = "";
      this.toolBar.date = "";
      this.toolBar.orderNo = "";
      this.toolBar.specification = "";
      this.toolBar.dealerKey = "";
      this.toolBar.brand = "";
      this.toolBar.label = "";
      this.toolBar.category = "";
      this.toolBar.itemName = "";
      this.pagination.current = 1;
      this.listOrderPresellByPage();
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
     * 获取商品分类下拉狂选项
     * @returns {Promise<void>}
     */
    async getItemCategoryOptions() {
      const result = await listItemCategory(this.$jsonFormat({
        "categoryType": "2",
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
     * 选择门店
     */
    storeChange(val) {
      this.toolBar.storeKey = val;
    },

    /**
     * 选择经销商
     */
    dealerChange(val) {
      this.toolBar.dealerKey = val;
    }
  }
};
