<template>
  <div class="page-content">
    <h3 class="page-name">手动入库</h3>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <div class="del-form">
        <div class="item-box">
          <h4 class="item-title">入库经销商</h4>
          <div class="item-row">
            <el-form-item label="入库经销商" prop="distributor">
              <el-select filterable v-model="form.distributor.value" placeholder="请选择入库经销商">
                <el-option
                    v-for="item in form.distributor.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <el-button type="primary" :loading='btnLoading' @click="btnLoading = true;$throttle(saveDealer)">下一步</el-button>
        <el-button @click="back">{{ $text.cancel }}</el-button>
      </div>
    </el-form>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>