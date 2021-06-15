import SoldIn from "./tabs/soldIn/index.vue";
import SoldOut from "./tabs/soldOut/index.vue";
import UnderReview from "./tabs/underReview/index.vue";
import WarehouseIn from "./tabs/warehouseIn/index.vue";
export default {
  "name": "ProductBaseList",
  data() {
    return {
      "activeName": "first"
    };
  },
  "components": {
    SoldIn,
    SoldOut,
    UnderReview,
    WarehouseIn
  },
  "computed": {},
  mounted() {

  },
  "methods": {}
};