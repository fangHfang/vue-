import { createCategoryItem, update } from "@/api/product/base/class";
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
      "default": 1
    },
    "parentNo": {
      "type": String,
      "default": "0"
    },
    "categoryName": {
      "type": String,
      "default": "false"
    },
    "row": {
      "type": Object,
      "default": {}
    },
    "title": {
      "type": String,
      "default": ""
    }
  },
  data() {
    const validateInput = (rule, value, callback) => {
      if (!this.checkSpecialKey(value)) {
        callback(new Error("不能含有特殊字符！！"));
      } else {
        callback();
      }
    };
    return {
      "form": {
        "categoryName": "",
        "categoryLevel": "",
        // "parentNo": {
        //   "value": "",
        //   "options": [
        //     { "label": "一级", "value": "1" },
        //     { "label": "二级", "value": "2" },
        //     { "label": "三级", "value": "3" }
        //   ]
        // },
        "remark": "",
        "sort": "",
        "id": "",
        "categoryNo": "",
        "createBy": "",
        "created": "",
        "show": "",
        "status": "",
        "useCount": "",
        "wholeCategoryName": ""

      },
      // "edit": {

      // },
      "rules": {
        "categoryName": [
          { "required": true, "message": "请输入分类名称", "trigger": "blur" },
          { "validator": validateInput, "trigger": [ "blur", "change" ] }
        ],
        "categoryLevel": [
          { "required": true, "message": "请输入等级", "trigger": "blur" }
        ],
        "sort": [
          { "required": true, "message": "请输入排序", "trigger": "blur" }
        ]
      },
      "status": true,
      "btnLoading": false
    };
  },
  "watch": {
    "row": {
      handler(newVal, oldVal) {
        if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
          return;
        }
        this.editItem();
      }
    },
    "dialogVisible": {
      handler(val) {
        if (!val) {
          this.clearData();
        }
      }
    }
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
        // "parentNo": {
        //   "value": "",
        //   "options": [
        //     { "label": "一级", "value": "1" },
        //     { "label": "二级", "value": "2" },
        //     { "label": "三级", "value": "3" }
        //   ]
        // },
        "remark": "",
        "sort": "",
        "id": "",
        "categoryNo": "",
        "createBy": "",
        "created": "",
        "show": "",
        "status": "",
        "useCount": "",
        "wholeCategoryName": ""
      };
    },
    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.clearData();
          this.$emit("update:dialogVisible", false);
        })
        .catch(_ => {
        });
    },

    submitForm(form) {
      const { categoryName, remark, sort } = form;
      if (!this.checkSpecialKey(categoryName)) {
        this.$message("分类名称不能含有特殊字符！！");
        return;
      }
      if (remark && !this.checkSpecialKey(remark)) {
        this.$message("备注不能含有特殊字符！！");
        return;
      }
      const postData = {
        sort,
        remark,
        categoryName,
        "categoryLevel": this.categoryLevel,
        "parentNo": this.parentNo,
        "categoryType": 1
      };
      if (this.categoryLevel === 2) {
        const wholeCategoryName = this.categoryName + "/" + categoryName;
        postData.wholeCategoryName = wholeCategoryName;
      }
      this.$refs.form.validate((valid) => {
        if (form.id === "" || form.id === undefined) {
          this.btnLoading = true;
          createCategoryItem(postData).then((res) => {
            if (res.code === 200) {
              this.$emit("update:dialogVisible", false);
              this.clearData();
              if (this.title === "nextLevel") {
                this.$emit("refreshRowData");
              } else {
                this.$emit("refreshListData");
              }
            } else {
              console.info(res.msg);
            }
            setTimeout(() => {
              this.btnLoading = false;
            }, 100);
          }).catch((error) => {
            console.info(error);
            setTimeout(() => {
              this.btnLoading = false;
            }, 100);
          });
        } else {
          form.categoryType = 1;
          this.btnLoading = true;
          update(form).then((res) => {
            if (res.code === 200) {
              this.$emit("update:dialogVisible", false);
              this.clearData();
              if (this.title === "nextLevel") {
                this.$emit("refreshRowData", "update");
              } else {
                this.$emit("refreshListData");
              }
            } else {
              console.info(res.msg);
            }
            setTimeout(() => {
              this.btnLoading = false;
            }, 100);
          }).catch((error) => {
            console.info(error);
            setTimeout(() => {
              this.btnLoading = false;
            }, 100);
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    /**
     * 判断是否为正整数
     */
    changeInput() {
      const pattern = /^[1-9][0-9]*$/;
      if (!pattern.test(this.form.sort)) {
        this.form.sort = "";
      }
    },

    /**
     * 修改
     */
    editItem(row) {
      const { __family, __identity, __index, __level, ...data } = this.row;
      this.form = {
        ...data
      };

      this.$emit("update:row", this.form);
    },
    /**
     * 分类名称做特殊字符校验
     * @param val
     */
    checkSpecialKey(str) {
      const specialKey = "[`~!#$^&*()=|{}':;'\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
      for (let i = 0;i < str.length;i++) {
        if (specialKey.indexOf(str.substr(i, 1)) !== -1) {
          return false;
        }
      }
      return true;
    }
  }
};