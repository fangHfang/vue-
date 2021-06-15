import { detailRenewQuery, examineRenewQuery } from "@/api/business/reassure/order";
export default {
  "name": "reassureOrderList",
  "components": {
  },
  data() {
    return {
      "id": this.$route.params.id || "",
      "detailLoading": false,
      "detail": {},
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "searchTableShow": true,
      "multipleSelection": [],
      "refuseReason": "",
      "refuseDialog": false,
      "imgDialogVisible": false,
      "imgDialogSrc": ""
    };
  },
  "computed": {},
  mounted() {
    this.queryDetail();
  },
  "methods": {
    /**
     * 查询详情数据
     */
    queryDetail() {
      const params = {
        "renewNo": this.id
      };
      this.detailLoading = true;
      detailRenewQuery(params).then(res => {
        if (res.code === 200) {
          const data = res.data || {};
          this.detail = data;
          // data.renewDetailList = [
          //   {
          //     "renewDetailOneImageUrl": require("@/assets/image/pd-img.jpg"),
          //     "renewDetailOneApprovalStatus": 1,
          //     "renewDetailNo": 111,
          //     "renewDetailTwoImageUrl": require("@/assets/image/pd-img.jpg"),
          //     "renewDetailTwoApprovalStatus": 2
          //   }
          // ];
          this.tableData = data.renewDetailList.filter(x => !x.renewDetailType) || [];
        } else {
          this.$message.error(res.msg);
        }
        this.detailLoading = false;
      }).catch(() => {
        this.detailLoading = false;
      });
    },
    /**
     * 控制表格显示
     */
    tableFontClick() {
      this.searchTableShow = !this.searchTableShow;
    },
    /**
     * 返回
     */
    back() {
      this.$store.dispatch("tabbar/delView", this.$route).then(() => {
        this.$router.back();
      }).catch(() => {});
    },
    showImg(src) {
      this.imgDialogVisible = true;
      this.imgDialogSrc = src;
    },
    /**
     * 审核
     */
    examine(mark) {
      const params = {
        "renewNo": this.id,
        "updateImageList": this.tableData,
        "allFlag": 1
      };
      if (mark === 2) {
        this.refuseDialog = true;
        return;
      }
      this.doVerify(params);
    },
    closedDialog() {
      this.refuseReason = "";
    },
    /**
     * 拒绝
     */
    doRefusing() {
      if (!this.refuseReason) {
        return this.$message.warning("请输入拒绝理由");
      }
      this.tableData.forEach(x => {
        x.approvalMemo = this.refuseReason;
      });
      const params = {
        "renewNo": this.id,
        "updateImageList": this.tableData,
        "allFlag": false
      };
      this.doVerify(params);
    },
    doVerify(params) {
      this.detailLoading = true;
      examineRenewQuery(params).then(res => {
        if (res.code === 200) {
          this.refuseDialog = false;
          this.$message.success("审核成功！");
          this.queryDetail();
        } else {
          this.$message.error(res.msg);
          this.detailLoading = false;
        }
      }).catch(() => {
        this.detailLoading = false;
      });
    },
    /**
     * 审核一条数据
     * @param row
     * @param mark
     * @param status
     */
    examineOne(row, mark, status) {
      const key = "renewDetail" + mark + "ApprovalStatus";
      row[key] = status;
      const params = {
        "renewNo": this.id,
        "updateImageList": this.tableData
      };
      this.doVerify(params);
    }
  }
};