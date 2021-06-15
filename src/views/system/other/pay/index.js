export default {
  "name": "SystemOtherPay",
  "components": {
  },
  data() {
    return {
      // 日期
      "date": "",
      "toolBar": {
        "name": "",
        "class": {
          "value": "",
          "options": [
            { "label": "一级", "value": "1" },
            { "label": "二级", "value": "2" },
            { "label": "三级", "value": "3" }
          ]
        },
        "brand": "",
        "tag": {
          "value": "",
          "options": [
            { "label": "标签1", "value": "1" },
            { "label": "标签2", "value": "2" },
            { "label": "标签3", "value": "3" }
          ]
        }
      },
      "tableData": [
        {
          "payWay": "微信支付",
          "time": "2020-11-12 13:21:12",
          "class": "一级/二级/三级",
          "brand": "玛吉斯123",
          "key": "×××××",
          "passKey": "",
          "state": 0,
          "name": "张三"
        },
        {
          "payWay": "支付宝",
          "time": "2020-11-12 13:21:12",
          "class": "一级/二级/三级",
          "key": "××××",
          "passKey": "",
          "spec": "规格1",
          "state": 1,
          "name": "张三"
        }
      ],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "dialogVisible": false
    };
  },
  "computed": {},
  mounted() {
    this.searchDataPage();
  },
  "methods": {
    /**
     * 搜索
     */
    searchDataPage() {
      this.pagination.current = 1;
      // this.listNavigationByPage();
    },
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