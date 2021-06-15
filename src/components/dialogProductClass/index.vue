<template>
  <el-dialog
    title="商品分类"
    :visible.sync="dialogVisible"
    width="1200px"
    destroy-on-close
    :before-close="handleClose">
    <div class="border-content">
      <div class="toolbar-box">
        <div>
          <div class="label">关键字</div>
          <div class="content">
            <el-input clearable v-model="searchData.categoryName" placeholder="分类名称"></el-input>
          </div>
        </div>
        <el-button type="primary" @click="search">{{ $text.search }}</el-button>
      </div>
      <div class="table-main">
        <div class="table">
          <el-table
            :data="tableData"
            max-height="240"
            header-cell-class-name="table-header-item"
            @row-dblclick="rowDblclick"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="categoryName"
              label="分类名称"
              width="220"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="categoryLevel"
              label="分类级别"
              width="600"
              align="center"
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
