import { listItemApplyByPage, listItemLabel, listItemBrand, itemVerify, listItemCategorySelectShow, listSpecTemplate } from "@/api/product/manage";
export default {
  "name": "goodsReview",
  "components": {
  },
  data() {
    return {
      "activeName": "first",
      "toolBar": {
        // 商品名称或编码 (模糊)
        "itemName": "",
        // 商品类别编码
        "categoryNo": {
          "value": "",
          "options": [
            { "label": "一级", "value": "1" },
            { "label": "二级", "value": "2" },
            { "label": "三级", "value": "3" }
          ]
        },
        // 商品标签编码
        "labelNo": {
          "value": "",
          "options": [
            { "label": "一级", "value": "1" },
            { "label": "二级", "value": "2" },
            { "label": "三级", "value": "3" }
          ]
        },
        // 商品品牌编码
        "brandNo": {
          "value": "",
          "options": [
            { "label": "一级", "value": "1" },
            { "label": "二级", "value": "2" },
            { "label": "三级", "value": "3" }
          ]
        },
        "name": "",
        "spec": "",
        // 商品规格编码
        "specNo": {
          "value": "",
          "options": [
            { "label": "一级", "value": "1" },
            { "label": "二级", "value": "2" },
            { "label": "三级", "value": "3" }
          ]
        }
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 40
      },
      "tableLoading": false,
      "multipleSelection": [],
      "currentStatus": -1,
      "refuseReason": "",
      "refuseDialog": false,
      "itemNos": []
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    // 封装下拉框
    this.getItemCategoryOptions();
    this.getItemLabelOptions();
    this.getItemBrandOptions();
    this.getgetListSpecTemplate();
    // 初始化查询方法
    this.getRemoteTableData();
  },
  "methods": {
    /**
     * 格式化时间
     * @param {*} str 时间字符串
     */
    formatTime(str) {
      str = str || "";
      return str.substring(0, 10) + " " + str.substring(11, 19);
    },
    handleClick(tab) {
      if (tab.name === "second") {
        this.currentStatus = 0;
      } else if (tab.name === "third") {
        this.currentStatus = 1;
      } else if (tab.name === "first") {
        this.currentStatus = -1;
      }
      this.getRemoteTableData();
    },
    /**
     * 获取勾选的行
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.getRemoteTableData();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getRemoteTableData();
    },
    getRemoteTableData() {
      const params = {
        "pageNum": this.pagination.current,
        "pageSize": this.pagination.size,
        "itemName": this.toolBar.name,
        "brandNo": this.toolBar.brandNo.value,
        "categoryNo": this.toolBar.categoryNo.value,
        "labelNo": this.toolBar.labelNo.value,
        // "specDetail": this.toolBar.spec,
        "status": this.currentStatus,
        "specDetail": String(this.toolBar.specNo.value)
      };
      // if (this.currentStatus === 1) {
      //   params.field = "auditTime";
      //   params.order = "desc";
      // }
      const postData = this.$jsonFormat(params);
      this.tableLoading = true;
      listItemApplyByPage(postData).then((result) => {
        if (result.code === 200) {
          this.tableData = result.data.records.map(item => {
            return {
              ...item,
              "label": item.labelInfos && item.labelInfos.map(x => x.labelName).join("|"),
              "wholeCategoryName": item.itemCategoryDTOS && item.itemCategoryDTOS.map(x => x.wholeCategoryName).join("|")
            };
          });
          this.pagination.total = (result.data && result.data.total) || 0;
        } else {
          this.$message.error(result.msg);
        }
      }).finally(() => {
        this.tableLoading = false;
      });
    },
    /**
       * 清理数据
       */
    clearData() {
      this.toolBar.name = "";
      this.toolBar.categoryNo.value = "";
      this.toolBar.labelNo.value = "";
      this.toolBar.brandNo.value = "";
      this.toolBar.specNo.value = "";
      this.toolBar.spec = "";
      this.pagination.size = 10;
      this.pagination.current = 1;
      this.getRemoteTableData();
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
        this.toolBar.categoryNo.options = result.data;
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
        this.toolBar.labelNo.options = result.data.records;
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
        this.toolBar.brandNo.options = result.data;
      } else {
        this.$message.error(result.msg);
      }
    },
    /**
       * 获取商品规格下拉框选项
       * @returns {Promise<void>}
       */
    async getgetListSpecTemplate() {
      const result = await listSpecTemplate();
      if (result.code === 200) {
        this.toolBar.specNo.options = result.data;
      } else {
        this.$message.error(result.msg);
      }
    },
    /**
       * 点击搜索查询
       */
    searchData() {
      this.pagination.current = 1;
      this.getRemoteTableData();
    },
    /**
       * 打开详情
       */
    toDetail(row) {
      this.$router.push({ "path": "/product/manage/examine/detail/" + row.itemNo, "query": { "detail": row } });
    },
    /**
     * 审核
     */
    toVerify(row, mark) {
      const params = {
        "itemNos": [ row.itemNo ],
        // 审核状态，0->待提审；1->未审核；2->审核通过；3->审核拒绝
        "verifyStatus": mark === "pass" ? 2 : 3
      };
      if (mark === "refuse") {
        this.itemNos = [ row.itemNo ];
        this.refuseDialog = true;
        return;
      }
      this.doVerify(params);
    },
    doVerify(params) {
      itemVerify(params).then(res => {
        if (res.code === 200) {
          this.$message.success("审核成功");
          this.refuseDialog = false;
          this.getRemoteTableData();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /**
     * 批量审核
     */
    batchToVerify(mark) {
      if (this.multipleSelection.length < 1) {
        return this.$message.info("请至少选择一条数据");
      }
      let canSave = true;
      this.multipleSelection.forEach(y => {
        if (y.auditStatus > 1) {
          canSave = false;
          return this.$message.warning("请不要选择已审核过的数据");
        }
      });
      if (!canSave) return;
      const params = {
        "itemNos": this.multipleSelection.map(x => x.itemNo),
        // 审核状态，0->待提审；1->未审核；2->审核通过；3->审核拒绝
        "verifyStatus": mark === "pass" ? 2 : 3
      };
      if (mark === "refuse") {
        this.itemNos = this.multipleSelection.map(x => x.itemNo);
        this.refuseDialog = true;
        return;
      }
      this.doVerify(params);
    },
    closedDialog() {
      this.refuseReason = "";
    },
    /**
     * 拒绝
     */
    doRefusing() {
      if (!this.refuseReason) {
        return this.$message.warning("请输入拒绝理由");
      }
      const params = {
        "itemNos": this.itemNos,
        // 审核状态，0->待提审；1->未审核；2->审核通过；3->审核拒绝
        "verifyStatus": 3,
        "rejectReason": this.refuseReason
      };
      this.doVerify(params);
    }
  }
};