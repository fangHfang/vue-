// src/views/business/inspection/audit/list/index
import { queryInspectAudit, auditInspect } from "@/api/business/inspection/inspectAudit";
export default {
  "name": "inspectionStoreDetail",
  "components": {
  },
  data() {
    return {
      "form": {
        "auditName": "string",
        "auditNo": "string",
        "auditStatus": 0,
        "auditTime": "2021-02-22T03:10:45.654Z",
        "clauseList": [
          {
            "description": "string",
            "detailNo": "string",
            "exampleUrl": "string",
            "fullScore": 0,
            "imgUrl": "string",
            "inspectNo": "string",
            "name": "string",
            "obtainScore": 0,
            "requirement": "string",
            "sort": 0,
            "status": 0
          }
        ],
        "createBy": "string",
        "created": "2021-02-22T03:10:45.654Z",
        "customFullScore": 0,
        "customObtainScore": 0,
        "customerNo": "string",
        "cycleNo": "string",
        "cycleTime": "2021-02-22T03:10:45.654Z",
        "remark": "string",
        "reward": {
          "couponCount": 0,
          "couponName": "string",
          "couponNo": "string",
          "exchangeName": "string",
          "exchangeNo": "string",
          "exchangeNum": 0,
          "integralName": "string",
          "integralNo": "string",
          "integralNum": 0,
          "rebateAmount": 0,
          "rebateName": "string",
          "rebateNo": "string"
        },
        "rewardStatus": 0,
        "score": 0,
        "status": 0,
        "stock": 0,
        "storeName": "string",
        "storeNo": "string",
        "updateBy": "string",
        "updated": "2021-02-22T03:10:45.654Z",
        "userNo": "string"
      },
      "tableData": [],
      "tableLoading": false,
      "dialogVisible": false,
      "imgDialogVisible": false,
      "imgDialogSrc": ""
    };
  },
  "computed": {
    auditNo() {
      return this.$store.state.inspectionStoreAudit.auditNo;
    },
    inspectNo() {
      return this.$store.state.inspectionStoreAudit.inspectNo;
    },
    cycleNo() {
      return this.$store.state.inspectionStoreAudit.cycleNo;
    },
    isAuditDetail() {
      return this.$store.state.inspectionStoreAudit.isAuditDetail;
    }
  },
  "watch": {
    "form.clauseList": {
      handler(val) {
        val.forEach(x => {
          if (x.status === 1) {
            x.obtainScore = 0;
          }
        });
      },
      "deep": true
    }
  },
  mounted() {
    this.getInspectAuditDetail();
  },
  "methods": {
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

    showImg(src) {
      if (src) {
        this.imgDialogVisible = true;
        this.imgDialogSrc = src;
      }
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
     * 控制表格显示
     */
    tableFontClick() {
      this.tableDetailShow = !this.tableDetailShow;
    },
    tableFontClickTwo() {
      this.tableDetailShowTwo = !this.tableDetailShowTwo;
    },

    /**
     * 关闭弹窗
     * @param done
     */
    auditTips() {
      // 校验分数
      if (!this.form.customObtainScore && this.form.customObtainScore !== 0) {
        return this.$message.warning("自定义项目请打分");
      }
      if (this.form.customObtainScore > this.form.customFullScore) {
        this.$message.warning("自定义项目分值超过最高分");
        return;
      }
      let needReturn = false;
      this.form.clauseList.some(element => {
        if (!element.obtainScore && element.obtainScore !== 0) {
          needReturn = true;
          return this.$message.warning(element.name + "项目请打分");
        }
        if (element.obtainScore > element.fullScore) {
          needReturn = true;
          return this.$message.warning(element.name + "项目分值超过最高分");
        }
      });
      if (needReturn) {
        return;
      }
      const date = new Date();
      const nowMonth = date.getMonth() + 1;
      const cycleTime = this.$moment(this.form.cycleTime).format("M");
      if (nowMonth === Number(cycleTime)) {
        this.$confirm("不到次月月初强制审核，那么就按照当前提交的时间截止计算返利，是否确认打分？")
          .then(_ => {
            this.saveAuditInspect();
          })
          .catch(_ => {});
      } else {
        this.saveAuditInspect();
      }
    },

    /**
     * 查询用户数据
     */
    getInspectAuditDetail() {
      const that = this;
      this.tableLoading = true;
      const params = {
        "auditNo": this.auditNo,
        "inspectNo": this.inspectNo,
        "cycleNo": this.cycleNo
      };
      queryInspectAudit(params).then(res => {
        if (res.code === 200) {
          that.form = res.data;
          if (!this.isAuditDetail) {
            this.form.customObtainScore = "";
            this.form.score = "";
            this.form.clauseList.forEach(x => {
              x.obtainScore = "";
              x.status = 0;
            });
          } else {
            this.form.auditStatusName = [ "待审核", "合格", "不合格", "已驳回" ][this.form.auditStatus];
          }
        } else {
          this.$message.error(res.msg);
        }
        this.tableLoading = false;
      }).catch((error) => {
        console.info(error);
        this.tableLoading = false;
      });
    },
    calculate() {
      const score = this.form.clauseList.reduce((prev, cur) => {
        return prev + parseInt(cur.obtainScore || 0);
      }, 0);
      this.form.score = score + parseInt(this.form.customObtainScore || 0);
    },
    /**
     * 保存审核
     */
    saveAuditInspect() {
      const params = {
        "auditNo": this.form.auditNo,
        "customObtainScore": this.form.customObtainScore,
        "cycleNo": this.form.cycleNo,
        "inspectNo": this.inspectNo,
        "remark": this.form.remark,
        "score": this.form.score,
        "details": []
      };
      this.form.clauseList.forEach(element => {
        const detail = {
          "detailNo": element.detailNo,
          "fullScore": element.fullScore,
          "obtainScore": element.obtainScore,
          "status": element.status
        };
        params.details.push(detail);
      });
      console.info(params);
      auditInspect(params).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg);
          this.$router.back();
        }
      }).catch((error) => {
        console.info(error);
        this.$message.error(error.msg);
      });
    }
  }
};