<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">用户名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.name" placeholder="用户名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">用户账号</div>
        <div class="content">
          <el-input clearable v-model="toolBar.accountNumber" placeholder="用户账号"></el-input>
        </div>
      </div>
      <div>
        <div class="label">用户手机号</div>
        <div class="content">
          <el-input clearable v-model="toolBar.phone" placeholder="手机号"></el-input>
        </div>
      </div>
      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <storeSelect @change="storeChange" ref="store"/>
        </div>
      </div>
      <div>
        <div class="label">处理状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.status.value" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.status.options"
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
        <importExport
            :showExport="permission.includes('ZBPCA01060301')"
            :exportUrl="exportUrl"
            :exportPostData="exportPostData"
            exportFileName="用户反馈导出"
        />
        <!-- <el-button type="primary">标记处理</el-button> -->
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
            width="50"
            align="center"
          >
          </el-table-column>
          <el-table-column
            fixed="left"
            label="操作"
            width="100"
          >
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status === 1&&permission.includes('ZBPCA01060303')"
                type="text"
                size="small"
                @click="transferStatus(scope.row.status,scope.row.id)"
              >
                标记未处理
              </el-button>
              <el-button
                v-if="scope.row.status === 0&&permission.includes('ZBPCA01060302')"
                type="text"
                size="small"
                @click="transferStatus(scope.row.status,scope.row.id)"
              >
                标记已处理
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="60"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="userNo"
            width="200"
            show-overflow-tooltip
            label="用户ID"
          >
          </el-table-column>
          <el-table-column
            prop="storeName"
            width="150"
            label="所属门店"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="name"
            width="150"
            label="用户名称"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="userRole"
            width="150"
            show-overflow-tooltip
            label="用户角色"
          >
          </el-table-column>
          <el-table-column
            prop="accountNumber"
            width="150"
            show-overflow-tooltip
            label="用户账号"
          >
          </el-table-column>

          <el-table-column
            prop="phone"
            width="150"
            label="用户手机号"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="content"
            width="150"
            label="提交反馈"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="status"
            width="150"
            label="处理状态"
          >
          <template slot-scope="scope">
            <div>
              <i-status :type="['warning', 'success'][scope.row.status]" :message="['待处理', '已处理'][scope.row.status]" />
            </div>
          </template>
          </el-table-column>
          <el-table-column
            prop="created"
            width="160"
            label="反馈时间"
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
        <el-button type="primary" @click="dialogVisible = false">{{ $text.save }}</el-button>
        <el-button @click="dialogVisible = false">{{ $text.cancel }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>