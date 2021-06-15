import { pageSiStoreRecordList } from "@/api/business/sign";
export default {
  "name": "businessSignList",
  "components": {

  },
  data() {
    return {
      "toolBar": {
        "name": "",
        "data": {
          "value": "",
          "options": [
            { "label": "10", "value": "1" },
            { "label": "20", "value": "2" },
            { "label": "30", "value": "3" }
          ]
        },
        "brand": "",
        "store": "",
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
        "total": 400
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
    this.getRemoteTableData();
  },
  "methods": {
    /**
     * 分页查询列表
     */
    getRemoteTableData() {
      const params = {
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size,
        "ruleName": this.toolBar.ruleName
      };
      this.tableLoading = true;
      pageSiStoreRecordList(this.$jsonFormat(params)).then(res => {
        if (res.code === 200) {
          const list = (res.data && res.data.records) || [];
          this.tableData = list;
          this.pagination.total = (res.data && res.data.total) || 0;
          this.tableLoading = false;
        } else {
          this.$message.error(res.msg);
          this.tableLoading = false;
        }
      });
    },
    /**
     * 重置按钮
     */
    resetTableData() {
      this.toolBar.ruleName = "";
      this.pagination.current = 1;
      this.pagination.size = 10;
      this.getRemoteTableData();
    },
    /**
     * 搜索按钮
     */
    searchTableData() {
      this.pagination.current = 1;
      this.getRemoteTableData();
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    /**
     * 跳转至详情
     */
    jumpDetail() {
      this.$router.push({ "path": "/business/sign/detail" });
    }
  }
};