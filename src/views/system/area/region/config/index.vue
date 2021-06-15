<template>
        <div>
          <div class="toolbar-box dialog-box">
            <div>
              <div class="label">省名称</div>
              <div class="content">
                <el-input clearable v-model="toolBar.provinceName" placeholder="检索省" @keyup.enter.native="getRemoteTableData"></el-input>
              </div>
            </div>
            <div>
              <div class="label">市名称</div>
              <div class="content">
                <el-input clearable v-model="toolBar.cityName" placeholder="检索市" @keyup.enter.native="getRemoteTableData"></el-input>
              </div>
            </div>
            <div>
              <div class="label">区/县名称</div>
              <div class="content">
                <el-input clearable v-model="toolBar.districtName" placeholder="检索区/县" @keyup.enter.native="getRemoteTableData"></el-input>
              </div>
            </div>
            <el-button type="primary" @click="searchCityListByPage">{{ $text.search }}</el-button>
          </div>

          <div class="table">
            <el-table
                :data="tableData"
                max-height="330"
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
                  width="90"
              >
              </el-table-column>
              <el-table-column
                  prop="provinceInnerCode"
                  label="内部编号（省份）"
                  width="140"
                  show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                  prop="city"
                  label="城市"
                  width="90"
                  show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                  prop="cityInnerCode"
                  label="内部编号（城市）"
                  width="140"
                  show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                  prop="district"
                  label="城区 / 县"
                  width="100"
                  show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                  prop="districtInnerCode"
                  label="内部编号（区 / 县）"
                  width="160"
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
            <el-button type="primary" size="small">{{ $text.paginationGo }}</el-button>
          </div>
        </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>