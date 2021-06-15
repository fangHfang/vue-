<template>
  <div class="page">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="商品入库" name="stockIn">
        <businessRebateRuleListMain :typeFlag="1"/>
      </el-tab-pane>
      <el-tab-pane label="商品出库" name="stockOut">
        <businessRebateRuleListMain :typeFlag="2"/>
      </el-tab-pane>
      <el-tab-pane label="商品下单" name="order">
        <businessRebateRuleListMain :typeFlag="0"/>
      </el-tab-pane>
    </el-tabs>
    <el-button type="primary" @click="popupRule" class="rule-button">设置返利使用规则</el-button>
    <el-dialog
      title="返利使用限制"
      :visible.sync="rulePopup"
      width="600px"
      :before-close="handleClose"
      class="dialog"
      >
      <div style="display:flex;justify-content: center">
        <div class="dia-content">
          <div>APP商城商品下单,单次可使用返利上限</div>
          <el-input v-loading="isLoading" v-model="input" placeholder="请输入返利上限数额"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button v-loading="isLoading" type="primary" @click="btnLoading = true;$throttle(save)" :loading='btnLoading'>保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>