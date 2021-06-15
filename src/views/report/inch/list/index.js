export default {
  "name": "reportInchList",
  "components": {

  },
  data() {
    return {
      "toolBar": {
        "name": "",
        "date": [],
        "storeNo": "",
        "dealerNo": "",
        "inch": {
          "value": "",
          "options": [
            { "label": "10''", "value": "1" },
            { "label": "11''", "value": "2" },
            { "label": "12''", "value": "3" }
          ]
        }
      },
      "tableData": [
        {
          "id": "123584665465646",
          "name": "玛吉斯VS5 SUV轮胎",
          "inch": 450,
          "storeCode": "123123123",
          "storeName": "玛吉斯123",
          "scanCode": "标签1",
          "valid": "规格1",
          "state": 0,
          "desc": "测试1测试测试"
        },
        {
          "id": "123584665465646",
          "name": "玛吉斯VS5 SUV轮胎",
          "inch": 450,
          "storeCode": "123123123",
          "storeName": "玛吉斯123",
          "scanCode": "标签1",
          "valid": "规格1",
          "state": 1,
          "desc": "测试1测试测试"
        },
        {
          "id": "123584665465646",
          "name": "玛吉斯VS5 SUV轮胎",
          "inch": 450,
          "storeCode": "123123123",
          "storeName": "玛吉斯123",
          "scanCode": "标签1",
          "valid": "规格1",
          "state": 2,
          "desc": "测试1测试测试"
        }
      ],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "tableLoading": false,
      "dialogVisible": false
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.getRemoteTableData();
  },
  "methods": {

    storeChange(val) {
      this.toolBar.storeNo = val;
    },
    /**
     * 选择经销商
     */
    dealerChange(val) {
      this.toolBar.dealerNo = val;
    },
    /**
     * 分页查询分类列表
     */
    getRemoteTableData() {
      const params = {
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size
      };
    },
    /**
     * 搜索按钮
     */
    searchTableData() {
      this.pagination.current = 1;
      this.getRemoteTableData();
    },
    /**
     * 重置按钮
     */
    resetTableData() {
      this.toolBar.storeNo = "";
      this.toolBar.dealerNo = "";
      this.toolBar.date = [];
      this.$refs.dealer && this.$refs.dealer.cleanDealer();
      this.$refs.store && this.$refs.store.cleanStore();
      this.pagination.current = 1;
      this.pagination.size = 10;
      this.getRemoteTableData();
    },

    /**
     * 获取勾选的行
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.getRemoteTableData();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getRemoteTableData();
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
    }

  }
};