import { queryLabelByNo, createLabel, updateLabel } from "@/api/system/other/tag";
export default {
  "name": "SystemOtherTagAdd",
  "components": {
  },
  data() {
    return {
      "form": {
        "labelName": "",
        "content": "",
        "created": "",
        "createBy": "",
        "activeType": {
          "value": "",
          "options": [
            { "label": "经销商", "value": 0 },
            { "label": "门店", "value": 1 },
            { "label": "商品", "value": 2 },
            { "label": "客户", "value": 3 },
            { "label": "地区", "value": 4 }
          ]
        }
      },
      "rules": {
        "labelName": [
          { "required": true, "message": "请输入标签名称", "trigger": "blur" }
        ],
        "activeType": [
          { "required": true, "message": "请选择标签类型", "trigger": "blur" }
        ]
      },
      "labelNo": this.$route.params.id
    };
  },
  mounted() {
    /**
     * 标签不为空-查询标签详细信息
     */
    if (this.labelNo) {
      this.getLabelData();
    }
  },
  "methods": {
    /**
     * 查询标签详细信息
     */
    getLabelData() {
      const params = {
        "labelNo": this.labelNo
      };
      queryLabelByNo(params).then(res => {
        console.log(res.data);
        if (res.code === 200) {
          // 标签类型
          this.form.activeType.value = res.data.labelType;
          // 标签名称
          this.form.labelName = res.data.labelName;
          // 创建时间
          this.form.created = res.data.created;
          // 创建人
          this.form.createBy = res.data.createBy;
          // 备注
          this.form.content = res.data.description;
        } else {
          this.$message.error("查询失败");
        }
      }).catch(() => {});
    },

    /**
     * 保存标签
     */
    saveLabelData() {
      if (!this.form.labelName) {
        this.$message({
          "type": "info",
          "message": "标签名称不能为空"
        });
        return;
      }
      if (this.labelNo) {
        this.updateLabelData();
      } else {
        this.addLabelData();
      }
    },

    /**
     * 新增标签
     */
    addLabelData() {
      if (!this.form.labelName) {
        this.$message({
          "type": "info",
          "message": "标签名称不能为空"
        });
        return;
      }
      const data = {
        "labelName": this.form.labelName,
        "labelType": this.form.activeType.value,
        "createBy": this.form.created,
        "description": this.form.content,
        "labelNo": this.labelNo,
        "updateBy": this.form.createBy
      };
      createLabel(data).then(res => {
        if (res.code === 200) {
          this.$message.success("保存成功");
          this.back();
        } else {
          this.$message.error("保存失败");
        }
      });
    },

    /**
     * 修改标签
     */
    updateLabelData() {
      if (!this.form.labelName) {
        this.$message({
          "type": "info",
          "message": "标签名称不能为空"
        });
        return;
      }
      const data = {
        "labelName": this.form.labelName,
        "labelType": this.form.activeType.value,
        "createBy": this.form.created,
        "description": this.form.content,
        "labelNo": this.labelNo,
        "updateBy": this.form.createBy
      };
      updateLabel(data).then(res => {
        if (res.code === 200) {
          this.$message.success("保存成功");
          this.back();
        } else {
          this.$message.error("保存失败");
        }
      });
    },

    /**
     * 返回
    */
    back() {
      this.$store.dispatch("tabbar/delView", this.$route).then(() => {
        this.$router.back();
      }).catch(() => {});
    },
    /**
     * 重置表单
     */
    resetForm() {
      // 标签类型
      this.form.activeType.value = "";
      // 标签名称
      this.form.labelName = "";
      // 创建时间
      this.form.created = "";
      // 创建人
      this.form.createBy = "";
      // 备注
      this.form.content = "";
    }
  }

};