<template>
  <el-dialog
    class="dialog-choose-box"
    title="添加卡券"
    :visible.sync="dialogVisible"
    width="1200px"
    height="512px"
    destroy-on-close
    :before-close="handleClose"
  >
    <div class="border-content">
      <div class="dialog-toolbar">
        <div class="toolbar-box dialog-set-list-toolbar">
          <div>
            <div class="label">优惠券名称</div>
            <div class="content">
              <el-input
                v-model="searchData.ruleName"
                placeholder="请输入卡券名称"
                clearable
              />
            </div>
          </div>
          <!-- <div>
          <div class="label">优惠券券码</div>
          <div class="content">
            <el-select
              clearable
              v-model="toolBar.class.storeLebelValue"
              placeholder="请选择"
            >
              <el-option
                v-for="item in toolBar.class.storeLebelOptions"
                :key="item.storeLebelValue"
                :label="item.storeLebelLabel"
                :value="item.storeLebelValue"
              >
              </el-option>
            </el-select>
          </div>
        </div> -->
          <el-button type="primary" :loading="loading" @click="searchTableData">
            {{ $text.search }}
          </el-button>
        </div>
      </div>
      <div class="table-main">
        <div class="table">
          <el-table
            :data="tableData"
            v-loading="loading"
            max-height="330"
            @selection-change="handleSelectionChange"
            header-cell-class-name="table-header-item"
          >
            <el-table-column type="selection" width="60" />

            <el-table-column
              prop="index"
              label="序号"
              width="60"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <span>
                  {{
                    (searchData['page.pageNum'] - 1) *
                      searchData['page.pageSize'] +
                      scope.$index +
                      1
                  }}
                </span>
              </template>
            </el-table-column>

            <el-table-column
              prop="ruleName"
              label="卡券名称"
              width="160"
              header-align="center"
            />
            <el-table-column
              prop="creatTime"
              label="卡券有效时间"
              show-overflow-tooltip
              width="320"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.startTime }} ~ {{ scope.row.endTime }}
              </template>
            </el-table-column>

            <el-table-column
              prop="state"
              label="卡券状态"
              min-width="100"
              header-align="center"
              align="center"
            >
              <template slot-scope="scope">
                <div>
                  {{ ['停用','启用'][scope.row.status] }}
                </div>
              </template>
            </el-table-column>

            <el-table-column
              prop="created"
              label="卡券创建时间"
              width="180"
              show-overflow-tooltip
              header-align="center"
              align="center"
            />
          </el-table>
        </div>
        <div class="pagination dialog">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="searchData['page.pageNum']"
            :page-sizes="[10, 20, 50, 100, 200]"
            :page-size="searchData['page.pageSize']"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
          <el-button type="primary" size="small">
            {{ $text.paginationGo }}
          </el-button>
        </div>
      </div>
    </div>

    <span slot="footer" class="dialog-footer flex-center">
      <el-button type="primary" @click="handleAdd">添加</el-button>
      <el-button type="primary" plain @click="handleClose">取消</el-button>
    </span>
  </el-dialog>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
@import './index';
</style>
<style>
.el-message-box__title > span {
  font-size: 16px;
  font-weight: 600;
}

.el-dialog__body .table-main {
  padding: 0 20px;
}

.dialog-choose-box .el-dialog__body {
  padding: 20px 0;
}
</style>
