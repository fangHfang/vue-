<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">商品名称</div>
        <div class="content">
          <el-input v-model="toolBar.name" clearable placeholder="请输入商品名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">商品code</div>
        <div class="content">
          <el-input v-model="toolBar.itemNo" clearable placeholder="请输入商品code"></el-input>
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
              :value="item.categoryNo">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">商品规格</div>
        <div class="content">
          <el-input v-model="toolBar.spec" clearable placeholder="请输入商品规格"></el-input>
        </div>
      </div>
       <div>
        <div class="label">商品品牌</div>
        <div class="content">
          <el-select clearable filterable v-model="toolBar.brand" placeholder="请输入商品品牌">
            <el-option
                v-for="item in itemBrandOptions"
                :key="item.brandNo"
                :label="item.brandName"
                :value="item.brandNo">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="searchDataPage">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="resetData">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" @click="newBulid" v-if="permission.includes('ZBPCC01080601')">{{ $text.newAdd }}</el-button>
        <el-button type="primary" class="reset" @click="modifySaleStatus(1)" v-if="permission.includes('ZBPCC01080603')">{{ $text.upShelf }}</el-button>
        <el-button type="primary" class="reset" @click="modifySaleStatus(0)" v-if="permission.includes('ZBPCC01080604')">{{ $text.downShelf }}</el-button>
        <importExport
            :showExport="true"
        />
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          v-loading="tableLoading"
          @selection-change="handleSelectionChange"
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
            width="130"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="deleteOne(scope.row)"
              >
                {{ $text.del }}
              </el-button>
              <el-button
                  type="text"
                  size="small"
                  @click="toDetail(scope.row)"
              >
                {{ $text.detail }}
              </el-button>
              <el-button
               v-if="permission.includes('ZBPCC01080602')"
                  type="text"
                  size="small"
                  :style="{color:(scope.row.saleStatus===0) ? '' : '#CCCCCC'}"
                  @click="(scope.row.saleStatus===0) ? toEdit(scope.row) : ''"
              >
                {{ $text.edit }}
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
            prop="itemName"
            label="商品名称"
            width="300"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="relationNo"
            label="内部编号"
            width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="itemNo"
            label="商品编码"
            width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="商品分类"
            width="130"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                {{scope.row.itemType === 1 ? scope.row.categoryName : scope.row.couponClass === 0 ? "消费券" : "兑换券"}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="brandName"
            label="商品品牌"
            width="110"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="specDetail"
            label="商品规格"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="库存数"
            width="90"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                {{scope.row.saleStatus === 0 ? scope.row.initStock : scope.row.stock}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="saleStatus"
            label="状态"
            width="100"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['error', 'success'][scope.row.saleStatus]" :message="['已下架', '已上架'][scope.row.saleStatus]" />
              </div>
            </template>
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
            prop="unsaleDate"
            label="下架时间"
            min-width="160"
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