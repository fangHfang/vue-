<template>
  <el-dialog
          title="添加商品 （玛吉斯基础产品表）"
          :visible.sync="dialogVisible"
          width="1200px"
          destroy-on-close
          :before-close="handleClose">
    <div class="border-content">
      <el-select clearable v-model="dealerNo" placeholder="请选择经销商" class="spec-dealer" v-if="mark==='stockSetProduct'" filterable>
        <el-option
            v-for="item in dealerOptions"
            :key="item.dealerNo"
            :label="item.name"
            :value="item.dealerNo">
        </el-option>
      </el-select>
      <div class="toolbar-box">
        <div>
          <div class="label">产品代号</div>
          <div class="content">
            <el-input clearable v-model="searchData.productCode" placeholder="产品代号检索"></el-input>
          </div>
        </div>
        <div>
          <div class="label">规格</div>
          <div class="content">
            <el-input clearable v-model="searchData.spec" placeholder="规格检索"></el-input>
          </div>
        </div>
        <div>
          <div class="label">英寸</div>
          <div class="content">
            <el-input clearable v-model="searchData.size" placeholder="英寸检索"></el-input>
          </div>
        </div>
        <div>
          <div class="label">同类花纹</div>
          <div class="content">
            <el-input clearable v-model="searchData.similarTread" placeholder="同类花纹检索"></el-input>
          </div>
        </div>
        <div>
          <div class="label">胎侧标志</div>
          <div class="content">
            <el-input clearable v-model="searchData.blackWhiteLine" placeholder="胎侧标志检索"></el-input>
          </div>
        </div>
        <div>
          <div class="label">品牌</div>
          <div class="content">
            <el-input clearable v-model="searchData.brandName" placeholder="品牌名称检索"></el-input>
          </div>
        </div>
        <div>
          <div class="label">载重</div>
          <div class="content">
            <el-input clearable v-model="searchData.carryingCapacity" placeholder="载重检索"></el-input>
          </div>
        </div>
        <div>
          <div class="label">搜索字段</div>
          <div class="content">
            <el-input clearable v-model="searchData.searchField" placeholder="搜索字段检索"></el-input>
          </div>
        </div>
        <el-button type="primary" @click.native="searchTableData">{{ $text.search }}</el-button>
      </div>
      <div class="table-main" style="padding:0;">
        <div class="table">
          <el-table
                  :data="tableData"
                  max-height="300"
                  v-loading="tableLoading"
                  header-cell-class-name="table-header-item"
                  @selection-change="handleSelectionChange">
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
              <template slot-scope="scope">
              <span>
                {{ (searchData.pageNum - 1) * searchData.pageSize + scope.$index + 1 }}
              </span>
              </template>
            </el-table-column>
            <el-table-column
                    prop="productCode"
                    label="产品代号"
                    width="120"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                    prop="specDetail"
                    label="规格明细"
                    width="200"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                    prop="spec"
                    label="规格"
                    width="100"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                    prop="size"
                    label="英寸"
                    width="80"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="tread"
                label="花纹"
                width="100"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="similarTread"
                label="同类花纹"
                width="100"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                    prop="brandName"
                    label="品牌"
                    width="90"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                    prop="carryingCapacity"
                    label="载重"
                    width="90"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                    prop="blackWhiteLine"
                    label="胎侧标志"
                    width="90"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                    prop="level"
                    label="层级"
                    width="90"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                    prop="loadSpeed"
                    label="荷重/速度"
                    width="100"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="type"
                label="胎别"
                width="90"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                    prop="searchField"
                    label="搜索字段"
                    width="140"
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
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer flex-center">
        <el-button type="primary" @click="selectData" :loading="btnLoading">{{ $text.add }}</el-button>
         <el-button @click="handleClose">{{ $text.cancel }}</el-button>
      </span>
  </el-dialog>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>