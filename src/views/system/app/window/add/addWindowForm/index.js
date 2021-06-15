import { pictureDisplaySaveBasic } from "@/api/system/app/window";
export default {
  "name": "addWindowForm",
  "components": {},
  "props": {
    // 数据
    "dialogaddWindowVisible": {
      "type": Boolean,
      "default": () => false
    },
    // 数据
    "list": {
      "type": Array,
      "default": () => []
    }
  },
  data() {
    return {
      // 橱窗按钮
      "winCheckButton": {
        "list": [ { "key": "1图橱窗", "value": 1 }, { "key": "3图橱窗", "value": 3 }, { "key": "4图橱窗", "value": 4 }, { "key": "6图橱窗", "value": 6 } ]
      },
      // 表单
      "form":
      {
        "title": "",
        "winStyle": 1
      },
      // 规则验证
      "rules": {
        "title": [
          { "required": true, "message": "请输入前端橱窗名称", "trigger": "blur" }
        ]
      }
    };
  },
  "methods": {
  /**
   * 选则橱窗样式
   * @param done
   */
    checkedWinCheckStyle(index) {
      this.form.winStyle = index;
    },
    /**
   * 关闭弹窗
   * @param done
   */
    close() {
      this.$emit("update:dialogaddWindowVisible", false);
    },
    /**
     * 立即创建
     * */
    addForm(formName) {
      const that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const postData = {
            "pictureNo": that.$route.query.pictureNo,
            "displayType": that.form.winStyle,
            "showMoreItem": 0,
            "displaySort": that.list.length > 0 ? that.list[that.list.length - 1].displaySort - 1 : 10000,
            "displayName": that.form.title
          };
          pictureDisplaySaveBasic(postData).then(res => {
            if (res.code === 200) {
              this.$emit("addOne");
            } else {
              this.$message.error(res.msg);
            }
          }).catch((error) => {
            console.info(error);
          });
          this.clearData();
          this.close();
        } else {
          return false;
        }
      });
    },
    /**
     * 清理数据
     * @param {} done
     */
    clearData() {
      this.form = {
        "title": "",
        "winStyle": 1
      };
    }
  }
};