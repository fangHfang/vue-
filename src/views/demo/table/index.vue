<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">商品名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.name" placeholder="请输入品牌编码/品牌名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">商品分类</div>
        <div class="content">
          <el-select clearable v-model="toolBar.class.value" placeholder="一级/二级/三级">
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
        <div class="label">商品规格</div>
        <div class="content">
          <el-select clearable v-model="toolBar.spec.value" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.spec.options"
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
          <el-input clearable v-model="toolBar.brand" :placeholder="$text.inputPlaceholder"></el-input>
        </div>
      </div>
      <div>
        <div class="label">商品标签</div>
        <div class="content">
          <el-select clearable v-model="toolBar.tag.value" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.tag.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary">{{ $text.search }}</el-button>
      <el-button type="primary" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="dialogVisible = true">
          {{ $text.newBuild }}
        </el-button>
        <el-button type="primary">申请上架</el-button>
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
            width="140"
          >
            <template>
              <el-button
                type="text"
                size="small"
              >
                {{ $text.downShelf }}
              </el-button>
              <el-button
                type="text"
                size="small"
              >
                {{ $text.detail }}
              </el-button>
              <el-button
                type="text"
                size="small"
              >
                {{ $text.edit }}
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
            label="商品编号"
            width="170"
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
            prop="class"
            label="前端分类"
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
            prop="tag"
            label="商品标签"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="spec"
            label="商品规格"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="100"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['error', 'success', 'warning'][scope.row.state]" :message="['已拒绝', '待上架', '已下架'][scope.row.state]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="desc"
            label="描述"
            width="260"
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