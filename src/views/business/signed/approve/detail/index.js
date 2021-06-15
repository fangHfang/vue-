
import { scStoreDetail, scRuleApproval } from "@/api/business/signed/step";
import { listSearchRbRule } from "@/api/business/rebate/rule";
import { listSearchItRule } from "@/api/product/rule";
import { listSearchEpRule } from "@/api/business/coupon/exchange";
import { listSearchCpTemplate } from "@/api/business/coupon/template";
export default {
  "name": "businessSignedApproveDetail",
  data() {
    return {
      "storeForm": {
        // 门店名称
        "storeName": "xxx门店",
        // 门店编号
        "storeNo": "4569876",
        // 经销商名称
        "dealerNames": "xxx经销商",
        // 经销商编号
        "dealerNo": "86543357",
        "level": "",
        // 所属区域
        "regionName": "华东区",
        // 所在城市
        "districtName": "上海市",
        // 联系人
        "contact": "xxx",
        // 联系人手机号
        "contactPhone": "18738647384",
        // 门店创建时间
        "created": "2020-02-20",
        // 门店状态
        "status": 1,
        // 门店状态
        "statusList": {
          "value": "",
          "options": [
            { "label": "禁用", "value": "0" },
            { "label": "使用", "value": "1" }
          ]
        }
      },
      "form": {
        "ruleName": "",
        "closeComment": "",
        "date": "",
        "remark": ""
      },
      "item": [ {
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
      "labels": [],
      "pagination": {
        "sizes": [ 10, 20, 50, 100, 200 ],
        "current": 1,
        "size": 10,
        "total": 400
      },
      "loading": false,
      "dealerLoading": false,
      // 否决
      "dialogVisibleVeto": false,
      // 否决原因
      "vetoReason": "",
      // 营业执照相关
      "dialogVisible": false,
      "dialogImageUrl": "",
      "disabled": false,
      "dialogImageVisible": false,
      "ruleNo": this.$route.query.ruleNo,
      "customerNo": this.$route.query.customerNo

    };
  },
  "components": {
  },
  "computed": {
    isModify() {
      return this.$store.state.storeInfo.modify;
    },
    customerNo() {
      return this.$store.state.storeInfo.customerNo;
    },
    tenantNo() {
      return this.$store.state.storeInfo.tenantNo;
    }
  },
  mounted() {
    this.scRuleDetail();
    this.listSearchRbRuleType();
    this.listSearchItRuleType();
    this.listSearchEpRuleType();
    this.listSearchCpTemplateType();
  },
  "methods": {
    /**
     * 分页器每页数量变化处理
     * @param val
     */
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },

    /**
     * 分页器当前页码变化处理
     * @param val
     */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    /**
     * 下载图片
     * @param {*} file
     * @param {*} fileList
     */
    handleDownload(file, fileList) {
      window.open(file.url);
    },

    /**
     * 点击图片浏览
     * @param {*} file
     */
    handlePictureCardPreview4License(file) {
      this.files.license.dialogVisible = true;
    },

    handlePictureCardPreview(res, file) {
      this.dialogImageUrl = res.url;
      this.dialogVisible = true;
    },
    /**
     * 移除图片
     * @param {*} file
     * @param {*} fileList
     */
    handleRemove(file, fileList) {
      this.$confirm("确定删除吗", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "title": null,
        "showClose": false,
        "type": "warning"
      }).then(() => {
        file.imgUrl = "";
        file.url = "";
        this.files.license.url = "";
        this.files.license.files = [];
        this.form.license = "";
      }).catch(() => {});
    },

    /**
     * 点击减少
     */
    toReduce(key) {
      const labelNos = [];
      this.labels.forEach((element, i) => {
        if (element.key !== key) {
          labelNos.push(element);
        }
      });
      this.labels = labelNos;
    },

    /**
     * 点击新增
     */
    toAdd() {
      this.labels.push(
        { "key": this.labels.length, "value": "" }
      );
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
       * 保存
       */
    save(status) {
      const that = this;
      const params = {
        "approvalStatus": status
      };
      params.idList = [];
      params.idList.push(this.form.id);
      if (status === 2) {
        if (this.vetoReason === "") {
          this.$message.error("请输入否决原因！");
          return;
        }
        params.rejectReason = this.vetoReason;
      }
      // params.idList.push();
      scRuleApproval(params).then(res => {
        if (res.code === 200) {
          this.vetoReason = "";
          this.$message({
            "type": "success",
            "message": "审批成功!"
          });
          this.back();
        } else {
          that.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });

      this.close();
    },
    /**
       * 取消
       */
    close() {
      this.dialogVisibleVeto = false;
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
     * 标签变化
     */
    change(label) {
      const labels = this.labels.map(element => {
        return element.value;
      });
      // 存在时无变化
      if (labels.indexOf(label) >= 0) {
        return;
      }
      // labelNos存在""时，变化""内容
      const index = labels.indexOf("");
      if (labels.indexOf("") >= 0) {
        this.labels.get(index).value = label;
        return;
      }
      this.labels.push(
        { "key": labels.length, "value": label }
      );
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
     * 查询详情
     */
    scRuleDetail() {
      const that = this;
      const params = "?ruleNo=" + this.ruleNo + "&customerNo=" + this.customerNo;
      scStoreDetail(params).then(res => {
        if (res.code === 200) {
          that.form = res.data;
          that.storeForm = res.data.storeInfoDTO;
          if (res.data.scRuleDTO.startDate && res.data.scRuleDTO.endDate) {
            that.form.date = [ res.data.scRuleDTO.startDate, res.data.scRuleDTO.endDate ];
          }
          if (res.data.imageList !== null) {
            that.listPicture = res.data.scRuleDTO.imageList;
            that.listPicture = that.listPicture.map(element => {
              return { "url": element };
            });
            that.$refs.upload.fileList = that.listPicture;
            that.item = res.data;
          }
        } else {
          that.$message.error(res.msg);
        }
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
    listSearchEpRuleType(key) {
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
    }
  }
};