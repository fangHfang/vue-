<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">查找订单</div>
        <div class="content">
          <el-input
            v-model="searchData.orderNo"
            placeholder="请输入订单号"
            clearable
          />
        </div>
      </div>
      <div>
        <div class="label">支付方式</div>
        <div class="content">
          <el-select
            v-model="searchData.payChannel"
            :placeholder="$text.selectPlaceholder"
            clearable
          >
            <el-option
              v-for="item in payChannelOptions.slice(1)"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">支付状态</div>
        <div class="content">
          <el-select
            v-model="searchData.payStatus"
            :placeholder="$text.selectPlaceholder"
            clearable
          >
            <el-option
              v-for="item in payStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">门店名称</div>
        <div class="content">
<!--          <el-input-->
<!--            v-model="searchData.storeName"-->
<!--            placeholder="请输入门店code/门店名称"-->
<!--            clearable-->
<!--          />-->
          <storeSelect @change="storeChange" ref="store"/>
        </div>
      </div>
      <div>
        <div class="label">订单状态</div>
        <div class="content">
          <el-select
            v-model="searchData.orderStatus"
            :placeholder="$text.selectPlaceholder"
            clearable
          >
            <el-option
              v-for="item in orderStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">创建时间</div>
        <div class="content">
          <el-date-picker
            v-model="orderDateRange"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          />
        </div>
      </div>

      <el-button type="primary" :loading="loading" @click="searchTableData">
        {{ $text.search }}
      </el-button>

      <el-button type="primary" plain @click="resetSearch">{{ $text.reset }}</el-button>
    </div>

    <div class="table-main">
      <div class="actionbar">
        <importExport
            :showExport="permission.includes('ZBPCD01030501')"
            :exportUrl="exportUrl"
            :exportGetData="exportGetData"
            exportFileName="秒杀活动订单导出"
        />
      </div>

      <div class="table">
        <el-table
          :data="tableData"
          v-loading="loading"
          header-cell-class-name="table-header-item"
        >
          <el-table-column fixed="left" type="selection" width="55" />

          <el-table-column fixed="left" label="操作" width="80">
            <template slot-scope="scope">
              <el-button @click="toDetail(scope.row.orderNo)" type="text" size="small">
                {{ $text.detail }}
              </el-button>
            </template>
          </el-table-column>

          <el-table-column type="index" label="序号" width="60">
            <template slot-scope="scope">
              <span>
                {{
                  (searchData['page.pageNum'] - 1) *
                    searchData['page.pageSize'] +
                    scope.$index +
                    1
                }}</span
              >
            </template>
          </el-table-column>

          <el-table-column prop="orderNo" label="订单编号" width="200" />

          <el-table-column
              width="150"
              prop="dealerNo"
              label="内部经销商号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              width="150"
              prop="dealerRefNo"
              label="经销商编号"
              show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="dealerName"
            label="经销商名称"
            width="150"
            show-overflow-tooltip
          />

          <el-table-column
              prop="storeNo"
              width="150"
              label="内部门店号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="storeRefNo"
              width="150"
              label="门店编号"
              show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="storeName"
            label="门店名称"
            width="170"
            show-overflow-tooltip
          />

          <el-table-column
            prop="orderItemNames"
            label="商品名称"
            width="300"
            show-overflow-tooltip
          />

          <el-table-column
            prop="orderTime"
            label="创建时间"
            width="160"
            show-overflow-tooltip
          />

          <el-table-column prop="orderStatus" label="订单状态" width="100">
            <template slot-scope="scope">
              <div>
                {{ getOrderStatus(scope.row.orderStatus) }}
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="paymentStatus"
            label="支付状态"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                {{ getPayStatus(scope.row.payStatus) }}
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="orderAmount"
            label="订单金额"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{$amountFormat(scope.row.orderAmount,2)}}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="consumeCouponAmount"
            label="优惠券金额"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{$amountFormat(scope.row.consumeCouponAmount,2)}}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="consumeRebateAmount"
            label="使用返利金额"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{$amountFormat(scope.row.consumeRebateAmount,2)}}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="payAmount"
            label="支付金额"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{$amountFormat(scope.row.payAmount,2)}}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="rebateAmount"
            label="获得返利金额"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{$amountFormat(scope.row.rebateAmount,2)}}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="integrationAmount"
            label="获得积分数量"
            width="160"
            show-overflow-tooltip
          />

          <el-table-column
            prop="epRuleNames"
            label="获得兑换点"
            width="160"
            show-overflow-tooltip
          />

          <el-table-column
            prop="payChannel"
            label="支付方式"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                {{ getPayChannel(scope.row.payChannel) }}
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="orderWithdrawStatus"
            label="提现状态"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                {{getOrderWithdrawStatus(scope.row.orderWithdrawStatus)}}
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="orderRefundTotalQuantity"
            label="退货条数"
            width="120"
            show-overflow-tooltip
          />

          <el-table-column
            prop="orderScanCodeQuantity"
            label="入库条数"
            width="120"
            show-overflow-tooltip
          />
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchData['page.pageNum']"
          :page-sizes="[10, 20, 50, 100, 200]"
          :page-size="searchData['page.pageSize']"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        />
        <el-button type="primary" size="small">{{
          $text.paginationGo
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
@import './index';
</style>
