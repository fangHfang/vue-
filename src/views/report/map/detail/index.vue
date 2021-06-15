<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">时间段搜索</div>
        <div class="content">
          <el-date-picker
              v-model="toolBar.dataRange"
              type="daterange"
              range-separator="~"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <div>
        <div class="label">所在区域</div>
        <div class="content">
          <el-cascader
              :options="areaOptions"
              placeholder="请选择省/市/区"
              v-model="toolBar.selectArea"
              @change="handleAreaChange"
          >
          </el-cascader>
        </div>
      </div>
      <div>
        <div class="label">经销商名称</div>
        <div class="content">
          <el-input v-model="toolBar.distributor" placeholder="请输入经销商名称/code"></el-input>
        </div>
      </div>
      <div>
        <div class="label">门店名称</div>
        <div class="content">
          <el-input v-model="toolBar.store" placeholder="请输入门店名称/code"></el-input>
        </div>
      </div>
      <collapse :open.sync="openAdvancedSearch" openText="高级搜索" closeText="高级搜索">
        <div slot="title" class="collapse-title"/>
        <div slot="content" class="toolbar-box spec">
          <div>
            <div class="label">商品分类</div>
            <div class="content">
              <el-select clearable v-model="toolBar.type.value" placeholder="请选择商品分类">
                <el-option
                    v-for="item in toolBar.type.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="label">商品品牌</div>
            <div class="content">
              <el-select clearable v-model="toolBar.brand.value" placeholder="请选择商品品牌">
                <el-option
                    v-for="item in toolBar.brand.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="label">商品标签</div>
            <div class="content">
              <el-select clearable v-model="toolBar.tag.value" placeholder="请选择商品标签">
                <el-option
                    v-for="item in toolBar.tag.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="label">商品搜索</div>
            <div class="content">
              <el-input v-model="toolBar.name" placeholder="请输入商品名称/规格/编号"></el-input>
            </div>
          </div>
          <div>
            <div class="label">轮胎花纹</div>
            <div class="content">
              <el-select clearable v-model="toolBar.pattern.value" placeholder="请选择轮胎花纹">
                <el-option
                    v-for="item in toolBar.pattern.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="label">轮胎尺寸</div>
            <div class="content">
              <el-select clearable v-model="toolBar.size.value" placeholder="请选择轮胎尺寸">
                <el-option
                    v-for="item in toolBar.size.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div>
            <div class="label">搜索码</div>
            <div class="content">
              <el-input v-model="toolBar.code" placeholder="请输入搜索码"></el-input>
            </div>
          </div>
        </div>
      </collapse>
      <el-button type="primary" class="special">{{ $text.search }}</el-button>
      <el-button type="primary" plain class="special">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <importExport
            :showExport="true"
        />
      </div>
      <div class="table">
        <el-table
            :data="tableData"
            header-cell-class-name="table-header-item"
        >
          <el-table-column
              fixed="left"
              type="selection"
              width="55"
          >
          </el-table-column>
          <el-table-column
              type="index"
              label="序号"
              width="60"
          >
          </el-table-column>

          <el-table-column
              width="150"
              prop="dealerNo"
              label="内部经销商号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              width="150"
              prop="dealerRefNo"
              label="经销商编号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="distributorName"
              label="经销商名称"
              width="160"
          >
          </el-table-column>

          <el-table-column
              prop="storeNo"
              width="150"
              label="内部门店号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="storeRefNo"
              width="150"
              label="门店编号"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="storeName"
              label="门店名称"
              width="160"
          >
          </el-table-column>
          <el-table-column
              prop="address"
              label="门店地址"
              width="200"
          >
          </el-table-column>
          <el-table-column
              prop="area"
              label="所在区域"
              width="160"
          >
          </el-table-column>
          <el-table-column
              prop="contact"
              label="门店联系人"
              width="160"
          >
          </el-table-column>
          <el-table-column
              prop="tel"
              label="联系人手机号"
              width="160"
          >
          </el-table-column>
          <el-table-column
              prop="state"
              label="门店状态"
              width="120"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="[ 'success', 'error'][scope.row.state]" :message="['已开启','已关闭'][scope.row.state]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
              prop="sale"
              label="销量"
              width="120"
          >
          </el-table-column>
          <el-table-column
              prop="createdTime"
              label="创建时间"
              width="160"
          >
          </el-table-column>
          <el-table-column
              prop="remark"
              label="备注"
              show-overflow-tooltip
              width="200"
          >
          </el-table-column>
          <el-table-column/>
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
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>