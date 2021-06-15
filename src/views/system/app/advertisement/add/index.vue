<template>
  <frame-box>
    <div class="banner-container flex-center">
      <div class="card-left">
        <advPreview :list.sync="bannerForm"/>
      </div>
      <div class="card-right">
        <p class="card-title">广告位设置</p>
        <div class="card-block-wrap">
          <el-form
            :rules="bannerRules"
            ref="bannerForm"
            label-width="100px"
            label-position="right"
            class="banner-form"
          >
            <el-form-item label="广告位名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入横幅图名称" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="弹出规则" class="sepcical">
              <el-radio-group v-model="form.popRule" :disabled="isLook">
                <el-radio :label="0">每次打开弹出</el-radio>
                <el-radio :label="1">初次打开弹出</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="优先级" class="sepcical">
              <el-input v-model="form.priorityLevel" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="弹窗时间" class="sepcical">
              <el-date-picker
                      style="max-width: 400px;"
                      v-model="form.dataRange"
                      type="datetimerange"
                      range-separator="~"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :default-time="['00:00:00', '23:59:59']"
              >
              </el-date-picker>
            </el-form-item>
            <div
              class="card-block"
              v-for="(item,index) in bannerForm"
              :key="index"
            >
              <el-form-item label="广告关联" prop="linkType">
                <el-radio-group v-model="item.linkType" :disabled="isLook" @change="(val)=>checkedRadio(val,index)">
                  <el-radio v-for="(v,i) in actions" :key="index + '-' + i" :label="v.value" >{{v.label}}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="">
                <div class="upload-wrap flex-center">
                  <div class="sort-box">
                    <el-button @click="toUpSort(index)" :disabled="index === 0" type="primary" class="sort" icon="el-icon-caret-top" size="mini"></el-button>
                    <el-button @click="toDownSort(index)" :disabled="index === bannerForm.length-1" type="primary" class="sort" icon="el-icon-caret-bottom" size="mini"></el-button>
                  </div>
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
                  <div class="banner-link">
                    <el-input v-model="item.linkUrl" :disabled="isLook" placeholder="配置链接"></el-input>
                    <p>支持扩展名：.jpg .png，图片尺寸为690*500px</p>
                  </div>
                </div>
              </el-form-item>
              <el-tooltip v-if="bannerForm.length > 1 && !isLook" effect="dark" content="移除该广告位" placement="top">
                <div class="remove-btn">
                  <i class="el-icon-remove-outline icon" @click="removeItem(index)"></i>
                </div>
              </el-tooltip>
            </div>
            <el-form-item label="备注" prop="linkType">
              <el-input v-model="form.description" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-form>
          <div class="form-plus" v-if="!isLook">
            <el-tooltip effect="dark" content="新增广告位" placement="top">
              <i class="el-icon-circle-plus-outline icon" @click="addItem"></i>
            </el-tooltip>
          </div>
        </div>

        <div class="fixed-btn-box" v-if="!isLook">
          <div class="btn-box">
            <el-button type="primary" @click="saveAdvertisement">{{ $text.save }}</el-button>
            <el-button @click="$router.back()">{{ $text.cancel }}</el-button>
            <el-button @click="reset">{{ $text.reset }}</el-button>
          </div>
        </div>

        <div class="fixed-btn-box" v-if="isLook">
          <div class="toolbar-box fixed-toolbar">
            <div>
              <div class="label">创建时间</div>
              <div class="content">
                <el-input v-model="form.createDate" disabled></el-input>
              </div>
            </div>
            <div>
              <div class="label">创建人</div>
              <div class="content">
                <el-input v-model="form.creatName" disabled></el-input>
              </div>
            </div>
            <div>
              <div class="label">状态</div>
              <div class="content">
                <el-input v-model="form.state" disabled></el-input>
              </div>
            </div>
          </div>
          <div class="btn-box">
            <el-button type="primary" @click = "isLook = false">{{ $text.cancel }}</el-button>
            <el-button>预览效果</el-button>
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
