<template>
  <div class="page">
    <div style="padding: 15px 0 0 15px">账户新增</div>
    <div class="toolbar-box account-toolbar-box">
      <div>
        <div class="label">用户名称</div>
        <div class="content">
          <el-input v-model="toolBar.name" placeholder="请输入用户名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">手机号</div>
        <div class="content">
          <el-input v-model="toolBar.phone" placeholder="请输入用户手机号"></el-input>
        </div>
      </div>
      <div>
        <div class="label">用户账号</div>
        <div class="content">
          <el-input v-model="toolBar.accountNumber" placeholder="请输入用户账号"></el-input>
        </div>
      </div>
      <div>
        <div class="label">用户密码</div>
        <div class="content">
          <el-input v-model="toolBar.pwd" type="password" placeholder="请输入用户密码"></el-input>
        </div>
      </div>
      <div class="spec">
        <div class="label">所属经销商</div>
        <div class="content">
<!--          <el-input v-model="toolBar.customerNo" placeholder="请选择所属经销商"></el-input>-->
          <el-select
              v-model="toolBar.customerNo"
              filterable
              remote
              placeholder="请选择所属经销商"
              :remote-method="selectRemoteMethod"
              :loading="selectLoading">
            <el-option
                v-for="item in customerOptions"
                :key="item.customerNo"
                :label="item.name"
                :value="item.customerNo">
            </el-option>
          </el-select>
        </div>

      </div>

      <div>
        <div class="label">备注</div>
        <div class="content">
          <el-input v-model="toolBar.remarks" type="textarea" :row="3" resize="none" placeholder="请输入备注"></el-input>
        </div>
      </div>
    </div>
    <div class="account-btn-box">
      <div>用户角色</div>
      <div>
        <el-button type="primary" @click="deleteRoles">删除角色</el-button>
        <el-button type="primary" @click="dialogVisible = true">配置角色</el-button></div>
    </div>
    <div class="table-main">
      <div class="table">
        <el-table
          :data="tableData"
          max-height="520"
          header-cell-class-name="table-header-item"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
          type="selection">
          </el-table-column>
          <el-table-column
            prop="index"
            label="序号"
            width="500"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="角色"
            width="500"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="jurisdiction"
            label="权限"
            width="500"
            align="right"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column>
          </el-table-column>
        </el-table>
      </div>
      <div class="btn-box">
        <el-button type="primary" size="small" @click="saveUserDetail">{{ $text.confirm }}</el-button>
        <el-button type="primary" size="small" plain @click="$router.back()">{{ $text.cancel }}</el-button>
      </div>
    </div>
    <el-dialog
        class="dialog-account-box"
        title="配置角色"
        :visible.sync="dialogVisible"
        width="1200px"
        height="512px"
        :before-close="handleClose">
      <Config :roles="toolBar.roleNos" @confirmRolesFnc="confirmRoles"/>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>