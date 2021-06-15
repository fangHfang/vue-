<template>
  <div class="page-content">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <div class="del-form">
        <div class="item-box">
          <h4 class="item-title">新增签到规则</h4>
          <div class="item-row">
            <el-form-item label="签到规则名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入商品名称"></el-input>
            </el-form-item>
          </div>
          <div class="item-row">
            <el-form-item label="备注" prop="remarks" style="width:100%">
              <el-input v-model="form.remarks" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="item-box">
          <h4 class="item-title">签到方式</h4>
          <div class="del-form sign-mode">
            <div class="item-row">
              <el-form-item>
                <el-checkbox v-model="form.isCumulative">累计签到奖励</el-checkbox>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="累计间隔时间" >
                  <el-date-picker
                      v-model="form.cumulative.activeDate"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="daterange"
                      range-separator="~"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="签到总天数" prop="days">
                <el-input v-model="form.cumulative.days" placeholder="请输入签到总天数"></el-input>
              </el-form-item>
              <el-form-item label="可获取返利" prop="rebate">
                <el-input v-model="form.cumulative.rebate" placeholder="请输入可获得返利"></el-input>
              </el-form-item>
              <el-form-item label="可获取积分" prop="integral">
                <el-input v-model="form.cumulative.integral" placeholder="请输入可获得积分"></el-input>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="获取优惠券" prop="coupon" class="label" style="width:35%;">
                <div class="link-box" v-for="(item,index) in form.cumulative.coupon" :key="index">
                  <el-select clearable v-model="item.value" placeholder="请选择">
                    <el-option
                      v-for="item in couponOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-input v-model="item.number" placeholder="1" :min="0" type="number" style="width:100px"></el-input>
                  <em @click="removeLinkItem(index,'coupon')" class="el-icon-remove-outline"></em>
                </div>
                <em @click="addLinkItem('coupon')" class="el-icon-circle-plus-outline"></em>
              </el-form-item>
              <el-form-item label="获取兑换点" prop="exchange" class="label" style="width:35%;">
                <div class="link-box" v-for="(item,index) in form.cumulative.exchange" :key="index">
                  <el-select clearable v-model="item.value" placeholder="请选择">
                    <el-option
                      v-for="item in exchangeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-input v-model="item.number" placeholder="1" :min="0" type="number" style="width:100px"></el-input>
                  <em @click="removeLinkItem(index,'exchange')" class="el-icon-remove-outline"></em>
                </div>
                <em @click="addLinkItem('exchange')" class="el-icon-circle-plus-outline"></em>
              </el-form-item>
            </div>
          </div>
          <div class="del-form sign-mode">
            <div class="item-row">
              <el-form-item>
                <el-checkbox v-model="form.isContinuity">连续签到奖励</el-checkbox>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="签到总天数" prop="days">
                <el-input v-model="form.continuity.days" placeholder="请输入签到总天数"></el-input>
              </el-form-item>
              <el-form-item label="可获取返利" prop="rebate">
                <el-input v-model="form.continuity.rebate" placeholder="请输入可获得返利"></el-input>
              </el-form-item>
              <el-form-item label="可获取积分" prop="integral">
                <el-input v-model="form.continuity.integral" placeholder="请输入可获得积分"></el-input>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="获取优惠券" prop="coupon" class="label" style="width:35%;">
                <div class="link-box" v-for="(item,index) in form.continuity.coupon" :key="index">
                  <el-select clearable v-model="item.value" placeholder="请选择">
                    <el-option
                      v-for="item in couponOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-input v-model="item.number" placeholder="1" :min="0" type="number" style="width:100px"></el-input>
                  <em @click="removeLinkItem(index,'continuityCoupon')" class="el-icon-remove-outline"></em>
                </div>
                <em @click="addLinkItem('continuityCoupon')" class="el-icon-circle-plus-outline"></em>
              </el-form-item>
              <el-form-item label="获取兑换点" prop="exchange" class="label" style="width:35%;">
                <div class="link-box" v-for="(item,index) in form.continuity.exchange" :key="index">
                  <el-select clearable v-model="item.value" placeholder="请选择">
                    <el-option
                      v-for="item in exchangeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-input v-model="item.number" placeholder="1" :min="0" type="number" style="width:100px"></el-input>
                  <em @click="removeLinkItem(index,'continuityExchange')" class="el-icon-remove-outline"></em>
                </div>
                <em @click="addLinkItem('continuityExchange')" class="el-icon-circle-plus-outline"></em>
              </el-form-item>
            </div>
          </div>
          <div class="del-form sign-mode">
            <div class="item-row">
              <el-form-item>
                <el-checkbox v-model="form.isOneDay">单日签到奖励</el-checkbox>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="可获取返利" prop="rebate">
                <el-input v-model="form.oneDay.rebate" placeholder="请输入可获得返利"></el-input>
              </el-form-item>
              <el-form-item label="可获取积分" prop="integral">
                <el-input v-model="form.oneDay.integral" placeholder="请输入可获得积分"></el-input>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="获取优惠券" prop="coupon" class="label" style="width:35%;">
                <div class="link-box" v-for="(item,index) in form.oneDay.coupon" :key="index">
                  <el-select clearable v-model="item.value" placeholder="请选择">
                    <el-option
                      v-for="item in couponOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-input v-model="item.number" placeholder="1" :min="0" type="number" style="width:100px"></el-input>
                  <em @click="removeLinkItem(index,'oneDayCoupon')" class="el-icon-remove-outline"></em>
                </div>
                <em @click="addLinkItem('oneDayCoupon')" class="el-icon-circle-plus-outline"></em>
              </el-form-item>
              <el-form-item label="获取兑换点" prop="exchange" class="label" style="width:35%;">
                <div class="link-box" v-for="(item,index) in form.oneDay.exchange" :key="index">
                  <el-select clearable v-model="item.value" placeholder="请选择">
                    <el-option
                      v-for="item in exchangeOption"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-input v-model="item.number" placeholder="1" :min="0" type="number" style="width:100px"></el-input>
                  <em @click="removeLinkItem(index,'oneDayExchange')" class="el-icon-remove-outline"></em>
                </div>
                <em @click="addLinkItem('oneDayExchange')" class="el-icon-circle-plus-outline"></em>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <el-button type="primary" @click="addRule">{{ $text.save }}</el-button>
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