<template>
  <div class="page-content">
      <h3 class="page-name">{{versionId ? "版本详情" : "新增版本"}}</h3>
      <div class="item-box">
        <div class="del-form" >
          <el-form :model="form" :rules="rules" ref="form" label-width="80px" >
            <div class="item-row">
              <el-form-item label="版本号" prop="editionNo">
                <el-input clearable v-model="form.editionNo" placeholder="请输入版本号"></el-input>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="更新类型" prop="updateType">
                <el-select clearable v-model="form.updateType" placeholder="请选择更新类型">
                    <el-option
                        v-for="(item,index) in toolBar.updateType.options"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="APP上架更新号" prop="updateNum">
                <el-input :disabled="form.updateType === 0" clearable v-model="form.updateNum" placeholder="请输入上架版本号"></el-input>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="更新内容" class="item-textarea">
                <el-input clearable type="textarea" resize="none" :rows="6" v-model="form.updateContent" placeholder="请输入版本号"></el-input>
              </el-form-item>
              <el-form-item label="更新启动图管理" class="img-load">
                <el-upload
                    :action="$uploadUrl"
                  :headers="token"
                  list-type="picture-card"
                  accept="image/jpeg,image/gif,image/png"
                  :fileList="startImgUrlShowList"
                  :limit="6"
                  :data="{ target: 'item' }"
                  :on-success="handleAvatarSuccess"
                  :on-preview="handlePictureCardPreview"
                  :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                    <div slot="tip" class="el-upload__tip">（图片大小为40*40px，最多上传1张图片）</div>
                    <div slot="file" slot-scope="{file}">
                      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                      <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                          <i class="el-icon-download"></i>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                  </el-upload>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
               </el-form-item>
            </div>
             <div class="item-row">
              <el-form-item label="是否强制更新">
                <el-radio v-model="form.forceUpdate" label="1">是</el-radio>
                <el-radio v-model="form.forceUpdate" label="0">否</el-radio>
              </el-form-item>
            </div>
          </el-form>
             <div class="item-row item-button">
                <el-button type="primary" v-if="!versionId" @click="addNewVersion(1,'form')">保存并上架</el-button>
                <el-button v-if="!versionId" @click="addNewVersion(0,'form')">仅保存</el-button>
                <el-button @click="back">{{ $text.cancel }}</el-button>
            </div>
        </div>
      </div>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>