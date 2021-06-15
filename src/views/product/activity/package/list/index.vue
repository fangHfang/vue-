<template>
  <div class="page">
    <div class="toolbar-box package-pro-activ-toolbar">
      <div>
        <div class="label">套餐商品管理</div>
        <div class="content">
          <el-input v-model="toolBar.name" placeholder="请输入商品名称"></el-input>
        </div>
      </div>
      <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="resetTableData">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <!-- 新增 -->
        <el-button
           v-if="permission.includes('ZBPCD01010701')"
            type="primary"
            @click="toAdd"
        >
          {{ $text.newAdd }}
        </el-button>

        <el-button type="primary" v-if="false" @click="batchUpShelf">{{ $text.upShelf }}</el-button>
        <el-button type="primary" v-if="false" @click="batchDownShelf">{{ $text.downShelf }}</el-button>
        <el-button type="primary" @click="copyItem" v-if="permission.includes('ZBPCD01010704')">复制商品</el-button>
       <!-- 导出 -->
        <importExport
            :showExport="permission.includes('ZBPCD01010702')"
            :exportUrl="exportUrl"
            :exportGetData="exportGetData"
            exportFileName="套餐商品导出"
        />

      </div>
      <div class="table big-table">
        <el-table
            v-loading="tableLoading"
            :data="tableData"
            @selection-change="handleSelectionChange"
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
              fixed="left"
              label="操作"
              width="180"
          >
            <template slot-scope="scope">
              <!-- 编辑 -->
              <el-button
                  type="text"
                  size="small"
                  :disabled="scope.row.saleStatus===1"
                  @click="toEdit(scope.row)"
              >
                {{ $text.edit }}
              </el-button>
              <!-- 详情 -->
              <el-button
                  type="text"
                  size="small"
                  @click="toDetail(scope.row)"
              >
                {{ $text.detail }}
              </el-button>
              <!-- 下架 -->
              <el-button
                  type="text"
                  size="small"
                  v-if="scope.row.saleStatus===1"
                  @click="downShelf(scope.row)"
              >
                {{ $text.downShelf }}
              </el-button>
              <!-- 上架 -->
              <el-button
                  type="text"
                  size="small"
                  v-if="scope.row.saleStatus===0"
                  @click="upShelf(scope.row)"
              >
                {{ $text.upShelf }}
              </el-button>
              <!-- 删除 -->
              <el-button
                  type="text"
                  size="small"
                  :disabled="scope.row.saleStatus===1"
                  @click="deleteOne(scope.row)"
              >
                {{ $text.del }}
              </el-button>

            </template>
          </el-table-column>
          <el-table-column
              prop="itemNo"
              label="商品编号"
              width="170"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="itemName"
              label="商品名称"
              width="300"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="initStock"
              label="库存"
              width="100"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="price"
                  label="价格"
                  width="120"
                  show-overflow-tooltip
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
                  prop="visibility"
                  label="可见性"
                  width="120"
                  show-overflow-tooltip
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
                  width="120"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="inteRuleName"
              label="积分"
              width="120"
          >
          </el-table-column>
          <el-table-column
              prop="saleStatus"
              label="套餐状态"
              width="100"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['error', 'success'][scope.row.saleStatus]" :message="['下架', '上架'][scope.row.saleStatus]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
              prop="created"
              label="创建时间"
              width="150"
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
        <el-button type="primary" size="small">{{ $text.paginationGo }}</el-button>
      </div>
    </div>
    <dialogPriceProduct :itemNo="itemNo" :dialogVisible.sync="priceProductVisible"/>
    <dialogVisibilityProduct :itemNo="itemNo" :dialogVisible.sync="visibilityProductVisible"/>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
