<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">时间段搜索</div>
        <div class="content">
           <el-date-picker
            v-model="toolBar.date"
            type="daterange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
      </div>
      <div>
        <div class="label">经销商名称</div>
        <div class="content">
          <dealerSelect @change="dealerChange" ref="dealer"/>
        </div>
      </div>
      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <storeSelect @change="storeChange" ref="store"/>
        </div>
      </div>
      <div>
        <div class="label">英寸别检索</div>
        <div class="content">
          <el-select clearable v-model="toolBar.inch.value" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.inch.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>

      <el-button type="primary" @click="searchTableData">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="resetTableData">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <importExport
            :showExport="permission.includes('ZBPCE01030101')"
        />
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          v-loading="tableLoading"
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
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
              prop="storeNo"
              width="150"
              label="内部门店号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="storeRefNo"
              width="150"
              label="门店编号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="storeName"
            label="门店名称"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="scanCode"
            label="扫码总条数"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="valid"
            label="有效条数"
            width="80"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="inch"
            label="12''"
            width="50"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="inch"
            label="13''"
            width="50"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="inch"
            label="14''"
            width="50"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="inch"
            label="15''"
            width="50"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="inch"
            label="16''"
            width="50"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="inch"
            label="17''"
            width="50"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="inch"
            label="18''"
            width="50"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="inch"
            label="19''"
            width="50"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="inch"
            label="20''"
            width="50"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="inch"
            label="21''"
            width="50"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="desc"
            label="描述"
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