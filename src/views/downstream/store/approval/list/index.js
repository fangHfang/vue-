// src/views/downstream/store/location/list/index
import dialogAddLocation from "../location/index.vue";
import { pageSearchStoreLocationList } from "@/api/downstream/store/location";
export default {
  "name": "StoreLocationList",
  "components": {
    dialogAddLocation
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
            { "label": "待处理", "value": "0" },
            { "label": "已通过", "value": "1" },
            { "label": "已拒绝", "value": "2" }
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
      "multipleSelection": [],
      // 新增定位审批
      "mapLocation": {},
      "dialogLocationVisible": false
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
     * 跳转到审批页面
     */
    toApproveView(item) {
      this.$store.commit("storeLocationApproval/storeLocationApprovalManageListSet", {
        "customerNo": item.customerNo,
        "storeLocationNo": item.storeLocationNo,
        "approveStatus": item.approveStatus
      });
      this.$router.push({ "path": "/downstream/store/approval/detail" });
    },
    /**
       * 获取新增定位审批信息
       * @param val
       */
    getSelectLocation(val) {
      this.mapLocation = val;
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