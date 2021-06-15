import { listPageSearchEpStoreDetail } from "@/api/business/coupon/exchange";
import { MARKET_URL } from "@/utils/system-constant";
export default {
  "name": "convertStoreRuleDetailAll",
  "components": {},
  "props": {
    "id": {
      "type": Number,
      "default": 1
    },
    "customerNo": {
      "type": String,
      "default": ""
    },
    "epRuleNo": {
      "type": String,
      "default": ""
    },
    "category": {
      "type": String,
      "default": ""
    }
  },
  data() {
    return {
      "toolBar": {
        "dataRange": [],
        "type": {
          "value": "",
          "options": [
            { "label": "后台操作", "value": "0" },
            { "label": "获取", "value": "1" },
            { "label": "兑换", "value": "2" }
          ]
        }
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      "dialogVisible": false,
      "tableLoading": false,
      "multipleSelection": [],
      "exportUrl": MARKET_URL + "/admin/epStoreDetail/export"
    };
  },
  "computed": {
    currentRow() {
      return this.$store.state.convertStoreRuleList.currentRow;
    },
    // 导出入参
    exportGetData() {
      let param = "?page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size;
      // 门店名称
      if (this.toolBar.storeNo) {
        param = param + "&storeNo=" + this.toolBar.storeNo;
      }
      // 经销商名称
      if (this.toolBar.dealerNo) {
        param = param + "&dealerNo=" + this.toolBar.dealerNo;
      }
      // // 规则名称
      // if (this.toolBar.epRule.value !== "") {
      //   param = param + "&ruleNo=" + this.toolBar.epRule.value;
      // }
      return param;
    }
  },
  mounted() {
    this.listSearchEpStoreDetailByPage();
  },
  "methods": {
    /**
         * 获取勾选的角色行
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
      this.listSearchEpStoreDetailByPage();
    },

    /**
         * 分页器当前页码变化处理
         * @param val
         */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.listSearchEpStoreDetailByPage();
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
         * 分页查询返利规则列表
         */
    listSearchEpStoreDetailByPage() {
      this.tableLoading = true;
      // 请求参数
      let param = "page.pageNum=" + this.pagination.current + "&page.pageSize=" + this.pagination.size + "&category=" + this.category;
      // 类型
      if (this.toolBar.type.value !== "") {
        param = param + "&type=" + this.toolBar.type.value;
      }
      // 发生时间
      if (this.toolBar.dataRange && this.toolBar.dataRange.length > 0) {
        param = param + "&createdFrom=" + this.toolBar.dataRange[0] + "&createdTo=" + this.toolBar.dataRange[1];
      }
      listPageSearchEpStoreDetail(param).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = (res.data && res.data.total) || 0;
        } else {
          this.$message.error("查询失败");
        }
        this.tableLoading = false;
      });
    }
  }
};