<template>
  <div class="page">
    <div style="padding: 15px 0 15px 15px;font-weight: bold">{{name}}额度记录</div>
    <div class="toolbar-box down-store-info-list-toolbar">
      <div>
        <div class="label">查找单号</div>
        <div class="content">
          <el-input clearable v-model="toolBar.oddNumbers" placeholder="请输入"></el-input>
        </div>
      </div>
      <div>
        <div class="label">使用人</div>
        <div class="content">
          <el-input clearable v-model="toolBar.operatorName" placeholder="请输入"></el-input>
        </div>
      </div>
      <div>
        <div class="label">时间筛选</div>
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
      <el-button type="primary" @click="listStoreByPage">{{$text.search}}</el-button>
      <el-button type="primary" @click="cleanSearch" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <importExport
            :showExport="permission.includes('ZBPCC01020207')"
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
            type="index"
            label="序号"
            width="60"
          >
          </el-table-column>

          <el-table-column
            prop="refNo"
            label="单号"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="typeDescription"
            label="发生类型"
            width="140"
          >
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
            label="关联人"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="amount"
            label="发生金额"
            width="140"
          >
            <template slot-scope="scope">
              <div>
                <span :class="[scope.row.amount > 0 ? 'red' : 'green']">{{scope.row.amount}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="availableAmount"
            label="结存可用额度"
            width="140"
          >
            <template slot-scope="scope">
              <div>
                <span :class="[scope.row.availableAmount > 0 ? 'red' : 'green']">{{scope.row.availableAmount}}</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column
              prop="remarks"
              label="备注"
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
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>