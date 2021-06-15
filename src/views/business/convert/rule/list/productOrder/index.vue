<template>
  <div class="page">
    <div class="toolbar-box convert-rule-toolbar">
      <div>
        <div class="label">查找规则</div>
        <div class="content">
          <el-input clearable v-model="toolBar.ruleName" placeholder="请输入兑换点规则名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">创建时间</div>
        <div class="content">
          <el-date-picker
              v-model="toolBar.dataRange"
              type="daterange"
              range-separator="~"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </div>
      </div>
      <div>
        <div class="label">规则状态</div>
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
      <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="reset">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" v-if="permission.includes('ZBPCC01060101')" icon="el-icon-plus" @click="dialogVisible = true;btnLoading=false">{{ $text.newAdd }}</el-button>

        <!-- <el-button type="primary" @click="modifyEpRuleStatus(1)">{{ $text.enable }}</el-button> -->
        <!-- <el-button type="primary" @click="modifyEpRuleStatus(0)">{{ $text.stopUsing }}</el-button> -->
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
            width="140"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                 v-if="permission.includes('ZBPCC01060102')"
                  :style="{color:(scope.row.status===0) ? '' : '#CCCCCC'}"
                  @click.stop="(scope.row.status===0) ? editEpRule(scope.row.ruleNo) : ''"
              >
                {{ $text.edit }}
              </el-button>
              <el-button
                type="text"
                size="small"
                v-if="scope.row.status === 0 && permission.includes('ZBPCC01060103')"
                @click="enableEpRule(scope.row.ruleNo)">
                {{ $text.enable }}
              </el-button>
              <el-button
                type="text"
                size="small"
                 v-if="scope.row.status != 0 && permission.includes('ZBPCC01060104')"
                @click="disableEpRule(scope.row.ruleNo)">
                {{ $text.stopUsing }}
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="delEpRule(scope.row.ruleNo)"
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
            prop="ruleName"
            label="兑换点规则名称"
            width="260"
          >
          </el-table-column>
          <el-table-column
            prop="createBy"
            label="创建人"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="created"
            label="规则创建时间"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="120"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['warning','success'][scope.row.status]" :message="['禁用', '启用'][scope.row.status]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="140"
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
    <el-dialog
      title="新增兑换点规则"
      :visible.sync="dialogVisible"
      width="400px"
      height="512px"
      :before-close="handleClose">
      <div class="del-form">
        <el-form :model="form" ref="form" label-width="100px">
          <el-form-item label="规则名称">
            <el-input v-model="form.ruleName"></el-input>
          </el-form-item>
          <el-form-item class="rule-addrule-dialog" label="兑换点规则节点">
            <el-input disabled v-model="['商品下单','商品入库','商品出库'][form.type]"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading='btnLoading' @click="btnLoading = true;$throttle(saveEpRuleForm)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>