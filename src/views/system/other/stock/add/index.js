// src/views/system/other/stock/add/index
import { createStockDisplay, updateStockDisplay, getStockDisplayDetail } from "@/api/system/other/stock";

export default {
  "name": "SystemOtherStockAdd",
  "components": {
  },
  data() {
    return {
      "tableBar": {
        "ruleName": "",
        "shopDetails": [
          {
            "displayTxt": "",
            "endCount": "",
            "startCount": "",
            "type": 0
          }
        ],
        "pointDetails": [
          {
            "displayTxt": "",
            "endCount": "",
            "startCount": "",
            "type": 1
          }
        ]
      },
      "rules": {
        "ruleName": [
          { "required": true, "message": "请输入规则名称", "trigger": "blur" }
        ]
        // "shopDetailsCount": [
        //   { "required": true, "message": "请输入商城商品数量", "trigger": "blur" }
        // ],
        // "shopDetailsTxt": [
        //   { "required": true, "message": "请输入商城商品显示文本", "trigger": "blur" }
        // ],
        // "pointDetailsCount": [
        //   { "required": true, "message": "请输入积分商品数量", "trigger": "blur" }
        // ],
        // "pointDetailsTxt": [
        //   { "required": true, "message": "请输入积分商品显示文本", "trigger": "blur" }
        // ]
      }
    };
  },
  "computed": {
    ruleNo() {
      return this.$store.state.systemOtherStock.ruleNo;
    }
  },
  mounted() {
    if (this.ruleNo) {
      this.getStockDisplay();
    }
  },
  "methods": {
    /**
     * 返回
    */
    back() {
      this.$router.back();
    },

    /**
    * 商城添加一个item
    */
    addLinkItem() {
      const listItem = {
        "displayTxt": "",
        "endCount": "",
        "startCount": "",
        "type": 0
      };
      this.tableBar.shopDetails.push(listItem);
    },

    /**
     * 商城删除一个item
     */
    removeLinkItem(index) {
      const array = this.tableBar.shopDetails.splice(index, 1);
      this.$set(array, index);
    },

    /**
    * 积分商品商城添加一个item
    */
    addLinkItemNum() {
      const listItem = {
        "displayTxt": "",
        "endCount": "",
        "startCount": "",
        "type": 1
      };
      this.tableBar.pointDetails.push(listItem);
    },

    /**
   * 积分商品商城删除一个item
   */
    removeLinkItemNum(index) {
      const array = this.tableBar.pointDetails.splice(index, 1);
      this.$set(array, index);
    },

    /**
     * 查询库存显示详情
     */
    getStockDisplay() {
      const params = "ruleNo=" + this.ruleNo;
      getStockDisplayDetail(params).then(res => {
        if (res.code === 200) {
          this.tableBar.ruleName = res.data.ruleName;
          this.tableBar.shopDetails = res.data.stockDisplayDetail.filter(element => {
            return element.type === 0;
          });
          this.tableBar.pointDetails = res.data.stockDisplayDetail.filter(element => {
            return element.type === 1;
          });
          this.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
        this.tableLoading = false;
      }).catch((error) => {
        console.info(error);
        this.tableLoading = false;
      });
    },
    /**
     * 保存库存显示规则
     */
    saveStockDisplay() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.doSave();
        } else {
          return false;
        }
      });
    },
    /**
       * 保存库存显示规则
       */
    doSave() {
      let canSave = true;
      this.tableBar.shopDetails.some(element => {
        if (!element.startCount && element.startCount !== 0) {
          canSave = false;
          return this.$message.warning("商城商品起始量不能为空");
        }
        if (!element.endCount && element.endCount !== 0) {
          canSave = false;
          return this.$message.warning("商城商品终止量不能为空");
        }
        if (!element.displayTxt) {
          canSave = false;
          return this.$message.warning("商城商品显示文本不能为空");
        }
      });
      if (!canSave) {
        return;
      }
      this.tableBar.pointDetails.some(element => {
        if (!element.startCount && element.startCount !== 0) {
          canSave = false;
          return this.$message.warning("积分商品起始量不能为空");
        }
        if (!element.endCount && element.endCount !== 0) {
          canSave = false;
          return this.$message.warning("积分商品终止量不能为空");
        }
        if (!element.displayTxt) {
          canSave = false;
          return this.$message.warning("积分商品显示文本不能为空");
        }
      });
      if (!canSave) {
        return;
      }
      const param = {
        "ruleName": this.tableBar.ruleName,
        "stockDisplayDetail": [ ...this.tableBar.shopDetails, ...this.tableBar.pointDetails ]
      };
      console.info(param);
      if (this.ruleNo) {
        param.ruleNo = this.ruleNo;
        updateStockDisplay(param).then(res => {
          if (res.code === 200) {
            this.$message.info("保存成功");
            this.$router.back();
          } else {
            this.$message.error(res.msg);
          }
        }).catch((error) => {
          console.info(error);
          this.$message.error(error);
        });
      } else {
        createStockDisplay(param).then(res => {
          if (res.code === 200) {
            this.$message.info("保存成功");
            this.$router.back();
          } else {
            this.$message.error(res.msg);
          }
        }).catch((error) => {
          console.info(error);
          this.$message.error(error);
        });
      }
    },

    cleanData() {
      this.tableBar.ruleName = "";
      this.tableBar.shopDetails.forEach(data => {
        data.displayTxt = "";
        data.endCount = "";
        data.endCount = "";
        data.startCount = "";
        data.type = "";
      });
      this.tableBar.pointDetails.forEach(data => {
        data.displayTxt = "";
        data.endCount = "";
        data.endCount = "";
        data.startCount = "";
        data.type = "";
      });
    },

    changeInput(index) {
      const pattern = /^[0-9]*$/;
      if (!pattern.test(this.tableBar.shopDetails[index].startCount)) {
        this.tableBar.shopDetails[index].startCount = "";
      }
      if (!pattern.test(this.tableBar.shopDetails[index].endCount)) {
        this.tableBar.shopDetails[index].endCount = "";
      }
    },

    changepointDetails(index) {
      const pattern = /^[0-9]*$/;
      if (!pattern.test(this.tableBar.pointDetails[index].startCount)) {
        this.tableBar.pointDetails[index].startCount = "";
      }
      if (!pattern.test(this.tableBar.pointDetails[index].endCount)) {
        this.tableBar.pointDetails[index].endCount = "";
      }
    },
    endShopDetailsBlur(e, index) {
      const first = this.tableBar.shopDetails[index].startCount;
      const second = this.tableBar.shopDetails[index].endCount;
      if (second !== "" && first !== "" && parseInt(second) < parseInt(first)) {
        this.$message.warning("终止量须大于等于起始量");
        this.tableBar.shopDetails[index].endCount = "";
      }
    },
    endPointDetailsBlur(e, index) {
      const first = this.tableBar.pointDetails[index].startCount;
      const second = this.tableBar.pointDetails[index].endCount;
      if (second !== "" && first !== "" && parseInt(second) < parseInt(first)) {
        this.$message.warning("终止量须大于等于起始量");
        this.tableBar.pointDetails[index].endCount = "";
      }
    }

  }
};