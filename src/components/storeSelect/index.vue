<template>
  <el-select
    v-model="value"
    filterable
    remote
    clearable
    class="select-arrow"
    reserve-keyword
    placeholder="请输入门店名称"
    :remote-method="remoteMethod"
    :loading="loading"
    @change="change"
    @focus="remoteMethod('')">
    <el-option
      v-for="item in options"
      :key="item.customerNo"
      :label="item.name"
      :value="item.customerNo">
    </el-option>
  </el-select>
</template>

<script>
import { getStoreSelectList } from "@/api/downstream/store/info";
export default {
  "name": "storeSelect",
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
      getStoreSelectList(payload).then((res) => {
        this.options = res.data;
        this.loading = false;
      }).catch((err) => {
        this.loading = false;
        this.options = [];
        console.log(err);
      });
    },

    cleanStore() {
      this.value = "";
    },
    /**
     * 切换时调用父页面方法
     */
    change(val) {
      this.$emit("change", val);
      const item = this.options.find(item => item.customerNo === val);
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