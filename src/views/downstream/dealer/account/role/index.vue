<template>
  <div class="role-config-dialog">
    <div class="toolbar-box dialog-box">
      <div>
        <div class="label">检索角色</div>
        <div class="content">
          <el-input clearable v-model="toolBar.name" placeholder="检索角色"></el-input>
        </div>
      </div>
      <el-button type="primary" @click="searchRoleListByPage">{{ $text.search }}</el-button>
      <el-button type="primary" @click="confirmSelection">{{ $text.confirm }}</el-button>
    </div>
    <div class="table-main">
      <div class="table">
        <el-table
            ref="multipleDealerRoleTable"
            :data="tableData"
            header-cell-class-name="table-header-item"
            v-loading="tableLoading"
            @selection-change="handleSelectionChange"
        >
          <el-table-column
              type="selection">
          </el-table-column>
          <el-table-column
              prop="index"
              label="序号"
              width="300"
          >
          </el-table-column>
          <el-table-column
              prop="name"
              label="角色"
              width="300"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="jurisdiction"
              label="权限"
              width="300"
              align="right"
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
        <el-button type="primary" size="small">GO</el-button>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
<style>
  .el-dialog .el-dialog__body{
    border-top: 1px solid #eee;
  }
</style>