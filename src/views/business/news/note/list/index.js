export default {
  "name": "businessNewsNoteList",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "name": "",
        "spec": {
          "value": "",
          "options": [
            { "label": "状态1", "value": "1" },
            { "label": "状态2", "value": "2" },
            { "label": "状态3", "value": "3" }
          ]
        },
        "brand": ""
      },
      "tableData": [
        {
          "title": "验证码模板",
          "content": "玛吉斯VS5 SUV轮胎12312222212231222222222215234634732565222",
          "time": "2020-11-12 13:12:12",
          "state": 0,
          "senders": 500,
          "founder": "张三"
        },
        {
          "title": "验证码模板",
          "content": "玛吉斯VS5 SUV轮胎",
          "time": "2020-11-12 13:12:12",
          "state": 1,
          "senders": 500,
          "founder": "张三"
        },
        {
          "title": "验证码模板2",
          "content": "玛吉斯VS5 SUV轮胎",
          "time": "2020-11-12 13:12:12",
          "state": 2,
          "senders": 500,
          "founder": "张三"
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
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.listRemoteDataByPage();
  },
  "methods": {
    /**
     * 查询按钮方法
     */
    searchData() {
      this.pagination.current = 1;
      this.listRemoteDataByPage();
    },
    /**
     * 重置
     */
    resetTableData() {
      this.pagination.current = 1;
      this.pagination.size = 10;
      this.listRemoteDataByPage();
    },
    /**
     * 分页查询列表数据
     */
    listRemoteDataByPage() {

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
     * 跳转到消息新增
     */
    jumpAdd() {
      this.$router.push({ "path": "/business/news/note/add" });
    }
  }
};