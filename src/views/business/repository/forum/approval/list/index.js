
import dialogAddRule from "../rule/index.vue";
import { articleAuditList, saveArticleRule } from "@/api/business/repository/info";
export default {
  "name": "repositoryApprovalList",
  "components": {
    dialogAddRule
  },
  data() {
    return {
      // 审核状态
      "statusOptions": [
        // { "label": "关闭", "value": 0 },
        // { "label": "启用", "value": 1 }
        { "label": "待审核", "value": 0 },
        { "label": "已通过", "value": 1 },
        { "label": "已驳回", "value": 2 }
      ],
      "toolBar": {
        "title": "",
        // 创建人
        "userName": "",
        "storeName": "",
        "storeNo": "",
        "_date": [],
        // 状态【0-关闭 1-启用】
        "status": "",
        // 创建开始时间
        "startTime": "",
        // 创建结束时间
        "endTime": ""

      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "multipleSelection": [],
      "tableLoading": false,
      "dialogVisible": false
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.getRemoteTableData();
  },
  "methods": {
    /**
     * 查询按钮方法
     */
    searchData() {
      this.pagination.current = 1;
      this.getRemoteTableData();
    },
    /**
     * 分页查询帖子列表
     */
    getRemoteTableData() {
      const { current, size } = this.pagination;
      const params = {
        ...this.toolBar,
        "request": {
          "pageNum": current, "pageSize": size
        }
      };

      if (this.toolBar._date && this.toolBar._date.length) {
        params.startTime = this.toolBar._date[0];
        params.endTime = this.toolBar._date[1];
      }
      if (this.toolBar.status || this.toolBar.status === 0) {
        params.auditStatus = this.toolBar.status;
      }
      delete params._date;
      delete params.status;
      this.tableLoading = true;
      articleAuditList(params).then(res => {
        this.tableData = res.data.records;
        this.pagination.total = res.data.total;
        this.tableLoading = false;
      }).catch(() => {
        this.tableLoading = false;
      });
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.getRemoteTableData();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getRemoteTableData();
    },

    /**
     * 获取勾选的行
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 审批某个帖子
     */
    approval() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length !== 1) {
        return this.$message.info("请仅选中一条数据!");
      }
      const row = multipleSelection[0];
      let mark = "approve";
      if (row.auditStatus !== 0) {
        mark = "detail";
        return this.$message.info("该帖子已审核过了");
      }
      this.$router.push({ "path": "/business/repository/forum/approval/detail/" + row.articleNo, "query": { "id": row.id, mark } });
    },
    /**
     * 跳转到审核
     */
    toDetail(row, mark) {
      this.$router.push({ "path": "/business/repository/forum/approval/detail/" + row.articleNo, "query": { "id": row.id, mark } });
    },
    /**
       * 获取规则返回值
       * @param val
       */
    getSelectRule(val) {
      const params = {
        "contentMaxCount": val.wordNum,
        "format": val.radio,
        "imgMaxCount": val.imgNum,
        "ruleEndTime": val.date[1],
        "ruleStartTime": val.date[0]
      };
      saveArticleRule(params).then(res => {
        if (res.code === 200) {
          this.$message.success("设置发帖规则成功");
          this.dialogVisible = false;
        } else {
          this.$message.success("设置发帖规则失败");
        }
      });
    },
    /**
     * 跳转到配置门店
     */
    toStore(row) {
      this.$router.push({ "path": "/business/repository/store/" + row.articleNo });
    },
    storeChange(val) {
      this.toolBar.storeNo = val;
    }
  }
};