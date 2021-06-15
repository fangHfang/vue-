<template>
  <div class="del-form">
    <el-form :model="form" :rules="rules" ref="form" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input clearable v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="one">
        <label slot="label"><span>规格项</span><div style="font-size: 12px;color: #B0B0B0;">(最多五项)</div></label>
        <div class="flex" v-for="(item,index) in inpList">
          <el-input placeholder="请输入" v-model="item.space"></el-input>
          <i v-if="index !== 0" class="el-icon-remove-outline" @click="delSpace(index)"></i>
        </div>
        <div class="form-span"><span @click="addClick">+新增</span></div>
      </el-form-item>
      <el-form-item label="是否生效" prop="delivery">
        <el-switch class="switch" :active-value="1" :inactive-value="0" active-text="是" inactive-text="否" v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input clearable type="textarea" placeholder="请输入" resize="none" :rows="3" v-model="form.remarks"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
<style>
  .el-input-group__append{
    background: none !important;
    border: none !important;
  }

  /* switch按钮样式 */
  .switch .el-switch__label {
    position: absolute;
    display: none;
    color: #fff !important;
  }
  /*打开时文字位置设置*/
  .switch .el-switch__label--right {
    z-index: 1;
  }
  /* 调整打开时文字的显示位子 */
  .switch .el-switch__label--right span{
    margin-left: 6px;
  }
  /*关闭时文字位置设置*/
  .switch .el-switch__label--left {
    z-index: 1;
  }
  /* 调整关闭时文字的显示位子 */
  .switch .el-switch__label--left span{
    margin-left: 20px;
  }
  /*显示文字*/
  .switch .el-switch__label.is-active {
    display: block;
  }
  /* 调整按钮的宽度 */
  .switch.el-switch .el-switch__core,
  .el-switch .el-switch__label {
    margin: 0;
  }
</style>
