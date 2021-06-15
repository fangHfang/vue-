<template>
  <el-dialog
          :title="title"
          :visible.sync="dialogVisible"
          width="1200px"
          destroy-on-close
          :before-close="handleClose">
    <div class="border-content">
      <div class="toolbar-box">
        <div>
          <div class="label">商品名称</div>
          <div class="content">
            <el-input clearable v-model="toolBar.itemName" clearable placeholder="请输入商品名称"></el-input>
          </div>
        </div>
        <div>
          <div class="label">商品标签</div>
          <div class="content">
            <el-select clearable v-model="toolBar.tag.value" placeholder="请选择商品标签">
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
        <div>
          <div class="label">商品规格</div>
          <div class="content">
            <el-input v-model="toolBar.spec" clearable placeholder="请输入商品规格" maxlength="20"></el-input>
          </div>
        </div>
        <div>
          <div class="label">商品分类</div>
          <div class="content">
            <el-select clearable v-model="toolBar.class.value" placeholder="请选择商品分类">
              <el-option
                      v-for="item in toolBar.class.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
        <el-button type="primary" plain @click="resetData">{{ $text.reset }}</el-button>
      </div>
      <div class="table-main" style="padding:0;">
        <div class="table">
          <el-table
                  ref="multipleTable"
                  v-loading="tableLoading"
                  :data="tableData"
                  max-height="330"
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
                    prop="label"
                    label="商品标签"
                    width="120"
                    show-overflow-tooltip
            >
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
            </el-table-column>
            <el-table-column
                    prop="itemNo"
                    label="商品编号"
                    min-width="200"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                    prop="wholeCategoryName"
                    label="商品分类"
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
          <el-button type="primary" size="small">{{ $text.paginationGo }}</el-button>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer flex-center">
        <el-button type="primary" :loading='btnLoading' @click="btnLoading = true;$throttle(addProduct,500)" >{{ $text.add }}</el-button>
         <el-button @click="handleClose">{{ $text.cancel }}</el-button>
      </span>
  </el-dialog>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>