
export default {
  "name": "storeBill",
  "components": {
  },
  "props": {
    "changeId": {
      "type": String,
      "default": ""
    }
  },
  data() {
    return {
      "toolBar": {
        "date": "",
        "operatorName": "",
        "oddNumbers": "",
        "radio": "1",
        "month": "",
        "storeName": "",
        "customerName": "",
        "supplierName": "",
        "type": {
          "value": "",
          "options": [
            { "label": "类型一", "value": "0" },
            { "label": "类型二", "value": "1" }
          ]
        }
      },
      "tableData": [ {
        "type": "客户",
        "storeName": "xx门店",
        "storeNo": "345678",
        "customerName": "",
        "supplierName": "",
        "beginningBalance": "",
        "receivable": "",
        "payable": "",
        "paymentReceived": "",
        "balance": "",
        "preCollection": "",
        "prePay": "",
        "created": "2016-09-21 12:30:39"
      }, {
        "type": "客户",
        "storeName": "xx门店",
        "storeNo": "345678",
        "customerName": "",
        "supplierName": "",
        "beginningBalance": "",
        "receivable": "",
        "payable": "",
        "paymentReceived": "",
        "balance": "",
        "preCollection": "",
        "prePay": "",
        "created": "2016-09-21 12:30:39"
      }, {
        "type": "供应商",
        "storeName": "xx门店",
        "storeNo": "345678",
        "customerName": "",
        "supplierName": "",
        "beginningBalance": "",
        "receivable": "",
        "payable": "",
        "paymentReceived": "",
        "balance": "",
        "preCollection": "",
        "prePay": "",
        "created": "2016-09-21 12:30:39"
      } ],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "dialogVisible": false,
      "tableLoading": false,
      "multipleSelection": []
    };
  },
  "computed": {},
  mounted() {
    this.listStoreByPage();
  },
  "methods": {
    /**
     * 格式化时间
     * @param {*} str 时间字符串
     */
    formatTime(str) {
      str = str || "";
      return str.substring(0, 10) + " " + str.substring(11, 19);
    },

    /**
     * 多选处理
     * @param {*} val 选中对象
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagination.size = val;
      this.listStoreByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.listStoreByPage();
    },

    /**
     * 分页查询变更记录
     */
    listStoreByPage() {
    }
  }
};