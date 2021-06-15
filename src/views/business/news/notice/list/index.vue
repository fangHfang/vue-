<template>
  <div class="page">
    <div class="toolbar-box">
      <div>
        <div class="label">公告消息标题</div>
        <div class="content">
          <el-input v-model="toolBar.title" placeholder="请输入短信标题"></el-input>
        </div>
      </div>
      <div>
        <div class="label">状态</div>
        <div class="content">
          <el-select clearable v-model="toolBar.status.value" :placeholder="$text.selectPlaceholder">
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
        <div class="label">创建人</div>
        <div class="content">
          <el-input v-model="toolBar.createBy" placeholder="请输入创建人"></el-input>
        </div>
      </div>
      <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
      <el-button type="primary" plain @click="clearToolBar" >{{ $text.reset }}</el-button>
    </div>
    <div class="table-main">
      <div class="actionbar">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="jumpAdd"
          v-if="permission.includes('ZBPCC01100301')"
          >
          {{ $text.newAdd }}
        </el-button>
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
            width="200"
          >
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status === 1 &&permission.includes('ZBPCC01100303')"
                type="text"
                size="small"
                @click="transferStatus(1,scope.row.noticeNo)"
              >
                关闭
              </el-button>

                <el-button
                v-if="scope.row.status === 0 &&permission.includes('ZBPCC01100304')"
                type="text"
                size="small"
                @click="transferStatus(0,scope.row.noticeNo)"
              >
                开启
              </el-button>

              <el-button
               v-if="permission.includes('ZBPCC01100302')"
                type="text"
                size="small"
                @click="edit(scope.row.noticeNo)"
              >
                修改
              </el-button>
               <el-button
                type="text"
                size="small"
                @click="configure(scope.row.pushPlatform,scope.row.noticeNo)"
              >
                配置适用门店
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
            label="公告消息标题"
            width="170"
          >
          </el-table-column>
          <el-table-column
            prop="noticeContent"
            label="公告消息内容"
            width="180"
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
                <i-status :type="['error', 'success'][scope.row.status]" :message="['关闭', '开启'][scope.row.status]" />
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="pushPlatform"
            label="推送平台"
            width="100"
          >
            <template slot-scope="scope">
                {{['总部pc', '经销商app','门店app'][scope.row.pushPlatform]}}
            </template>
          </el-table-column>
            <el-table-column
            prop="created"
            label="创建时间"
            width="220"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            prop="pushTime"
            label="推送时间"
            width="220"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="createBy"
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
      title="公告关联"
      :visible.sync="dialogVisible"
      width="1100px"
      :before-close="handleClose">
      <Form/>
    <div class="table-main">
      <div class="toolbar-box">
        <div style="width:30%" v-if="pushPlatform===2 || pushPlatform===1">
          <div class="label">经销商名称</div>
          <div class="content">
            <dealerSelect @change="dealerChange" ref="dealer"/>
          </div>
        </div>
        <div style="width:30%" v-if="pushPlatform===2">
          <div class="label">门店名称</div>
          <div class="content">
            <storeSelect @change="storeChange" ref="store"/>
          </div>
        </div>
        <div style="width:30%" v-if="pushPlatform===0">
          <div class="label">用户账号</div>
          <div class="content">
            <el-input clearable v-model="relationBar.accountNumber" placeholder="请输入用户账号"></el-input>
          </div>
        </div>
        <div style="width:30%" v-if="pushPlatform===0 || pushPlatform===1 ">
          <div class="label">手机号</div>
          <div class="content">
            <el-input clearable v-model="relationBar.phone" placeholder="请输入手机号"></el-input>
          </div>
        </div>
      <div style="width:30%">
          <div class="label">门店性质</div>
          <div class="content">
              <el-select clearable v-model="relationBar.level.value" placeholder="请选择门店性质">
                  <el-option
                          v-for="item in relationBar.level.options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
              </el-select>
          </div>
      </div>
        <el-button type="primary" @click="doSearchRelation">{{ $text.search }}</el-button>
        <el-button type="primary" @click="delStore">删除</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="openDialog()"
          >
          关联
        </el-button>
      </div>
        <!-- 公告关联 -->
       <div class="table">
        <el-table
          :data="headTableData"
          max-height="400"
          @selection-change="handleSelectionChange"
          header-cell-class-name="table-header-item"
        >
         <el-table-column
          type="selection">
          </el-table-column>
          <el-table-column
              v-if="pushPlatform===2 || pushPlatform===1"
              key="a"
                  prop="dealerNo"
                  label="内部经销商编号"
                  width="200"
          >
          </el-table-column>
          <el-table-column
              v-if="pushPlatform===2 || pushPlatform===1"
              key="b"
                  prop="dealerRefNo"
                  label="经销商编号"
                  width="120"
          >
          </el-table-column>
          <el-table-column
              v-if="pushPlatform===2 || pushPlatform===1"
              key="c"
                  prop="dealerName"
                  label="经销商名称"
                  width="150"
          >
          </el-table-column>
          <el-table-column
              v-if="pushPlatform===2"
              key="d"
                  prop="storeName"
                  label="门店名称"
                  width="200"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              v-if="pushPlatform===2"
              key="e"
                  prop="storeNo"
                  width="150"
                  label="内部门店号"
                  show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              v-if="pushPlatform===2"
              key="f"
                  prop="storeRefNo"
                  width="150"
                  label="门店编号"
                  show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
              v-if="pushPlatform===0"
              key="g"
              prop="accountNumber"
              label="用户账号"
              width="100"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              prop="name"
              v-if="pushPlatform===0"
              key="h"
              label="用户名称"
              width="140"
          >
          </el-table-column>
          <el-table-column
              prop="phone"
              v-if="pushPlatform===0 || pushPlatform===1"
              key="i"
              label="用户手机号"
              width="180"
              show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
              v-if="pushPlatform===0 || pushPlatform===1"
              key="j"
              prop="readStatus"
              label="状态"
              width="160"
              show-overflow-tooltip
          >
            <template slot-scope="scope">
              <i-status :type="['warning' ,'success'][scope.row.readStatus]" :message="['未读', '已读'][scope.row.readStatus]"/>
            </template>
          </el-table-column>
          <el-table-column
              v-if="pushPlatform===0 || pushPlatform===1"
              key="k"
              prop="created"
              label="创建时间"
              width="200"
          >
          </el-table-column>
            <el-table-column
                    prop="storeLevel"
                    label="门店性质"
                    width="200"
                    show-overflow-tooltip
            >
            </el-table-column>
          <el-table-column/>
        </el-table>

        <div class="pagination">
          <el-pagination
            background
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page="subpage.current"
            :page-sizes="subpage.sizes"
            :page-size="subpage.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="subpage.total"
          >
          </el-pagination>
          <el-button type="primary" size="small">{{ $text.paginationGo }}</el-button>
        </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
      </span>

      <el-dialog
        width="1000px"
        :title="title"
        :visible.sync="dialogConfig"
        append-to-body>
      <dialogForm :pushPlatform="pushPlatform" :noticeNo="noticeNo" :dialogConfig.sync="dialogConfig" @relation="relation" />
      </el-dialog>

    </el-dialog>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>