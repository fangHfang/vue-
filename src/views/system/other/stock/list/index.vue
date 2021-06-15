<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">规则名称</div>
        <div class="content icon">
          <el-input clearable v-model="toolBar.ruleName" placeholder="规则名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.status" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="searchStockDisplayListByPage">{{ $text.search }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" v-if="permission.includes('ZBPCA01060401')" icon="el-icon-plus" @click="dialogVisible">{{ $text.newAdd }}</el-button>
        <el-button type="primary" v-if="permission.includes('ZBPCA01060404')" @click="batchUpShelfStockDisplay">{{ $text.upShelf }}</el-button>
        <el-button type="primary" v-if="permission.includes('ZBPCA01060405')" @click="batchDownShelfStockDisplay">{{ $text.downShelf }}</el-button>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          header-cell-class-name="table-header-item"
          v-loading="tableLoading"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            align="center"
            type="selection"
            width="50"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                   v-if="permission.includes('ZBPCA01060403')"
                  @click="setGoods(scope.row.ruleNo)"
                >
                  设置商品
                </el-button>
                <el-button
                  type="text"
                  size="small"
                   v-if="permission.includes('ZBPCA01060402')"
                  @click="toEdit(scope.row.ruleNo)"
                >
                  {{ $text.edit }}
                </el-button>
                <el-button
                  type="text"
                  v-if="scope.row.status === 1 && permission.includes('ZBPCA01060405')"
                  size="small"
                  @click="downShelfStockDisplay(scope.row.ruleNo)"
                >
                  {{ $text.downShelf }}
                </el-button>
                <el-button
                  v-if="scope.row.status != 1 && permission.includes('ZBPCA01060404')"
                  type="text"
                  size="small"
                  @click="upShelfStockDisplay(scope.row.ruleNo)"
                >
                  {{ $text.upShelf }}
                </el-button>
              </template>
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="ruleName"
            label="规则名称"
            min-width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="itemCount"
            label="配置商品数量"
            width="160"
          >
          </el-table-column>
          <el-table-column
            prop="createBy"
            label="创建人"
            width="150"
            align="left"
          >
          </el-table-column>
          <el-table-column
            prop="created"
            label="创建时间"
            width="200"
            sortable
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            min-width="80"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['warning','success'][scope.row.status]" :message="['下架','上架'][scope.row.status]"/>
              </div>
            </template>
          </el-table-column>
          <el-table-column></el-table-column>
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
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>