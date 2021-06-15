<template>
  <div class="page">
    <div class="toolbar-box repository-info-list-toolbar">
      <div>
        <div class="label">规则名称</div>
        <div class="content">
          <el-input v-model="toolBar.name" prefix-icon="el-icon-search" clearable placeholder="请输入规则名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">规则状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.class.value" placeholder="请选择规则状态">
            <el-option
              v-for="item in toolBar.class.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" @click="toAdd" v-if="permission.includes('ZBPCC01040101')">{{ $text.newAdd }}</el-button>
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
            width="160"
          >
            <template slot-scope="scope">
<!--              <el-button-->
<!--                type="text"-->
<!--                size="small"-->
<!--                @click="toDetail(scope.row.inspectNo)"-->
<!--              >-->
<!--                {{ $text.check }}-->
<!--              </el-button>-->
              <el-button
                      type="text"
                      size="small"
                      :disabled="scope.row.status === 2"
                      v-if="scope.row.status === 0 && permission.includes('ZBPCC01040104')"
                      @click="enableInspectSingle(scope.row.inspectNo)">
                {{ $text.startUsing }}
              </el-button>
              <!-- 开始 -->
              <el-button
                      type="text"
                      size="small"
                      :disabled="scope.row.status === 2"
                       v-if="scope.row.status !== 0 && permission.includes('ZBPCC01040103')"
                      @click="disableInspectSingle(scope.row.inspectNo)">
                {{ $text.stopUsing }}
              </el-button>
              <el-button
                type="text"
                size="small"
                v-if="permission.includes('ZBPCC01040102')"
                @click="toEdit(scope.row.inspectNo)"
              >
                {{ $text.edit }}
              </el-button>
              <el-button
                type="text"
                size="small"
                :disabled="scope.row.status===1"
                v-if="permission.includes('ZBPCC01040105')"
                @click="toStore(scope.row.inspectNo)"
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
            prop="name"
            label="店检规则名称"
            width="240"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="cycle"
            label="店检周期"
            width="250"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="店检状态"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['warning','success', 'error'][scope.row.status]" :message="['未开始', '进行中','已结束'][scope.row.status]" />
              </div>
            </template>
          </el-table-column>
<!--          <el-table-column-->
<!--            prop="desc"-->
<!--            label="备注"-->
<!--            show-overflow-tooltip-->
<!--          >-->
<!--          </el-table-column>-->
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose">
      <Form/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">保存</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>