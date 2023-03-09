<template>
  <div class="app-search-wrap">
    <div class="search-wrap">
      <slot name="search"></slot>
    </div>
    <div class="search-btn">
      <el-button :icon="Refresh" @click="handleFormReset">重置</el-button>
      <el-button type="primary" :icon="Search" @click="handleSearchClick">查询</el-button>
    </div>
  </div>
</template>

<script setup>
import { Refresh, Search } from "@element-plus/icons-vue";

const emits = defineEmits(["formReset", "searchClick"]);

// ?父子组件之间通信
const handleFormReset = () => {
  emits("formReset");
};

const handleSearchClick = () => {
  emits("searchClick");
};
</script>

<style lang="less" scoped>
.app-search-wrap {
  width: 100%;
  padding:20px 20px 10px;
  margin-bottom:30px;
  border-radius: 5px;

  box-sizing: border-box;
  box-shadow:5px 5px 5px rgba(0,0,0,.1);
  background-color: #fff;

  .search-wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
  }

  .search-btn {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    width: 100%;
    padding:0 20px;

    box-sizing: border-box;
  }
}
</style>
