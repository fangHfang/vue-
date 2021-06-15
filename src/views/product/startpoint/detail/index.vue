<template>
  <div class="page">
    <div style="padding: 15px 0 0 15px;font-weight: 500;color: #333;">起订分规则{{ needEdited ? "编辑": "详情" }}</div>
    <div style="padding: 15px 0 0 15px;font-weight: 500">基础信息</div>
    <div class="toolbar-box activity-toolbar-box detail-toolbar">
      <div>
        <div class="label" style="width:130px">起订分规则名称</div>
        <div class="content">
          <el-input v-model="form.startPointName" :readonly="!needEdited"
                    :class="!needEdited ? '': 'detail-el-input'"></el-input>
        </div>
      </div>
      <div>
        <div class="label" style="width:90px">起订分数值</div>
        <div class="content">
          <el-input v-model="form.baseNumber" :readonly="!needEdited"
                    :class="!needEdited ? '' : 'detail-el-input'"></el-input>
        </div>
      </div>
      <div>
        <div class="label">是否生效</div>
        <div class="content">
          <el-switch class="switch" :active-value="1" :inactive-value="0"
                     active-text="是" inactive-text="否" v-model="form.status"
                     :readonly="!needEdited"></el-switch>
        </div>
      </div>
      <div>
        <div class="label">备注</div>
        <div class="content">
          <el-input v-model="form.remark" type="textarea"
                    :readonly="!needEdited"
                    :class="!needEdited ? '' : 'detail-el-input'"></el-input>
        </div>
      </div>
    </div>
    <div class="activity-btn-box">
      <div>商品信息</div>
    </div>
    <div class="toolbar-box activity-detail-toolbar-box">
      <div>
        <div class="label">商品名称</div>
        <div class="content">
          <el-input v-model="toolBar.itemName" placeholder="请输入商品名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">商品分类</div>
        <div class="content">
          <el-select clearable v-model="toolBar.categoryNo" placeholder="请选择商品分类">
            <el-option
                    v-for="item in condition.category"
                    :key="item.categoryNo"
                    :label="item.wholeCategoryName"
                    :value="item.categoryNo">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">商品规格</div>
        <div class="content">
          <el-select clearable v-model="toolBar.specDetail" placeholder="请选择商品规格">
            <el-option
                v-for="item in condition.spec"
                :key="item.specNo"
                :label="item.specName"
                :value="item.specNo">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">商品品牌</div>
        <div class="content">
          <el-select clearable v-model="toolBar.brandNo" placeholder="请选择商品品牌">
            <el-option
                    v-for="item in condition.brand"
                    :key="item.brandNo"
                    :label="item.brandName"
                    :value="item.brandNo">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="searchStartPoint">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="resetStartPoint">{{ $text.reset }}</el-button>
    </div>
    <div class="table-top-font">
      <div @click="tableFontClick">{{ tableDetailShow ? '收起' : '展开' }}<div :class="tableDetailShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></div></div>
    </div>
    <div class="table-main" v-show="tableDetailShow">
      <div class="table">
        <el-table
          :data="tableData"
          max-height="520"
          header-cell-class-name="table-header-item"
          v-loading="tableLoading"
        >
          <el-table-column
            prop="itemName"
            label="商品名称"
            width="300"
          >
          </el-table-column>
          <el-table-column
            prop="itemNo"
            label="商品编号"
            width="220"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="brandName"
              label="商品品牌"
              width="220"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="categoryName"
              label="商品分类"
              width="220"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="specDetail"
              label="商品规格"
              width="220"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="labelInfos"
            label="商品标签"
            width="220"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-for="item in scope.row.labelInfos">{{item.labelName}},</span>
            </template>
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
    <div class="btn-box">
      <el-button type="primary" size="small" v-if="needEdited" :loading='btnLoading' @click="btnLoading = true;$throttle(saveStartPointUpdate)">{{ $text.save }}</el-button>
      <el-button type="primary" size="small" plain @click="$router.back()">{{ $text.return }}</el-button>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
<style>
  .detail-toolbar .el-input .el-input__inner{
    border: none ;
    color: #000;
  }
  .detail-toolbar .el-textarea .el-textarea__inner{
    border: none ;
    color: #000;
  }
  .detail-toolbar .detail-el-input .el-input__inner{
    border: 1px solid #DCDFE6;
    color: #000;
  }
  .detail-toolbar .detail-el-input .el-textarea__inner{
    border: 1px solid #DCDFE6;
    color: #000;
  }
  .state-box .i-status div.success{
    margin-top: 5px;
  }
</style>