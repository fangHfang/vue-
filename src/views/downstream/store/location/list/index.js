// src/views/downstream/store/location/list/index
import { pageSearchStoreLocationList, enableStoreLocation, disableStoreLocation } from "@/api/downstream/store/location";
export default {
  "name": "StoreLocationList",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "storeNo": "",
        "name": "",
        "dealerNo": "",
        "dealerName": "",
        "approveStatus": {
          "value": "",
          "options": [
            { "label": "禁用", "value": 0 },
            { "label": "启用", "value": 1 }
          ]
        }
      },
      "tableData": [],
      "tableLoading": false,
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0,
        "field": "userNo",
        "order": "asc"
      },
      "dialogVisible": false,
      "multipleSelection": []
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.listStoreLocationByPage();
  },
  "methods": {

    /**
     * 查询按钮方法
     */
    searchStoreLocationListByPage() {
      this.pagination.current = 1;
      this.listStoreLocationByPage();
    },

    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listStoreLocationByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listStoreLocationByPage();
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
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    /**
     * 分页查询用户数据
     */
    listStoreLocationByPage() {
      this.tableLoading = true;
      let params = "page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size;
      if (this.toolBar.name) {
        params += "&name=" + this.toolBar.name;
      }
      if (this.toolBar.storeNo) {
        params += "&storeNo=" + this.toolBar.storeNo;
      }
      if (this.toolBar.dealerName) {
        params += "&dealerName=" + this.toolBar.dealerName;
      }
      if (this.toolBar.dealerNo) {
        params += "&dealerNo=" + this.toolBar.dealerNo;
      }
      if (this.toolBar.approveStatus.value !== "") {
        params += "&approveStatus=" + this.toolBar.approveStatus.value;
      }
      pageSearchStoreLocationList(params).then(res => {
        if (res.code === 200) {
          res.data.records.forEach(element => {
            let addressDetail = (element.districtName || "").split("/").join("");
            addressDetail += element.address ? element.address : "";
            element.addressDetail = addressDetail;
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
     * 启用
     */
    enableStoreLocationFunc() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length < 1) {
        this.$message.error("请选中至少一条数据进行启用操作!");
        return;
      }
      const length = multipleSelection.length - 1;

      multipleSelection.forEach((element, index) => {
        const params = {
          "customerNo": element.customerNo,
          "storeLocationNo": element.storeLocationNo,
          "status": 0
        };
        enableStoreLocation(params).then(res => {
          if (length === index) {
            this.listStoreLocationByPage();
          }
        }).catch((error) => {
          console.info(error);
          this.$message.error(error);
        });
      });
    },

    /**
     * 禁用
     */
    disableStoreLocationFunc() {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection.length < 1) {
        this.$message.error("请选中至少一条数据进行禁用操作!");
        return;
      }
      const length = multipleSelection.length - 1;
      multipleSelection.forEach((element, index) => {
        const params = {
          "customerNo": element.customerNo,
          "storeLocationNo": element.storeLocationNo,
          "status": 1
        };
        disableStoreLocation(params).then(res => {
          if (length === index) {
            this.listStoreLocationByPage();
          }
        }).catch((error) => {
          console.info(error);
          this.$message.error(error);
        });
      });
    },

    /**
     * 启用单条
     */
    enableStoreLocationSingle(customerNo, storeLocationNo) {
      const params = {
        "customerNo": customerNo,
        "status": 0,
        "storeLocationNo": storeLocationNo
      };
      enableStoreLocation(params).then(res => {
        this.listStoreLocationByPage();
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
      });
    },

    /**
     * 禁用单条
     */
    disableStoreLocationSingle(customerNo, storeLocationNo) {
      const params = {
        "customerNo": customerNo,
        "status": 1,
        "storeLocationNo": storeLocationNo
      };
      disableStoreLocation(params).then(res => {
        this.listStoreLocationByPage();
      }).catch((error) => {
        console.info(error);
        this.$message.error(error);
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