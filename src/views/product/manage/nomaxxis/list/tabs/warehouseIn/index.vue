<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">商品名称</div>
        <div class="content">
          <el-input v-model="searchData.itemName" placeholder="请输入商品名称"></el-input>
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
      <div>
        <div class="label">审核状态</div>
        <div class="content">
          <el-select clearable v-model="searchData.verifyStatus" placeholder="请选择">
            <el-option
                v-for="item in verifyStatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="selectData">{{ $text.search }}</el-button>
      <el-button type="primary" @click="clearData" >{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <!-- 新建 -->
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="toAddProduct"
           v-if="permission.includes('ZBPCD01010601')"
        >
          {{ $text.newBuild }}
        </el-button>
        <!-- 上架 -->
        <el-button type="primary" v-if="permission.includes('ZBPCD01010602')" @click="batchUpShelf">{{ $text.upShelf }}</el-button>
        <!-- 导入导出 -->
        <importExport
          :showImport="permission.includes('ZBPCD01010603')"
          :showExport="permission.includes('ZBPCD01010603')"
          :exportUrl="exportUrl"
          :importUrl="importUrl"
          :exportGetData="exportGetData"
          exportFileName="非玛吉斯仓库中商品导出"
          @refreshTableData="selectData"
      />
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          :max-height="tableHeight"
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
            width="160"
          >
            <template slot-scope="scope">
              <!-- 上架 -->
              <el-button
                type="text"
                size="small"
                 v-if="permission.includes('ZBPCD01010602')"
                @click="upShelf(scope.row)"
              >
                {{ $text.upShelf }}
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="toDetail(scope.row)"
              >
                {{ $text.detail }}
              </el-button>
              <!-- 编辑 -->
              <el-button
                type="text"
                size="small"
                v-if="permission.includes('ZBPCD01010604')"
                @click="toEdit(scope.row)"
              >
                {{ $text.edit }}
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
              prop="status"
              label="审核状态"
              width="100"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['warning','warning', 'success','error'][scope.row.verifyStatus]" :message="['待提审','未审核','已通过', '已拒绝'][scope.row.verifyStatus]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
              prop="updated"
              label="发生时间"
              width="160"
          >
          </el-table-column>
          <el-table-column
              prop="updateBy"
              label="操作人"
              width="110"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="auditDesc"
              label="否决理由"
              min-width="160"
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
    <dialogPriceProduct :itemNo="itemNo" :dialogVisible.sync="priceProductVisible"/>
    <dialogStockProduct :itemNo="itemNo" :dialogVisible.sync="stockProductVisible"/>
    <dialogVisibilityProduct :itemNo="itemNo" :dialogVisible.sync="visibilityProductVisible"/>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>