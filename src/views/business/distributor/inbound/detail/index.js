import { stockOperatingByDealerDetail } from "@/api/business/distributor/inbound";
import { listItemCategorySelectShow } from "@/api/product/manage";
const operatingTypeList = {
  "1001": "盘点入库",
  "1003": "手动入库",
  "1004": "自动入库",
  "1005": "扫码入库",
  "2001": "订单出库",
  "2002": "盘点出库",
  "2003": "手动出库",
  "2005": "扫码出库",
  "2006": "退单出库"

};
export default {
  "name": "businessDistributorInboundDetail",
  "components": {
  },
  data() {
    return {
      "params": {
        "customerNo": "",
        "created": "",
        "createBy": "",
        "type": "",
        "relate": "",
        "relateType": "",
        "relateNumber": "",
        "customerName": ""
      },
      "detail": {
        "toolBar": {
          "itemCategoryNo": {
            "value": "",
            "options": [
              { "label": "分类1", "value": "1" },
              { "label": "分类2", "value": "2" },
              { "label": "分类3", "value": "3" }
            ]
          },
          "itemName": "",
          "itemBrand": ""
        },
        "productList": [],
        "pagination": {
          "sizes": [ 10, 20, 50, 100, 200 ],
          "current": 1,
          "size": 10,
          "total": 400
        }
      }
    };
  },
  mounted() {
    this.stockOperatingByDealerDetail();
    this.listItemCategoryPage();
  },

  "methods": {
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.detail.pagination.size = val;
      this.stockOperatingByDealerDetail();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.detail.pagination.current = val;
      this.stockOperatingByDealerDetail();
    },
    /**
     * 返回
     */
    back() {
      this.$store.dispatch("tabbar/delView", this.$route).then(() => {
        this.$router.back();
      }).catch(() => {});
    },
    /**
     * 查询商品分类
     */
    async listItemCategoryPage() {
      const result = await listItemCategorySelectShow(this.$jsonFormat({
        "categoryType": 2
      }));
      if (result.code === 200) {
        this.detail.toolBar.itemCategoryNo.options = result.data;
      } else {
        this.$message.error(result.msg);
      }
    },
    /**
     * 查询详情
     */
    stockOperatingByDealerDetail() {
      this.params = this.$route.query.selectedStock;
      this.params.operatingType = operatingTypeList[this.params.operatingType];
      const params = {
        ...this.detail.toolBar,
        "itemCategoryNo": this.detail.toolBar.itemCategoryNo.value,
        "operatingNo": this.$route.query.selectedStock.operatingNo,
        "page.pageNum": this.detail.pagination.current,
        "page.pageSize": this.detail.pagination.size
      };
      stockOperatingByDealerDetail(params).then(res => {
        if (res.code === 200) {
          this.detail.productList = res.data.records;
          this.detail.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    }
  }
};