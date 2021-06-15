<template>
  <el-dialog
          title="库存调整"
          :visible.sync="dialogVisible"
          width="412px"
          destroy-on-close
          append-to-body
          :before-close="handleClose">
    <div class="border-content">
      <div class="toolbar-box">
        <div>
          <div class="content">
            <el-radio v-model="toolBar.redio" label="1">增加&nbsp;&nbsp;
              <el-input type="number" v-model="toolBar.addNum" placeholder="" min="0" oninput="value=value.replace(/[^0-9]/g,'')"></el-input>
            </el-radio>
          </div>
        </div>
        <div>
          <div class="content">
            <el-radio v-model="toolBar.redio" label="0">减少&nbsp;&nbsp;
              <el-input type="number" v-model="toolBar.reduceNum" placeholder="" min="0" oninput="value=value.replace(/[^0-9]/g,'')"></el-input>
            </el-radio>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer flex-center">
      <el-button type="primary" @click="save">生效</el-button>
      <el-button @click="handleClose">{{ $text.cancel }}</el-button>
    </span>
  </el-dialog>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>