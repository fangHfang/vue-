<template>
  <el-dialog
      title="新增/编辑橱窗活动"
      :visible.sync="dialogVisible"
      width="600px"
      destroy-on-close
      :before-close="handleClose">
      <div class="del-form">
        <el-form :model="form" :rules="rules" ref="form" label-width="80px">
            <el-form-item label="橱窗图片" prop="activeListImg" class="upload-wrap ">
              <upload :fileList.sync="form.activeListImg"/>
              <span class="font-tips">（图片大小为520*520px）</span>
           </el-form-item>
            <el-form-item label="活动类型" prop="activeType">
                <el-radio v-model="form.activeType" label="0">配置活动</el-radio>
                <el-radio v-model="form.activeType" label="1">活动类型</el-radio>
                <el-radio v-model="form.activeType" label="2">商品分组</el-radio>
                <el-radio v-model="form.activeType" label="3">套餐商品</el-radio>
                <el-radio v-model="form.activeType" label="4">商品分类</el-radio>
                <el-radio v-model="form.activeType" label="5">商品品牌</el-radio>
                <el-radio v-model="form.activeType" label="6">单独商品</el-radio>
                <el-radio v-model="form.activeType" label="7">网页链接</el-radio>
          </el-form-item>
           <el-form-item label="填写链接" prop="name">
            <el-input v-model="form.name" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
         <el-button @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>