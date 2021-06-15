<template>
  <div class="page">
    <div class="toolbar-box activity-class-toolbar">
      <div>
        <div class="label">分类名称</div>
        <div class="content">
          <el-input v-model="toolBar.categoryName" placeholder="请输入分类名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">创建日期</div>
        <div class="content">
          <el-date-picker
              v-model="toolBar.created"
              type="daterange"
              range-separator="~"
              start-placeholder="创建开始日期"
              end-placeholder="创建结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
      </div>
      <div>
        <div class="label">状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.status.value" :placeholder="$text.selectPlaceholder">
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
        <div class="label">分类类型</div>
        <div class="content">
          <el-select clearable v-model="toolBar.categoryType.value" :placeholder="$text.selectPlaceholder">
            <el-option
                v-for="item in toolBar.categoryType.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="searchDataPage">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="resetTableData">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" icon="el-icon-plus" @click="openAddDetail" v-if="permission.includes('ZBPCD01030301')">{{ $text.newAdd }}</el-button>
        <el-button type="primary" @click="deleteCategoryMulti" >{{ $text.del }}</el-button>
        <importExport
            :showExport="true"
        />
      </div>
      <div class="table activity-table">
        <el-table
            :data="tableData"
            header-cell-class-name="table-header-item"
            v-loading="tableLoading"
            @selection-change="handleSelectionChange"
        >
          <el-table-column
              fixed="left"
              type="selection"
              width="55"
          >
          </el-table-column>
          <el-table-column
              label="操作"
              width="240"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                 v-if="permission.includes('ZBPCD01030302')"
                @click="openEditDetail(scope.row.categoryNo)"
              >
                {{ $text.edit }}
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="openDetail(scope.row.categoryNo)"
              >
                {{ $text.detail }}
              </el-button>
              <el-button
                v-if="scope.row.status === 1 &&permission.includes('ZBPCD01030304')"
                type="text"
                size="small"
                @click="disableCategory(scope.row.categoryNo)"
              >
                {{ $text.stopUsing }}
              </el-button>
              <el-button
                v-if="scope.row.status != 1 &&permission.includes('ZBPCD01030303')"
                type="text"
                size="small"
                @click="enableCategory(scope.row.categoryNo)"
              >
                {{ $text.enable }}
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="copyCategoryLink(scope.row.categoryNo)"
              >
                {{$text.copyLink}}
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="deleteCategory(scope.row.categoryNo)"
              >
                {{ $text.del }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
              prop="categoryName"
              label="分类名称"
              width="200">
          </el-table-column>
          <el-table-column
              prop="created"
              label="创建时间"
              width="200">
          </el-table-column>
          <el-table-column
              prop="createBy"
              label="创建人"
              width="120"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="status"
              label="状态"
              width="120"
              show-overflow-tooltip>
            <template slot-scope="scope">
              <i-status :type="['error', 'success'][scope.row.status]" :message="['禁用', '启用'][scope.row.status]"/>
            </template>
          </el-table-column>
          <el-table-column
              prop="categoryType"
              label="分类类型"
              width="120"
              show-overflow-tooltip>
            <template slot-scope="scope">
              {{ ['秒杀活动', '限时抢购活动', '商品组合活动'][scope.row.categoryType] }}
            </template>
          </el-table-column>
          <el-table-column
              prop="count"
              label="活动数量"
              width="120">
            <template slot-scope="scope">
              <a class="count" @click="getCountDialog(scope.row)">{{scope.row.count}}</a>
            </template>
          </el-table-column>
          <el-table-column
              prop="remark"
              label="备注"
              width="200"
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
      </div>
    </div>
    <el-dialog
        class="activity-class-box"
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        width="500px"
        :before-close="handleClose"
        destroy-on-close
    >
      <activityClassAdd ref="activityClassRef" :categoryNo="categoryNo" @afterSave="afterSave" @validateFailed="validateFailed"/>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="saveActivityCategory">确 定</el-button>
      </span>
    </el-dialog>
    <dialogActivityList :categoryNo="currentRow.categoryNo" :dialogVisible.sync="listDialogVisible"/>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>