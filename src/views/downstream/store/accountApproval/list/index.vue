<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">门店账号审批</div>
        <div class="content">
          <el-select clearable v-model="toolBar.approveStatus" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in statusOptions"
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
          <dealerSelect @item-change="dealerChange"/>
        </div>
      </div>
      <div>
        <div class="label">门店名称</div>
        <div class="content">
         <storeSelect @item-change="storeChange" ref="store"/>
        </div>
      </div>
      <div>
        <div class="label">所在区域编码</div>
        <div class="content">
          <el-input clearable v-model="toolBar.regionNo" placeholder="请输入所在区域编码"></el-input>
        </div>
      </div>
      <el-button type="primary" @click="searchDataPage">{{ $text.search }}</el-button>
      <el-switch
        v-model="toolBar.auto"
        active-text="手动审批"
        inactive-text="自动通过"
        active-value="1"
        inactive-value="0"
        @change="autoApproval">
      </el-switch>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" v-if="permission.includes('ZBPCB01020401')" @click="rowsPass">{{ $text.pass }}</el-button>
        <el-button type="primary" v-if="permission.includes('ZBPCB01020402')" @click="rowsRefuse">{{ $text.refuse }}</el-button>
        <importExport
            :showExport="true"
        />
        <!-- <el-button type="primary" @click="upShelfFunc">{{ $text.upShelf }}</el-button>
        <el-button type="primary" @click="downShelfFunc">{{ $text.downShelf }}</el-button>
        <el-button type="primary" >{{ $text.newAdd }}</el-button>
        <el-button type="primary" >{{ $text.edit }}</el-button>
         -->
      </div>
      <div class="table">
        <el-table
          ref="table"
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
            fixed="right"
            label="操作"
            align="center"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="toDetail(scope.row.customerNo)"
              >
                {{ $text.detail }}
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
            label="门店名称"
            width="220"
          >
           <template slot-scope="scope">
              <div @click="toDetail(scope.row.customerNo)"
              style="cursor: pointer;color:#ED6D00" >
                {{scope.row.name}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
              prop="storeNo"
              width="200"
              label="内部门店号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="storeRefNo"
              width="150"
              label="门店编号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="license"
            align="center"
            label="门店营业执照"
            width="120"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div class="img-url">
                <img class="image" :src="scope.row.license" alt="">
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="dealerName"
            label="所属经销商"
            width="220"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              width="200"
              prop="dealerNo"
              label="内部经销商号"
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
<!--          <el-table-column-->
<!--              prop="locationAddress"-->
<!--              label="门店定位地址"-->
<!--              width="160"-->
<!--              show-overflow-tooltip-->
<!--          >-->
<!--            <template slot-scope="scope">-->
<!--              <div>-->
<!--                {{scope.row.latitude+','+scope.row.longitude}}-->
<!--              </div>-->
<!--            </template>-->
<!--          </el-table-column>-->
          <el-table-column
              prop="addressDetail"
              label="门店填写地址"
              width="160"
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
            prop="approveStatus"
            label="审批状态"
            width="110"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['warning', 'success', 'error'][scope.row.approveStatus]" :message="['待审批', '审批通过','审批不通过'][scope.row.approveStatus]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
              prop="created"
              label="申请时间"
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
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";

</style>