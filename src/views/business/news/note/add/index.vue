<template>
  <div class="page">
    <div class="add-content-box">
      <div style="margin-bottom:30px">
        <div class="add-title">新增短信模板</div>
      </div>
      <!-- 第一个 -->
      <div>
        <div class="add-label">短信模板标题</div>
        <div class="add-content">
          <el-input placeholder="请输入模板标题" v-model="toolBar.title"></el-input>
        </div>
      </div>
      <!-- 第二个 -->
      <div>
        <div class="add-label" style="margin-right:8px">短信模板内容</div>
        <div class="add-content" style="width: 100%">
          <el-input placeholder="请输入" v-model="toolBar.content"></el-input>
        </div>
      </div>
      <!-- 第三个 -->
      <div style="margin-bottom:30px">
        <div class="add-label" style="margin-right:9px">变量</div>
        <div class="add-content" style="width: 100%">
            <div>手机</div>
            <div>用户名称</div>
            <div>验证码</div>
            <p style="color:#666666">(点击变量上传到模板框内容)</p>
        </div>
      </div>
      <!-- 第四个 -->
      <div>
        <div class="add-banner">适用门店</div>
      </div>
    </div>

    <div class="toolbar-box">
      <div>
        <div class="label">经销商名称</div>
        <div class="content">
          <el-input v-model="toolBar.name" placeholder="请输入经销商名称/code"></el-input>
        </div>
      </div>

      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <el-input v-model="toolBar.store" placeholder="请输入门店名称/code"></el-input>
        </div>
      </div>
      <div>
        <div class="label">所属区域</div>
        <div class="content">
          <el-input v-model="toolBar.brand" placeholder="请输入所属区域"></el-input>
        </div>
      </div>

      <el-button type="primary">{{ $text.search }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="dialogVisible = true">
          添加门店
        </el-button>
        <el-button type="primary">删除</el-button>
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
            type="index"
            label="序号"
            width="60"
          >
          </el-table-column>
          <el-table-column
              width="150"
              prop="dealerNo"
              label="内部经销商号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              width="150"
              prop="dealerRefNo"
              label="经销商编号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="distributor"
            label="经销商名称"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="storeNo"
              width="150"
              label="内部门店号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="storeRefNo"
              width="150"
              label="门店编号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="门店名称"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="area"
            label="所属区域"
            width="100"
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
    <!-- 保存与取消 -->
    <div class="button-banner">
         <el-button type="primary">{{$text.save}}</el-button>
         <el-button @click="returnList">{{$text.cancel}}</el-button>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>