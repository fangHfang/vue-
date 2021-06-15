<template>
  <div class="page">
    <div class="convert-rule-add-font-box">
      <div style="padding: 15px;color:#000;font-weight:700">设置商品兑换点</div>
      <div>（此处选择商品范围为所有玛吉斯标准产品物料表)</div>
    </div>
    <div class="toolbar-box-wrap">
      <div class="toolbar-box activity-detail-toolbar-box">
        <div>
          <div class="label">产品代号</div>
          <div class="content">
            <el-input clearable v-model="toolBar.activity.productCode" placeholder="请输入产品代号"/>
          </div>
        </div>
        <div>
          <div class="label">规格</div>
          <div class="content">
            <el-input clearable v-model="toolBar.activity.spec" placeholder="请输入产品规格"/>
          </div>
        </div>
        <div>
          <div class="label">品牌</div>
          <div class="content">
            <el-input clearable v-model="toolBar.activity.brandName" placeholder="请输入产品品牌"/>
          </div>
        </div>
        <div>
          <div class="label">尺寸</div>
          <div class="content">
            <el-input clearable v-model="toolBar.activity.size" placeholder="请输入产品尺寸"/>
          </div>
        </div>
        <div>
          <div class="label">花纹</div>
          <div class="content">
            <el-input clearable v-model="toolBar.activity.tread" placeholder="请输入产品花纹"/>
          </div>
        </div>
        <el-button type="primary" @click="pageRbStoreRelations">{{ $text.search }}</el-button>
        <el-button type="primary" plain @click="resetSearchCondition4Rules">{{ $text.reset }}</el-button>
        <importExport
            :showImport="true"
            :showExport="true"
            :exportUrl="exportUrl"
            :importUrl="importUrl"
            :templateUrl="templateUrl"
            :exportGetData="exportGetData"
            exportFileName="兑换点规则导出"
            @refreshTableData="pageRbStoreRelations"
        />
      </div>
    </div>
    <div class="activity-btn-box">
      <div class="title">产品</div>
      <div>
        <el-button type="primary" size="small" @click="dialogVisible=true;addBtnLoading=false">{{ $text.add }}</el-button>
        <el-button type="primary" size="small" @click="removeProductFromTable">{{ $text.del }}</el-button>
      </div>
    </div>
    <collapse :open="false">
      <div slot="title" class="collapse-title toolbar-box">
        <div v-for="(x,i) in natureList.slice(0,4)" :key="i" :class="i===activeIndex?'active':''" @click="natureCheck(i)">{{x.value}}</div>
      </div>
      <div slot="content" class="collapse-content toolbar-box">
        <div v-for="(x,i) in natureList.slice(4)" :key="i" :class="(i+4)===activeIndex?'active':''" @click="natureCheck(i+4)">{{x.value}}</div>
      </div>
    </collapse>
    <div class="table-main">
      <div class="table">
        <el-table
            :data="tableData"
            max-height="330"
            header-cell-class-name="table-header-item"
            v-loading="tableLoading"
            @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column
              prop="productNo"
              label="产品编号"
              width="200"
              show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div class="table-color-rule-add" @click="openProductCodeByNoDialog(scope.row.productNo)">{{ scope.row.productNo }}</div>
            </template>
          </el-table-column>
          <el-table-column
              prop="productCode"
              label="成品代号"
              width="140"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="spec"
              label="产品规格"
              width="240"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="brandName"
              label="产品品牌"
              width="240"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="productSize"
              label="产品尺寸"
              width="220"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="tread"
              label="产品花纹"
              width="220"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="rebateValue"
              label="返利数值"
              show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div class="table-color-rule-add" @click="openRebateNumberDialog(scope.row)">{{ scope.row.rebateValue }}</div>
            </template>
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
    <div class="btn-footer">
      <el-button type="primary" @click="prev">上一步</el-button>
      <el-button type="primary" :loading='btnLoading' @click="btnLoading = true;$throttle(saveRuleData)">保存上架</el-button>
      <el-button plain @click="backList">{{ $text.cancel }}</el-button>
    </div>
    <dialogMaxxisBasicProduct :dialogVisible.sync="dialogVisible" @productCode="addProductCode2Table"/>
    <dialogProductCodeByNo :productNo.sync="productNo" :dialogVisible.sync="dialogProductNoVisible"/>
    <el-dialog
        title="产品返利数值"
        :visible.sync="showRebateNumberDialog"
        width="500px"
        destroy-on-close
    >
      <div class="con-con">
        <div>
          <div class="label">门店性质：</div>
          <div class="content">
            <span>{{rowData.storeLevelNo}}</span>
          </div>
        </div>
        <div>
          <div class="label">产品代号：</div>
          <div class="content">
            <span>{{rowData.productCode}}</span>
          </div>
        </div>
        <div>
          <div class="label">产品规格：</div>
          <div class="content">
            <span>{{rowData.spec}}</span>
          </div>
        </div>
        <div>
          <div class="label">产品品牌：</div>
          <div class="content">
            <span>{{rowData.brandName}}</span>
          </div>
        </div>
        <div>
          <div class="label">产品尺寸：</div>
          <div class="content">
            <span>{{rowData.size}}</span>
          </div>
        </div>
        <div>
          <div class="label">产品花纹：</div>
          <div class="content">
            <span>{{rowData.tread}}</span>
          </div>
        </div>
        <div>
          <div class="label">返利数值：</div>
          <div class="content">
            <el-input clearable class="input" v-model="rowData.amount" @input="change" placeholder="请输入"/>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer flex-center">
        <el-button type="primary" @click="saveRowData">{{ $text.save }}</el-button>
        <el-button @click="handleClose">{{ $text.cancel }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>