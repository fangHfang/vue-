import { listPageRebateCalc, rebateCalcApproval } from "@/api/business/reconciliation.js";
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
      "value": "",
      "toolBar": {
        "customerNo": "",
        "dealerNo": "",
        "bizType": {
          "value": "",
          "options": [
            { "label": "店检", "value": "1030" },
            { "label": "签约", "value": "1031" }
          ]
        },
        "date": []
      },
      "tableData": [
      ],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "dialogVisible": false,
      "tableLoading": false,
      "multipleSelection": []
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.getRemoteDataList();
  },
  "methods": {

    storeChange(val) {
      this.toolBar.customerNo = val;
    },

    dealerChange(val) {
      this.toolBar.dealerNo = val;
    },
    /**
     * 查询按钮方法
     */
    searchData() {
      this.pagination.current = 1;
      this.getRemoteDataList();
    },
    /**
     * 跳转对账明细
     * @param row
     */
    toDetailList(row) {
      this.$store.commit("reconciliationSetList/reconciliationListSet", {
        "currentRow": row
      });
      this.$router.push({ "path": "/business/reconciliation/detail" });
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
      this.toolBar.dealerNo = "";
      this.toolBar.customerNo = "";
      this.toolBar.date = [];
      this.toolBar.bizType.value = "";
      this.pagination.current = 1;
      this.$refs.store && this.$refs.store.cleanStore();
      this.$refs.dealer && this.$refs.dealer.cleanDealer();
      this.getRemoteDataList();
    },
    /**
     * 分页查询规则数据
     */
    getRemoteDataList() {
      this.tableLoading = true;
      const params = {
        "dealerNo": this.toolBar.dealerNo,
        "customerNo": this.toolBar.customerNo,
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size,
        "bizType": this.toolBar.bizType.value,
        "status": this.typeFlag
      };
      if (this.toolBar.date && this.toolBar.date.length > 0) {
        params.startDate = this.toolBar.date[0];
        params.endDate = this.toolBar.date[1];
      }
      listPageRebateCalc(this.$jsonFormat(params)).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records.map(x => {
            return {
              ...x,
              "date": (x.startDate || "").substring(0, 10) + "-" + (x.endDate || "").substring(0, 10)
            };
          });
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