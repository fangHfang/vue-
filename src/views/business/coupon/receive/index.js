import { listcpGrantPage } from "@/api/business/coupon/grant";
export default {
  "name": "BusinessCouponReceive",
  "components": {
  },
  data() {
    return {
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
        "date": "",
        "isReceived": {
          "value": "",
          "options": [
            { "label": "未领取", "value": "false" },
            { "label": "已领取", "value": "true" }
          ]
        }
      },
      "tableData": [],
      "tableLoading": false,
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      // 该数组中的值 都会在列表中进行隐藏
      "foldList": []
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.listcpGrantPage();
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
      const { dealerNo, customerNo, ruleNo, date, ruleName, isReceived } = this.toolBar;
      const params = {
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size,
        "dealerNo": dealerNo,
        "customerNo": customerNo,
        "ruleName": ruleName,
        "ruleNo": ruleNo,
        "isReceived": isReceived.value
      };`
      if (date && date.length > 0) {
        params.grantTimeFrom = this.$moment(date[0]).format("yyyy-MM-DD HH:mm:ss");
        params.grantTimeTo = this.$moment(date[1]).format("yyyy-MM-DD HH:mm:ss");
      }`;
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
    newAdd() {
      this.$router.push({ "path": "/business/coupon/add" });
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
