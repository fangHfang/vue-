<template>
  <!-- 上传组件 -->
   <div class="upload-box flex-start">
     <div class="border-box" v-for="(item,index) in fileList" :key="index" :style="`width:${size.width}px;height:${size.height}px`">
      <el-image
          :src="item.url"
          :preview-src-list="previewImgList"
        >
        </el-image>
      <i class="el-icon-error" @click="handleRemoveImage(index)"/>
    </div>
    <el-upload
        :action="$uploadUrl"
        :headers="token"
        class="uploader"
        v-if="fileList.length==0 && limit==1"
        :style="`width:${size.width}px;height:${size.height}px`"
        :limit="limit"
        accept="image/jpeg,image/png"
        :disabled="disabled"
        :file-list="fileList"
        :on-exceed="onExceed"
        list-type="picture-card"
        :data="{ target: 'item' }"
        :on-success="handleAvatarSuccess">
      <i class="el-icon-plus"></i>
      <div slot="file" >
      </div>
    </el-upload>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
