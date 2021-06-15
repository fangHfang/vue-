import { listHelpByPage, enable, disable, helpDetail } from "@/api/system/other/help";

export default {
  "name": "SystemOtherHelpList",
  "components": {
  },
  data() {
    return {
      "date": "",
      "toolBar": {
        "title": "",
        "createBy": "",
        "createDate": "",
        "status": {
          "value": "",
          "options": [
            { "label": "关闭", "value": "0" },
            { "label": "启用", "value": "1" }
          ]
        }
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      }
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
      this.listHelpByPage();
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listHelpByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listHelpByPage();
    },

    /**
     * 新建
     */
    newBuild() {
      this.$router.push({ "path": "/system/other/help/add" });
    },

    /**
     * 分页查询数据
     * @param clear 是否清空
     */
    listHelpByPage() {
      const params = {
        ...this.toolBar,
        "status": this.toolBar.status.value,
        "pageReq.pageNum": this.pagination.current,
        "pageReq.pageSize": this.pagination.size
      };
      if (this.toolBar.createDate && this.toolBar.createDate.length > 0) {
        params.startTime = this.$moment(this.toolBar.createDate[0]).format("yyyy-MM-DD HH:mm:ss");
        params.endTime = this.$moment(this.toolBar.createDate[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      listHelpByPage(params).then(res => {
        if (res.code === 200) {
          res.data.records.forEach((item, index) => {
            const params = {
              "helpNo": item.helpNo
            };
            helpDetail(params).then(res => {
              if (res.code === 200) {
                item.browseCount = res.data.browseCount;
              }
            }).catch((error) => {
              console.info(error);
            });
          });
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },

    enable(helpNo) {
      enable(helpNo).then(res => {
        if (res.code === 200) {
          this.listHelpByPage();
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },

    disable(helpNo) {
      disable(helpNo).then(res => {
        if (res.code === 200) {
          this.listHelpByPage();
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },

    /**
     * 查询详情
     * @param {编号} helpNo
    */
    selectQuery(helpNo) {
      this.$router.push({ "path": "/system/other/help/add", "query": { "helpNo": helpNo } });
    }
  }
};
