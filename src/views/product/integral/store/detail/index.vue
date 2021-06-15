<template>
  <div class="page">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all"/>
      <el-tab-pane label="获取记录" name="gain"/>
      <el-tab-pane label="消耗记录" name="consume"/>
      <el-tab-pane label="操作日志" name="operate"/>
    </el-tabs>
    <div class="toolbar-box">
      <div>
        <div class="label">发生时间</div>
        <div class="content">
          <el-date-picker
              v-model="toolBar.dataRange"
              type="daterange"
              range-separator="~"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <div>
        <div class="label">业务类型</div>
        <div class="content">
          <el-select clearable v-model="toolBar.txnCodeArray.value" placeholder="请选择业务类型">
            <el-option
                    v-for="item in toolBar.txnCodeArray.options"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="listIntegralStoreDetailByPage" >{{ $text.search }}</el-button>
    </div>
    <div class="detail-box">
      <div class="detail-item flex-center">
        <div class="detail-info">
          <div class="item-row">
            <div class="label special">
              <i class="iconfont mendian"/>
              <span>门店名称：</span>
            </div>
            <div class="content">
              <el-tag size="small" type="danger" v-if="form.statusTag">{{form.statusTag}}</el-tag>
              <span>{{storeName}}</span>
            </div>
          </div>
          <div class="item-row">
            <div class="label">
              <span>门店code：</span>
            </div>
            <div class="content">
              <span>{{storeNo}}</span>
            </div>
          </div>
          <div class="item-row">
            <div class="label">
              <span>门店创建时间：</span>
            </div>
            <div class="content">
              <span>{{form.created}}</span>
            </div>
          </div>
        </div>
        <div class="table-info">
          <span class="integral-use">当前可用积分 <b>{{form.availableAmount}}</b></span>
          <importExport
              :showExport="true"
          />
        </div>
      </div>
      <div class="table-main">
        <div class="table">
          <el-table
            :data="tableData"
            header-cell-class-name="table-header-item"
            v-loading="tableLoading"
          >
            <el-table-column
              type="index"
              label="序号"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="amount"
              label="积分变化"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div :class="scope.row.type > 1 ? 'danger':'success'">
                  {{scope.row.type > 1 ? '- ':'+ '}}{{scope.row.amount}}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="typeDescription"
              label="发生类型"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="accountTime"
              label="发生时间"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="refNo"
              label="关联信息"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="remarks"
              label="备注"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column/>
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
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "index";
</style>
