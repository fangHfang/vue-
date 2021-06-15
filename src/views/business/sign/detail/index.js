export default {
  "name": "reportInchDetail",
  "components": {

  },
  data() {
    return {
      "value": "",
      "toolBar": {
        "brand": "",
        "inch": {
          "value": "",
          "options": [
            { "label": "10", "value": "1" },
            { "label": "11", "value": "2" },
            { "label": "12", "value": "3" }
          ]
        }
      },
      "tableData": [
        {
          "name": "张三",
          "nameNumber": "10086",
          "state": 0,
          "time": "2021-01-01 12:30"
        },
        {
          "name": "张三",
          "nameNumber": "10086",
          "state": 1,
          "time": "2021-01-01 12:30"
        },
        {
          "name": "张三",
          "nameNumber": "10086",
          "state": 2,
          "time": "2021-01-01 12:30"
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
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    /**
     * 跳转至详情页
     */
    jumpDetail() {

    }
  }
};