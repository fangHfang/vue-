<template>
  <div class="page-content">
    <h3 class="page-name">手动出库</h3>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <div class="del-form">
        <div class="item-box">
          <h4 class="item-title">出库经销商</h4>
          <div class="item-row">
            <el-form-item label="出库经销商" prop="distributor">
              <el-select filterable v-model="form.distributor.value" placeholder="请选择出库经销商">
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
        <el-button type="primary" @click="btnLoading = true;$throttle(saveDealer)" :loading='btnLoading'>{{ $text.save }}</el-button>
        <el-button @click="back">{{ $text.cancel }}</el-button>
      </div>
    </el-form>
    <dialogAddProduct :dialogVisible.sync="dialogVisible"></dialogAddProduct>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>