<template>
  <el-dialog
    title="配置活动"
    :visible.sync="dialogVisible"
    width="1200px"
    destroy-on-close
    :before-close="handleClose">
    <div class="border-content">
      <el-radio-group style="margin-bottom:20px;" v-model="searchData.categoryType" @change="categoryTypeChange">
        <el-radio-button :label="0">秒杀活动</el-radio-button>
        <el-radio-button :label="1">限时抢购活动</el-radio-button>
        <el-radio-button :label="2">商品组合活动</el-radio-button>
      </el-radio-group>
      <div class="toolbar-box">
        <div>
          <div class="label">搜索条件</div>
          <div class="content">
            <el-input clearable v-model="searchData.promotionName" placeholder="请输入活动名称"></el-input>
          </div>
        </div>
        <el-button type="primary" @click="search">{{ $text.search }}</el-button>
      </div>
      <div class="table-main">
        <div class="table">
          <el-table
            :data="tableData"
            :isLoading="tableLoading"
            max-height="240"
            header-cell-class-name="table-header-item"
            @row-dblclick="rowDblclick"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="80"
            >
            </el-table-column>
            <el-table-column
              prop="promotionRule"
              label="活动名称"
              width="180"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="promotionNo"
              label="活动code"
              width="200"
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
              fixed="right"
              label="操作"
              min-width="80"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="getSelectInfo(scope.row)"
                >
                  {{ $text.select }}
                </el-button>
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