import { listItemInfoByPage, listItemCategorySelectShow, listItemLabel, listItemBrand, offSale } from "@/api/product/manage";
import dialogStockProduct from "../../stock/index.vue";
import { ITEM_URL } from "@/utils/system-constant";
export default {
  "name": "ProductManageSoldIn",
  "components": {
    dialogStockProduct
  },
  data() {
    return {
      "tableData": [
        {
          "id": "123584665465646",
          "name": "玛吉斯VS5 SUV轮胎",
          "class": "一级/二级/三级",
          "brand": "玛吉斯123",
          "tag": "标签1",
          "spec": "规格1",
          "price": [
            { "label": "标准价", "value": "180" },
            { "label": "非标价", "value": "120" }
          ],
          "group": "促销打折",
          "stock": "30000",
          "return": "********返利规则",
          "integral": "********积分规则",
          "coupon": [ "5元优惠券", "8元优惠券" ],
          "shows": "23家",
          "create": "2021-01-11 16:50",
          "up": "2021-01-11 16:53"
        }
      ],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "dialogVisible": false,
      // 商品分类下拉框数据
      "itemCategoryOptions": [],
      // 商品标签下拉框数据
      "itemLabelRefOptions": [],
      // 商品品牌下拉框数据
      "itemBrandOptions": [],
      "tableLoading": false,
      // 基础数据
      "searchData": {
        // 出售中状态
      // 上架状态
        "saleStatus": 1,
        // 审核状态
        "status": 2,
        // 商品类型,1：玛吉斯商品；2：非玛商品；4：套餐
        "itemType": 2,
        // 商品名称或编码 (模糊)
        "itemName": "",
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
      "multipleSelection": [],
      "previewDialog": false,
      "previewDialogUrl": "",
      "priceProductVisible": false,
      "visibilityProductVisible": false,
      "stockProductVisible": false,
      "itemNo": "",
      "tableHeight": (document.body.clientHeight - 50 - 34 - 145 - 3 - 48 - 62),
      "exportUrl": ITEM_URL + "/admin/itemInfo/export"
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    },
    // 导出入参
    exportGetData() {
      return {
        ...this.searchData
      };
    }
  },
  mounted() {
    // 封装下拉框
    this.getItemCategoryOptions();
    this.getItemLabelOptions();
    this.getItemBrandOptions();
    // 初始化查询方法
    this.listTableData(this.searchData);
  },
  "methods": {
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.searchData.pageSize = val;
      this.listTableData(this.searchData);
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.searchData.pageNum = val;
      this.listTableData(this.searchData);
    },
    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 分页查询数据
     */
    listTableData(searchData) {
      searchData = this.$jsonFormat(this.searchData);
      this.tableLoading = true;
      listItemInfoByPage(searchData).then((result) => {
        if (result.code === 200) {
          this.tableData = result.data.records.map(item => {
            return {
              ...item,
              "label": item.labelInfos && item.labelInfos.map(x => x.labelName).join("|"),
              "backCategoryName": item.itemCategoryDTOS && item.itemCategoryDTOS.filter(y => y.categoryType === 2).map(x => x.wholeCategoryName).join("|"),
              "frontCategoryName": item.itemCategoryDTOS && item.itemCategoryDTOS.filter(y => y.categoryType === 1).map(x => x.wholeCategoryName).join("|")
            };
          });
          this.total = result.data.total;
          this.searchData.pageSize = result.data.size;
          this.searchData.pageNum = result.data.current;
        } else {
          this.$message.error(result.msg);
        }
      }).finally(() => { this.tableLoading = false; });
    },
    /**
     * 下架
     * @param row
     */
    downShelf(row) {
      const params = {
        "itemNos": [ row.itemNo ]
      };
      offSale(params).then(res => {
        if (res.code === 200) {
          this.$message.success("下架成功");
          this.listTableData(this.searchData);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /**
     * 批量下架
     */
    batchDownShelf() {
      if (this.multipleSelection.length < 1) {
        return this.$message.info("请至少选择一条数据");
      }
      const params = {
        "itemNos": this.multipleSelection.map(x => x.itemNo)
      };
      offSale(params).then(res => {
        if (res.code === 200) {
          this.$message.success("下架成功");
          this.listTableData(this.searchData);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /**
       * 清理数据
       */
    clearData() {
      this.searchData.itemName = "";
      this.searchData.categoryNo = "";
      this.searchData.labelNo = "";
      this.searchData.brandNo = "";
      this.searchData.pageSize = 10;
      this.searchData.pageNum = 1;
      this.listTableData(this.searchData);
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
       * 点击搜索查询
       */
    selectData() {
      this.searchData.pageSize = 10;
      this.searchData.pageNum = 1;
      this.listTableData(this.searchData);
    },
    /**
     * 打开详情
     */
    toDetail(row) {
      this.$router.push({ "path": "/product/manage/nomaxxis/detail/" + row.itemNo });
    },
    /**
     * 编辑
     */
    toEdit(row) {
      this.$router.push({ "path": "/product/manage/nomaxxis/edit/" + row.itemNo });
    },
    /**
     * 编辑
     */
    toPreview(row) {
      this.previewDialog = true;
      this.previewDialogUrl = row.listPicture;
    },

    /**
     * 复制链接
     */
    copyProductLink(itemNo) {
      const clipboard = new this.$clipboard(".page", {
        "text": function() {
          return "/pages/products/product-detail/product-detail?subItemNo=" + itemNo;
        }
      });
      clipboard.on("success", e => {
        this.$message.success("链接已复制！");
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        this.$message.error("复制失败！");
        clipboard.destroy();
      });
    },
    /**
     * 查看价格弹出层
     * @param row
     */
    toPrice(row) {
      this.itemNo = row.itemNo;
      this.priceProductVisible = true;
    },
    /**
     * 查看库存弹出层
     * @param row
     */
    toStock(row) {
      this.itemNo = row.productNo;
      this.stockProductVisible = true;
    },
    /**
     * 查看可见性弹出层
     * @param row
     */
    toVisibility(row) {
      this.itemNo = row.itemNo;
      this.visibilityProductVisible = true;
    }
  }
};