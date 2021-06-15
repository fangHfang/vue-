<template>
  <el-dialog
    class="dialog-choose-box"
    title="限购数量调整"
    :visible.sync="dialogVisible"
    :before-close="close"
    width="400px">
    <div>
      <div class="dialog-toolbar">
        <div class="toolbar-box dialog-set-list-toolbar">
          <div v-if="productData.relationType===2">
            <div class="label">门店性质</div>
            <div class="content">
              <span>{{productData.relationField}}</span>
            </div>
          </div>
          <div v-if="productData.relationType===1">
            <div class="label">门店名称</div>
            <div class="content">
              <span>{{productData.storeName}}</span>
            </div>
          </div>
          <div v-if="productData.relationType===1">
            <div class="label">内部门店号</div>
            <div class="content">
              <span>{{productData.relationField}}</span>
            </div>
          </div>
          <div>
            <div class="label">产品代号</div>
            <div class="content">
              <span>{{productData.productNo}}</span>
            </div>
          </div>
          <div>
            <div class="label">产品规格</div>
            <div class="content">
              <span>{{productData.specDetail}}</span>
            </div>
          </div>
          <div>
            <div class="label">产品品牌</div>
            <div class="content">
              <span>{{productData.brandName}}</span>
            </div>
          </div>
            <div>
                <div class="label">产品尺寸</div>
                <div class="content">
                  <span>{{productData.size}}</span>
                </div>
            </div>
            <div>
                <div class="label">产品花纹</div>
                <div class="content">
                  <span>{{productData.tread}}</span>
                </div>
            </div>
            <div>
                <div class="label">限购数量</div>
                <div class="content">
                    <el-input v-model="productData.limitCount" placeholder="请输入限购数量"></el-input>
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