<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">产品代号</div>
        <div class="content">
          <el-input v-model="toolBar.code" placeholder="请输入产品代号"></el-input>
        </div>
      </div>
      <div>
        <div class="label">产品条码</div>
        <div class="content">
          <el-input v-model="toolBar.barCode" placeholder="请输入产品条码"></el-input>
        </div>
      </div>
      <div>
        <div class="label">产品品牌</div>
        <div class="content">
          <el-input v-model="toolBar.brand" placeholder="请输入产品品牌"></el-input>
        </div>
      </div>
      <el-button type="primary">{{ $text.search }}</el-button>
      <el-button type="primary" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <importExport
            :showImport="true"
            :showExport="true"
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
            width="100"
          >
            <template>
              <el-button
                type="text"
                size="small"
                @click="dialogVisible = true"
              >
                查看扫码明细
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
            prop="id"
            label="产品代号"
            width="170"
          >
          </el-table-column>
          <el-table-column
            prop="detailed"
            label="规格明细"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="brand"
            label="产品品牌"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="tireType"
            label="轮胎类型"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="inch"
            label="英寸"
            width="80"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="decorative"
            label="花纹"
            width="80"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="similarDecorative"
            label="同类花纹"
            width="80"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="word"
            label="黑白线字"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="size"
            label="成品号"
            width="80"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="width"
            label="宽度"
            width="80"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="flat"
            label="扁平比"
            width="80"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
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
    <el-button type="primary" style="margin:40px 0 0 30px" @click="backList">{{ $text.return }}</el-button>
    <!-- 弹窗 -->
    <el-dialog
      title="选择商品"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose">
      <Select/>
      <div slot="footer" class="deleButton">
          <el-button type="primary" @click="dialogVisible = false">{{ $text.add }}</el-button>
          <el-button @click="dialogVisible = false">{{ $text.cancel }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>