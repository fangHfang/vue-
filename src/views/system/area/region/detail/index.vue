<template>
  <div class="page">
    <div style="padding: 15px 0 0 15px;font-weight: 500">区域详情</div>
    <div class="toolbar-box activity-toolbar-box detail-toolbar">
      <div>
        <div class="label">区域名称</div>
        <div class="content">
          {{ form.name }}
        </div>
      </div>
      <div>
        <div class="label">备注</div>
        <div class="content">
          {{ form.description }}
        </div>
      </div>
    </div>
    <div class="activity-btn-box">
      <div>区域下城市</div>
    </div>
    <div class="toolbar-box activity-detail-toolbar-box">
      <div>
        <div class="label">省市区名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.name" placeholder="请输入省市区名称"></el-input>
        </div>
      </div>
      <el-button type="primary" @click="searchRegionDict">{{ $text.search }}</el-button>
    </div>
    <div class="table-top-font">
      <div @click="tableFontClick">{{ tableDetailShow ? '收起' : '展开' }}<div :class="tableDetailShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></div></div>
    </div>
    <div class="table-main" v-show="tableDetailShow">
      <div class="table">
        <el-table
          :data="tableData"
          max-height="330"
          header-cell-class-name="table-header-item"
          v-loading="tableLoading"
        >
          <el-table-column
            prop="index"
            label="序号"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="province"
            label="省"
            width="320"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="city"
            label="市"
            width="320"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="district"
              label="区、县"
              min-width="320"
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
    <div class="btn-box">
      <el-button type="primary" size="small" plain @click="$router.back()">{{ $text.return }}</el-button>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>