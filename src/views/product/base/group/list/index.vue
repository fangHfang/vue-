<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">查找分类</div>
        <div class="content">
          <el-input clearable v-model="toolBar.name" placeholder="请输入" clearable></el-input>
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
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']">
            >
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
      <el-button type="primary" @click="searchCategoryItem">{{ $text.search }}</el-button>
      <el-button type="primary" @click="resetCategoryName" plain>{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button
          type="primary"
          icon="el-icon-plus"
          v-if="permission.includes('ZBPCD01010201')"
          @click="createCategoryType('',0,'0')">
          {{ $text.newBuild }}
        </el-button>
        <!-- <el-button type="primary">{{$text.enable}}</el-button>
        <el-button type="primary">{{$text.stopUsing}}</el-button> -->
        <importExport
            :showExport="true"
        />
        <!-- <el-button type="primary">{{ $text.del }}</el-button> -->
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
            width="55"
          >
          </el-table-column>
          <el-table-column
            fixed="left"
            label="操作"
            width="350"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="edit(scope.row)"
                :disabled="scope.row.status!==0 &&permission.includes('ZBPCD01010204')"
              >
                {{ $text.edit }}
              </el-button>
              <!-- 停用 -->
             <el-button
                v-if="scope.row.status === 1 &&permission.includes('ZBPCD01010203')"
                type="text"
                size="small"
                @click="transferStatus(0,scope.row.categoryNo,scope.row)"

              >
                {{ $text.stopUsing }}
              </el-button>
              <!-- 启用 -->
               <el-button
                v-if="(scope.row.status === 0 || scope.row.status === 2)&&permission.includes('ZBPCD01010202')"
                type="text"
                size="small"
                @click="transferStatus(1,scope.row.categoryNo,scope.row)"
              >
                {{ $text.enable }}
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="relationProduct(scope.row.categoryNo)"
              >
              关联产品
                </el-button>
              <el-button
                type="text"
                size="small"
                v-if="(!scope.row.edit) && permission.includes('ZBPCD01010201')"
                @click="createCategoryType(scope.row.categoryName,scope.row.categoryLevel,scope.row.categoryNo,scope.row, 'nextLevel' )"
              >
                新建下级分类
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
            type="index"
            label="序号"
            width="50"
          >
            <template slot-scope="scope">
              <span :style="`margin-left: ${scope.row.__level * 20}px;`">{{scope.row.__index+1}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="分类等级"
            width="150"
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
            width="250"
          >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="120"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['error', 'success', 'warning'][scope.row.status]" :message="['禁用', '启用'][scope.row.status] || 0" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
              prop="sort"
              label="排序"
              width="80"
          >
          </el-table-column>
          <el-table-column
            label="已关联产品"
            width="100"
            show-overflow-tooltip
          >
           <template slot-scope="scope">
             <span>{{scope.row.flag ? '是':'否'}}</span>
              </template>
          </el-table-column>

          <el-table-column
            prop="createBy"
            label="创建人"
            width="150"
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
              min-width="200"
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
    <dialogForm :row.sync="row" :categoryName="categoryName" :parentNo="parentNo" :categoryLevel="categoryLevel" :title="title" :dialogVisible.sync="dialogVisible" ref="editItem" @refreshRowData="refreshRowData" @refreshListData="refreshListData"/>
    <!-- <CommoditySpecificationsEdit @listItemSpecTemplatePage="listItemSpecTemplatePage"/> -->
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>