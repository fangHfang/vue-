import { updateItemSpecTemplate } from "@/api/product/base/spec";
// el-form 自定义验证 禁止输入特殊字符
const customValidation = (rule, value, callback) => {
  const pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\]<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
  const rs = pattern.test(value);
  callback(rs ? new Error("不允许输入特殊字符") : "");
};
export default {
  "name": "CommoditySpecificationsEdit",
  "components": {
  },
  data() {
    return {
      "form": {
        "id": "",
        "name": "",
        "one": "",
        "two": "",
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
          { "validator": customValidation, "trigger": "change" }
        ]
      },
      "inpList": [ {
        "space": ""
      } ]
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
    /**
     * 点击新增input
     */
    addClick() {
      if (this.inpList.length < 5) {
        const obj = {
          "space": ""
        };
        this.inpList.push(obj);
      } else {
        this.$message.warning("不能再新增了");
      }
    },
    editItemSpec(row) {
      this.form.id = "";
      this.form.name = "";
      this.inpList = [ {
        "space": ""
      }, {
        "space": ""
      }, {
        "space": ""
      }, {
        "space": ""
      }, {
        "space": ""
      } ];
      this.form.delivery = "";
      this.form.remarks = "";
      this.form.id = row.id;
      this.form.name = row.specName;
      const specField = row.specFiled.split("|");
      this.inpList.length = specField.length;
      specField.map((item, index) => {
        if (this.inpList[index]) {
          this.inpList[index].space = item;
        }
      });
      this.form.delivery = row.status;
      this.form.remarks = row.remark;
    },
    /**
     * 更新商品规格
     */
    updateItemSpec() {
      const formData = {
        "id": this.form.id,
        "specName": this.form.name,
        "status": this.form.delivery,
        "remark": this.form.remarks
      };
      const spaceList = this.inpList.map((item, index) => {
        if (item.space !== "") {
          return item.space;
        }
        this.$message.warning("请输入规格项");
      });
      const spaceString = spaceList.toString().replace(/,/g, "|");
      formData.specFiled = spaceString;
      if (formData.specFiled && ~formData.specFiled.indexOf(".")) {
        this.$message.warning("规格项请不要输入小数点");
        return;
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit("update:btnLoading", true);
          updateItemSpecTemplate(formData).then((res) => {
            this.$message.success("保存成功");
            const postData = {
              "pageNum": 1,
              "pageSize": 10
            };
            this.$emit("listItemSpecTemplatePage", postData);
            this.$emit("close");
            setTimeout(() => {
              this.$emit("update:btnLoading", false);
            }, 100);
          }).catch(() => {
            setTimeout(() => {
              this.$emit("update:btnLoading", false);
            }, 100);
          });
        }
      });
    },
    /**
     * 删除规格项
     */
    delSpace(index) {
      this.inpList.splice(index, 1);
    }
  }
};
