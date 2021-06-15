<template>
  <el-dialog
    title="产品编号对应成品代号"
    :visible.sync="dialogVisible"
    width="1200px"
    destroy-on-close
    append-to-body
    :before-close="handleClose"
  >
    <div class="border-content">
      <div class="table-main">
        <div class="table">
          <el-table
            :data="tableData"
            max-height="300"
            header-cell-class-name="table-header-item"
            :span-method="objectSpanMethod">
          >
            <el-table-column
                    prop="productNo"
                    label="产品编号"
                    width="220"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                    prop="productCode"
                    label="成品代号"
                    width="220"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                    prop="spec"
                    label="规格"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                    prop="brandName"
                    label="品牌"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                    prop="size"
                    label="英寸"
                    show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                    prop="tread"
                    label="花纹"
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
    <div slot="footer" class="dialog-footer flex-center">
      <el-button @click="handleClose">{{ $text.cancel }}</el-button>
    </div>
  </el-dialog>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>