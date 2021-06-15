<template>
  <el-dialog
    title="活动列表"
    :visible.sync="dialogVisible"
    width="1200px"
    destroy-on-close
    :before-close="handleClose">
    <div class="border-content">
      <div class="toolbar-box">
        <div>
          <div class="label">活动名称</div>
          <div class="content">
            <el-input clearable v-model="toolBar.name" placeholder="请输入活动名称" @keyup.native.enter="searchDataPage"></el-input>
          </div>
        </div>
        <div>
          <div class="label">活动code</div>
          <div class="content">
            <el-input clearable v-model="toolBar.code" placeholder="请输入活动code"></el-input>
          </div>
        </div>
        <div>
          <div class="label">活动状态</div>
          <div class="content">
            <el-select clearable v-model="toolBar.status.value" placeholder="请选择">
              <el-option
                  v-for="item in toolBar.status.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <el-button type="primary" @click="searchDataPage">{{ $text.search }}</el-button>
        <el-button type="primary" plain @click="resetTableData">{{ $text.reset }}</el-button>
      </div>
      <div class="table-main">
        <div class="table">
          <el-table
            :data="tableData"
            v-loading="tableLoading"
            max-height="330"
            header-cell-class-name="table-header-item"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="60"
            >
            </el-table-column>
            <el-table-column
                prop="promotionRule"
                label="活动规则名称"
                width="200"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="promotionName"
              label="活动名称"
              width="180"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="startTime"
              label="活动开始时间"
              width="200"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="endTime"
              label="活动结束时间"
              width="200"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="created"
                label="创建时间"
                width="200"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="promotionStatus"
                label="活动状态"
                width="140"
            >
              <template slot-scope="scope">
                <div>
                  <i-status :type="[ 'error', 'success', 'warning'][scope.row.promotionStatus]" :message="['未开始', '进行中', '已结束'][scope.row.promotionStatus]" />
                </div>
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
  </el-dialog>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>