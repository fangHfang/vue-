<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">版本号检索</div>
        <div class="content">
          <el-input clearable v-model="toolBar.editionNo" placeholder="版本号检索"></el-input>
        </div>
      </div>
      <div>
        <div class="label">创建人</div>
        <div class="content">
          <el-input clearable v-model="toolBar.createBy" placeholder="创建人检索"></el-input>
        </div>
      </div>
      <div>
        <div class="label">创建时间</div>
        <div class="content">
          <el-date-picker
                  v-model="toolBar.dataRange"
                  type="daterange"
                  range-separator="~"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
      </div>
      <div>
        <div class="label">状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.status.value" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.status.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="searchVersionListByPage">{{ $text.search }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" icon="el-icon-plus" v-if="permission.includes('ZBPCA01060101')" @click="openVersionAddView">{{ $text.newAdd }}</el-button>
        <el-button type="primary" v-if="permission.includes('ZBPCA01060102')" @click="batchShelfOpt(1)">{{ $text.upShelf }}</el-button>
        <el-button type="primary" v-if="permission.includes('ZBPCA01060103')" @click="batchShelfOpt(0)">{{ $text.downShelf }}</el-button>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          header-cell-class-name="table-header-item"
          v-loading="tableLoading"
          @selection-change="handleSelectionChange"
        >
           <el-table-column
            type="selection"
            width="50"
            align="center"
          >
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="60"
          >
          </el-table-column>
          <el-table-column
            label="版本号"
            width="150"
          >
            <template slot-scope="scope">
              <el-button
                  type="text"
                  size="small"
                  @click="openVersionEditView(scope.row.id)"
              >
                {{ scope.row.editionNo }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="updateTypeShow"
            label="类型"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="created"
            label="创建时间"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="150"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="[ 'warning', 'success' ][scope.row.status]" :message="[ '下架', '上架' ][scope.row.status]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="updateContent"
            label="内容"
            min-width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="createBy"
            label="创建人"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                v-if="scope.row.status && permission.includes('ZBPCA01060103')"
                size="small"
                @click="downShelfFunc(scope.row.id)"
              >
                {{ $text.downShelf }}
              </el-button>
              <el-button
                v-if="(!scope.row.status) && permission.includes('ZBPCA01060102')"
                type="text"
                size="small"
                @click="upShelfFunc(scope.row.id)"
              >
                {{ $text.upShelf }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column></el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <div class="pagination-left">版本数量：{{ pagination.total }}</div>
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