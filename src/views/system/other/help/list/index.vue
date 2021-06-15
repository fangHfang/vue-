<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">文章标题</div>
        <div class="content">
          <el-input clearable v-model="toolBar.title" placeholder="文章标题"></el-input>
        </div>
      </div>
      <div>
        <div class="label">创建人</div>
        <div class="content">
          <el-input clearable v-model="toolBar.createBy" placeholder="创建人"></el-input>
        </div>
      </div>
      <div>
        <div class="label">创建时间</div>
        <div class="content">
         <el-date-picker
            v-model="toolBar.createDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <div>
        <div class="label">状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.status.value" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.status.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="searchDataPage">{{ $text.search }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button
          type="primary"
          icon="el-icon-plus"
           v-if="permission.includes('ZBPCA01060201')"
          @click="newBuild">
          {{ $text.newBuild }}
        </el-button>

      </div>
      <div class="table">
        <el-table
          :data="tableData"
          header-cell-class-name="table-header-item"
        >
          <el-table-column
            fixed="left"
            type="selection"
            width="50"
            align="center"
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
                  v-if="permission.includes('ZBPCA01060202')"
                @click="selectQuery(scope.row.helpNo)"
              >
                编辑
              </el-button>
              <el-button
                v-if="scope.row.status === 1 && permission.includes('ZBPCA01060204')"
                type="text"
                size="small"
                @click="disable(scope.row.helpNo)"
              >
                关闭
              </el-button>
              <el-button
                v-if="scope.row.status === 0 && permission.includes('ZBPCA01060203')"
                type="text"
                size="small"
                @click="enable(scope.row.helpNo)"
              >
                启用
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="title"
            label="帮助标题"
            width="250"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="80"
            show-overflow-tooltip
          >
              <template slot-scope="scope">
              <div>
                <i-status :type="['warning', 'success'][scope.row.status]" :message="['关闭', '启用'][scope.row.status]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="browseCount"
            label="查看数量"
            width="150"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="createBy"
            width="220"
            label="创建人"
          >
          </el-table-column>
               <el-table-column
            prop="created"
            label="创建时间"
            width="180"
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
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
