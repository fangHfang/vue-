import { pageSearchCpTemLateList } from "@/api/business/coupon/coupon.js";
export default {
  "name": "dialogCoupon",
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
    "integralTitle": {
      "type": String,
      "default": ""
    }
  },
  data() {
    return {
      "title": "添加卡券",
      "multipleSelection": [],
      "tableLoading": false,
      "toolBar": {
        "name": "",
        "couponClass": {
          "value": "",
          "options": [
            { "label": "优惠券", "value": "0" },
            { "label": "兑换券", "value": "1" }
          ]
        },
        "status": {
          "value": "",
          "options": [
            { "label": "启用", "value": "1" },
            { "label": "终止", "value": "0" }
          ]
          // "options": [
          //   { "label": "待领取", "value": "0" },
          //   { "label": "待使用", "value": "1" },
          //   { "label": "已过期", "value": "2" },
          //   { "label": "已使用", "value": "99" }
          // ]
        }
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      }
    };
  },
  mounted() {
    // 初始化查询方法
    this.listTableData(this.searchData);
    this.title = this.isMultiSelect ? "添加卡券" : "添加卡券（仅单选）";
  },
  "methods": {
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
      this.multipleSelection = val;
    },
    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$emit("update:dialogVisible", false);
    },
    searchTableData() {
      this.pagination.current = 1;
      this.listTableData();
    },
    /**
     * 分页查询数据
     */
    listTableData() {
      const params = {
        "ruleName": this.toolBar.name,
        "status": this.toolBar.status.value || "1",
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size,
        "couponClass": this.toolBar.couponClass.value
      };
      const postData = this.$jsonFormat(params);
      this.tableLoading = true;
      pageSearchCpTemLateList(postData).then((result) => {
        if (result.code === 200) {
          this.tableData = result.data.records;
          this.pagination.total = result.data.total;
          this.tableLoading = false;
        }
      }).catch((error) => {
        this.tableLoading = false;
        this.$message.error(error.msg);
      });
    },
    resetData() {
      this.pagination.current = 1;
      this.pagination.size = 10;
      this.toolBar.name = "";
      this.toolBar.couponClass.value = "";
      this.toolBar.status.value = "";
      this.listTableData();
    },
    /**
     * 获取选中数据
     */
    addProduct() {
      if (this.multipleSelection.length < 1) {
        return this.$message.info("请选择数据");
      }
      if (!this.isMultiSelect) {
        if (this.multipleSelection.length > 1) {
          return this.$message.info("请只选择一条数据");
        }
      }
      this.$emit("selectCoupon", this.multipleSelection);
      this.$emit("update:dialogVisible", false);
    }
  }
};
