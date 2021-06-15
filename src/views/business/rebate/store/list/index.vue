<template>
  <div class="page">
    <div class="toolbar-box convert-store-rule-tool">
      <div>
        <div class="label">门店名称</div>
        <div class="content">
            <storeSelect @change="storeChange" ref="store"/>
        </div>
      </div>
      <div>
        <div class="label">经销商名称</div>
        <div class="content">
          <dealerSelect @change="dealerChange" ref="dealer"/>
        </div>
      </div>
      <div>
        <div class="label">导出时间</div>
        <div class="content">
          <el-date-picker
            v-model="toolBar.dataRange"
            type="daterange"
            range-separator="~"
            value-format="yyyy-MM-dd"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <!--<div>-->
        <!--<div class="label">月份</div>-->
        <!--<div class="content">-->
           <!--<el-date-picker-->
            <!--v-model="toolBar.monthDate"-->
            <!--type="month"-->
            <!--placeholder="选择月"-->
            <!--value-format="yyyy-MM-dd"-->
          <!--/>-->
        <!--</div>-->
      <!--</div>-->
      <el-button type="primary" @click="searchRebateStoreListByPage">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="reset">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <importExport
            :showExport="permission.includes('ZBPCC01050201')"
            :exportUrl="exportUrl"
            :exportGetData="exportGetData"
            exportFileName="门店返利导出"
            postMethod="get"
        />
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          header-cell-class-name="table-header-item"
          v-loading="tableLoading"
          @selection-change="handleSelectionChange"
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
            width="200"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="toDetail(scope.row.customerNo,scope.row.debitNo)"
              >
               查看详情
              </el-button>
              <el-button
                type="text"
                size="small"
                v-if="scope.row.status == '冻结' &&permission.includes('ZBPCC01050203')"
                @click="unfreezeRebate(scope.row.customerNo,scope.row.debitNo)"
              >
                解冻门店
              </el-button>
              <el-button
                type="text"
                size="small"
                v-if="scope.row.status == '有效' &&permission.includes('ZBPCC01050204')"
                @click="freezeRebate(scope.row.customerNo,scope.row.debitNo)"
              >
                冻结门店
              </el-button>
               <el-button
                  type="text"
                   size="small"
                    v-if="permission.includes('ZBPCC01050202')"
                   @click="rebateAdjustment(scope.row.customerNo,scope.row.debitNo,scope.row.availableAmount,scope.row.storeName)"
                   >
                   返利调整
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
              width="200"
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
            width="220"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
              prop="storeNo"
              width="200"
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
            width="220"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="storeLabelNames"
            label="门店标签名称"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="availableAmount"
              label="当前可用返利"
              width="120"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="100"
          >
            <template slot-scope="scope">
              <div class="i-status">
                <div :class="[scope.row.status === '有效' ? 'success' : 'error']"></div>
                <p>{{scope.row.status}}</p>
              </div>
            </template>
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
    <el-dialog
      title="返利调整"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="handleClose">
         <div class="del-form">
            <el-form :model="form" ref="form" label-width="80px">
              <el-form-item label="门店名称" prop="storeName">
                <el-input disabled v-model="form.storeName"></el-input>
              </el-form-item>
               <el-form-item label="门店编号" prop="customerNo">
                 <el-input disabled v-model="form.customerNo"></el-input>
               </el-form-item>
               <el-form-item label="当前可用返利" prop="availableAmount">
                  <el-input disabled v-model="form.availableAmount"></el-input>
               </el-form-item>
               <el-form-item>
                <el-radio v-model="form.redio" label="1">增加</el-radio>
                    <el-radio v-model="form.redio" label="2">减少</el-radio>
                </el-form-item>
                 <el-form-item>
                        <el-input clearable v-model="form.amount" :placeholder="$text.inputPlaceholder" type="number">
                          <template slot="append"><div style="color: #000;">返利</div></template>
                        </el-input>
                </el-form-item>
              <el-form-item label="备注" prop="remarks">
                <el-input type="textarea" resize="none" :rows="3" v-model="form.remarks"></el-input>
              </el-form-item>
            </el-form>
          </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$text.cancel}}</el-button>
        <el-button type="primary" :loading='btnLoading' @click="submitForm">{{$text.confirm}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
