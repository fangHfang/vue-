import { pageSearchOperationLog } from "@/api/system/other/log";
export default {
  "name": "SystemOtherLog",
  "components": {
  },
  data() {
    return {
      // 日期
      "date": "",
      "toolBar": {
        "description": "",
        "operator": "",
        "startTime": "",
        "tag": {
          "value": "",
          "options": [
            { "label": "厂商", "value": 0 },
            { "label": "经销商", "value": 1 },
            { "label": "门店", "value": 2 }
          ]
        }
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "tableLoading": false
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.searchDataPage();
  },
  "methods": {
    /**
     * 搜索
     */
    searchDataPage() {
      this.pagination.current = 1;
      this.getRemoteTableData();
    },
    /**
     * 分页查询列表
     */
    getRemoteTableData() {
      this.tableLoading = true;
      const params = {
        "description": this.toolBar.description,
        "operator": this.toolBar.operator,
        "operatorType": this.toolBar.tag.value,
        "request": {
          "field": "",
          "order": "",
          "pageNum": this.pagination.current,
          "pageSize": this.pagination.size
        }
      };
      if (this.toolBar.startTime) {
        params.startTime = this.$moment(this.toolBar.startTime[0]).format("yyyy-MM-DD HH:mm:ss");
        params.endTime = this.$moment(this.toolBar.startTime[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      this.tableLoading = true;
      pageSearchOperationLog(params).then(res => {
        if (res.code === 200) {
          res.data.records.map((item, index) => {
            item.operationTime = this.formatDate(item.operationTime);
          });
          this.tableData = res.data.records;
          this.pagination.total = (res.data && res.data.total) || 0;
          this.tableLoading = false;
        } else {
          this.$message.error("查询失败");
        }
      });
    },
    /**
     * 时间戳转时间格式
     * @param now
     * @returns {string}
     */
    formatDate(now) {
      const dateTime = new Date(now);
      const year = dateTime.getFullYear();
      const month = (dateTime.getMonth() + 1 < 10 ? "0" + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1);
      const date = (dateTime.getDate() + 1 < 10 || dateTime.getDate() + 1 === 10 ? "0" + (dateTime.getDate()) : dateTime.getDate());
      const hour = (dateTime.getHours() + 1 < 10 || dateTime.getHours() + 1 === 10 ? "0" + (dateTime.getHours()) : dateTime.getHours());
      const minute = (dateTime.getMinutes() + 1 < 10 || dateTime.getMinutes() + 1 === 10 ? "0" + (dateTime.getMinutes()) : dateTime.getMinutes());
      const second = (dateTime.getSeconds() + 1 < 10 || dateTime.getSeconds() + 1 === 10 ? "0" + (dateTime.getSeconds()) : dateTime.getSeconds());
      return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
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
    }
  }
};
