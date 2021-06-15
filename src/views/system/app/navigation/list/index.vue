<template>
  <div class="page">
    <div class="toolbar-box set-list-toolbar">
      <div>
        <div class="label">子导航名称</div>
        <div class="content">
          <el-input clearable v-model="toolBar.name" placeholder="请输入子导航名称"></el-input>
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
        <el-button type="primary" icon="el-icon-plus" @click="dialogaddVisible = true" v-if="permission.includes('ZBPCA01050201')">{{ $text.newAdd }}</el-button>
        <!--<el-button type="primary" @click="deleteNavigation">{{ $text.del }}</el-button>-->
      </div>
      <div class="table">
        <el-table
            :data="tableData"
            header-cell-class-name="table-header-item"
            v-loading="tableLoading"
            @selection-change="handleSelectionChange"
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
                v-if="permission.includes('ZBPCA01050203')"
                :style="{color:(scope.row.status===0) ? '' : '#CCCCCC'}"
                @click.stop="(scope.row.status===0) ? editToNavigation(scope.row.pictureNo,scope.row.name) : ''"
              >
               {{ $text.edit }}
              </el-button>
              <el-button
                v-if="scope.row.status == 0 &&permission.includes('ZBPCA01050204')"
                type="text"
                size="small"
                 @click="enableStateNavigation(scope.row.pictureNo,scope.row.name)"
              >
                {{ $text.upShelf }}
              </el-button>
              <el-button
                v-if="scope.row.status == 1 &&permission.includes('ZBPCA01050205')"
                type="text"
                size="small"
                 @click="disableStateNavigation(scope.row.pictureNo,scope.row.name)"
              >
                {{ $text.downShelf }}
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="toStore(scope.row)"
                v-if="permission.includes('ZBPCA01050202')"
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
              label="子导航名称"
              show-overflow-tooltip
              min-width="200">
            <template slot-scope="scope">
              <div>
                <div v-if="permission.includes('ZBPCA01050203')" @click="editModify(scope.row)" style="color:#ED6D00;cursor: pointer">{{ scope.row.name }}</div>
               <div v-else style="color:#ED6D00">{{ scope.row.name }}</div>
              </div>
            </template>
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
          :title="display? '新增子导航':'修改子导航'"
          :visible.sync="dialogaddVisible"
          width="30%"
          :before-close="addHandleClose">
          <el-form :model="form" :rules="rules" ref="form" label-width="100px">
            <div class="del-form">
                <el-form-item label="名称" prop="name">
                  <el-input clearable v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="优先级" prop="priorityLevel">
                  <el-input clearable v-model.number="form.priorityLevel"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" v-if="display" @click="submitForm('form')">立即创建</el-button>
                  <el-button type="primary" v-else @click="updateForm('form')">立即修改</el-button>
                  <el-button @click="addHandleClose">取消</el-button>
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