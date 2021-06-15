<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">经销商名称</div>
        <div class="content">
            <dealerSelect @change="dealerChange" ref="dealer"/>
        </div>
      </div>
      <el-button type="primary" @click="searchList">{{ $text.search }}</el-button>
      <el-button type="primary" @click="cleanSearch" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="table">
        <el-table
          :data="tableData"
          v-loading="tableLoading"
          header-cell-class-name="table-header-item"
        >
          <el-table-column
            fixed="left"
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            fixed="left"
            label="操作"
            width="80"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="toDetail(scope.row.customerNo)"
              >
                {{ $text.detail }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="60"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="经销商名称"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="customerNo"
            label="内部经销商号"
            width="300"
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
            prop="address"
            label="经销商地址"
            width="200"
          >
          </el-table-column>
          <el-table-column
              prop="contact"
              label="经销商联系人"
              width="160"
          >
          </el-table-column>
          <el-table-column
              prop="phone"
              label="联系人手机号"
              width="160"
          >
          </el-table-column>
          <!-- <el-table-column
              prop="code"
              label="商品编号"
              width="160"
          >
          </el-table-column> -->

          <el-table-column
              prop="stock"
              label="商品总库存"
              width="160"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="toDetail(scope.row.customerNo)"
              >
                  <span v-if="scope.row.stock === null">0</span>
                  <span v-else>{{scope.row.stock}}</span>

              </el-button>
            </template>
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
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>