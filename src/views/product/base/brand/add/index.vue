<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    width="600px"
    destroy-on-close
    :before-close="handleClose">
  <div class="border-content">
    <div class="del-form">
      <el-form :model="form" :rules="rules" ref="form" label-width="80px">
        <el-form-item label="品牌名称" prop="brandName">
          <el-input v-model="form.brandName" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="是否生效" prop="delivery">
          <el-switch class="switch" :active-value="1" :inactive-value="0" active-text="是" inactive-text="否" v-model="form.status"></el-switch>
        </el-form-item>
        <el-form-item label="图片" prop="remasks" class="img-load">
          <el-upload
              :action="$uploadUrl"
                  :headers="token"
                  list-type="picture-card"
                  accept="image/jpeg,image/gif,image/png"
                  :data="{ target: 'item' }"
                  :file-list="fileList"
                  :on-success="handleAvatarSuccess"
                  :limit="1"
                  :class="{disabled:fileList.length>0}"
          >
            <div slot="file" slot-scope="{file}">
              <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url" alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip">（图片大小为40*40px）最多一张</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" placeholder="请输入" resize="none" :rows="3" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>

    <span slot="footer" class="dialog-footer flex-end">
      <el-button type="primary" @click="handleAdd" :loading="btnLoading">{{ $text.save }}</el-button>
       <el-button @click="handleClose">{{ $text.cancel }}</el-button>
    </span>
  </el-dialog>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>
<style>
  .el-input-group__append{
    background: none !important;
    border: none !important;
  }

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

  .del-form .el-upload--picture-card, .del-form .el-upload-list--picture-card .el-upload-list__item{
    width: 50px;
    height: 50px;
    line-height: 60px;
  }
</style>
