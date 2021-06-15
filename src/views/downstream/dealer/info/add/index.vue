<template>
  <div class="page">
    <div class="page-content" style="padding-bottom: 0;">
      <h3 class="page-name">新增经销商</h3>
      <el-form :model="form" ref="form" class="store-info-add-form" label-width="90px">
        <h4 style="padding-bottom: 10px">经销商基础信息</h4>
        <div class="item-box">
          <div class="del-form">
            <div class="item-row">
              <el-form-item label="经销商名称">
                <el-input :disabled="isDetail" v-model="form.name" placeholder="请输入经销商名称"></el-input>
              </el-form-item>
              <el-form-item label="地址">
                <el-input :disabled="isDetail" v-model="form.address" placeholder="请输入地址"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="item-box">
          <div class="del-form">
            <div class="item-row">
              <el-form-item label="联系电话">
                <el-input :disabled="isDetail" v-model="form.contactPhone" placeholder="请输入联系电话"></el-input>
              </el-form-item>
              <el-form-item label="外部经销商编码">
                <el-input :disabled="isDetail" class="disPriceStyle" v-model="form.outRefNo"></el-input>
                <!-- <el-input v-model="form.dealerNo" placeholder="经销商编码" disabled ></el-input> -->
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="item-box">
          <div class="del-form">
            <div class="item-row">
              <el-form-item label="商户编号">
                <el-input :disabled="isDetail" v-model="form.merchNo" placeholder="请输入商户编号"></el-input>
              </el-form-item>
              <el-form-item label="支付开通状态">
                <el-select :disabled="isDetail" clearable v-model="form.payStatusArray.value" :placeholder="$text.selectPlaceholder">
                  <el-option
                      v-for="item in form.payStatusArray.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="item-box">
          <div class="del-form">
            <div class="item-row">
              <el-form-item label="支付功能">
                <el-select :disabled="isDetail" clearable v-model="form.payFunArray.value" :placeholder="$text.selectPlaceholder">
                  <el-option
                      v-for="item in form.payFunArray.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-if="form.payFunArray.value === 0" label="支付方式" style="width: 60%;">
                <el-checkbox-group v-model="form.payChannelNos" >
                  <el-checkbox :disabled="isDetail" v-for="item in form.payChannelNoList" :label="item.payChannelNo" :key="item.payChannelNo">{{item.payChannelName}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="item-box">
          <div class="del-form">
            <div class="item-row">
              <el-form-item label="关联区域">
                <el-select :disabled="isDetail" clearable v-model="form.region.value"
                           filterable
                           remote
                           reserve-keyword
                           multiple
                           collapse-tags
                           placeholder="请输入所属区域"
                           :remote-method="pageSearchRegionList"
                           :loading="loading">
                  <el-option
                          v-for="item in form.region.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="关联标签" v-if="!isModify">
                <el-select :disabled="isDetail" clearable v-model="form.labelNo.value" :placeholder="$text.selectPlaceholder">
                  <el-option
                          v-for="item in form.labelNo.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
        </div>
        <h4 style="padding-bottom: 10px">账户产品结算信息</h4>
        <div class="item-box">
          <div class="del-form">
            <div class="item-row">
              <el-form-item label="账户性质">
                <el-input :disabled="isDetail" v-model="form.accountNature" placeholder="请输入账户性质"></el-input>
              </el-form-item>
              <el-form-item label="开户名称">
                <el-input :disabled="isDetail" v-model="form.accountName" placeholder="请输入开户名称"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="item-box">
          <div class="del-form">
            <div class="item-row">
              <el-form-item label="开户银行">
                <el-input :disabled="isDetail" v-model="form.bankOpen" placeholder="请输入开户银行"></el-input>
              </el-form-item>
              <el-form-item label="银行账号">
                <el-input :disabled="isDetail" v-model="form.bankCardNumber" placeholder="请输入银行账号"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="item-box">
          <div class="del-form">
            <div class="item-row">
              <el-form-item label="开户支行">
                <el-input :disabled="isDetail" v-model="form.bankBranch" placeholder="请输入开户支行"></el-input>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="btn-box">
          <el-button v-if="!isDetail" type="primary" :loading='btnLoading' @click="btnLoading = true;$throttle(saveDealerInfo)">{{ $text.save }}</el-button>
          <el-button @click="back">{{ $text.cancel }}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>