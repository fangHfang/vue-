<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.approveStatus.value" placeholder="请选择状态">
            <el-option
                    v-for="item in toolBar.approveStatus.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">经销商名称</div>
        <div class="content">
          <dealerSelect @change="dealerChange" ref="dealer"/>
        </div>
      </div>

      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <storeSelect @change="storeChange"/>
        </div>
      </div>
      <el-button type="primary" @click="searchStoreLocationListByPage">{{ $text.search }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" @click="enableStoreLocationFunc" v-if="permission.includes('ZBPCB01020101')">{{ $text.enable }}</el-button>
        <el-button type="primary" @click="disableStoreLocationFunc" v-if="permission.includes('ZBPCB01020102')">{{ $text.disable }}</el-button>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          v-loading="tableLoading"
          header-cell-class-name="table-header-item"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
          type="selection">
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="80"
          >
          </el-table-column>
          <el-table-column
            fixed="left"
            label="操作"
            width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <!-- 禁用 -->
              <el-button
                type="text"
                v-if="scope.row.status == 0 &&permission.includes('ZBPCB01020102')"
                size="small"
                @click="disableStoreLocationSingle(scope.row.customerNo,scope.row.storeLocationNo)"
              >
                {{ $text.disable }}
              </el-button>
              <!-- 启用 -->
              <el-button
                 v-if="scope.row.status != 0 &&permission.includes('ZBPCB01020101')"
                type="text"
                size="small"
                @click="enableStoreLocationSingle(scope.row.customerNo,scope.row.storeLocationNo)"
              >
                {{ $text.enable }}
              </el-button>
            </template>
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
            prop="storeName"
            label="门店名称"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              width="150"
              prop="dealerNo"
              label="内部经销商号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              width="150"
              prop="dealerRefNo"
              label="经销商编号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="dealerName"
            label="经销商名称"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="addressDetail"
            label="门店定位地址"
            min-width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="140"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <i-status :type="['success' , 'warning'][scope.row.status]" :message="['启用', '禁用'][scope.row.status]"/>
            </template>
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