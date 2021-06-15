<template>
  <div class="page">
    <div class="toolbar-box down-store-info-list-toolbar">
      <div>
        <div class="label">查找订单</div>
        <div class="content">
          <el-input clearable v-model="toolBar.searchOrder" placeholder="请输入订单号"></el-input>
        </div>
      </div>
      <div>
        <div class="label">订单状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.orderState.value" :placeholder="$text.selectPlaceholder">
            <el-option
                    v-for="item in toolBar.orderState.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">订单返利状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.rebateState.value" :placeholder="$text.selectPlaceholder">
            <el-option
                    v-for="item in toolBar.rebateState.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">创建时间</div>
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
      <div v-show="searchDetailShow">
        <div class="label">经销商名称</div>
        <div class="content">
          <dealerSelect @change="dealerChange" ref="dealer"/>
        </div>
      </div>
      <div v-show="searchDetailShow">
        <div class="label">门店名称</div>
        <div class="content">
          <storeSelect @change="storeChange" ref="store"/>
        </div>
      </div>
      <div v-show="searchDetailShow">
        <div class="label">车主手机号</div>
        <div class="content">
          <el-input clearable v-model="toolBar.ownerPhone" placeholder="请输入车主手机号"></el-input>
        </div>
      </div>
      <div v-show="searchDetailShow">
        <div class="label">按车牌查找</div>
        <div class="content">
          <el-input clearable v-model="toolBar.licensePlate" placeholder="请输入车牌号"></el-input>
        </div>
      </div>
      <div v-show="searchDetailShow">
        <div class="label">车辆VIN码</div>
        <div class="content">
          <el-input clearable v-model="toolBar.vehicleCode" placeholder="请输入车辆VIN码"></el-input>
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
            :showExport="permission.includes('ZBPCC01010201')"
        />
      </div>
      <div class="table">
        <el-table
          ref="table"
          :data="tableData"
          :row-class-name="getRowClass"
          style="width: 100%"
          header-cell-class-name="table-header-item"
          v-loading="tableLoading"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
                  label="操作"
                  width="70">
            <template slot-scope="scope">
              <el-button
                      type="text"
                      size="small"
                      :loading="scope.row.loading"
                      @click="toogleExpand(scope.row)"
              >
                {{$text.detail}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
                  prop="tableData"
                  type="expand"
                  width="1"
          >
            <template slot-scope="scope">
              <div>
                <el-table
                        style="width: 100%"
                        :data="scope.row.tableData"
                >
                  <el-table-column width="105">
                  </el-table-column>
                  <el-table-column
                          prop="itemName"
                          label="商品名称"
                          width="300"
                          show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                          prop="itemSpecDetail"
                          label="规格"
                          width="140"
                          show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                          prop="itemTyreTread"
                          label="花纹"
                          width="120"
                          show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                          prop="itemTyreInch"
                          label="尺寸"
                          width="80"
                          show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                          prop="itemBarCode"
                          label="条码"
                          width="120"
                          show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                          prop="period"
                          label="周期"
                          width="80"
                          show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                          prop="startTime"
                          label="入库时间"
                          width="160"
                          show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                          prop="obtainRebateType"
                          label="是否享受返利"
                          width="120"
                          show-overflow-tooltip
                  >
                    <template slot-scope="scope">
                      <div>
                        <i-status v-if="scope.row.obtainRebateType<1" class="i-status" type="error" message="否" />
                        <i-status v-else class="i-status" type="success" message="是" />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column
                          prop="obtainRebateTime"
                          label="返利时间"
                          min-width="160"
                          show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="60"
          >
          </el-table-column>
          <el-table-column
                  prop="warehouseOutNo"
                  label="订单编号"
                  width="200"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="storeNo"
              width="200"
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
            width="220"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="dealerName"
            label="所属经销商"
            width="220"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              width="200"
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
                  prop="mobile"
                  label="车主手机号"
                  width="120"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="carNumber"
                  label="车牌号"
                  width="120"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="status"
                  label="订单状态"
                  width="120"
                  show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div class="elFont">
                <i-status class="i-status" :type="['warning','success','warning','error',][scope.row.status]" :message="['','已激活','待审批','已拒绝'][scope.row.status]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
                  prop="rebateType"
                  label="订单返利状态"
                  width="120"
                  show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div class="elFont">
                <i-status class="i-status" :type="['warning','error','success'][scope.row.rebateType]" :message="['不需要','未获得','已获取'][scope.row.rebateType]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
                  prop="carFrameNumber"
                  label="车辆VIN码"
                  width="120"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="carModel"
                  label="车型"
                  width="180"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="createTime"
                  label="开单时间"
                  width="160"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="warehouseTime"
                  label="激活时间"
                  min-width="160"
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
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>