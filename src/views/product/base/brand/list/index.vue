<template>
  <div class="page">
    <div class="toolbar-box commodity-toolbar-box">
      <div>
        <div class="label">查找品牌</div>
        <div class="content">
          <el-input clearable v-model="toolBar.name" placeholder="请输入品牌名称"></el-input>
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
        <div class="label">状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.class.stateValue" :placeholder="$text.selectPlaceholder">
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
        <div class="label">创建人</div>
        <div class="content">
          <el-input clearable v-model="toolBar.createBy" placeholder="输入创建人"></el-input>
        </div>
      </div>
      <el-button type="primary" @click.native="getBrandData()">{{ $text.search }}</el-button>
      <el-button type="primary" @click.native="clearData()" plain >{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button
         v-if="permission.includes('ZBPCD01010301')"
                type="primary"
                icon="el-icon-plus"
                @click="addBrand">
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
            <template slot-scope="scope" >
              <el-button
                      type="text"
                      size="small"
                      @click="editForm(scope.row)"
                      v-if="permission.includes('ZBPCD01010304')"
                      :disabled="scope.row.status !== 0"
              >
               {{ $text.edit }}
              </el-button>
              <el-button
                v-if="scope.row.status === 0 && permission.includes('ZBPCD01010302')"
                type="text"
                size="small"
                @click="editStatus(scope.row.brandNo,1)"
              >
                {{ $text.enable }}
              </el-button>
              <el-button
                 v-if="scope.row.status != 0 && permission.includes('ZBPCD01010303')"
                type="text"
                size="small"
                @click="editStatus(scope.row.brandNo,0)"
              >
                {{ $text.stopUsing }}
              </el-button>
              <el-button
                      type="text"
                      size="small"
                      @click="copyBrandLink(scope.row.brandNo)"
              >
                复制链接
              </el-button>
              <el-button
              @click="deleteBrandNo(scope.row.brandNo)"
                         type="text"
                         size="small">
                {{ $text.del }}
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
                  prop="brandName"
                  label="商品品牌"
                  width="120"
          >
          </el-table-column>
          <el-table-column
                  prop="brandUrl"
                  label="分类图片"
                  width="100"
                  show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <img style="width: 30px;height: 30px;" :src="scope.row.brandUrl">
              </div>
            </template>
          </el-table-column>
          <el-table-column
                  prop="status"
                  label="状态"
                  width="120"
                  show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                {{['停用', '启用'][scope.row.status]}}
              </div>
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
        <el-button type="primary" size="small" @click.native="handleCurrentChange()">{{ $text.paginationGo }}</el-button>
      </div>
    </div>
    <CommodityBrandForm :dialogVisible.sync="dialogVisible" @saveData="saveData" :editForm="editFormData" :dialogTitle="dialogTitle"/>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>