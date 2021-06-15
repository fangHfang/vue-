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
          :row-style="toggleDisplayTr"
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
            width="160"
          >
            <template>
              <el-button
                type="text"
                size="small"
              >
                {{ $text.editName }}
              </el-button>
              <el-button
                type="text"
                size="small"
              >
                {{ $text.stopUsing }}
              </el-button>
              <el-button
                type="text"
                size="small"
              >
                {{ $text.del }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="序号"
            width="100"
          >
          <template slot-scope="scope">
              <span :style="`margin-left: ${scope.row.__level * 20}px;`">{{scope.row.__index+1}}</span>
          </template>
          </el-table-column>
          <el-table-column
            label="分类等级"
            width="200"
            show-overflow-tooltip
            align="left">
                <template slot-scope="scope">
                    <p :style="`margin-left: ${scope.row.__level * 20}px;margin-top:0;margin-bottom:0`">
                      <i
                        @click="toggleFoldingStatus(scope.row)"
                        class="permission_toggleFold"
                        :class="toggleFoldingClass(scope.row)"></i>
                        {{scope.row.__level+1}}级
                      </p>
                </template>
          </el-table-column>
          <el-table-column
            prop="class"
            label="分类名称"
             show-overflow-tooltip
            width="170"
          >
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="100"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['error', 'success', 'warning'][scope.row.state]" :message="['已停用', '已启用', '已下架'][scope.row.state]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="desc"
            label="描述"
            min-width="260"
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