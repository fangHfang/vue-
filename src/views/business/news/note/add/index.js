export default {
  "name": "businessNewsNoteAdd",
  "components": {
  },
  data() {
    return {
      "input": "",
      "toolBar": {
        "title": "",
        "link": "",
        "content": "",
        "name": "",
        "store": "",
        "brand": ""
      },
      "tableData": [
        {
          "id": "123584665465646",
          "distributor": "XXXXXXXXXX经销商",
          "code": "123584665465646",
          "name": "XXXXXXXXXX门店",
          "area": "区域111",
          "state": 0
        },
        {
          "id": "123584665465646",
          "distributor": "XXXXXXXXXX经销商",
          "code": "123584665465646",
          "name": "XXXXXXXXXX门店",
          "area": "区域111",
          "state": 1
        },
        {
          "id": "123584665465646",
          "distributor": "XXXXXXXXXX经销商",
          "code": "123584665465646",
          "name": "XXXXXXXXXX门店",
          "area": "区域111",
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
     * 返回首页
     */
    returnList() {
      this.$router.push({ "path": "/business/news/note/list" });
    }
  }
};