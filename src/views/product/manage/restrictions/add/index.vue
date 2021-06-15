<template>
  <el-dialog
          :title="title"
          :visible.sync="dialogVisibleAdd"
          width="1200px"
          top="6vh"
          destroy-on-close
          :before-close="handleClose"
  >
    <div class="border-content">
      <div class="con-header">
        <el-select
                v-model="selectNature"
                multiple
                v-if="title === '设置限购商品'"
                class="con-input"
                collapse-tags
                placeholder="请选择门店性质">
          <el-option
                  v-for="item in natureAllList"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
        <el-select
                v-model="selectStore"
                multiple
                v-else
                filterable
                remote
                :remote-method="remoteMethod"
                class="con-input select-arrow"
                value-key="value"
                collapse-tags
                placeholder="请选择门店名称">
          <el-option
                  v-for="item in storeAllList"
                  :key="item.value"
                  :label="item.label"
                  :value="item">
          </el-option>
        </el-select>
        <span class="text">限购数值：</span>
        <el-input clearable class="con-input" v-model="rebateValue" placeholder="请输入"></el-input>
      </div>
      <div class="h2" v-if="selectNature.length>0 && title === '设置限购商品'">所选门店性质</div>
      <div class="h2" v-if="selectNature.length>0 && title === '选择特殊门店限购'">所选门店名称</div>
      <div class="tag-box" v-if="title === '设置限购商品' && selectNature.length>0">
        <el-tag
                :key="tag+i"
                v-for="(tag,i) in selectNature"
                closable
                class="tag"
                :disable-transitions="true"
                @close="handleTagClose(tag,i)"
        >
          {{tag}}
        </el-tag>
      </div>
      <div class="tag-box" v-if="title === '选择特殊门店限购' && selectStore.length>0">
        <el-tag
                :key="tag+i"
                v-for="(tag,i) in selectStore"
                closable
                class="tag"
                :disable-transitions="true"
                @close="handleTagClose(tag,i)"
        >
          {{tag.label}}
        </el-tag>
      </div>
      <div class="toolbar-box">
        <div>
          <div class="label">成品代号</div>
          <div class="content">
            <el-input v-model="searchData.productCode" clearable placeholder="成品代号检索"></el-input>
          </div>
        </div>
        <div>
          <div class="label">规格</div>
          <div class="content">
            <el-input v-model="searchData.spec" clearable placeholder="规格检索"></el-input>
          </div>
        </div>
        <div>
          <div class="label">英寸</div>
          <div class="content">
            <el-input v-model="searchData.size" clearable placeholder="英寸检索"></el-input>
          </div>
        </div>
        <div>
          <div class="label">同类花纹</div>
          <div class="content">
            <el-input v-model="searchData.similarTread" clearable placeholder="同类花纹检索"></el-input>
          </div>
        </div>
        <div>
          <div class="label">胎侧标志</div>
          <div class="content">
            <el-input v-model="searchData.blackWhiteLine" clearable placeholder="胎侧标志检索"></el-input>
          </div>
        </div>
        <div>
          <div class="label">品牌</div>
          <div class="content">
            <el-input v-model="searchData.brandName" clearable placeholder="品牌检索"></el-input>
          </div>
        </div>
        <div>
          <div class="label">载重</div>
          <div class="content">
            <el-input v-model="searchData.carryingCapacity" clearable placeholder="载重检索"></el-input>
          </div>
        </div>
        <div>
          <div class="label">搜索字段</div>
          <div class="content">
            <el-input v-model="searchData.searchField" clearable placeholder="搜索字段检索"></el-input>
          </div>
        </div>
        <el-button type="primary" @click.native="search">{{ $text.search }}</el-button>
      </div>
      <div class="table-main" style="padding:0;">
        <div class="table">
          <el-table
              :data="tableData"
              max-height="300"
              v-loading="tableLoading"
              header-cell-class-name="table-header-item"
              @selection-change="handleSelectionChange">
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
                align="center"
                width="50"
            >
            </el-table-column>
            <el-table-column
                prop="productNo"
                label="产品编号"
                width="200"
                v-if="false"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="productCode"
                label="成品代号"
                width="120"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="specDetail"
                label="规格明细"
                width="160"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="spec"
                label="规格"
                width="120"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="size"
                label="英寸"
                width="80"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="tread"
                label="花纹"
                width="100"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="similarTread"
                label="同类花纹"
                width="120"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="brandName"
                label="品牌"
                width="90"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="carryingCapacity"
                label="载重"
                width="90"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="blackWhiteLine"
                label="胎侧标志"
                width="100"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="level"
                label="层级"
                width="80"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="loadSpeed"
                label="荷重/速度"
                width="100"
                show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
                prop="type"
                label="胎别"
                width="100"
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
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer flex-center">
      <el-button type="primary" @click="selectData()">{{ $text.add }}</el-button>
      <el-button @click="handleClose">{{ $text.cancel }}</el-button>
    </div>
  </el-dialog>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
