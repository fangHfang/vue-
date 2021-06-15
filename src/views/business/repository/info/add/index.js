
import { articleCreate, articleQueryDetail, articleModify } from "@/api/business/repository/info";
export default {
  "name": "repositoryInfoAdd",
  "components": {
  },
  data() {
    return {
      "articleNo": this.$route.params.id || "",
      "identity": "add",
      "pageTitle": "新增资讯",
      "config": {
        "initialFrameWidth": null,
        "initialFrameHeight": 300
      },
      "form": {
        "name": "",
        "closeComment": false,
        "content": "",
        "id": ""
      }
    };
  },
  "computed": {
    token() {
      return { "Authorization": "bearer " + this.$store.state.token };
    }
  },
  mounted() {
    const path = this.$route.path.split("/");
    if (this.articleNo) {
      this.pageTitle = "编辑资讯";
      this.identity = path[path.length - 2];
      this.getArticleDetail();
    }
  },
  "methods": {
    /**
     * 获取详情
     */
    getArticleDetail() {
      const params = {
        "articleNo": this.articleNo
      };
      articleQueryDetail(params).then(res => {
        if (res.code === 200) {
          this.form.name = res.data.title;
          this.form.closeComment = res.data.openComment === 0;
          this.form.content = res.data.content;
          this.form.id = res.data.id;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /**
     * 保存
     */
    save() {
      this.doSave();
    },
    doSave(publish) {
      const content = this.$refs.tinyEditor && this.$refs.tinyEditor.getEditorContent();
      const params = {
        "articleType": 0,
        "content": content,
        "openComment": this.form.closeComment ? 0 : 1,
        // 平台类型 0-总部 1-经销商 2-门店
        "platformType": 0,
        "title": this.form.name
      };
      params.isPublish = publish ? 1 : 0;

      if (this.articleNo) {
        params.id = this.form.id;
        articleModify(params).then(res => {
          if (res.code === 200) {
            this.$message.success(publish ? "发布成功" : "保存成功");
            this.back();
          } else {
            this.$message.error(res.msg);
          }
        });
        return;
      }
      articleCreate(params).then(res => {
        if (res.code === 200) {
          this.$message.success(publish ? "发布成功" : "保存成功");
          this.back();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /**
     * 发布
     */
    publish() {
      this.doSave(true);
    },
    /**
     * 返回
     */
    back() {
      this.$store.dispatch("tabbar/delView", this.$route).then(() => {
        this.$router.back();
      }).catch(() => {});
    }
  }
};
