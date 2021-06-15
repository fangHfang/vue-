export default {
  "name": "otherSettingsProductSelect",
  "components": {
  },
  data() {
    return {
      "data": "",
      "toolBar": {
        "name": "",
        "detailed": "",
        "class": {
          "value": "",
          "options": [
            { "label": "状况一", "value": "1" },
            { "label": "状况二", "value": "2" },
            { "label": "状况三", "value": "3" }
          ]
        },
        "spec": {
          "value": "",
          "options": [
            { "label": "规格1", "value": "1" },
            { "label": "规格2", "value": "2" },
            { "label": "规格3", "value": "3" }
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
          "name": "商品名称2",
          "brand": "某某某品牌",
          "tag": "13545134665646464",
          "time": "2021-01-01 12:30",
          "state": 1
        },
        {
          "name": "商品名称1",
          "brand": "某某某品牌",
          "tag": "13545134665646464",
          "time": "2021-01-01 12:30",
          "state": 1
        },
        {
          "name": "商品名称1",
          "brand": "某某某品牌",
          "tag": "13545134665646464",
          "time": "2021-01-01 12:30",
          "state": 2
        },
        {
          "name": "商品名称1",
          "brand": "某某某品牌",
          "tag": "13545134665646464",
          "time": "2021-01-01 12:30",
          "state": 1
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

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};