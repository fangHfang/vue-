<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">经销商状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.class.value" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.class.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">经销商名称</div>
        <div class="content">
          <dealerSelect @change="dealerChange" ref="dealer"/>
        </div>
      </div>
      <el-button type="primary" @click="searchDealerListByPage">{{ $text.search }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" @click="enableDealerFunc" v-if="permission.includes('ZBPCB01010101')">{{ $text.enable }}</el-button>
        <el-button type="primary" @click="disableDealerFunc" v-if="permission.includes('ZBPCB01010102')">{{ $text.stopUsing }}</el-button>
        <el-button type="primary" @click="toAdd" v-if="permission.includes('ZBPCB01010103')">{{ $text.newAdd }}</el-button>
        <!-- <el-button type="primary" @click="toEdit">{{ $text.edit }}</el-button> -->
        <importExport
            :showExport="permission.includes('ZBPCB01010106')"
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
              width="100"
          >
             <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                 v-if="permission.includes('ZBPCB01010104')"
                  :style="{color:(scope.row.status===1) ? '' : '#CCCCCC'}"
                  @click.stop="(scope.row.status===1) ? toEdit(scope.row.customerNo,scope.row.dealerNo,scope.row.tenantNo) : ''"
              >
                编辑
              </el-button>
              <el-button
                type="text"
                size="small"
                  @click="toDetail(scope.row.customerNo,scope.row.dealerNo,scope.row.tenantNo)"
              >
                {{$text.detail}}
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
            width="180"
          >
              <!-- <template slot-scope="scope">
                <div class="table-name-color">{{ scope.row.name }}</div>
              </template> -->
          </el-table-column>
          <el-table-column
              width="150"
              prop="dealerNo"
              label="内部经销商号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              width="150"
              prop="outRefNo"
              label="经销商编号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="经销商地址"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="payFun"
            label="支付功能"
            width="120"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['success', 'error'][scope.row.payFun]" :message="['开启', '关闭'][scope.row.payFun]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="payStatus"
            label="支付通道"
            width="120"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['success', 'error'][scope.row.payStatus]" :message="['已开通', '未开通'][scope.row.payStatus]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="merchNo"
            label="商户号"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="contact"
              label="经销商联系人"
              width="160"
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
            prop="status"
            label="状态"
            width="100"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['success', 'error'][scope.row.status]" :message="['启用', '停用'][scope.row.status]" />
              </div>
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
              prop="remarks"
              label="备注"
              width="120"
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