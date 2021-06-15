<template>
  <el-dialog
    class="dialog-choose-box"
    title="安心跑获利规则"
    :visible.sync="dialogVisible"
    :before-close="close"
    width="400px">
    <div>
      <div class="dialog-toolbar">
        <div class="toolbar-box dialog-set-list-toolbar">
          <div>
            <div class="label">返利规则</div>
            <div class="content">
              <el-select
                  clearable
                  v-model="ruleRange.rbRule.value"
                  placeholder="请选择返利规则"
              >
                <el-option
                    v-for="item in ruleRange.rbRule.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="label">积分规则</div>
            <div class="content">
              <el-select
                  clearable
                  v-model="ruleRange.itRule.value"
                  placeholder="请选择积分规则"
              >
                <el-option
                    v-for="item in ruleRange.itRule.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="label">兑换点规则</div>
            <div class="content">
              <el-select
                  clearable
                  v-model="ruleRange.epRule.value"
                  placeholder="请选择兑换点规则"
              >
                <el-option
                    v-for="item in ruleRange.epRule.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer flex-center">
      <el-button type="primary" @click="save">{{ $text.paginationGo }}</el-button>
      <el-button @click="close">{{ $text.cancel }}</el-button>
    </div>
  </el-dialog>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
<style>
  .el-message-box__title > span {
    font-size: 16px;
    font-weight: 600;
  }

  .el-dialog__body .table-main {
    padding: 0 20px;
  }

  .dialog-choose-box .el-dialog__body {
    padding: 20px 0;
  }

</style>