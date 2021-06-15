<template>
  <div class="page">
    <div style="padding: 15px 0 0 15px">账号详情</div>
    <div class="toolbar-box account-toolbar-box detail-toolbar">
      <div>
        <div class="label">用户名称</div>
        <div class="content">
          <el-input v-model="toolBar.name" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">用户ID</div>
        <div class="content">
          <el-input v-model="toolBar.userNo" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">手机号</div>
        <div class="content">
          <el-input v-model="toolBar.phone" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">用户账号</div>
        <div class="content">
          <el-input v-model="toolBar.accountNumber" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">用户密码</div>
        <div class="content">
          <el-input v-model="toolBar.password" readonly type="password"></el-input>
        </div>
      </div>
      <div>
        <div class="label">用户状态</div>
        <div class="content">
            <el-input v-model="toolBar.status" readonly ></el-input>
        </div>
      </div>
      <div>
        <div class="label">创建时间</div>
        <div class="content">
          <el-input v-model="toolBar.created" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">备注</div>
        <div class="content">
          <el-input v-html="toolBar.remarks" type="textarea" :row="3" :disabled="true" resize="none" placeholder="请输入备注"></el-input>
        </div>
      </div>
    </div>
    <div class="account-btn-box">
      <div>用户角色</div>
    </div>
    <div class="table-main">
      <div class="table">
        <el-table
          :data="tableData"
          max-height="330"
          header-cell-class-name="table-header-item"
        >
          <el-table-column
            type="index"
            label="序号"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="角色"
            align="center"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="btn-box">
        <el-button type="primary" size="small" @click="$router.back()">返回</el-button>
      </div>
    </div>
    <el-dialog
        title="配置角色"
        :visible.sync="dialogVisible"
        width="1200px"
        height="512px"
        :before-close="handleClose">
      <Config />
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
<style>
  .detail-toolbar .el-input .el-input__inner{
    border: none ;
    color: #000;
  }
  .state-box .i-status div.success{
    margin-top: 5px;
  }
</style>