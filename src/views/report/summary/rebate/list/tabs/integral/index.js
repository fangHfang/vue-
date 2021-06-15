export default {
  "name": "ProductRuleIntegral",
  "components": {
  },
  data() {
    return {
      "activeName": "first",
      "toolBar": {
        "name": "",
        "title": "",
        "class": {
          "value": "",
          "options": [
            { "label": "一级", "value": "1" },
            { "label": "二级", "value": "2" },
            { "label": "三级", "value": "3" }
          ]
        }
      },
      "tableData": [
        {
          "id": "123123123123",
          "name": "×××××经销商",
          "class": "×××××标签",
          "city": "上海市",
          "area": "黄浦区",
          "tag": "500",
          "applyStore": "100"
        },
        {
          "id": "123123123123",
          "name": "×××××经销商",
          "class": "×××××标签",
          "city": "上海市",
          "area": "黄浦区",
          "tag": "500",
          "applyStore": "100"
        },
        {
          "id": "123123123123",
          "name": "×××××经销商",
          "class": "×××××标签",
          "city": "上海市",
          "area": "黄浦区",
          "tag": "500",
          "applyStore": "100"
        }
      ],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      }
    };
  },
  "methods": {

    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    /**
     * 明细
     */
    toDetail() {
      this.$router.push({ "path": "/business/summary/rebate/detail" });
    }
  }
};