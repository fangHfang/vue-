import { getPageRebateCalcDetail } from "@/api/business/reconciliation.js";
export default {
  "name": "reconciliationList",
  "components": {
  },
  "props": {
    "typeFlag": {
      "type": Number,
      "default": 0
    }
  },
  data() {
    return {
      "toolBar": {
        "tread": "",
        "brandName": "",
        "productCode": "",
        "spec": "",
        "productSize": "",
        "status": {
          "value": "",
          "options": [
            { "label": "有效", "value": 1 },
            { "label": "无效", "value": 0 }
          ]
        }
      },
      "tableData": [
      ],
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
  "computed": {
    currentRow() {
      return this.$store.state.reconciliationSetList.currentRow;
    }
  },
  mounted() {
    this.getRemoteDataList();
  },
  "methods": {
    /**
     * 查询按钮方法
     */
    searchData() {
      this.pagination.current = 1;
      this.getRemoteDataList();
    },
    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.size = val;
      this.getRemoteDataList();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.getRemoteDataList();
    },
    /**
     * 重置数据
     */
    reset() {
      this.toolBar = {
        "tread": "",
        "brandName": "",
        "productCode": "",
        "spec": "",
        "productSize": "",
        "status": {
          "value": "",
          "options": [
            { "label": "有效", "value": 1 },
            { "label": "无效", "value": 0 }
          ]
        }
      };
      this.pagination.current = 1;
      this.getRemoteDataList();
    },
    /**
     * 分页查询规则数据
     */
    getRemoteDataList() {
      this.tableLoading = true;
      const params = {
        "bizNo": this.currentRow.bizNo,
        "brandCode": this.toolBar.brandName,
        "spec": this.toolBar.spec,
        "tread": this.toolBar.tread,
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size,
        "productCode": this.toolBar.productCode
      };
      if (this.toolBar.status.value || this.toolBar.status.value === 0) {
        params.status = this.toolBar.status.value;
      }
      getPageRebateCalcDetail(this.$jsonFormat(params)).then(res => {
        if (res.code === 200) {
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
     * 确认入账
     */
    batchInAccount() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length < 1) {
        return this.$message.warning("请至少选择一条数据");
      }
      this.tableLoading = true;
      multipleSelection.forEach((element, i) => {
        const params = {
          "approvalStatus": 1,
          "idList": multipleSelection.map(x => x.id)
        };
        rebateCalcApproval(params).then(res => {
          if (i === multipleSelection.length - 1) {
            if (res.code === 200) {
              this.$message.success("入账成功");
              this.getRemoteDataList();
            } else {
              this.tableLoading = false;
              this.$message.error(res.msg || "入账失败");
            }
          }
        }).catch((error) => {
          this.tableLoading = false;
          console.info(error);
        });
      });
    },
    /**
     * 确认入账
     */
    inAccount(row) {
      const params = {
        "approvalStatus": 1,
        "idList": [ row.id ]
      };
      this.tableLoading = true;
      rebateCalcApproval(params).then(res => {
        if (res.code === 200) {
          this.$message.success("入账成功");
          this.getRemoteDataList();
        } else {
          this.tableLoading = false;
          this.$message.error(res.msg || "入账失败");
        }
      }).catch((error) => {
        this.tableLoading = false;
        console.info(error);
      });
    }
  }
};