import { grantCp } from "@/api/business/coupon/coupon";
export default {
  "name": "businessDistributorInboundDetail",
  "components": {
  },
  data() {
    return {
      "value": "",
      "makeDeadline": "1",
      "make": 0,
      "toolBar": {
        "people": "",
        "state": "",
        "notice": "",
        "deadline": ""
      },
      // 发放优惠券集合
      "couponList": [],
      // 门店集合
      "selectedStore": [],
      "btnLoading": false
    };
  },
  activated() {
    this.btnLoading = false;
    const { selectedStore, couponList } = this.$route.params;
    if (!(selectedStore && selectedStore.length > 0)) {
      this.$confirm("请选择至少一个门店!", "提示", {
        "confirmButtonText": "确定",
        "type": "warning"
      }).then(() => {
        this.$router.push({ "name": "businessCouponStoreList" });
      });
    } else {
      this.selectedStore = selectedStore;
    }
    if (!(couponList && couponList.length > 0)) {
      this.$confirm("请选择至少一个优惠券!", "提示", {
        "confirmButtonText": "确定",
        "type": "warning"
      }).then(() => {
        this.$router.push({
          "name": "businessCouponSelectList",
          "params": {
            "selectedStore": selectedStore
          }
        });
      });
    } else {
      this.couponList = couponList;
    }
  },
  "methods": {
    /**
       * 返回
       * @param val
       */
    back() {
      this.$router.push({
        "name": "businessCouponSelectList",
        "params": {
          "selectedStore": this.selectedStore
        }
      });
    },
    // 赠送接口
    save() {
      this.btnLoading = true;
      // 校验优惠券
      if (this.couponList.length === 0) {
        this.$confirm("没有选择优惠券!", "提示", {
          "confirmButtonText": "确定",
          "type": "warning"
        }).then(() => {
          this.back();
        });
        return;
      }
      // 校验选择门店
      if (this.selectedStore.length === 0) {
        this.$confirm("没有选择门店!", "提示", {
          "confirmButtonText": "确定",
          "type": "warning"
        }).then(() => {
          this.$router.push({ "name": "businessCouponStoreList" });
        });
        return;
      }
      const param = {
        "customerNoList": this.selectedStore.map((item) => {
          return item.customerNo;
        }),
        "details": this.couponList.map(item => {
          return {
            "ruleNo": item.ruleNo,
            "amount": item.amount ? Number(item.amount) : 0
          };
        }),
        // 取有效期类型(0:截止时间,1:长期有效)
        "receiveExpireType": Number(this.makeDeadline),
        // 领取类型(0:自动领取,1:手工领取)
        "receiveType": Number(this.make),
        // 备注
        "remark": this.toolBar.notice,
        // 来源类型(0:手动发放,1:签约,2:签到)
        "grantType": 0
      };
      if (param.receiveExpireType === 0) {
        param.receiveExpireTime = this.toolBar.deadline;
      }
      if (param.receiveExpireType === 0 && !param.receiveExpireTime && param.receiveType === 1) {
        this.$message.error("请选择领取截至日期!");
        this.btnLoading = false;
        return;
      }
      grantCp(param).then((res) => {
        this.$message.success("赠送成功!");
        this.$router.push({ "name": "businessCouponGrantList" });
      }).catch(res => {
        this.btnLoading = false;
      });
    }
  }
};
