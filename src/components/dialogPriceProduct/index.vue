<template>
  <el-dialog
          title="商品价格"
          :visible.sync="dialogVisible"
          width="1200px"
          destroy-on-close
          :before-close="handleClose">
    <div class="border-content">
      <div class="item-box">
        <h4 class="item-title spec">
          经销商价格
        </h4>
        <div class="toolbar-box">
          <div>
            <div class="label">经销商名称</div>
            <div class="content">
              <dealerSelect @change="dealerChange" ref="dealer"/>
            </div>
          </div>
          <el-button type="primary" @click="searchDealer">{{ $text.search }}</el-button>
          <el-button type="primary" @click="resetSearchDealerListByPage">{{ $text.reset }}</el-button>
        </div>
        <div class="table-main">
          <div class="table">
            <el-table
                    :data="dealer.tableData"
                    v-loading="dealer.tableLoading"
                    header-cell-class-name="table-header-item"
            >
              <el-table-column
                      type="index"
                      label="序号"
                      width="100"
                      align="center"
              >
              </el-table-column>
              <el-table-column
                      prop="name"
                      label="经销商名称"
                      min-width="160"
                      show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                      prop="customerNo"
                      label="内部经销商号"
                      min-width="160"
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
                      prop="price"
                      label="商品价格"
                      min-width="160"
                      show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column/>
            </el-table>
          </div>
          <div class="pagination">
            <el-pagination
                    background
                    @size-change="handleDealerSizeChange"
                    @current-change="handleDealerCurrentChange"
                    :current-page="dealer.pagination.current"
                    :page-sizes="dealer.pagination.sizes"
                    :page-size="dealer.pagination.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="dealer.pagination.total"
            >
            </el-pagination>
            <el-button type="primary" size="small">{{ $text.paginationGo }}</el-button>
          </div>
        </div>
      </div>
      <div class="item-box">
        <h4 class="item-title spec">特殊价格门店 <span class="tips">(最多100条)</span></h4>
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
              <dealerSelect @change="dealerChangePrice" ref="dealerPrice"/>
            </div>
          </div>
          <el-button type="primary" @click="searchStore">{{ $text.search }}</el-button>
          <el-button type="primary" @click="resetSearchStoreListByPage">{{ $text.reset }}</el-button>
        </div>
        <div class="table-main">
          <div class="table">
            <el-table
                    :data="specWhitelist.tableData"
                    v-loading="specWhitelist.tableLoading"
                    header-cell-class-name="table-header-item"
            >
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
                      min-width="160"
                      show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                      prop="storeLevel"
                      label="门店性质"
                      min-width="140"
                      show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                      prop="price"
                      label="特殊价格"
                      width="120"
                      show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <div class="table-color-rule-add">{{ scope.row.price }}</div>
                </template>
              </el-table-column>
              <el-table-column/>
            </el-table>
          </div>
          <div class="pagination">
            <el-pagination
                    background
                    @size-change="handleSpecWhitelistSizeChange"
                    @current-change="handleSpecWhitelistCurrentChange"
                    :current-page="specWhitelist.pagination.current"
                    :page-sizes="specWhitelist.pagination.sizes"
                    :page-size="specWhitelist.pagination.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="specWhitelist.pagination.total"
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