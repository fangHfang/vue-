<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">查找分类</div>
        <div class="content">
          <el-input clearable v-model="toolBar.class" placeholder="请输入"></el-input>
        </div>
      </div>
      <div>
        <div class="label">创建日期</div>
        <div class="content">
           <el-date-picker
              v-model="toolBar.date"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              :default-time="['00:00:00','23:59:59']"
              end-placeholder="结束日期">
            </el-date-picker>
        </div>
      </div>
      <div>
        <div class="label">状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.status.value" placeholder="禁用/启用">
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
        <div class="label" style="width: 120px;">是否关联产品</div>
        <div class="content">
          <el-select clearable v-model="toolBar.relatedProducts.value" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.relatedProducts.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button
      type="primary"
      @click="searchCategoryItem"
      >{{ $text.search }}</el-button>
      <el-button type="primary"
       @click="resetCategoryName"
       plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button
          type="primary"
          icon="el-icon-plus"
          v-if="permission.includes('ZBPCD01010101')"
          @click="createCategoryType('',0,0)">
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
          :row-style="toggleDisplayTr"
          header-cell-class-name="table-header-item"
        >
          <el-table-column
            fixed="left"
            type="selection"
            width="30"
          >
          </el-table-column>
          <el-table-column
            fixed="left"
            label="操作"
            width="260"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                v-if="(!scope.row.edit) && (permission.includes('ZBPCD01010104'))"
                :disabled="scope.row.status!==0"
                @click="scope.row.edit = true"
              >
               {{ $text.editName }}
              </el-button>
              <!-- 修改显示的保存 -->
              <el-button
                type="text"
                size="small"
                v-if="(scope.row.edit) && (permission.includes('ZBPCD01010104'))"
                @click="editName(scope.row)"
              >
                {{ $text.save }}
              </el-button>
              <el-button
                type="text"
                size="small"
                v-if="(!scope.row.edit)&&permission.includes('ZBPCD01010101')"
                :disabled="scope.row.status!==0"
                @click="createCategoryType(scope.row.categoryName,scope.row.categoryLevel,scope.row.categoryNo,scope.row)"
              >
                新建下级分类
              </el-button>
             <el-button
                v-if="scope.row.status === 1 && permission.includes('ZBPCD01010103')"
                type="text"
                size="small"
                @click="transferStatus(0,scope.row.categoryNo,scope.row)"
              >
                {{ $text.stopUsing }}
              </el-button>

               <el-button
                v-if="(scope.row.status === 0 || scope.row.status === 2) && permission.includes('ZBPCD01010102')"
                type="text"
                size="small"
                @click="transferStatus(1,scope.row.categoryNo,scope.row)"
              >
                {{ $text.enable }}
              </el-button>

              <el-button
                type="text"
                size="small"
                @click="delCategoryItem(scope.row.categoryNo)"
              >
                {{ $text.del }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="sort"
            label="序号"
            width="50"
          >
          <template slot-scope="scope">
              <span :style="`margin-left: ${scope.row.__level * 20}px;`">{{scope.row.__index+1}}</span>
          </template>
          </el-table-column>
          <el-table-column
            label="分类等级"
            width="250"
            show-overflow-tooltip
            align="left">
                <template slot-scope="scope">
                    <p :style="`margin-left: ${scope.row.__level * 20}px;margin-top:0;margin-bottom:0`">
                      <i
                        @click="toggleFoldingStatus(scope.row)"
                        class="permission_toggleFold"
                        :class="toggleFoldingClass(scope.row)"></i>
                        {{scope.row.__level+1}}级
                      </p>
                </template>
          </el-table-column>
          <el-table-column
            prop="categoryName"
            label="分类名称"
            show-overflow-tooltip
            width="170"
          >
            <template slot-scope="scope">
              <span v-if="!scope.row.edit">{{scope.row.categoryName}}</span>
              <el-input class="input-edit" v-else :value="scope.row.categoryName" @input="e=>scope.row.categoryName=$validForbid(e)"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="100"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['error', 'success', 'warning'][scope.row.status]" :message="['禁用', '启用'][scope.row.status || 0]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="已关联产品"
            width="150"
            show-overflow-tooltip
          >
           <template slot-scope="scope">
             <span>{{scope.row.flag ? '是':'否'}}</span>
              </template>
          </el-table-column>

          <el-table-column
            prop="createBy"
            label="创建人"
            width="120"
            show-overflow-tooltip
          >

          </el-table-column>

          <el-table-column
            prop="created"
            label="创建时间"
            width="160"
            show-overflow-tooltip
          >

          </el-table-column>

          <el-table-column
            prop="remark"
            label="备注"
            min-width="220"
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
          :page-count="pagination.pages"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
        >
        </el-pagination>
        <el-button type="primary" size="small">{{ $text.paginationGo }}</el-button>
      </div>
    </div>
    <dialogForm :categoryName="categoryName" :parentNo="parentNo" :categoryLevel="categoryLevel" :dialogVisible.sync="dialogVisible" @refreshRowData="refreshRowData" />
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>