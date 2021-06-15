import { login, getLoginInfo } from "@/api/login/login";
import store from "@/store";
export default {
  "name": "login",
  data() {
    return {
      "loginRules": {
        "username": [ { "required": true, "message": "请输入用户名", "trigger": "blur" } ],
        "password": [ { "required": true, "message": "请输入密码", "trigger": "blur" } ]
      },
      "loginForm": {
        "username": "front",
        "password": "123456",
        "loginType": "pwd"
      },
      "passwordType": "password",
      "loading": false,
      "showDialog": false,
      "redirect": undefined
    };
  },
  "watch": {
    "$route": {
      "handler": function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      "immediate": true
    }
  },
  "methods": {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          const postData = {
            "accountNumber": this.loginForm.username,
            "pwd": this.loginForm.password,
            "loginType": this.loginForm.loginType
          };
          const payload = this.$jsonFormat(postData);
          login(payload).then((res) => {
            const { "access_token": accessToken } = res.data;
            // 更新token
            store.commit("set", { "token": accessToken });
            localStorage.setItem("mjsToken", "bearer " + accessToken);
            getLoginInfo().then((res) => {
              console.log(res);
              const { name } = res.data;
              store.commit("login/loginSet", { "name": name });
              // 根据当前角色权限重新生成菜单路由
              store.dispatch("login/getMenuList").then((r) => {
                console.log(r);
                console.log(r);
                this.loading = false;
                // this.$router.push({ "path": this.redirect || "/" });
                // 退出后重新登录系统，要求回到系统首页 20210413 - 57574
                this.$router.push({ "path": "/" });
              });
            });
          })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error");
        }
      });
    }
  }
};