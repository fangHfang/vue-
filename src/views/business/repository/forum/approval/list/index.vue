<template>
  <div class="page">
<!--    <div class="toolbar-box account-toolbar-box">-->
<!--      <el-button type="text" size="small" @click="dialogVisible = true">设置发帖规则</el-button>-->
<!--    </div>-->
    <div class="toolbar-box repository-info-list-toolbar">
      <div>
        <div class="label">审核状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.status" placeholder="请选择审核状态">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">文章标题</div>
        <div class="content">
          <el-input v-model="toolBar.title" clearable placeholder="请输入文章标题"></el-input>
        </div>
      </div>
      <div>
        <div class="label">创建人</div>
        <div class="content">
          <el-input v-model="toolBar.userName" clearable placeholder="请输入创建人"></el-input>
        </div>
      </div>
      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <storeSelect @change="storeChange"/>
        </div>
      </div>
      <div>
        <div class="label">创建时间</div>
        <div class="content">
          <el-date-picker
              v-model="toolBar._date"
              type="daterange"
              range-separator="~"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
      </div>
      <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
      <el-button type="primary" @click="dialogVisible = true">设置发帖规则</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" @click="approval">审批</el-button>
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
            width="55"
          >
          </el-table-column>
          <el-table-column
            fixed="left"
            label="操作"
            width="140"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                v-if="scope.row.auditStatus===0"
                @click="toDetail(scope.row,'approve')"
              >
                {{$text.approve}}
              </el-button>
              <el-button
                type="text"
                size="small"
                v-else
                @click="toDetail(scope.row,'detail')"
              >
                {{$text.check}}
              </el-button>
              <el-button
                  type="text"
                  size="small"
                  @click="toStore(scope.row)"
              >
                配置门店权限
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
            prop="title"
            label="文章标题"
            width="250"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="publishTime"
            label="发布时间"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['warning','success', 'error'][scope.row.auditStatus]" :message="['未审核','已通过', '已驳回'][scope.row.auditStatus]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="storeName"
            label="创建门店名称"
            width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="createBy"
            label="创建人"
            min-width="110"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column>
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
    <dialogAddRule :dialogVisible.sync="dialogVisible" @selectRule="getSelectRule"/>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>