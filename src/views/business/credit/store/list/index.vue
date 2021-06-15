<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <storeSelect @change="storeChange" ref="store"/>
        </div>
      </div>
      <div>
        <div class="label">门店状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.status.value" :placeholder="$text.selectPlaceholder">
            <el-option
                    v-for="item in toolBar.status.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
      <el-button type="primary" @click="cleanSearch" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" @click="toCredit" v-if="permission.includes('ZBPCC01020202')">变更总授信</el-button>
        <el-button type="primary" @click="toquota" v-if="permission.includes('ZBPCC01020201')">调整已用额度</el-button>
        <el-button type="primary" @click="frozen" v-if="permission.includes('ZBPCC01020203')">{{ $text.frozen }}</el-button>
        <el-button type="primary" @click="enable" v-if="permission.includes('ZBPCC01020204')">{{ $text.enable }}</el-button>
        <importExport
            :showImport="permission.includes('ZBPCC01020206')"
            :showExport="permission.includes('ZBPCC01020207')"
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
            prop="name"
            label="门店名称"
            width="200"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div class="usedColor" @click="toRecord(scope.row.creditNo,scope.row.customerNo,scope.row.name)">{{ scope.row.name }}</div>
            </template>
          </el-table-column>
          <el-table-column
              prop="customerNo"
              label="内部门店code"
              width="200"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="storeRefNo"
              label="门店code"
              width="100"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="address"
              label="门店地址"
              width="200"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="contact"
              label="门店联系人"
              width="120"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="contactPhone"
              label="联系人手机号"
              width="120"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="storeStatus"
                  label="门店状态"
                  width="100"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['success', 'error'][scope.row.storeStatus]" :message="['启用', '禁用'][scope.row.storeStatus]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
                  prop="dealerName"
                  label="所属经销商"
                  width="120"
                  sortable
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="created"
                  label="创建时间"
                  width="120"
                  sortable
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="lineCredit"
                  label="授信额度"
                  width="120"
                  sortable
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="currentAmount"
              label="可用余额"
              width="130"
              sortable
              show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <span class="usedColor">{{scope.row.currentAmount}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
                  prop="debtAmount"
                  label="已用额度"
                  width="120"
                  sortable
                  show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <span class="usedColor">{{scope.row.debtAmount}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
                  prop="status"
                  label="状态"
                  width="120"
                  sortable
                  show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['success', 'error'][scope.row.status]" :message="['有效', '失效'][scope.row.status]" />
              </div>
            </template>
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

    <dialogCredit :dialogVisible.sync="dialogVisible" :isAdjustment.sync="isAdjustment" :row.sync="row" @getWhiteBarPageStore="getWhiteBarPageStore" />
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>