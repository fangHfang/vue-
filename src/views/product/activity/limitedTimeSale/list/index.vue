<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">查找活动</div>
        <div class="content">
          <el-input v-model="toolBar.name" placeholder="请输入活动名称" @keyup.native.enter="getRemoteTableData"></el-input>
        </div>
      </div>
      <div>
        <div class="label">活动时间</div>
        <div class="content">
          <el-date-picker
              v-model="toolBar.date"
              type="daterange"
              unlink-panels
              value-format="yyyy-MM-dd"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <div>
        <div class="label">活动状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.status.value" placeholder="请选择">
            <el-option
                v-for="item in toolBar.status.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="searchDataPage">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="resetTableData">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar" v-show="activeName !== 'third'">
        <el-button type="primary" @click="addOrEdit" v-if="permission.includes('ZBPCD01030601')"><i class="iconfont jia"></i> 新增</el-button>
        <el-button type="primary" class="reset" v-if="permission.includes('ZBPCD01030604')" @click="modifySaleStatus(1)" >{{ $text.upShelf }}</el-button>
        <el-button type="primary" class="reset" v-if="permission.includes('ZBPCD01030605')" @click="modifySaleStatus(0)" >{{ $text.downShelf }}</el-button>
        <el-button type="primary" class="reset" @click="copyActivity" v-if="permission.includes('ZBPCD01030606')">复制活动</el-button>
        <importExport
            :showExport="true"
            :exportUrl="exportUrl"
            :exportGetData="exportGetData"
            exportFileName="限时抢购活动导出"
        />
      </div>
      <div class="table">
        <el-table
            :data="tableData"
            @row-click="showDialog"
            v-loading="tableLoading"
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
              width="300"
          >
            <template slot-scope="scope">
              <el-button
                  type="text"
                  size="small"
                   v-if="permission.includes('ZBPCD01030602')"
                  :style="{color:(scope.row.saleStatus===0 || scope.row.promotionStatus===0) ? '' : '#CCCCCC'}"
                  @click.stop="(scope.row.saleStatus===0 || scope.row.promotionStatus===0) ? edit(scope.row) : ''"
              >
                {{ $text.edit }}
              </el-button>
              <el-button
                  type="text"
                  size="small"
                  @click.stop="toDetail(scope.row.promotionNo)"
              >
                {{ $text.detail }}
              </el-button>
              <el-button
                  v-if="scope.row.saleStatus === 0 && permission.includes('ZBPCD01030604')"
                  type="text"
                  size="small"
                  @click.stop="onShelves(scope.row)"
              >
                上架
              </el-button>
              <el-button
                  v-if="scope.row.saleStatus === 1 && permission.includes('ZBPCD01030605')"
                  type="text"
                  size="small"
                  @click.stop="offShelves(scope.row)"
              >
                下架
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="copyActivityLink(scope.row.categoryNo)"
              >
                {{ $text.copyLink }}
              </el-button>
              <el-button
                  v-if="permission.includes('ZBPCD01030603')"
                  type="text"
                  size="small"
                  @click.stop="toStore(scope.row.promotionNo)"
              >
                配置门店权限
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
              prop="categoryName"
              label="活动分类"
              width="160"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="promotionRule"
              label="活动规则名称"
              width="200"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="promotionName"
              label="活动名称"
              width="200"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="startTime"
              label="活动开始时间"
              width="200"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="endTime"
              label="活动结束时间"
              width="200"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="created"
              label="创建时间"
              width="200"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="promotionStatus"
              label="活动状态"
              width="140"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="[ 'error', 'success', 'warning'][scope.row.promotionStatus]" :message="['未开始', '进行中', '已结束'][scope.row.promotionStatus]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
              prop="itemCount"
              label="活动商品数量"
              width="140"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="viewCount"
              label="浏览量"
              width="140"
              show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
              prop="orderCount"
              label="订单数量"
              width="160"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="orderAmount"
              label="成交金额（元）"
              width="160"
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
