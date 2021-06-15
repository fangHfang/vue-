import { listItemInfoByPage } from "@/api/product/manage";

export default {
  "name": "dialogPackageProduct",
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
        "itemName": "",
        // 上下架状态，0：下架；1：上架，默认下架
        "saleStatus": 1,
        // 状态，0->仓库中；1->审核中；2->出售中
        "status": 2,
        "itemType": "4" // 商品类型,1：玛吉斯商品；2：非玛商品；4：套餐，多个类型用英文逗号分隔
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
          this.listPackageProductByPage();
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
      this.listPackageProductByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.searchData.pageNum = val;
      this.listPackageProductByPage();
    },

    /**
     * 查询
     */
    search() {
      this.searchData.pageNum = 1;
      this.listPackageProductByPage();
    },

    /**
     * 格式化时间
     * @param {*} str 时间字符串
     */
    formatTime(str) {
      str = str || "";
      return str.substring(0, 10) + " " + str.substring(11, 19);
    },

    /**
     * 查询
     */
    listPackageProductByPage() {
      const that = this;
      // console.log("this.searchData? 查询套餐", this.searchData);
      const payload = this.$jsonFormat(this.searchData);
      // 请求参数
      listItemInfoByPage(payload).then(res => {
        if (res.code === 200) {
          res.data.records.forEach((element) => {
            element.created = that.formatTime(element.created);
          });
          this.tableData = res.data.records;
          this.pagination.total = (res.data && res.data.total) || 0;
        } else {
          this.$message.error("查询失败");
        }
      });
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
      const { itemNo, itemName } = row;
      const text = "/pages/products/product-detail/product-detail?itemNo=" + itemNo + "&itemName=" + itemName;
      const data = {
        "url": text,
        "no": itemNo,
        "name": itemName
      };
      this.$emit("setSelectInfo", data);
      this.handleClose();
    }
  }
};
