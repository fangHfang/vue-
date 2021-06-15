<template>
  <div class="page" v-loading="detailLoading">
    <div class="page-content">
      <h3 class="page-name">订单详情</h3>
      <el-form label-width="100px">
        <div class="item-box">
          <div class="maxxis-add-title-btm-box">
            <h4 class="item-title">基础信息</h4>
          </div>
          <div class="del-form">
            <div class="item-row">
              <el-form-item label="订单状态：">
                <span>{{['审核中','未通过','已通过','已换新'][detail.renewStatus]}}</span>
              </el-form-item>
              <el-form-item label="处理流程状态：">
                <span>{{['提交申请','玛吉斯同意','玛吉斯驳回','门店换货,玛吉斯没有同意','完成,玛吉斯没有同意','门店换货,玛吉斯同意','完成,玛吉斯同意'][detail.renewFlow]}}</span>
              </el-form-item>
              <el-form-item label="换新轮胎编号：">
                <span>{{detail.renewNo}}</span>
              </el-form-item>
              <el-form-item label="门店code：">
                <span>{{detail.storeNo}}</span>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="门店名称：">
                <span>{{detail.storeName}}</span>
              </el-form-item>
              <el-form-item label="经销商名称：">
                <span>{{detail.dealerName}}</span>
              </el-form-item>
              <el-form-item label="经销商编号：">
                <span>{{detail.dealerNo}}</span>
              </el-form-item>
              <el-form-item label="车主名称：">
                <span>{{detail.vehicleOwnerCarName}}</span>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="车主手机：">
                <span>{{detail.vehicleOwnerMobile}}</span>
              </el-form-item>
              <el-form-item label="客户地址：">
                <span>{{detail.storeAddressDetail}}</span>
              </el-form-item>
              <el-form-item label="车牌号：">
                <span>{{detail.vehicleOwnerCarNumber}}</span>
              </el-form-item>
              <el-form-item label="申请门店：">
                <span>{{detail.storeNo}}</span>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="申请时间：">
                <span>{{detail.renewTime}}</span>
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="item-box table-main">
          <div class="maxxis-add-title-btm-box">
            <h4 class="item-title">商品信息
              <span @click="tableFontClick">{{ searchTableShow ? '收起' : '展开' }}<b :class="searchTableShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></b></span>
            </h4>
            <div>
              <el-button type="primary" @click="examine(1)">全部通过</el-button>
              <el-button type="primary" @click="examine(2)">全部驳回</el-button>
            </div>
          </div>
          <div class="table" v-show="searchTableShow">
            <el-table
                :data="tableData"
                header-cell-class-name="table-header-item"
            >
              <el-table-column
                  type="index"
                  label="序号"
                  width="60"
                  align="center"
              >
              </el-table-column>
              <el-table-column
                  prop="itemName"
                  show-overflow-tooltip
                  label="商品名称"
                  width="300"
              >
              </el-table-column>
              <el-table-column
                  prop="itemBarCode"
                  label="商品条码"
                  width="140"
                  show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                  prop="period"
                  label="商品周期"
                  width="120"
                  show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                  prop="specDetail"
                  label="商品图片"
                  min-width="400"
              >
                <template slot-scope="scope">
                 <div class="img-wrap">
                    <div class="img-box" v-if="scope.row.renewDetailOneImageUrl">
                      <img :src="scope.row.renewDetailOneImageUrl" class="img" @click="showImg(scope.row.renewDetailOneImageUrl)">
                      <div class="img-right">
                        <el-radio-group v-model="scope.row.renewDetailOneApprovalStatus" @change="(val)=>examineOne(scope.row,'One',val)">
                          <el-radio :label="2">通过</el-radio>
                          <el-radio :label="3">拒绝</el-radio>
                        </el-radio-group>
                      </div>
                    </div>
                    <div class="img-box" v-if="scope.row.renewDetailTwoImageUrl">
                      <img :src="scope.row.renewDetailTwoImageUrl" class="img" @click="showImg(scope.row.renewDetailTwoImageUrl)">
                      <div class="img-right">
                        <el-radio-group v-model="scope.row.renewDetailTwoApprovalStatus" @change="(val)=>examineOne(scope.row,'Two',val)">
                          <el-radio :label="2">通过</el-radio>
                          <el-radio :label="3">拒绝</el-radio>
                        </el-radio-group></div>
                    </div>
                    <div class="img-box" v-if="scope.row.renewDetailThreeImageUrl">
                      <img :src="scope.row.renewDetailThreeImageUrl" class="img" @click="showImg(scope.row.renewDetailThreeImageUrl)">
                      <div class="img-right">
                        <el-radio-group v-model="scope.row.renewDetailThreeApprovalStatus" @change="(val)=>examineOne(scope.row,'Three',val)">
                          <el-radio :label="2">通过</el-radio>
                          <el-radio :label="3">拒绝</el-radio>
                        </el-radio-group></div>
                    </div>
                    <div class="img-box" v-if="scope.row.renewDetailFourImageUrl">
                      <img :src="scope.row.renewDetailFourImageUrl" class="img" @click="showImg(scope.row.renewDetailFourImageUrl)">
                      <div class="img-right">
                        <el-radio-group v-model="scope.row.renewDetailFourApprovalStatus" @change="(val)=>examineOne(scope.row,'Four',val)">
                          <el-radio :label="2">通过</el-radio>
                          <el-radio :label="3">拒绝</el-radio>
                        </el-radio-group></div>
                    </div>
                    <div class="img-box" v-if="scope.row.renewDetailFiveImageUrl">
                      <img :src="scope.row.renewDetailFiveImageUrl" class="img" @click="showImg(scope.row.renewDetailFiveImageUrl)">
                      <div class="img-right">
                        <el-radio-group v-model="scope.row.renewDetailFiveApprovalStatus" @change="(val)=>examineOne(scope.row,'Five',val)">
                          <el-radio :label="2">通过</el-radio>
                          <el-radio :label="3">拒绝</el-radio>
                        </el-radio-group></div>
                    </div>
                    <div class="img-box" v-if="scope.row.renewDetailSixImageUrl">
                      <img :src="scope.row.renewDetailSixImageUrl" class="img" @click="showImg(scope.row.renewDetailSixImageUrl)">
                      <div class="img-right">
                        <el-radio-group v-model="scope.row.renewDetailSixApprovalStatus" @change="(val)=>examineOne(scope.row,'Six',val)">
                          <el-radio :label="2">通过</el-radio>
                          <el-radio :label="3">拒绝</el-radio>
                        </el-radio-group></div>
                    </div>
                 </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-form>
    </div>
    <el-dialog :visible.sync="imgDialogVisible">
      <img width="100%" :src="imgDialogSrc" alt="">
    </el-dialog>
    <div class="toolbar-box">
      <div class="btn-box">
        <el-button @click="back">{{ $text.return }}</el-button>
      </div>
    </div>
    <el-dialog
        title="驳回理由"
        :visible.sync="refuseDialog"
        :close-on-click-modal="false"
        @close="closedDialog"
        width="520px">
      <el-input type="textarea" v-model="refuseReason" rows="10" placeholder="请输入拒绝理由" resize="none"></el-input>
      <span slot="footer" class="dialog-footer">
          <el-button @click="refuseDialog = false">取 消</el-button>
          <el-button type="primary" @click="doRefusing">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
