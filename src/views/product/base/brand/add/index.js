import { saveBrandFrom } from "@/api/product/base/brand";

export default {
  "name": "CommodityBrandForm",
  "components": {
  },
  "props": {
    "editForm": {
      "type": Object,
      default() {
        return {};
      }
    },
    "dialogVisible": {
      "type": Boolean,
      "default": false
    },
    "dialogTitle": {
      "type": String,
      "default": ""
    }
  },
  data() {
    return {
      "form": {
        "brandName": "",
        "status": 0,
        "remark": "",
        "brandUrl": ""
      },
      "rules": {
        "brandName": [
          { "required": true, "message": "请输入名称", "trigger": "blur" }
        ]
      },
      "fileList": [],
      "url": "",
      "btnLoading": false
    };
  },
  "computed": {
    token() {
      return { "Authorization": "bearer " + this.$store.state.token };
    }
  },
  "watch": {
    "dialogVisible": {
      "handler"(val) {
        if (val) {
          this.btnLoading = false;
          if (this.dialogTitle === "编辑品牌") {
            this.form = { ...this.editForm };
            this.url = this.editForm.brandUrl;
            this.fileList = (this.editForm.brandUrl && [ { "name": "", "url": this.url } ]) || [];
          }
        } else {
          this.clearData();
        }
      },
      "immediate": true
    }
  },
  "methods": {
    /**
     * 保存
     */
    handleAdd() {
      const payload = {
        ...this.form,
        "brandUrl": this.url
      };
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.btnLoading = true;
          saveBrandFrom(payload).then((res) => {
            if (res.code === 200) {
              this.handleClose();
              this.$emit("saveData");
            }
            setTimeout(() => {
              this.btnLoading = false;
            }, 100);
          });
        }
      });
    },
    /**
     * 重置表单
     */
    resetForm() {
      this.$refs.form.resetFields();
    },
    handleRemove(file) {
      this.url = "";
      this.fileList = [];
    },
    /**
   * 上传图片成功后钩子
   */
    handleAvatarSuccess(res, file) {
      this.url = res.data.objectUrl;
      this.fileList.push(file);
    },
    /**
     * 关闭弹窗
     * @param done
     */
    clearData() {
      // 清除数据
      this.form = {
        "brandName": "",
        "status": 0,
        "remark": "",
        "brandUrl": ""
      };
      this.url = "";
      this.fileList = [];
    },

    /**
     * 修改弹窗
     */
    setFormData(form) {
      this.form = form;
    },
    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$emit("update:dialogVisible", false);
    }
  }
};
