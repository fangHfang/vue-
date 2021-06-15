import rebateDetailContent from "./content/all/index.vue";
export default {
  "name": "businessRebateDetail",
  "components": {
    rebateDetailContent
  },
  data() {
    return {
      "activeName": "first",
      // 返利节点(0-全部，1-获取记录，2-消耗记录，3-操作日志)
      "typeFlag": 1
    };
  },
  mounted() {
    console.log("跳转");
  },
  "methods": {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};