export default {
  "name": "upload",
  "props": {
    "fileList": {
      "type": Array,
      "default": () => []
    },
    "size": {
      "type": Object,
      "default": () => {
        return { "width": 100, "height": 100 };
      }
    },
    "limit": {
      "type": Number,
      "default": 99
    },
    "disabled": {
      "type": Boolean,
      "default": false
    }
  },
  data() {
    return {};
  },
  "computed": {
    previewImgList() {
      const { fileList } = this;
      return Array.from(fileList, item => item.url);
    },
    token() {
      return { "Authorization": "bearer " + this.$store.state.token };
    }
  },
  mounted() {

  },
  "methods": {
    /** 超出文件上传数量 */
    onExceed() {
      this.$message.warning("抱歉，已超出最大上传数量");
    },
    /**
     * 上传图片前验证
     * @param file
     */
    uploadImageChange(file) {
      const typeOk = file.raw && (file.raw.type === "image/jpeg" || file.raw.type === "image/png");
      if (!typeOk) {
        this.$message.warning("请上传jpg或png格式的图片");
        return;
      }
      const obj = {
        "name": file.name,
        "url": URL.createObjectURL(file.raw),
        "id": file.uid,
        "file": file.raw
      };
      this.fileList.push(obj);
      this.$emit("update:fileList", this.fileList);
    },
    /**
     * 删除上传图片
     */
    handleRemoveImage(index) {
      this.$confirm("确定删除吗", "提示", {
        "confirmButtonText": "确定",
        "cancelButtonText": "取消",
        "title": null,
        "showClose": false,
        "type": "warning"
      }).then(() => {
        this.fileList.splice(index, 1);
        this.$emit("update:fileList", this.fileList);
      }).catch(() => {
      });
    },

    /**
     * 上传成功后回调
     * @param res
     * @param file
     */
    handleAvatarSuccess(res, file) {
      const obj = {
        "name": file.name,
        "url": res.data.objectUrl,
        "id": file.uid,
        "file": file.raw
      };
      this.fileList.push(obj);
      this.$emit("update:fileList", this.fileList);
    }
  }
};