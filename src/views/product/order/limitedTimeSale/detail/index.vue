<template>
  <div class="page-content">
      <h3 class="page-name">限时抢购订单详情</h3>
      <el-form :model="form" label-position="left" ref="form" label-width="140px">
      <div class="item-box">
        <h4 class="item-title">基础信息</h4>
        <div class="del-form">
            <div class="item-row">
              <el-form-item label="门店code">
                <div class="elFont long-text">{{orderItem.storeNo}}</div>
              </el-form-item>
              <el-form-item label="门店名称">
                 <div class="elFont">{{orderItem.storeName}}</div>
              </el-form-item>
              <el-form-item label="经销商名称">
                <div class="elFont">{{orderItem.dealerName}}</div>
              </el-form-item>
              <el-form-item label="经销商编号">
                <div class="elFont long-text">{{orderItem.dealerNo}}</div>
              </el-form-item>
              <el-form-item label="订单编号">
                <div class="elFont long-text">{{orderItem.orderNo}}</div>
              </el-form-item>
              <el-form-item label="订单状态">
                <div class="elFont">
                  {{getOrderStatus(orderItem.orderStatus)}}
                </div>
              </el-form-item>
              <el-form-item label="订货时间">
                <div class="elFont">{{orderItem.orderTime}}</div>
              </el-form-item>
               <el-form-item label="">
                <div class="elFont">
                </div>
              </el-form-item>
              <el-form-item label="门店地址">
                <div class="elFont">{{orderItem.receiveAddress}}</div>
              </el-form-item>
            </div>
        </div>
      </div>
      <div class="item-box">
        <h4 class="item-title">支付信息</h4>
        <div class="del-form">
            <div class="item-row">
              <el-form-item label="支付总额">
                <div class="elFont">{{(orderItem.orderAmount || 0).toFixed(2)}}元</div>
              </el-form-item>
              <el-form-item label="优惠卷总优惠金额">
                 <div class="elFont">-{{(orderItem.consumeCouponAmount || 0).toFixed(2)}}元</div>
              </el-form-item>
              <el-form-item label="返利总金额">
                <div class="elFont">-{{(orderItem.consumeRebateAmount || 0).toFixed(2)}}元</div>
              </el-form-item>
              <el-form-item label="支付金额">
                <div class="elFont">{{(orderItem.payAmount || 0).toFixed(2)}}元</div>
              </el-form-item>
              <el-form-item label="支付方式">
                <div class="elFont">{{getPayChannel(orderItem.payChannel)}}</div>
              </el-form-item>
            </div>
            <div class="payInform">
              <el-form-item label="使用优惠劵" class="spec-row">
                <div
                  class="elFont"
                  v-for="(coupon,index) in orderItem.orderCoupons"
                  :key="'orderCoupons-list-' + index">
                  <span>{{coupon.couponName}}</span>
                  <span>{{coupon.couponNo}}</span>
                  <span>优惠金额</span>
                  <span>{{(coupon.couponAmount || 0).toFixed(2)}}元 </span>
                </div>
              </el-form-item>
            </div>
        </div>
      </div>
      <div class="item-box">
        <h4 class="item-title">获利信息</h4>
        <div class="del-form">
            <div class="item-row">
              <el-form-item label="获得积分">
                <div class="elFont">{{orderItem.integrationAmount}}</div>
              </el-form-item>
              <el-form-item label="获得返利">
                 <div class="elFont">{{$amountFormat(orderItem.rebateAmount,2)}}元</div>
              </el-form-item>
            </div>
            <div class="payInform">
              <el-form-item label="获取兑换点" class="spec-row">
                <div
                  class="elFont"
                  v-for="(coupon,index) in orderItem.epRuleNames"
                  :key="'orderCoupons-list-' + index">
                  <span>{{coupon.exchangeName}}</span>
                  <span>{{coupon.exchangeAmount}}</span>
                </div>
              </el-form-item>
            </div>
        </div>
      </div>
      <div class="item-box">
         <div class="actionbar">
            <h4 class="item-title">商品信息</h4>
            <div class="select" @click="isShow">
              <span>收起</span>
              <i class="el-icon-arrow-up" v-if="open"></i>
              <i class="el-icon-arrow-down" v-else></i>
            </div>
          </div>
        <div class="table-main" v-if="open">
          <div class="table">
              <el-table
                :data="orderItem.orderItems"
                header-cell-class-name="table-header-item"
              >
                <el-table-column
                  type="index"
                  label="序号"
                  align="center"
                  width="100"
                >
                </el-table-column>
                <el-table-column
                  prop="itemName"
                  label="商品名称"
                  show-overflow-tooltip
                  width="300"
                >
                </el-table-column>
                <el-table-column
                  prop="itemQuantity"
                  label="数量"
                  width="100"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="itemPrice"
                  label="单价（元）"
                  width="140"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span>{{$amountFormat(scope.row.itemPrice,2)}}</span>
                  </template>
                </el-table-column>
                 <el-table-column
                  prop="itemCategoryFrontend"
                  label="商品分类"
                  width="180"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="itemBrand"
                  label="品牌"
                  width="180"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                  prop="itemSpecDetail"
                  label="规格"
                  show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="orderDetailScanCodeStatus"
                    label="入库状态"
                    width="120"
                    show-overflow-tooltip
                >
                </el-table-column>
                <el-table-column
                    prop="orderDetailRefundQuantity"
                    label="退货条数"
                    width="120"
                    show-overflow-tooltip
                >
                </el-table-column>
              </el-table>
          </div>
        </div>
      </div>
      <div class="item-box">
         <div class="actionbar">
            <h4 class="item-title">付款单</h4>
          </div>
          <div class="table-main">
            <div class="table pay-form">
                <el-table
                  :data="orderItem.orderPayFlows"
                  header-cell-class-name="table-header-item"
                >
                  <el-table-column
                      prop="orderPayId"
                      label="编号"
                      min-width="90"
                      show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                      prop="orderNo"
                      label="支付单号"
                      min-width="220"
                      show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <span>{{orderItem.orderNo}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                      prop="payNo"
                      label="支付平台交易号"
                      min-width="220"
                      show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                      prop="payTime"
                      label="支付时间"
                      min-width="180"
                      show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                      prop="payChannel"
                      label="支付方式"
                      min-width="100"
                      show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <span>{{getPayChannel(scope.row.payChannel)}}</span>
                    </template>
                  </el-table-column>
                  <!--<el-table-column-->
                      <!--prop="amount"-->
                      <!--label="到账金额"-->
                      <!--min-width="120"-->
                      <!--show-overflow-tooltip-->
                  <!--&gt;-->
                    <!--<template slot-scope="scope">-->
                      <!--<span>{{$amountFormat(scope.row.withdrewAmount,2)}}</span>-->
                    <!--</template>-->
                  <!--</el-table-column>-->
                </el-table>
                <div class="pay-prompt">
                  若资金没及时到账，到账金额为零
                </div>
            </div>

          </div>
      </div>
      </el-form>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>