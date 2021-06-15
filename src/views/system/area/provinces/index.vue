<template>
  <div class="page">
    <div class="toolbar-box list-toolbar-box">
      <div>
        <div class="label">省名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.provinceName" placeholder="检索省" @keyup.enter.native="getRemoteTableData" ></el-input>
        </div>
      </div>
      <div>
        <div class="label">市名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.cityName" placeholder="检索市" @keyup.enter.native="getRemoteTableData" ></el-input>
        </div>
      </div>
      <div>
        <div class="label">区/县名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.districtName" placeholder="检索区/县" @keyup.enter.native="getRemoteTableData" ></el-input>
        </div>
      </div>
      <el-button type="primary" @click="searchCityListByPage">{{ $text.search }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <importExport
          :showImport="permission.includes('ZBPCA01010102')"
          :showExport="permission.includes('ZBPCA01010101')"
          :importUrl="importUrl"
          :exportUrl="exportUrl"
          exportFileName="省市区导出"
          @refreshTableData="searchCityListByPage"
        />
      </div>
      <div class="table">
        <el-table
            :data="tableData"
            v-loading="tableLoading"
            header-cell-class-name="table-header-item"
        >
          <el-table-column
              type="index"
              label="序号"
              width="80"
              align="center"
          >
          </el-table-column>
          <el-table-column
              prop="province"
              label="省份"
              width="120"
          >
          </el-table-column>
          <el-table-column
              prop="provinceInnerCode"
              label="内部编号（省份）"
              width="160"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="city"
              label="城市"
              width="120"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="cityInnerCode"
              label="内部编号（城市）"
              width="160"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="district"
              label="城区 / 县"
              width="120"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="districtInnerCode"
              label="内部编号（区 / 县）"
              width="180"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column

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
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>