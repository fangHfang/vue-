import { listNoticeByPage, enable, disable, relation } from "@/api/business/news/notice";
import { relationDelete, searchStoreLevelList } from "@/api/business/news/app";
import dialogForm from "../config/index.vue";
export default {
  "name": "businessNewsNoticeList",
  "components": {
    dialogForm
  },
  data() {
    return {
      "toolBar": {
        "title": "",
        "status": {
          "value": "",
          "options": [
            { "label": "关闭", "value": "0" },
            { "label": "开启", "value": "1" }
          ]
        },
        "createBy": ""
      },
      "tableData": [],
      "headTableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "subpage": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "dialogVisible": false,
      "dialogConfig": false,
      "tableLoading": false,
      "title": "配置",
      "pushPlatform": "",
      "noticeNo": "",
      "multipleSelection": [],
      "relationBar": {
        "dealerNo": "",
        "storeNo": "",
        "accountNumber": "",
        "phone": "",
        "level": {
          "value": "",
          "options": []
        }
      }
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  "watch": {
    dialogVisible(val) {
      if (!val) {
        this.relationBar = {
          "dealerNo": "",
          "storeNo": "",
          "accountNumber": "",
          "phone": "",
          "level": {
            "value": "",
            "options": []
          }
        };
        this.$refs.dealer && this.$refs.dealer.cleanDealer();
        this.$refs.store && this.$refs.store.cleanStore();
        // 门店性质
        this.initSearchStoreLevelList();
      }
    }
  },
  mounted() {
    this.listNoticeByPage();
    // 门店性质
    this.initSearchStoreLevelList();
  },
  "methods": {
    /**
     * 查询按钮方法
     */
    searchData() {
      this.pagination.current = 1;
      this.listNoticeByPage();
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listNoticeByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listNoticeByPage();
    },

    /**
     * 查询门店性质
     */
    initSearchStoreLevelList() {
      searchStoreLevelList("").then(res => {
        if (res.code === 200) {
          this.relationBar.level.options = res.data.map(element => {
            return { "label": element.dictName, "value": element.dictCode };
          });
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
        this.relationBar.level.options = [];
      });
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
     * 跳转到消息新增
     */
    jumpAdd() {
      this.$router.push({ "path": "/business/news/notice/add", "query": { "r": this.$getRandomValue() } });
    },

    /**
     * 分页查询数据
     * @param clear 是否清空
     */
    listNoticeByPage() {
      const params = {
        ...this.toolBar,
        "status": this.toolBar.status.value,
        "pageReq.pageNum": this.pagination.current,
        "pageReq.pageSize": this.pagination.size
      };
      this.tableLoading = true;
      listNoticeByPage(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
        this.tableLoading = false;
      }).catch((error) => {
        this.tableLoading = false;
        console.info(error);
      });
    },

    /**
     * 修改状态
     */
    transferStatus(status, noticeNo) {
      if (status === 0) {
        enable(noticeNo).then(res => {
          if (res.code === 200) {
            this.listNoticeByPage();
          } else {
            this.$message.error(res.msg);
          }
        }).catch((error) => {
          console.info(error);
        });
      } else if (status === 1) {
        disable(noticeNo).then(res => {
          if (res.code === 200) {
            this.listNoticeByPage();
          } else {
            this.$message.error(res.msg);
          }
        }).catch((error) => {
          console.info(error);
        });
      }
    },

    /**
     * 跳转到修改
     */
    edit(noticeNo) {
      this.$router.push({ "path": "/business/news/notice/add", "query": { "noticeNo": noticeNo } });
    },

    /**
     * 查询配置
     */
    configure(pushPlatform, noticeNo) {
      this.dialogVisible = true;
      this.pushPlatform = pushPlatform;
      this.noticeNo = noticeNo;
      this.relation();
    },

    /**
     * 子页面分页器每页数量变化处理
     * @param val
     */
    sizeChange(val) {
      this.subpage.size = val;
      this.relation();
    },

    /**
     * 子页面分页器当前页码变化处理
     * @param val
     */
    currentChange(val) {
      this.subpage.current = val;
      this.relation();
    },

    doSearchRelation() {
      this.subpage.current = 1;
      this.relation();
    },
    /**
     * 查询公告关联
     */
    relation() {
      const params = {
        "noticeNo": this.noticeNo,
        "pageReq.pageNum": this.subpage.current,
        "pageReq.pageSize": this.subpage.size
      };
      if (this.relationBar.storeNo) {
        params.storeNo = this.relationBar.storeNo;
      }
      if (this.relationBar.dealerNo) {
        params.dealerNo = this.relationBar.dealerNo;
      }
      if (this.relationBar.accountNumber) {
        params.accountNumber = this.relationBar.accountNumber;
      }
      if (this.relationBar.phone) {
        params.phone = this.relationBar.phone;
      }
      if (this.relationBar.level.value) {
        params.storeLevel = this.relationBar.level.value;
      }
      relation(params).then(res => {
        if (res.code === 200) {
          this.headTableData = res.data.records;
          this.subpage.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },
    openDialog() {
      if (this.pushPlatform === 0) {
        this.title = "配置总部";
      } else if (this.pushPlatform === 1) {
        this.title = "配置经销商";
      } else if (this.pushPlatform === 2) {
        this.title = "配置门店";
      }
      this.dialogConfig = true;
    },

    clearToolBar() {
      this.toolBar.status.value = "";
      this.toolBar.title = "";
      this.toolBar.createBy = "";
      this.pagination.current = 1;
      this.pagination.size = 10;
      this.listNoticeByPage();
    },
    /**
     * 获取勾选的行
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    /**
     * 删除门店
     */
    delStore() {
      if (this.multipleSelection.length < 1) {
        return this.$message.info("请至少选择一条数据");
      }
      this.$confirm("是否确定要删除所选门店?", "删除门店", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        const params = {
          "nos": this.multipleSelection.map(x => {
            return x.storeNo;
          }),
          "noticeNo": this.noticeNo,
          "noticeType": 2
        };
        relationDelete(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("删除成功");
            this.relation();
          } else {
            this.$message.error(res.msg);
          }
        });
      }).catch(() => {});
    },
    storeChange(val) {
      this.relationBar.storeNo = val;
    },
    /**
     * 选择经销商
     */
    dealerChange(val) {
      this.relationBar.dealerNo = val;
    }
  }
};