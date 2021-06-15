<template>
  <div class="page-content">
      <el-form :model="form" ref="form" >
      <div class="item-box">
        <div class="del-form">
            <div class="item-row">
              <el-form-item label="门店名称">
                <el-input v-model="formData.storeName" disabled placeholder="门店名称"></el-input>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="门店编号">
                <el-input v-model="formData.storeNo" disabled placeholder="门店编号"></el-input>
              </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="当前积分">
                <el-input v-model="formData.availableAmount" disabled placeholder="当前积分"></el-input>
              </el-form-item>
            </div>
             <div class="item-row">
              <el-form-item class="radio">
                <el-radio v-model="form.radio" label="1">增加</el-radio>
                <el-radio v-model="form.radio" label="0">减少</el-radio>
              </el-form-item>
            </div>
             <div class="item-row">
              <el-form-item class="radio">
                <el-input v-model="form.point" placeholder="请输入"></el-input>
                <div class="integral">积分</div>
              </el-form-item>
            </div>
            <div class="item-row">
                <el-form-item label="外部流水号">
                    <el-input v-model="form.refNo" disabled placeholder="外部流水号"></el-input>
                </el-form-item>
            </div>
            <div class="item-row">
              <el-form-item label="备注" class="textarea">
                <el-input type="textarea" resize="none" :rows="3" v-model="form.remark" ></el-input>
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