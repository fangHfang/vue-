<template>
<div class="select">
    <div class="toolbar-box">
      <div>
        <div class="label">商品名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.itemName" placeholder="请输入商品名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">商品分类</div>
        <div class="content">
          <el-select clearable v-model="toolBar.categoryNo.value" placeholder="请选择商品分类">
            <el-option
              v-for="item in toolBar.categoryNo.options"
              :key="item.categoryNo"
              :label="item.wholeCategoryName"
              :value="item.categoryNo">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">商品品牌</div>
        <div class="content">
          <el-select clearable v-model="toolBar.brandNo.value" placeholder="请选择商品品牌">
            <el-option
                    v-for="item in toolBar.brandNo.options"
                    :key="item.brandNo"
                    :label="item.brandName"
                    :value="item.brandNo">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" class="search" @click="searchItemInfoListByPage">{{ $text.search }}</el-button>
      <el-button class="search" plain @click="resetData">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="table">
        <el-table
          ref="itemTable"
          :data="tableData"
          max-height="330"
          header-cell-class-name="table-header-item"
          v-loading="tableLoading"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="60"
          >
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="60"
          >
          </el-table-column>
          <el-table-column
            prop="itemName"
            label="商品名称"
            min-width="300"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="brandName"
            label="品牌"
            min-width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="specDetail"
            label="商品规格"
            min-width="220"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="itemNo"
            label="商品编码"
            min-width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="categoryName"
            label="商品分类"
            min-width="180"
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