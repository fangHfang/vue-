// src/views/business/inspection/audit/list/index
// import { queryInspectByPage, queryInspectAuditByPage } from "@/api/business/inspection/inspection";
import { queryInspectAuditByPage } from "@/api/business/inspection/inspectAudit";

export default {
  "name": "inspectionAuditList",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "name": "",
        "class": {
          "value": "",
          "options": [
            { "label": "停用", "value": 0 },
            { "label": "开始", "value": 1 }
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
      "dialogVisible": false,
      "tableLoading": false,
      "multipleSelection": []
    };
  },
  "computed": {},
  mounted() {
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
     * 格式化时间
     * @param {*} str 时间字符串
     */
    formatTime(str) {
      str = str || "";
      return str.substring(0, 10);
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
      queryInspectAuditByPage(params).then(res => {
        if (res.code === 200) {
          res.data.records.forEach(element => {
            element.beginTime = that.formatTime(element.beginTime);
            element.joinCount = element.joinCount ? element.joinCount : 0;
            element.auditCount = element.auditCount ? element.auditCount : 0;
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
     * 查询店检审核详情
     */
    toDetail(inspectNo, cycleNo) {
      this.$store.commit("inspectionAudit/inspectionAuditListSet", {
        "inspectNo": inspectNo,
        "cycleNo": cycleNo
      });
      this.$router.push({ "path": "/business/inspection/store/audit" });
    }
  }
};