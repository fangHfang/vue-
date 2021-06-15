import { relationCreate } from "@/api/business/news/notice";
import { pageSearchUserList } from "@/api/system/account/account";
import { listStoreByPage } from "@/api/business/signed/store";
import { pageSearchDealerList } from "@/api/downstream/dealer/info";
import { searchStoreLevelList } from "@/api/business/news/app";

export default {
  "name": "dialogConfigList",
  "components": {
  },
  "props": {
    "dialogConfig": {
      "type": Boolean,
      "default": false
    },
    "pushPlatform": {
      "type": Number,
      "default": false
    },
    "noticeNo": {
      "type": String,
      "default": false
    }
  },
  data() {
    return {
      "headTableData": [],
      "toolBar": {
        "name": "",
        "storeNo": "",
        "userName": "",
        "phone": "",
        "dealerName": "",
        "dealerNo": "",
        "level": {
          "value": "",
          "options": []
        }
      },
      "tableLoading": false,
      "subpage": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      }
    };
  },
  "computed": {},
  "watch": {
    dialogConfig(val) {
      if (val && !this.mapVue) {
        this.configPlatform();
      }
    }
  },
  mounted() {
    this.configPlatform();
    this.initSearchStoreLevelList();
  },
  "methods": {

    /**
     * 查询配置
     */
    configPlatform() {
      this.tableLoading = true;
      if (this.pushPlatform === 0) {
        this.headquarters();
      } else if (this.pushPlatform === 1) {
        this.distributor();
      } else if (this.pushPlatform === 2) {
        this.store();
        this.initSearchStoreLevelList();
      }
    },
    searchData() {
      this.subpage.current = 1;
      this.configPlatform();
    },
    /**
     * 子页面分页器每页数量变化处理
     * @param val
     */
    sizeChange(val) {
      this.subpage.size = val;
      this.configPlatform();
    },

    /**
     * 子页面分页器当前页码变化处理
     * @param val
     */
    currentChange(val) {
      this.subpage.current = val;
      this.configPlatform();
    },

    /**
     * 查询门店性质
     */
    initSearchStoreLevelList() {
      searchStoreLevelList("").then(res => {
        if (res.code === 200) {
          this.toolBar.level.options = res.data.map(element => {
            return { "label": element.dictName, "value": element.dictCode };
          });
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
        this.toolBar.level.options = [];
      });
    },

    /**
     * 查询总部pc
     */
    headquarters() {
      const params = {
        "page.pageNum": this.subpage.current,
        "page.pageSize": this.subpage.size,
        "status": "0"
      };
      if (this.toolBar.userName) {
        params.name = this.toolBar.userName;
      }
      if (this.toolBar.phone) {
        params.phone = this.toolBar.phone;
      }
      const postData = this.$jsonFormat(params);
      pageSearchUserList(postData).then(res => {
        if (res.code === 200) {
          this.headTableData = res.data.records;
          this.subpage.total = res.data.total;
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
     * 查询经销商
     */
    distributor() {
      const params = {
        "page.pageNum": this.subpage.current,
        "page.pageSize": this.subpage.size,
        "status": 0
      };
      if (this.toolBar.dealerName) {
        params.name = this.toolBar.dealerName;
      }
      if (this.toolBar.dealerNo) {
        params.dealerNo = this.toolBar.dealerNo;
      }
      const postData = this.$jsonFormat(params).substring(1);
      pageSearchDealerList(postData).then(res => {
        if (res.code === 200) {
          this.headTableData = res.data.records;
          this.subpage.total = res.data.total;
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
     * 查询门店
     */
    store() {
      let params = "page.pageNum=" + this.subpage.current + "&page.pageSize=" + this.subpage.size;
      // status 状态 ：0有效，1禁用
      params += `&name=${this.toolBar.name}&storeNo=${this.toolBar.storeNo}&dealerNo=${this.toolBar.dealerNo}&status=0&level=${this.toolBar.level.value}`;
      listStoreByPage(params).then(res => {
        if (res.code === 200) {
          this.headTableData = res.data.records;
          this.subpage.total = res.data.total;
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
     * 关闭弹窗
     */
    handleClose() {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.$emit("update:dialogConfig", false);
        })
        .catch(_ => {
        });
    },

    /**
     * 关联公告
     */
    saveRelation() {
      const rows = this.$refs.multipleTable.selection;
      const postData = {
        "noticeNo": this.noticeNo,
        "noticeType": this.pushPlatform
      };
      postData.noticeRelationModels = [];
      if (this.pushPlatform === 0) {
        rows.forEach(row => {
          const data = {
            "accountNumber": row.accountNumber,
            "name": row.name,
            "phone": row.phone,
            "userNo": row.userNo
          };
          postData.noticeRelationModels.push(data);
        });
      } else if (this.pushPlatform === 1) {
        rows.forEach(row => {
          const data = {
            "dealerCustomerNo": row.customerNo,
            "dealerNo": row.dealerNo,
            "dealerName": row.name
          };
          postData.noticeRelationModels.push(data);
        });
      } else if (this.pushPlatform === 2) {
        rows.forEach(row => {
          const data = {
            "customerNo": row.customerNo,
            "dealerNo": row.dealerNo,
            "storeName": row.name,
            "storeNo": row.storeNo,
            "storeLevel": row.level
          };
          postData.noticeRelationModels.push(data);
        });
      }
      relationCreate(postData).then(res => {
        if (res.code === 200) {
          const program = {
            "noticeNo": this.noticeNo,
            "pageReq.pageNum": 1,
            "pageReq.pageSize": 10
          };
          this.$emit("relation", program);
          this.$emit("update:dialogConfig", false);
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },
    storeChange(val) {
      this.toolBar.storeNo = val;
    },
    /**
     * 选择经销商
     */
    dealerChange(val) {
      this.toolBar.dealerNo = val;
    }
  }
};