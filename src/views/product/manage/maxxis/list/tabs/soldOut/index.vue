<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">商品名称/编码</div>
        <div class="content">
          <el-input v-model="toolBar.name" placeholder="请输入商品名称/编码"></el-input>
        </div>
      </div>
      <div>
        <div class="label">商品分类</div>
        <div class="content">
          <el-select clearable v-model="toolBar.class.value" placeholder="一级/二级/三级">
            <el-option
              v-for="item in toolBar.class.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">商品标签</div>
        <div class="content">
          <el-select clearable v-model="toolBar.tag.value" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.tag.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">商品品牌</div>
        <div class="content">
          <el-select clearable v-model="toolBar.brand.value" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.brand.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary">{{ $text.search }}</el-button>
      <el-button type="primary" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="table">
        <el-table
          :max-height="tableHeight"
          :data="tableData"
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
            width="200"
          >
            <template>
              <el-button
                type="text"
                size="small"
                @click="toUpShelf"
              >
                {{ $text.upShelf }}
              </el-button>
              <el-button
                type="text"
                size="small"
              >
                {{ $text.detail }}
              </el-button>
              <el-button
                type="text"
                size="small"
              >
                {{ $text.copyLink }}
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
            prop="id"
            label="商品"
            width="170"
          >
            <template slot-scope="scope">
              <div>
                <div>{{ scope.row.name }}</div>
                <div class="coloraaa">编号：{{ scope.row.id }}</div>
                <div class="coloraaa">品牌：{{ scope.row.brand }}</div>
                <div class="coloraaa">分类：{{ scope.row.class }}</div>
                <div class="coloraaa">规格：{{ scope.row.spec }}</div>
                <div class="coloraaa">分组：{{ scope.row.group }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="tag"
            label="标签"
            width="80"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            width="100"
          >
            <template slot-scope="scope">
              <div>
                <div class="color000" v-for="(item, index) in scope.row.price" :key="index">{{ item.label }}：{{ item.value }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="stock"
            label="库存"
            width="120"
          >
            <template slot-scope="scope">
              <div class="table-input">
                <el-input v-model="scope.row.stock"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="return"
            label="返利"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="integral"
            label="积分"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="coupon"
            label="优惠券"
            width="120"
          >
            <template slot-scope="scope">
              <div>
                <div v-for="(item, index) in scope.row.coupon" :key="index">{{ item }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="shows"
            label="可见门店"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="create"
            label="创建时间"
            width="140"
          >
          </el-table-column>
          <el-table-column
            prop="up"
            label="上架时间"
            width="140"
          >
          </el-table-column>
          <el-table-column></el-table-column>
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