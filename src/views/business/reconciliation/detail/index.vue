<template>
  <div class="page">
    <div class="toolbar-box repository-info-list-toolbar">
      <div>
        <div class="label">成品代号</div>
        <div class="content">
          <el-input v-model="toolBar.productCode" clearable placeholder="请输入成品代号"/>
        </div>
      </div>
      <div>
      <div class="label">产品规格</div>
        <div class="content">
          <el-input v-model="toolBar.spec" clearable placeholder="请输入产品规格"/>
        </div>
      </div>
      <div>
        <div class="label">产品品牌</div>
        <div class="content">
          <el-input v-model="toolBar.brandName" clearable placeholder="请输入产品品牌"/>
        </div>
      </div>
      <div>
        <div class="label">产品尺寸</div>
        <div class="content">
          <el-input v-model="toolBar.productSize" clearable placeholder="请输入产品尺寸"/>
        </div>
      </div>
      <div>
        <div class="label">产品花纹</div>
        <div class="content">
          <el-input v-model="toolBar.tread" clearable placeholder="请输入产品花纹"/>
        </div>
      </div>
      <div>
        <div class="label">状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.status.value" placeholder="请选择状态">
            <el-option
                v-for="item in toolBar.status.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>

      <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
      <el-button type="primary" @click="reset">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar spec">
        <div class="left-box">
          <div>
            <div class="label">门店名称：</div>
            <div class="content">{{currentRow.customerName}}</div>
          </div>
          <div>
            <div class="label">门店code：</div>
            <div class="content">{{currentRow.customerNo}}</div>
          </div>
          <div>
            <div class="label">业务信息：</div>
            <div class="content">{{currentRow.remark}}</div>
          </div>
          <div>
            <div class="label">时间：</div>
            <div class="content">{{currentRow.date}}</div>
          </div>
        </div>
        <importExport
            :showExport="true"
        />
      </div>
      <div class="table">
        <el-table
            :data="tableData"
            header-cell-class-name="table-header-item"
            v-loading="tableLoading"
        >
          <el-table-column
              type="index"
              label="序号"
              width="60"
          >
          </el-table-column>
          <el-table-column
              prop="productCode"
              label="成品代号"
              width="150"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="spec"
              label="规格"
              width="150"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="brandCode"
              label="品牌"
              width="150"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="productSize"
              label="尺寸"
              width="150"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="tread"
              label="花纹"
              width="150"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="itAmount"
              label="积分数值"
              width="150"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="rbAmount"
              label="返利数值"
              width="150"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="epAmount"
              label="兑换点数值"
              width="150"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="status"
              label="状态"
              min-width="150"
              show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status===0">无效</span>
              <span v-if="scope.row.status===1">有效</span>
            </template>
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
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>