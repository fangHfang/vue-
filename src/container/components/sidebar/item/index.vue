<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="hasOneShowingChild(item,item.children) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <div v-if="onlyOneChild.meta" @click="routerToPath(onlyOneChild)">
        <el-menu-item :index="onlyOneChild.path" :class="{'submenu-title-noDropdown':!isNest}">
          <i class="iconfont" :class='onlyOneChild.meta.icon||(item.meta&&item.meta.icon)'/>
          <span slot='title'>{{onlyOneChild.meta.title}}</span>
        </el-menu-item>
      </div>
    </template>

    <el-submenu v-else ref="subMenu" :index="item.path" popper-append-to-body>
      <template slot="title" v-if="item.meta">
        <i class="iconfont" :class='item.meta && item.meta.icon'/>
        <span slot='title'>{{item.meta.title}}</span>
      </template>
      <item
          v-for="(child,index) in item.children"
          :key="index"
          :is-nest="true"
          :item="child"
          :base-path="child.path"
          class="nest-menu"
      />
    </el-submenu>
  </div>
</template>
<script src="./index.js"></script>