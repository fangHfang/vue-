<template>
  <div class="page">
    <!-- 门店 -->
   <div class="toolbar-box" v-if="pushPlatform===2">
    <div>
     <div class="label">经销商名称</div>
     <div class="content">
      <dealerSelect @change="dealerChange" ref="dealer"/>
     </div>
    </div>
    <div>
     <div class="label">门店名称</div>
     <div class="content">
      <storeSelect @change="storeChange" ref="store"/>
     </div>
    </div>
    <div style="width:30%">
     <div class="label">门店性质</div>
     <div class="content">
      <el-select clearable v-model="toolBar.level.value" placeholder="请选择门店性质">
       <el-option
               v-for="item in toolBar.level.options"
               :key="item.value"
               :label="item.label"
               :value="item.value">
       </el-option>
      </el-select>
     </div>
    </div>
    <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
   </div>
   <div class="toolbar-box" v-if="pushPlatform===0">
    <div style="width:35%">
     <div class="label">用户名称</div>
     <div class="content">
      <el-input clearable v-model="toolBar.userName" placeholder="请输入用户名称"></el-input>
     </div>
    </div>
    <div style="width:35%">
     <div class="label">手机号</div>
     <div class="content">
      <el-input clearable v-model="toolBar.phone" placeholder="请输入手机号"></el-input>
     </div>
    </div>
    <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
   </div>
   <div class="toolbar-box" v-if="pushPlatform===1">
    <div style="width:35%">
     <div class="label">经销商名称</div>
     <div class="content">
      <el-input clearable v-model="toolBar.dealerName" placeholder="请输入经销商名称"></el-input>
     </div>
    </div>
    <div style="width:35%">
     <div class="label">经销商编号</div>
     <div class="content">
      <el-input clearable v-model="toolBar.dealerNo" placeholder="请输入经销商编号"></el-input>
     </div>
    </div>
    <el-button type="primary" @click="searchData">{{ $text.search }}</el-button>
   </div>
    <div class="table-main">
       <div class="table" v-if="pushPlatform === 0" >
        <el-table
          :data="headTableData"
          ref="multipleTable"
          max-height="400"
          key="user"
          v-loading="tableLoading"
          header-cell-class-name="table-header-item"
        >
         <el-table-column
          type="selection">
          </el-table-column>
          <el-table-column
            prop="name"
            label="用户名称"
            width="140"
          >
          </el-table-column>
          <el-table-column
            prop="roleNames"
            label="用户角色"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="accountNumber"
            label="用户账号"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="用户手机号"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="remarks"
            label="备注"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="created"
            label="创建时间"
            width="200"
          >
          </el-table-column>
          <el-table-column>
          </el-table-column>
        </el-table>
        </div>

       <!-- 经销商app -->
       <div class="table" v-if="pushPlatform === 1" >
        <el-table
          :data="headTableData"
          ref="multipleTable"
          max-height="400"
          key="dealer"
          v-loading="tableLoading"
          header-cell-class-name="table-header-item"
        >
         <el-table-column
          type="selection">
          </el-table-column>
          <el-table-column
            prop="name"
            label="经销商名称"
            width="140"
          >
          </el-table-column>

          <el-table-column
            prop="contact"
            label="联系人"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="contactPhone"
            label="联系人手机号"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="created"
            label="创建时间"
            width="200"
          >
          </el-table-column>
          <el-table-column>
          </el-table-column>
        </el-table>
        </div>

        <!-- 门店app -->
       <div class="table" v-if="pushPlatform === 2" >
        <el-table
          :data="headTableData"
          ref="multipleTable"
          max-height="400"
          key="store"
          v-loading="tableLoading"
          header-cell-class-name="table-header-item"
        >
         <el-table-column
          type="selection">
          </el-table-column>
         <el-table-column
                 prop="dealerNo"
                 label="内部经销商编号"
                 width="200"
         >
         </el-table-column>
         <el-table-column
                 prop="dealerRefNo"
                 label="经销商编号"
                 width="100"
         >
         </el-table-column>
         <el-table-column
                 prop="dealerName"
                 label="经销商名称"
                 width="150"
         >
         </el-table-column>
         <el-table-column
                 prop="name"
                 label="门店名称"
                 width="200"
                 show-overflow-tooltip
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
                 prop="level"
                 label="门店性质"
                 width="200"
                 show-overflow-tooltip
         >
         </el-table-column>
        </el-table>
        </div>

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

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveRelation()">保存</el-button>
        <el-button @click="handleClose()">取消</el-button>
      </span>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>