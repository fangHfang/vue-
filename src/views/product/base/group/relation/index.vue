<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">商品名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.name" placeholder="请输入商品名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">商品标签</div>
        <div class="content">
          <el-select clearable v-model="toolBar.tag.value" placeholder="请选择商品标签">
           <el-option
              v-for="item in itemLabelRefOptions"
              :key="item.labelNo"
              :label="item.labelName"
              :value="item.labelNo">
            </el-option>
          </el-select>
        </div>
      </div>
       <div>
        <div class="label">商品品牌</div>
        <div class="content">
          <el-input clearable v-model="toolBar.brand" placeholder="请输入商品品牌"></el-input>
        </div>
      </div>
      <div>
        <div class="label">商品规格</div>
        <div class="content">
          <el-input clearable v-model="toolBar.specDetail" placeholder="请输入商品品牌"></el-input>
<!--          <el-select clearable v-model="toolBar.spec.value" @change="specTemplateChange" placeholder="请选择规格模板">-->
<!--            <el-option-->
<!--              v-for="(item, index) in specTemplateOptions"-->
<!--              :key="index"-->
<!--              :label="item.specName"-->
<!--              :value="item.specNo">-->
<!--            </el-option>-->
<!--          </el-select>-->
        </div>
      </div>

      <el-button type="primary" @click="searchQueryItem">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="reset">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button @click="dialogVisible = true" type="primary">{{ $text.add }}</el-button>
        <el-button type="primary" @click="handleDelete(null)">{{ $text.del }}</el-button>
      </div>
      <div class="table">
        <el-table
          ref="el-table"
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
            fixed="left"
            label="操作"
            width="80"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="handleDelete(scope.row)"
              >
                {{ $text.del }}
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
            prop="itemName"
            label="商品名称"
            width="300"
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
            prop="brandName"
            label="商品品牌"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="specDetail"
            label="商品规格"
            width="160"
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
            prop="class"
            label="商品分类"
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
      <div class="btn-box">
        <!-- <el-button type="primary">{{ $text.save }}</el-button> -->
        <el-button @click="back">返回</el-button>
      </div>
    </div>
    <dialogAddProduct :dialogVisible.sync="dialogVisible" @selectInfos="addProduct"/>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>