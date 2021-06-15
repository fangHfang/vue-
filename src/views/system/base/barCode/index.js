import { pageSearchBarCodeList } from "@/api/system/base/barCode";
import { ITEM_URL } from "@/utils/system-constant";
export default {
  "name": "BarCodeList",
  data() {
    return {
      "tableLoading": false,
      "toolBar": {
        "name": "",
        "orderTime": "",
        "orderNo": ""

      },
      "tableData": [
      ],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 0
      },
      // 导入导出api地址
      "importUrl": ITEM_URL + "/admin/barcodeInfo/import"
    };
  },
  "computed": {},
  mounted() {
    // 不用初始化加载
    // this.listBarCodeByPage();
  },
  "methods": {
    /**
     * 搜索按钮方法
     */
    searchBarCodeListByPage() {
      this.pagination.current = 1;
      this.listBarCodeByPage();
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listBarCodeByPage();
    },
    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listBarCodeByPage();
    },
    /**
     * 分页查询数据
     */
    listBarCodeByPage() {
      if (!this.toolBar.name) {
        this.$message.info("请输入条形码");
        this.tableData = [];
        return;
      }
      this.tableLoading = true;
      let params = "pageNum=" + this.pagination.current + "&pageSize=" + this.pagination.size + "&barCode=" + this.toolBar.name;
      if (this.toolBar.outOrderNo) {
        params += "&outOrderNo=" + this.toolBar.outOrderNo;
      }
      if (this.toolBar.date) {
        params += "&startTime=" + this.$moment(this.toolBar.date[0]).format("yyyy-MM-DD HH:mm:ss");
        params += "&endTime=" + this.$moment(this.toolBar.date[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      pageSearchBarCodeList(params).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
        this.tableLoading = false;
      }).catch((error) => {
        console.info(error);
        this.tableLoading = false;
      });
    }
  }
};