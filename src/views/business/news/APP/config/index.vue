<template>
  <div class="page">
    <!-- 门店 -->
    <div class="toolbar-box">
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
        <div style="width:30%">
            <div class="label">门店性质</div>
            <div class="content">
                <el-select clearable v-model="toolBar.level.value" placeholder="请选择门店性质">
                    <el-option
                            v-for="item in toolBar.level.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
      <el-button type="primary" @click="configPlatform">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="cleanSearch">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
        <!-- 门店app -->
        <el-table
          :data="headTableData"
          ref="multipleTable"
          max-height="400"
          v-loading="tableLoading"
          header-cell-class-name="table-header-item"
        >
         <el-table-column
          type="selection">
          </el-table-column>
            <el-table-column
                prop="dealerNo"
                label="内部经销商编号"
                width="200"
            >
            </el-table-column>
            <el-table-column
                prop="dealerRefNo"
                label="经销商编号"
                width="100"
            >
            </el-table-column>
            <el-table-column
                prop="dealerName"
                label="经销商名称"
                width="150"
            >
            </el-table-column>
            <el-table-column
                prop="storeNo"
                label="内部门店编号"
                width="200"
            >
            </el-table-column>
            <el-table-column
                prop="storeRefNo"
                label="门店编号"
                width="100"
            >
            </el-table-column>
          <el-table-column
            prop="name"
            label="门店名称"
            width="150"
          >
          </el-table-column>
            <el-table-column
                    prop="level"
                    label="门店性质"
                    width="200"
                    show-overflow-tooltip
            >
            </el-table-column>
        </el-table>

        <div class="pagination">
          <el-pagination
            background
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page="subpage.current"
            :page-sizes="subpage.sizes"
            :page-size="subpage.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="subpage.total"
          >
          </el-pagination>
          <el-button type="primary" size="small">{{ $text.paginationGo }}</el-button>
        </div>
        </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveRelation()">保存</el-button>
        <el-button @click="handleClose()">取消</el-button>
      </span>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>