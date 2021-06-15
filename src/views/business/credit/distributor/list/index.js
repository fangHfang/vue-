
import { getWhiteBarPageDealer, frozen, enable } from "@/api/business/distributor/credit";
import { pageSearchcategoriesLabel } from "@/api/system/other/tag";

import dialogCredit from "../totalCredit/index.vue";
export default {
  "name": "distributorList",
  "components": {
    dialogCredit
  },
  data() {
    return {
      "toolBar": {
        "dealerNo": "",
        "name": "",
        "regionNo": "",
        "tag": {
          "value": "",
          "options": [
            { "label": "标签一", "value": "0" },
            { "label": "标签二", "value": "1" }
          ]
        },
        "status": {
          "value": "",
          "options": [
            { "label": "有效", "value": "0" },
            { "label": "冻结", "value": "1" }
          ]
        }
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "dialogVisible": false,
      "tableLoading": false,
      "multipleSelection": [],
      "changeId": "",
      "row": {}

    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
    this.searchcategoriesLabel();
    this.selectSearch();
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
      this.selectSearch();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagination.current = val;
      this.selectSearch();
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
     * 查询经销商标签
     */
    searchcategoriesLabel() {
      const params = {
        "labelType": 0
      };
      pageSearchcategoriesLabel(params).then(res => {
        if (res.code === 200) {
          this.toolBar.tag.options = res.data.map(element => {
            return { "label": element.labelName, "value": element.labelNo };
          });
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },

    /**
    * 打开变更总授信
    */
    toCredit(row) {
      this.row = row;
      this.dialogVisible = true;
    },

    /**
     * 打开变更记录
     */
    toRecord(creditNo, customerNo) {
      this.$router.push({ "path": "/business/credit/distributor/record", "query": { "creditNo": creditNo, "customerNo": customerNo } });
    },

    searchData() {
      this.pagination.current = 1;
      this.selectSearch();
    },
    selectSearch() {
      const params = {
        "customerNo": this.toolBar.dealerNo,
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size,
        "status": this.toolBar.status.value,
        "labelName": this.toolBar.tag.value
      };
      this.getWhiteBarPageDealer(params);
    },

    /**
     * 分页查询数据
     * @param clear 是否清空
     */
    getWhiteBarPageDealer(params) {
      const postData = this.$jsonFormat(params);
      this.tableLoading = true;
      getWhiteBarPageDealer(postData).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
        this.tableLoading = false;
      }).catch((error) => {
        this.tableLoading = false;
        console.info(error);
      });
    },

    /**
     * 冻结
     * @param {贷记账户编号} creditNo
     * @param {客户编号} customerNo
     */
    frozen(creditNo, customerNo) {
      const params = {
        "creditNo": creditNo,
        "customerNo": customerNo
      };
      frozen(params).then(res => {
        if (res.code === 200) {
          this.selectSearch();
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },

    /**
     * 解冻
     * @param {贷记账户编号} creditNo
     * @param {客户编号} customerNo
     */
    enable(creditNo, customerNo) {
      const params = {
        "creditNo": creditNo,
        "customerNo": customerNo
      };
      enable(params).then(res => {
        if (res.code === 200) {
          this.selectSearch();
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },

    cleanSearch() {
      this.toolBar.dealerNo = "";
      this.$refs.dealer.cleanDealer();
      this.pagination.current = 1;
      this.selectSearch();
    },
    /**
     * 选择经销商
     */
    dealerChange(val) {
      this.toolBar.dealerNo = val;
    }

  }
};