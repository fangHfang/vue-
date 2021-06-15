import upload from "@/components/upload/index.vue";
export default {
  "name": "addActiveDialog",
  "components": {
    upload
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    }
  },
  data() {
    return {
      "form": {
        "name": "",
        "activeType": null,
        "imageUrl": [ { "url": require("@/assets/image/test-img1.png") } ]
      },
      "rules": {
        "name": [
          { "required": true, "message": "请输入分类名称", "trigger": "change" }
        ],
        "activeListImg": [
          { "required": true, "message": "请上传橱窗图片", "trigger": "blur" }
        ],
        "activeType": [
          { "required": true, "message": "请选择活动类型", "trigger": "change" }
        ]
      }
    };
  },
  "methods": {
    /**
     * 清理数据
     * @param {} done
     */
    clearData() {
      this.form = {
        "name": "",
        "type": null,
        "activeListImg": []
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
          this.$emit("update:dialogVisible", false);
          this.clearData();
        });
    },
    /**
     * 提交
     * */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("提交成功");
        } else {
          return false;
        }
      });
    }

  }
};