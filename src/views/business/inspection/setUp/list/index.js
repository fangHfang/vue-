// src/views/business/inspection/setUp/list/index
import { queryInspectByPage, enableInspect, disableInspect } from "@/api/business/inspection/inspection";
export default {
  "name": "inspectionSetUpList",
  "components": {
  },
  data() {
    return {
      "value": "",
      "toolBar": {
        "name": "",
        "class": {
          "value": "",
          "options": [
            { "label": "未开始", "value": "0" },
            { "label": "进行中", "value": "1" },
            { "label": "已结束", "value": "2" }
          ]
        }
      },
      "tableData": [
        {
          "index": "1",
          "name": "形象店店检",
          "roleNo": "005",
          "cycle": "2021-01-02 13:22:56",
          "status": "1",
          "store": "XXX门店、XXX门店...",
          "description": "张三"
        },
        {
          "index": "2",
          "name": "星级评定",
          "roleNo": "004",
          "cycle": "2021-01-02 13:22:56",
          "status": "1",
          "store": "XXX门店、XXX门店...",
          "description": "张三"
        }
      ],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
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
    this.listInspectTemplateByPage();
  },
  activated() {
    this.listInspectTemplateByPage();
  },
  "methods": {
    /**
     * 查询按钮方法
     */
    searchData() {
      this.pagination.current = 1;
      this.listInspectTemplateByPage();
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
      this.listInspectTemplateByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.listInspectTemplateByPage();
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
     * 跳转到新增规则
     */
    toAdd() {
      this.$store.commit("inspectionSetUp/inspectionSetUpListSet", {
        "modify": false
      });
      this.$router.push({ "path": "/business/inspection/setUp/add" });
    },
    /**
     * 跳转编辑页面
     */
    toEdit(inspectNo) {
      this.$store.commit("inspectionSetUp/inspectionSetUpListSet", {
        "modify": true,
        "inspectNo": inspectNo
      });
      this.$router.push({ "path": "/business/inspection/setUp/edit" });
    },
    /**
     * 跳转门店
     */
    toStore(inspectNo) {
      this.$router.push({ "path": "/business/inspection/setUp/store/" + inspectNo });
    },
    /**
     * 跳转到规则详情
     */
    toDetail(inspectNo) {
      this.$store.commit("inspectionSetUp/inspectionSetUpListSet", {
        "modify": true,
        "inspectNo": inspectNo
      });
      this.$router.push({ "path": "/business/inspection/setUp/add" });
    },
    /**
     * 格式化时间
     * @param {*} str 时间字符串
     */
    formatTime(str) {
      str = str || "";
      return str.substring(0, 7);
    },
    /**
     * 分页查询规则数据
     */
    listInspectTemplateByPage() {
      const that = this;
      this.tableLoading = true;
      const params = {
        "name": this.toolBar.name,
        "pageReq": {
          "pageNum": this.pagination.current,
          "pageSize": this.pagination.size
        },
        "status": this.toolBar.class.value
      };
      queryInspectByPage(params).then(res => {
        if (res.code === 200) {
          res.data.records.forEach(element => {
            element.cycle = that.formatTime(element.beginTime) + " - " + that.formatTime(element.endTime);
          });
          this.tableData = res.data.records;
          console.info(this.tableData);
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
     * 执行规则
     */
    enableInspectFunc() {
      const multipleSelection = this.multipleSelection;
      this.tableLoading = true;
      multipleSelection.forEach(element => {
        const params = {
          "inspectNo": element.inspectNo,
          "status": 2
        };
        enableInspect(params).then(res => {

        }).catch((error) => {
          console.info(error);
          this.$message.error(error);
          this.tableLoading = false;
        });
      });
      this.listInspectTemplateByPage();
      this.tableLoading = false;
    },
    /**
     * 停用规则
     */
    disableInspectFunc() {
      const multipleSelection = this.multipleSelection;
      this.tableLoading = true;
      multipleSelection.forEach(element => {
        const params = {
          "inspectNo": element.inspectNo,
          "status": 1
        };
        disableInspect(params).then(res => {

        }).catch((error) => {
          console.info(error);
          this.$message.error(error);
          this.tableLoading = false;
        });
      });
      this.listInspectTemplateByPage();
      this.tableLoading = false;
    },
    /**
     * 执行规则
     */
    enableInspectSingle(inspectNo) {
      const params = {
        "inspectNo": inspectNo,
        "status": 2
      };
      enableInspect(params).then(res => {
        this.listInspectTemplateByPage();
        this.tableLoading = false;
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
        this.tableLoading = false;
      });
    },
    /**
     * 停用规则
     */
    disableInspectSingle(inspectNo) {
      const params = {
        "inspectNo": inspectNo,
        "status": 1
      };
      disableInspect(params).then(res => {
        this.listInspectTemplateByPage();
        this.tableLoading = false;
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
        this.tableLoading = false;
      });
    }
  }
};