import { listStockInfoByPage } from "@/api/business/distributor/stock";

export default {
  "name": "businessDistributorStock",
  "components": {
  },
  data() {
    return {
      "toolBar": {
        "code": ""
      },
      "tableData": [],
      "tableLoading": false,
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      }
    };
  },
  mounted() {
    this.listStockInfoByPage();
  },
  "methods": {
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listStockInfoByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listStockInfoByPage();
    },
    /**
     * 打开详情
     */
    toDetail(id) {
      this.$router.push({ "path": "/business/distributor/stock/detail/" + id });
    },

    searchList() {
      this.pagination.current = 1;
      this.listStockInfoByPage();
    },
    /**
     * 分页查询数据
     * @param clear 是否清空
     */
    listStockInfoByPage() {
      const params = {
        ...this.toolBar,
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size
      };
      this.tableLoading = true;
      listStockInfoByPage(params).then(res => {
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

    cleanSearch() {
      this.toolBar.code = "";
      this.$refs.dealer.cleanDealer();
      this.pagination.current = 1;
      this.pagination.size = 10;
      this.listStockInfoByPage();
    },

    dealerChange(val) {
      this.toolBar.code = val;
    }
  }
};