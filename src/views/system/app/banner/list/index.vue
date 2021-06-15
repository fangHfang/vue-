<template>
  <div class="page">
    <div class="toolbar-box set-list-toolbar">
      <div>
        <div class="label">横幅名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.name" placeholder="横幅名称"></el-input>
        </div>
      </div>
      <div>
        <div class="label">状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.status.value" placeholder="请选择">
            <el-option
                v-for="item in toolBar.status.options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" @click="searchDataPage">{{ $text.search }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button type="primary" icon="el-icon-plus" @click="dialogaddVisible = true" v-if="permission.includes('ZBPCA01050501')">{{ $text.newAdd }}</el-button>
      </div>
      <div class="table">
        <el-table
            v-loading="tableLoading"
            :data="tableData"
            header-cell-class-name="table-header-item"
        >
          <el-table-column
              type="selection"
              width="60">
          </el-table-column>
          <el-table-column
              fixed="left"
              label="操作"
              width="200"
            >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                v-if="permission.includes('ZBPCA01050503')"
                :style="{color:(scope.row.status===0) ? '' : '#CCCCCC'}"
                @click.stop="(scope.row.status===0) ? edit(scope.row.name,scope.row.pictureNo) : ''"
              >
                {{ $text.edit }}
              </el-button>
              <el-button
                v-if="scope.row.status &&permission.includes('ZBPCA01050505')"
                type="text"
                size="small"
                @click="disable(scope.row.name,scope.row.pictureNo)"
              >
                下架
              </el-button>
              <el-button
                  v-if="(!scope.row.status) &&permission.includes('ZBPCA01050504')"
                type="text"
                size="small"
                @click="enable(scope.row.name,scope.row.pictureNo)"

              >
                上架
              </el-button>
              <el-button
                type="text"
                  v-if="permission.includes('ZBPCA01050502')"
                size="small"
                @click="toStore(scope.row)"
              >
                配置门店权限
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="priorityLevel"
            label="优先级"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column
              prop="name"
              label="横幅名称"
              width="200"
          >
            <template slot-scope="scope">
              <div>
                 <el-button
                   v-if="permission.includes('ZBPCA01050503')"
                type="text"
                size="small" @click="editName(scope.row)">{{scope.row.name}}</el-button>
                 <el-button
                 v-else
                type="text"
                size="small">{{scope.row.name}}</el-button>
              </div>
            </template>
          </el-table-column>
          <el-table-column
              prop="pictureCount"
              label="横幅数量"
              width="150">
          </el-table-column>
          <el-table-column
              prop="createBy"
              label="创建人"
              width="200"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
              prop="created"
              label="创建时间"
              width="200"
              show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="110"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['warning', 'success'][scope.row.status]" :message="['下架', '上架'][scope.row.status]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
              prop="description"
              label="备注"
              min-width="200"
              show-overflow-tooltip>
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

   <!-- 新增弹窗 -->
    <el-dialog
      :title="display?'新增横幅':'编辑横幅'"
      :visible.sync="dialogaddVisible"
      width="30%"
      :before-close="addHandleClose">
      <el-form :model="form" :rules="rules" ref="form" label-width="80px">
        <div class="del-form">
            <el-form-item label="横幅名称" prop="name">
              <el-input clearable v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="优先级" prop="priorityLevel">
              <el-input clearable v-model.number="form.priorityLevel"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button v-if="display" type="primary" @click="submitForm()">立即创建</el-button>
              <el-button v-else type="primary" @click="updateForm()">立即修改</el-button>
              <el-button @click="dialogaddVisible=false">取消</el-button>
            </el-form-item>
        </div>
      </el-form>
    </el-dialog>

  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
<style>
  .el-message-box__title > span {
    font-size: 16px;
    font-weight: 600;
  }

  .dialog-choose-box .dialog-set-list-toolbar > div {
    width: 285px;
  }
</style>