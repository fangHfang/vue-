<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">经销商名称</div>
        <div class="content">
          <dealerSelect @change="dealerChange" ref="dealer"/>
        </div>
      </div>
      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <storeSelect @change="storeChange" ref="store"/>
        </div>
      </div>
      <div>
        <div class="label">兑换单号</div>
        <div class="content">
          <el-input clearable v-model="toolBar.orderNo" placeholder="请输入兑换单号"></el-input>
        </div>
      </div>
      <div>
        <div class="label">快递单号</div>
        <div class="content">
          <el-input clearable v-model="toolBar.courierNo" placeholder="请输入快递单号"></el-input>
        </div>
      </div>
      <div>
        <div class="label">收货地址</div>
        <div class="content">
          <el-input clearable v-model="toolBar.receiveAddress" placeholder="请输入收货地址"></el-input>
        </div>
      </div>
      <div>
        <div class="label">状态查询</div>
        <div class="content">
          <el-select clearable v-model="toolBar.orderReceiveStatus.value" placeholder="请选择状态">
            <el-option
              v-for="item in toolBar.orderReceiveStatus.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="searchDataPage">{{ $text.search }}</el-button>
      <el-button type="primary" @click="clearSearch" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar" v-show="activeName !== 'third'">
        <el-button type="primary" @click="toDeliver" v-if="permission.includes('ZBPCC01080402')">发货</el-button>
        <importExport
            :showExport="permission.includes('ZBPCC01080401')"
        />
        <!-- <el-button type="primary" @click="toDetail">{{ $text.detail }}</el-button> -->
      </div>
      <div class="table">
        <el-table
          v-loading="tableLoading"
          :data="tableData"
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
            width="80"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="toDetail(scope.row.orderNo)"
              >
                {{ $text.detail }}
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
                  prop="orderNo"
                  label="兑换单号"
                  width="160"
                  show-overflow-tooltip
          >
          </el-table-column>
             <el-table-column
            prop="courierNo"
            label="快递单号"
            width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="orderTime"
                  label="发生时间"
                  width="160"
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
                  width="140"
                  show-overflow-tooltip
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
                  prop="storeName"
                  label="门店名称"
                  width="140"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="integrationAmount"
                  label="花费积分"
                  width="100"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="orderReceiveStatus"
                  label="状态"
                  width="100"
          >
            <template slot-scope="scope">
              <div class="i-status">
                <div :class="[scope.row.orderReceiveStatus === '未发货' ? 'warning' : 'success']"></div>
                <p>{{scope.row.orderReceiveStatus}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="orderItemNames"
            label="兑换商品"
            show-overflow-tooltip
            width="140"
          >
          </el-table-column>
          <el-table-column
            prop="receiveAddress"
            label="收货地址"
            width="160"
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
    <dialogDeliver :tableDataDeliver.sync="tableDataDeliver" :dialogVisible.sync="dialogVisible" @selectDeliver="getSelectDeliver"/>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>