<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">门店状态</div>
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
      <div>
        <div class="label">所在区域</div>
        <div class="content">
          <el-select clearable v-model="toolBar.region.value"
                     filterable
                     placeholder="请输入所属区域"
                     :remote-method="pageSearchRegionList">
            <el-option
                    v-for="item in toolBar.region.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">门店等级</div>
        <div class="content">
          <el-select clearable v-model="toolBar.levels.value" placeholder="请选择门店等级">
            <el-option
                v-for="item in toolBar.levels.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="searchStoreListByPage">{{ $text.search }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" @click="toAdd" v-if="permission.includes('ZBPCB01020303')">{{ $text.newAdd }}</el-button>
        <importExport
            :showExport="permission.includes('ZBPCB01020306')"
        />
      </div>
      <div class="table">
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
            fixed="left"
            label="操作"
            width="180"
          >
           <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                 v-if="permission.includes('ZBPCB01020304')"
                @click="toEdit(scope.row.customerNo,scope.row.tenantNo)"
              >
              编辑
              </el-button>
               <el-button
               v-if="scope.row.status === 1 &&permission.includes('ZBPCB01020301')"
                type="text"
                size="small"
                @click="enableStoreFunc(scope.row.customerNo,scope.row.storeNo)"
              >
              启用
              </el-button>
              <el-button
               v-if="scope.row.status === 0 &&permission.includes('ZBPCB01020302')"
                type="text"
                size="small"
                @click="disableStoreFunc(scope.row.customerNo,scope.row.storeNo)"
              >
              禁用
              </el-button>
             <el-button
                 type="text"
                 size="small"
                 @click="navToChange(scope.row)"
             >
               性质变更记录
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
            prop="name"
            label="门店名称"
            width="120"
          >
           <template slot-scope="scope">
             <div >
 <div v-if="permission.includes('ZBPCB01020304')" @click="editStore(scope.row.customerNo,scope.row.tenantNo)" class="table-name-color">{{ scope.row.name }}</div>
  <div v-else class="table-name-color">{{ scope.row.name }}</div>
             </div>

            </template>
          </el-table-column>
          <el-table-column
              prop="storeNo"
              width="200"
              label="内部门店号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="outRefNo"
              width="140"
              label="门店编号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="level"
            label="门店等级"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="dealerName"
            label="所属经销商"
            width="220"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="dealerNo"
            label="内部经销商号"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="dealerRefNo"
            label="经销商编号"
            width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="address"
              label="门店地址"
              width="160"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="regionName"
              label="区域名称"
              width="120"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="contact"
              label="门店联系人"
              width="120"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="contactPhone"
              label="联系人手机号"
              width="120"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="门店状态"
            width="100"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['success', 'error'][scope.row.status]" :message="['启用', '禁用'][scope.row.status]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
              prop="created"
              label="创建时间"
              width="160"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="remarks"
              label="备注"
              width="120"
              show-overflow-tooltip
          >
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
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
