<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">查找客户</div>
        <div class="content">
          <el-input clearable v-model="toolBar.name" placeholder="请输入客户名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">客户手机号</div>
        <div class="content">
          <el-input clearable v-model="toolBar.phone" placeholder="请输入客户手机号"></el-input>
        </div>
      </div>
      <div>
        <div class="label">车牌号</div>
        <div class="content">
          <el-input clearable v-model="toolBar.license" placeholder="请输入车牌号"></el-input>
        </div>
      </div>
      <el-button type="primary" @click="searchDealerListByPage">{{ $text.search }}</el-button>
      <el-button type="primary" @click="clearSearch" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <importExport
            :showExport="permission.includes('ZBPCB01030102')"
        />
      </div>
      <div class="table">
        <el-table
          ref="table"
          :data="tableData"
          style="width: 100%"
          row-key="id"
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
            width="100"
          >
            <template slot-scope="scope" >
              <el-button
                type="text"
                size="small"
               v-if="permission.includes('ZBPCB01030101')"
                @click="changePhone(scope.row.phone,scope.row.userNo)"
              >
                修改手机号
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
            prop="name"
            label="客户名称"
            width="160"
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="客户联系方式"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="gender"
            label="车主性别"
            width="220"
            show-overflow-tooltip
          >
          <template slot-scope="scope" >
            {{['男', '女'][scope.row.gender]}}
          </template>
          </el-table-column>

          <el-table-column
            prop="created"
            label="创建时间"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="vehicleQuantity"
            label="相关车辆数量"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div class="table-top-font flex" style="justify-content: space-between;">
                <div>{{scope.row.vehicleQuantity}}</div>
                <div @click="toogleExpand(scope.row)" class="table-name-color">
                  {{ scope.row.tableOwnerShow ? '收起' : '展开' }}
                  <div :class="scope.row.tableOwnerShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
                  prop="storeVehicleList"
                  type="expand"
                  width="1"
          >
            <template slot-scope="scope">
              <div class="table-data">
                <el-table
                        v-if="scope.row.tableOwnerShow"
                        style="width: 100%"
                        :data="scope.row.storeVehicleList"
                >
                  <el-table-column
                    width="150"
                  >
                  </el-table-column>
                  <el-table-column
                    type="index"
                    label="序号"
                    width="80"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="vinCode"
                    label="车辆VIN码"
                    width="220"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="license"
                    label="车牌号"
                    width="220"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    prop="model"
                    label="车型"
                    width="220"
                    show-overflow-tooltip
                  >
                  </el-table-column>

                  <el-table-column
                    prop="storeName"
                    label="所属门店"
                    width="220"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column>
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="storeQuantity"
            label="所属门店数量"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="remarks"
              label="备注"
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
      </div>
    </div>
    <dialogmMdifyPhone :phone="phone" :userNo="userNo" :dialogVisible.sync="dialogVisible" @listDealerByPage="listDealerByPage" />
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>