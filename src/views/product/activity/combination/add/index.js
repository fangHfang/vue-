import dialogAddProduct from "@/components/dialogAddProduct/index.vue";
import dialogAddLocation from "../../seckill/location/index.vue";
import { createPromotion, promotionDetail, updatePromotion } from "@/api/product/activity/promotion";
import { pageSearchPromotionCategory } from "@/api/product/activity/class";
import { listSearchRbRule } from "@/api/business/rebate/rule";
import { listSearchItRule } from "@/api/product/rule";
export default {
  "name": "ActivitySeckillAdd",
  "components": {
    dialogAddProduct,
    dialogAddLocation
  },
  data() {
    return {
      "promotionNoId": this.$route.params.id || 0,
      "identity": "add",
      "pageTitle": "新增商品组合活动",
      "isMjsProduct": true,
      "form": {
        "name": "",
        "promotionRule": "",
        "activeDate": [],
        "activeType": {
          "value": "",
          "options": [
            { "label": "秒杀活动", "value": 0 },
            { "label": "限时抢购活动", "value": 1 },
            { "label": "商品组合活动", "value": 2 }
          ]
        },
        "categoryType": {
          "value": "",
          "options": [
            { "label": "秒杀活动", "value": 0 },
            { "label": "限时抢购活动", "value": 1 },
            { "label": "商品组合活动", "value": 2 }
          ]
        },
        "activeListImg": {
          "url": "",
          "list": []
        },
        "activeBanner": {
          "url": "",
          "list": []
        },
        // 介绍
        "introduce": "",
        // 优惠券限制
        "couponRestrictions": true,
        // 展示优惠力度
        "showCouponDepth": true,
        // 定位限制
        "positioningConstraints": {
          "value": "",
          "options": [
            { "label": "不限制", "value": 0 },
            { "label": "允许在门店范围内购买", "value": 1 },
            { "label": "允许在精准定位范围内购买", "value": 2 }
          ]
        },
        // 返利规则设置
        "rebateRules": {
          "status": true,
          "value": "",
          "options": [
            { "label": "一级", "value": "1" }
          ]
        },
        // 积分规则设置
        "pointsRules": {
          "status": true,
          "value": "",
          "options": [
            { "label": "一级", "value": "1" }
          ]
        },
        // 显示规则
        "displayRules": {
          "value": "",
          "options": [
            { "label": "按数量显示", "value": 0 },
            { "label": "按百分比显示", "value": 1 }
          ]
        },
        // 兑换点规则Table数据
        "couponTableData": [],
        // 自选商品限制
        "diySelectProductLimit": ""
      },
      "rules": {
        "name": [
          { "required": true, "message": "请输入活动名称", "trigger": "blur" },
          { "max": 20, "message": "最多 20 个字符", "trigger": "blur" }
        ],
        "promotionRule": [
          { "required": true, "message": "请输入活动规则名称", "trigger": "blur" },
          { "max": 20, "message": "最多 20 个字符", "trigger": "blur" }
        ],
        "activeDate": [
          { "required": true, "message": "请选择日期", "trigger": "change" }
        ],
        "activeType.value": [
          { "required": true, "message": "请选择活动分类", "trigger": "change" }
        ],
        "categoryType.value": [
          { "required": true, "message": "请选择活动类型", "trigger": "change" }
        ],
        "displayRules.value": [
          { "required": true, "message": "请选择商品剩余数量显示规则", "trigger": "change" }
        ],
        "positioningConstraints.value": [
          { "required": true, "message": "请选择定位限制", "trigger": "change" }
        ]
      },
      "toolBar": {
        "name": "",
        "class": {
          "value": "",
          "options": [
            { "label": "一级", "value": "1" },
            { "label": "二级", "value": "2" },
            { "label": "三级", "value": "3" }
          ]
        },
        "spec": {
          "value": "",
          "options": [
            { "label": "规格1", "value": "1" },
            { "label": "规格2", "value": "2" },
            { "label": "规格3", "value": "3" }
          ]
        },
        "brand": "",
        "tag": {
          "value": "",
          "options": [
            { "label": "标签1", "value": "1" },
            { "label": "标签2", "value": "2" },
            { "label": "标签3", "value": "3" }
          ]
        }
      },
      "dialogVisible": false,
      "epRuleDialogVisible": false,
      "dialogLocationVisible": false,
      // 商品组合大列表
      "productmixCreateReqs": [
        {
          "itemType": 0,
          "list": []
        },
        {
          "itemType": 1,
          "list": []
        }
      ],
      // 商品索引-当前选择的索引
      "currentBatchIndex": 0,
      "detailLoading": false,
      "multipleSelection": {
        "0": [],
        "1": []
      },
      // 精准定位
      "mapLocation": {
        "coordinate": {
          "lat": "",
          "lng": ""
        }
      },
      "btnLoading": false
    };
  },
  "computed": {
    token() {
      return { "Authorization": "bearer " + this.$store.state.token };
    }
  },
  created() {
    // 查询活动分类
    this.getActivityCategory();
    this.listSearchRbRuleType();
    this.listSearchItRuleType();
  },
  mounted() {
    const path = this.$route.path.split("/");
    if (this.promotionNoId) {
      this.identity = path[path.length - 2];
      this.getActivityDetail();
      if (this.identity === "detail") {
        this.pageTitle = "商品组合活动详情";
      } else if (this.identity === "edit") {
        this.pageTitle = "编辑商品组合活动";
      } else if (this.identity === "copy") {
        this.pageTitle = "复制商品组合活动";
      }
    }
  },
  "methods": {
    getActivityDetail() {
      const params = {
        "promotionNo": this.promotionNoId
      };
      this.detailLoading = true;
      promotionDetail(this.$jsonFormat(params)).then(res => {
        if (res.code === 200) {
          const data = res.data;
          if (!data) return this.$message.error("查询活动详情失败");
          let batchArr = [];
          if (data.productmixs) {
            batchArr = data.productmixs.reduce((prev, cur) => {
              if (prev.length > 0 && prev[prev.length - 1]) {
                if (Object.is(prev[prev.length - 1].itemType, cur.itemType)) {
                  prev[prev.length - 1].list.push(cur);
                } else {
                  prev.push({
                    "itemType": cur.itemType,
                    "list": [ cur ]
                  });
                }
              } else {
                prev.push({
                  "itemType": cur.itemType,
                  "list": [ cur ]
                });
              }
              return prev;
            }, []);
            if (batchArr.length < 2) {
              const type = batchArr[0] && batchArr[0].itemType;
              batchArr.push({
                "itemType": 1 - type,
                "list": []
              });
            }
          }
          this.form.name = data.promotionName;
          this.form.promotionRule = data.promotionRule;
          this.form.activeDate = [ data.startTime, data.endTime ];
          this.form.categoryType.value = data.categoryType;
          this.form.activeType.value = data.categoryNo;
          if (data.listUrl) {
            this.form.activeListImg.url = data.listUrl;
            this.form.activeListImg.list = [ { "name": "", "url": data.listUrl } ];
          } else {
            this.form.activeListImg.url = "";
            this.form.activeListImg.list = [];
          }
          if (data.placardsUrl) {
            this.form.activeBanner.url = data.placardsUrl;
            this.form.activeBanner.list = [ { "name": "", "url": data.placardsUrl } ];
          } else {
            this.form.activeBanner.url = "";
            this.form.activeBanner.list = [];
          }
          this.form.introduce = data.promotionDesc;
          this.form.couponRestrictions = data.isCouponLimit;
          this.form.showCouponDepth = data.isDiscountOnly;
          this.form.positioningConstraints.value = data.positionLimitType;
          this.form.couponTableData = data.epRelations;
          this.form.pointsRules.value = data.itRuleNo;
          this.form.rebateRules.value = data.rbRuleNo;
          this.form.rebateRules.status = data.isRebate;
          this.form.pointsRules.status = data.isIntegral;
          this.form.displayRules.value = data.itemCountDisplayType;
          this.productmixCreateReqs = batchArr;
          this.mapLocation.range = data.positionLimitRange;
          this.mapLocation.coordinate = {
            "lat": data.latitude,
            "lng": data.longitude
          };
          this.detailLoading = false;
        } else {
          this.$message.error("查询活动详情失败");
          this.detailLoading = false;
        }
      });
    },
    /**
     * 获取活动分类
     */
    getActivityCategory() {
      const param = "page.pageNum=1&page.pageSize=100&categoryType=2";
      pageSearchPromotionCategory(param).then(res => {
        if (res.code === 200) {
          this.form.activeType.options = res.data.records.map(x => {
            return {
              "label": x.categoryName,
              "value": x.categoryNo
            };
          });
        } else {
          console.log("查询活动分类失败");
        }
      });
    },
    /**
     * 查询返利规则列表
     */
    listSearchRbRuleType() {
      // 1、商品模块-活动模块-积分模块都是0-商品下单   2、安心跑模块 2-商品出库   3、签约-店检  1-商品入库
      listSearchRbRule("type=0").then(res => {
        if (res.code === 200) {
          this.form.rebateRules.options = res.data.filter(x => (x.type === 0 && x.status === 1)).map(element => {
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
    listSearchItRuleType() {
      listSearchItRule("type=0").then(res => {
        if (res.code === 200) {
          this.form.pointsRules.options = res.data.filter(x => (x.type === 0 && x.status === 1)).map(element => {
            return { "label": element.ruleName, "value": element.ruleNo };
          });
        } else {
          this.$message.error("查询积分规则失败");
        }
      });
    },
    /**
     * 移除图片
     * @param {*} file
     * @param {*} name
     */
    handlePicRemove(file, name) {
      this.$confirm("确定删除吗", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        file.imgUrl = "";
        file.url = "";
        this.form[name].url = "";
        this.form[name].list = [];
      }).catch(() => {});
    },
    /**
     * 上传图片成功后钩子
     */
    handlePicSuccess(res) {
      if (res.code === 200) {
        this.form.activeListImg.url = res.data.objectUrl;
      } else {
        this.$message.error(res.msg);
      }
    },
    /**
     * 上传海报成功后钩子
     */
    handlePic2Success(res) {
      if (res.code === 200) {
        this.form.activeBanner.url = res.data.objectUrl;
      } else {
        this.$message.error(res.msg);
      }
    },
    /**
     * 获取勾选的行
     */
    handleSelectionChange(val, key) {
      this.multipleSelection[key] = val;
    },
    /**
     * 获取选中的商品
     * @param list
     */
    getSelectProducts(list) {
      const formatList = list.map(x => {
        return {
          "itemImageUrl": x.listPicture || require("@/assets/image/pd-img.jpg"),
          "itemName": x.itemName,
          "itemCategory": x.categoryName,
          "itemBrand": x.brandName,
          "itemTag": x.labelInfos && x.labelInfos.map(y => y.labelName).join("|"),
          "itemSpec": x.specDetail,
          "itemNo": x.itemNo,
          "itemType": this.currentBatchIndex,
          "isForceItem": false,
          "itemAmount": "",
          "amount": "",
          "discountAmount": "",
          "personalLimitCount": "",
          "stock": "",
          "displayStock": "",
          "itemDetailUrls": x.detailPicture,
          "itemBannerUrls": x.bannerPicture,
          "itemCategoryBackend": x.categoryName || "",
          "itemCategoryFrontend": x.categoryName || "",
          "itemTyreBlackWhiteLine": x.itemTyreBlackWhiteLine || "",
          "itemTyreFlatRatio": x.itemTyreFlatRatio || "",
          "itemTyreInch": x.itemTyreInch || "",
          "itemTyreSimilarTread": x.itemTyreSimilarTread || "",
          "itemTyreTread": x.itemTyreTread || "",
          "itemTyreType": x.itemTyreType || "",
          "itemTyreWidth": x.itemTyreWidth || "",
          "productNo": x.productNo || "",
          "isMjsProduct": this.isMjsProduct
        };
      });
      const find = this.productmixCreateReqs.find(x => x.itemType === this.currentBatchIndex);
      find.list = Array.from(new Set([ ...find.list, ...formatList ]));
    },
    /**
     * 获取选中的兑换点
     * @param list
     */
    getSelectRules(list) {
      this.form.couponTableData = Array.from(new Set([ ...this.form.couponTableData, ...list ]));
    },
    /**
     * 删除某个兑换点规则
     * @param ruleNo
     */
    deleteEpRule(ruleNo) {
      this.$confirm("确认删除当前兑换点规则么", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        this.form.couponTableData.forEach((x, i, arr) => {
          if (x.ruleNo === ruleNo) {
            arr.splice(i, 1);
          }
        });
      }).catch(() => {});
    },
    /**
     * 删除全部兑换点规则
     */
    deleteEpRuleAll() {
      this.$confirm("确认删除全部兑换点规则么", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        this.form.couponTableData = [];
      }).catch(() => {});
    },
    /**
     * 添加商品
     * @param i 批次
     */
    addProduct(i) {
      this.currentBatchIndex = i;
      this.dialogVisible = true;
    },
    /**
     * 全部批量
     */
    removeBatchAll() {
      this.$confirm("确认取消全部么", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        this.productmixCreateReqs = [
          {
            "itemType": 0,
            "list": []
          },
          {
            "itemType": 1,
            "list": []
          }
        ];
      }).catch(() => {});
    },
    /**
     * 批量取消
     * @param i
     */
    removeBatch(i) {
      const multipleSelection = this.multipleSelection;
      if (multipleSelection[i].length < 1) {
        this.$message.info("请至少选中一条数据!");
        return;
      }
      this.$confirm("确认取消当前商品么", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "showClose": false,
        "type": "warning"
      }).then(() => {
        const filterList = multipleSelection[i].map(x => x.itemNo);
        const find = this.productmixCreateReqs.find(x => x.itemType === i);
        find.list = find.list.filter(x => !filterList.includes(x.itemNo));
      }).catch(() => {});
    },
    /**
     * 保存活动
     */
    saveActivity() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.doSave();
        } else {
          console.log("error submit!!");
          this.btnLoading = false;
          return false;
        }
      });
    },
    doSave() {
      const productmixCreateReqs = JSON.parse(JSON.stringify(this.productmixCreateReqs));
      let canSave = true;
      productmixCreateReqs.some(x => {
        x.list.forEach(y => {
          if (!y.itemAmount && y.itemAmount !== 0) {
            canSave = false;
            return this.$message.warning("商品原价不能为空");
          }
          if (y.itemAmount < 0) {
            canSave = false;
            return this.$message.warning("商品原价必须大于等于0");
          }
          if (!y.amount && y.amount !== 0) {
            canSave = false;
            return this.$message.warning("活动价格不能为空");
          }
          if (y.amount < 0) {
            canSave = false;
            return this.$message.warning("活动价格必须大于等于0");
          }
          if (!y.personalLimitCount && y.personalLimitCount !== 0) {
            canSave = false;
            return this.$message.warning("个人购买限量不能为空");
          }
          if (parseFloat(y.personalLimitCount) === 0) {
            canSave = false;
            return this.$message.warning("个人购买限量必须大于0");
          }
          if (!y.stock && y.stock !== 0) {
            canSave = false;
            return this.$message.warning("商品活动库存不能为空");
          }
          if (y.stock < 0) {
            canSave = false;
            return this.$message.warning("商品活动库存必须大于等于0");
          }
          if (!y.displayStock && y.displayStock !== 0) {
            canSave = false;
            return this.$message.warning("APP显示剩余数量不能为空");
          }
          if (parseFloat(y.displayStock) === 0) {
            canSave = false;
            return this.$message.warning("APP显示剩余数量必须大于0");
          }
          if (this.form.showCouponDepth) {
            if (!y.discountAmount && y.discountAmount !== 0) {
              canSave = false;
              return this.$message.warning("仅显示优惠金额不能为空");
            }
            if (y.discountAmount < 0) {
              canSave = false;
              return this.$message.warning("仅显示优惠金额必须大于等于0");
            }
          }
          // y.isForceItem = y.isForceItem ? 1 : 0;
        });
      });
      if (!canSave) {
        this.btnLoading = false;
        return;
      }
      const params = {
        "promotionName": this.form.name,
        "promotionRule": this.form.promotionRule,
        "categoryType": 2,
        "categoryNo": this.form.activeType.value,
        "listUrl": this.form.activeListImg.url,
        "placardsUrl": this.form.activeBanner.url,
        "promotionDesc": this.form.introduce,
        "isCouponLimit": this.form.couponRestrictions ? 1 : 0,
        "isDiscountOnly": this.form.showCouponDepth ? 1 : 0,
        "positionLimitType": this.form.positioningConstraints.value,
        "epRules": this.form.couponTableData.map(x => x.ruleNo || x.epRuleNo),
        "itRuleNo": this.form.pointsRules.value,
        "rbRuleNo": this.form.rebateRules.value,
        "isRebate": this.form.rebateRules.status ? 1 : 0,
        "isIntegral": this.form.pointsRules.status ? 1 : 0,
        "itemCountDisplayType": this.form.displayRules.value,
        "productmixCreateReqs": productmixCreateReqs.reduce((prev, cur) => prev.concat(cur.list), [])
      };
      if (this.form.positioningConstraints.value === 2) {
        if (this.mapLocation.coordinate.lat === "" || this.mapLocation.coordinate.lng === "") {
          this.btnLoading = false;
          return this.$message.warning("请设置精准定位");
        }
        if (!this.mapLocation.range) {
          this.btnLoading = false;
          return this.$message.warning("定位范围不能为空");
        }
        params.positionLimitRange = parseFloat(this.mapLocation.range);

        if (!this.mapLocation.coordinate) {
          this.btnLoading = false;
          return this.$message.warning("请选择有效经纬度地址");
        }
        params.latitude = this.mapLocation.coordinate && this.mapLocation.coordinate.lat;
        params.longitude = this.mapLocation.coordinate && this.mapLocation.coordinate.lng;
      }
      if (this.form.activeDate.length > 0) {
        params.startTime = this.form.activeDate[0];
        params.endTime = this.form.activeDate[1];
      }
      this.btnLoading = true;
      if (this.identity === "add" || this.identity === "copy") {
        createPromotion(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("保存成功");
            setTimeout(() => {
              this.back("save");
            }, 1000);
          } else {
            this.$message.error("保存失败");
          }
          this.btnLoading = false;
        }).catch(res => {
          this.btnLoading = false;
        });
      } else if (this.identity === "edit") {
        params.promotionNo = this.promotionNoId;
        updatePromotion(params).then((res) => {
          if (res.code === 200) {
            this.$message.success("编辑保存成功");
            setTimeout(() => {
              this.back("save");
            }, 1000);
          } else {
            this.$message.error("编辑保存失败");
          }
          this.btnLoading = false;
        }).catch(res => {
          this.btnLoading = false;
        });
      }
    },
    /**
     * 返回
     * @param mark
     */
    back(mark) {
      if (mark === "save") {
        this.$store.dispatch("tabbar/delView", this.$route).then(() => {
          this.$router.push({ "path": "/product/activity/combination/list", "query": { "r": this.$getRandomValue() } });
        }).catch(() => {});
      } else {
        this.$router.back();
      }
    },
    /**
     * 获取定位信息
     * @param val
     */
    getSelectLocation(val) {
      this.mapLocation = val;
    }
  }
};
