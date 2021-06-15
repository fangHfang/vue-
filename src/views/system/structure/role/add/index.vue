<template>
<div class="role-add">
  <div class="role-add-list">
    <div class="input-cont">
      <span class="role-font">角色名称</span>
      <div class="role-input">
        <el-input clearable v-model="name"></el-input>
      </div>
    </div>
    <div class="input-cont">
      <span class="role-font">角色属性</span>
      <div class="role-input">
        <el-select clearable v-model="toolBar.tag.value" :placeholder="$text.selectPlaceholder" @change="changeAppType">
          <el-option
            v-for="item in toolBar.tag.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="input-cont input-cont-three">
      <span class="role-font">备注</span>
      <div class="role-input">
        <el-input clearable v-model="remark" placeholder="备注"></el-input>
      </div>
    </div>
  </div>
    <div class="role-add-center" v-if="toolBar.tag.value===2">权限配置（门店）</div>
    <div class="role-add-center" v-else>权限配置（总部）</div>
    <div class="role-add-bottom" style="overflow:auto">
      <el-tree
        :data="data"
        show-checkbox
        default-expand-all
        :check-strictly="true"
        node-key="resourceNo"
        ref="tree"
        style="min-width:200px"
        v-loading="loading"
        highlight-current
        @check="getCurrentNode"
        :props="defaultProps">
      </el-tree>
    </div>
</div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>