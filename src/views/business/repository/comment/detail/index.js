import { queryCommentDetail, updateArticleCommentStatus } from "@/api/business/repository/info";
export default {
  "name": "commentManageDetail",
  "components": {
  },
  data() {
    return {
      "id": this.$route.query.id || "",
      "radio": "1",
      "config": {
        "initialFrameWidth": null,
        "initialFrameHeight": 300
      },
      "form": {
        "title": "",
        "activeType": {
          "value": "",
          "options": []
        },
        "articleContent": "",
        "createBy": "",
        "storeName": "",
        "crerated": "2020-11-12 13:31:12",
        "content": ""
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "dialogVisible": false
    };
  },
  "computed": {},
  mounted() {
    console.log(this.$route.query.id);
    this.getArticleDetail();
  },
  "methods": {
    /**
     * 获取详情
     */
    getArticleDetail() {
      const params = {
        "request": {
          "pageNum": this.pagination.current,
          "pageSize": this.pagination.size
        },
        "id": this.id
      };
      queryCommentDetail(params).then(res => {
        if (res.code === 200) {
          this.form = res.data;
          this.form.articleType = res.data.articleType === 1 ? "论坛" : "资讯";
          this.tableData = res.data.replyPage.records;
          this.pagination.total = res.data.replyPage.total;
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /**
       * 返回
       * @param val
       */
    back() {
      this.$router.back(-1);
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.getArticleDetail();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getArticleDetail();
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
     * 修改回复评论状态
     * @param row
     * @param type 0-停用 1-启用
     */
    operationStatus(row, type) {
      const params = {
        "id": row.id,
        "status": type
      };
      updateArticleCommentStatus(params).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg);
          this.getArticleDetail();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /**
     * 修改评论状态
     * @param type 0-停用 1-启用
     */
    saveStatus(type) {
      const params = {
        "id": this.id,
        "status": type
      };
      updateArticleCommentStatus(params).then(res => {
        if (res.code === 200) {
          this.$message.success(res.msg);
          this.back();
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  }
};
