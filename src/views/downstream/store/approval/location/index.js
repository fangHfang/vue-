import { approval } from "@/api/downstream/store/location";

export default {
  "name": "AppPageAddLocation",
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
      "mapLocation": {
        "range": "",
        "redio": "1"
      }
    };
  },
  "computed": {},
  mounted() {
  },
  "methods": {
    save() {
      const postData = {
        "auto": this.mapLocation.redio === "0" ? 0 : 1
      };
      if (this.mapLocation.redio === "0") {
        postData.distance = this.mapLocation.range;
      }
      approval(postData).then(res => {
        if (res.code === 200) {
          this.$emit("selectLocation", this.mapLocation);
          this.close();
        } else {
          this.$message.error(res.msg);
        }
        this.tableLoading = false;
      }).catch((error) => {
        console.info(error);
        this.tableLoading = false;
      });
    },
    close() {
      this.$emit("update:dialogVisible", false);
    },

    /**
     * 判断是否为正整数
     */
    changeInput() {
      const pattern = /^[1-9][0-9]*$/;
      if (!pattern.test(this.mapLocation.range)) {
        this.mapLocation.range = "";
      }
    }
  }
};