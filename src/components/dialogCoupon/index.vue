<template>
<div>
   <el-dialog
       :title="title"
      :visible.sync="dialogVisible"
      width="1100px"
       :before-close="handleClose"
      destroy-on-close>
      <div class="border-content">
        <div class="toolbar-box">
          <div>
            <div class="label">卡券名称</div>
            <div class="content">
              <el-input clearable v-model="toolBar.name" placeholder="请输入卡券名称"></el-input>
            </div>
          </div>
          <div>
            <div class="label">卡券状态</div>
            <div class="content">
              <el-select clearable v-model="toolBar.status.value" placeholder="请选择卡券状态">
                <el-option
                  v-for="item in toolBar.status.options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div v-if="integralTitle !== 'integral'">
            <div class="label">卡券类型</div>
            <div class="content">
              <el-select clearable v-model="toolBar.couponClass.value" placeholder="请选择">
                <el-option
                    v-for="item in toolBar.couponClass.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <el-button type="primary" @click="searchTableData">{{ $text.search }}</el-button>
          <el-button type="primary" plain @click="resetData">{{ $text.reset }}</el-button>
        </div>
        <div class="table-main">
        <div class="table">
          <el-table
            :data="tableData"
            max-height="300"
            header-cell-class-name="table-header-item"
            v-loading="tableLoading"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
                fixed="left"
                type="selection"
                width="50"
            >
            </el-table-column>
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="55"
            >
            </el-table-column>
            <el-table-column
              prop="ruleName"
              label="卡券名称"
              width="160"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="time"
              label="卡券有效时间"
              width="300"
              show-overflow-tooltip
            >
              <template slot-scope="scope" >
                {{scope.row.startTime}}-{{scope.row.endTime}}
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              label="卡券状态"
              width="90"
              show-overflow-tooltip
            >
            <template slot-scope="scope">
              <div>
                <i-status :type="['error','success'][scope.row.status]" :message="['终止','启用'][scope.row.status]" />
              </div>
            </template>
            </el-table-column>
            <el-table-column
              prop="created"
              label="卡券创建时间"
              width="155"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                v-if="integralTitle !== 'integral'"
                prop="couponClass"
                label="卡券类型"
                width="100"
            >
              <template slot-scope="scope">
                <div>
                  {{['消费券', '兑换券'][scope.row.couponClass]}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
                prop="remark"
                label="备注"
                min-width="140"
                show-overflow-tooltip
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
      </div>

     <span slot="footer" class="dialog-footer flex-center">
       <el-button type="primary" @click="addProduct">{{ $text.add }}</el-button>
       <el-button @click="handleClose">{{ $text.cancel }}</el-button>
     </span>
    </el-dialog>
</div>

</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
