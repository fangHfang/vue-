<template>
  <div class="page">
    <div class="toolbar-box down-store-info-list-toolbar">
      <div>
        <div class="label">申请时间</div>
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
        <div class="label">审核状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.examineState.value" :placeholder="$text.selectPlaceholder">
            <el-option
                    v-for="item in toolBar.examineState.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">查找订单</div>
        <div class="content">
          <el-input clearable v-model="toolBar.searchOrder" placeholder="请输入订单号"></el-input>
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
      <div>
        <div class="label">车主手机号</div>
        <div class="content">
          <el-input clearable v-model="toolBar.ownerPhone" placeholder="请输入车主手机号"></el-input>
        </div>
      </div>
      <div>
        <div class="label">按车牌查找</div>
        <div class="content">
          <el-input clearable v-model="toolBar.licensePlate" placeholder="请输入车牌号"></el-input>
        </div>
      </div>
      <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="resetTableData">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <importExport
            :showExport="permission.includes('ZBPCC01010401')"
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
                  fixed
                  label="操作"
                  width="160">
            <template slot-scope="scope">
              <el-button
                      type="text"
                      size="small"
                      v-if="scope.row.approvalStatus ===1"
                      @click="agreement(scope.row)"
              >
                同意
              </el-button>
              <el-button
                      type="text"
                      size="small"
                      v-if="scope.row.approvalStatus ===1"
                      @click="refuse(scope.row)"
              >
                {{$text.refuse}}
              </el-button>
              <el-button
                      type="text"
                      size="small"
                      v-if="scope.row.approvalStatus ===3"
                      @click="reback(scope.row)"
              >
                撤销
              </el-button>
              <el-button
                  v-if="scope.row.carBrand && scope.row.carFrameNumber && scope.row.carModel"
                  type="text"
                  size="small"
                  @click="openSupplement(scope.row,'edit')"
              >
                修改车型
              </el-button>
              <el-button
                v-else
                type="text"
                size="small"
                @click="openSupplement(scope.row,'add')"
              >
                补录车型
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
                  width="160"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="warehouseTime"
                  label="申请时间"
                  width="160"
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
                  prop="dealerNo"
                  label="经销商编号"
                  width="140"
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
                  width="100"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="approvalStatus"
                  label="审核状态"
                  width="100"
                  show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['warning','warning', 'success', 'error'][scope.row.approvalStatus]" :message="['', '未审批', '审批通过', '审批拒绝'][scope.row.approvalStatus]" />
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
                  width="120"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="approvalTime"
                  label="操作时间"
                  width="160"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="approvalName"
                  label="操作人"
                  min-width="100"
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
      </div>
    </div>
    <el-dialog
            class="activity-class-box"
            :title="dialogTitle"
            :visible.sync="dialogVisible"
            width="500px">
      <supplementVehicle ref="supplementVehicleRef" :currentRow="currentRow" @validateFailed="validateFailed"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveData">保 存</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>