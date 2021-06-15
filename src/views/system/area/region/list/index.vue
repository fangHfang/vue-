<template>
  <div class="page">
    <div class="toolbar-box list-toolbar-box">
      <div>
        <div class="label">区域名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.name" placeholder="区域名称" @keyup.enter.native="listRegionByPage"></el-input>
        </div>
      </div>
      <div>
        <div class="label">区域状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.class.value" placeholder="请选择区域状态">
            <el-option
                v-for="item in toolBar.class.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="searchRegionListByPage">{{ $text.search }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" v-if="permission.includes('ZBPCA01010201')" icon="el-icon-plus" @click="openAddDialog">{{ $text.newAdd }}</el-button>
      </div>
      <div class="table">
        <el-table
            :data="tableData"
            v-loading="tableLoading"
             @selection-change="handleSelectionChange"
            header-cell-class-name="table-header-item"
        >
          <el-table-column
              type="selection"
              width="60">
          </el-table-column>
          <el-table-column
              type="index"
              label="序号"
              width="60">
          </el-table-column>
          <el-table-column
            fixed="left"
            label="操作"
            width="140"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                v-if="permission.includes('ZBPCA01010204')"
                :style="{color:(scope.row.status===0) ? '' : '#CCCCCC'}"
                  @click.stop="(scope.row.status===0) ? edit(scope.row.regionNo) : ''"
              >
                {{ $text.edit }}
              </el-button>
              <!-- 把详情跳转到编辑页面。 -->
              <!-- <el-button
                type="text"
                size="small"
                @click="edit(scope.row.regionNo)"
              >
                {{ $text.detail }}
              </el-button> -->
              <el-button
                type="text"
                size="small"
                @click="toDetail(scope.row.regionNo)"
              >
                {{ $text.detail }}
              </el-button>
              <el-button
                 type="text"
                v-if="scope.row.status == 0&&permission.includes('ZBPCA01010202')"
                  size="small"
                   @click="enableOrDisable(scope.row.regionNo,1)"
                   >
                   {{ $text.enable }}
              </el-button>
              <el-button
                 type="text"
                v-if="scope.row.status != 0&&permission.includes('ZBPCA01010203')"
                  size="small"
                   @click="enableOrDisable(scope.row.regionNo,0)"
                   >
                   {{ $text.disable }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
              prop="name"
              label="区域名称"
              width="120"
              show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <!-- <el-table-column
              prop="level"
              label="区域等级"
              width="120"
              show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ ['','一','二','三','四'][scope.row.level] }}级</span>
            </template>
          </el-table-column> -->
          <el-table-column
              prop="storeNums"
              label="区域下门店数量"
              width="160"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="created"
              label="创建时间"
              width="180"
              show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ formatTime(scope.row.created) }}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="status"
              label="状态"
              width="120">
            <template slot-scope="scope">
              <i-status :type="['warning', 'success'][scope.row.status]" :message="['关闭', '启用'][scope.row.status]"/>
            </template>
          </el-table-column>
          <el-table-column
              prop="description"
              label="备注"
              width="180"
              show-overflow-tooltip>
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
    <!-- 新增弹窗 -->
    <el-dialog
      title="新增区域"
      :visible.sync="dialogAddVisible"
      width="30%"
      :before-close="addHandleClose">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <div class="del-form">
            <el-form-item label="区域名称" prop="name">
              <el-input v-model="form.name" @keyup.native="btKeyUp" onkeyup="value=value.replace(/\s+/g,'')"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">立即创建</el-button>
              <el-button @click="addHandleClose">取消</el-button>
            </el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>