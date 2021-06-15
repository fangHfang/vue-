<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">商品名称</div>
        <div class="content">
          <el-input v-model="toolBar.name" placeholder="请输入商品名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">商品规格</div>
        <div class="content">
          <el-select clearable v-model="toolBar.specDetail.value" placeholder="请选择商品规格">
            <el-option
                    v-for="item in toolBar.specDetail.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">商品品牌</div>
        <div class="content">
          <el-select clearable filterable v-model="toolBar.brandNo.value" placeholder="请选择商品品牌">
            <el-option
                    v-for="item in toolBar.brandNo.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">商品分类</div>
        <div class="content">
          <el-select clearable filterable v-model="toolBar.categoryNo.value" placeholder="请选择商品分类">
            <el-option
                    v-for="item in toolBar.categoryNo.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">商品标签</div>
        <div class="content">
          <el-select clearable filterable v-model="toolBar.tag.value" placeholder="请选择商品标签">
            <el-option
                    v-for="item in toolBar.tag.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="customerStockDetail">{{ $text.search }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <importExport
            :showImport="true"
            :showExport="permission.includes('ZBPCC01130101')"
            :exportUrl="exportUrl"
            :importUrl="importUrl"
            :exportPostData="exportPostData"
            exportFileName="经销商商品库存导出"
            importText="期初导入"
            @refreshTableData="customerStockDetail"
        />
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          header-cell-class-name="table-header-item"
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
              width="120"
          >
            <template slot-scope="scope">
              <el-button
                  type="text"
                  size="small"
                  @click="openDialogWarning(scope.row.stockNo)"
              >
                设置库存预警值
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
              label="商品名称"
              width="300"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="quantity"
            label="可售库存"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="warning"
            label="库存预警值"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="itemNo"
              label="商品编号"
              width="160"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="brand"
              label="商品品牌"
              width="120"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="spec"
              label="商品规格"
              width="300"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="groupName"
              label="商品分组"
              width="160"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="category"
              label="商品分类"
              width="160"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column/>
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
      <el-dialog
          title="库存预警设定"
          :visible.sync="dialog.dialogVisible"
          width="500px"
      >
        <el-form :model="dialog.dialogForm" label-width="0">

          <div class="del-form">
            <el-form-item label="">
              <el-radio-group v-model="dialog.dialogForm.radio" >
                <div class="flex-center">
                  <el-radio label="1" @change="clearData"><b/></el-radio>
                  <el-select :disabled="dialog.dialogForm.radio!=1" clearable v-model="dialog.dialogForm.firstSelect" @change="averageValue" placeholder="请选择">
                    <el-option
                        v-for="item in dialog.selectOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                  <span class="text">增加</span>
                  <el-input :disabled="dialog.dialogForm.radio!=1" v-model="dialog.dialogForm.firstValue" placeholder="请输入需要调整数值"/>
                </div>

                <div class="flex-center">
                  <el-radio label="2" @change="clearData"><b/></el-radio>
                  <el-select :disabled="dialog.dialogForm.radio!=2" clearable v-model="dialog.dialogForm.secondSelect" @change="averageValue" placeholder="请选择">
                    <el-option
                        v-for="item in dialog.selectOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                  <span class="text">减少</span>
                  <el-input :disabled="dialog.dialogForm.radio!=2" v-model="dialog.dialogForm.secondValue" placeholder="请输入需要调整数值"/>
                </div>
                <div class="flex-center">
                  <el-radio label="3" @change="clearData"><b></b></el-radio>
                  <el-input :disabled="dialog.dialogForm.radio!=3" v-if="dialog.dialogForm.radio!=3" v-model="diyValue" placeholder="请输入自定义警戒值"/>
                  <el-input :disabled="dialog.dialogForm.radio!=3" v-else v-model="dialog.dialogForm.diyValue" @input="changeInput" placeholder="请输入自定义警戒值"/>

                </div>
              </el-radio-group>
            </el-form-item>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading='btnLoading' @click="btnLoading = true;$throttle(modStockWarning)">保存</el-button>
        <el-button @click="dialog.dialogVisible = false">取消</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>