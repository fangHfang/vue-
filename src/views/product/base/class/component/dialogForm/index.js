import { createCategoryItem } from "@/api/product/base/class";
export default {
  "name": "goodsClassDialogForm",
  "components": {
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    },
    "categoryLevel": {
      "type": Number,
      "default": false
    },
    "parentNo": {
      "type": [ String, Number ],
      "default": 0
    },
    "categoryName": {
      "type": String,
      "default": false
    }
  },
  data() {
    return {
      "form": {
        "categoryName": "",
        "categoryLevel": "",
        "parentNo": {
          "value": "",
          "options": [
            { "label": "一级", "value": "1" },
            { "label": "二级", "value": "2" },
            { "label": "三级", "value": "3" }
          ]
        },
        "remark": ""
      },
      "rules": {
        "categoryName": [
          { "required": true, "message": "请输入分类名称", "trigger": "blur" }
        ],
        "categoryLevel": [
          { "required": true, "message": "请输入等级", "trigger": "blur" }
        ]
      },
      "btnLoading": false
    };
  },
  "methods": {
    /**
     * 清理数据
     * @param {} done
     */
    clearData() {
      this.form = {
        "categoryName": "",
        "categoryLevel": "",
        "parentNo": {
          "value": "",
          "options": [
            { "label": "一级", "value": "1" },
            { "label": "二级", "value": "2" },
            { "label": "三级", "value": "3" }
          ]
        },
        "remark": ""
      };
    },
    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.$emit("update:dialogVisible", false);
          this.clearData();
        })
        .catch(_ => {
          // this.$emit("update:dialogVisible", false);
          // this.clearData();
        });
    },
    submitForm(form) {
      const { categoryName, remark } = form;
      const postData = {
        remark,
        categoryName,
        "categoryLevel": this.categoryLevel,
        "parentNo": this.parentNo,
        "categoryType": 2
      };
      if (this.categoryLevel === 3) {
        const wholeCategoryName = this.categoryName + "/" + categoryName;
        postData.wholeCategoryName = wholeCategoryName;
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.btnLoading = true;
          createCategoryItem(postData).then((res) => {
            if (res.code === 200) {
              this.$emit("update:dialogVisible", false);
              this.clearData();
              this.$emit("refreshRowData");
            } else {
              this.$message({
                "message": res.msg,
                "type": "warning"
              });
            }
            setTimeout(() => {
              this.btnLoading = false;
            }, 100);
          }).catch((error) => {
            setTimeout(() => {
              this.btnLoading = false;
            }, 100);
            console.log(error);
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};