<template>
  <div class="page">
    <div class="toolbar-box down-store-info-list-toolbar">
      <div>
        <div class="label">成品代号</div>
        <div class="content">
          <el-input clearable v-model="toolBar.productCode" placeholder="请输入成品代号"></el-input>
        </div>
      </div>
      <div>
        <div class="label">规格</div>
        <div class="content">
          <el-input clearable v-model="toolBar.specDetail" placeholder="请输入规格"></el-input>
        </div>
      </div>
      <div>
        <div class="label">品牌</div>
        <div class="content">
          <el-input clearable v-model="toolBar.brandCode" placeholder="请输入品牌编码"></el-input>
        </div>
      </div>
      <div>
        <div class="label">尺寸</div>
        <div class="content">
          <el-input clearable v-model="toolBar.size" placeholder="请输入尺寸"></el-input>
        </div>
      </div>
      <div>
        <div class="label">花纹</div>
        <div class="content">
          <el-input clearable v-model="toolBar.tread" placeholder="请输入花纹"></el-input>
        </div>
      </div>
      <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="resetTableData">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" @click="selectRule" >添加安心跑获利规则</el-button>
        <el-button type="primary" @click="addRunEase" v-if="permission.includes('ZBPCC01010101')">添加安心跑</el-button>
        <el-button type="primary" @click="deleteBatch" v-if="permission.includes('ZBPCC01010102')">移出安心跑</el-button>
        <importExport
          :showImport="true"
          :showExport="permission.includes('ZBPCC01010103')"
          :exportUrl="exportUrl"
          :importUrl="importUrl"
          :templateUrl="templateUrl"
          :exportGetData="exportGetData"
          exportFileName="安心跑范围设置导出"
          @refreshTableData="searchData"
        />
      </div>
      <div class="table" style="margin-bottom:10px;">
        <el-table
            :data="ruleData"
            header-cell-class-name="table-header-item"
        >
          <el-table-column
            prop="rbRuleName"
            label="选择返利规则(只可选择扫码出库节点)"
            min-width="200"
            show-overflow-tooltip
          />
          <el-table-column
            prop="itRuleName"
            label="选择积分规则(只可选择扫码出库节点)"
            min-width="200"
            show-overflow-tooltip
          />
          <el-table-column
            prop="epRuleName"
            label="选择兑换点规则(只可选择扫码出库节点)"
            min-width="200"
            show-overflow-tooltip
          />
        </el-table>
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
                 v-if="permission.includes('ZBPCC01010102')"
                @click="deleteOne(scope.row)"
              >
                移出安心跑
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="55"
          >
          </el-table-column>
          <el-table-column
                  prop="productNo"
                  label="产品编号"
                  width="200"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="productCode"
                  label="成品代号"
                  width="160"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="specDetail"
            label="规格明细"
            width="300"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="spec"
            label="规格"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="brandName"
            label="品牌"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="size"
            label="英寸"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
                  prop="tread"
                  label="花纹"
                  min-width="120"
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
    <dialogMaxxisBasicProduct mark="runEase" :dialogVisible.sync="maxxisAddProductVisible" @productCode="getProductCode"/>
    <ruleRange :dialogVisible.sync="dialogRuleVisible" @selectRule="getSelectRule"></ruleRange>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
