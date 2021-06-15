<template>
  <div class="page">
    <div style="padding: 15px 0 0 15px;font-weight: bold">资金明细</div>
    <div class="toolbar-box down-store-info-list-toolbar" style="background: #fff;">
      <div style="width: 100%">
        <div class="label"><span class="red fs-14 mgr4">*</span>选择时段</div>
        <div class="flex">
          <el-radio v-model="toolBar.radio" label="1">
            <div class="content">
              <el-date-picker
                      v-model="toolBar.month"
                      type="month"
                      placeholder="选择月">
              </el-date-picker>
            </div>
          </el-radio>
          <el-radio v-model="toolBar.radio" label="2">
            <div class="content">
              <el-date-picker
                      v-model="toolBar.date"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </el-radio>
        </div>
      </div>
    </div>
    <div class="toolbar-box down-store-info-list-toolbar">
      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.storeName" placeholder="请输入"></el-input>
        </div>
      </div>
      <div>
        <div class="label">按客户查找</div>
        <div class="content">
          <el-input clearable v-model="toolBar.customerName" placeholder="请输入"></el-input>
        </div>
      </div>
      <div>
        <div class="label">按供应商查找</div>
        <div class="content">
          <el-input clearable v-model="toolBar.supplierName" placeholder="请输入"></el-input>
        </div>
      </div>
      <div>
        <div class="label">类型</div>
        <div class="content">
          <el-select clearable v-model="toolBar.type.value" :placeholder="$text.selectPlaceholder">
            <el-option
                    v-for="item in toolBar.type.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="listStoreByPage">{{$text.search}}</el-button>
      <el-button type="primary" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <importExport
            :showExport="true"
        />
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
            type="index"
            label="序号"
            width="60"
          >
          </el-table-column>
          <el-table-column
                  prop="type"
                  label="类型"
                  width="120"
          >
          </el-table-column>
          <el-table-column
                  prop="storeName"
                  label="门店名称"
                  width="160"
          >
          </el-table-column>
          <el-table-column
              prop="storeNo"
              width="150"
              label="内部门店号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="storeRefNo"
              width="150"
              label="门店编号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="customerName"
                  label="客户名称"
                  width="120"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="supplierName"
                  label="供应商名称"
                  width="160"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="beginningBalance"
                  label="期初余额"
                  width="120"
                  sortable
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="receivable"
                  label="期间应收"
                  width="120"
                  sortable
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="payable"
                  label="期间应付"
                  width="120"
                  sortable
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="paymentReceived"
                  label="期间收付款"
                  width="120"
                  sortable
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="balance"
                  label="期末余额"
                  width="120"
                  sortable
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="preCollection"
                  label="预收款"
                  width="120"
                  sortable
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="prePay"
                  label="预付款"
                  width="120"
                  sortable
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="created"
                  label="创建时间"
                  width="200"
                  show-overflow-tooltip>
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