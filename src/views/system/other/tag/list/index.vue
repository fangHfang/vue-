<template>
  <div class="page">
    <div class="toolbar-box list-toolbar-box">
      <div>
        <div class="label">标签名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.labelName" placeholder="标签名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">标签类型</div>
        <div class="content">
          <el-select clearable v-model="toolBar.class.value" placeholder="请选择">
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
        <div class="label">创建时间</div>
        <div class="content">
          <div class="block">
            <span class="demonstration"></span>
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间">
            </el-date-picker>
          </div>
        </div>
      </div>
      <el-button type="primary" @click="searchLabelListByPage">{{ $text.search }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button
          type="primary"
          icon="el-icon-plus"
           v-if="permission.includes('ZBPCA01060601')"
          @click="toAdd">
          {{ $text.newAdd }}
        </el-button>
        <el-button type="primary" @click="modifyTagStatus(1)" v-if="permission.includes('ZBPCA01060603')">{{ $text.enable }}</el-button>
        <el-button type="primary" @click="modifyTagStatus(0)" v-if="permission.includes('ZBPCA01060604')">禁用</el-button>
        <importExport
            :showExport="true"
        />
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          v-loading="tableLoading"
          @selection-change="handleSelectionChange"
          header-cell-class-name="table-header-item"
        >
          <el-table-column
            fixed="left"
            type="selection"
            width="50"
            align="center"
          >
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="60"
            align="center"
          >
          </el-table-column>
          <el-table-column
            fixed="left"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                v-if="permission.includes('ZBPCA01060602')"
                @click="edit(scope.row.labelNo)">
                {{ $text.edit }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="labelName"
            label="标签名称"
            width="170"
          >
          </el-table-column>
          <el-table-column
            prop="labelType"
            label="标签类型"
            width="180"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ ['经销商','门店','商品','客户','地区'][scope.row.labelType] }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="140"
            show-overflow-tooltip
          >
          <template slot-scope="scope">
            <span>{{ ['禁用','启用'][scope.row.status] }}</span>
          </template>
          </el-table-column>
          <el-table-column
            prop="createBy"
            label="创建人"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="created"
            label="创建时间"
            width="220"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="description"
            label="备注"
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
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>