<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">统计时间</div>
        <div class="content">
          <el-select clearable v-model="toolBar.inch.value" placeholder="统计时间默认30天">
            <el-option
              v-for="item in toolBar.inch.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">签到人/签到人账号</div>
        <div class="content">
          <el-input v-model="toolBar.brand" placeholder="请输入签到人/签到人账号"></el-input>
        </div>
      </div>
      <el-button type="primary">{{ $text.search }}</el-button>
      <el-button type="primary" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
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
            type="index"
            label="序号"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="签到人"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="nameNumber"
            label="签到人账号"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="time"
            label="签到时间"
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