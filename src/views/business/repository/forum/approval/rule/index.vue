<template>
  <el-dialog
    class="dialog-choose-box"
    title="设置发帖规则"
    :visible.sync="dialogVisible"
    :before-close="close"
    width="512px">
    <div>
      <div class="dialog-toolbar">
        <div class="toolbar-box dialog-set-list-toolbar">
          <div>
              <div class="label">发帖格式限制</div>
              <div class="content" style="height: 100%">
                  <el-radio v-model="rule.radio" :label="0">无限制</el-radio>
                  <el-radio v-model="rule.radio" :label="1">
                      只允许发图<div style="visibility: hidden">字</div>&nbsp;&nbsp;
                      <el-input type="number" v-model="rule.imgNum" placeholder="图片数量限制" oninput="value=value.replace(/[^0-9]/g,'')"></el-input>
                  </el-radio>
                  <el-radio v-model="rule.radio" :label="2">
                      只允许发文字&nbsp;&nbsp;
                      <el-input type="number" v-model="rule.wordNum" placeholder="文字字数限制" oninput="value=value.replace(/[^0-9]/g,'')"></el-input>
                  </el-radio>
              </div>
          </div>
          <div>
              <div class="label">发帖时间限制</div>
              <div class="content">
                  <el-date-picker
                    v-model="rule.date"
                    range-separator="-"
                    type="datetimerange"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
              </div>
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer flex-center">
      <el-button type="primary" @click="save">确认生效</el-button>
      <el-button type="primary" plain @click="resetTableData">{{ $text.reset }}</el-button>
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