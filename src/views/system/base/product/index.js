import { pageSearchProductList } from "@/api/system/base/product";
import { ITEM_URL } from "@/utils/system-constant";
export default {
  "name": "BasicProductsList",
  data() {
    return {
      "toolBar": {
        "name": ""
      },
      "tableData": [
      ],
      "tableLoading": false,
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      // 导入导出api地址
      "importUrl": ITEM_URL + "/admin/product/import",
      "exportUrl": ITEM_URL + "/admin/product/export"
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    },
    // 导出入参
    exportGetData() {
      const postData = {
        "pageNum": this.pagination.current,
        "pageSize": this.pagination.size
      };
      if (this.toolBar.name) {
        postData.productCode = this.toolBar.name;
      }
      return {
        ...postData
      };
    }
  },
  mounted() {
    this.listProductByPage();
  },
  "methods": {
    /**
     * 搜索按钮方法
     */
    searchProductListByPage() {
      this.pagination.current = 1;
      this.listProductByPage();
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listProductByPage();
    },
    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listProductByPage();
    },
    /**
     * 分页查询数据
     */
    listProductByPage() {
      this.tableLoading = true;
      const postData = {
        "pageNum": this.pagination.current,
        "pageSize": this.pagination.size
      };
      if (this.toolBar.name) {
        postData.productCode = this.toolBar.name;
      }
      pageSearchProductList(this.$jsonFormat(postData)).then(res => {
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