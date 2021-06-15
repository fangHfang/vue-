import { listCouponByPage } from "@/api/business/coupon/coupon";
export default {
  "name": "businessCouponVerifyList",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        // 经销商名称
        "dealerNo": "",
        // 门店名称
        "storeNo": "",
        // 优惠券名称/券码
        "couponNo": "",
        // 统计时间
        "date": [],
        // 优惠券状态
        "status": {
          "value": "",
          "options": [
            { "label": "待领取", "value": "0" },
            { "label": "待使用", "value": "1" },
            { "label": "已过期", "value": "2" },
            { "label": "已使用", "value": "99" }
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
    this.listVerifyPage();
  },
  "methods": {
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listVerifyPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.listVerifyPage();
    },
    /**
     * 搜索
     */
    search() {
      this.pagination.current = 1;
      this.listVerifyPage();
    },
    /**
     * 分页查询数据
     * @param clear 是否清空
     */
    listVerifyPage() {
      this.tableLoading = true;
      const { dealerNo, storeNo, couponNo, status, date } = this.toolBar;
      const params = {
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size,
        "dealerNo": dealerNo,
        "storeNo": storeNo,
        "couponName": couponNo,
        "status": status.value,
        // 已核销
        "isWriteOff": 1
      };
      if (date && date.length > 0) {
        params.writeOffTimeFrom = this.$moment(date[0]).format("yyyy-MM-DD HH:mm:ss");
        params.writeOffTimeTo = this.$moment(date[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      const postData = this.$jsonFormat(params);
      listCouponByPage(postData).then(res => {
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
     * 特殊门店价格查询门店
     * @param val
     */
    storeChange(val) {
      this.toolBar.storeNo = val;
    },
    /**
     * 特殊门店价格查询经销商
     * @param val
     */
    dealerChange(val) {
      this.toolBar.dealerNo = val;
    }
  }
};
