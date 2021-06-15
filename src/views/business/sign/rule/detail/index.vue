<template>
  <div class="page-content">
    <el-form :rules="rules" ref="form" label-width="100px">
      <div class="del-form">
        <div class="item-box">
          <h4 class="item-title">签到规则详情</h4>
          <div class="item-row">
            <el-form-item label="签到规则名称" prop="name">
              <span>{{detail.ruleName}}</span>
            </el-form-item>
          </div>
          <div class="item-row">
            <el-form-item label="签到规则状态" prop="name">
              <!-- (0-终止，1-启用) -->
              <i-status :type="[ 'error', 'success'][detail.status]" :message="['终止', '启用'][detail.status]" />
            </el-form-item>
          </div>
          <div class="item-row">
            <el-form-item label="备注" prop="remarks" style="width:100%">
              <span>{{detail.remarks}}</span>
            </el-form-item>
          </div>
        </div>
        <div class="item-box">
          <h4 class="item-title">签到方式</h4>
          <div class="del-form sign-mode" v-if="detail.isTotalSignInReward">
            <div class="item-row">
              <el-form-item>
                <span>累计签到奖励</span>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="累计间隔时间" >
                <span v-if="detail.totalStartTime && detail.totalEndTime">{{detail.totalStartTime.substring(0,10)}}~{{detail.totalEndTime.substring(0,10)}}</span>
                <span v-else></span>
              </el-form-item>
              <el-form-item label="签到总天数" prop="days">
                <span>{{detail.totalDay}}</span>
              </el-form-item>
              <el-form-item label="可获取返利" prop="rebate">
                <span>{{detail.totalRebateReward}}</span>
              </el-form-item>
              <el-form-item label="可获取积分" prop="integral">
                <span>{{detail.totalIntegralReward}}</span>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="获取优惠券" prop="coupon" class="label" style="width:35%;">
                <div class="link-box" v-for="(item,index) in detail.cumulative.coupon" :key="index">
                  <el-select clearable v-model="item.value" disabled placeholder="请选择">
                    <el-option
                      v-for="item in couponOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <p style="margin-left:10px;">{{item.number}}</p>
                </div>
              </el-form-item>
              <el-form-item label="获取兑换点" prop="exchange" class="label" style="width:35%;">
                <div class="link-box" v-for="(item,index) in detail.cumulative.exchange" :key="index">
                  <el-select clearable v-model="item.value" disabled placeholder="请选择">
                    <el-option
                      v-for="item in exchangeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <p style="margin-left:10px;">{{item.number}}</p>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="del-form sign-mode" v-if="detail.isContinuitySignInReward">
            <div class="item-row">
              <el-form-item>
                <span>连续签到奖励</span>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="签到总天数" prop="days">
                <span>{{detail.continuityDay}}</span>
              </el-form-item>
              <el-form-item label="可获取返利" prop="rebate">
                <span>{{detail.continuityRebateReward}}</span>
              </el-form-item>
              <el-form-item label="可获取积分" prop="integral">
                <span>{{detail.continuityIntegralReward}}</span>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="获取优惠券" prop="coupon" class="label" style="width:35%;">
                <div class="link-box" v-for="(item,index) in detail.continuity.coupon" :key="index">
                  <el-select clearable v-model="item.value" disabled placeholder="请选择">
                    <el-option
                      v-for="item in couponOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <p style="margin-left:10px;">{{item.number}}</p>
                </div>
              </el-form-item>
              <el-form-item label="获取兑换点" prop="exchange" class="label" style="width:35%;">
                <div class="link-box" v-for="(item,index) in detail.continuity.exchange" :key="index">
                  <el-select clearable v-model="item.value" disabled placeholder="请选择">
                    <el-option
                      v-for="item in exchangeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <p style="margin-left:10px;">{{item.number}}</p>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="del-form sign-mode" v-if="detail.isSingleSignInReward">
            <div class="item-row">
              <el-form-item>
                <span>单日签到奖励</span>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="可获取返利" prop="rebate">
                <span>{{detail.singleRebateReward}}</span>
              </el-form-item>
              <el-form-item label="可获取积分" prop="integral">
                <span>{{detail.singleIntegralReward}}</span>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="获取优惠券" prop="coupon" class="label" style="width:35%;">
                <div class="link-box" v-for="(item,index) in detail.oneDay.coupon" :key="index">
                  <el-select clearable v-model="item.value" disabled placeholder="请选择">
                    <el-option
                      v-for="item in couponOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <p style="margin-left:10px;">{{item.number}}</p>
                </div>
              </el-form-item>
              <el-form-item label="获取兑换点" prop="exchange" class="label" style="width:35%;">
                 <div class="link-box" v-for="(item,index) in detail.oneDay.exchange" :key="index">
                  <el-select clearable v-model="item.value" disabled placeholder="请选择">
                    <el-option
                      v-for="item in exchangeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <p style="margin-left:10px;">{{item.number}}</p>
                </div>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <el-button @click="back">{{ $text.cancel }}</el-button>
      </div>
    </el-form>
    <dialogAddProduct :dialogVisible.sync="dialogVisible"></dialogAddProduct>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
