<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">角色名称</div>
        <div class="content">
          <el-input v-model="toolBar.name" clearable
                    placeholder="请输入"></el-input>
        </div>
      </div>
      <div>
        <div class="label">角色状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.class.value"
                     placeholder="请选择">
            <el-option v-for="item in toolBar.class.options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
  <div>
        <div class="label">角色所属</div>
        <div class="content">
          <el-select clearable v-model="toolBar.appType.value"
                     placeholder="请选择">
            <el-option v-for="item in toolBar.appType.options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>

      <el-button type="primary" @click=" searchList">{{ $text.search }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
          <el-button type="primary" icon="el-icon-plus" @click="addRole" v-if="permission.includes('ZBPCA01020201')">{{ $text.newAdd }}</el-button>
      </div>
      <div class="table">
        <el-table :data="tableData"
                  v-loading="tableLoading"
                  :cell-style="changeCellStyle"
                  header-cell-class-name="table-header-item"
                  @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="60">
          </el-table-column>
          <el-table-column
            label="操作"
            width="160"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                v-if="permission.includes('ZBPCA01020202')"
                @click="edit(scope.row.roleNo,scope.row.status)"
              >
                {{ $text.edit }}
              </el-button>
              <el-button
                type="text"
                size="small"
                v-if="scope.row.status === 1 && permission.includes('ZBPCA01020203')"
                @click="enableRole(scope.row.roleNo)"
              >
                {{ $text.enable }}
              </el-button>
              <el-button
                type="text"
                size="small"
                 v-if="scope.row.status != 1 && permission.includes('ZBPCA01020204')"
                @click="disableRole(scope.row.roleNo)"
              >
                {{ $text.close }}
              </el-button>
            </template>
          </el-table-column>
          <!--<el-table-column-->
            <!--prop="roleNo"-->
            <!--width="240"-->
            <!--show-overflow-tooltip-->
            <!--label="角色编号">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="name"
            min-width="200"
            label="角色名称">
          </el-table-column>
          <el-table-column
            prop="appType"
            min-width="100"
            label="角色所属">
            <template slot-scope="scope">
              {{['总部', '经销商','门店'][scope.row.appType]}}
            </template>
          </el-table-column>

          <el-table-column
            width="120"
            prop="state"
            label="状态">
            <template slot-scope="scope">
              <i-status :type="['success', 'error'][scope.row.status]" :message="['启用', '禁用'][scope.row.status]" />
            </template>
          </el-table-column>
          <el-table-column/>
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
          :page-count="pagination.pages"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        >
        </el-pagination>
      </div>
    </div>
   <el-dialog
      title="角色配置"
      :visible.sync="dialogVisible"
      width="calc(1000 / 1366 *100vw)"
      :before-close="handleClose">
      <roleAdd ref="roleAddRef" :roleNo="roleNo" :mark="mark"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $text.cancel }}</el-button>
        <el-button type="primary" :loading='btnLoading' @click="btnLoading = true;$throttle(editConfirmRole,100)" >{{ $text.confirm }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
@import "./index";
</style>