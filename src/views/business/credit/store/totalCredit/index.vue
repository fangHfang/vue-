<template>
  <el-dialog
    class="dialog-choose-box"
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    :before-close="close"
    width="412px">
    <div>
      <div class="dialog-toolbar" v-loading="tableLoading" >
        <div class="toolbar-box dialog-set-list-toolbar">
          <div>
            <div class="label">门店名称</div>
            <div class="content">
                <el-input clearable type="text" v-model="distributor.name" disabled/>
            </div>
          </div>
          <div>
            <div class="label">门店编号</div>
            <div class="content">
                <el-input type="text" v-model="distributor.customerNo" disabled/>
            </div>
          </div>
          <div>
            <div class="label">总授信额度</div>
            <div class="content">
              <el-input type="text" v-model="distributor.lineCredit" disabled/>
            </div>
          </div>
            <div v-if="!this.isAdjustment">
                <div class="label"></div>
                <div class="content">
                    <el-input type="text" v-model="distributor.changeNum" placeholder="请输入变更数量" />
                </div>
            </div>
            <div v-if="!isAdjustment">
                <div class="label"></div>
                <div class="content">
                    <div class="flex" style="width: 90%;height: 100%;color: #ED6D00;justify-content: flex-start">所属经销商总额度上限剩余  {{distributor.dealerLineCredit}}</div>
                </div>
            </div>
            <div>
                <div class="label">当前可用额度</div>
                <div class="content">
                    <el-input type="text" v-model="distributor.currentAmount" disabled/>
                </div>
            </div>
            <div v-if="this.isAdjustment">
                <div class="label"></div>
                <div class="content">
                    <el-input type="text" v-model="distributor.changeNum" placeholder="请输入变更数量" />
                </div>
            </div>
            <div>
                <div class="label">已用额度</div>
                <div class="content">
                    <el-input type="text" v-model="distributor.debtAmount" disabled/>
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
      <el-button type="primary" @click="save" :loading="btnLoading" >{{ $text.paginationGo }}</el-button>
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