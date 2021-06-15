export default {
  "name": "repositoryInfoAddAddStore",
  data() {
    return {
      "toolBar": {
        "name": "",
        "distributorName": "",
        "class": {
          "value": "",
          "distributorValue": "",
          "storeLebelValue": "",
          "options": [
            { "label": "门店一", "value": "1" },
            { "label": "门店二", "value": "2" },
            { "label": "门店三", "value": "3" }
          ],
          "distributorOptions": [
            { "distributorLabel": "门店一", "distributorValue": "1" },
            { "distributorLabel": "门店二", "distributorValue": "2" },
            { "distributorLabel": "门店三", "distributorValue": "3" }
          ],
          "storeLebelOptions": [
            { "storeLebelLabel": "门店一", "storeLebelValue": "1" },
            { "storeLebelLabel": "门店二", "storeLebelValue": "2" },
            { "storeLebelLabel": "门店三", "storeLebelValue": "3" }
          ]
        }
      },
      "tableData": [
        {
          "index": "1",
          "distributorCode": "1215645634466",
          "distributorName": "所属经销商名称文案",
          "distributorLabel": "NUY",
          "storeCode": "2369525448",
          "storeName": "门店名称门店名称",
          "storeLabel": "ACV"
        }, {
          "index": "2",
          "distributorCode": "1215645634466",
          "distributorName": "所属经销商名称文案",
          "distributorLabel": "NUY",
          "storeCode": "2369525448",
          "storeName": "门店名称门店名称",
          "storeLabel": "ACV"
        }, {
          "index": "3",
          "distributorCode": "1215645634466",
          "distributorName": "所属经销商名称文案",
          "distributorLabel": "NUY",
          "storeCode": "2369525448",
          "storeName": "门店名称门店名称",
          "storeLabel": "ACV"
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
  "computed": {},
  mounted() {

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
    }
  }
};