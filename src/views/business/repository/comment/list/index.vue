<template>
  <div class="page">
    <div class="toolbar-box repository-info-list-toolbar">
      <div>
        <div class="label">评论状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.status.value" placeholder="请选择评论状态">
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
        <div class="label">关联文章</div>
        <div class="content">
          <el-input clearable v-model="toolBar.title" placeholder="请输入关联文章"></el-input>
        </div>
      </div>
      <div>
        <div class="label">评论人</div>
        <div class="content">
          <el-input clearable v-model="toolBar.userName" placeholder="请输入评论人"></el-input>
        </div>
      </div>
      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <storeSelect @change="storeChange" ref="store"/>
        </div>
      </div>
      <div>
        <div class="label">评论关键字</div>
        <div class="content">
          <el-input clearable v-model="toolBar.content" placeholder="请输入评论关键字"></el-input>
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
        <el-button type="primary" @click="changeAllStatus(1)" v-if="permission.includes('ZBPCC01090302')">{{ $text.enable }}</el-button>
        <el-button type="primary" @click="changeAllStatus(0)" v-if="permission.includes('ZBPCC01090301')">{{ $text.stopUsing }}</el-button>
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
            width="120"
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
                v-if="scope.row.status == 0 && permission.includes('ZBPCC01090302')"
                @click="operationStatus(scope.row,1-scope.row.status)"
              >
                {{ $text.enable}}
              </el-button>
              <!-- 关闭 -->
                <el-button
                type="text"
                size="small"
                 v-if="scope.row.status !== 0 && permission.includes('ZBPCC01090301')"
                @click="operationStatus(scope.row,1-scope.row.status)"
              >
                {{ $text.stopUsing}}
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
            prop="content"
            label="评论内容"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="created"
            label="发布时间"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="articleName"
            label="关联文章"
            width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="articleType"
            label="文章类型"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="replyCount"
            label="回复数量"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="clickCount"
            label="点赞数量"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="userName"
            label="评论人"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="storeName"
            label="评论门店"
            width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="status"
              label="评论状态"
              width="100"
              show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['error', 'success'][scope.row.status]" :message="['关闭', '启用'][scope.row.status]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column>
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