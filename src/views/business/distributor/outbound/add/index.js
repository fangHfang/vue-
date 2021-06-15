import { operateStockByDealerStepOne } from "@/api/business/distributor/inbound";
import { pageSearchDealerList } from "@/api/downstream/dealer/info";
import { listStoreByPage } from "@/api/business/signed/store";

export default {
  "name": "businessDistributorOutboundAdd",
  "components": {
  },
  data() {
    return {
      "form": {
        "distributor": {
          "value": "",
          "options": [
            { "label": "经销商1", "value": "1" },
            { "label": "经销商2", "value": "2" },
            { "label": "经销商3", "value": "3" }
          ]
        },
        "store": {
          "value": "",
          "options": [
            { "label": "门店1", "value": "1" },
            { "label": "门店2", "value": "2" },
            { "label": "门店3", "value": "3" }
          ]
        },
        "productList": [],
        "pagination": {
          "sizes": [ 10, 20, 50, 100, 200 ],
          "current": 1,
          "size": 10,
          "total": 100
        }
      },
      "rules": {
        "distributor": [
          { "required": true, "message": "请选择入库经销商", "trigger": "change" }
        ]
      },
      "dialogVisible": false,
      "btnLoading": false
    };
  },
  mounted() {
    this.getDistributor();
    this.store();
  },
  "methods": {
    /**
     * 返回
     */
    back() {
      this.$store.dispatch("tabbar/delView", this.$route).then(() => {
        this.$router.back();
      }).catch(() => {});
    },

    /**
     * 查询经销商
     */
    getDistributor() {
      const params = {
        "page.pageNum": 1,
        "page.pageSize": 5000
      };
      const postData = this.$jsonFormat(params);
      pageSearchDealerList(postData).then(res => {
        if (res.code === 200) {
          this.form.distributor.options = res.data.records.map(x => {
            return {
              "label": x.name,
              "value": x.dealerNo
            };
          });
        } else {
          console.log("查询经销商失败");
        }
      });
    },

    /**
     * 查询门店
     */
    store() {
      const params = {
        "page.pageNum": 1,
        "page.pageSize": 5000
      };
      const postData = this.$jsonFormat(params);
      listStoreByPage(postData).then(res => {
        if (res.code === 200) {
          this.form.store.options = res.data.records.map(x => {
            return {
              "label": x.name,
              "value": x.storeNo
            };
          });
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },

    /**
     * 保存
     */
    saveDealer() {
      const params = {
        "customerNo": this.form.distributor.value,
        "operatingType": "OUT_BY_DEALER"
      };
      const postData = this.$jsonFormat(params);

      operateStockByDealerStepOne(postData).then(res => {
        if (res.code === 200) {
          this.$router.push({ "path": "/business/distributor/outbound/addTwo", "query": { "operatingNo": res.msg, "customerNo": this.form.distributor.value } });
        } else {
          this.$message.error(res.msg);
        }
        this.btnLoading = false;
      }).catch((error) => {
        console.info(error);
        this.btnLoading = false;
      });
    }

  }
};