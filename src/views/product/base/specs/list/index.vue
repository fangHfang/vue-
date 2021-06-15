<template>
  <div class="page">
    <div class="toolbar-box specifications-toolbar-box">
      <div>
        <div class="label" >模版名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.name" placeholder="请输入规格模版名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">规格项</div>
        <div class="content">
          <el-input clearable v-model="toolBar.filed" placeholder="请输入规格项"></el-input>
        </div>
      </div>
      <div>
        <div class="label">是否生效</div>
        <div class="content">
          <el-select clearable v-model="toolBar.class.stateValue" placeholder="全部">
            <el-option
                v-for="item in toolBar.class.stateOptions"
                :key="item.stateValue"
                :label="item.stateLabel"
                :value="item.stateValue">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">创建日期</div>
        <div class="content">
          <el-date-picker
              v-model="toolBar.dataValue"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </div>
      </div>

      <div>
        <div class="label">创建人</div>
        <div class="content">
          <el-select clearable v-model="toolBar.found.foundValue" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.found.foundOptions"
              :key="item.foundValue"
              :label="item.foundLabel"
              :value="item.foundValue">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="searchButtonClick()">{{ $text.search }}</el-button>
      <el-button type="primary" @click="clear()" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button
          type="primary"
          icon="el-icon-plus"
           v-if="permission.includes('ZBPCD01010401')"
          @click="dialogVisible = true">
          {{ $text.newBuild }}
        </el-button>
        <importExport
            :showExport="true"
        />
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          v-loading="tableLoading"
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
            width="240"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                 v-if="permission.includes('ZBPCD01010404')"
                :disabled="scope.row.status!==0 "
                @click="edit(scope.row)"
              >
                {{ $text.edit }}
              </el-button>
              <el-button
                type="text"
                size="small"
                 v-if="permission.includes('ZBPCD01010402')"
                @click="enableItemSpec(scope.row.specNo)"
              >
                {{ $text.enable }}
              </el-button>
              <el-button
                type="text"
                size="small"
                 v-if="permission.includes('ZBPCD01010403')"
                @click="stopUsingItemSpec(scope.row.specNo)"
              >
                {{ $text.stopUsing }}
              </el-button>
              <el-button
                  type="text"
                  size="small"
                  @click="deleteItemSpec(scope.row.specNo)"
              >
                {{ $text.del }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="specName"
            label="规格模版名称"
            show-overflow-tooltip
            min-width="140"
          >
          </el-table-column>
          <el-table-column
            prop="specFiled"
            label="规格项"
            width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="是否生效"
            width="140"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['error', 'success'][scope.row.status]" :message="['否', '是'][scope.row.status]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="createBy"
            label="创建人"
            width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="created"
            label="创建时间"
            width="240"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            width="200"
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
         <el-button type="primary" size="small">{{ $text.paginationGo }}</el-button>
      </div>
    </div>
    <el-dialog
      title="新增规格模板"
      :visible.sync="dialogVisible"
      width="600px">
      <!--CommoditySpecificationsAdd 副页面调用自页面 getBrandTableData 父组件传入子组件-->
      <CommoditySpecificationsAdd ref="CommoditySpecificationsAdd" :btnLoading.sync="btnLoading" @listItemSpecTemplatePage="listItemSpecTemplatePage" @close="close"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="btnLoading" @click="save">保存</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog
            title="修改规格模板"
            :visible.sync="editVisible"
            width="600px">
      <!--CommoditySpecificationsAdd 副页面调用自页面 getBrandTableData 父组件传入子组件-->
      <CommoditySpecificationsEdit ref="CommoditySpecificationsEdit" :btnLoading.sync="btnLoading" @listItemSpecTemplatePage="listItemSpecTemplatePage" @close="close"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="btnLoading" @click="update">保存</el-button>
        <el-button @click="editVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
<style>

  .specifications-toolbar-box > div .label{
    width: 80px;
    margin-right: 14px;
  }
</style>
