
import { getArticleRule } from "@/api/business/repository/info";
export default {
  "name": "AppPageAddRule",
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
      "rule": {
        "radio": 0,
        "imgNum": "",
        "wordNum": "",
        "date": []
      }
    };
  },
  "watch": {
    dialogVisible(val) {
      if (!val) {
        setTimeout(() => {
          this.resetTableData();
        }, 200);
      } else {
        this.getRule();
      }
    }
  },
  "computed": {},
  mounted() {
  },
  "methods": {
    /**
     * 重置按钮
     */
    resetTableData() {
      this.rule.radio = 0;
      this.rule.imgNum = "";
      this.rule.wordNum = "";
      this.rule.date = [];
    },
    getRule() {
      getArticleRule().then(res => {
        if (res.code === 200) {
          this.rule.radio = res.data.format;
          this.rule.imgNum = res.data.imgMaxCount;
          this.rule.wordNum = res.data.contentMaxCount;
          if (res.data.ruleStartTime) {
            this.rule.date = [ res.data.ruleStartTime, res.data.ruleEndTime ];
          }
        }
      });
    },
    /**
     * 确认生效
     */
    save() {
      if (this.rule.radio !== 0) {
        if (this.rule.date && this.rule.date.length > 0) {
          if (this.rule.imgNum > 9) {
            return this.$message.warning("图片数量请不要大于9");
          }
          this.$emit("selectRule", this.rule);
        } else {
          this.$message.warning("请选择发帖时间限制");
        }
      } else {
        this.$emit("selectRule", this.rule);
      }

      // this.close();
    },
    /**
     * 取消
     */
    close() {
      this.$emit("update:dialogVisible", false);
    }
  }
};