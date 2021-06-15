// import { pageSearchStoreList, enableStore } from "@/api/downstream/store/accountApproval";
import { pageStoreList, storePassed, storeRejected, approvalSetting } from "@/api/downstream/store/accountApproval";
export default {
  "name": "storeaccountApprovalList",
  "components": {
  },
  data() {
    return {
      "statusOptions": [
        { "label": "待审批", "value": "0" },
        { "label": "审批不通过", "value": "2" }
      ],
      "toolBar": {
        "regionNo": "",
        "approveStatus": "",
        "dealerName": "", // 经销商名称,
        "dealerNo": "", // 经销商编号,
        "name": "", // 门店名称,
        "storeNo": "", // 门店编号,
        // 自动审批： 开启自动审批0,必须审批1
        "auto": "0"
      },
      "tableData": [
        // {
        //   "name": "xxx门店",
        //   "storeNo": "8908475",
        //   "imgUrl": require("@/assets/image/logo.png"),
        //   "dealerName": "xxx经销商",
        //   "dealerNo": "7864758",
        //   "locationAddress": "",
        //   "writeAddress": "",
        //   "contact": "张某某",
        //   "contactPhone": "15625382973",
        //   "approvalStatus": "1",
        //   "created": ""
        // }
      ],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
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
    this.listStoreByPage();
  },
  "methods": {
    /**
     * 搜索
     */
    searchDataPage() {
      this.pagination.current = 1;
      this.listStoreByPage();
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
      if (val.length > 1) {
        this.$message.warning("暂不支持批量处理，请重新选择门店");
        // const test = this.multipleSelection;
        // setTimeout(() => {
        //   this.$refs.table.toggleRowSelection(test[0]);
        // }, 0);
        this.$refs.table.clearSelection();
        return;
      }
      this.multipleSelection = val;
    },

    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.size = val;
      this.listStoreByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.listStoreByPage();
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
     * 分页查询用户数据
     */
    listStoreByPage() {
      const params = {
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size,
        ...this.toolBar
      };

      this.tableLoading = true;
      pageStoreList(this.$jsonFormat(params)).then(res => {
        res.data.records.forEach(element => {
          let addressDetail = (element.districtName || "").split("/").join("");
          addressDetail += element.address ? element.address : "";
          element.addressDetail = addressDetail;
        });
        this.tableData = res.data.records;
        this.pagination.total = res.data.total;
        this.tableLoading = false;
      }).catch(() => {
        this.tableLoading = false;
      });
      // const that = this;
      // this.tableLoading = true;
      // let params = "page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size;
      // if (this.toolBar.name) {
      //   params += "&name=" + this.toolBar.name;
      // }
      // if (this.toolBar.status.value !== "") {
      //   params += "&status=" + this.toolBar.status.value;
      // }
      // if (this.toolBar.dealerName) {
      //   params += "&dealerName=" + this.toolBar.dealerName;
      // }
      // if (this.toolBar.regionNo) {
      //   params += "&regionNo=" + this.toolBar.regionNo;
      // }
      // pageSearchStoreList(params).then(res => {
      //   if (res.code === 200) {
      //     res.data.records.forEach(element => {
      //       element.created = that.formatTime(element.created);
      //     });
      //     this.tableData = res.data.records;
      //     this.pagination.total = res.data.total;
      //   } else {
      //     this.$message.error(res.msg);
      //   }
      //   this.tableLoading = false;
      // }).catch((error) => {
      //   console.info(error);
      //   this.tableLoading = false;
      // });
    },

    /**
     * 上架
     */
    upShelfFunc() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length !== 1) {
        this.$message.error("请选中一条数据进行上架操作");
        return;
      }
      this.tableLoading = true;
      // const { customerNo, userNo } = multipleSelection[0];
      // const params = {
      //   "customerNo": customerNo,
      //   "storeNo": userNo
      // };
      // enableStore(params).then(res => {
      //   this.listStoreByPage();
      //   this.tableLoading = false;
      // }).catch((error) => {
      //   console.info(error);
      //   this.$message.error(error);
      //   this.tableLoading = false;
      // });
    },

    /**
     * 下架
     */
    downShelfFunc() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length !== 1) {
        this.$message.error("请选中一条数据进行下架操作");
        return;
      }
      this.tableLoading = true;
      // const { customerNo, userNo } = multipleSelection[0];
      // const params = {
      //   "customerNo": customerNo,
      //   "storeNo": userNo
      // };
      // enableStore(params).then(res => {
      //   this.listStoreByPage();
      //   this.tableLoading = false;
      // }).catch((error) => {
      //   console.info(error);
      //   this.$message.error(error);
      //   this.tableLoading = false;
      // });
    },
    /**
     * 打开到详情页
     */
    toDetail(customerNo) {
      this.$router.push({ "path": "/downstream/store/accountApproval/detail", "query": { "customerNo": customerNo } });
    },
    /**
     * 通过
     */
    rowsPass() {
      const { selection } = this.$refs.table;
      if (!selection.length) {
        this.$message.error("请选择门店");
        return;
      }
      console.log("selection", selection);
      const params = {
        "customerNo": selection.map(item => item.customerNo).join()
      };
      storePassed(params).then(res => {
        this.$message.success(res.msg);
        this.this.listStoreByPage();
      }).catch(this.$message.error);
    },
    /**
     * 拒绝
     */
    rowsRefuse() {
      const { selection } = this.$refs.table;
      if (!selection.length) {
        this.$message.error("请选择门店");
        return;
      }
      const params = {
        "customerNo": selection.map(item => item.customerNo).join()
      };
      storeRejected(params).then(res => {
        this.$message.success(res.msg);
        this.this.listStoreByPage();
      }).catch(this.$message.error);
    },
    /**
     * 选择经销商
     */
    dealerChange(item = {}) {
      // this.toolBar.dealerNo = item.dealerNo || "";
      this.toolBar.dealerName = item.contact || "";
    },
    /**
     * 选择门店
     */
    storeChange(item = {}) {
      // console.log("item", item);
      this.toolBar.name = item.name || "";
      // this.toolBar.storeNo = item.storeNo || "";
    },
    /**
     * 自动审批： 开启自动审批0,必须审批1
     */
    autoApproval() {
      const params = {
        "auto": parseInt(this.toolBar.auto)
      };
      // if(this.toolBar.auto === 0){
      //   params.distance = this.toolBar
      // }
      approvalSetting(params).then(res => {
        this.$message.success(res.msg);
        this.this.listStoreByPage();
      }).catch(this.$message.error);
    }
  }
};