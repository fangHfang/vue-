<template>
  <div class="page-content">
    <h3 class="page-name">配置门店权限</h3>
      <div class="item-box">
        <h4 class="item-title">
          <span>可见性设置
            <el-switch
                v-model="visibility.checked"
                active-color="#ED6D00"
                active-text="全部可见"
                class="switch-visible"
                @change="visibleChangeAll"
                inactive-text="部分可见">
            </el-switch>
          </span>
          <div class="actionbar">
            <el-button type="primary" v-show="showWhiteListContent" @click="setVisibility">设置可见性</el-button>
          </div>
        </h4>
        <div class="table-main">
          <div v-for="(item,index) in visibility.tableData" :key="index" class="visible-box">
            <div class="border-box">
              <p>{{item.areaName}}</p>
              <p class="p">
                <span v-for="(v,k) in item.storeLevels" :key="k">{{v}}</span>
              </p>
            </div>
            <i class="el-icon-remove-outline" @click="delVisibility(item)"></i>
          </div>
        </div>
      </div>
    <div class="item-box" v-show="showWhiteListContent" >
      <h4 class="item-title">
        <span>门店白名单 <b>（最多设置100条）</b></span>
      </h4>
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
            <storeSelect @change="storeChange"/>
          </div>
        </div>
        <el-button type="primary" @click="getRemoteStoreTableData">{{ $text.search }}</el-button>
      </div>
      <div class="table-main">
        <div class="actionbar">
          <el-button type="primary" @click="addStore">添加门店</el-button>
          <el-button type="primary" @click="delStore">删除</el-button>
        </div>
        <div class="table">
          <el-table
              :data="whitelist.tableData"
              v-loading="whitelist.tableLoading"
              @selection-change="handleWhitelistSelectionChange"
              header-cell-class-name="table-header-item"
          >
            <el-table-column
                type="selection"
                width="55"
            >
            </el-table-column>
            <el-table-column
                type="index"
                label="序号"
                width="100"
                align="center"
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
                prop="dealerName"
                label="经销商名称"
                min-width="200"
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
                prop="storeName"
                label="门店名称"
                min-width="200"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="level"
                label="门店性质"
                min-width="200"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="storeNo"
                label="门店id"
                min-width="200"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column/>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination
              background
              @size-change="handleWhitelistSizeChange"
              @current-change="handleWhitelistCurrentChange"
              :current-page="whitelist.pagination.current"
              :page-sizes="whitelist.pagination.sizes"
              :page-size="whitelist.pagination.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="whitelist.pagination.total"
          >
          </el-pagination>
          <el-button type="primary" size="small">{{ $text.paginationGo }}</el-button>
        </div>
      </div>
    </div>
    <div class="btn-box">
      <el-button @click="back">{{ $text.return }}</el-button>
    </div>
    <dialogAddStore :dialogVisible.sync="dialogStoreVisible" @selectedStore="getSelectStore" @close="dialogStoreVisible=false"/>
    <el-dialog
        title="门店可见性设置"
        :visible.sync="dialogSettingVisible"
        width="800px"
        destroy-on-close>
      <div class="border-content">
        <div class="con-header">
          <span class="text">区域选择：</span>
          <el-select
              v-model="selectArea"
              multiple
              class="con-input"
              value-key="value"
              collapse-tags
              placeholder="请选择区域">
            <el-option
                v-for="item in areaAllList"
                :key="item.value"
                :label="item.label"
                :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="tag-box">
          <el-tag
              :key="tag+i"
              v-for="(tag,i) in selectArea"
              closable
              class="tag"
              :disable-transitions="true"
              @close="handleTagClose(tag,i,selectArea)"
          >
            {{tag.label}}
          </el-tag>
        </div>
        <div class="con-header">
          <span class="text">门店性质：</span>
          <el-select
              v-model="selectNature"
              multiple
              value-key="value"
              class="con-input"
              collapse-tags
              placeholder="请选择门店性质">
            <el-option
                v-for="item in natureAllList"
                :key="item.value"
                :label="item.label"
                :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="tag-box">
          <el-tag
              :key="tag+i"
              v-for="(tag,i) in selectNature"
              closable
              class="tag"
              :disable-transitions="true"
              @close="handleTagClose(tag,i,selectNature)"
          >
            {{tag.label}}
          </el-tag>
        </div>
      </div>
      <span slot="footer" class="dialog-footer flex-center">
        <el-button type="primary" @click="handleSettingSave" :loading="setVisibilityLoading">{{ $text.confirm }}</el-button>
         <el-button @click="handleSettingClose">{{ $text.cancel }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>