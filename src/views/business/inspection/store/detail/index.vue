<template>
  <div class="page" v-loading="tableLoading">
    <div style="padding: 15px 0 0 15px;font-size: 16px">
      审核店检
      <a href="#" @click="$router.back()" style="margin-left: 10px;">←{{ $text.return }}</a>
    </div>
    <div class="toolbar-box inspection-store-detail-toolbar">
      <div>
        <div class="label">自定义项目分值</div>
        <div class="content">
          <el-input v-model="form.customObtainScore" :disabled="isAuditDetail" placeholder="打分"></el-input>
        </div>
      </div>
      <div class="i-s-d-toolbar-font-box">（最高{{form.customFullScore}}分）</div>
    </div>
    <div class="center-content-box">
      <div class="center-content" v-for="(item) in form.clauseList" :key="item.detailNo">
        <div>{{item.name}}</div>
        <div class="center-content-img-box"><img @click="showImg(item.imgUrl)" :src="item.imgUrl" style="height:100px;width:100px;cursor: zoom-in;" /></div>
        <div class="toolbar-box small-toolbar">
          <p>
            <el-radio style="display:block;margin-bottom:5px;" v-model="item.status" :label=2 :disabled="isAuditDetail">通过</el-radio>
            <el-radio style="display:block" v-model="item.status" :label=1 :disabled="isAuditDetail">驳回</el-radio>
          </p>
          <el-input v-model="item.obtainScore" :disabled="isAuditDetail || item.status===1" placeholder="打分"></el-input>
          <div class="i-s-d-toolbar-font-box">（最高{{item.fullScore}}分）</div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="imgDialogVisible">
      <img width="100%" :src="imgDialogSrc" alt="">
    </el-dialog>
    <div class="banner-box">
      <div class="toolbar-box inspection-store-detail-toolbar-banner">
        <div v-if="isAuditDetail">
          <div class="label">操作人</div>
          <div class="content">
            <el-input v-model="form.auditName" disabled></el-input>
          </div>
        </div>
        <div v-if="isAuditDetail">
          <div class="label">状态</div>
          <div class="content">
            <el-input v-model="form.auditStatusName" disabled></el-input>
          </div>
        </div>
        <div :class="!isAuditDetail?'score':''">
          <div class="label">总分</div>
          <div class="content">
            <el-input v-model="form.score" disabled placeholder="点击自动计算"></el-input>
            <el-button type="primary" @click="calculate" v-if="!isAuditDetail">计算</el-button>
          </div>
        </div>
        <div v-if="isAuditDetail">
          <div class="label">入库条数</div>
          <div class="content">
            <el-input v-model="form.stock" disabled></el-input>
          </div>
        </div>
        <div v-if="isAuditDetail">
          <div class="label">获取返利：</div>
          <div class="content">
            <el-input v-model="form.reward.rebateAmount" disabled></el-input>
          </div>
        </div>
        <div v-if="isAuditDetail">
          <div class="label">积分：</div>
          <div class="content">
            <el-input v-model="form.reward.integralAmount" disabled></el-input>
          </div>
        </div>
        <div v-if="isAuditDetail">
          <div class="label">兑换点：</div>
          <div class="content">
            <el-input v-model="form.reward.exchangeAmount" disabled></el-input>
          </div>
        </div>
        <div v-if="isAuditDetail">
          <div class="label">优惠券：</div>
          <div class="content">
            <el-input v-model="form.reward.couponCount" disabled></el-input>
          </div>
        </div>
        <div class="remarks">
          <div class="label">评语</div>
          <div class="content">
            <el-input maxlength="100" show-word-limit v-model="form.remark" type="textarea" :rows="3" resize="none" :disabled="isAuditDetail"></el-input>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-inspection-store-detail">
      <el-button type="primary" @click="auditTips" v-if="!isAuditDetail">{{ $text.submit }}</el-button>
      <el-button type="primary" @click="$router.back()">{{ $text.return }}</el-button>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>