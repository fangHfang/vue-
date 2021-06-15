<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <storeSelect @change="storeChange"/>
        </div>
      </div>
      <div>
        <div class="label">签约状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.approvalStatus.value" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.approvalStatus.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="search">{{ $text.search }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <importExport
            :showExport="permission.includes('ZBPCC01030201')"
        />
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
            width="55"
          >
          </el-table-column>
          <el-table-column
            fixed="left"
            label="操作"
            width="80"
          >

            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="toDetail(scope.row.ruleNo,scope.row.customerNo)"
              >
                详情
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
            prop="storeInfoDTO.storeName"
            label="门店名称"
            width="140"
          >
          </el-table-column>
          <el-table-column
              prop="storeInfoDTO.storeNo"
              width="150"
              label="内部门店号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="storeInfoDTO.storeRefNo"
              width="150"
              label="门店编号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="signCycle"
            label="签约周期"
            width="160"
            show-overflow-tooltip
          >
           <template slot-scope="scope">
            {{scope.row.startDate}}至{{scope.row.endDate}}
          </template>
          </el-table-column>
          <el-table-column
            prop="ruleName"
            label="签约规则"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="applyTime"
            label="门店签约时间"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="upperLimit"
            label="签约上限"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="lowerLimit"
            label="签约下限"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
            <el-table-column
            prop="approvalBy"
            label="审核人"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="approvalTime"
            label="审核时间"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="approvalStatus"
            label="审批状态"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['warning','success', 'error'][scope.row.approvalStatus]" :message="['待审批', '审批通过','审批不通过'][scope.row.approvalStatus]" />
              </div>
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