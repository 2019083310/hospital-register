<template>
  <div class="app-wrap">
    <!-- 1.自己的布局 -->
    <!-- <app-menu></app-menu>
    <div class="content-wrap">
      <app-header></app-header>
      <div class="content">
        <router-view></router-view>
      </div>
    </div> -->
    <!-- 2.利用element-plus实现的flex响应式布局 -->
    <el-container class="main-content">
      <el-aside width="220px">
        <app-menu></app-menu>
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <app-header></app-header>
        </el-header>
        <el-main class="page-content">
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import AppMenu from "@/components/common/app-menu/index.vue";
import AppHeader from "@/components/common/app-header/index.vue";

// import shell from "@/api/shell/shell";

// shell();
</script>

<style lang="less" scoped>
// .app-wrap {
//   display: flex;
//   align-items: flex-start;

//   width: 100%;
//   height: 100%;
//   box-sizing: border-box;

//   .content-wrap {
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-start;
//     height: 100%;

//     background-color: #f5f5f5;

//     box-sizing: border-box;

//     .content {
//       flex: 1;
//       width: 100%;
//       padding: 20px;

//       box-sizing: border-box;

//       overflow-x: hidden;
//       overflow-y: scroll;
//     }
//   }
// }
// ?利用element-plus实现响应式布局样式
.app-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.main-content,
.page {
  height: 100%;
}

.page-content {
  height: calc(100% - 50px);

  .page-info {
    background-color: #f5f5f5;
    border-radius: 5px;
  }
}

.el-header {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}

.el-header {
  height: 50px !important;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
</style>
