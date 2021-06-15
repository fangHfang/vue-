<template>
  <el-dialog
      title="选择经销商"
      :visible.sync="dialogVisible"
      width="1200px"
      destroy-on-close
      :before-close="handleClose">
    <div class="border-content">
      <div class="toolbar-box convert-rule-toolbar">
        <div>
          <div class="label" style="width: 100px;">经销商名称</div>
          <div class="content">
            <dealerSelect @change="dealerChange" ref="dealer"/>
          </div>
        </div>
      <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="reset">{{ $text.reset }}</el-button>
    </div>
      <div v-if="mark==='itemUpShelf'" class="toolbar-box" style="background:#fff;border:none">
        <div>
          <div class="label">商品价格</div>
          <div class="content">
            <el-input clearable v-model="toolBar.price" :min="0" type="number" placeholder="请输入"></el-input>
          </div>
        </div>
      </div>
      <div class="">
        <div class="table" style="margin-bottom:10px;">
          <el-table
              :data="tableData"
              max-height="400"
              v-loading="tableLoading"
              @selection-change="handleSelectionChange"
              header-cell-class-name="table-header-item"
          >
            <el-table-column
                type="selection"
                width="55"
            >
            </el-table-column>
            <el-table-column
                fixed="left"
                label="操作"
                width="100"
                v-if="mark==='itemUpShelf'"
                align="center"
            >
              <template slot-scope="scope">
                <el-button
                    type="text"
                    size="small"
                    style="color:gray;"
                    v-if="scope.row.price && !scope.row.adjustPrice"
                >
                  {{ $text.saved }}
                </el-button>
                <el-button
                    v-else
                    type="text"
                    size="small"
                    @click="saveOneDealerPrice(scope.row)"
                >
                  {{ $text.save }}
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
                :prop="mark==='itemUpShelf'?'customerNo':'dealerNo'"
                label="内部经销商号"
                show-overflow-tooltip
                :min-width="mark==='itemUpShelf'?150:300"
            >
            </el-table-column>
            <el-table-column
                :min-width="mark==='itemUpShelf'?150:300"
                prop="dealerRefNo"
                label="经销商编号"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="name"
                label="经销商名称"
                :min-width="mark==='itemUpShelf'?120:200"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="remarks"
                v-if="mark!=='itemUpShelf'"
                label="经销商标签"
                min-width="200"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="price"
                v-if="mark==='itemUpShelf'"
                label="价格"
                min-width="100"
                show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>{{scope.row.price || 0}}</span>
              </template>
            </el-table-column>
            <el-table-column
                prop="adjustPrice"
                v-if="mark==='itemUpShelf'"
                label="调整后价格"
                min-width="100"
                show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-input clearable class="input" type="number" :min="0" style="height:30px;" v-model="scope.row.adjustPrice" @input="change(scope.row)" placeholder="请输入"/>
              </template>
            </el-table-column>
            <el-table-column>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination" style="display:flex;justify-content: flex-end">
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
    <span slot="footer" class="dialog-footer flex-center">
        <el-button type="primary" @click="btnLoading = true;$throttle(handleAdd)" :loading="btnLoading">{{ $text.save }}</el-button>
         <el-button @click="handleClose">{{ $text.cancel }}</el-button>
      </span>
  </el-dialog>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>