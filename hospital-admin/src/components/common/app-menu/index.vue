<template>
  <div class="app-menu">
    <div class="menu-logo omit">预约挂号管理中心</div>
    <el-menu
      :default-active="defaultActive"
      active-text-color="#eee"
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
            <template v-for="(submenu, i) in menu.children" :key="submenu.title">
              <el-menu-item
                @click="handleMenuItemClick(submenu)"
                :index="index + '-' + i"
              >
                {{ submenu.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item @click="handleMenuItemClick(menu)" :index="index + ''">{{
            menu.title
          }}</el-menu-item>
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
  flex-basis: 220px;
  min-width: 220px;
  height: 100vh;

  color: #b7bdc3;
  background-color: #001529;

  .menu-logo {
    width: 100%;
    line-height: 50px;

    color: #fff;
    font-size: 20px;
    font-weight: 400;
    text-align: center;

    box-sizing: border-box;
  }

  .el-menu.el-menu--vertical {
    border: none;
    .el-sub-menu .el-menu--inline .el-menu-item {
      color: #b7bdc3;
      background-color: rgb(12, 33, 53);
      &.is-active {
        color: #fff;
        background-color: #0a60bd;
      }
    }
    .el-sub-menu :deep(.el-sub-menu__title) {
      .sub-title {
        color: #b7bdc3;
      }

      color: #fff;
    }
    .el-menu-item {
      color: #b7bdc3;
      &.is-active {
        color: #fff;
      }
    }
  }
}
</style>
