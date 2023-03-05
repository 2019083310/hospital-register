<template>
  <div class="menu-wrap">
    <el-card class="box-card">
      <table-header
        title="菜单列表"
        btn-title="新增菜单"
        @addBtnClick="handleAddMenuClick"
      ></table-header>
      <app-table
        :table-list="MenuTableList"
        :table-data="menuTableData"
        :expand-all="true"
        @editTableData="handleEditTableColumn"
        @deleteTableData="handleDeleteTableColumn"
      ></app-table>
    </el-card>
  </div>
</template>

<script setup>
import { menuTableData } from "@/test/index";
import MenuTableList from "@/assets/data/table-menu.json";

import TableHeader from "@/components/common/table-header/index.vue";
import AppTable from "@/components/common/app-table/index.vue";

// *新增菜单
const handleAddMenuClick = () => {
  console.log(1);
};

// *表格column的编辑
const handleEditTableColumn = (v) => {
  console.log(v);
};
// *表格column的删除
const handleDeleteTableColumn = () => {
  console.log(v);
};
</script>

<style lang="less" scoped>
.menu-wrap {
  .box-card {
    padding-top: 0 !important;
  }
}
</style>
