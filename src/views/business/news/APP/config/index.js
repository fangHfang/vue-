import { relationCreate, searchStoreLevelList } from "@/api/business/news/app";
import { listStoreByPage } from "@/api/business/signed/store";
export default {
  "name": "dialogConfigList",
  "components": {
  },
  "props": {
    "dialogConfig": {
      "type": Boolean,
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
        this.cleanSearch();
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
      this.subpage.current = 1;
      this.store();
      this.initSearchStoreLevelList();
    },
    cleanSearch() {
      this.toolBar = {
        "name": "",
        "storeNo": "",
        "dealerNo": "",
        "level": {
          "value": "",
          "options": []
        }
      };
      this.$refs.dealer && this.$refs.dealer.cleanDealer();
      this.$refs.store && this.$refs.store.cleanStore();
      this.configPlatform();
    },
    /**
     * 子页面分页器每页数量变化处理
     * @param val
     */
    sizeChange(val) {
      this.subpage.size = val;
      this.store();
    },

    /**
     * 子页面分页器当前页码变化处理
     * @param val
     */
    currentChange(val) {
      console.log(val);
      this.subpage.current = val;
      this.store();
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
     * 查询门店
     */
    store() {
      let params = "page.pageNum=" + this.subpage.current + "&page.pageSize=" + this.subpage.size;
      // status 状态 ：0有效，1禁用
      params += `&name=${this.toolBar.name}&storeNo=${this.toolBar.storeNo}&dealerNo=${this.toolBar.dealerNo}&status=0&level=${this.toolBar.level.value}`;
      this.tableLoading = true;
      listStoreByPage(params).then(res => {
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
        "noticeType": 2
      };
      postData.noticeRelationModels = [];
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