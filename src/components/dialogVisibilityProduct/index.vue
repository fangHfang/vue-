<template>
  <el-dialog
          title="商品可见性"
          :visible.sync="dialogVisible"
          width="1200px"
          destroy-on-close
          :before-close="handleClose">
    <div class="border-content">
      <el-form :model="form" ref="form" >
        <div class="item-box">
          <div class="del-form">
            <div class="item-row">
              <el-form-item label="区域可见性">
                <el-radio v-if="form.visibility === 1" >全部可见</el-radio>
                <el-radio v-if="form.visibility === 2" >部分可见</el-radio>
              </el-form-item>
            </div>
            <div class="item-row" v-for="(item,index) in form.itemVisibilityDtos" :key="index">
              <el-form-item :label="item.areaName">
                <div class="flex">
                  <div class="item-btn" v-for="(idsItem,idsIndex) in item.storeLevel" :key="idsIndex">{{idsItem}}</div>
                </div>
              </el-form-item>
            </div>
          </div>
        </div>
      </el-form>
      <div class="item-box">
        <h4 class="item-title spec">门店白名单 <span class="tips">(最多100条)</span></h4>
        <div class="toolbar-box">
          <div>
            <div class="label">按门店查询</div>
            <div class="content">
              <storeSelect @change="storeChange" ref="store"/>
            </div>
          </div>
          <div>
            <div class="label">经销商名称</div>
            <div class="content">
              <dealerSelect @change="dealerChange" ref="dealer"/>
            </div>
          </div>
          <el-button type="primary" @click="search">{{ $text.search }}</el-button>
          <el-button type="primary" @click="resetSearchStoreListByPage">{{ $text.reset }}</el-button>
        </div>
        <div class="table-main">
          <div class="table">
            <el-table
                    :data="whitelist.tableData"
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
                      min-width="160"
                      show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                      prop="storeCustomerNo"
                      label="内部门店号"
                      min-width="160"
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
                      min-width="160"
                      show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                      prop="level"
                      label="门店性质"
                      min-width="120"
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
    </div>
    <span slot="footer" class="dialog-footer flex-center">
         <el-button @click="handleClose">{{ $text.close }}</el-button>
      </span>
  </el-dialog>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>