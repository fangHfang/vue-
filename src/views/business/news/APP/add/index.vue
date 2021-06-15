<template>
  <div class="page">
    <div class="add-content-box">
      <div style="margin-bottom:30px">
        <div class="add-title">{{noticeNo ? '编辑APP消息模板' : '新增APP消息模板'}}</div>
      </div>
      <!-- 第一个 -->
      <div>
        <div class="add-label">APP消息标题</div>
        <div class="add-content">
          <el-input placeholder="请输入模板标题" v-model="toolBar.title"></el-input>
        </div>
      </div>
      <!-- 第二个 -->
      <div>
        <div class="add-label" style="margin-right:9px">推送消息内容</div>
        <div class="add-content" style="width: 100%">
          <el-input placeholder="请输入" v-model="toolBar.content"></el-input>
        </div>
      </div>
      <!-- 第三个 -->
      <div>
        <div class="add-label" style="margin-right:9px">推送时间</div>
        <div class="add-content" style="width: 100%">
               <el-date-picker
                 class="data"
                 type="datetime"
                 v-model="time"
                 placeholder="请选择时间">
               </el-date-picker>
        </div>
      </div>
      <!-- 第四个 -->
      <div style="position: relative;margin-bottom:70px">
        <div class="add-label" style="margin-right:9px">跳转页面</div>
        <div class="add-content" style="width: 100%">
          <el-radio-group v-model="radio" @change="(val)=>checkedRadio(val)">
            <el-radio v-for="(v,i) in actions" :key="i" :label="v.value">{{v.label}}</el-radio>
          </el-radio-group>
            <!-- <el-radio v-model="radio" :label="index" v-for="(item, index) in actions" :key="index">{{item.label}}</el-radio> -->
        </div>
        <div class="add-input">
          <el-input placeholder="填写配置链接" style="height:32px" v-model="toolBar.link"></el-input>
        </div>
      </div>
      <!-- 第五个 -->
      <div>
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
    <dialogProductList :dialogVisible.sync="productVisible.ProductList" @setSelectInfo="setSelectInfo"/>
    <dialogActivityClass :dialogVisible.sync="productVisible.ActivityClass" @setSelectInfo="setSelectInfo"/>
    <dialogProductGrouping :dialogVisible.sync="productVisible.ProductGrouping" @setSelectInfo="setSelectInfo"/>
    <dialogPackageProduct :dialogVisible.sync="productVisible.PackageProduct" @setSelectInfo="setSelectInfo"/>
    <dialogProductClass :dialogVisible.sync="productVisible.ProductClass" @setSelectInfo="setSelectInfo"/>
    <dialogProductBrand :dialogVisible.sync="productVisible.ProductBrand" @setSelectInfo="setSelectInfo"/>
    <dialogConfigActivity :dialogVisible.sync="productVisible.ConfigActivity" @setSelectInfo="setSelectInfo"/>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>