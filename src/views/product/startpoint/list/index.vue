<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">规则名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.name" placeholder="请输入规则名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">创建日期</div>
        <div class="content">
           <el-date-picker
            v-model="toolBar.date"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <div>
        <div class="label">状态</div>
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
      <el-button type="primary" @click="searchDataPage">{{ $text.search }}</el-button>
      <el-button type="primary" @click="cleanSearch" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" v-if="permission.includes('ZBPCC01080201')" icon="el-icon-plus" @click="dialogVisible = true">{{ $text.newAdd }}</el-button>
        <el-button type="primary" v-if="permission.includes('ZBPCC01080202')" @click="removeStartPoint">{{ $text.del }}</el-button>
        <importExport
            :showExport="true"
        />
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          header-cell-class-name="table-header-item"
          v-loading="tableLoading"
          @selection-change="handleSelectionChange"
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
            width="190"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                  :style="{color:(scope.row.status===0) ? '' : '#CCCCCC'}"
                  @click.stop="(scope.row.status===0) ? openEdit(scope.row) : ''"
              >
                {{ $text.edit }}
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="openDetail(scope.row)"
              >
                {{ $text.detail }}
              </el-button>
              <el-button
                type="text"
                size="small"
                v-if="scope.row.status === 0 &&permission.includes('ZBPCC01080203')"
                @click="transferStatus(1,scope.row.startPointNo)"

              >
                {{ $text.enable }}
              </el-button>
              <el-button
                type="text"
                size="small"
                  v-if="scope.row.status != 0 &&permission.includes('ZBPCC01080204')"
                @click="transferStatus(0,scope.row.startPointNo)"

              >
                {{ $text.stopUsing }}
              </el-button>
              <el-button
                type="text"
                size="small"
                 v-if="permission.includes('ZBPCC01080202')"
                @click="removeStartPointSingle(scope.row.startPointNo)"
              >
                {{ $text.del }}
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
            prop="startPointName"
            label="规则名称"
            min-width="190"
          >
          </el-table-column>
          <el-table-column
            prop="baseNumber"
            label="起订分数值"
            width="130"
          >
          </el-table-column>
          <el-table-column
            prop="createBy"
            label="创建人"
            width="140"
          >
          </el-table-column>
           <el-table-column
            prop="status"
            label="状态"
            width="130"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="[ 'warning', 'success' ][scope.row.status]" :message="['已停用', '已生效'][scope.row.status]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="created"
            label="创建时间"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="330"
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
    <StartPointAdd :dialogVisible.sync="dialogVisible" @listStartPointByPage = "listStartPointByPage"/>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
