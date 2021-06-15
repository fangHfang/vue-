import { pageSearchStoreList } from "@/api/downstream/store/info";
export default {
  "name": "AppPageStoreChooseDialog",
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    }
  },
  data() {
    return {
      "toolBar": {
        "name": "",
        "distributorName": "",
        "nature": {
          "value": "",
          "options": [
            { "label": "门店一", "value": "1" },
            { "label": "门店二", "value": "2" },
            { "label": "门店三", "value": "3" }
          ]
        },
        "tag": {
          "value": "",
          "options": [
            { "label": "门店一", "value": "1" },
            { "label": "门店二", "value": "2" },
            { "label": "门店三", "value": "3" }
          ]
        },
        "distributor": {
          "value": "",
          "options": [
            { "label": "门店一", "value": "1" },
            { "label": "门店二", "value": "2" },
            { "label": "门店三", "value": "3" }
          ]
        }
      },
      "tableData": [
        {
          "index": "1",
          "distributorCode": "1215645634466",
          "distributorName": "所属经销商名称文案",
          "distributorLabel": "NUY",
          "storeCode": "2369525448",
          "storeName": "门店名称门店名称",
          "storeLabel": "ACV"
        }, {
          "index": "2",
          "distributorCode": "1215645634466",
          "distributorName": "所属经销商名称文案",
          "distributorLabel": "NUY",
          "storeCode": "2369525448",
          "storeName": "门店名称门店名称",
          "storeLabel": "ACV"
        }, {
          "index": "3",
          "distributorCode": "1215645634466",
          "distributorName": "所属经销商名称文案",
          "distributorLabel": "NUY",
          "storeCode": "2369525448",
          "storeName": "门店名称门店名称",
          "storeLabel": "ACV"
        }
      ],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "tableLoading": false,
      "multipleSelection": []
    };
  },
  "computed": {},
  mounted() {
    this.listStoreByPage();
  },
  "methods": {
    /**
     * 分页查询用户数据
     */
    listStoreByPage() {
      this.tableLoading = true;
      let params = "page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size;
      if (this.toolBar.name) {
        params += "&name=" + this.toolBar.name;
      }
      if (this.toolBar.distributorName) {
        params += "&dealerName=" + this.toolBar.distributorName;
      }
      pageSearchStoreList(params).then(res => {
        if (res.code === 200) {
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
     * 多选处理
     * @param {*} val 选中对象
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$emit("update:dialogVisible", false);
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
     * 获取选中数据
     */
    addStore() {
      if (this.multipleSelection.length === 0) {
        return this.$message.info("请至少选择一条数据");
      }
      this.$emit("selectStores", this.multipleSelection);
      this.$emit("update:dialogVisible", false);
    }
  }
};