import upload from "@/components/upload/index.vue";
import { toUpload } from "@/api/system/app/window";
export default {
  "name": "addActiveItem",
  "components": {
    upload
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    },
    "form": {
      "type": Object,
      "default": {}
    },
    // 序列号
    "index": {
      "type": Number,
      "default": 0
    },
    // 序列号
    "total": {
      "type": Number,
      "default": 0
    }
  },
  data() {
    return {
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
  "watch": {
    "form": {
      "handler": function(newVal, oldVal) {
        this.$emit("update:form", newVal);
      },
      "deep": true
    },
    "form.activeListImg": {
      "handler": function(newVal, oldVal) {
        console.log(this.form);
        let url = "";
        if (newVal && newVal.length > 0) {
          // 需要上传
          if (newVal[0].file) {
            const payload = {
              "target": "basic",
              "file": newVal[0].file
            };
            if (newVal[0].url.includes("localhost")) {
              this.$emit("loadingStatus", true);
              toUpload(payload).then((res) => {
                url = res.data.objectUrl;
                newVal[0].url = res.data.objectUrl;
                this.$emit("changeUploadSuccess", url);
              }).catch((err) => {
                console.log(err);
              });
            } else {
              this.$emit("loadingStatus", false);
            }
          } else {
            // 非上传
            this.$emit("changeUploadSuccess", newVal[0].url);
          }
        } else {
          // 清楚图片
          this.$emit("changeUploadSuccess", url);
        }
      },
      "deep": true
    }

  },
  "methods": {
    toUp() {
      this.$emit("toUpSort", this.index);
    },
    toDown() {
      this.$emit("toDownSort", this.index);
    },
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
     */
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