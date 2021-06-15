<template>
  <el-dialog
    class="dialog-choose-box"
    title="新增定位审批设置"
    :visible.sync="dialogVisible"
    :before-close="close"
    width="512px">
    <div>
      <div class="dialog-toolbar">
        <div class="toolbar-box dialog-set-list-toolbar">
          <div>
              <div class="content">
                  <el-radio v-model="mapLocation.redio" label="1">新增定位必须审批</el-radio>
              </div>
          </div>
          <div>
              <div class="content">
                  <el-radio v-model="mapLocation.redio" label="0">
                      新增定位在
                      <el-input type="text" style="width:100px;margin: 0 10px;height:32px" @input="changeInput" v-model="mapLocation.range"/>
                      米 范围内没有注册门店自动通过审批
                  </el-radio>
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