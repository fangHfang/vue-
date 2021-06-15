
import { scRuleDetail, scRuleModify } from "@/api/business/signed/step";
import { listScStoreByPage } from "@/api/business/signed/store";
import { listSearchRbRule } from "@/api/business/rebate/rule";
import { listSearchItRule } from "@/api/product/rule";
import { listSearchEpRule } from "@/api/business/coupon/exchange";
import { listSearchCpTemplate } from "@/api/business/coupon/template";
import dialogAddStore from "../dialogAddStore/index.vue";
import dialogAddImport from "../dialogAddImport/index.vue";
import { MARKET_URL } from "@/utils/system-constant";
export default {
  "name": "businessSignedStepAdd",
  "components": {
    dialogAddStore,
    dialogAddImport
  },
  data() {
    return {
      "activeName": this.$route.query.activeName || "",
      "number": 1,
      // 导入导出api地址
      "importUrl": MARKET_URL + "/admin/scStore/import",
      "exportUrl": "",
      "form": {
        "ruleName": "",
        "closeComment": "",
        "date": "",
        "remark": "",
        "storeNo": ""
      },
      "profitList": [ {
        "upperLimit": "",
        "lowerLimit": "",
        "cpCount": "",
        "cpRuleNo": "",
        "itRuleNo": "",
        "epRuleNo": "",
        "rbRuleNo": ""
      } ],
      "selectList": {
        "couponOptions": [],
        "integralOptions": [],
        "exchangeOptions": [],
        "detailRebateRuleOptions": []
      },
      "tableData": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "dialogVisible": false,
      "dialogImageVisible": false,
      "dialogImageUrl": "",
      "disabled": false,
      "dialogVisibleImport": false,
      "ruleNo": this.$route.query.ruleNo,
      // 初始化图片数据
      "listPicture": []
    };
  },
  "computed": {
    token() {
      const token = { "Authorization": "bearer " + this.$store.state.token };
      return token;
    },
    // 导出入参
    exportGetData() {
      return {
      };
    }
  },
  mounted() {
    this.scRuleDetail();
    this.listStoreByPage();

    this.listSearchRbRuleType();
    this.listSearchItRuleType();
    this.listSearchEpRuleType();
    this.listSearchCpTemplateType();
  },
  "methods": {
    /**
     * 搜索
     */
    searchData() {
      this.pagination.current = 1;
      this.listStoreByPage();
    },
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      this.pagination.size = val;
      this.listStoreByPage();
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.listStoreByPage();
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file, type) {
      let index = "";
      let key = "";
      if (!file.response) {
        key = file.url;
      } else {
        key = file.response.data.objectUrl;
      }
      this.listPicture.map((item, urlIndex) => {
        if (item.url === key) {
          index = urlIndex;
        }
      });
      if (index !== -1) {
        this.listPicture.splice(index, 1);
        // this.$refs.upload.uploadFiles.splice(index, 1);
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogImageVisible = true;
    },

    handleDownload(file) {
      const Img = new Image();
      let dataURL = "";
      Img.src = file.response.data.objectUrl;
      // Img.setAttribute("crossOrigin", "Anonymous");
      Img.setAttribute("Access-Control-Allow-Origin", "*");
      Img.onload = function() {
        const canvas = document.createElement("canvas");
        const width = Img.width;
        const height = Img.height;
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d").drawImage(Img, 0, 0, width, height);
        dataURL = canvas.toDataURL("image/jpeg");
        const eleLink = document.createElement("a");
        eleLink.download = file.name;
        eleLink.style.display = "none";
        eleLink.href = dataURL;
        document.body.appendChild(eleLink);
        eleLink.click();
        document.body.removeChild(eleLink);
      };
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2) {
        if (rowIndex % 3 === 0) {
          return {
            "rowspan": 3,
            "colspan": 1
          };
        }
        return {
          "rowspan": 0,
          "colspan": 0
        };
      }
      if (columnIndex === 0) {
        if (rowIndex % 3 === 0) {
          return {
            "rowspan": 3,
            "colspan": 1
          };
        }
        return {
          "rowspan": 0,
          "colspan": 0
        };
      }
    },
    /**
     * 点击新增与减少
     */
    toReduce(index) {
      if (this.profitList.length === 1) {
        return;
      }
      if (this.profitList.length > 1) {
        this.profitList.splice(index, 1);
      }
    },
    /**
       * 门店确认 -- 添加获利设置
       */
    toAdd() {
      this.profitList.push({
        "upperLimit": "",
        "lowerLimit": "",
        "cpCount": "",
        "cpRuleNo": "",
        "itRuleNo": "",
        "epRuleNo": "",
        "rbRuleNo": ""
      });
    },
    /**
       * 获取选中的门店
       * @param list
       */
    getSelectStore(list) {

    },
    /**
       * 获取导入信息
       * @param val
       */
    getSelectImport(val) {

    },

    /**
     * 查询详情
     */
    scRuleDetail() {
      const that = this;
      scRuleDetail(this.ruleNo).then(res => {
        if (res.code === 200) {
          this.importUrl = MARKET_URL + "/admin/scStore/import?ruleName=" + res.data.ruleName + "&ruleNo=" + this.ruleNo;
          that.form.ruleName = res.data.ruleName;
          this.importUrl = `${MARKET_URL}/admin/scStore/import?ruleName=${res.data.ruleName}&ruleNo=${this.ruleNo}`;
          that.form.remark = res.data.remark;
          if (res.data.startDate && res.data.endDate) {
            that.form.date = [ res.data.startDate, res.data.endDate ];
          }
          if (res.data.accountingType === 1) {
            that.form.closeComment = true;
          } else {
            that.form.closeComment = false;
          }
          if (that.activeName === "confirm" && res.data.imageList !== null) {
            that.listPicture = res.data.imageList;
            that.listPicture = that.listPicture.map(element => {
              return { "url": element };
            });
            // that.$refs.upload.fileList = that.listPicture;
            that.profitList = res.data.levelList;
          }
        } else {
          that.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },

    onListPictureUploadSuccess(res, file) {
      file.url = res.data.objectUrl;
      this.listPicture.push(file);
    },

    save() {
      const params = {
        "ruleName": this.form.ruleName,
        "remark": this.form.remark,
        "ruleNo": this.ruleNo
      };
      if (this.form.date) {
        params.startDate = this.$moment(this.form.date[0]).format("yyyy-MM-DD HH:mm:ss");
        params.endDate = this.$moment(this.form.date[1]).format("yyyy-MM-DD HH:mm:ss");
      }
      if (this.form.closeComment === true) {
        params.accountingType = 1;
      } else {
        params.accountingType = 0;
      }
      if (this.activeName === "confirm") {
        params.dtoList = [];
        params.imageList = [];
        params.dtoList = this.profitList;
        params.imageList = this.listPicture.map((item) => {
          if (item.url) {
            return item.url;
          }
          return item;
        });
        // 门店签约，每个等级都必须检测重复，不同等级有上下限数量交叉重复不可保存 #1511
        let canSave = true;
        const start = [];
        const end = [];
        params.dtoList.forEach(x => {
          if (!x.lowerLimit && x.lowerLimit !== 0) {
            canSave = false;
            return this.$message.warning("下限不能为空");
          }
          if (!x.upperLimit && x.upperLimit !== 0) {
            canSave = false;
            return this.$message.warning("上限不能为空");
          }
          start.push(x.lowerLimit);
          end.push(x.upperLimit);
        });
        for (let i = 1;i < start.length;i++) {
          if (start[i] <= end[i - 1]) {
            this.$message.warning("不同等级的上下限数量不可交叉重叠");
            canSave = false;
            break;
          }
        }
        if (!canSave) return;
      }
      scRuleModify(params).then(res => {
        this.$message({
          "type": "success",
          "message": "保存成功!"
        });
        this.back();
      }).catch((error) => {
        console.info(error);
      });
    },

    /**
     * 查询返利规则列表
     */
    listSearchRbRuleType(key) {
      listSearchRbRule("type=1").then(res => {
        if (res.code === 200) {
          this.selectList.detailRebateRuleOptions = res.data.map(element => {
            return { "label": element.ruleName, "value": element.ruleNo };
          });
        } else {
          this.$message.error("查询返利规则失败");
        }
      });
    },

    /**
     * 查询积分规则列表
     */
    listSearchItRuleType(key) {
      listSearchItRule("type=1").then(res => {
        if (res.code === 200) {
          this.selectList.integralOptions = res.data.map(element => {
            return { "label": element.ruleName, "value": element.ruleNo };
          });
        } else {
          this.$message.error("查询积分规则失败");
        }
      });
    },

    /**
         * 查询兑换点规则列表
         */
    listSearchEpRuleType() {
      listSearchEpRule("type=1").then(res => {
        if (res.code === 200) {
          this.selectList.exchangeOptions = res.data.map(element => {
            return { "label": element.ruleName, "value": element.ruleNo };
          });
        } else {
          this.$message.error("查询失败");
        }
      });
    },

    /**
      * 查询优惠券规则列表
      */
    listSearchCpTemplateType(key) {
      listSearchCpTemplate("status=1").then(res => {
        if (res.code === 200) {
          this.selectList.couponOptions = res.data.map(element => {
            return { "label": element.ruleName, "value": element.ruleNo };
          });
        } else {
          this.$message.error("查询失败");
        }
      });
    },

    /**
     * 分页查询数据
     * @param clear 是否清空
     */
    listStoreByPage() {
      const params = {
        "ruleNo": this.ruleNo,
        "page.pageNum": this.pagination.current,
        "page.pageSize": this.pagination.size,
        "customerNo": this.form.storeNo
      };
      const postData = this.$jsonFormat(params);
      listScStoreByPage(postData).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.pagination.total = res.data.total;
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },
    /**
     * 重置按钮
     */
    resetTableData() {
      this.form.storeNo = "";
      this.pagination.current = 1;
      this.pagination.size = 10;
      this.$refs.store && this.$refs.store.cleanStore();
      this.listStoreByPage();
    },

    /**
     * 返回
     */
    back() {
      this.$store.dispatch("tabbar/delView", this.$route).then(() => {
        this.$router.back();
      }).catch(() => {});
    },
    /**
     * 门店名称模糊查询
     * @param val
     */
    storeChange(val) {
      console.log(val);
      this.form.storeNo = val;
    }
  }
};