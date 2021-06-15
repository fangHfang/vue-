<template>
  <div class="page">
    <div style="padding: 15px 0 0 15px;font-weight: 500;color: #333;">活动分类详情</div>
    <div style="padding: 15px 0 0 15px;font-weight: 500">基础信息</div>
    <div class="toolbar-box activity-toolbar-box detail-toolbar">
      <div>
        <div class="label">分类名称</div>
        <div class="content">
          <el-input v-model="form.categoryName" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">分类类型</div>
        <div class="content">
          <el-input v-model="['秒杀活动', '限时抢购活动', '商品组合活动'][form.categoryType]" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">是否生效</div>
        <div class="content">
          <el-input v-model="['否', '是'][form.status]" readonly></el-input>
        </div>
      </div>
      <div>
        <div class="label">备注</div>
        <div class="content">
          <el-input v-model="form.remark" readonly onmouseover="this.title=this.value" class="remark"></el-input>
        </div>
      </div>
      <div>
        <div class="label">活动图片</div>
        <div class="content" v-if="form.iconUrl">
          <div class="content-img">
            <img :src="form.iconUrl" alt="活动图片" @click="dialogVisible = true" />
          </div>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="form.iconUrl" alt="活动图片">
          </el-dialog>
        </div>
        <div v-else class='content'>
          未上传图片
        </div>
      </div>
    </div>
    <div class="activity-btn-box">
      <div>活动信息</div>
    </div>
    <div class="toolbar-box activity-detail-toolbar-box">
      <div>
        <div class="label">活动名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.promotionName" placeholder="请输入活动名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">活动规则名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.promotionRule" placeholder="请输入活动规则名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">活动状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.promotionStatus.value" placeholder="请选择活动状态">
            <el-option
                v-for="item in toolBar.promotionStatus.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="listSearchPromotionByPage">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="resetPromotionSearchCondition">{{ $text.reset }}</el-button>
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
            prop="index"
            label="序号"
            width="80"
          >
          </el-table-column>
          <el-table-column
            prop="promotionRule"
            label="活动规则名称"
            width="160"
          >
          </el-table-column>
          <el-table-column
            prop="promotionName"
            label="活动名称"
            width="140"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="startTime"
              label="活动开始时间"
              width="200"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="endTime"
              label="活动结束时间"
              width="200"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="created"
              label="创建时间"
              width="220"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="promotionStatus"
              label="活动状态"
              width="120"
              show-overflow-tooltip
          >
            <template slot-scope="scope">
              <i-status :type="['error', 'success','warning', 'warning'][scope.row.promotionStatus]" :message="['未开始', '进行中','已结束', '已终止'][scope.row.promotionStatus]"/>
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
  .state-box .i-status div.success{
    margin-top: 5px;
  }
</style>