<template>
  <div class="navbar">
    <hamburger v-if="false" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    <div class="placeholder" v-else></div>
    <div class="right-container">
      <div class="menu-container">
        <ul class="ul flex">
          <li
              class="li"
              :class="{'active':activeTabIndex===index}"
              v-for="(route,index) in validRoutes"
              :key="index"
              @click="handleNavTabSwitch(index)"
          >
            {{route.meta && route.meta.title || ''}}
          </li>
        </ul>
      </div>
      <div class="avatar-container">
        <el-dropdown class="avatar-item hover-effect" trigger="click">
          <div class="avatar-wrapper flex">
            <i class="user-avatar iconfont yonghu2"/>
            <span class="user-name">{{userName}}</span>
            <i class="el-icon-caret-bottom"/>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <p @click="logout">退出</p>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>