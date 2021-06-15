<template>
  <div class="page">
    <div class="page-content" style="padding-bottom: 0;">
      <h3 class="page-name">对账单</h3>
      <div class="toolbar-box down-store-info-list-toolbar flex" style="background: #fff;">
        <div style="width: 100%">
          <div class="label">生成订单时间</div>
          <div class="flex">
              <div class="content">
                <el-date-picker
                        v-model="toolBar.date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
              </div>
          </div>
        </div>

      </div>
      <div class="toolbar-box down-store-info-list-toolbar">
        <div>
          <div class="label">按单号查找</div>
          <div class="content">
            <el-input clearable v-model="postData.accordingNo" placeholder="请输入对账单号/结算单号"></el-input>
          </div>
        </div>
        <div>
          <div class="label">门店编号</div>
          <div class="content">
                      <!--<storeSelect @change="storeChange" ref="store"/>-->

             <el-input clearable v-model="postData.storeNo" placeholder="请输入门店编号"></el-input>
          </div>
        </div>
        <div>
          <div class="label">记账方式</div>
          <div class="content">
            <el-select clearable v-model="toolBar.bookkeep.value" :placeholder="$text.selectPlaceholder">
              <el-option
                      v-for="item in toolBar.bookkeep.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div>
          <div class="label">处理状态</div>
          <div class="content">
            <el-select clearable v-model="toolBar.mode.value" :placeholder="$text.selectPlaceholder">
              <el-option
                      v-for="item in toolBar.mode.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div>
          <div class="label">交易类型</div>
          <div class="content">
            <el-select clearable v-model="toolBar.check.value" :placeholder="$text.selectPlaceholder">
              <el-option
                      v-for="item in toolBar.check.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <el-button type="primary" @click="searchDealerListByPage">{{ $text.search }}</el-button>
        <el-button type="primary" @click="clearData" plain>{{ $text.reset }}</el-button>
      </div>
      <div class="table-main">
        <!-- <div class="actionbar">
          <el-button type="primary">客户期初账导入</el-button>
          <el-button type="primary">打印</el-button>
        <importExport
            :showExport="true"
        />
        </div> -->
        <div class="table">
          <el-table
                  :data="tableData"
                  v-loading="tableLoading"
                  @selection-change="handleSelectionChange"
                  header-cell-class-name="table-header-item"
          >
            <el-table-column
                    fixed="left"
                    type="selection"
                    width="55"
            >
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="60"
            >
            </el-table-column>
            <el-table-column
              width="150"
              prop="dealerNo"
              label="经销商编号"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              width="150"
              prop="dealerName"
              label="经销商名称"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="accountDiffNo"
              label="单据编号"
              show-overflow-tooltip
              width="170"
            >
            </el-table-column>
            <el-table-column
              prop="checkAccountStatus"
              label="处理状态"
              show-overflow-tooltip
              width="120"
            >
              <template slot-scope="scope">
                <div>
                  <i-status :type="['warning', 'success','error'][scope.row.checkAccountStatus]" :message="['未处理','正常', '异常'][scope.row.checkAccountStatus]" />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="storeNo"
              width="150"
              label="门店编号"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="storeName"
              label="门店名称"
              show-overflow-tooltip
              width="170"
            >
            </el-table-column>
            <el-table-column
              prop="created"
              label="生成订单时间"
              width="160"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="keepAccountsType"
              label="记账方式"
              width="160"
              show-overflow-tooltip
            >
            <template slot-scope="scope">
               {{ ['转入', '转出'][scope.row.keepAccountsType] }}
            </template>
            </el-table-column>
            <el-table-column
              prop="tradeType"
              label="交易类型"
              width="160"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
               {{ ['','支付', '退款','提现'][scope.row.tradeType] }}
            </template>
            </el-table-column>
            <el-table-column
              prop="orderAmount"
              label="订单金额（元）"
              show-overflow-tooltip
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="fee"
              label="手续费（元）"
              show-overflow-tooltip
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="bankOrderAmount"
              label="入账金额（元）"
              show-overflow-tooltip
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="trxNo"
              label="支付流水号"
              width="160"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="orderPayAmount"
              label="金额（元）"
              width="120"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column>
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
          <el-button type="primary" size="small">{{ $text.paginationGo }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>