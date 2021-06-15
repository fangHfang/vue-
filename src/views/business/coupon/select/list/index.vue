<template>
  <div class="page">
    <div class="table-main">
      <div class="actionbar" v-show="activeName !== 'third'">
        <el-button type="primary" @click="dialogVisible = true"
          >选择卡券</el-button
        >
        <el-button type="primary" @click="batchDelete">删除卡券</el-button>
      </div>
      <div class="table">
        <el-table
          :data="currentTableData"
          @selection-change="handleSelectionChange"
          header-cell-class-name="table-header-item"
        >
          <el-table-column fixed="left" type="selection" width="55" />

          <el-table-column label="序号" type="index">
            <template slot-scope="scope">
              <span>
                {{
                  (searchData.pageNum - 1) * searchData.pageSize +
                    scope.$index +
                    1
                }}</span
              >
            </template>
          </el-table-column>

          <el-table-column prop="ruleName" label="优惠券名称" />

          <el-table-column prop="discountAmount" label="优惠券金额" />
          <!--<el-table-column-->
            <!--prop="ruleNo"-->
            <!--label="优惠券券码"-->
            <!--show-overflow-tooltip/>-->
          <el-table-column
            prop="type"
           label="优惠券类型"
           width="120"
           show-overflow-tooltip>
            <template slot-scope="scope">
              <i-status :message="['现金优惠', '兑换商品'][scope.row.type]"/>
            </template>
          </el-table-column>
          <el-table-column label="优惠券数量">
            <template slot-scope="scope">
              <span>
                <el-input
                  v-model="scope.row.amount"
                  placeholder="请输入优惠券数量"
                  type="number"
                  clearable
                  min="1"
                  @input="(val)=>changeAmount(val,scope.$index)"
                />
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchData.pageNum"
          :page-sizes="[10, 20, 50, 100, 200]"
          :page-size="searchData.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
        <el-button type="primary" size="small">
          {{ $text.paginationGo }}
        </el-button>
      </div>
      <div class="pagination">
        <el-button size="small" @click="back">上一步</el-button>
        <el-button type="primary" size="small" @click="nextStep">下一步</el-button>
      </div>
    </div>

    <ChooseDialog
      :dialogVisible="dialogVisible"
      @close="dialogVisible = false"
      @selectedRule="selectedRuleEvent"
    />
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import './index';
</style>
