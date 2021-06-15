<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">商品名称</div>
        <div class="content">
          <el-input v-model="toolBar.name" placeholder="请输入短信标题"></el-input>
        </div>
      </div>
      <div>
        <div class="label">状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.spec.value" :placeholder="$text.selectPlaceholder">
            <el-option
              v-for="item in toolBar.spec.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div class="label">创建人</div>
        <div class="content">
          <el-input v-model="toolBar.brand" placeholder="请输入创建人"></el-input>
        </div>
      </div>
      <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="resetTableData">{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="jumpAdd"
          v-if="permission.includes('ZBPCC01100101')"
          >
          {{ $text.newAdd }}
        </el-button>
        <el-button type="primary" v-if="permission.includes('ZBPCC01100104')" >开启</el-button>
        <el-button type="primary" v-if="permission.includes('ZBPCC01100103')">关闭</el-button>
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
            fixed="left"
            label="操作"
            width="140"
          >
            <template>
              <el-button
                type="text"
                size="small"
                 v-if="permission.includes('ZBPCC01100103')"
              >
                关闭
              </el-button>
              <el-button
                type="text"
                size="small"
                 v-if="permission.includes('ZBPCC01100102')"
              >
                修改
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            type="index"
            label="序号"
            width="60"
          >
          </el-table-column>
          <el-table-column
            prop="title"
            label="短信模板标题"
            width="170"
          >
          </el-table-column>
          <el-table-column
            prop="content"
            label="短信模板内容"
            width="220"
          >
            <template slot-scope="scope">
              <div class="my-note">{{ scope.row.content }}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="time"
            label="创建时间"
            width="220"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="100"
          >
            <template slot-scope="scope">
              <div>
                <i-status :type="['error', 'success', 'warning'][scope.row.state]" :message="['已拒绝', '待上架', '已下架'][scope.row.state]" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="senders"
            label="已发送人数"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="founder"
              label="创建人"
              width="100"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose">
      <Form/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">保存</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>