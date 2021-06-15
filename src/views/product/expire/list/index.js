import Mature from "./tabs/mature/index.vue";
import Invalid from "./tabs/invalid/index.vue";
import Notice from "./tabs/notice/index.vue";
export default {
  "name": "ProductBaseList",
  data() {
    return {
      "activeName": "first"
    };
  },
  "components": {
    Mature,
    Invalid,
    Notice
  },
  "computed": {},
  mounted() {

  },
  "methods": {}
};