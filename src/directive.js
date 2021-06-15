/**
 * 自定义指令
 */
export default {
  // 限制input只能输入正整数
  "enterNumber": {
    "inserted": function(el) {
      el.addEventListener("keypress", function(e) {
        e = e || window.event;
        const charcode = typeof e.charCode === "number" ? e.charCode : e.keyCode;
        const re = /\d/;
        if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
          if (e.preventDefault) {
            e.preventDefault();
          } else {
            e.returnValue = false;
          }
        }
      });
    }
  },

  // 限制input只能输入正数(包含小数)
  "enterNumber2": {
    "inserted": function(el) {
      el.addEventListener("keypress", function(e) {
        e = e || window.event;
        const charcode = typeof e.charCode === "number" ? e.charCode : e.keyCode;
        const re = /\d/;
        if (charcode === 46) {
          if (el.__vue__.$refs.input.value.includes(".")) {
            e.preventDefault();
          }
        } else if (!re.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
          if (e.preventDefault) {
            e.preventDefault();
          } else {
            e.returnValue = false;
          }
        }
      });
    }
  }
};
