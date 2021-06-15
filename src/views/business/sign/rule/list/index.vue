<template>
  <div class="page">
    <div class="toolbar-box repository-info-list-toolbar">
      <div>
        <div class="label">规则状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.status.value" placeholder="请选择规则状态">
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
        <div class="label">规则名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.ruleName" placeholder="请输入规则名称"></el-input>
        </div>
      </div>
      <el-button type="primary" @click="searchTableData">{{ $text.search }}</el-button>
      <el-button type="primary" @click="resetTableData" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" @click="toAdd" v-if="permission.includes('ZBPCC01120101')">{{ $text.newAdd }}</el-button>
        <el-button type="primary" @click="changeAllStatus(1)" v-if="permission.includes('ZBPCC01120103')">{{ $text.enable }}</el-button>
        <el-button type="primary" @click="changeAllStatus(0)" v-if="permission.includes('ZBPCC01120104')">{{ $text.stopUsing }}</el-button>
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
            width="160"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="toDetail(scope.row)"
              >
                {{ $text.detail }}
              </el-button>
              <!-- 启用 -->
              <el-button
                type="text"
                size="small"
                @click="changeStatus(scope.row,1)"
                 v-if="scope.row.status==0&&permission.includes('ZBPCC01120103')"
              >
                {{ [$text.enable , $text.stopUsing ][scope.row.status || 0] }}
              </el-button>
              <!-- 停用 -->
                <el-button
                type="text"
                size="small"
                @click="changeStatus(scope.row,0)"
                  v-if="scope.row.status!=0&&permission.includes('ZBPCC01120104')"
              >
                {{ [$text.enable , $text.stopUsing ][scope.row.status || 0] }}
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="toStore(scope.row)"
                 v-if="permission.includes('ZBPCC01120105')"
              >
                配置门店
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
            prop="ruleName"
            label="签到规则"
            width="200"
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
                <i-status :type="['error', 'success'][scope.row.status]" :message="['已终止', '使用中'][scope.row.status]" />
              </div>
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
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            min-width="200"
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
