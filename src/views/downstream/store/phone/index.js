// src/views/downstream/store/location/list/index
import { sendPhoneCode } from "@/api/downstream/store/phone";
export default {
  "name": "StoreLocationList",
  "components": {
  },
  data() {
    return {
      "phone": "",
      "code": "",
      "isLoading": false
    };
  },
  "computed": {
    permission() {
      return this.$store.state.container.permission;
    }
  },
  mounted() {
  },
  "methods": {
    /**
     * 发送验证码
     */
    send() {
      const errMsg = false;
      if (this.phone.length === 11) {
        if (!RegExp(/^[1][3,4,5,6,7,8,9][0-9]{9}$/).test(this.phone)) {
          this.errMsg = true;
        }
      }
      if (errMsg) {
        this.$message.error("请检查手机号码格式是否正确");
        return;
      }
      if (this.isLoading) {
        return;
      }
      this.isLoading = true;
      const params = {
        "phone": this.phone
      };
      sendPhoneCode(params).then(res => {
        this.code = res.data.code;
        this.$message.success("发送成功");
        this.isLoading = false;
      }).catch((error) => {
        this.isLoading = false;
        this.$message.error(error);
      });
    }
  }
};