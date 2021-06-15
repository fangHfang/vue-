<template>
  <div class="page-content">
    <h3 class="page-name">新增卡券发放领取规则</h3>
    <div class="del-form">
      <div class="item-box">
        <h4 class="item-title">卡券基础信息</h4>
        <div class="item-row">
          <div>
            <div class="label">是否需要领取</div>
            <el-radio v-model="make" :label="1">是</el-radio>
            <el-radio v-model="make" :label="0">否</el-radio>
            <div class="font">（若选择“否”，则优惠劵将直接给到门店；若选择“是”，则需要门店点击“领取”才能获得优惠券，未进行领取则会过期）</div>
          </div>
        </div>
        <div class="item-row">
          <div class="deadline">
            <el-radio v-model="makeDeadline" label="0">领取截至时间</el-radio>
            <el-date-picker
              v-model="toolBar.deadline"
              style="width:50%"
              type="datetime"
              value-format="yyyy-MM-dd hh:mm:ss"
              :disabled="makeDeadline == 1"
              placeholder="选择日期">
            </el-date-picker>
            <el-radio style="margin-left:20px" v-model="makeDeadline" label="1">长期有效</el-radio>
          </div>
        </div>
        <div class="item-row item-notice">
          <div>
            <div class="label">备注</div>
            <div>
            <el-input clearable class="textarea" v-model="toolBar.notice" type="textarea" rows="4" resize="none" placeholder=""></el-input>
            <div class="font explain">（请填写送券理由）</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="link"></div>
    <!-- <div class="del-form">
      <div class="item-box">
        <div class="item-row establish">
          <div>
            <div class="label">创建时间</div>
            <el-input v-model="toolBar.hour"
                      placeholder="2020-10-10"></el-input>
          </div>
          <div>
            <div class="label"
                 style="margin-left:20px">创建人</div>
            <el-input v-model="toolBar.people"
                      placeholder="张三"></el-input>
          </div>
          <div>
            <div class="label"
                 style="margin-left:20px">卡券状态</div>
            <el-input v-model="toolBar.state"
                      placeholder="投放中"></el-input>
          </div>
        </div>
      </div>
    </div> -->
    <div class="btn-box">
      <el-button @click="back">上一步</el-button>
      <el-button type="primary" :loading='btnLoading' @click="btnLoading = true;$throttle(save)">赠送</el-button>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import "./index";
</style>