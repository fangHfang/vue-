<template>
  <div class="page">
    <h4 class="page-name">门店签约列表</h4>
    <div class="toolbar-box">
      <div>
        <div class="label">签约规则</div><!-- 已支持 -->
        <div class="content">
          <el-input v-model="toolBar.ruleName" placeholder="请输入签约规则" clearable></el-input>
        </div>
      </div>
      <div>
        <div class="label">门店名称</div><!-- 不支持 -->
        <div class="content">
          <storeSelect @change="storeChange" ref="store"/>

        </div>
      </div>
      <div>
        <div class="label">签约时间</div><!-- 不支持 -->
        <div class="content">
          <el-date-picker
            v-model="toolBar.applyTime"
            type="daterange"
            range-separator="~"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
      </div>
      <div>
        <div class="label">签约上限</div><!-- 不支持 -->
        <div class="content">
          <el-input v-model="toolBar.upperLimit" placeholder="请输入签约上限" clearable></el-input>
        </div>
      </div>
      <div>
        <div class="label">签约下限</div><!-- 不支持 -->
        <div class="content">
          <el-input v-model="toolBar.lowerLimit" placeholder="请输入签约下限" clearable></el-input>
        </div>
      </div>
      <div>
        <div class="label">审核人</div><!-- 不支持 -->
        <div class="content">
          <el-input v-model="toolBar.approvalBy" placeholder="请输入审核人" clearable></el-input>
        </div>
      </div>
      <div>
        <div class="label">审核时间</div><!-- 不支持 -->
        <div class="content">
          <el-date-picker
            v-model="toolBar.approvalTime"
            type="daterange"
            range-separator="~"
            value-format="yyyy-MM-dd HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
      </div>
      <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
    </div>
    <!-- <pre>
      {{toolBar}}
    </pre> -->
    <div class="table-main">
      <div class="actionbar">
        <importExport
            :showExport="permission.includes('ZBPCC01030302')"
        />
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          v-loading="tableLoading"
          header-cell-class-name="table-header-item"
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
            prop="storeInfoDTO.storeName"
            label="门店名称"
            width="140"
          >
          </el-table-column>
          <el-table-column
            prop="storeInfoDTO.storeNo"
            label="内部门店号"
            width="200"
          >
          </el-table-column>
          <el-table-column
              prop="storeInfoDTO.storeRefNo"
              width="150"
              label="门店编号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="ruleName"
            label="签约规则"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <!-- <el-table-column
            prop="signCycle"
            label="签约周期"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column> -->
          <el-table-column
            prop="applyTime"
            label="门店签约时间"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="upperLimit"
            label="签约上限"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="lowerLimit"
            label="签约下限"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
            <el-table-column
            prop="approvalBy"
            label="审核人"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="approvalTime"
            label="审核时间"
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
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>