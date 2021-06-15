import { pageOrderWithdForzenrawList } from "@/api/downstream/dealer/accountInfo";

export default {
  "name": "goodsReview",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "date": "",
        "processDate": "",

        "untieDate": "",
        "radio": "1",
        "untieRadio": "1",
        "month": {
          "type": "",
          "options": [
            { "label": "本月", "value": "0" },
            { "label": "上月", "value": "1" }
          ]
        },
        "untieMonth": {
          "type": "",
          "options": [
            { "label": "本月", "value": "0" },
            { "label": "上月", "value": "1" }
          ]
        },
        "status": {
          "type": "",
          "options": [
            { "label": "已冻结", "value": "0" },
            { "label": "已解冻", "value": "1" },
            { "label": "已到账", "value": "2" }
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
      "currentStatus": -1
    };
  },
  mounted() {
    // 初始化查询方法
    this.getRemoteTableData();
  },
  "methods": {
    /**
       * 查询按钮方法
       */
    searchDealerListByPage() {
      this.pagination.current = 1;
    },
    /**
     * 格式化时间
     * @param {*} str 时间字符串
     */
    formatTime(str) {
      str = str || "";
      return str.substring(0, 10) + " " + str.substring(11, 19);
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
      const postData = {
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size
      };
      if (this.toolBar.date && this.toolBar.date.length > 0) {
        postData.frozenStartTime = this.$moment(this.toolBar.date[0]).format("yyyy-MM-DD HH:mm:ss");
        postData.frozenEndTime = this.$moment(this.toolBar.date[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      if (this.toolBar.processDate && this.toolBar.processDate.length > 0) {
        postData.frozenHandleStartTime = this.$moment(this.toolBar.date[0]).format("yyyy-MM-DD HH:mm:ss");
        postData.frozenHandleEndTime = this.$moment(this.toolBar.date[1]).format("yyyy-MM-DD HH:mm:ss");
      }

      pageOrderWithdForzenrawList(postData).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
        this.tableLoading = false;
      });
    },
    /**
       * 清理数据
       */
    clearData() {
      this.pagination.size = 10;
      this.pagination.current = 1;
      this.getRemoteTableData();
    },
    /**
       * 点击搜索查询
       */
    searchData() {
      this.pagination.current = 1;
      this.getRemoteTableData();
    },

    cleanSearch() {
      this.toolBar.date = "";
      this.toolBar.processDate = "";
      this.toolBar.status.value = "";
    },
    /**
     * 查看关联订单管理列表
     * @param row
     */
    toOrder(row) {
      this.$router.push({ "path": "/downstream/dealer/accountInfo/associatedOrder", "query": { "orderWithdrawNo": row.orderWithdrawNo } });
    }
  }
};