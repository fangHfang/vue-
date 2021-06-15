<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">入库经销商</div>
        <div class="content">
          <el-select clearable filterable v-model="toolBar.customerNo.value" placeholder="请选择入库经销商">
            <el-option
                v-for="item in toolBar.customerNo.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">入库单号</div>
        <div class="content">
          <el-input clearable v-model="toolBar.operatingNo" maxlength="20" placeholder="请输入入库单号"></el-input>
        </div>
      </div>
      <div>
        <div class="label">关联业务单号</div>
        <div class="content">
          <el-input clearable v-model="toolBar.bizNo" maxlength="20" placeholder="请输入关联业务单号"></el-input>
        </div>
      </div>
      <div>
        <div class="label">创建时间</div>
        <div class="content">
          <el-date-picker
              v-model="toolBar.dataRange"
              type="daterange"
              range-separator="~"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
      <el-button type="primary" @click="clearSearch" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" @click="newAdd" v-if="permission.includes('ZBPCC01130202')">{{ $text.newAdd }}</el-button>
<!--        <importExport-->
<!--            :showExport="permission.includes('ZBPCC01130201')"-->
<!--            :exportUrl="exportUrl"-->
<!--            :exportPostData="exportPostData"-->
<!--            exportFileName="经销商商品入库导出"-->
<!--        />-->
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
            fixed="left"
            label="操作"
            width="80"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="toDetail(scope.$index)"
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
            prop="operatingNo"
            label="入库单单号"
            width="350"
          >
          </el-table-column>
          <el-table-column
            prop="customerName"
            label="入库经销商"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="customerNo"
            label="内部经销商号"
            width="200"
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
            prop="operatingCount"
            label="入库数量"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="type"
            label="入库类型"
            width="150"
          >
            <template slot-scope="scope">
              <div>
                {{operatingTypeList[scope.row.operatingType]}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
              prop="createBy"
              label="创建人"
              width="160"
          >
          </el-table-column>
            <el-table-column
              prop="created"
              label="创建时间"
              width="160"
          >
          </el-table-column>
            <el-table-column
              prop="bizNo"
              label="关联单据单号"
              width="200"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="remark"
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