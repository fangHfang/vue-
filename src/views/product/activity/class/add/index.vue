<template>
  <div class="del-form">
    <el-form :model="form" ref="form" label-width="80px">
      <el-form-item label="分类名称" prop="name">
        <el-input maxlength="30" show-word-limit clearable :value="form.categoryName" placeholder="请输入分类名称" @input="e=>form.categoryName=$validForbid(e)"></el-input>
      </el-form-item>
      <el-form-item label="分类类型">
        <el-select clearable v-model="form.categoryType" :placeholder="$text.selectPlaceholder" :disabled="categoryNo!==''">
          <el-option
              v-for="item in toolBar.categoryType.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否启用" prop="status">
        <el-switch class="switch" :active-value="1" :inactive-value="0" active-text="是" inactive-text="否" v-model="form.status"></el-switch>
      </el-form-item>
      <el-form-item label="分类图片" prop="iconUrl" class="img-load">
        <el-upload
            ref="el-upload"
            :action="$uploadUrl"
            :headers="token"
            list-type="picture-card"
            accept="image/jpeg,image/png"
            :limit="1"
            :data="{ target: 'item' }"
            :file-list.sync="toolBar.fileList"
            :on-success="handleAvatarSuccess"
            :class="toolBar.fileList.length>0?'disabled':''"
           >
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">（图片大小为40*40px）</div>
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
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" append-to-body	>
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="备注" prop="remark" class="remarks">
        <el-input type="textarea" placeholder="最多输入50个字" maxlength="50" show-word-limit resize="none" :rows="3" v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
<style>
  /* switch按钮样式 */
  .switch .el-switch__label {
    position: absolute;
    display: none;
    color: #fff !important;
  }
  /*打开时文字位置设置*/
  .switch .el-switch__label--right {
    z-index: 1;
  }
  /* 调整打开时文字的显示位子 */
  .switch .el-switch__label--right span{
    margin-left: 6px;
  }
  /*关闭时文字位置设置*/
  .switch .el-switch__label--left {
    z-index: 1;
  }
  /* 调整关闭时文字的显示位子 */
  .switch .el-switch__label--left span{
    margin-left: 20px;
  }
  /*显示文字*/
  .switch .el-switch__label.is-active {
    display: block;
  }
  /* 调整按钮的宽度 */
  .switch.el-switch .el-switch__core,
  .el-switch .el-switch__label {
    margin: 0;
  }
  .remarks .el-textarea__inner{
    color: #000;
  }
/* 可能会作用全局 */
 /*.el-select-dropdown{*/
    /*left: 860px !important;*/
  /*}*/

  .activity-class-box .el-dialog__body{
    padding: 50px;
  }
</style>