<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">卡券名称</div>
        <div class="content">
          <el-input clearable v-model="searchData.ruleName" placeholder="请输入卡券名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">创建时间至</div>
        <div class="content">
           <el-date-picker
              v-model="searchData.createdTo"
              type="date"
              range-separator="-"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="创建时间">
            </el-date-picker>
        </div>
      </div>
      <div>
        <div class="label">卡券状态</div>
        <div class="content">
          <el-select clearable v-model="searchData.status" placeholder="请选择">
            <el-option
              v-for="item in toolBar.status.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">卡券类型</div>
        <div class="content">
          <el-select clearable v-model="searchData.couponClass" placeholder="请选择">
            <el-option
              v-for="item in toolBar.couponClass.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click.native="searchDataPage">{{ $text.search }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button
          type="primary"
          icon="el-icon-plus"
          v-if="permission.includes('ZBPCC01070101')"
          @click="newAdd">
          {{ $text.newAdd }}
        </el-button>
        <importExport
            :showExport="true"
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
            fixed="left"
            label="操作"
            width="200"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="selectDetail(scope.row.ruleNo)"
              >
                {{$text.edit}}
              </el-button>
                <el-button
                v-if="scope.row.status === 0 &&permission.includes('ZBPCC01070103')"
                type="text"
                size="small"
                @click="transferStatus(1,scope.row.ruleNo)"
              >
                启用
              </el-button>
                <el-button
                v-if="scope.row.status === 1 &&permission.includes('ZBPCC01070104')"
                type="text"
                size="small"
                @click="transferStatus(0,scope.row.ruleNo)"
              >
                停用
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            label="序号"
            width="50"
            type="index"
          >
          </el-table-column>
          <el-table-column
            prop="ruleName"
            label="卡券名称"
            width="200"
          >
          </el-table-column>
              <el-table-column
            prop="state"
            label="卡券状态"
            width="100"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['error','success'][scope.row.status]" :message="['停用','启用'][scope.row.status]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="createBy"
            width="80"
            label="创建人"
          >
          </el-table-column>
          <el-table-column
            prop="creatTime"
            label="卡券有效时间"
             show-overflow-
            width="300"
          >
           <template slot-scope="scope" >
            {{scope.row.startTime}}-{{scope.row.endTime}}
          </template>
          </el-table-column>

          <el-table-column
            prop="created"
            label="卡券创建时间"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="type"
            label="卡券类型"
            width="180"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
               {{['现金优惠', '兑换商品'][scope.row.type]}}
              </div>
            </template>
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
          :current-page="pagination.pageNum"
          :page-sizes="[ 10, 20, 50, 100, 200 ]"
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
