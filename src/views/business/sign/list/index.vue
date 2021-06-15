<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">统计时间</div>
        <div class="content">
          <el-select clearable v-model="toolBar.data.value" placeholder="统计时间默认30天">
            <el-option
              v-for="item in toolBar.data.options"
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
          <el-input v-model="toolBar.brand" placeholder="请输入经销商名称/code"></el-input>
        </div>
      </div>
       <div>
        <div class="label">门店名称</div>
        <div class="content">
          <el-input v-model="toolBar.store" placeholder="请输入门店名称/code"></el-input>
        </div>
      </div>
      <el-button type="primary" @click="searchTableData">{{ $text.search }}</el-button>
      <el-button type="primary" @click="resetTableData" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <importExport
            :showExport="permission.includes('ZBPCC01120201')"
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
            width="80"
          >
            <template>
              <el-button
                type="text"
                size="small"
                @click="jumpDetail"
              >
                {{ $text.detail }}
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
              label="门店名称"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              width="150"
              prop="dealerRefNo"
              label="门店code"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="所属经销商"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="storeNo"
              width="150"
              label="经销商code"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="attendance"
            label="签到次数"
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose">
      <Form/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">保存</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>