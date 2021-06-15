<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- or name="fade" -->
      <keep-alive>
        <router-view v-if="this.$route.meta.keepAlive !== 'no'" :key="key" />
        <router-view v-else :key="key + new Date().getTime()" />
      </keep-alive>
    </transition>
  </section>
</template>

<script src="./index.js"></script>
<style lang="scss" scoped>
  @import "./index";
</style>