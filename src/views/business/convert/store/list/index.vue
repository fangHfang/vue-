<template>
  <div class="page">
    <div class="toolbar-box convert-store-rule-tool">
      <div>
        <div class="label">经销商名称</div>
        <div class="content">
          <dealerSelect @change="dealerChange" ref="dealer"/>
        </div>
      </div>

      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <storeSelect @change="storeChange" ref="store"/>
        </div>
      </div>
      <div>
        <div class="label">兑换点规则</div>
        <div class="content">
          <el-select clearable v-model="toolBar.epRule.value" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.epRule.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="resetTableData">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <importExport
            :showExport="permission.includes('ZBPCC01060201')"
            :exportUrl="exportUrl"
            :exportGetData="exportGetData"
            exportFileName="门店兑换点规则导出"
        />
        <el-button type="primary" @click="adjustExchangePoint" v-if="permission.includes('ZBPCC01060202')" style="margin-left: 15px">兑换点调整</el-button>
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
            width="140"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="toDetail(scope.row)"
              >
               查看详情
              </el-button>
              <el-button
                type="text"
                size="small"
                v-if="scope.row.status === 0 && permission.includes('ZBPCC01060203')"
                @click="unfreeze(scope.row.id)"
              >
                解冻门店
              </el-button>
                 <el-button
                type="text"
                size="small"
                v-if="scope.row.status === 1 && permission.includes('ZBPCC01060204')"
                @click="freeze4Batch(scope.row.id)"
              >
                冻结门店
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
            width="180"
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
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="epRuleName"
              label="兑换点规则"
              width="160"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="amount"
              label="当前可用兑换点"
              width="160"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="100"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['error','success'][scope.row.status]" :message="['冻结', '有效'][scope.row.status]" />
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
      title="兑换点调整"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose">
      <div class="del-form">
        <el-form :model="epForm" :rules="epRules" ref="epForm" label-width="80px">
          <el-form-item label="门店名称" prop="storeName">
            <el-input disabled v-model="epForm.storeName" />
          </el-form-item>
          <el-form-item label="门店编号" prop="storeNo">
            <el-input disabled v-model="epForm.storeNo" />
          </el-form-item>
          <el-form-item label="当前可用兑换点" prop="storeAmount">
            <el-input disabled v-model="epForm.storeAmount" />
          </el-form-item>
          <el-form-item label="兑换点调整类型">
            <el-radio v-model="epForm.type" label="1">增加</el-radio>
            <el-radio v-model="epForm.type" label="0">减少</el-radio>
          </el-form-item>
          <el-form-item label="兑换点">
            <el-input clearable v-model="epForm.amount" placeholder="请输入兑换点" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input clearable type="textarea" resize="none" rows="3" v-model="epForm.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEpStoreDialog">{{$text.cancel}}</el-button>
        <el-button type="primary" :loading ='btnLoading' @click="btnLoading = true;$throttle(submitForm)">{{$text.confirm}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>