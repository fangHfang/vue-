<template>
  <el-select
    v-model="value"
    filterable
    remote
    clearable
    class="select-arrow"
    reserve-keyword
    :placeholder="placeholder"
    :remote-method="remoteMethod"
    :loading="loading"
    @change="change"
    @focus="remoteMethod('')">
    <el-option
      v-for="item in options"
      :key="item.dealerNo"
      :label="item.name"
      :value="item.dealerNo">
    </el-option>
  </el-select>
</template>

<script>
import { getDealerSelectList } from "@/api/downstream/dealer/info";
export default {
  "name": "dealerSelect",
  "props": {
    "placeholder": {
      "type": String,
      "default": "请输入经销商名称"
    }
  },
  data() {
    return {
      "options": [],
      "value": "",
      "loading": false
    };
  },
  mounted() {
  },
  "methods": {
    remoteMethod(key) {
      this.loading = true;
      const postData = {
        "name": key
      };
      const payload = this.$jsonFormat(postData);
      getDealerSelectList(payload).then((res) => {
        this.options = res.data;
        this.loading = false;
      }).catch((err) => {
        this.loading = false;
        this.options = [];
        console.log(err);
      });
    },

    cleanDealer() {
      this.value = "";
    },
    /**
     * 切换时调用父页面方法
     */
    change(val) {
      this.$emit("change", val);
      const item = this.options.find(item => item.dealerNo === val);
      // console.log("item", item);
      this.$emit("item-change", item);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .select-arrow{
    /deep/.el-select__caret.el-icon-::before{
      content: "\e6e1";
    }
  }
</style>