import { listItemInfoByPage, listItemCategorySelectShow, listItemLabel, listItemBrand } from "@/api/product/manage";

export default {
  "name": "dialogAddProduct",
  "components": {
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    },
    "isMultiSelect": {
      "type": Boolean,
      "default": true
    },
    // 商品状态 状态，0->仓库中；1->审核中；2->出售中
    "goodsStatus": {
      "type": [ Number, String ],
      "default": ""
    },
    // 上下架状态，0：下架；1：上架，默认下架
    "saleStatus": {
      "type": [ Number, String ],
      "default": ""
    },
    // 商品类型 商品类型,1：玛吉斯商品；2：非玛商品；4：套餐，多个类型用英文逗号分隔
    "goodsType": {
      "type": [ Number, String ],
      "default": ""
    },
    // 每次进来都要查询
    "needRefresh": {
      "type": Boolean,
      "default": false
    },
    "shopwindow": {
      "type": String,
      "default": ""
    }
  },
  "watch": {
    dialogVisible(val) {
      if (val) {
        if (this.needRefresh) {
          this.searchData();
        }
      }
    }
  },
  data() {
    return {
      "title": "",
      "multipleSelection": [],
      "tableLoading": false,
      "toolBar": {
        "itemName": "",
        "class": {
          "value": "",
          "options": [
            { "label": "一级", "value": "1" },
            { "label": "二级", "value": "2" },
            { "label": "三级", "value": "3" }
          ]
        },
        "spec": "",
        "brand": "",
        "tag": {
          "value": "",
          "options": [
            { "label": "标签1", "value": "1" },
            { "label": "标签2", "value": "2" },
            { "label": "标签3", "value": "3" }
          ]
        }
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "itemBrandOptions": [],
      "btnLoading": false

    };
  },
  created() {
    this.getRemoteLabelData();
    this.listItemCategoryPage();
  },
  mounted() {
    // 封装下拉框
    // 初始化查询方法
    this.listTableData(this.searchData);
    this.title = this.isMultiSelect ? "添加商品" : "添加商品（仅单选）";
    this.getItemBrandOptions();
  },
  "methods": {
    /**
     * 查询
     */
    searchData() {
      this.pagination.current = 1;
      this.listTableData();
    },
    /**
     * 查询所有商品标签
     */
    getRemoteLabelData() {
      listItemLabel({ "request": { "pageNum": 1, "pageSize": -1 }, "labelType": 2 }).then(res => {
        if (res.code === 200) {
          this.toolBar.tag.options = res.data.records.map(x => {
            return {
              "label": x.labelName,
              "value": x.labelNo
            };
          });
        } else {
          this.$message.error("标签查询失败");
        }
      });
    },

    /**
     * 查询商品分类
     */
    listItemCategoryPage() {
      listItemCategorySelectShow(this.$jsonFormat({
        "categoryType": 2
      })).then((res) => {
        this.toolBar.class.options = res.data.map((item) => {
          return {
            "label": item.wholeCategoryName,
            "value": item.categoryNo
          };
        });
      }).catch(() => {
        console.log("加载商品分类数据失败");
      });
    },
    /**
     * 修改页大小
     * @param {*} val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listTableData();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listTableData();
    },
    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleSelectionChange(val) {
      if (!this.isMultiSelect &&
        val.length > 1) {
        const lastRow = val.pop();
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(lastRow);
        this.multipleSelection = [ lastRow ];
        return this.$message.warning("仅支持选择单个商品!");
      }
      this.multipleSelection = val;
    },
    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$emit("update:dialogVisible", false);
    },
    /**
     * 分页查询数据
     */
    listTableData() {
      let postData = {
        "pageNum": this.pagination.current,
        "pageSize": this.pagination.size,
        "itemName": this.toolBar.itemName,
        "labelNo": this.toolBar.tag.value,
        "categoryNo": this.toolBar.class.value,
        "brandNo": this.toolBar.brand,
        "specDetail": this.toolBar.spec
      };
      if (this.shopwindow === "shopwindow") {
        postData.saleStatus = 1;
        postData.status = 2;
      }
      // 创建套餐商品时应无法包含套餐商品 20210415-57828
      if (this.goodsType && this.goodsType !== -1) {
        postData.itemType = this.goodsType;
      }
      if (this.goodsType === -1) {
        postData.itemType = "1,2";
      }

      if (this.saleStatus || this.saleStatus === 0) {
        // postData.saleStatus = this.saleStatus;
      }
      if (this.goodsStatus || this.goodsStatus === 0) {
        // 产品说创建活动时商品只能添加仓库中的商品 20210413 - 57498
        // 状态，0->仓库中；1->审核中；2->出售中 ( 20210316 后端-张展铭：其他地方关联商品需要的是出售中的，这个status也是要输的 )
        postData.status = this.goodsStatus;
      }
      postData = this.$jsonFormat(postData);
      this.tableLoading = true;
      listItemInfoByPage(postData).then((res) => {
        if (res.code === 200) {
          res.data.records.forEach(item => {
            let label = "";
            if (item.labelInfos && item.labelInfos.length > 0) {
              const info = item.labelInfos.map(e => {
                return e.labelName;
              });
              label = info.join(",");
            }
            item.label = label;
            item.wholeCategoryName = item.itemCategoryDTOS && item.itemCategoryDTOS.filter(x => x.categoryType === 2).map(y => y.wholeCategoryName).join(" | ");
          });
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error("查询商品失败");
        }
        this.tableLoading = false;
      }).catch((error) => {
        console.info(error);
        this.tableLoading = false;
      });
    },
    resetData() {
      this.pagination.current = 1;
      this.pagination.size = 10;
      this.toolBar.itemName = "";
      this.toolBar.tag.value = "";
      this.toolBar.class.value = "";
      this.toolBar.brand = "";
      this.toolBar.spec = "";
      this.listTableData();
    },
    /**
     * 获取选中数据
     */
    addProduct() {
      if (this.multipleSelection.length === 0) {
        this.btnLoading = false;
        return this.$message.error("请选择商品");
      }
      this.btnLoading = false;
      this.$emit("selectInfos", this.multipleSelection);
      this.$emit("update:dialogVisible", false);
    },
    /**
     * 获取选中数据
     */
    selectData() {
      if (this.multipleSelection.length === 0) {
        return this.$message.error("请选择商品");
      }
      this.$emit("selectInfos", this.multipleSelection);
      this.$emit("update:dialogVisible", false);
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
    }
  }
};