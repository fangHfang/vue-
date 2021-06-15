<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">发生时间</div>
        <div class="content">
          <el-date-picker
              v-model="toolBar.accountTime"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
      </div>
      <div>
        <div class="label">发生类型</div>
        <div class="content">
          <el-select clearable v-model="toolBar.class.code" :placeholder="$text.selectPlaceholder">
            <el-option
                v-for="item in toolBar.class.options"
                :key="item.code"
                :label="item.name"
                :value="item.code">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="searchDetailListByPage">{{ $text.search }}</el-button>
    </div>
    <div class="table-main convert-store-rule-table-main">
      <div class="actionbar">
        <div class="actionbar-left">
          <div>
            <div class="icon iconfont mendian"></div>
            <div>门店名称:</div>
            <!-- <div class="one-font"></div> -->
            <div>{{ detail.customerName }}</div>
          </div>
          <div>
            <div>门店code:</div>
            <div>{{ detail.customerNo }}</div>
          </div>
          <div>
            <div>门店创建时间</div>
            <div>{{ detail.created }} </div>
          </div>
        </div>
        <div class="actionbar-right">
          <div>当前可用返利</div>
          <div>{{ detail.availableAmount }}</div>
          <el-button type="primary">{{ $text.export }}</el-button>
        </div>
      </div>
      <div class="table">
        <el-table
            :data="tableData"
            header-cell-class-name="table-header-item"
        >
          <el-table-column
              type="index"
              label="序号"
              width="180"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="amount"
              label="返利变化"
              width="200"
              align="center"
              show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.type === 2">-</span>
              <span v-else-if="scope.row.type === 1">+</span>
              <span v-else></span>
              {{scope.row.amount}}
            </template>
          </el-table-column>
          <el-table-column
              prop="typeDescription"
              label="发生类型"
              width="180"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="accountTime"
              label="发生时间"
              width="240"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="four"
              label="关联订单"
              width="180"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="remarks"
              label="备注"
              width="180"
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