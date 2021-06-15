<template>
  <el-dialog
    class="dialog-choose-box"
    title="手机号修改"
    :visible.sync="dialogVisible"
    :before-close="close"
    width="512px">
    <div>
      <div class="dialog-toolbar">
        <div class="toolbar-box dialog-set-list-toolbar">
            <div>
                <div class="label">原手机号</div>
                <div class="content">
                    <span>{{modifyPhone.oldNum}}</span>
                </div>
            </div>
            <div>
                <div class="label">新手机号</div>
                <div class="content">
                    <el-input type="number" v-model="modifyPhone.newNum"/>
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