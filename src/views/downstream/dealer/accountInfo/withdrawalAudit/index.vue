<template>
  <div class="page">
    <div class="page-content" style="padding: 0;">
      <div class="flex-start" style="padding: 0 15px;">
        <h3 class="page-name">提现审核</h3>
      </div>
      <div class="toolbar-box" style="padding-left: 15px;">
        <el-form :model="form" ref="form" class="store-info-add-form" label-width="200px">
          <div class="item-box detail-toolbar">
            <h4 class="item-title">账户信息</h4>
            <div class="del-form">
              <div class="item-row">
                <el-form-item label="经销商名称">
                  <el-input v-model="form.name" placeholder="" readonly></el-input>
                </el-form-item>
                <el-form-item label="电话">
                  <el-input v-model="form.contactPhone" placeholder="" readonly></el-input>
                </el-form-item>
                <el-form-item label="商户编号">
                  <el-input v-model="form.dealerNo" placeholder="" readonly ></el-input>
                </el-form-item>
                <el-form-item label="开户银行">
                  <el-input v-model="form.bankBranch" placeholder="" readonly></el-input>
                </el-form-item>
              </div>
              <div class="item-row">
                <el-form-item label="银行卡号">
                  <el-input v-model="form.bankCardNumber" placeholder="" readonly></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="item-box detail-toolbar">
            <div class="flex-start item-title">
              <h4>账户详情</h4>
              <span>到账信息为T+1，即工作日隔天到账</span>
            </div>
            <div class="del-form">
              <div class="item-row">
                <el-form-item label="账户余额">
                  <span>{{$amountFormat(availableAmount,2)}}</span>
                  <span>(元)</span>
                </el-form-item>
                <el-form-item label="锁定现金额">
                  <span>{{$amountFormat(otherAmount.lockedAmount,2)}}</span>
                  <span>(元)</span>
                </el-form-item>
                <el-form-item label="审核中金额">
                  <span>{{$amountFormat(otherAmount.reviewAmount,2)}}</span>
                  <span>(元)</span>
                </el-form-item>
                <el-form-item label="可提现金额">
                  <span>{{$amountFormat(otherAmount.withdrawAmount,2)}}</span>
                  <span>(元)</span>
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="item-box detail-toolbar">
            <h4 class="item-title">申请详情</h4>
            <div class="del-form">
              <div class="item-row">
                <el-form-item label="今日过审金额">
                  <span>{{$amountFormat(otherAmount.todayAmount,2)}}</span>
                  <span>(元)</span>
                </el-form-item>
                <el-form-item label="历史总到账">
                  <span>{{$amountFormat(otherAmount.historicalAmount,2)}}</span>
                  <span>(元)</span>
                </el-form-item>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <div class="table-main" style="padding: 0 15px;">
        <div class="actionbar" v-show="activeName !== 'third'">
          <el-button type="primary" @click="batchToVerify(2)">全部{{ $text.pass }}</el-button>
          <el-button type="primary" @click="batchToVerify(3)">全部{{ $text.refuse }}</el-button>
        </div>
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
              fixed="left"
              label="操作"
              width="140"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="toVerify(scope.row.orderWithdrawNo,2)"
                >
                  {{ $text.pass }}
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="toVerify(scope.row.orderWithdrawNo,3)"
                >
                  {{ $text.refuse }}
                </el-button>
                <!--<el-button-->
                  <!--type="text"-->
                  <!--size="small"-->
                  <!--@click="toDeatil(scope.row.orderWithdrawNo)"-->
                <!--&gt;-->
                  <!--{{ $text.detail }}-->
                <!--</el-button>-->
              </template>
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              width="60"
            >
            </el-table-column>

            <el-table-column
              prop="orderWithdrawNo"
              label="单据编号"
              width="160"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="dealerMerchantNo"
              label="商户编号"
              show-overflow-tooltip
              width="170"
            >
            </el-table-column>
            <el-table-column
              prop="applyName"
              label="申请人"
              show-overflow-tooltip
              width="170"
            >
            </el-table-column>
            <el-table-column
              prop="orderWithdrawAmount"
              label="提现金额(元)"
              width="160"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="orderWithdrawQuantity"
              label="关联订单数"
              width="160"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="toOrder(scope.row)"
                >
                  {{ scope.row.orderWithdrawQuantity }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="orderWithdrawStatus"
              label="审核状态"
              width="160"
            >
              <template slot-scope="scope">
                <div>
                   {{['无法提现', '待提现', '提现中', '提现驳回','提现审核通过','提现完成','提现冻结'][scope.row.orderWithdrawStatus]}}

                  <!-- <i-status :type="['warning','warning', 'warning', 'error'][scope.row.orderWithdrawStatus]" :message="['待审核', '待审核', '待审核', '已拒绝'][scope.row.orderWithdrawStatus]" /> -->
                </div>
              </template>
            </el-table-column>

            <el-table-column
              prop="orderWithdrawApplyTime"
              label="申请时间"
              width="160"
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