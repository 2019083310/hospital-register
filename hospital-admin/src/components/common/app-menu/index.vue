<template>
  <div class="app-menu">
    <h2 class="logo">预约挂号管理中心</h2>
    <el-menu
      :default-active="defaultActive"
      text-color="#eee"
      background-color="#001529"
      @open="handleMenuOpen"
      @close="handleMenuClose"
    >
      <template v-for="(menu, index) in menuList" :key="menu.title">
        <template v-if="menu.children">
          <el-sub-menu :index="index + ''">
            <template #title>
              <span class="sub-title">{{ menu.title }}</span>
            </template>
            <template v-for="submenu in menu.children" :key="submenu.title">
              <el-menu-item @click="handleMenuItemClick(submenu)">
                {{ submenu.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item @click="handleMenuItemClick(menu)">{{ menu.title }}</el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import menuList from "@/assets/data/menu.json";

const router = useRouter();

// ?响应式变量
const defaultActive = ref("1");

// *处理菜单栏sub-item-menu的收缩
const handleMenuOpen = (key, keyPath) => {
  // defaultActive.value = key + "";
  console.log(key, keyPath);
};

const handleMenuClose = (key, keyPath) => {
  console.log(key, keyPath);
};

// *处理菜单栏的item的点击
const handleMenuItemClick = (v) => {
  router.push(v.path);
};
</script>

<style lang="less" scoped>
.app-menu {
  width: 260px;
  height: 100vh;

  background-color: #001529;

  .logo {
    line-height: 50px;

    color: #fff;
    font-size: 24px;
    font-weight: 400;
    text-align: center;
  }
}
</style>
