import { operateStockByDealerStepTwo } from "@/api/business/distributor/inbound";

export default {
  "name": "businessDistributorInboundAddTwo",
  "components": {
  },
  data() {
    return {
      "form": {
        "productList": [],
        "searchData": {
          "pageNum": 1,
          "pageSize": 10
        },
        "operatingNo": this.$route.query.operatingNo,
        "customerNo": this.$route.query.customerNo
      },
      "dialogVisible": false,
      "selectedStoreArr": [],
      "btnLoading": false

    };
  },
  mounted() {
  },
  "computed": {
    currentTableData() {
      const allData = this._.cloneDeep(this.form.productList);
      return allData.slice((this.form.searchData.pageNum - 1) * this.form.searchData.pageSize, this.form.searchData.pageNum * this.form.searchData.pageSize);
    },
    total() {
      return this.form.productList.length;
    }
  },
  "methods": {
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.form.searchData.pageSize = val;
    },
    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.form.searchData.pageNum = val;
    },
    handleSelectionChange(val) {
      this.selectedStoreArr = val.filter(x => x.itemNo).map(c => { return c.itemNo; });
    },
    /**
     * 获取选中的商品
     * @param list
     */
    getSelectProducts(data) {
      // 已经存在的产品
      const existProduct = this.form.productList.filter(x => x.itemNo).map(c => { return c.itemNo; });
      data.forEach(data => {
        data.count = 1;
      });
      // 删掉已经存在的门店
      const newData = data.filter(x => existProduct.indexOf(x.itemNo) < 0);

      // 放到页面中
      this.form.productList.push.apply(this.form.productList, newData);
    },

    /**
     * 删除
     */
    batchDeleteProduct() {
      if (this.selectedStoreArr.length === 0) {
        this.$message.error("请至少选择一个产品");
        return;
      }
      this.$confirm(`确定删除选中的${this.selectedStoreArr.length}个产品吗?`, "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "type": "warning"
      }).then(() => {
        this.form.productList = this.form.productList.filter(x => this.selectedStoreArr.indexOf(x.itemNo) < 0);
      });
    },
    /**
     * 返回
     */
    back() {
      this.$router.push({ "path": "/business/distributor/inbound/list" });
    },

    /**
     * 保存
     */
    saveDealerTwo() {
      let canSave = true;
      this.form.productList.some(x => {
        if (!x.count && parseInt(x.count) !== 0) {
          canSave = false;
          return this.$message.warning("请填写入库数量");
        }
        if (parseInt(x.count) <= 0) {
          canSave = false;
          return this.$message.warning("入库数量必须大于0");
        }
      });
      const params = {
        "customerNo": this.form.customerNo,
        "operatingNo": this.form.operatingNo
      };
      params.itemList = [];
      if (!canSave) return;
      this.form.productList.forEach(row => {
        const data = {
          "productNo": row.productNo,
          "itemNo": row.itemNo,
          "quantity": row.count
        };
        params.itemList.push(data);
      });
      this.btnLoading = true;
      operateStockByDealerStepTwo(params).then(res => {
        if (res.code === 200) {
          this.$message({
            "type": "success",
            "message": "保存成功!"
          });
          this.back();
        } else {
          this.$message.error(res.msg);
        }
        this.btnLoading = false;
      }).catch((error) => {
        console.info(error);
        this.btnLoading = false;
      });
    },

    changeInput(count, index) {
      const { pageNum, pageSize } = this.form.searchData;
      this.form.productList[(pageNum - 1) * pageSize + index].count = count;
      const pattern = /^[1-9][0-9]*$/;
      if (!pattern.test(this.currentTableData[index].count)) {
        this.currentTableData[index].count = "";
      }
    }

  }
};
