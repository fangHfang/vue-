<template>
  <frame-box>
    <div class="window-container flex-center">
      <div class="card-left">
         <navigationPreview :list.sync="form.details"/>
      </div>
      <div class="card-right">
        <p class="card-title">子导航配置</p>
        <div class="card-block-wrap">
          <div
            class="card-block"
          >
          <el-form
            :model="form"
            :rules="rules"
            ref="form"
            label-width="110px"
            class="window-form">
            <div class="del-form">
              <div class="item-box">
                <el-form-item label="子导航名称" prop="name">
                  <el-input clearable v-model="form.name" placeholder="请输入子导航名称" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="优先级" class="sepcical">
                  <el-input clearable v-model="form.priorityLevel" :disabled="true"></el-input>
                </el-form-item>
              </div>
              <div class="item-box">
                <el-form-item label="链接配置" class="sepcical">
                  <div
                    class="link-box"
                    v-for="(item,index) in form.details"
                    :key="index">
                    <div class="flex-start align-start">
                      <div class="sort-box">
                        <el-button @click="toUpSort(index)" :disabled="index === 0" type="primary" class="sort" icon="el-icon-caret-top" size="mini"></el-button>
                        <el-button @click="toDownSort(index)" :disabled="index === form.details.length-1" type="primary" class="sort" icon="el-icon-caret-bottom" size="mini"></el-button>
                      </div>
                      <div>
                        <el-upload
                          class="banner-uploader"
                          :action="$uploadUrl"
                          :headers="token"
                          :data="{ target: 'basic' }"
                          accept="image/jpeg,image/png"
                          :auto-upload="true"
                          :show-file-list="false"
                          :disabled="isLook"
                          :on-success="(response) => { onListPictureUploadSuccess(response, index) }"
                          >
                          <img v-if="item.imgUrl" :src="item.imgUrl" class="img">
                          <i v-else class="el-icon-plus uploader-icon"/>
                          <i v-if="item.imgUrl" class="el-icon-error" @click.stop.prevent="handleRemoveImage(item)"/>
                        </el-upload>
                      </div>
                      <div>
                        <el-form-item style="width:300px;margin-left:10px;">
                          <el-input clearable v-model="item.linkUrl" placeholder="配置链接" :disabled="isLook"></el-input>
                      </el-form-item>
                      <el-form-item style="width:300px;margin-left:10px;" :prop="'details.'+index+'.linkName'" :rules="rules.linkName">
                          <el-input clearable v-model="item.linkName" placeholder="输入导航名称，不可超过5个字符" :disabled="isLook"></el-input>
                      </el-form-item>
                      </div>
                      <div style="flex:1;margin-left:10px;">
                        <el-radio-group v-model="item.linkType" :disabled="isLook" @change="(val)=>checkedRadio(val,index)">
                          <el-radio v-for="(v,i) in actions" :key="index + '-' + i" :label="v.value" >{{v.label}}</el-radio>
                        </el-radio-group>
                      </div>
                    </div>
                    <em @click="removeLinkItem(index)" class="el-icon-remove-outline"></em>
                  </div>
                   <em @click="addLinkItem" class="el-icon-circle-plus-outline"></em>
                </el-form-item>
              </div>
              <el-form-item label="备注" prop="linkType">
                <el-input clearable v-model="form.description" placeholder="请输入备注"></el-input>
              </el-form-item>
              <div v-if="isLook" class="item-row" style="margin-top:20px;">
                <el-form-item label="创建人">
                    <el-input clearable :value="form.creatName" :disabled="true"></el-input>
                </el-form-item>
                  <el-form-item label="创建时间">
                  <el-input clearable :value="form.createDate" :disabled="true"></el-input>
                </el-form-item>
                  <el-form-item label="创建状态">
                  <el-input :value="form.status | formartStatus" :disabled="true"></el-input>
                </el-form-item>
              </div>
            </div>
          </el-form>
        </div>
      </div>

        <div class="fixed-btn-box">
          <div v-if="isLook" class="btn-box">
            <el-button type="primary" @click = "isLook = false">{{ $text.return }}</el-button>
            <el-button>{{ $text.preview }}</el-button>
          </div>
          <div v-else class="btn-box">
            <el-button type="primary" @click="saveNavigation(0)">{{ $text.save }}</el-button>
            <el-button @click="$router.back()">{{ $text.cancel }}</el-button>
            <el-button @click="reset">{{ $text.reset }}</el-button>
          </div>
        </div>
      </div>
      <dialogProductList :dialogVisible.sync="productVisible.ProductList" @setSelectInfo="setSelectInfo"/>
      <dialogActivityClass :dialogVisible.sync="productVisible.ActivityClass" @setSelectInfo="setSelectInfo"/>
      <dialogProductGrouping :dialogVisible.sync="productVisible.ProductGrouping" @setSelectInfo="setSelectInfo"/>
      <dialogPackageProduct :dialogVisible.sync="productVisible.PackageProduct" @setSelectInfo="setSelectInfo"/>
      <dialogProductClass :dialogVisible.sync="productVisible.ProductClass" @setSelectInfo="setSelectInfo"/>
      <dialogProductBrand :dialogVisible.sync="productVisible.ProductBrand" @setSelectInfo="setSelectInfo"/>
      <dialogConfigActivity :dialogVisible.sync="productVisible.ConfigActivity" @setSelectInfo="setSelectInfo"/>
    </div>
  </frame-box>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
