// src/views/business/inspection/store/audit/list/index
import { queryInspectAuditByInspectPage } from "@/api/business/inspection/inspectAudit";
export default {
  "name": "inspectionStoreAuditList",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "name": "",
        "class": {
          "value": "",
          "options": [
            { "label": "待审核", "value": 0 },
            { "label": "合格", "value": 1 },
            { "label": "不合格", "value": 2 },
            { "label": "已驳回", "value": 3 }
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
  "computed": {
    inspectNo() {
      return this.$store.state.inspectionAudit.inspectNo;
    },
    cycleNo() {
      return this.$store.state.inspectionAudit.cycleNo;
    }
  },
  mounted() {
    this.listInspectAuditByPage();
  },
  "methods": {
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
      this.listInspectAuditByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.listInspectAuditByPage();
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
    listInspectAuditByPage() {
      this.tableLoading = true;
      const params = {
        "inspectNo": this.inspectNo,
        "cycleNo": this.cycleNo,
        "name": this.toolBar.name,
        "pageReq": {
          "pageNum": this.pagination.current,
          "pageSize": this.pagination.size
        }
      };
      if (this.toolBar.class.value || this.toolBar.class.value === 0) {
        params.auditStatus = this.toolBar.class.value;
      }
      queryInspectAuditByInspectPage(params).then(res => {
        if (res.code === 200) {
          res.data.records.forEach(element => {
            element.rewardStatus = element.rewardStatus ? element.rewardStatus : 0;
          });
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
     * 查询店检审核详情
     */
    toDetail(row) {
      this.$store.commit("inspectionStoreAudit/inspectionStoreAuditListSet", {
        "auditNo": row.auditNo,
        "inspectNo": row.inspectNo,
        "cycleNo": row.cycleNo,
        "isAuditDetail": true
      });
      this.$router.push({ "path": "/business/inspection/store/detail" });
    },

    /**
     * 查询店检审核
     */
    toAudit(row) {
      this.$store.commit("inspectionStoreAudit/inspectionStoreAuditListSet", {
        "auditNo": row.auditNo,
        "inspectNo": row.inspectNo,
        "cycleNo": row.cycleNo,
        "isAuditDetail": false
      });
      this.$router.push({ "path": "/business/inspection/store/detail" });
    }
  }
};