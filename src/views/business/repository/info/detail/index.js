import { articleQueryDetail, articleModifyState, pageQueryArticleCommentList, updateArticleCommentStatus } from "@/api/business/repository/info";
export default {
  "name": "repositoryInfoDetail",
  "components": {
  },
  data() {
    return {
      "articleNo": this.$route.params.id || "",
      "textarea": "",
      "config": {
        "initialFrameWidth": null,
        "initialFrameHeight": 300
      },
      "form": {
        "name": "",
        "content": "",
        "closeComment": false,
        "createUserName": "",
        "createdTime": ""
      },
      "tableData": [],
      "tableLoading": false,
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
    this.getArticleDetail();
    this.getCommentTableData();
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
          this.form.name = res.data.title;
          this.form.closeComment = res.data.openComment === 0;
          this.form.content = res.data.content;
          this.form.id = res.data.id;
          this.form.createUserName = res.data.createBy;
          this.form.createdTime = res.data.created;
        } else {
          this.$message.error(res.msg);
        }
      });
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
          this.getCommentTableData();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.getCommentTableData();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getCommentTableData();
    },
    /**
     * 分页查询评论列表
     */
    getCommentTableData() {
      const params = {
        "request": {
          "pageNum": this.pagination.current,
          "pageSize": this.pagination.size
        },
        "articleNo": this.articleNo
      };
      this.tableLoading = true;
      pageQueryArticleCommentList(params).then(res => {
        if (res.code === 200) {
          this.tableData = (res.data && res.data.records) || [];
          this.pagination.total = (res.data && res.data.total) || 0;
          this.tableLoading = false;
        } else {
          this.$message.error("查询失败");
          this.tableLoading = false;
        }
      });
    },
    /**
     * 改变状态值或者是否置顶
     * @param status
     */
    changeStatus(status) {
      const params = {
        "id": this.form.id,
        "articleType": 0,
        "statusType": 0,
        "statusValue": status
      };
      articleModifyState(params).then(res => {
        if (res.code === 200) {
          this.$message.success("修改状态成功");
          this.back();
        } else {
          this.$message.error("修改状态失败");
        }
      }).catch(error => {
        this.$message.error(error);
      });
    }
  }
};
