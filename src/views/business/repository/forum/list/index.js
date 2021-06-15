import { articleQueryList, articleModifyState } from "@/api/business/repository/info";
export default {
  "name": "repositoryInfoList",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "title": "",
        "userName": "",
        "storeName": "",
        "storeNo": "",
        "date": [],
        "status": {
          "value": "",
          "options": [
            { "label": "停用", "value": 0 },
            { "label": "启用", "value": 1 }
          ]
        }
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "multipleSelection": [],
      "tableLoading": false
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
      const params = {
        "request": {
          "pageNum": this.pagination.current,
          "pageSize": this.pagination.size
        },
        "userName": this.toolBar.userName,
        "title": this.toolBar.title,
        "articleType": 1,
        "content": this.toolBar.content,
        "storeNo": this.toolBar.storeNo
      };
      if (this.toolBar.date && this.toolBar.date.length > 0) {
        params.startTime = this.toolBar.date[0];
        params.endTime = this.toolBar.date[1];
      }
      if (this.toolBar.status.value || this.toolBar.status.value === 0) {
        params.status = this.toolBar.status.value;
      }
      this.tableLoading = true;
      articleQueryList(params).then(res => {
        if (res.code === 200) {
          const list = (res.data && res.data.records) || [];
          this.tableData = list.map(x => {
            return {
              ...x,
              "storeListName": x.storeList && x.storeList.map(y => y.storeName).join("|")
            };
          });
          this.pagination.total = (res.data && res.data.total) || 0;
          this.tableLoading = false;
        } else {
          this.$message.error("查询失败");
          this.tableLoading = false;
        }
      });
    },
    /**
     * 重置按钮
     */
    resetTableData() {
      this.toolBar.date = [];
      this.toolBar.title = "";
      this.toolBar.userName = "";
      this.toolBar.status.value = "";
      this.toolBar.storeNo = "";
      this.toolBar.storeName = "";
      this.pagination.current = 1;
      this.$refs.store && this.$refs.store.cleanStore();
      this.getRemoteTableData();
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
     * 编辑某个帖子
     */
    toEdit() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length < 1) {
        this.$message.info("请至少选中一条数据!");
        return;
      }
      this.$router.push({ "path": "/business/repository/forum/edit/" + multipleSelection[0].articleNo });
    },
    /**
     * 批量改变状态值
     * @param status
     */
    changeAllStatus(status) {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length < 1) {
        this.$message.info("请至少选中一条数据!");
        return;
      }
      const len = multipleSelection.length - 1;
      multipleSelection.forEach((element, index) => {
        const params = {
          "id": element.id,
          "articleType": 1,
          "statusType": 0,
          "statusValue": status
        };
        articleModifyState(params).then(res => {
          if (len === index) {
            if (res.code === 200) {
              this.$message.success("修改状态成功");
              this.getRemoteTableData();
            } else {
              this.$message.error("修改状态失败");
            }
          }
        }).catch(error => {
          this.$message.error(error);
        });
      });
    },
    /**
     * 改变状态值或者是否置顶
     * @param row
     * @param mark
     */
    changeStatus(row, mark) {
      const params = {
        "id": row.id,
        "articleType": 1
      };
      if (mark === "top") {
        params.statusType = 1;
        params.statusValue = 1 - row.isTop;
      } else if (mark === "status") {
        params.statusType = 0;
        params.statusValue = 1 - row.status;
      }
      articleModifyState(params).then(res => {
        if (res.code === 200) {
          this.$message.success("修改状态成功");
          this.getRemoteTableData();
        } else {
          this.$message.error("修改状态失败");
        }
      }).catch(error => {
        this.$message.error(error);
      });
    },
    /**
     * 跳转到新增资讯
     */
    toAdd() {
      this.$router.push({ "path": "/business/repository/forum/add" });
    },
    /**
     * 跳转到资讯详情
     */
    toDetail(row) {
      this.$router.push({ "path": "/business/repository/forum/detail/" + row.articleNo });
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