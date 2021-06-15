<template>
  <el-dialog
      title="新增分类"
      :visible.sync="dialogVisible"
      width="400px"
      destroy-on-close
      :before-close="handleClose">
      <div class="del-form">
        <el-form :model="form" :rules="rules" ref="form" label-width="80px">
          <el-form-item label="分类名称" prop="categoryName">
            <el-input maxlength="30" show-word-limit :value="form.categoryName" placeholder="请输入" @input="e=>form.categoryName=$validForbid(e)"></el-input>
          </el-form-item>
<!--          <el-form-item label="上级分类" prop="parentNo">-->
<!--            <el-select clearable v-model="form.parentNo.value" placeholder="一级/二级/三级">-->
<!--                <el-option-->
<!--                  v-for="item in form.parentNo.options"-->
<!--                  :key="item.value"-->
<!--                  :label="item.label"-->
<!--                  :value="item.value">-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--          </el-form-item>-->
          <el-form-item label="排序" prop="sort">
            <div class="flex-start">
              <el-input v-model="form.sort" @input="changeInput" class="el-input-fixed" placeholder="请输入"></el-input>
            </div>
               <span class="tips">(只能输入正整数)</span>
          </el-form-item>
            <!--<el-form-item label="是否生效" prop="delivery">-->
                <!--<el-switch class="switch" :active-value="1" :inactive-value="0" active-text="是" inactive-text="否" v-model="form.status"></el-switch>-->
            <!--</el-form-item>-->
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" placeholder="请输入" type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="btnLoading" @click="submitForm(form)">确定</el-button>
         <el-button @click="handleClose">取消</el-button>
      </div>
    </el-dialog>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>