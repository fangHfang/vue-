
import { createRegPkg, updateRegPkg, regPkgDetail } from "@/api/product/giftpack";
export default {
  "name": "ActivitySeckillAdd",
  "components": {
  },
  data() {
    return {
      "regPkgNo": this.$route.params.id || 0,
      "identity": "add",
      "pageTitle": "新增门店注册礼包",
      "form": {
        "pkgName": "",
        "priority": "",
        "activeDate": [],
        "remarks": ""
      },
      "rules": {
        "pkgName": [
          { "required": true, "message": "请输入活动名称", "trigger": "blur" },
          { "min": 1, "max": 20, "message": "名称不要超过20个字", "trigger": "blur" }
        ],
        "priority": [
          { "required": true, "message": "请输入优先级", "trigger": "blur" }
        ],
        "activeDate": [
          { "required": false, "message": "请选择日期", "trigger": "change" }
        ],
        "remarks": [
          { "required": false, "message": "请输入备注", "trigger": "blur" }
        ]
      },
      "couponTableData": [],
      "couponDialogVisible": false,
      "detailLoading": false,
      "multipleSelection": [],
      "btnLoading": false
    };
  },
  "computed": {
  },
  created() {
  },
  activated() {
    this.btnLoading = false;
    const path = this.$route.path.split("/");
    if (this.regPkgNo) {
      this.identity = path[path.length - 2];
      this.getRegPkgDetail();
      if (this.identity === "detail") {
        this.pageTitle = "门店注册礼包详情";
      } else if (this.identity === "edit") {
        this.pageTitle = "编辑门店注册礼包";
      }
    }
  },
  "watch": {
  },
  "methods": {
    /**
     * 跳转卡券明细
     * @param ruleNo
     */
    selectCouponDetail(ruleNo) {
      this.$router.push({ "path": "/business/coupon/add", "query": { "ruleNo": ruleNo } });
    },
    getRegPkgDetail() {
      const params = {
        "regPkgNo": this.regPkgNo
      };
      this.detailLoading = true;
      regPkgDetail(this.$jsonFormat(params)).then(res => {
        if (res.code === 200) {
          const data = res.data;
          if (!data) return this.$message.error("查询活动详情失败");

          this.form.pkgName = data.pkgName;
          this.form.priority = data.priority;
          this.form.activeDate = [ data.beginTime, data.endTime ];
          this.form.remarks = data.remarks;
          this.couponTableData = data.cpTemplateDTOList;
          this.detailLoading = false;
        } else {
          this.$message.error("查询活动详情失败");
          this.detailLoading = false;
        }
      });
    },

    /**
     * 获取勾选的行
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     * 获取选中的兑换点
     * @param list
     */
    getSelectCoupon(list) {
      const formatList = list.map(x => {
        return {
          ...x,
          "quantity": ""
        };
      });
      this.couponTableData = Array.from(new Set([ ...this.couponTableData, ...formatList ]));
    },
    /**
     * 删除优惠券
     */
    deleteCoupon() {
      if (this.multipleSelection.length < 1) {
        this.$message.info("请至少选中一条数据!");
        return;
      }
      this.$confirm("是否确定删除？", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        const ruleNos = this.multipleSelection.map(x => x.ruleNo);
        this.couponTableData = this.couponTableData.filter(y => !ruleNos.includes(y.ruleNo));
      }).catch(() => {});
    },
    toSave() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.doSave();
        } else {
          console.log("验证不通过!!");
          this.btnLoading = false;
          return false;
        }
      });
    },
    /**
     * 保存
     * @returns {*}
     */
    doSave() {
      const couponTableData = JSON.parse(JSON.stringify(this.couponTableData));
      let canSave = true;
      couponTableData.some(y => {
        if (!y.quantity && y.quantity !== 0) {
          canSave = false;
          this.btnLoading = false;
          return this.$message.warning("赠送数量不能为空");
        }
        if (y.quantity < 0) {
          canSave = false;
          this.btnLoading = false;
          return this.$message.warning("赠送数量必须大于等于0");
        }
      });
      if (!canSave) return;
      const regPkgDetailModifyReqs = couponTableData.map(x => {
        return {
          "quantity": x.quantity,
          "ruleNo": x.ruleNo
        };
      });
      const params = {
        "pkgName": this.form.pkgName,
        "priority": this.form.priority,
        "remarks": this.form.remarks,
        regPkgDetailModifyReqs
      };
      if (this.form.activeDate && this.form.activeDate.length > 0) {
        params.beginTime = this.form.activeDate[0];
        params.endTime = this.form.activeDate[1];
      }
      if (this.identity === "add" || this.identity === "copy") {
        createRegPkg(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("保存成功");
            setTimeout(() => {
              this.back();
            }, 1000);
          } else {
            this.$message.error("保存失败");
            this.btnLoading = false;
          }
        }).catch(res => {
          this.btnLoading = false;
        });
      } else if (this.identity === "edit") {
        params.regPkgNo = this.regPkgNo;
        updateRegPkg(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("编辑保存成功");
            setTimeout(() => {
              this.back();
            }, 1000);
          } else {
            this.$message.error("编辑保存失败");
            this.btnLoading = false;
          }
        }).catch(res => {
          this.btnLoading = false;
        });
      }
    },

    /**
     * 返回
     */
    back() {
      this.$store.dispatch("tabbar/delView", this.$route).then(() => {
        this.$router.back();
      }).catch(() => {});
    }
  }
};
