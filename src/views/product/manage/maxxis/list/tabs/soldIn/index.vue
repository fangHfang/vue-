<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">商品名称</div>
        <div class="content">
          <el-input clearable v-model="searchData.itemName" placeholder="请输入商品名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">商品分类</div>
        <div class="content">
          <el-select clearable v-model="searchData.categoryNo" placeholder="请选择">
            <el-option
              v-for="item in itemCategoryOptions"
              :key="item.categoryNo"
              :label="item.wholeCategoryName"
              :value="item.categoryNo">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">商品标签</div>
        <div class="content">
          <el-select clearable v-model="searchData.labelNo" placeholder="请选择">
            <el-option
              v-for="item in itemLabelRefOptions"
              :key="item.labelNo"
              :label="item.labelName"
              :value="item.labelNo">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">商品品牌</div>
        <div class="content">
          <el-select clearable v-model="searchData.brandNo" placeholder="请选择">
            <el-option
              v-for="item in itemBrandOptions"
              :key="item.brandNo"
              :label="item.brandName"
              :value="item.brandNo">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click.native="selectData">{{ $text.search }}</el-button>
      <el-button type="primary" @click.native="clearData" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" v-if="permission.includes('ZBPCD01010507')" @click="batchDownShelf">{{ $text.downShelf }}</el-button>
        <importExport
            :showExport="permission.includes('ZBPCD01010503')"
            :exportUrl="exportUrl"
            :exportGetData="exportGetData"
            exportFileName="玛吉斯出售中商品导出"
        />
      </div>
      <div class="table">
        <el-table
          :max-height="tableHeight"
          :data="tableData"
          v-loading="tableLoading"
          @selection-change="handleSelectionChange"
          header-cell-class-name="table-header-item"
        >
          <el-table-column
            fixed
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            fixed
            label="操作"
            width="200"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                 v-if="permission.includes('ZBPCD01010507')"
                @click="downShelf(scope.row)"
              >
                {{ $text.downShelf }}
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="toPreview(scope.row)"
              >
                {{ $text.preview }}
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="toDetail(scope.row)"
              >
                {{ $text.detail }}
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="copyProductLink(scope.row.itemNo)"
              >
                {{ $text.copyLink }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="id"
            label="商品"
            min-width="180"
          >
            <template slot-scope="scope">
              <div class="temp-box">
                <div>{{ scope.row.itemName }}</div>
                <div class="coloraaa">编号：{{ scope.row.itemNo }}</div>
                <div class="coloraaa">品牌：{{ scope.row.brandName }}</div>
                <div class="coloraaa">分类：{{ scope.row.backCategoryName }}</div>
                <div class="coloraaa">规格：{{ scope.row.specDetail }}</div>
                <div class="coloraaa">分组：{{ scope.row.frontCategoryName }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="label"
            label="标签"
            min-width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="price"
            label="价格"
            width="60"
          >
            <template slot-scope="scope">
              <el-button
                      type="text"
                      size="small"
                      @click="toPrice(scope.row)"
              >
                {{ $text.check }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="stock"
            label="库存"
            width="60"
          >
            <template slot-scope="scope">
              <el-button
                      type="text"
                      size="small"
                      @click="toStock(scope.row)"
              >
                {{ $text.check }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="stock"
            label="可见性"
            width="70"
          >
            <template slot-scope="scope">
              <el-button
                      type="text"
                      size="small"
                      @click="toVisibility(scope.row)"
              >
                {{ $text.check }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="rebateRuleName"
            label="返利"
            width="130"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="inteRuleName"
            label="积分"
            width="130"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="created"
            label="创建时间"
            width="160"
          >
          </el-table-column>
          <el-table-column
            prop="saleDate"
            label="上架时间"
            width="160"
          >
          </el-table-column>
          <el-table-column
            prop="updateBy"
            label="审批人"
            min-width="110"
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
          :current-page="searchData.pageNum"
          :page-sizes="pagination.sizes"
          :page-size="searchData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
        <el-button type="primary" size="small">{{ $text.paginationGo }}</el-button>
      </div>
    </div>
    <el-dialog :visible.sync="previewDialog">
      <img width="100%" :src="previewDialogUrl" alt="">
    </el-dialog>
    <dialogPriceProduct :itemNo="itemNo" :dialogVisible.sync="priceProductVisible"/>
    <dialogStockProduct :itemNo="itemNo" :dialogVisible.sync="stockProductVisible"/>
    <dialogVisibilityProduct :itemNo="itemNo" :dialogVisible.sync="visibilityProductVisible"/>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>