<template>
  <div class="page">
<!--    <div class="toolbar-box">-->
<!--      <div>-->
<!--        <div class="label">产品代号</div>-->
<!--        <div class="content">-->
<!--          <el-input clearable v-model="toolBar.name" placeholder="产品代号"></el-input>-->
<!--        </div>-->
<!--      </div>-->
<!--      <el-button type="primary" @click="searchProductListByPage">{{ $text.search }}</el-button>-->
<!--    </div>-->
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" @click="listProductByPage"
 v-if="permission.includes('ZBPCA01040103')">刷新</el-button>
        <importExport
          :showImport="permission.includes('ZBPCA01040101')"
          :showExport="permission.includes('ZBPCA01040102')"
          :importUrl="importUrl"
          :exportUrl="exportUrl"
          :exportGetData="exportGetData"
          exportFileName="基础产品导出"
          @refreshTableData="listProductByPage"
        />
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          v-loading="tableLoading"
          header-cell-class-name="table-header-item"
        >
          <el-table-column
            fixed="left"
            type="selection"
            width="50"
            align="center"
          >
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="55"
            align="center"
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
              prop="specDetail"
              label="规格明细"
              width="300"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="spec"
              label="规格"
              width="100"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="brandName"
              label="品牌"
              width="100"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="type"
              label="胎别"
              width="100"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="size"
              label="英寸"
              width="80"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="tread"
              label="花纹"
              width="100"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="similarTread"
              label="同类花纹"
              width="100"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="blackWhiteLine"
              label="胎侧标志"
              width="100"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="searchField"
              label="搜索字段"
              width="100"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="carryingCapacity"
              label="载重"
              width="100"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="level"
              label="层级"
              width="80"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="loadSpeed"
              label="荷重/速度"
              min-width="100"
              show-overflow-tooltip
          >
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