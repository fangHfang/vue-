import { createPromotionCategory, updatePromotionCategory, promotionCategoryDetail } from "@/api/product/activity/class";
export default {
  "name": "ActivityClassAdd",
  "components": {
  },
  "props": {
    "needSave": {
      "type": Boolean,
      "default": false
    },
    "categoryNo": {
      "type": String,
      "default": ""
    }
  },
  data() {
    return {
      "form": {
        // 活动分类名称
        "categoryName": "",
        // 活动分类类型(0:秒杀活动,1:限时抢购活动,2:商品组合活动)
        "categoryType": "",
        // 活动分类图片
        "iconUrl": "",
        // 备注
        "remark": "",
        // 活动分类状态(0：禁用；1：启用)
        "status": 1
      },
      "toolBar": {
        "categoryType": {
          "options": [
            { "label": "秒杀活动", "value": 0 },
            { "label": "限时抢购活动", "value": 1 },
            { "label": "商品组合活动", "value": 2 }
          ]
        },
        "fileList": []
      },
      "dialogImageUrl": "",
      "dialogVisible": false
    };
  },
  "computed": {
    token() {
      return { "Authorization": "bearer " + this.$store.state.token };
    }
  },
  "watch": {
    "categoryNo": {
      "handler": function(newVal, oldVal) {
        if (newVal) {
          this.getCategoryDetail();
        }
      },
      "immediate": true
    }
  },
  "methods": {
    /**
     * 保存新增的分类
     */
    saveActivityCategoryForm() {
      if (!this.form.categoryName || this.form.categoryName === "") {
        this.$message.info("活动分类名称不能为空");
        this.$emit("validateFailed", "");
        return;
      }
      if (this.categoryNo) {
        this.modify();
      } else {
        if (!this.form.categoryType && this.form.categoryType !== 0) {
          this.$message.info("活动分类类型必选");
          this.$emit("validateFailed", "");
          return;
        }
        this.create();
      }
    },
    /**
     * 重置
     */
    resetData() {
      this.form = {
        // 活动分类名称
        "categoryName": "",
        // 活动分类类型(0:秒杀活动,1:限时抢购活动,2:商品组合活动)
        "categoryType": "",
        // 活动分类图片
        "iconUrl": "",
        // 备注
        "remark": "",
        // 活动分类状态(0：禁用；1：启用)
        "status": 1
      };
      this.toolBar.fileList = [];
    },
    /**
     * 新增
     */
    create() {
      createPromotionCategory(this.form).then(res => {
        if (res.code === 200) {
          this.$emit("afterSave", res.msg);
          this.$message.success("保存成功");
        }
        setTimeout(() => {
          this.resetData();
        }, 1000);
      }).catch((error) => {
        console.info(error);
        this.$message.error(error.msg);
        this.$emit("validateFailed", "");
      });
    },
    /**
     * 修改
     */
    modify() {
      const { categoryName, iconUrl, remark, status } = this.form;
      const categoryNo = this.categoryNo;
      const postData = {
        categoryName,
        categoryNo,
        iconUrl,
        remark,
        status
      };
      updatePromotionCategory(postData).then(res => {
        this.$emit("afterSave", res.msg);
        // 重置
        setTimeout(() => {
          this.resetData();
        }, 1000);
      }).catch((error) => {
        console.info(error);
        this.$message.error(error.msg);
        this.$emit("validateFailed", "");
      });
    },
    handleRemove(file) {
      this.form.iconUrl = "";
      this.toolBar.fileList = [];
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    /**
     * 商品图片上传成功钩子
     */
    handleAvatarSuccess(res, file) {
      if (res.code === 200) {
        this.form.iconUrl = res.data.objectUrl;
        this.toolBar.fileList.push(file);
      } else {
        this.$message.error(res.msg);
      }
    },
    /**
     * 查询分类数据
     */
    getCategoryDetail() {
      this.tableLoading = true;
      const params = "categoryNo=" + this.categoryNo;
      promotionCategoryDetail(params).then(res => {
        if (res.code === 200) {
          this.form = res.data;
          if (res.data.iconUrl) {
            this.toolBar.fileList = [ {
              "url": res.data.iconUrl
            } ];
          } else {
            this.toolBar.fileList = [];
          }
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