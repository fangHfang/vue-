
export default {
  "name": "supplementVehicle",
  "components": {
  },
  "props": {
    "currentRow": {
      "type": Object,
      "default": {}
    }
  },
  data() {
    return {
      "form": {
        "vinCode": "",
        "brand": "",
        "model": "",
        "iconUrl": ""
      },
      "toolBar": {
        "fileList": []
      },
      "dialogImageUrl": "",
      "dialogVisible": false,
      "disabled": false
    };
  },
  "computed": {
    token() {
      return { "Authorization": "bearer " + this.$store.state.token };
    }
  },
  "watch": {
    "currentRow": {
      handler(val) {
        this.form = {
          "vinCode": val.carFrameNumber || "",
          "brand": val.carBrand || "",
          "model": val.carModel || "",
          "iconUrl": val.carFrameImageUrl || ""
        };
        this.dialogImageUrl = val.carFrameImageUrl || "";
        this.toolBar.fileList = (val.carFrameImageUrl && [ { "name": "", "url": val.carFrameImageUrl } ]) || [];
      },
      "immediate": true
    }
  },
  "methods": {
    /**
     * 保存
     */
    saveForm() {
      this.$emit("validateFailed", this.form);
    },
    handleRemove(file) {
      this.toolBar.fileList = [];
      this.form.iconUrl = "";
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    /**
     * 商品图片上传成功钩子
     */
    handleAvatarSuccess(res, file, fileList) {
      this.form.iconUrl = res.data.objectUrl;
      this.toolBar.fileList = fileList;
      console.log(this.toolBar.fileList);
    }
  }
};