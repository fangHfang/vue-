<template>
 <div class="page-content">
      <h3 class="page-name">{{labelNo ? '编辑标签' : '新增标签'}}</h3>
      <el-form :model="form" :rules="rules" ref="form" label-width="90px">
      <div class="item-box">
        <div class="del-form">
            <div class="item-row">
              <el-form-item v-if="labelNo" label="标签类型" prop="activeType">
                <el-select clearable :disabled="true" v-model="form.activeType.value" placeholder="请选择">
                  <el-option
                    v-for="item in form.activeType.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-else label="标签类型" prop="activeType">
                <el-select clearable v-model="form.activeType.value" placeholder="请选择">
                  <el-option
                    v-for="item in form.activeType.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="标签名称" prop="labelName">
                <el-input v-model="form.labelName" placeholder="标签名称"></el-input>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="备注" class="item-row-notice">
                <el-input type="textarea" resize="none" :rows="3" v-model="form.content" placeholder="请填写备注"></el-input>
              </el-form-item>
            </div>
             <div class="item-row ">
              <el-form-item label="创建时间">
                <el-input class="item-row-establish" disabled v-model="form.created" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="创建人">
                <el-input class="item-row-establish" disabled v-model="form.createBy" placeholder=""></el-input>
              </el-form-item>
            </div>
             <div class="item-row item-button">
              <el-form-item>
                <el-button type="primary" @click="saveLabelData">{{ $text.save }}</el-button>
                <el-button @click="back">{{ $text.cancel }}</el-button>
              </el-form-item>
            </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>