import { pageRenewQuery } from "@/api/business/reassure/order";
export default {
  "name": "reassureOrderList",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "renewStatus": {
          "value": "",
          "options": [
            { "label": "审核中", "value": 0 },
            { "label": "未通过", "value": 1 },
            { "label": "已通过", "value": 2 },
            { "label": "已换新", "value": 3 }
          ]
        },
        "renewApprovalStatus": {
          "value": "",
          "options": [
            { "label": "待审批", "value": 1 },
            { "label": "审批通过", "value": 2 },
            { "label": "审批拒绝", "value": 3 }
          ]
        },
        "createTime": [],
        "carName": "",
        "carNumber": "",
        "warehouseOutNo": "",
        "renewSearchItemName": "",
        "renewSearchNewItemName": "",
        "storeNo": "",
        "dealerNo": ""
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "tableLoading": false,
      "multipleSelection": [],
      "searchDetailShow": true
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.listRemoteDataByPage();
  },
  "methods": {
    /**
     * 查询按钮方法
     */
    searchData() {
      this.pagination.current = 1;
      this.listRemoteDataByPage();
    },
    /**
     * 重置
     */
    resetTableData() {
      this.toolBar = {
        "renewStatus": {
          "value": "",
          "options": [
            { "label": "审核中", "value": 0 },
            { "label": "未通过", "value": 1 },
            { "label": "已通过", "value": 2 },
            { "label": "已换新", "value": 3 }
          ]
        },
        "renewApprovalStatus": {
          "value": "",
          "options": [
            { "label": "待审批", "value": 1 },
            { "label": "审批通过", "value": 2 },
            { "label": "审批拒绝", "value": 3 }
          ]
        },
        "createTime": [],
        "carName": "",
        "carNumber": "",
        "warehouseOutNo": "",
        "renewSearchItemName": "",
        "renewSearchNewItemName": "",
        "storeNo": "",
        "dealerNo": ""
      };
      this.pagination.current = 1;
      this.pagination.size = 10;
      this.$refs.dealer && this.$refs.dealer.cleanDealer();
      this.$refs.store && this.$refs.store.cleanStore();
      this.listRemoteDataByPage();
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
      this.listRemoteDataByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listRemoteDataByPage();
    },

    /**
     * 分页查询列表数据
     */
    listRemoteDataByPage() {
      const params = {
        "renewStatus": this.toolBar.renewStatus.value,
        "renewApprovalStatus": this.toolBar.renewApprovalStatus.value,
        "storeNo": this.toolBar.storeNo,
        "dealerNo": this.toolBar.dealerNo,
        "carName": this.toolBar.carName,
        "carNumber": this.toolBar.carNumber,
        "warehouseOutNo": this.toolBar.warehouseOutNo,
        "renewSearchItemName": this.toolBar.renewSearchItemName,
        "renewSearchNewItemName": this.toolBar.renewSearchNewItemName,
        "pageReq": {
          "pageNum": this.pagination.current,
          "pageSize": this.pagination.size
        }
      };
      if (this.toolBar.createTime && this.toolBar.createTime.length > 0) {
        params.startTime = this.toolBar.createTime[0];
        params.endTime = this.toolBar.createTime[1];
      }
      this.tableLoading = true;
      pageRenewQuery(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records.map(x => {
            const tyreList = (x.renewDetailList && x.renewDetailList.filter(y => y.renewDetailType)) || [];
            const goodsList = (x.renewDetailList && x.renewDetailList.filter(y => !y.renewDetailType)) || [];
            return {
              ...x,
              tyreList,
              goodsList
            };
          });
          this.pagination.total = (res.data && res.data.total) || 0;
        } else {
          this.$message.error(res.msg);
        }
        this.tableLoading = false;
      }).catch(() => {
        this.tableLoading = false;
      });
    },
    /**
     * 控制表格显示
     */
    tableFontClick() {
      this.searchDetailShow = !this.searchDetailShow;
    },
    /**
     * 获取表格详情
     */
    toDetail(row) {
      this.$router.push({ "path": "/business/reassure/tyre/detail/" + row.renewNo });
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