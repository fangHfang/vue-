<template>
  <el-dialog
      title="新增起订分规则"
      :visible.sync="dialogVisible"
      width="490px"
      v-loading="tableLoading"
      destroy-on-close
      :before-close="handleClose">
      <div class="del-form">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
          <el-form-item label="规则名称" prop="startPointName">
            <el-input v-model="form.startPointName" placeholder="起订分规则"></el-input>
          </el-form-item>
           <el-form-item label="起订分数值" prop="baseNumber">
            <el-input class="score" v-model="form.baseNumber" placeholder="分数值" @input="changeInput"></el-input>
          </el-form-item>
          <el-form-item label="是否生效">
           <el-switch class="switch" :active-value="1" :inactive-value="0" active-text="是" inactive-text="否" v-model="form.status"></el-switch>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" placeholder="请输入备注" type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{ $text.cancel }}</el-button>
         <el-button :loading='btnLoading' type="primary" @click="btnLoading = true;$throttle(saveStartPoint)">{{ $text.save }}</el-button>
      </span>
    </el-dialog>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>