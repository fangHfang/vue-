<template>
  <div class="page page-content">
<!--    <h3 class="page-name">配置领取范围</h3>-->
    <div class="item-box">
      <h4 class="item-title has-right-button">
        <span>选择经销商<span :class="dealer.checked?'checked circle':'circle'" @click="visibleChangeAll"><i/> 全部可见</span></span>

        <div class="actionbar" v-if="!dealer.checked">
          <el-button type="primary" @click="addDealer">添加</el-button>
          <el-button type="primary" @click="delDealer">删除</el-button>
        </div>
      </h4>
      <div class="table-main" v-if="!dealer.checked">
        <div class="table">
          <el-table
              :data="dealer.tableData"
              v-loading="dealer.tableLoading"
              @selection-change="handleDealerSelectionChange"
              header-cell-class-name="table-header-item"
          >
            <el-table-column
                type="selection"
                width="55"
            >
            </el-table-column>
            <el-table-column
                fixed="left"
                label="操作"
                width="100"
                align="center"
            >
              <template slot-scope="scope">
                <el-button
                    type="text"
                    size="small"
                    @click="deleteOneDealer(scope.row)"
                >
                  {{ $text.del }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
                type="index"
                label="序号"
                width="100"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="relationNo"
                label="内部经销商号"
                min-width="200"
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
                prop="relationName"
                label="经销商名称"
                min-width="200"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column/>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination
              background
              @size-change="handleDealerSizeChange"
              @current-change="handleDealerCurrentChange"
              :current-page="dealer.pagination.current"
              :page-sizes="dealer.pagination.sizes"
              :page-size="dealer.pagination.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="dealer.pagination.total"
          >
          </el-pagination>
          <el-button type="primary" size="small">{{ $text.paginationGo }}</el-button>
        </div>
      </div>
    </div>
    <div class="item-box">
      <h4 class="item-title has-right-button">
        <span>选择区域</span>

        <div class="actionbar">
          <el-button type="primary" @click="addRegion">添加</el-button>
          <el-button type="primary" @click="delRegion">删除</el-button>
        </div>
      </h4>
      <div class="table-main">
        <div class="table">
          <el-table
              :data="region.tableData"
              v-loading="region.tableLoading"
              @selection-change="handleRegionSelectionChange"
              header-cell-class-name="table-header-item"
          >
            <el-table-column
                type="selection"
                width="55"
            >
            </el-table-column>
            <el-table-column
                type="index"
                label="序号"
                width="100"
                align="center"
            >
            </el-table-column>
            <el-table-column
                prop="relationName"
                label="区域名称"
                min-width="200"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="created"
                label="创建时间"
                min-width="160"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="description"
                label="备注"
                min-width="160"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column/>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination
              background
              @size-change="handleRegionSizeChange"
              @current-change="handleRegionCurrentChange"
              :current-page="region.pagination.current"
              :page-sizes="region.pagination.sizes"
              :page-size="region.pagination.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="region.pagination.total"
          >
          </el-pagination>
          <el-button type="primary" size="small">{{ $text.paginationGo }}</el-button>
        </div>
      </div>
    </div>
    <div class="btn-box">
      <el-button @click="back">{{ $text.return }}</el-button>
    </div>
    <dialogAddDealer mark="activitySetStore" :dialogVisible.sync="dialogDealerVisible" @selectData="getSelectDealer"/>
    <dialogAddRegion mark="activitySetStore" :dialogVisible.sync="dialogRegionVisible" @selectData="getSelectRegion"/>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>