<template>
  <el-dialog
    class="dialog-choose-box"
    title="变更总授信"
    :visible.sync="dialogVisible"
    :before-close="close"
    width="412px">
    <div>
      <div class="dialog-toolbar">
        <div class="toolbar-box dialog-set-list-toolbar">
          <div>
            <div class="label">经销商名称</div>
            <div class="content">
                <el-input type="text" v-model="distributor.name" disabled/>
            </div>
          </div>
          <div>
            <div class="label">经销商编号</div>
            <div class="content">
                <el-input type="text" v-model="distributor.customerNo" disabled/>
            </div>
          </div>
          <div>
            <div class="label">总授信上限</div>
            <div class="content">
              <el-input type="text" v-model="distributor.lineCredit" disabled/>
            </div>
          </div>

            <div>
                <div class="label"></div>
                <div class="content">
                    <el-input type="text" v-model="distributor.changeNum" placeholder="请输入变更数量" />
                </div>
            </div>
          <div>
            <div class="label">下游已分配授信</div>
            <div class="content">
                <el-input type="text" v-model="distributor.allocatedLineCredit" disabled/>
            </div>
          </div>
            <div>
                <div class="label">下游可分配授信</div>
                <div class="content">
                    <el-input type="text" v-model="distributor.distributableLineCredit" disabled/>
                </div>
            </div>
            <div>
                <div class="label">已用额度</div>
                <div class="content">
                    <el-input type="text" v-model="distributor.creditAmount" disabled/>
                </div>
            </div>
            <div>
                <div class="label">备注</div>
                <div class="content" style="height: 54px">
                    <el-input type="textarea" v-model="distributor.remarks"/>
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