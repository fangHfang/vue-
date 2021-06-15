<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">版本检索</div>
        <div class="content">
          <el-input clearable v-model="toolBar.name" placeholder="版本号检索"></el-input>
        </div>
      </div>
      <div>
        <div class="label">创建人</div>
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
          <el-date-picker
            v-model="date"
            type="datetime"
            placeholder="创建开始时间 ~ 创建结束时间">
          </el-date-picker>
        </div>
      </div>
      <div>
        <div class="label">状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.tag.value" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.tag.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="searchDataPage">{{ $text.search }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button
          type="primary"
          icon="el-icon-plus">
          {{ $text.newAdd }}
        </el-button>
        <el-button type="primary">开启</el-button>
        <el-button type="primary">关闭</el-button>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          header-cell-class-name="table-header-item"
        >
          <el-table-column
            type="selection"
            width="50"
            align="center"
          >
          </el-table-column>
          <el-table-column
            fixed="left"
            label="操作"
            width="60"
            show-overflow-tooltip
          >
          <template>
              <el-button
                type="text"
                size="small"
              >
                {{ $text.edit }}
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
            prop="payWay"
            label="支付方式"
            width="170"
          >
          </el-table-column>
          <el-table-column
            prop="time"
            sortable
            label="创建时间"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="110"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['success', 'warning'][scope.row.state]" :message="['开启', '关闭'][scope.row.state]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="key"
            label="对接key"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="passKey"
            label="密钥"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="创建人"
            min-width="100"
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