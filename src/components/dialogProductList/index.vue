<template>
  <el-dialog
    title="添加商品"
    :visible.sync="dialogVisible"
    width="1200px"
    destroy-on-close
    :before-close="handleClose">
    <div class="border-content">
      <div class="toolbar-box">
        <div>
          <div class="label">关键字</div>
          <div class="content">
            <el-input clearable v-model="searchData.name" placeholder="请输入商品名称/编码"></el-input>
          </div>
        </div>
        <div>
          <div class="label">商品分类</div>
          <div class="content">
              <el-select filterable v-model="searchData.categoryNo" clearable placeholder="请选择分类" @change="search()">
              <el-option v-for="item in categoryNo"
                :key="item.categoryNo"
                :label="item.categoryName"
                :value="item.categoryNo">
              </el-option>
              </el-select>
          </div>
        </div>
        <div>
          <div class="label">商品品牌</div>
          <div class="content">
              <el-select
                v-model="searchData.brandNo"
                filterable
                remote
                clearable
                reserve-keyword
                placeholder="请输入商品品牌"
                @change="search()"
                @focus="getBrandTableData('')">
                <el-option
                  v-for="item in brandName"
                  :key="item.brandNo"
                  :label="item.brandName"
                  :value="item.brandNo">
                </el-option>
              </el-select>
          </div>
        </div>
        <el-button type="primary" @click="search">{{ $text.search }}</el-button>
        <el-button type="primary" plain @click="reset">{{ $text.reset }}</el-button>
      </div>
      <div class="table-main">
        <div class="table">
          <el-table
            :data="tableData"
            max-height="240"
            header-cell-class-name="table-header-item"
            v-loading="tableLoading"
            @row-dblclick="rowDblclick"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="100"
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
              prop="tag"
              label="商品标签"
              width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <p>
                  {{scope.row.labelInfos.map((item)=>{return item.labelName}).join(',')}}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              prop="brandName"
              label="商品品牌"
              width="120"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="specDetail"
              label="商品规格"
              width="160"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div>{{scope.row.specDetail.split(" ").join('，')}}</div>
                <!-- <p v-if="scope.row.itemCategoryDTOS && scope.row.itemCategoryDTOS.length > 0">
                  {{scope.row.itemCategoryDTOS.map((item)=>{return item.specDetail}).join(',')}}
                </p> -->
              </template>
            </el-table-column>
            <el-table-column
              prop="productNo"
              label="商品编号"
              width="160"
              show-overflow-tooltip
            >
              <!-- <template slot-scope="scope">
                <p v-if="scope.row.itemCategoryDTOS && scope.row.itemCategoryDTOS.length > 0">
                  {{scope.row.itemCategoryDTOS.map((item)=>{return item.itemNo}).join(',')}}
                </p>
              </template> -->
            </el-table-column>
            <el-table-column
              prop="class"
              label="商品分类"
              width="160"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <p v-if="scope.row.itemCategoryDTOS && scope.row.itemCategoryDTOS.length > 0">
                  {{scope.row.itemCategoryDTOS.map((item)=>{return item.categoryName}).join(',')}}
                </p>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              min-width="80"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="getSelectInfo(scope.row)"
                >
                  {{ $text.select }}
                </el-button>
              </template>
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
  </el-dialog>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
