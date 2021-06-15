import { articleQueryDetail, auditAticleById } from "@/api/business/repository/info";
export default {
  "name": "repositoryApprovalDetail",
  "components": {
  },
  data() {
    return {
      "articleNo": this.$route.params.id,
      "id": this.$route.query.id,
      "mark": this.$route.query.mark,
      "textarea": "",
      "config": {
        "initialFrameWidth": null,
        "initialFrameHeight": 300
      },
      "form": {
        "title": "",
        "content": "",
        "openComment": false,
        "createUserName": "",
        "storeName": "",
        "created": "",
        "auditReason": ""
      }
    };
  },
  "computed": {},
  mounted() {
    this.getArticleDetail();
  },
  beforeDestroy() {

  },
  destroyed() {
  },
  "methods": {
    /**
     * 返回
     */
    back() {
      this.$store.dispatch("tabbar/delView", this.$route).then(() => {
        this.$router.back();
      }).catch(() => {});
    },

    /**
     * 获取详情
     */
    getArticleDetail() {
      const params = {
        "articleNo": this.articleNo
      };
      articleQueryDetail(params).then(res => {
        if (res.code === 200) {
          this.form = res.data;
          this.form.openComment = res.data.openComment === 0;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /**
     * 审核帖子
     */
    saveApproval(state) {
      if (state === 2) {
        if (!this.form.auditReason) {
          return this.$message.warning("请输入驳回原因");
        }
      }
      const params = {
        "auditReason": this.form.auditReason,
        "auditStatus": state,
        "id": this.id || this.articleNo
      };
      auditAticleById(params).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg);
          setTimeout(() => {
            this.back();
          }, 500);
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
};
