<template>
  <div>
    <textarea :id= "id"></textarea>
  </div>
</template>
<script>
import { toUpload } from "@/api/system/app/window.js";
import { tinyConfig } from "./config";
export default {
  "name": "TinyEditor",
  "props": {
    "value": {
      "default": "",
      "type": String
    },
    "config": {
      "type": Object,
      "default": () => {}
    },
    "uploadUrl": {
      "default": "",
      "type": String
    },
    "accept": {
      "default": "image/jpeg, image/png",
      "type": String
    },
    "maxSize": {
      "default": 2097152,
      "type": Number
    },
    "withCredentials": {
      "default": false,
      "type": Boolean
    }
  },
  data() {
    const Id = "editor" + Date.now();
    return {
      "id": Id,
      "defaultConfig": tinyConfig
    };
  },
  "computed": {
    token() {
      return { "Authorization": "bearer " + this.$store.state.token };
    }
  },
  "watch": {
    value(val) {
      const con = val || "";
      window.tinymce.activeEditor && window.tinymce.activeEditor.setContent(con);
    }
  },
  mounted() {
    this.editorInit();
  },
  beforeDestroy() {
    // 销毁tinymce
    this.$emit("on-destroy");
    window.tinymce.remove(`#${this.id}`);
  },
  deactivated() {
    setTimeout(() => {
      // 销毁tinymce
      this.$emit("on-destroy");
      window.tinymce.remove(`#${this.id}`);
    }, 200);
  },
  "methods": {
    /**
     * 编辑器初始化
     */
    editorInit() {
      window.tinymce.init({
        // 默认配置
        ...this.defaultConfig,
        // prop内传入的的config
        ...this.config,
        "images_upload_handler": async (blobInfo, succFun, failFun) => {
          const postData = {
            "file": blobInfo.blob(),
            "target": "item"
          };
          try {
            const res = await toUpload(postData);
            if (res.code === 200) {
              const url = res.data.objectUrl;
              succFun(url);
            }
          } catch (err) {
            failFun(err || "文件格式不正确，上传失败！");
          }
        },
        // 挂载的DOM对象
        "selector": `#${this.id}`
      });
    },
    getEditorContent() {
      return window.tinymce.activeEditor.getContent();
    }
  }
};
</script>
<style lang="scss">

</style>