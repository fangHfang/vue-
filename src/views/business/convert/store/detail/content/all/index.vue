<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">发生时间</div>
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
      <div>
        <div class="label">发生类型</div>
        <div class="content">
          <el-select clearable v-model="toolBar.type.value" :placeholder="$text.selectPlaceholder">
            <el-option
                v-for="item in toolBar.type.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="listSearchEpStoreDetailByPage">{{ $text.search }}</el-button>
    </div>
    <div class="table-main convert-store-rule-table-main">
      <div class="actionbar">
        <div class="actionbar-left">
          <div>
            <div class="icon iconfont mendian"></div>
            <div>门店名称:</div>
            <!-- <div class="one-font">冻</div> -->
            <div>{{currentRow.storeName}}</div>
          </div>
          <div>
            <div>内部门店code:</div>
            <div>{{currentRow.storeNo}}</div>
          </div>
          <div>
            <div>创建时间</div>
            <div>{{currentRow.created}}</div>
          </div>
        </div>
        <div class="actionbar-right">
          <div>当前可用兑换点</div>
          <div>{{currentRow.amount}}</div>
          <importExport
              :showExport="true"
              :exportUrl="exportUrl"
              :exportGetData="exportGetData"
              exportFileName="门店兑换点规则详情导出"
          />
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
              width="100"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="amount"
              label="兑换点变化"
              width="160"
              align="center"
          >
            <template slot-scope="scope">
              <div>{{scope.row.tradeType === 1 ? "+" : (scope.row.tradeType === 2 && !~(scope.row.amount+'').indexOf('-')) ? "-" : "" }}{{ scope.row.amount }}</div>
            </template>
          </el-table-column>
          <el-table-column
              prop="bizName"
              label="发生类型"
              width="180"
              align="center"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="created"
              label="发生时间"
              width="220"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="tradeNo"
              label="关联订单"
              width="220"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="remark"
              label="备注"
              width="240"
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
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="600px"
        :before-close="handleClose">
      <Form/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">保存</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
