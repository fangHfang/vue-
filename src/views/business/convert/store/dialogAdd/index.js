export default {
  "name": "convertStoreRuleAdd",
  "components": {
  },
  data() {
    return {
      "radio": "",
      "form": {
        "name": "玛吉斯大运河路门店",
        "one": "M124545456",
        "two": "300",
        "three": "",
        "four": "",
        "five": "",
        "remarks": "",
        "region": "",
        "date1": "",
        "date2": "",
        "delivery": false,
        "type": [],
        "resource": "",
        "desc": ""
      },
      "rules": {
        "name": [
          { "required": true, "message": "请输入名称", "trigger": "blur" },
          { "min": 3, "max": 20, "message": "长度在 3 到 20 个字符", "trigger": "blur" }
        ]
      },
      "dialogImageUrl": "",
      "dialogVisible": false,
      "disabled": false
    };
  },
  "methods": {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    }
  }
};