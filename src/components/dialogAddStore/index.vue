<template>
  <el-dialog
    title="添加门店"
    :visible.sync="dialogVisible"
    width="1200px"
    destroy-on-close
    :before-close="handleClose"
  >
    <div class="border-content">
      <div class="toolbar-box">
        <div>
          <div class="label">经销商名称</div>
          <div class="content">
            <dealerSelect @change="dealerChange" ref="dealer"/>
          </div>
        </div>
        <div>
          <div class="label">门店名称</div>
          <div class="content">
            <storeSelect @change="storeChange"/>
          </div>
        </div>
        <el-button type="primary" @click="searchTableData" :loading="loading">{{
          $text.search
        }}</el-button>

      </div>
      <div class="table-main">
        <div class="table">
          <el-table
            v-loading="loading"
            :data="tableData"
            max-height="330"
            @selection-change="handleSelectionChange"
            header-cell-class-name="table-header-item"
          >
            <el-table-column fixed="left" type="selection" width="55">
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="60"
            >
            </el-table-column>
            <el-table-column
                width="180"
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
              label="所属经销商名称"
              width="140"
              show-overflow-tooltip
            >
            </el-table-column>
            <!-- <el-table-column
              prop="dealerTag"
              label="经销商标签"
              width="120"
              show-overflow-tooltip
            >
            </el-table-column> -->
            <el-table-column
                prop="storeNo"
                width="180"
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
              prop="name"
              label="门店名称"
              width="140"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="level"
              label="门店性质"
              width="120"
              show-overflow-tooltip
            >
            </el-table-column>
<!--            2134 【业务管理】【店检管理】店检设置,【配置门店】，添加门店，标签不要了，建议删掉该字段-->
<!--            <el-table-column-->
<!--              prop="labelNames"-->
<!--              label="门店标签"-->
<!--              min-width="120"-->
<!--              show-overflow-tooltip-->
<!--            >-->
<!--            </el-table-column>-->
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="searchData['page.pageNum']"
            :page-sizes="[10, 20, 50, 100, 200]"
            :page-size="searchData['page.pageSize']"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
          <el-button type="primary" size="small">{{
            $text.paginationGo
          }}</el-button>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer flex-center">
      <el-button type="primary" @click="handleAdd" :loading="btnLoading">{{ $text.add }}</el-button>
      <el-button @click="handleClose">{{ $text.cancel }}</el-button>
    </span>
  </el-dialog>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import './index';
</style>
