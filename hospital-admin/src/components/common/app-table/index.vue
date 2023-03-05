<template>
  <div class="app-table-wrap">
    <el-table
      style="width: 100%; margin-bottom: 20px"
      border
      empty-text="暂时没有数据"
      row-key="id"
      :data="tableData"
      :default-expand-all="expandAll"
    >
      <template v-for="list in tableList" :key="list.prop">
        <template v-if="list.prop === 'operate'">
          <el-table-column
            :label="list.label"
            :min-width="list.minWidth"
            header-align="center"
            align="center"
            show-overflow-tooltip
          >
            <template #default="scope">
              <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </template>
        <template v-else>
          <el-table-column
            :prop="list.prop"
            :label="list.label"
            :min-width="list.minWidth"
            header-align="center"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
        </template>
      </template>
    </el-table>
  </div>
</template>

<script setup>
const props = defineProps({
  tableList: {
    type: Array,
    required: true,
    default: () => [],
  },
  tableData: {
    type: Array,
    default: () => [],
  },
  expandAll: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["editTableData", "deleteTableData"]);

// *table operate
const handleEdit = (v) => {
  emits("editTableData", v);
};
const handleDelete = (v) => {
  emits("deleteTableData", v);
};
</script>

<style lang="less" scoped></style>
