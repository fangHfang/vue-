import { listItemInfoByPage } from "@/api/product/manage";
import { pageSearchBrandList } from "@/api/product/base/brand";
import { getClassification } from "@/api/business/coupon/coupon.js";

export default {
  "name": "dialogProductList",
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
        // 商品名称/编码
        "name": "",
        // 商品分类
        "categoryNo": "",
        // 品牌
        "brandNo": "",
        // 上下架状态，0：下架；1：上架，默认下架
        "saleStatus": 1,
        // 状态，0->仓库中；1->审核中；2->出售中
        "status": 2,
        "itemType": "1,2"
      },
      "categoryNo": "",
      "brandName": [],
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
  "watch": {
    "dialogVisible": {
      "handler": function(val) {
        if (val) {
          // 打开时查询分页
          this.listProductByPage();
        }
      },
      "immediate": true
    }
  },
  created() {
    // 查询分类
    this.getClassification();
  },
  "methods": {
    /**
     * 修改页大小
     * @param {*} val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.searchData.pageSize = val;
      this.listProductByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.searchData.pageNum = val;
      this.listProductByPage();
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
    search() {
      this.searchData.pageNum = 1;
      this.listProductByPage();
    },

    /**
     * 重置
     */
    reset() {
      this.searchData = {
        "pageNum": 1,
        "pageSize": 10,
        // 商品名称/编码
        "name": "",
        // 商品分类
        "categoryNo": "",
        // 品牌
        "brandName": "",
        // 上下架状态，0：下架；1：上架，默认下架
        "saleStatus": 1,
        // 状态，0->仓库中；1->审核中；2->出售中
        "status": 2,
        "itemType": "1,2" // "商品类型,1：玛吉斯商品；2：非玛商品；4：套餐，多个类型用英文逗号分隔",
      };
      this.pagination.current = 1;
      this.listProductByPage();
    },

    /**
     * 分页查询产品
     */
    listProductByPage() {
      const that = this;
      const postData = JSON.parse(JSON.stringify(this.searchData));
      if (postData.name) {
        // postData.brandName = postData.name;
        postData.itemName = postData.name;
      }
      console.log("单独商品", postData);
      const payload = this.$jsonFormat(postData);
      this.tableLoading = true;
      // 请求参数
      listItemInfoByPage(payload).then(res => {
        if (res.code === 200) {
          res.data.records.forEach((element) => {
            element.created = that.formatTime(element.created);
          });
          this.tableData = res.data.records;
          console.log(this.pagination, "this.tableData");
          this.pagination.total = (res.data && res.data.total) || 0;
          this.tableLoading = false;
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
    },
    /**
     * 分页查询所有区域列表
     */
    getBrandTableData(key) {
      const postData = {
        "pageNum": 1,
        "pageSize": 5000,
        "brandName": key
      };
      const payload = this.$jsonFormat(postData);
      pageSearchBrandList(payload).then(res => {
        if (res.code === 200) {
          this.brandName = res.data.records;
        } else {
          this.$message.error("查询失败,请稍后重试");
        }
      }).catch(() => {});
    },
    /**
     * 查询分类
     */
    getClassification() {
      getClassification().then(res => {
        if (res.code === 200) {
          this.categoryNo = res.data;
        } else {
          console.log("查询分类失败");
        }
      });
    }

  }
};
