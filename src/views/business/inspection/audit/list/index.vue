<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">规则名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.name" placeholder="请输入规则名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.class.value" placeholder="状态">
            <el-option
              v-for="item in toolBar.class.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
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
            prop="inspectName"
            label="店检规则名称"
            width="200"
          >
          </el-table-column>
          <el-table-column
            prop="cycleTime"
            label="店检周期"
            width="170"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="店检状态"
            width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['warning','success','error'][scope.row.status]" :message="['停用', '开始','结束'][scope.row.status]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="joinCount"
            label="参与门店数量"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="auditCount"
            label="待审核门店数量"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              label="操作"
              width="80"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="toDetail(scope.row.inspectNo,scope.row.cycleNo)"
              >
                {{ $text.check }}
              </el-button>
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
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>