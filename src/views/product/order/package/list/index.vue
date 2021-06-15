<template>
  <div class="page">
    <div class="toolbar-box order-list-toolbar">
      <div>
        <div class="label">查找订单</div>
        <div class="content">
          <el-input v-model="toolBar.order" placeholder="请输入订单号"></el-input>
        </div>
      </div>
      <div>
        <div class="label">支付方式</div>
        <div class="content">
          <el-select clearable v-model="toolBar.class.value" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.class.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">支付状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.spec.value" :placeholder="$text.selectPlaceholder">
            <el-option
                v-for="item in toolBar.spec.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <el-input v-model="toolBar.store" placeholder="请输入门店code/门店名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">订单状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.tag.value" :placeholder="$text.selectPlaceholder">
            <el-option
                v-for="item in toolBar.tag.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">订单生成时间</div>
        <div class="content">
          <el-date-picker
              v-model="value"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
      </div>
      <el-button type="primary">{{ $text.search }}</el-button>
      <el-button type="primary" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <importExport
            :showExport="true"
        />
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          header-cell-class-name="table-header-item"
        >
          <el-table-column
            fixed="left"
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            fixed="left"
            label="操作"
            width="60"
          >
            <template>
              <el-button
                type="text"
                size="small"
                @click="detailClick"
              >
                {{ $text.detail }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="60"
          >
          </el-table-column>
          <el-table-column
            prop="orderId"
            label="订单编号"
            width="170"
          >
          </el-table-column>
          <el-table-column
            prop="custmoreCode"
            label="内部经销商号"
            width="160"
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
            prop="custmoreName"
            label="经销商名称"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
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
            width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="productName"
            label="商品名称"
            width="300"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="orderDate"
              label="订单生成时间"
              width="180"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="orderState"
            label="订单状态"
            width="160"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['warning', 'success'][scope.row.orderState]" :message="['已取消','待付款','待收货/未收货','待收货/部分收货','已完成/强制收货','已完成/确定收货'][scope.row.orderState]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
              prop="paymentState"
              label="支付状态"
              width="110"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['error', 'success'][scope.row.paymentState]" :message="['未支付', '已支付'][scope.row.paymentState]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderMoney"
            label="订单金额"
            width="110"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="couponMoney"
              label="优惠券金额"
              width="110"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="moneyRebate"
              label="使用返利金额"
              width="110"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="paymentMoney"
              label="支付金额"
              width="110"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="getMoney"
              label="获得返利金额"
              width="110"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="getNember"
              label="获得积分数量"
              width="110"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="getyyy"
            label="获得兑换点"
            width="220"
            show-overflow-tooltip
        >
        </el-table-column>
          <el-table-column
              prop="payment"
              label="支付方式"
              width="110"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="getMoneyState"
              label="提现状态"
              width="110"
          >
            <template slot-scope="scope">
              <div>
                <i-status :style="scope.row.getMoneyState == 4 ? 'display:none' : '' " :type="['warning','error', 'success'][scope.row.getMoneyState]" :message="['不可提现', '可提现', '提现完成'][scope.row.getMoneyState]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
              prop="none"
              label="退货条数"
              width="110"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="put"
              label="入库条数"
              width="110"
              show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.current"
          :page-sizes="pagination.sizes"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>