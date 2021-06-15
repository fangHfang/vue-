<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">查找规则</div>
        <div class="content">
          <el-input clearable v-model="toolBar.ruleName" placeholder="请输入积分规则名称"></el-input>
        </div>
      </div>
       <div>
        <div class="label">创建时间</div>
        <div class="content">
          <el-date-picker
            v-model="created"
            type="daterange"
            value-format="yyyy-MM-dd"
            start-placeholder="开始月份"
            end-placeholder="结束月份">
          </el-date-picker>
        </div>
      </div>
      <div>
        <div class="label">规则状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.spec.value" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.spec.options"
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
        <el-button type="primary"
       v-if="permission.includes('ZBPCC01080101')" icon="el-icon-plus" @click="dialogVisible = true">{{ $text.newBuild }}</el-button>

<!--        <importExport-->
<!--            :showExport="true"-->
<!--        />-->
        <el-button type="primary" @click="modifyRuleStatus(1)" v-if="permission.includes('ZBPCC01080103')">{{ $text.enable }}</el-button>
        <el-button type="primary" @click="modifyRuleStatus(0)" v-if="permission.includes('ZBPCC01080104')">{{ $text.stopUsing }}</el-button>
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
              <el-button type="text" v-if="permission.includes('ZBPCC01080102')" size="small" @click="edit(scope.row.ruleNo)" >
                {{ $text.edit }}
              </el-button>
              <el-button type="text" size="small"
                         v-if="scope.row.status === 1 && permission.includes('ZBPCC01080104')"
                         @click="disableRule(scope.row.ruleNo)">
                {{ $text.stopUsing }}
              </el-button>
              <el-button type="text" size="small"
                         v-if="scope.row.status != 1 && permission.includes('ZBPCC01080103')"
                         @click="enableRule(scope.row.ruleNo)">
                {{ $text.enable }}
              </el-button>
              <el-button type="text" size="small" @click="del(scope.row.ruleNo)" >
                {{ $text.del }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="ruleName"
            label="积分规则名称"
            width="180"
            show-overflow-tooltip
          >
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
            label="规则创建时间"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
          >
            <template slot-scope="scope">
              <i-status :type="['error', 'success'][scope.row.status]" :message="['停用', '启用'][scope.row.status]" />
            </template>
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
        title="新增积分规则"
        :visible.sync="dialogVisible"
        width="400px"
        height="512px"
        :before-close="handleClose">
      <div class="del-form">
        <el-form :model="form" ref="form" label-width="100px">
          <el-form-item label="规则名称">
            <el-input v-model="form.ruleName"></el-input>
          </el-form-item>
          <el-form-item class="rule-addrule-dialog" label="积分规则节点">
            <el-input disabled v-model="['商品下单','商品入库','商品出库'][form.type]"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="back">取 消</el-button>
        <el-button type="primary" @click="saveRuleForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>