<template>
  <div class="page">
    <div style="padding: 15px 0 0 15px;font-weight: 500">签约门店详情</div>
    <div style="padding: 15px 0 0 15px;font-weight: 500">签约信息</div>
    <div class="toolbar-box package-product-detail">
      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <el-input v-model="toolBar.name" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">门店code</div>
        <div class="content">
          <el-input v-model="toolBar.storeNo" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">经销商名称</div>
        <div class="content">
          <el-input v-model="toolBar.dealerName" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">经销商code</div>
        <div class="content">
          <el-input v-model="toolBar.dealerNo" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">所属区域</div>
        <div class="content">
          <el-input v-model="toolBar.address" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">所在城市</div>
        <div class="content">
          <el-input v-model="toolBar.six" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">门店联系人</div>
        <div class="content">
          <el-input v-model="toolBar.contact" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">门店状态</div>
        <div class="content">
          <div class="state-box">
            <i-status :type="['success','warning','error','error'][toolBar.status]" :message="['有效', '冻结','关闭','注销'][toolBar.status]"/>
          </div>
        </div>
      </div>
      <div>
        <div class="label" style="width: 102px;">门店创建时间</div>
        <div class="content">
          <el-input v-model="toolBar.created" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">门店备注</div>
        <div class="content">
          <el-input v-model="toolBar.remarks" readonly></el-input>
        </div>
      </div>
    </div>

    <div style="padding: 15px">门店签约历史</div>
    <div class="table-main rows-more-table">
      <div class="table">
        <el-table
            :data="rowsMoreTableDataTwo"
            header-cell-class-name="table-header-item"
        >
          <el-table-column
              type="selection"
              width="60"
          >
          </el-table-column>
          <el-table-column
              type="index"
              label="序号"
              width="50"
          >
          </el-table-column>
          <el-table-column
              prop="ruleName"
              label="签约规则名称"
              width="150"
              show-overflow-tooltip
          >
          </el-table-column>

        <!-- <el-table-column
              prop="level"
              label="签约等级"
              width="100"
              show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
              prop="three"
              label="签约周期"
              width="150"
              show-overflow-tooltip
          >
          </el-table-column> -->

          <el-table-column
              prop="approvalStatus"
              label="审批状态"
              width="200"
              show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['warning', 'success', 'error'][scope.row.approvalStatus]" :message="['待审批', '审批通过','审批不通过'][scope.row.approvalStatus]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
              prop="approvalBy"
              label="审批人"
              width="150"
              show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
              prop="applyTime"
              width="260"
              label="审批时间"
              show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
              prop="approvalTime"
              label="签约申请时间"
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