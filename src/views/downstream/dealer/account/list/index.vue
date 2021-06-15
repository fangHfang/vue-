<template>
  <div class="page">
    <div class="toolbar-box">
         <div>
        <div class="label">经销商名称</div>
        <div class="content">
          <dealerSelect @change="dealerChange"/>
        </div>
      </div>

       <div>
        <div class="label">用户ID</div>
        <div class="content">
          <el-input clearable v-model="toolBar.userNo" placeholder="请输入用户ID"></el-input>
        </div>
      </div>
      <div>
        <div class="label">用户名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.name" placeholder="请输入用户名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">手机号</div>
        <div class="content">
          <el-input clearable v-model="toolBar.phone" placeholder="请输入手机号"></el-input>
        </div>
      </div>
      <div>
        <div class="label">用户状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.class.value" placeholder="请选择用户状态">
            <el-option
              v-for="item in toolBar.class.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="searchDealerAccountListByPage">{{ $text.search }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" icon="el-icon-plus" @click="goAddAccount" v-if="permission.includes('ZBPCB01010301')">{{ $text.newAdd }}</el-button>
        <el-button type="primary" @click="enableUserFunc" v-if="permission.includes('ZBPCB01010302')">{{ $text.enable }}</el-button>
        <el-button type="primary" @click="disableUserFunc" v-if="permission.includes('ZBPCB01010303')">{{ $text.disable }}</el-button>
        <el-button type="primary" @click="edit" v-if="permission.includes('ZBPCB01010304')">修改</el-button>
        <importExport
            :showExport="true"
        />
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          v-loading="tableLoading"
          header-cell-class-name="table-header-item"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
          type="selection">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="用户名称"
            width="140"
          >
            <template slot-scope="scope">
              <div @click="goAccountDetail(scope.row.operatorNo,scope.row.userNo)" class="table-name-color">{{ scope.row.name }}</div>
            </template>
          </el-table-column>
             <el-table-column
            prop="userNo"
            label="用户ID"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="customerName"
            label="所属经销商"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
            <el-table-column
                prop="dealerRefNo"
                label="经销商code"
                width="160"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="customerNo"
                label="内部经销商code"
                width="160"
                show-overflow-tooltip
            >
            </el-table-column>
          <el-table-column
            prop="roleNames"
            label="用户角色"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="accountNumber"
            label="用户账号"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="用户手机号"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
   <el-table-column
            prop="source"
            label="账号来源"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <i-status :type="['success' , 'warning'][scope.row.status]" :message="['启用', '禁用'][scope.row.status]"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="remarks"
            label="备注"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="created"
            label="创建时间"
            width="200"
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
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>