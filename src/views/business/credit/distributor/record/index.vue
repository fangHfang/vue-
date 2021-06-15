<template>
  <div class="page">
    <div class="toolbar-box down-store-info-list-toolbar">
      <div>
        <div class="label">发生时间</div>
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
      <div>
        <div class="label">操作人</div>
        <div class="content">
          <el-input v-model="toolBar.userName" placeholder="请输入操作人名称"></el-input>
        </div>
      </div>
      <el-button type="primary" @click="listStoreByPageList">{{$text.search}}</el-button>
      <el-button type="primary" @click="cleanSearch" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar toolbar-box down-store-info-list-toolbar">
        <div>
          <div class="label">经销商名称</div>
          <div class="content">
            <el-input v-model="toolBar.name" readonly></el-input>
          </div>
        </div>
        <div>
          <div class="label">经销商code</div>
          <div class="content">
            <el-input v-model="toolBar.customerNo" readonly></el-input>
          </div>
        </div>
        <div>
          <div class="label">经销商创建时间</div>
          <div class="content">
            <el-date-picker
                    v-model="toolBar.created"
                    type="datetime"
                    placeholder="选择日期时间"
                    clear-icon
                    readonly>
            </el-date-picker>
          </div>
        </div>
        <div>
          <div class="label">当前总授信上限</div>
          <div class="content">
            <el-input v-model="toolBar.lineCredit" readonly></el-input>
          </div>
        </div>
        <div>
          <div class="label">下游已分配授信</div>
          <div class="content">
            <el-input v-model="toolBar.allocatedLineCredit" readonly></el-input>
          </div>
        </div>
        <div>
          <div class="label">下游可分配授信</div>
          <div class="content">
            <el-input v-model="toolBar.distributableLineCredit" readonly></el-input>
          </div>
        </div>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          header-cell-class-name="table-header-item"
          v-loading="tableLoading"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="index"
            label="序号"
            width="60"
          >
          </el-table-column>
          <el-table-column
                  prop="amount"
                  label="总授信上限变化"
                  width="140"
          >
            <template slot-scope="scope">
              <div>{{scope.row.type === 1 ? '+' : scope.row.type === 2 ? '-' : ''}}{{scope.row.amount}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="accountTime"
            label="发生时间"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="userName"
            label="操作人"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="createBy"
            label="操作账号"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="availableAmount"
            label="结存可用授信"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="remarks"
              label="备注"
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
      <div class="item-row item-button r-i-l-t-add-btn">
        <el-button type="primary" plain @click="back">{{ $text.return }}</el-button>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>