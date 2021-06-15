<template>
  <div class="page">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部" name="first"></el-tab-pane>
      <el-tab-pane label="待审核" name="second"></el-tab-pane>
      <el-tab-pane label="已审核" name="third"></el-tab-pane>
    </el-tabs>
    <div class="toolbar-box">
      <div>
        <div class="label">商品名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.name" placeholder="请输入商品名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">商品分类</div>
        <div class="content">
          <el-select clearable v-model="toolBar.categoryNo.value" placeholder="请选择商品分类">
            <el-option
              v-for="item in toolBar.categoryNo.options"
              :key="item.categoryNo"
              :label="item.wholeCategoryName"
              :value="item.categoryNo">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">商品标签</div>
        <div class="content">
          <el-select clearable v-model="toolBar.labelNo.value" placeholder="请选择商品标签">
            <el-option
                v-for="item in toolBar.labelNo.options"
                :key="item.labelNo"
                :label="item.labelName"
                :value="item.labelNo">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">品牌</div>
        <div class="content">
          <el-select clearable v-model="toolBar.brandNo.value" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.brandNo.options"
              :key="item.brandNo"
              :label="item.brandName"
              :value="item.brandNo">
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- <div>
        <div class="label">商品规格</div>
        <div class="content">
          <el-input clearable v-model="toolBar.spec" placeholder="请输入商品规格" ></el-input>
        </div>
      </div> -->
      <div>
        <div class="label">商品规格</div>
        <div class="content">
          <el-select clearable v-model="toolBar.specNo.value" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.specNo.options"
              :key="item.specNo"
              :label="item.specFiled"
              :value="item.specFiled">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="clearData">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar" v-show="activeName !== 'third'">
        <el-button type="primary" @click="batchToVerify('pass')" v-if="permission.includes('ZBPCD01011001')">{{ $text.pass }}</el-button>
        <el-button type="primary" @click="batchToVerify('refuse')" v-if="permission.includes('ZBPCD01011002')">{{ $text.refuse }}</el-button>
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
            width="140"
          >
            <template slot-scope="scope">
              <!-- 通过 -->
              <el-button
                type="text"
                size="small"
                v-if="scope.row.auditStatus <2 &&permission.includes('ZBPCD01011001')"
                @click="toVerify(scope.row,'pass')"
              >
                {{ $text.pass }}
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="toDetail(scope.row)"
              >
                {{ $text.detail }}
              </el-button>
              <el-button
                type="text"
                size="small"
                v-if="scope.row.auditStatus <2 &&permission.includes('ZBPCD01011002')"
                @click="toVerify(scope.row,'refuse')"
              >
                {{ $text.refuse }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="50"
          >
          </el-table-column>
          <el-table-column
            prop="itemNo"
            label="商品编号"
            show-overflow-tooltip
            width="170"
          >
          </el-table-column>
          <el-table-column
            prop="itemName"
            label="商品名称"
            width="300"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="label"
            label="商品标签"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="categoryName"
            label="商品分类"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="brandName"
            label="商品品牌"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="specDetail"
            label="商品规格"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="auditStatus"
            label="审核状态"
            width="100"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['warning','warning', 'success', 'error'][scope.row.auditStatus]" :message="['待审核', '待审核', '已通过', '已拒绝'][scope.row.auditStatus]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="applyName"
            label="申请人"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="applyTime"
            label="申请时间"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="auditTime"
            label="审核时间"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="auditDesc"
              label="否决理由"
              min-width="160"
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
      <el-dialog
          title="拒绝理由"
          :visible.sync="refuseDialog"
          :close-on-click-modal="false"
          @close="closedDialog"
          width="520px">
        <el-input type="textarea" v-model="refuseReason" rows="10" placeholder="请输入拒绝理由" resize="none"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="refuseDialog = false">取 消</el-button>
          <el-button type="primary" @click="doRefusing">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>