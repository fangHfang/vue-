<template>
  <el-dialog
    class="dialog-choose-box"
    title="导入规则"
    :visible.sync="dialogVisible"
    :before-close="close"
    width="392px">
    <div>
      <div class="dialog-toolbar">
        <div class="toolbar-box dialog-set-list-toolbar">
          <div>
            <div class="label">返利规则</div>
            <div class="content">
                <el-select v-model="toolBar.rebate" :placeholder="$text.selectPlaceholder">
                    <el-option
                            v-for="item in rbRuleList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.label">
                    </el-option>
                </el-select>
            </div>
          </div>
          <div>
            <div class="label">积分规则</div>
            <div class="content">
                <el-select v-model="toolBar.integral" :placeholder="$text.selectPlaceholder">
                    <el-option
                            v-for="item in itRuleList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.label">
                    </el-option>
                </el-select>
            </div>
          </div>
          <div>
            <div class="label">兑换点规则</div>
            <div class="content">
              <el-select v-model="toolBar.exchange" :placeholder="$text.selectPlaceholder">
                <el-option
                    v-for="item in epRuleList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.label">
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="label">优惠券</div>
            <div class="content flex">
                <el-select v-model="toolBar.coupon" :placeholder="$text.selectPlaceholder">
                    <el-option
                            v-for="item in couponList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.label">
                    </el-option>
                </el-select>
                <el-input style="margin-left: 10px;width: 68%" v-model="toolBar.couponNum" placeholder="填写券数量" />
            </div>
          </div>
        </div>
      </div>
    </div>
      <div class="table-main">
          <div class="actionbar">
              <div class="item-title">上传门店信息表格</div>
              <div>
                <importExport
                    :showExport="true"
                    :showImport="true"
                    importText="选择文件"
                    exportText="下载导入模板"
                    :exportUrl="exportUrl"
                    :importUrl="importUrl"
                    :exportGetData="exportGetData"
                    exportFileName="导入模板"
                />
              </div>
          </div>
      </div>
    <div slot="footer" class="dialog-footer flex-center">
      <el-button type="primary" @click="save">确认导入</el-button>
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