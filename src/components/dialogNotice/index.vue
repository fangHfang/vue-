<template>
  <el-dialog
      title="通知门店"
      :visible.sync="dialogVisible"
      width="600px"
      destroy-on-close
      :before-close="handleClose">
        <div class="activity-btn-box">
      <div class="title">已选门店</div>
    </div>
    <div class="table-main" v-show="tableDetailShow">
      <div class="stores">
        <el-table
          :data="tableData"
          max-height="330"
          header-cell-class-name="table-header-item"
        >
          <el-table-column
            prop="index"
            label="序号"
            width="50"
          >
          </el-table-column>
          <el-table-column
              prop="storeNo"
              width="150"
              label="内部门店号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="storeRefNo"
              width="150"
              label="门店编号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="storeName"
            label="门店名称"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="amount"
              label="当前可清积分"
              width="120"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="accountTime"
              label="积分到期时间"
              width="160"
              show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="activity-btn-box">
      <div class="title">通知内容</div>
    </div>
    <div class="activity-btn-box">
      <el-input type="textarea" resize="none" rows="5" placeholder="门店积分将于××××到期" v-model="form.content" :disabled="!editable"></el-input>
    </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{ $text.cancel }}</el-button>
        <el-button type="primary" @click="sendNotice" v-if="editable">{{ $text.paginationGo }}</el-button>
      </span>
    </el-dialog>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>