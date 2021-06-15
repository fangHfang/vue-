<template>
  <div class="page">
    <div class="page-content" style="padding-bottom: 0;">
      <h3 class="page-name">申请上架</h3>
      <el-form ref="formRef" label-width="90px" label-position="left">
        <div class="item-box">
          <h4 class="item-title">
            标准积分
          </h4>
          <div class="del-form">
            <el-form-item label="标准积分">
              <el-input style="width:200px;" oninput="value=value.replace(/[^0-9]/g,'')" type="number" v-model="form.price" placeholder="请输入积分"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="item-box">
          <h4 class="item-title spec">
            <span>特殊积分门店 <b>（最多设置100条）</b></span>
            <div class="actionbar">
              <el-button type="primary" :disabled="detail" @click="addStore">添加门店</el-button>
            </div>
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
                <storeSelect @change="storeChange" ref="store"/>
              </div>
            </div>
            <el-button type="primary" @click="getRemoteStoreTableData">{{ $text.search }}</el-button>
            <el-button type="primary" :disabled="detail" @click="delStore">删除</el-button>
          </div>
          <div class="table-main">
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
                    prop="storeLevel"
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
                <el-table-column
                    prop="price"
                    label="特殊积分"
                    width="240"
                    show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <div class="table-color-rule-add" @click="openStoreNumberDialog(scope.row)">{{ scope.row.price }}</div>
                  </template>
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
      </el-form>
    </div>
    <div class="table-main">
      <div class="btn-box" style="padding-bottom: 30px;">
        <el-button type="primary" v-if="!detail" @click="back">上一步</el-button>
        <el-button type="primary" :loading='btnLoading' @click="btnLoading = true;$throttle(doSave)">申请上架</el-button>
        <el-button @click="back">放弃设置</el-button>
      </div>
    </div>
    <dialogAddStore :dialogVisible.sync="dialogStoreVisible" @selectedStore="getSelectStore" @close="dialogStoreVisible=false"/>
    <el-dialog
        title="门店特殊积分"
        :visible.sync="showStoreNumberDialog"
        width="1000px"
        destroy-on-close
    >
      <div class="con-con">
        <el-table
            :data="rowDataList"
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
              prop="storeLevel"
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
          <el-table-column
              prop="price"
              label="特殊积分"
              width="240"
              show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-input class="input" type="number" style="height:30px;" v-model="scope.row.price" @input="change" placeholder="请输入" oninput="value=value.replace(/[^0-9]/g,'')"/>
            </template>
          </el-table-column>
          <el-table-column/>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer flex-center">
        <el-button type="primary" @click="saveRowData">{{ $text.save }}</el-button>
        <el-button @click="handleClose">{{ $text.cancel }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>