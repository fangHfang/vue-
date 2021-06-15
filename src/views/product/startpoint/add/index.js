import { createStartPoint } from "@/api/product/startPoint";
export default {
  "name": "StartPointAdd",
  "components": {
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    }
  },
  data() {
    return {
      "tableLoading": false,
      "form": {
        "status": 0,
        "baseNumber": "",
        "startPointName": "",
        "remark": ""
      },
      "rules": {
        "startPointName": [
          { "required": true, "message": "请输入规则名称", "trigger": "blur" }, { "max": 15, "message": "名称长度不能超过15位" }
        ],
        "baseNumber": [
          { "required": true, "message": "起订分数值", "trigger": "blur" }, { "max": 15, "message": "起订分数值长度不能超过15位" }
        ]
      },
      "open": true,
      "btnLoading": false
    };
  },
  "methods": {
    /**
     * 关闭弹窗
     * @param done
     */
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          this.$emit("update:dialogVisible", false);
        })
        .catch(_ => {
          this.$emit("update:dialogVisible", false);
        });
    },
    saveStartPoint() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.tableLoading = true;
          const params = this.form;
          createStartPoint(params).then(res => {
            this.$message.info(res.msg);
            this.tableLoading = false;
            this.btnLoading = false;
            this.$emit("update:dialogVisible", false);
            this.$emit("listStartPointByPage");
            setTimeout(() => {
              this.form = {};
            }, 500);
          }).catch((error) => {
            console.info(error);
            this.tableLoading = false;
            this.btnLoading = false;
            this.$emit("update:dialogVisible", false);
            setTimeout(() => {
              this.form = {};
            }, 500);
          });
        } else {
          setTimeout(() => {
            this.form = {};
          }, 500);
          this.btnLoading = false;
          return false;
        }
      });
    },

    /**
     * 判断是否为正整数
     */
    changeInput() {
      const pattern = /^[1-9][0-9]*$/;
      if (!pattern.test(this.form.baseNumber)) {
        this.form.baseNumber = "";
      }
    }
  }
};