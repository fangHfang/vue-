<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">查找退单</div>
        <div class="content">
          <el-input
            v-model="searchData.orderRefundNo"
            placeholder="请输入订单号"
            clearable
          />
        </div>
      </div>

      <div>
        <div class="label">创建时间</div>
        <div class="content">
          <el-date-picker
            v-model="searchData.orderRefundApplyTime"
            clearable
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
      </div>

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

      <el-button type="primary" :loading="loading" @click="searchTableData">
        {{ $text.search }}
      </el-button>

      <el-button type="primary" plain @click="resetSearchData">
        {{ $text.reset }}
      </el-button>
    </div>

    <div class="table-main">
      <div class="actionbar">
        <importExport
            :showExport="permission.includes('ZBPCD01020201')"
        />
      </div>
      <div class="table">
        <el-table
          v-loading="loading"
          :data="tableData"
          header-cell-class-name="table-header-item"
        >
          <el-table-column fixed="left" type="selection" width="55" />

          <el-table-column fixed="left" label="操作" width="80">
            <template slot-scope="scope">
              <el-button
                @click="toDetail(scope.row.orderRefundNo)"
                type="text"
                size="small"
              >
                {{ $text.detail }}
              </el-button>
            </template>
          </el-table-column>

          <el-table-column type="index" label="序号" width="60">
            <template slot-scope="scope">
              <span>
                {{
                  (searchData.pageReq.pageNum - 1) *
                    searchData.pageReq.pageSize +
                    scope.$index +
                    1
                }}
              </span>
            </template>
          </el-table-column>

          <el-table-column
              prop="orderRefundNo"
              label="退货单号"
              width="200"
              show-overflow-tooltip
          />
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
            width="180"
            label="所属经销商"
            show-overflow-tooltip
          />

          <el-table-column
            prop="storeName"
            label="门店名称"
            show-overflow-tooltip
            width="180"
          />
          <el-table-column
              prop="storeNo"
              width="200"
              label="内部门店号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="storeRefNo"
              width="100"
              label="门店编号"
              show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="orderRefundApplyTime"
            label="生成时间"
            show-overflow-tooltip
            width="180"
          />

          <el-table-column
            prop="orderRefundAmount"
            label="退款金额"
            width="100"
            show-overflow-tooltip
          />

          <el-table-column
            prop="orderRefundQuantity"
            label="退货条数"
            width="100"
            show-overflow-tooltip
          />
        </el-table>
      </div>

      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchData.pageReq.pageNum"
          :page-sizes="[10, 20, 50, 100, 200]"
          :page-size="searchData.pageReq.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>

        <el-button type="primary" size="small">
          {{ $text.paginationGo }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
@import './index';
</style>
