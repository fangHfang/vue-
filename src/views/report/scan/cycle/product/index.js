import Select from "./popup/index.vue";
export default {
  "name": "reportScanCycleProduct",
  "components": {
    Select
  },
  data() {
    return {
      "toolBar": {
        "code": "",
        "brand": ""
      },
      "tableData": [
        {
          "id": "123584665465646",
          "detailed": "xxxxxx/xxxxxx/xxxx1231456",
          "brand": "玛吉斯",
          "tireType": "类型1",
          "inch": "18''",
          "decorative": "花纹1",
          "similarDecorative": "花纹2",
          "word": "XXXX",
          "size": 126,
          "width": 256,
          "flat": 60,
          "state": 0
        },
        {
          "id": "123584665465646",
          "detailed": "xxxxxx/xxxxxx/xxxx1231456",
          "brand": "玛吉斯",
          "tireType": "类型1",
          "inch": "18''",
          "decorative": "花纹1",
          "similarDecorative": "花纹2",
          "word": "XXXX",
          "size": 126,
          "width": 256,
          "flat": 60,
          "state": 1
        },
        {
          "id": "123584665465646",
          "detailed": "xxxxxx/xxxxxx/xxxx1231456",
          "brand": "玛吉斯",
          "tireType": "类型1",
          "inch": "18''",
          "decorative": "花纹1",
          "similarDecorative": "花纹2",
          "word": "XXXX",
          "size": 126,
          "width": 256,
          "flat": 60,
          "state": 2
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
     * 返回扫码周期列表
     */
    backList() {
      this.$router.push({ "path": "/report/scan/cycle/list" });
    }
  }
};