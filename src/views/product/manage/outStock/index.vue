<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <storeSelect @change="storeChange" ref="store"/>
        </div>
      </div>
      <div>
        <div class="label">要货状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.state.value" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.state.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">关联订单</div>
        <div class="content">
          <el-input clearable v-model="toolBar.orderNo" placeholder="请输入关联订单"></el-input>
        </div>
      </div>
      <div>
        <div class="label">商品规格</div>
        <div class="content">
          <el-input clearable v-model="toolBar.specification" placeholder="请输入商品规格"></el-input>
        </div>
      </div>
      <div>
        <div class="label">经销商名称</div>
        <div class="content">
          <dealerSelect @change="dealerChange" ref="dealer"/>
        </div>
      </div>
      <div>
        <div class="label">商品分类</div>
        <div class="content">
          <el-select clearable v-model="toolBar.category" placeholder="请选择商品分类">
            <el-option
              v-for="item in itemCategoryOptions"
              :key="item.categoryNo"
              :label="item.wholeCategoryName"
              :value="item.wholeCategoryName">
            </el-option>
          </el-select>
        </div>
      </div>
          <div>
        <div class="label">商品名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.itemName" placeholder="请输入商品名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">商品品牌</div>
        <div class="content">
          <el-input clearable v-model="toolBar.brand" :placeholder="$text.inputPlaceholder"></el-input>
        </div>
      </div>
      <el-button type="primary" @click="searchTableData">{{ $text.search }}</el-button>
      <el-button type="primary" @click="resetOrderPresellSearch" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <importExport
            :showExport="true"
        />
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          v-loading="tableLoading"
          header-cell-class-name="table-header-item"
        >
          <el-table-column
            type="index"
            label="序号"
            width="60"
          >
          </el-table-column>
          <el-table-column
            prop="product"
            label="商品"
            width="220"
          >
            <template slot-scope="scope">
              <div class="product-box temp-box">
                <h2>{{scope.row.itemName}}</h2>
                <span>编号：{{scope.row.itemNo}}</span>
                <span>品牌：{{scope.row.itemBrand}}</span>
                <span>分类：{{scope.row.itemCategoryBackend}}</span>
                <span>规格：{{scope.row.itemSpecDetail}}</span>
                <span>分组：{{scope.row.itemCategoryFrontend}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
              prop="storeNo"
              width="220"
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
            prop="storeName"
            label="门店名称"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="dealerName"
            label="所属经销商"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
              width="150"
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
            prop="itemQuantity"
            label="要货数量"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="presellName"
            label="要货人"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="presellMobile"
            label="账号"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="presellStatus"
            label="是否出货"
            width="100"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['error', 'success'][scope.row.presellStatus]" :message="['否', '是'][scope.row.presellStatus]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderTotalQuantity"
            label="出货数量"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="orderNo"
            label="关联订单"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="orderTime"
            label="下单时间"
            width="160"
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
        <el-button type="primary" size="small" @click="listOrderPresellByPage">{{ $text.paginationGo }}</el-button>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
