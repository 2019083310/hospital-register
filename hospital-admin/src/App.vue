<template>
  <div class="app-wrap">
    <app-menu></app-menu>
    <div class="content-wrap">
      <app-header></app-header>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppMenu from "@/components/common/app-menu/index.vue";
import AppHeader from "@/components/common/app-header/index.vue";
</script>

<style lang="less" scoped>
.app-wrap {
  display: flex;
  align-items: flex-start;

  width: 100vw;
  height: 100vh;

  .content-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100vh;

    background-color: #f5f5f5;

    .content {
      flex: 1;
      padding: 20px;
    }
  }
}
</style>
