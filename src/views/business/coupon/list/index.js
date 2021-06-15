import { pageSearchCpTemLateList, transferStatus } from "@/api/business/coupon/coupon.js";
export default {
  "name": "BusinessCouponList",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "class": "",
        "date": "",
        "couponClass": {
          "value": "",
          "options": [
            { "label": "消费券", "value": "0" },
            { "label": "兑换券", "value": "1" }
          ]
        },
        "status": {
          "value": "",
          "options": [
            { "label": "启用", "value": "1" },
            { "label": "停用", "value": "0" }
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
      // 该数组中的值 都会在列表中进行隐藏
      "foldList": [],
      // 初始化查询条件
      "searchData": {
        // 卡券名称
        "ruleName": "",
        // 创建时间
        "createdTo": "",
        // 优惠券类型
        "couponClass": "",
        // 卡券状态
        "status": ""
      },
      "tableLoading": false,
      "total": 0
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    // 初始化页面数据
    this.listTableData();
  },
  activated() {
    this.listTableData();
  },

  "methods": {
    /**
     * 查询按钮方法
     */
    searchDataPage() {
      this.pagination.current = 1;
      this.listTableData();
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listTableData();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listTableData();
    },

    /**
     * 新增
     */
    newAdd() {
      this.$router.push({ "path": "/business/coupon/add" });
    },

    /**
     * 修改
     */
    selectDetail(ruleNo) {
      this.$router.push({ "path": "/business/coupon/add", "query": { "ruleNo": ruleNo } });
    },

    /**
     * 获取页面数据
     */
    listTableData() {
      const params = {
        "ruleName": this.searchData.ruleName,
        "couponClass": this.searchData.couponClass,
        "status": this.searchData.status,
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size,
        "page.field": "created",
        "page.order": "desc"
      };
      if (this.searchData.createdTo) {
        const createdTo = this.searchData.createdTo;
        const timearr = createdTo.replace(" ", ":").replace(/\:/g, "-").split("-");
        timearr[3] = "23";
        timearr[4] = "59";
        timearr[5] = "59";
        const createdTime = "" + timearr[0] + "-" + timearr[1] + "-" + timearr[2] + " " + timearr[3] + ":" + timearr[4] + ":" + timearr[5];
        params.createdTo = this.$moment(createdTime).format("yyyy-MM-DD HH:mm:ss");
      }
      this.tableLoading = true;
      const postData = this.$jsonFormat(params);
      pageSearchCpTemLateList(postData).then((result) => {
        if (result.code === 200) {
          console.log(result);
          this.tableData = result.data.records;
          this.pagination.total = result.data.total;
        }
        this.tableLoading = false;
      }).catch((error) => {
        this.$message({
          "message": error.msg,
          "type": "warning"
        });
        this.tableLoading = false;
      });
    },

    /**
       * 修改状态
       */
    transferStatus(state, ruleNo) {
      const postData = {
        "ruleNo": ruleNo,
        "status": state
      };
      transferStatus(postData).then((res) => {
        if (res.code === 200) {
          this.$message({
            "message": res.msg,
            "type": "success"
          });
          this.listTableData();
        }
      }).catch((error) => {
        this.$message({
          "message": error,
          "type": "warning"
        });
      });
    }

  }
};
