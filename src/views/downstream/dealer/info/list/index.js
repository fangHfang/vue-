// src/views/downstream/dealer/info/list/index
import { pageSearchDealerList, enableDealer, disableDealer } from "@/api/downstream/dealer/info";
export default {
  "name": "dealerInfoList",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "dealerNo": "",
        "name": "",
        "storeNo": "",
        "storeName": "",
        "class": {
          "value": "",
          "options": [
            { "label": "有效", "value": 0 },
            { "label": "冻结", "value": 1 }
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
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.listDealerByPage();
  },
  activated() {
    this.listDealerByPage();
  },
  "methods": {
    /**
     * 查询按钮方法
     */
    searchDealerListByPage() {
      this.pagination.current = 1;
      this.listDealerByPage();
    },
    /**
     * 格式化时间
     * @param {*} str 时间字符串
     */
    formatTime(str) {
      str = str || "";
      return str.substring(0, 10) + " " + str.substring(11, 19);
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
      this.pagination.size = val;
      this.listDealerByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listDealerByPage();
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
     * 跳转新增
     */
    toAdd() {
      this.$store.commit("dealerInfo/dealerInfoListSet", {
        "detail": false,
        "modify": false
      });
      this.$router.push({ "path": "/downstream/dealer/info/add" });
    },

    /**
     * 打开修改
     */
    toEdit(customerNo, dealerNo, tenantNo) {
      // const multipleSelection = this.multipleSelection;
      // if (multipleSelection.length !== 1) {
      //   this.$message.error("请选中一条数据进行修改操作");
      //   return;
      // }
      this.$confirm("请重新编辑经销商?", "编辑经销商", {
        "confirmButtonText": "编辑",
        "cancelButtonText": "取消",
        "type": "warning"
      }).then(() => {
        // 确认编辑-跳转到编辑页面
        this.$store.commit("dealerInfo/dealerInfoListSet", {
          "modify": true,
          "detail": false,
          "customerNo": customerNo,
          "dealerNo": dealerNo,
          "tenantNo": tenantNo
        });
        this.$router.push({ "path": "/downstream/dealer/info/add" });
      }).catch(() => {});
    },

    /**
     * 打开修改
     */
    toDetail(customerNo, dealerNo, tenantNo) {
      // 确认编辑-跳转到编辑页面
      this.$store.commit("dealerInfo/dealerInfoListSet", {
        "modify": true,
        "detail": true,
        "customerNo": customerNo,
        "dealerNo": dealerNo,
        "tenantNo": tenantNo
      });
      this.$router.push({ "path": "/downstream/dealer/info/add" });
    },
    /**
     * 分页查询经销商数据
     */
    listDealerByPage() {
      const that = this;
      this.tableLoading = true;
      let params = "page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size;
      if (this.toolBar.name) {
        params += "&name=" + this.toolBar.name;
      }
      if (this.toolBar.dealerNo) {
        params += "&dealerNo=" + this.toolBar.dealerNo;
      }
      if (this.toolBar.storeName) {
        params += "&storeName=" + this.toolBar.storeName;
      }
      if (this.toolBar.storeNo) {
        params += "&storeNo=" + this.toolBar.storeNo;
      }
      if (this.toolBar.class.value !== "") {
        params += "&status=" + this.toolBar.class.value;
      }
      this.tableLoading = true;
      pageSearchDealerList(params).then(res => {
        if (res.code === 200) {
          res.data.records.forEach(element => {
            element.created = that.formatTime(element.created);
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
     * 启用经销商
     */
    enableDealerFunc() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length !== 1) {
        this.$message.error("请选中一条数据进行启用操作");
        return;
      }
      this.tableLoading = true;
      const { customerNo, dealerNo, tenantNo } = multipleSelection[0];
      const params = {
        "customerNo": customerNo,
        "dealerNo": dealerNo,
        "tenantNo": tenantNo
      };
      enableDealer(params).then(res => {
        this.listDealerByPage();
        this.tableLoading = false;
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
        this.tableLoading = false;
      });
    },

    /**
     * 禁用经销商
     */
    disableDealerFunc() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length !== 1) {
        this.$message.error("请选中一条数据进行禁用操作");
        return;
      }
      this.tableLoading = true;
      const { customerNo, dealerNo, tenantNo } = multipleSelection[0];
      const params = {
        "customerNo": customerNo,
        "dealerNo": dealerNo,
        "tenantNo": tenantNo
      };
      disableDealer(params).then(res => {
        this.listDealerByPage();
        this.tableLoading = false;
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
        this.tableLoading = false;
      });
    },
    /**
     * 选择经销商
     */
    dealerChange(val) {
      this.toolBar.dealerNo = val;
    }
  }
};