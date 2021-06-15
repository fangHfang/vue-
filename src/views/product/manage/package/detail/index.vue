<template>
  <div class="page">
    <div class="detail-box">
      <span class="title">订单详情</span>
      <div class="detail-item">
        <span class="title">基础信息</span>
        <div class="detail-content">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="content-col">
                <span>门店code</span>
                <span>{{ detail.storeCode }}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <span>门店名称</span>
                <span>{{ detail.storeName }}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <span>经销商名称</span>
                <span>{{ detail.dealerName }}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <span>经销商编号</span>
                <span>{{ detail.dealerNo }}</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="content-col">
                <span>订单编号</span>
                <span>{{ detail.orderNo }}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <span>订单状态</span>
                <span class="status-box">
                    {{getOrderStatus(detail.orderStatus)}}
                </span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <span>订货时间</span>
                <span>{{ detail.orderTime }}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <span>收货地址</span>
                <span>{{ detail.receiveAddress }}</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="detail-item">
        <span class="title">支付信息</span>
        <div class="detail-content">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="content-col">
                <span>支付总额</span>
                <span>{{ $amountFormat(detail.orderAmount,2) }} 元</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <span>优惠券总优惠额</span>
                <span>- {{ $amountFormat(detail.consumeCouponAmount,2) }} 元</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <span>返利总金额</span>
                <span>- {{ $amountFormat(detail.consumeRebateAmount,2) }} 元</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <span>实付金额</span>
                <span>{{ $amountFormat(detail.payAmount,2) }} 元</span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="content-col">
                <span>支付方式</span>
                <span>{{ getPayChannel(detail.payChannel) }}</span>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="content-col">
                <span>支付状态</span>
                <span class="status-box">
                  <i-status
                      :type="['warning','success', 'error'][detail.payStatus]"
                      :message="['待支付', '已支付','已退款'][detail.payStatus]"
                  />
                </span>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="content-col a-start">
                <span>使用优惠券</span>
                <div class="coupon-box">
                  <span
                      v-for="(item, index) in detail.couponList"
                      :key="index"
                  >{{ item.couponName }}</span
                  >
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="detail-item">
        <span class="title">获利信息</span>
        <div class="detail-content">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="content-col">
                <span>获得积分：</span>
                <span>{{detail.integrationAmount}}</span>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="content-col">
                <span>获得返利：</span>
                <span>{{$amountFormat(detail.rebateAmount,2)}}</span>
              </div>
            </el-col>
          </el-row>

        </div>
      </div>
      <div class="detail-item">
        <span class="title">套餐商品信息</span>
        <div class="merchandise-store-box">
          <div class="table-main">
            <div class="table">
              <el-table
                  v-loading="loading"
                  :data="currentPage"
                  max-height="330"
                  header-cell-class-name="table-header-item"
              >
                <el-table-column type="index" label="序号" width="60" />

                <el-table-column
                    prop="itemName"
                    label="商品名称"
                    width="300"
                    show-overflow-tooltip
                />

                <el-table-column prop="itemQuantity" label="数量" width="60" />

                <el-table-column
                    prop="itemPrice"
                    label="单价（元）"
                    width="120"
                >
                  <template slot-scope="scope">
                    <span>{{$amountFormat(scope.row.itemPrice,2)}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="itemCategoryBackend"
                    label="商品分类"
                    width="160"
                    show-overflow-tooltip
                />

                <el-table-column
                    prop="itemBrand"
                    label="品牌"
                    width="120"
                    show-overflow-tooltip
                />

                <el-table-column
                    prop="itemSpecDetail"
                    label="规格"
                    width="400"
                    show-overflow-tooltip
                />

                <el-table-column prop="orderDetailScanCodeStatus" label="入库状态" width="100"/>
                <el-table-column prop="orderDetailRefundQuantity" label="退货数量" width="100"/>

                <el-table-column
                    prop="itemRebateAmount"
                    label="获得返利金额（元）"
                    width="160"
                    show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span>{{$amountFormat(scope.row.itemRebateAmount,2)}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="itemIntegrationAmount"
                    label="获得积分金额（元）"
                    width="160"
                    show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span>{{$amountFormat(scope.row.itemIntegrationAmount,2)}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="consumeRebateAmount"
                    label="使用返利金额（元）"
                    width="160"
                    show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span>{{$amountFormat(scope.row.consumeRebateAmount,2)}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="consumeCouponAmount"
                    label="使用优惠券金额（元）"
                    width="160"
                    show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span>{{$amountFormat(scope.row.consumeCouponAmount,2)}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="orderDetailAmount"
                    label="应付金额（元）"
                    width="120"
                    show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span>{{$amountFormat(scope.row.orderDetailAmount,2)}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="payAmount"
                    label="实付金额（元）"
                    width="120"
                    show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span>{{$amountFormat(scope.row.payAmount,2)}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="pagination">
              <el-pagination
                  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="searchData.pageIndex"
                  :page-sizes="[10, 20, 50, 100, 200]"
                  :page-size="searchData.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
              >
              </el-pagination>
              <el-button type="primary" size="small">{{
                $text.paginationGo
                }}</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="detail-item">
        <span class="title">付款单</span>
        <div class="merchandise-store-box">
          <div class="table-main" >
            <div class="table flex-z">
              <el-table
                  v-loading="loading"
                  :data="paymentList"
                  max-height="330"
                  header-cell-class-name="table-header-item"
              >
                <el-table-column type="index" label="序号" width="60" />
                <el-table-column
                    prop="orderPayId"
                    label="编号"
                    min-width="60"
                    show-overflow-tooltip
                />
                <el-table-column
                    prop="orderNo"
                    label="支付单号"
                    min-width="180"
                    show-overflow-tooltip
                />
                <el-table-column
                    prop="payNo"
                    label="支付平台交易号"
                    min-width="160"
                    show-overflow-tooltip
                />
                <el-table-column
                    prop="payTime"
                    label="支付时间"
                    min-width="160"
                    show-overflow-tooltip
                />
                <el-table-column
                    prop="payChannel"
                    label="支付方式"
                    min-width="160"
                    show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span>{{ getPayChannel(scope.row.payChannel) }}</span>
                  </template>
                </el-table-column>
                <!--<el-table-column-->
                    <!--prop="payAmount"-->
                    <!--label="到账金额"-->
                    <!--min-width="120"-->
                    <!--show-overflow-tooltip-->
                <!--&gt;-->
                  <!--<template slot-scope="scope">-->
                    <!--<span>{{$amountFormat(scope.row.payAmount,2)}}</span>-->
                  <!--</template>-->
                <!--</el-table-column>-->
              </el-table>
              <div class="pay-prompt">
                若资金没及时到账，到账金额为零
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import 'index';
</style>
