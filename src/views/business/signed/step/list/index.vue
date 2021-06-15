<template>
  <div class="page">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="年度签约" name="contract"/>
      <el-tab-pane label="门店确认" name="confirm"/>
    </el-tabs>
    <div class="toolbar-box">
      <div>
        <div class="label">规则名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.name" placeholder="请输入规则名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">规则状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.status.value" placeholder="规则状态">
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
      <!-- <el-button v-if="lastActiveName === 1" type="primary" plain>复用签约规则</el-button> -->
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button
          type="primary"
         v-if="permission.includes('ZBPCC01030101')"
          @click="openAddDialog">
          {{ $text.newAdd }}
        </el-button>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          header-cell-class-name="table-header-item"
          v-loading="tableLoading"
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
            :width="[activeName === 'contract'? '220':'140']"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"

                v-if="permission.includes('ZBPCC01030102')"
                @click="toAdd(activeName,scope.row.ruleNo)"
              >
                {{ $text.edit }}
              </el-button>

              <el-button
                type="text"
                size="small"
                v-if="scope.row.status === 0 &&permission.includes('ZBPCC01030103')"
                @click="scRuleStatus(scope.row.ruleNo,1)"
              >
                启用
              </el-button>
              <el-button
                type="text"
                size="small"
                v-if="scope.row.status === 1 &&permission.includes('ZBPCC01030104')"
                @click="scRuleStatus(scope.row.ruleNo,0)"
              >
                终止
              </el-button>

            </template>
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="ruleName"
            label="签约名称"
            width="250"
          >
          </el-table-column>
          <el-table-column
            prop="two"
            label="签约周期"
            width="250"
            show-overflow-tooltip
          >
           <template slot-scope="scope">
            {{scope.row.startDate}}至{{scope.row.endDate}}
          </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="签约状态"
            width="140"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['error', 'success'][scope.row.status]" :message="['终止', '启用'][scope.row.status]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="storeCount"
            label="签约门店数量"
            width="260"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="remark"
              label="备注"
              width="260"
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
        <!-- 新增弹窗 -->
    <el-dialog
      title="新增签约"
      :visible.sync="dialogAddVisible"
      width="30%"
      :before-close="addHandleClose">
      <el-form :model="form" ref="form" label-width="100px">
        <div class="del-form">
            <el-form-item label="签约类型" v-if="lastActiveName === 0">年度签约</el-form-item>
            <el-form-item label="签约类型" v-else>门店签约</el-form-item>
            <el-form-item label="签约名称" prop="name">
              <el-input v-model="form.name" maxlength="20" show-word-limit ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="scRuleCrete">立即创建</el-button>
              <el-button @click="addHandleClose">取消</el-button>
            </el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>