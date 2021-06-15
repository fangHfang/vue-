<template>
  <div class="page">
    <div class="toolbar-box ">
      <div>
        <div class="label">经销商名称</div>
        <div class="content">
          <dealerSelect @change="dealerChange" ref="dealer"/>
        </div>
      </div>
      <div>
        <div class="label">状态</div>
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
        <el-button type="primary" v-if="permission.includes('ZBPCC01020104')">导入总授信</el-button>
        <importExport
            :showExport="permission.includes('ZBPCC01020106')"
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
                  fixed="left"
                  label="操作"
                  width="200"
          >
            <template slot-scope="scope">
              <!-- 冻结 -->
              <el-button
                v-if="scope.row.status === 0 && permission.includes('ZBPCC01020101')"
                type="text"
                size="small"
                @click="frozen(scope.row.creditNo,scope.row.customerNo)"
              >
                {{ $text.frozen }}
              </el-button>
              <!-- 启用 -->
              <el-button
                v-if="scope.row.status === 1 && permission.includes('ZBPCC01020102')"
                type="text"
                size="small"
                @click="enable(scope.row.creditNo,scope.row.customerNo)"

              >
                {{ $text.enable }}
              </el-button>
              <el-button
               v-if="permission.includes('ZBPCC01020103')"
                      type="text"
                      size="small"
                      @click="toCredit(scope.row)"
              >
                变更总授信
              </el-button>
              <el-button
               v-if="permission.includes('ZBPCC01020105')"
                      type="text"
                      size="small"
                      @click="toRecord(scope.row.creditNo,scope.row.customerNo)"

              >
                变更记录
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
            label="经销商名称"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="customerNo"
            label="内部经销商号"
            width="200"
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
              prop="address"
              label="经销商地址"
              width="160"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="contact"
              label="经销商联系人"
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
              prop="lineCredit"
              label="总授信上限"
              width="120"
              sortable
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="allocatedLineCredit"
              label="已分配信用额度"
              width="160"
              sortable
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="distributableLineCredit"
              label="可分配信用额度"
              width="160"
              sortable
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="useAmount"
              label="已用额度"
              width="120"
              sortable
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="100"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['success', 'error'][scope.row.status]" :message="['有效', '冻结'][scope.row.status]" />
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
    <dialogCredit :row.sync="row" :dialogVisible.sync="dialogVisible" @getWhiteBarPageDealer="getWhiteBarPageDealer"/>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>