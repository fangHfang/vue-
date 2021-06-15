<template>
  <div class="page">
    <div style="padding: 15px 0 0 15px;font-weight: 500">秒杀订单详情</div>
    <div style="padding: 15px 0 0 15px;font-weight: 500">基础信息</div>
    <div class="toolbar-box package-product-detail">
      <div>
        <div class="label">门店code</div>
        <div class="content">
          <el-input v-model="toolBar.storeCode" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <el-input v-model="toolBar.storeName" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">经销商名称</div>
        <div class="content">
          <el-input v-model="toolBar.custmoreName" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">经销商编号</div>
        <div class="content">
          <el-input v-model="toolBar.custmoreCode" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">订单编号</div>
        <div class="content">
          <el-input v-model="toolBar.orderCode" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">订单状态</div>
        <div class="content">
          <div class="state-box">
            <i-status :type="['warning', 'success'][toolBar.orderState]" :message="['未完成', '已完成'][toolBar.orderState]"/>
          </div>
        </div>
      </div>
      <div>
        <div class="label">订货时间</div>
        <div class="content">
          <el-input v-model="toolBar.orderDate" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">支付状态</div>
        <div class="content">
          <div class="state-box">
            <i-status :type="['warning', 'success'][toolBar.payState]" :message="['未支付', '已支付'][toolBar.orderState]"/>
          </div>
        </div>
      </div>
      <div>
        <div class="label">门店地址</div>
        <div class="content">
          <el-input v-model="toolBar.storeAddress" readonly></el-input>
        </div>
      </div>
    </div>
    <div style="padding: 15px 0 0 15px">支付信息</div>
    <div class="toolbar-box package-product-detail-center">
      <div>
        <div class="label">支付总额</div>
        <div class="content">
          <el-input v-model="toolBar.payCount" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">优惠券总优惠额</div>
        <div class="content">
          <el-input v-model="toolBar.discountCount" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">返利总金额</div>
        <div class="content">
          <el-input v-model="toolBar.rebateCount" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">支付金额</div>
        <div class="content">
          <el-input v-model="toolBar.money" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">支付方式</div>
        <div class="content">
          <el-input v-model="toolBar.paymentState" readonly></el-input>
        </div>
      </div>
      <div class="rows-more">
        <div class="label">使用优惠券</div>
        <div class="content">
          <el-input v-model="toolBar.discountOne" readonly></el-input>
          <el-input v-model="toolBar.discountTwo" readonly></el-input>
          <el-input v-model="toolBar.discountThree" readonly></el-input>
        </div>
        <div class="content">
          <el-input v-model="toolBar.discount" readonly></el-input>
          <el-input v-model="toolBar.discount" readonly></el-input>
          <el-input v-model="toolBar.discount" readonly></el-input>
        </div>
      </div>
    </div>
    <div class="table-top-font">
      <div>商品信息</div>
      <div @click="tableFontClick">{{ tableDetailShow ? '收起' : '展开' }}
        <div :class="tableDetailShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></div>
      </div>
    </div>
    <div class="table-main" v-show="tableDetailShow">
      <div class="table">
        <el-table
            :data="tableData"
            max-height="330"
            header-cell-class-name="table-header-item"
        >
          <el-table-column
              prop="index"
              label="序号"
              width="60"
          >
          </el-table-column>
          <el-table-column
              prop="name"
              label="商品名称"
              width="300"
          >
          </el-table-column>
          <el-table-column
              prop="number"
              label="数量"
              width="100"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="one"
              label="秒杀价格（元）"
              width="140"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="two"
              label="商品分类"
              width="100"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="three"
              label="品牌"
              width="100"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="four"
              label="规格"
              width="140"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="state"
              label="入库状态"
              width="120"
              show-overflow-tooltip
          >
            <template slot-scope="scope">
              <i-status :type="['error', 'success'][scope.row.state]" :message="['未入库', '已入库'][scope.row.state]"/>
            </template>
          </el-table-column>
          <el-table-column
              prop="six"
              label="返利金额（元）"
              width="140"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="seven"
              label="优惠券金额（元）"
              width="140"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="eight"
              label="实收金额（元）"
              show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
<style>
  .package-product-detail .el-input .el-input__inner,
  .package-product-detail-center .el-input .el-input__inner {
    border: none;
    color: #000;
  }

  .state-box .i-status div.success {
    margin-top: 5px;
  }
</style>