<template>
  <div class="del-form">
    <el-form :model="form" ref="form" label-width="80px">
      <el-form-item label="VIN码照片" prop="iconUrl" class="img-load">
        <el-upload
            :action="$uploadUrl"
            :headers="token"
            list-type="picture-card"
            accept="image/jpeg,image/gif,image/png"
            :limit="1"
            class="remove"
            :data="{ target: 'item' }"
            :fileList.sync="toolBar.fileList"
            :on-success="handleAvatarSuccess"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img
                class="el-upload-list__item-thumbnail"
                :src="file.url" alt=""
            >
            <span class="el-upload-list__item-actions">
              <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                  v-if="false"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" append-to-body>
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="VIN码" prop="name">
        <el-input v-model="form.vinCode" placeholder="请输入VIN码"></el-input>
      </el-form-item>
      <el-form-item label="品牌" prop="name">
        <el-input v-model="form.brand" placeholder="请输入品牌"></el-input>
      </el-form-item>
      <el-form-item label="车型" prop="name">
        <el-input v-model="form.model" placeholder="请输入车型"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>