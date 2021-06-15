<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">统计时间</div>
       <div class="content">
          <el-select clearable v-model="toolBar.class.value" placeholder="统计时间默认30天">
            <el-option
              v-for="item in toolBar.class.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">经销商名称</div>
        <div class="content">
           <el-input v-model="toolBar.name" placeholder="请输入经销商名称/code"></el-input>
        </div>
      </div>
      <div>
        <div class="label">经销商标签</div>
        <div class="content">
            <el-input v-model="toolBar.title" placeholder="请输入经销商标签"></el-input>
        </div>
      </div>
      <el-button type="primary">{{ $text.search }}</el-button>
      <el-button type="primary" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar" v-show="activeName !== 'third'">
        <importExport
            :showExport="true"
        />
      </div>
      <div class="table">
        <el-table
          :data="tableData"
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
            width="100"
          >
            <template>
              <el-button
                type="text"
                size="small"
                @click="toDetail"
              >
                查看明细
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
              width="150"
              prop="dealerNo"
              label="内部经销商号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              width="150"
              prop="dealerRefNo"
              label="经销商编号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="经销商名称"
            width="130"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="class"
            label="经销商标签"
            width="130"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="city"
            label="所在城市"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="area"
            label="所在区域"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="tag"
            label="返利数额"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="applyStore"
            label="返利消耗数额"
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
<script src="index.js"></script>
<style lang="scss" scoped>
  @import "index";
</style>
