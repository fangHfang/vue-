<template>
  <div class="table">
    <el-table
      :data="productTableData"
      max-height="500"
      header-cell-class-name="table-header-item"
    >
      <el-table-column
        fixed="left"
        type="selection"
        width="50"
      >
      </el-table-column>
      <el-table-column
        type="index"
        label="序号"
        align="center"
        width="60"
      >
      </el-table-column>
      <el-table-column
        label="商品图片"
        width="100"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <img class="table-pd-img" :src="scope.row.imgSrc" />
        </template>
      </el-table-column>
      <el-table-column
        v-if="mustBuy"
        label="必须购买"
        width="100"
        show-overflow-tooltip
      >
      <template slot-scope="scope">
          <el-switch v-model="scope.row.mustBuy"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
        width="300"
        show-overflow-tooltip
      >
      </el-table-column>
        <el-table-column
        label="商品原价"
        width="180"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div class="tl-input-box">
            <el-input v-model="scope.row.originalPrice" placeholder="请输入" type="number"></el-input>
            <span class="tips">元</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="brand"
        label="商品品牌"
        width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="class"
        label="商品分类"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="spec"
        label="商品规格"
        width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="tag"
        label="商品标签"
        width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="活动价格"
        width="160"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div class="tl-input-box">
            <el-input v-model="scope.row.sellingPrice" placeholder="请输入" type="number"></el-input>
            <span class="tips">元</span>
          </div>
        </template>
      </el-table-column>
        <el-table-column
        label="仅显示优惠金额"
        width="160"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
            <div class="tl-input-box">
              <el-input v-model="scope.row.showFavorablePrice" placeholder="请输入" type="number"></el-input>
              <span class="tips">元</span>
            </div>
        </template>
      </el-table-column>
        <el-table-column
        label="个人抢购限量"
        width="160"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
            <div class="tl-input-box">
              <el-input v-model="scope.row.limitNum" placeholder="请输入" type="number"></el-input>
              <span class="tips">个</span>
            </div>
        </template>
      </el-table-column>
        <el-table-column
        label="商品活动库存"
        width="160"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
            <div class="tl-input-box">
              <el-input v-model="scope.row.stock" placeholder="请输入" type="number"></el-input>
              <span class="tips">个</span>
            </div>
        </template>
      </el-table-column>
        <el-table-column
        label="APP显示剩余数量"
        width="160"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div class="tl-input-box">
            <el-input v-model="scope.row.remainder" placeholder="请输入" type="number"></el-input>
            <span class="tips">个</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>