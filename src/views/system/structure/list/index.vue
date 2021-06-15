<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">经销商名称</div>
        <div class="content">
          <dealerSelect @item-change="dealerChange" ref="dealer"/>

          <!-- <el-input clearable v-model="toolBar.storeName" placeholder="请输入门店名称"></el-input> -->
        </div>
      </div>
      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <storeSelect @change="storeChange" ref="store"/>

          <!-- <el-input clearable v-model="toolBar.storeName" placeholder="请输入门店名称"></el-input> -->
        </div>
      </div>
      <div>
        <div class="label" style="width:100px">状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.status" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in condition.statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="searchDealerOrgListByPage">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="resetSearchDealerOrgListByPage">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" v-if="permission.includes('ZBPCA01020101')" @click="openSelectedChangeDialog">{{ $text.change }}</el-button>
        <el-button type="primary" v-if="permission.includes('ZBPCA01020102')" @click="batchBeginUsing">{{ $text.enable }}</el-button>
        <el-button type="primary" v-if="permission.includes('ZBPCA01020103')" plain @click="batchStopUsing">{{ $text.stopUsing }}</el-button>
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          :indent="0"
          :lazy="true"
          ref="tableRef"
          header-cell-class-name="table-header-item"
          v-loading="tableLoading"
          @select-all="selectAll"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="expand" width="1">
            <template slot-scope="props">
              <el-table
                  :data="props.row.storeList"
                  :ref="'tableChildRef'+props.$index"
                  header-cell-class-name="table-header-item-child"
                  v-loading="tableLoading"
                  @selection-change="handleChildSelectionChange"
              >
                <el-table-column
                    type="selection"
                    width="55"
                >
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="160"
                >
                  <template slot-scope="scope">
                    <el-button
                        v-if="scope.row.status === 1 && permission.includes('ZBPCA01020102')"
                        type="text"
                        size="small"
                        @click="orgBeginUsing(scope.row)"
                    >
                      {{ $text.enable }}
                    </el-button>
                    <el-button
                        v-if="(scope.row.status === 0 || scope.row.status === 2) && permission.includes('ZBPCA01020103')"
                        type="text"
                        size="small"
                        @click="orgStopUsing(scope.row)"
                    >
                      {{ $text.stopUsing }}
                    </el-button>
                    <el-button
                       v-if="permission.includes('ZBPCA01020101')"
                        type="text"
                        size="small"
                        @click="organizationChange(scope.row)"
                    >
                      {{ $text.change }}
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                    type="index"
                    label="序号"
                    width="100"
                >
                  <template slot-scope="scope">
                    <span :style="`margin-left: 20px;`">{{scope.$index+1}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                    label="分类等级"
                    width="200"
                    show-overflow-tooltip
                    align="left">
                  <template slot-scope="scope">
                    <p :style="`margin-left: 20px;margin-top:0;margin-bottom:0`">
                      <i
                          @click="toggleFoldingStatus(scope.row)"
                          class="permission_toggleFold"
                          ></i>
                      2级
                    </p>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="typeName"
                    label="组织类型"
                    show-overflow-tooltip
                    width="170"
                >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="组织名称"
                    show-overflow-tooltip
                    width="170"
                >
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    width="100"
                >
                  <template slot-scope="scope">
                    <div>
                      <i-status :type="['success', 'error', 'warning', 'warning'][scope.row.status]" :message="['启用', '关闭'][scope.row.status]" />
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                    prop="createBy"
                    label="创建人"
                    show-overflow-tooltip
                    width="170"
                >
                </el-table-column>
                <el-table-column
                    prop="created"
                    label="创建时间"
                    show-overflow-tooltip
                    width="170"
                >
                </el-table-column>
                <el-table-column
                    prop="remarks"
                    label="备注"
                    min-width="260"
                    show-overflow-tooltip
                >
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="160"
          >
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status === 1"
                type="text"
                size="small"
                @click="orgBeginUsing(scope.row)"
              >
                {{ $text.enable }}
              </el-button>
               <el-button
                v-if="scope.row.status === 0 || scope.row.status === 2"
                type="text"
                size="small"
                @click="orgStopUsing(scope.row)"
              >
                {{ $text.stopUsing }}
              </el-button>
              <el-button
                 v-if="scope.row.__level > 0"
                type="text"
                size="small"
                @click="organizationChange(scope.row)"
              >
                {{ $text.change }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="100"
          >
          </el-table-column>
          <el-table-column
            label="分类等级"
            width="200"
            show-overflow-tooltip
            align="left">
              <template slot-scope="scope">
                <p :style="`margin-left: 0px;margin-top:0;margin-bottom:0`">
                  <i
                    @click="toggleExpand(scope.row)"
                    :class="scope.row.expanded?'permission_toggleFold iconfont jianshao' : 'permission_toggleFold iconfont jiashu'"></i>
                   1级
                  </p>
              </template>
          </el-table-column>
          <el-table-column
            prop="typeName"
            label="组织类型"
             show-overflow-tooltip
            width="170"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="组织名称"
             show-overflow-tooltip
            width="170"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="100"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['success', 'error', 'warning', 'warning'][scope.row.status]" :message="['启用', '关闭'][scope.row.status]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="createBy"
            label="创建人"
             show-overflow-tooltip
            width="170"
          >
          </el-table-column>
          <el-table-column
            prop="created"
            label="创建时间"
             show-overflow-tooltip
            width="170"
          >
          </el-table-column>
          <el-table-column
            prop="remarks"
            label="备注"
            min-width="260"
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
    </div>
    <el-dialog
      title="变更组织"
      :visible.sync="dialogVisible"
      width="400px">
      <div class="del-form">
        <el-form :model="form" :rules="rules" ref="form" label-width="80px">
          <el-form-item label="组织名称" prop="name">
            <el-input disabled v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="组织编码" prop="code">
            <el-input disabled v-model="form.code"></el-input>
          </el-form-item>
          <el-form-item label="直属上级" prop="dealerNo">
            <el-select clearable filterable v-model="form.dealerNo" placeholder="请选择直属上级">
              <el-option
                v-for="item in dealerNameList"
                :key="item.dealerNo"
                :label="item.name"
                :value="item.dealerNo">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
@import "./index";
</style>