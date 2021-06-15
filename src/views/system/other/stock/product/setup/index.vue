<template>
  <div class="page page-content">
    <h3 class="page-name">商品配置列表</h3>
    <div class="item-box">
      <div class="toolbar-box">
        <div>
          <div class="label">成品代号</div>
          <div class="content icon">
            <el-input clearable v-model="toolBar.productCode" placeholder="请输入成品代号" ></el-input>
          </div>
        </div>
        <div>
          <div class="label">产品规格</div>
          <div class="content icon">
            <el-input clearable v-model="toolBar.spec" placeholder="请输入产品规格" ></el-input>
          </div>
        </div>
        <div>
          <div class="label">经销商名称</div>
          <div class="content icon">
            <el-input clearable v-model="toolBar.customerName" placeholder="请输入经销商名称" ></el-input>
          </div>
        </div>
        <el-button type="primary" class="search" @click="searchRelationItemListByPage">{{ $text.search }}</el-button>
          <el-button
              type="primary"
              @click="maxxisAddProductVisible = true"
          >添加商品</el-button>
          <el-button type="primary" @click="deleteItemRelated">删除商品</el-button>
          <span>
            <importExport
              importText="+ 批量导入"
              :showImport="true"
              :showExport="true"
              :importUrl="importUrl"
              :exportUrl="exportUrl"
              :exportGetData="exportGetData"
              exportFileName="库存规则导出"
              @refreshTableData="searchRelationItemListByPage"
            />
          </span>
      </div>
      <div class="table-main">
        <div class="table">
          <el-table
              :data="tableData"
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
                fixed="left"
                label="操作"
                width="100"
                align="center"
            >
              <template slot-scope="scope">
                <el-button
                    type="text"
                    size="small"
                    @click="deleteOneProduct(scope.row)"
                >
                  {{ $text.del }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
                prop="productNo"
                label="产品编号"
                min-width="200"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="productCode"
                label="成品代号"
                min-width="160"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="specDetail"
                label="规格明细"
                min-width="200"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="customerName"
                label="经销商名称"
                min-width="160"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="customerNo"
                label="内部经销商号"
                min-width="200"
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
            <el-table-column/>
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
    <div class="btn-box">
      <el-button @click="back">{{ $text.return }}</el-button>
<!--      <el-button @click="back" type="primary">{{ $text.upShelf }}</el-button>-->
    </div>
    <dialogMaxxisAddProduct mark="stockSetProduct" :isMultiSelect="true" v-on:productCode="getProduct" :dialogVisible.sync="maxxisAddProductVisible"/>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>