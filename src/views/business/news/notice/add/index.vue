<template>
  <div class="page">
    <div class="add-content-box">
      <div style="margin-bottom:30px">
        <div class="add-title">新增门户公告模板</div>
      </div>
      <!-- 第一个 -->
      <div>
        <div class="add-label">门户公告标题</div>
        <div class="add-content">
          <el-input placeholder="请输入模板标题" v-model="toolBar.title"></el-input>
        </div>
      </div>
      <!-- 第二个 -->
      <div>
        <div class="add-label" style="margin-right:9px">门户公告内容</div>
        <div class="add-content" style="width: 100%">
          <el-input placeholder="请输入" v-model="toolBar.noticeContent"></el-input>
        </div>
      </div>
      <!-- 第三个 -->
      <div>
        <div class="add-label" style="margin-right:9px">推送时间</div>
        <div class="add-content" style="width: 100%">
               <el-date-picker
                 class="data"
                 type="datetime"
                 v-model="toolBar.pushTime"
                 placeholder="选择时间">
               </el-date-picker>
               <div style="color:#666666">推送平台</div>
               <el-select clearable v-model="toolBar.pushPlatform.value" :placeholder="$text.selectPlaceholder" style="width:calc(19% - 2px)">
                  <el-option
                    v-for="item in toolBar.pushPlatform.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
               </el-select>
        </div>
      </div>
        <!-- 第五个 -->
        <div v-if="this.noticeNo">
            <div class="flex">
                <div class="add-label" style="margin-right:25px">创建人</div>
                <div class="add-content" style="width: 100%">
                    <el-input placeholder="请输入" v-model="toolBar.createBy"></el-input>
                </div>
            </div>
            <div class="flex">
                <div class="add-label" style="margin-right:9px">创建时间</div>
                <div class="add-content" style="width: 100%">
                    <el-date-picker
                            type="datetime"
                            v-model="toolBar.created"
                            placeholder="请选择时间">
                    </el-date-picker>
                </div>
            </div>
        </div>
    </div>
    <!-- 保存与取消 -->
    <div class="button-banner">

         <el-button type="primary" @click="save">{{$text.save}}</el-button>

         <el-button @click="returnList">{{$text.cancel}}</el-button>
    </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>