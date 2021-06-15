<template>
  <div class="page">
    <div class="toolbar-box down-store-info-list-toolbar">
      <div>
        <div class="label">申请换新时间</div>
        <div class="content">
          <el-date-picker
            v-model="toolBar.createTime"
            type="daterange"
            range-separator="~"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          />
        </div>
      </div>
      <div>
        <div class="label">查找订单</div>
        <div class="content">
          <el-input clearable v-model="toolBar.warehouseOutNo" placeholder="请输入订单号"></el-input>
        </div>
      </div>
      <div>
        <div class="label">订单状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.renewStatus.value" :placeholder="$text.selectPlaceholder">
            <el-option
                    v-for="item in toolBar.renewStatus.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">审核状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.renewApprovalStatus.value" :placeholder="$text.selectPlaceholder">
            <el-option
                    v-for="item in toolBar.renewApprovalStatus.options"
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
          <storeSelect @change="storeChange" ref="store"/>
        </div>
      </div>
      <div v-show="searchDetailShow">
        <div class="label">订单商品名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.renewSearchItemName" placeholder="请输入订单商品名称"></el-input>
        </div>
      </div>
      <div v-show="searchDetailShow">
        <div class="label">换新轮胎名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.renewSearchNewItemName" placeholder="请输入换新轮胎名称"></el-input>
        </div>
      </div>
      <div v-show="searchDetailShow">
        <div class="label">客户名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.carName" placeholder="请输入客户名称"></el-input>
        </div>
      </div>
      <div v-show="searchDetailShow">
        <div class="label">车牌号</div>
        <div class="content">
          <el-input clearable v-model="toolBar.carNumber" placeholder="请输入车牌号"></el-input>
        </div>
      </div>
      <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="resetTableData">{{ $text.reset }}</el-button>
      <div class="table-top-font">
        <div @click="tableFontClick">{{ searchDetailShow ? '收起' : '展开' }}<div :class="searchDetailShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></div></div>
      </div>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <importExport
            :showExport="permission.includes('ZBPCC01010501')"
        />
      </div>
      <div class="table">
        <el-table
          ref="table"
          :data="tableData"
          style="width: 100%"
          header-cell-class-name="table-header-item"
          v-loading="tableLoading"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            fixed
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
              label="操作"
              fixed
              width="55">
            <template slot-scope="scope">
              <el-button
                  type="text"
                  size="small"
                  @click="toDetail(scope.row)"
              >
                {{$text.detail}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="55"
          >
          </el-table-column>
          <el-table-column
                  prop="warehouseOutNo"
                  label="订单编号"
                  width="140"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="claimNo"
                  label="换新轮胎订单号"
                  width="120"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="renewTime"
                  label="创建时间"
                  width="160"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="vehicleOwnerCarName"
                  label="客户名称"
                  width="120"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="vehicleOwnerCarNumber"
                  label="车牌号"
                  width="100"
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
                  prop="dealerName"
                  label="所属经销商"
                  width="140"
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
                  prop="renewDetailList"
                  label="订单商品"
                  width="140"
                  show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row.goodsList[0] && scope.row.goodsList[0].itemName}}</span>
            </template>
          </el-table-column>
          <el-table-column
                  prop="itemBarCode"
                  label="订单商品条码"
                  width="140"
                  show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row.goodsList[0] && scope.row.goodsList[0].itemBarCode}}</span>
            </template>
          </el-table-column>
          <el-table-column
                  prop="period"
                  label="周期"
                  width="80"
                  show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row.tyreList[0] && scope.row.tyreList[0].period}}</span>
            </template>
          </el-table-column>
          <el-table-column
                  prop="itemName"
                  label="换新轮胎"
                  width="140"
                  show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row.tyreList[0] && scope.row.tyreList[0].itemName}}</span>
            </template>
          </el-table-column>
          <el-table-column
                  prop="itemBarCode"
                  label="换新轮胎条码"
                  width="140"
                  show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{scope.row.tyreList[0] && scope.row.tyreList[0].itemBarCode}}</span>
            </template>
          </el-table-column>
          <el-table-column
                  prop="renewNewQuantity"
                  label="换新轮胎数量"
                  width="110"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="renewApprovalStatus"
                  label="审核状态"
                  width="100"
                  show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['success','warning', 'success', 'error'][scope.row.renewApprovalStatus]" :message="['不用审批', '待审核', '已通过', '已拒绝'][scope.row.renewApprovalStatus]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
                  prop="renewStatus"
                  label="订单状态"
                  width="100"
                  show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div class="elFont">
                <i-status class="i-status" :type="['warning','error','success','success'][scope.row.renewStatus]" :message="['审核中','未通过','已通过','已换新'][scope.row.renewStatus]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
                  prop="renewFlow"
                  label="处理流程"
                  min-width="140"
                  show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{['提交申请','玛吉斯同意','玛吉斯驳回','门店换货,玛吉斯没有同意','完成,玛吉斯没有同意','门店换货,玛吉斯同意','完成,玛吉斯同意'][scope.row.renewFlow]}}</span>
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
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>