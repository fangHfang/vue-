
import { searchList, helpCreate, modify } from "@/api/system/other/help";

export default {
  "name": "SystemOtherHelpAdd",
  "components": {
  },
  data() {
    return {
      "config": {
        "initialFrameWidth": null,
        "initialFrameHeight": 300
      },
      "form": {
        "name": "",
        "content": "",
        "time": "",
        "people": "",
        "activeType": {
          "value": "",
          "options": [
            { "label": "一级", "value": "1" },
            { "label": "二级", "value": "2" },
            { "label": "三级", "value": "3" }
          ]
        },
        "helpNo": this.$route.query.helpNo
      }
    };
  },
  "computed": {},
  mounted() {
    if (this.form.helpNo !== undefined) {
      this.searchList(this.form.helpNo);
    }
  },
  beforeDestroy() {
    if (!this._checkInfo()) {
      return;
    }
    // 存在输入内容，禁止直接返回
    window.onbeforeunload = () => {
      return "您确定要退出该页面吗？";
    };
  },
  destroyed() {
    // 清空返回阻止
    window.onbeforeunload = null;
  },
  "methods": {
    /**
       * 返回
       * @param val
       */
    back() {
      this.$router.back(-1);
    },
    /**
       * 验证是否存在填写内容
       */
    _checkInfo() {
      const content = this.$refs.tinyEditor && this.$refs.tinyEditor.getEditorContent();
      return content;
    },
    /**
       * 监听编辑器内容变化
       */
    onChangeContent() {
      this._addUnloadEvent();
    },

    /**
       * 添加卸载事件
       */
    _addUnloadEvent() {
      if (this._checkInfo()) {
        // 存在输入内容，禁止直接返回
        window.onbeforeunload = () => {
          return "您确定要退出该页面吗？";
        };
      } else {
        // 不存在内容，去除返回阻止
        window.onbeforeunload = null;
      }
    },

    /**
     * 查询详情
     */
    searchList(no) {
      searchList(no).then((res) => {
        if (res.code === 200) {
          this.form.name = res.data.title;
          this.form.content = res.data.content;
        }
      }).catch((error) => {
        console.info(error);
      });
    },

    returnList() {
      this.$router.push({ "path": "/system/other/help/list" });
    },

    /**
     * 新增帮助
     */
    helpCreate(status) {
      const content = this.$refs.tinyEditor && this.$refs.tinyEditor.getEditorContent();
      const postData = {
        "content": content,
        "status": status,
        "title": this.form.name
      };
      if (this.form.helpNo === undefined) {
        helpCreate(postData).then((res) => {
          if (res.code === 200) {
            this.$message.success("保存成功!");
            this.returnList();
          }
        }).catch((error) => {
          console.info(error);
        });
      } else {
        postData.helpNo = this.form.helpNo;
        modify(postData).then((res) => {
          if (res.code === 200) {
            this.returnList();
          }
        }).catch((error) => {
          console.info(error);
        });
      }
    }

  }
};
