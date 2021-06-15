<template>
  <div class="page">
    <div class="table-main">
      <div class="actionbar" style="padding-bottom: 0">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="批量配置" name="batch" />
          <el-tab-pane label="配置特殊门店" name="special"/>
        </el-tabs>
        <div class="right-button">
          <el-button type="primary" @click="addProduct(activeName)" v-if="permission.includes('ZBPCD01010901')">{{ $text.setup }}</el-button>
          <el-button type="primary" @click="delProduct(activeName)">{{ $text.del }}</el-button>
        </div>
      </div>
    </div>
    <div class="toolbar-box">
      <div>
        <div class="label">产品代号</div>
        <div class="content">
          <el-input
            clearable
            v-model="toolBar.productCode"
            placeholder="请输入产品代号"
          />
        </div>
      </div>
      <div>
        <div class="label">产品规格</div>
        <div class="content">
          <el-input
                  clearable
                  v-model="toolBar.productSpec"
                  placeholder="请输入产品规格"
          />
        </div>
      </div>
      <div>
        <div class="label">产品品牌</div>
        <div class="content">
          <el-input
                  clearable
                  v-model="toolBar.productBrand"
                  placeholder="请输入产品品牌"
          />
        </div>
      </div>
      <div>
        <div class="label">产品尺寸</div>
        <div class="content">
          <el-input
                  clearable
                  v-model="toolBar.productSize"
                  placeholder="请输入产品尺寸"
          />
        </div>
      </div>
      <div>
        <div class="label">产品花纹</div>
        <div class="content">
          <el-input
            clearable
            v-model="toolBar.productPattern"
            placeholder="请输入产品花纹"
          />
        </div>
      </div>
      <div v-if="activeName==='batch'">
        <div class="label">门店性质</div>
        <div class="content">
          <el-select
            clearable
            v-model="toolBar.storeNature.value"
            :placeholder="$text.selectPlaceholder"
          >
            <el-option
              v-for="item in toolBar.storeNature.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <div v-else>
        <div class="label">门店名称</div>
        <div class="content">
          <storeSelect @change="storeChange" ref="store"/>
        </div>
      </div>
      <el-button type="primary" :loading="loading" @click="searchTableData">{{$text.search}}</el-button>
      <el-button type="primary" @click="cleanSearch" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar" style="justify-content: flex-end">
        <importExport
            :showExport="true"
            :exportUrl="exportUrl"
            :exportGetData="exportGetData"
            exportFileName="商品限购导出"
        />
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          v-loading="loading"
          header-cell-class-name="table-header-item"
          @selection-change="handleSelectionChange">
          <el-table-column
            fixed="left"
            key="a"
            type="selection"
            width="55" />
          <el-table-column
            type="index"
            label="序号"
            key="b"
            width="60" />
          <el-table-column
            prop="productNo"
            label="产品代号"
            width="220"
            key="c"
            show-overflow-tooltip />
          <el-table-column
            prop="specDetail"
            label="产品规格"
            key="d"
            width="400"/>
          <el-table-column
            prop="brandName"
            label="产品品牌"
            width="140"
            key="e"
            show-overflow-tooltip />
          <el-table-column
            prop="size"
            label="产品尺寸"
            key="f"
            width="120"
            show-overflow-tooltip />
          <el-table-column
            prop="tread"
            label="产品花纹"
            width="120"
            key="g"
            show-overflow-tooltip />
          <el-table-column
                  v-if="activeName === 'batch'"
            prop="relationField"
            label="门店性质"
            key="h"
            width="120"
            show-overflow-tooltip />
          <el-table-column
                  v-if="activeName === 'special'"
                  prop="storeName"
                  label="门店名称"
                  width="140"
                  key="i"
                  show-overflow-tooltip />
          <el-table-column
                  v-if="activeName === 'special'"
                  prop="relationField"
                  label="内部门店号"
                  width="140"
                  key="j"
                  show-overflow-tooltip />
          <el-table-column
              v-if="activeName === 'special'"
              prop="storeRefNo"
              width="150"
              label="门店编号"
              key="k"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="limitCount"
            label="限购数量"
            min-width="100"
            key="l"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button
                  @click="setNum(scope.row)"
                  type="text"
                  size="small"
              >
                {{scope.row.limitCount}}
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
          :current-page="searchData.pageReq.pageNum"
          :page-sizes="[10, 20, 50, 100, 200]"
          :page-size="searchData.pageReq.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="searchData.total"
        >
        </el-pagination>
        <el-button type="primary" size="small">{{
          $text.paginationGo
        }}</el-button>
      </div>
    </div>
    <dialogAdd :dialogVisibleAdd.sync="dialogVisibleAdd" :title.sync="addTitle" @selectAdd="getSelectAdd"/>
    <dialogProductNum :dialogVisible.sync="dialogVisible" :productData="productData" @selectProductNum="getSelectProducts"/>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
@import './index';
</style>
