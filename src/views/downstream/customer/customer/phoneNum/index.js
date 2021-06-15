import { modUserPhone } from "@/api/downstream/customer/customer";

export default {
  "name": "AppPagePhoneNum",
  "components": {
  },
  "props": {
    "dialogVisible": {
      "type": Boolean,
      "default": false
    },
    "phone": {
      "type": String,
      "default": ""
    },
    "userNo": {
      "type": String,
      "default": ""
    }
  },
  data() {
    return {
      "modifyPhone": {
        "oldNum": "",
        "newNum": ""
      }
    };
  },
  "computed": {},
  mounted() {
  },
  "watch": {
    dialogVisible(val) {
      if (val) {
        this.modifyPhone.oldNum = this.phone;
      }
    }
  },
  "methods": {

    save() {
      const res = /^(0|86|17951)?(13[0-9]|15[012356789]|16[6]|19[89]]|17[01345678]|18[0-9]|14[579])[0-9]{8}$/;
      if (!res.test(this.modifyPhone.newNum) || this.modifyPhone.newNum === "") {
        return this.$message.error("手机号有误！");
      }
      const params = {
        "userNo": this.userNo,
        "phone": this.modifyPhone.newNum
      };
      modUserPhone(params).then(res => {
        if (res.code === 200) {
          this.$emit("listDealerByPage", this.modifyPhone);
          this.close();
        } else {
          this.$message.error(res.msg);
        }
      }).catch((error) => {
        console.info(error);
      });
    },
    close() {
      this.$emit("update:dialogVisible", false);
    }
  }
};