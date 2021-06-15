<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">查找礼包</div>
        <div class="content">
          <el-input clearable v-model="toolBar.name" placeholder="请输入礼包名称" @keyup.native.enter="searchTableData"></el-input>
        </div>
      </div>
      <div>
        <div class="label">活动时间</div>
        <div class="content">
           <el-date-picker
            v-model="toolBar.date"
            type="daterange"
            unlink-panels
            value-format="yyyy/MM/dd"
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
      <el-button type="primary" @click="searchTableData">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="resetTableData">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" @click="toAdd" v-if="permission.includes('ZBPCD01030101')"><i class="iconfont jia"></i> 新增</el-button>
        <el-button type="primary" class="reset" @click="modifySaleStatus(1)" v-if="permission.includes('ZBPCD01030102')">{{ $text.upShelf }}</el-button>
        <el-button type="primary" class="reset" @click="modifySaleStatus(0)" v-if="permission.includes('ZBPCD01030103')">{{ $text.downShelf }}</el-button>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
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
            width="220"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                :style="{color:(scope.row.saleStatus===0 || scope.row.status===0) ? '' : '#CCCCCC'}"
                @click.stop="(scope.row.saleStatus===0 || scope.row.status===0) ? toEdit(scope.row) : ''"
              >
                {{ $text.edit }}
              </el-button>
              <el-button
                type="text"
                size="small"
                @click.stop="toDetail(scope.row)"
              >
                {{ $text.detail }}
              </el-button>
              <el-button
                  v-if="scope.row.saleStatus === 0 && permission.includes('ZBPCD01030102')"
                  type="text"
                  size="small"
                  @click.stop="onShelves(scope.row)"
              >
                上架
              </el-button>
              <el-button
                  v-if="scope.row.saleStatus === 1 && permission.includes('ZBPCD01030103')"
                  type="text"
                  size="small"
                  @click.stop="offShelves(scope.row)"
              >
                下架
              </el-button>
              <el-button
                type="text"
                size="small"
                @click.stop="toStore(scope.row)"
              >
                配置领取范围
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
            prop="pkgName"
            label="礼包名称"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="regPkgNo"
            label="礼包编码"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="priority"
            label="优先级"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="beginTime"
            label="活动开始时间"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="活动结束时间"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="created"
            label="创建时间"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="礼包状态"
            width="100"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="[ 'warning', 'success', 'error','error'][scope.row.status]" :message="['未开始', '进行中', '已结束','已关闭'][scope.row.status]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="couponQuantity"
            label="礼包卡券数量"
            width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="drawQuantity"
            label="领取门店数量"
            width="140"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="remarks"
            label="备注"
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