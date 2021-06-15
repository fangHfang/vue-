import { listcpGrantPage } from "@/api/business/coupon/grant";
export default {
  "name": "BusinessCouponGrantList",
  "components": {
  },
  data() {
    return {
      "activeName": "first",
      "toolBar": {
        // 经销商名称
        "dealerNo": "",
        // 门店名称
        "customerNo": "",
        // 优惠券名称
        "ruleName": "",
        // 优惠券券码
        "ruleNo": "",
        // 统计时间
        "date": [],
        // 优惠劵状态
        "isReceived": ""
      },
      "tableData": [],
      "tableLoading": false,
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      }
    };
  },
  mounted() {
    this.listcpGrantPage();
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  "methods": {

    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listcpGrantPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.listcpGrantPage();
    },
    /**
     * 搜索
     */
    search() {
      this.pagination.current = 1;
      this.listcpGrantPage();
    },
    /**
     * 分页查询数据
     * @param clear 是否清空
     */
    listcpGrantPage() {
      this.tableLoading = true;
      const { dealerNo, customerNo, ruleNo, date, isReceived, ruleName } = this.toolBar;
      const params = {
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size,
        "dealerNo": dealerNo,
        "customerNo": customerNo,
        "ruleName": ruleName,
        "ruleNo": ruleNo,
        "isReceived": isReceived
      };
      if (date && date.length > 0) {
        params.grantTimeFrom = this.$moment(date[0]).format("yyyy-MM-DD HH:mm:ss");
        params.grantTimeTo = this.$moment(date[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      const postData = this.$jsonFormat(params);
      listcpGrantPage(postData).then(res => {
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
     * 新增
     */
    toAdd() {
      this.$router.push({ "path": "/business/coupon/store/list" });
    },

    /**
     * 选择经销商
     */
    dealerChange(val) {
      this.toolBar.dealerNo = val;
    },

    /**
     *
     */
    storeChange(val) {
      this.toolBar.customerNo = val;
    }

  }
};