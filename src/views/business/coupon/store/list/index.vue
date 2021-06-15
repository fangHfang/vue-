<template>
  <div class="page">
    <div class="table-main">
      <div class="actionbar" v-show="activeName !== 'third'">
        <el-button type="primary" v-if="permission.includes('ZBPCC01070401')" @click="dialogVisible = true"
          >选择门店</el-button
        >
        <el-button type="primary" v-if="permission.includes('ZBPCC01070402')" @click="batchDeleteStore">删除门店</el-button>
      </div>
      <div class="table">
        <el-table
          :data="currentTableData"
          header-cell-class-name="table-header-item"
          @selection-change="handleSelectionChange"
        >
          <el-table-column fixed="left" type="selection" width="55" />
          <el-table-column label="序号" type="index">
            <template slot-scope="scope">
              <span>
                {{
                  (searchData.pageNum - 1) * searchData.pageSize +
                    scope.$index +
                    1
                }}</span>
            </template>
          </el-table-column>
          <!--<el-table-column-->
              <!--width="200"-->
              <!--prop="dealerNo"-->
              <!--label="内部经销商号"-->
              <!--show-overflow-tooltip-->
          <!--&gt;-->
          <!--</el-table-column>-->
          <el-table-column
              width="200"
              prop="dealerRefNo"
              label="经销商编号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              width="200"
              prop="dealerName"
              label="经销商名称"
              show-overflow-tooltip
          />
          <!--<el-table-column-->
              <!--prop="storeNo"-->
              <!--width="200"-->
              <!--label="内部门店号"-->
              <!--show-overflow-tooltip-->
          <!--&gt;-->
          <!--</el-table-column>-->
          <el-table-column
              prop="storeRefNo"
              width="200"
              label="门店编号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="name" label="门店名称" />
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchData.pageNum"
          :page-sizes="[10, 20, 50, 100, 200]"
          :page-size="searchData.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
        <el-button type="primary" size="small">
          {{ $text.paginationGo }}
        </el-button>
      </div>
      <div class="pagination">
        <el-button type="primary" size="small" @click="nextStep">
          下一步
        </el-button>
      </div>
    </div>
    <dialogAddStore
      :dialogVisible="dialogVisible"
      @close="dialogVisible = false"
      @selectedStore="selectedStore"
    />
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import './index';
</style>
