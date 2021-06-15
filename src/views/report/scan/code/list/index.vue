<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">时间段</div>
        <div class="content">
          <el-date-picker
            v-model="toolBar.date"
            type="daterange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
      </div>
      <div>
        <div class="label">是否有效</div>
        <div class="content">
          <el-select clearable v-model="toolBar.scanCodeNature.value" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.scanCodeNature.options"
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
      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <storeSelect @change="storeChange" ref="store"/>
        </div>
      </div>
      <div>
        <div class="label">扫码类型</div>
        <div class="content">
          <el-select clearable v-model="toolBar.scanCodeType.value" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.scanCodeType.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">条形码</div>
        <div class="content">
          <el-input clearable v-model="toolBar.itemBarCode" placeholder="请输入条形码"></el-input>
        </div>
      </div>
      <el-button type="primary" @click="searchTableData">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="resetTableData">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <!-- <importExport
            :showImport="permission.includes('ZBPCE01010101')"
            :showExport="permission.includes('ZBPCE01010101')"
            :exportUrl="exportUrl"
            :importUrl="importUrl"
            :exportGetData="exportGetData"
            exportFileName="扫码记录出"
            @refreshTableData="searchTableData"
        /> -->
        <importExport
            :showExport="permission.includes('ZBPCE01010101')"
            :exportUrl="exportUrl"
            :exportGetData="exportGetData"
            exportFileName="扫码记录出"
            @refreshTableData="searchTableData"
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
              width="180"
              prop="storeName"
              label="门店名称"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              width="220"
              prop="storeNo"
              label="门店code"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="dealerName"
            label="所属经销商"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
              prop="dealerNo"
              width="220"
              label="经销商code"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="itemBarCode"
              width="150"
              label="条形码"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="itemSpecDetail"
            label="规格明细"
            width="220"
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
            prop="created"
            label="扫码时间"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="scanCodeNature"
            label="是否有效"
            width="100"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['success', 'error'][scope.row.scanCodeNature]" :message="['有效', '无效'][scope.row.scanCodeNature]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="scanCodeType"
            label="扫码类型"
            width="80"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['success', 'error'][scope.row.scanCodeType]" :message="['扫码入库', '扫码出库'][scope.row.scanCodeType]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="operatingName"
            label="操作人"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="scanCodeNatureDescribe"
            label="扫码状态描述"
            width="200"
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
        </el-pagination>a
        <el-button type="primary" size="small">{{ $text.paginationGo }}</el-button>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose">
      <Form/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">保存</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
