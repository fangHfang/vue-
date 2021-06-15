<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">按门店</div>
        <div class="content">
          <storeSelect @change="storeChange" ref="store"/>
        </div>
      </div>
     <div>
        <div class="label">积分清零时间</div>
        <div class="content">
          <el-date-picker
            v-model="toolBar.searchTime"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy/MM/dd"
          >
          </el-date-picker>
        </div>
      </div>
      <el-button type="primary" @click="searchDataPage">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="resetNotifyByPage">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar" v-show="activeName !== 'third'">
        <importExport
            :showExport="permission.includes('ZBPCC01080502')"
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
            type="index"
            label="序号"
            width="60"
          >
          </el-table-column>

          <el-table-column
            fixed="left"
            label="操作"
            width="140"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="noticeDetail(scope.row)"
              >
                {{ $text.detail }}
              </el-button>
               <el-button
                type="text"
                size="small"
                 v-if="permission.includes('ZBPCC01080504')"
                @click="noticeAgain(scope.row.notifyNo)"
              >
                再次通知
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="created"
            label="通知时间"
            width="160"
          >
          </el-table-column>
          <!--<el-table-column-->
            <!--prop="content"-->
            <!--label="通知内容"-->
            <!--width="200"-->
            <!--show-overflow-tooltip-->
          <!--&gt;-->
          <!--</el-table-column>-->
          <el-table-column
            prop="storeName"
            label="通知门店"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="storeRefNo"
            label="门店code"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="createBy"
            label="操作人"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column></el-table-column>
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
    <dialogNotice :dialogVisible.sync="dialogVisible" :notifyNo="notifyNo"/>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>