<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">门店</div>
        <div class="content">
          <el-input v-model="toolBar.name" placeholder="请输入门店名称/门店编号" clearable></el-input>
        </div>
      </div>
      <div>
        <div class="label">审核状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.class.value" placeholder="请选择审核状态">
            <el-option
                v-for="item in toolBar.class.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="listInspectAuditByPage">{{ $text.search }}</el-button>
    </div>
    <div class="table-main inspection-audit-list-table-main">
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
            prop="storeName"
            label="门店名称"
            width="160"
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
            prop="cycleTime"
            label="店检周期"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="created"
            label="上传时间"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="auditStatus"
            label="状态"
            width="120"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['warning', 'success', 'error', 'error'][scope.row.auditStatus]" :message="['待审核', '合格','不合格', '已驳回'][scope.row.auditStatus]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="score"
            label="评分"
            width="80"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="auditName"
            label="审核人"
            width="90"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="auditTime"
            label="审核时间"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="reward"
            label="返利"
            width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>{{scope.row.reward.rebateAmount || 0}}</div>
            </template>
          </el-table-column>

          <el-table-column
            prop="integralAmount"
            label="积分"
            width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>{{scope.row.reward.integralAmount || 0}}</div>
            </template>
          </el-table-column>

          <el-table-column
            prop="exchangeAmount"
            label="兑换点"
            width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>{{scope.row.reward.exchangeAmount || 0}}</div>
            </template>
          </el-table-column>

          <el-table-column
            prop="couponCount"
            label="优惠券"
            width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>{{scope.row.reward.couponCount || 0}}</div>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="toAudit(scope.row)" v-if="scope.row.auditStatus===0">
                {{ $text.approve }}
              </el-button>
              <el-button type="text" size="small" @click="toDetail(scope.row)" v-else>
                {{ $text.detail }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column></el-table-column>
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
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>