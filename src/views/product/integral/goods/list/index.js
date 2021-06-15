import {
  pageSearchIntegralGoodList,
  updateSaleStatus,
  delIntegralItemInfo
} from "@/api/product/integral/goods";
import {
  listItemBrand,
  listItemCategorySelectShow,
  listItemLabel
} from "@/api/product/manage";
export default {
  "name": "ProductIntegralGoodsList",
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
        "name": "",
        "brand": "",
        "category": "",
        "spec": "",
        "label": "",
        "itemNo": ""
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "tableLoading": false,
      "multipleSelection": []
    };
  },
  mounted() {
    this.initPageOptions();
    this.listIntegralGoodByPage();
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  "methods": {
    /**
     * 搜索
     */
    searchDataPage() {
      this.pagination.current = 1;
      this.listIntegralGoodByPage();
    },
    /**
     * 删除
     * @param row
     */
    deleteOne(row) {
      this.$confirm("确认删除吗？", "提示", {
        "confirmButtonText": "确认",
        "cancelButtonText": "取消",
        "type": "warning"
      }).then(() => {
        const params = {
          "itemNo": row.itemNo
        };
        delIntegralItemInfo(this.$jsonFormat(params)).then(res => {
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.listIntegralGoodByPage();
          } else {
            this.$message.error(res.msg);
          }
        }).catch(error => {
          this.$message.error(error.msg);
        });
      }).catch(() => {});
    },
    /**
     * 编辑
     * @param row
     */
    toEdit(row) {
      this.$router.push({ "path": "/product/integral/goods/edit/" + row.itemNo });
    },
    /**
     * 详情
     * @param row
     */
    toDetail(row) {
      this.$router.push({ "path": "/product/integral/goods/detail/" + row.itemNo });
    },
    /**
     * 变更上下架状态
     * @param status 需要上下架状态 0下架 1上架
     */
    modifySaleStatus(status) {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length < 1) {
        this.$message.info("请至少选中一条数据！");
        return;
      }
      const len = multipleSelection.length - 1;
      multipleSelection.forEach((element, index) => {
        const params = {
          "itemNo": element.itemNo,
          "saleStatus": status
        };
        updateSaleStatus(params).then(res => {
          if (len === index) {
            if (res.code === 200) {
              if (status === 1) {
                if (element.saleStatus === 0) {
                  this.$message.success("上架成功");
                }
              } else {
                if (element.saleStatus === 1) {
                  this.$message.success("下架成功");
                }
              }
              this.listIntegralGoodByPage();
            } else {
              this.$message.error(res.msg);
            }
          }
        }).catch(error => {
          this.$message.error(error.msg);
        });
      });
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listIntegralGoodByPage();
    },
    /**
     * 获取勾选的行
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 初始化所有下拉框
     * @returns {Promise<void>}
     */
    async initPageOptions() {
      await this.getItemCategoryOptions();
      // await this.getItemLabelOptions();
      await this.getItemBrandOptions();
    },
    /**
     * 获取商品分类下拉狂选项
     * @returns {Promise<void>}
     */
    async getItemCategoryOptions() {
      const result = await listItemCategorySelectShow(this.$jsonFormat({
        "categoryType": 2
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
      const result = await listItemLabel({ "request": { "pageNum": 1, "pageSize": -1 }, "labelType": 2 });
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
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listIntegralGoodByPage();
    },
    /**
     * 重置
     */
    resetData() {
      this.pagination.current = 1;
      this.pagination.size = 10;
      this.toolBar = {
        "name": "",
        "brand": "",
        "category": "",
        "spec": "",
        "label": "",
        "itemNo": ""
      };
      this.listIntegralGoodByPage();
    },
    /**
     * 打开新增
     */
    newBulid() {
      this.$router.push({ "path": "/product/integral/goods/add", "query": { "r": this.$getRandomValue() } });
    },
    /**
     * 分页查询数据
     * @param clear 是否清空
     */
    listIntegralGoodByPage() {
      let params = "?page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size;
      if (this.toolBar.name) {
        params += "&itemName=" + this.toolBar.name;
      }
      if (this.toolBar.itemNo) {
        params += "&itemNo=" + this.toolBar.itemNo;
      }
      if (this.toolBar.category) {
        params += "&categoryNo=" + this.toolBar.category;
      }
      if (this.toolBar.brand) {
        params += "&brandNo=" + this.toolBar.brand;
      }
      if (this.toolBar.label) {
        params += "&labelNo=" + this.toolBar.label;
      }
      if (this.toolBar.spec) {
        params += "&specDetail=" + this.toolBar.spec;
      }
      this.tableLoading = true;
      pageSearchIntegralGoodList(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
        this.tableLoading = false;
      }).catch(() => {
        this.tableLoading = false;
      });
    }
  }
};