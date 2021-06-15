<template>
  <div class="page">
    <div style="padding: 15px 0 0 15px;font-weight: 500">套餐商品订单详情</div>
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
      </div>
      <div class="table-main rows-more-table">
        <div class="table">
          <el-table
              :data="rowsMoreTableData"
              max-height="330"
              header-cell-class-name="table-header-item"
          >
            <el-table-column
                width="20"
            >
            </el-table-column>
            <el-table-column
                prop="one"
                label="优惠券"
                width="800"
            >
            </el-table-column>
            <el-table-column
                prop="two"
                label="优惠金额"
                width="500"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div style="padding: 15px">获利信息</div>
    <div class="table-main rows-more-table">
      <div class="table">
        <el-table
            :data="rowsMoreTableDataTwo"
            max-height="330"
            header-cell-class-name="table-header-item"
        >
          <el-table-column
              width="20"
          >
          </el-table-column>
          <el-table-column
              prop="one"
              label="获得积分"
              width="500"
          >
          </el-table-column>
          <el-table-column
              prop="two"
              label="获得返利金额"
              width="500"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="three"
              label="获得兑换点"
              width="500"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column>
          </el-table-column>
        </el-table>
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
              fixed="left"
              label="操作"
              width="60"
              align="center"
          >
            <template>
              <el-button
                  type="text"
                  size="small"
              >
                查看
              </el-button>
            </template>
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
              width="60"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="one"
              label="订单价格"
              width="90"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="two"
              label="商品分类"
              width="90"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="three"
              label="商品品牌"
              width="90"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="four"
              label="规格"
              width="90"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="state"
              label="入库状态"
              width="100"
              show-overflow-tooltip
          >
            <template slot-scope="scope">
              <i-status :type="['error', 'success'][scope.row.state]" :message="['未入库', '已入库'][scope.row.state]"/>
            </template>
          </el-table-column>
          <el-table-column
              prop="five"
              label="退货状态"
              width="100"
              show-overflow-tooltip
          >
            <template slot-scope="scope">
              <i-status :type="['error', 'success'][scope.row.state]" :message="['未入库', '已入库'][scope.row.state]"/>
            </template>
          </el-table-column>
          <el-table-column
              prop="six"
              label="获得返利金额（元）"
              width="160"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="seven"
              label="获得积分"
              width="90"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="eight"
              label="使用返利金额（元）"
              width="160"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="nine"
              label="使用优惠券金额（元）"
              width="160"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="ten"
              label="应付金额（元）"
              width="140"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="eleven"
              label="实付金额（元）"
              width="140"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div style="padding: 15px;font-weight: 500">付款单</div>
    <div class="table-main margin-bottom">
      <div class="table">
        <el-table
            :data="tableDataTwo"
            max-height="330"
            header-cell-class-name="table-header-item"
        >
          <el-table-column
              width="5"
          >
          </el-table-column>
          <el-table-column
              prop="index"
              label="编号"
              width="250"
          >
          </el-table-column>
          <el-table-column
              prop="one"
              label="支付单号"
              width="250"
          >
          </el-table-column>
          <el-table-column
              prop="two"
              label="支付平台交易号"
              width="250"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="three"
              label="支付时间"
              width="250"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="four"
              label="支付方式"
              width="250"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="five"
              label="实收金额（元）"
              width="250"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column>
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