import { pageSearchBrandList } from "@/api/product/base/brand";
export default {
  "name": "dialogProductBrand",
  "components": {
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    }
  },
  data() {
    return {
      "searchData": {
        "pageNum": 1,
        "pageSize": 10,
        "brandName": ""
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      }
    };
  },
  "watch": {
    "dialogVisible": {
      "handler": function(val) {
        if (val) {
          // 打开时查询分页
          this.listProductBrandByPage();
        }
      },
      "immediate": true
    }
  },
  "methods": {
    /**
     * 修改页大小
     * @param {*} val
     */
    handleSizeChange(val) {
      this.searchData.pageSize = val;
      this.listProductBrandByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.searchData.pageNum = val;
      this.listProductBrandByPage();
    },

    /**
     * 查询
     */
    search() {
      this.searchData.pageNum = 1;
      this.listProductBrandByPage();
    },

    /**
     * 分页查询商品品牌
     */
    listProductBrandByPage() {
      const payload = this.$jsonFormat(this.searchData);
      pageSearchBrandList(payload).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error("查询失败,请稍后重试");
        }
      }).catch(() => {});
    },

    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$emit("update:dialogVisible", false);
    },

    /**
     * 行双击事件
     */
    rowDblclick(row, column, event) {
      this.getSelectInfo(row);
    },

    /**
     * 复制链接
     */
    getSelectInfo(row) {
      const { brandNo, brandName } = row;
      const text = "/pages/products/product-search/product-search?brandNo=" + brandNo + "&brandName" + brandName;
      const data = {
        "url": text,
        "no": brandNo,
        "name": brandName
      };
      this.$emit("setSelectInfo", data);
      this.handleClose();
    }
  }
};