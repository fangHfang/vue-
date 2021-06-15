<template>
  <div class="page">
    <div class="toolbar-box repository-info-list-toolbar">
      <div>
        <div class="label">文章状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.status.value" placeholder="请选择文章状态">
            <el-option
              v-for="item in toolBar.status.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">文章标题</div>
        <div class="content">
          <el-input v-model="toolBar.title" clearable placeholder="请输入文章标题"></el-input>
        </div>
      </div>
      <div>
        <div class="label">创建人</div>
        <div class="content">
          <el-input v-model="toolBar.userName" clearable placeholder="请输入创建人"></el-input>
        </div>
      </div>
      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <storeSelect @change="storeChange" ref="store"/>
        </div>
      </div>
      <div>
        <div class="label">创建时间</div>
        <div class="content">
          <el-date-picker
              v-model="toolBar.date"
              type="daterange"
              range-separator="~"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
      </div>
      <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="resetTableData">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button
          type="primary"
          @click="toAdd"
           v-if="permission.includes('ZBPCC01090201')"
          >
          新增帖子
        </el-button>
        <el-button type="primary" @click="toEdit" v-if="permission.includes('ZBPCC01090202')">{{ $text.edit }}</el-button>
        <el-button type="primary" @click="changeAllStatus(1)" v-if="permission.includes('ZBPCC01090203')">{{ $text.enable }}</el-button>
        <el-button type="primary" @click="changeAllStatus(0)" v-if="permission.includes('ZBPCC01090204')">{{ $text.stopUsing }}</el-button>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          v-loading="tableLoading"
          @selection-change="handleSelectionChange"
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
            width="280"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="toDetail(scope.row)"
              >
                查看
              </el-button>
              <!-- 启用 -->
              <el-button
                type="text"
                size="small"
                 v-if="scope.row.status==0 && permission.includes('ZBPCC01090203')"
                @click.stop="changeStatus(scope.row,'status')"
              >
                {{ [$text.enable , $text.stopUsing ][scope.row.status] }}
              </el-button>
              <!-- 停用 -->
               <el-button
                type="text"
                size="small"
                 v-if="scope.row.status!=0 && permission.includes('ZBPCC01090204')"
                @click.stop="changeStatus(scope.row,'status')"
              >
                {{ [$text.enable , $text.stopUsing ][scope.row.status] }}
              </el-button>
              <el-button
                  type="text"
                  size="small"
                  @click="toStore(scope.row)"
              >
                配置门店权限
              </el-button>
              <el-button
                  type="text"
                  size="small"
                  @click.stop="changeStatus(scope.row,'top')"
              >
                {{ scope.row.isTop ===1 ? '取消置顶' : '置顶' }}
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
            prop="title"
            label="文章标题"
            min-width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="publishTime"
            label="发布时间"
            width="160"
          >
          </el-table-column>
          <el-table-column
            prop="contentType"
            label="资讯类型"
            width="120"
          >
            <template slot-scope="scope">
              <span>{{scope.row.contentType===0?'图文':'文章'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="commentCount"
            label="评论数量"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="clickCount"
            label="点赞数量"
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="storeName"
            label="创建门店"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="createBy"
            label="创建人"
            min-width="110"
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