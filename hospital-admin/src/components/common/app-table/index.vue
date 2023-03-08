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
      <template v-if="isShowIndexColumn">
        <el-table-column
          type="index"
          label="序号"
          :min-width="55"
          align="center"
        ></el-table-column>
      </template>
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
              <el-popconfirm
                title="你确定删除吗?"
                confirm-button-text="确定"
                cancel-button-text="取消"
                @confirm="handleConfirmEvent(scope.row)"
                @cancel="handleCancelEvent"
              >
                <template #reference>
                  <el-button size="small" type="danger">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="list.prop === 'createTime'">
          <el-table-column
            :label="list.label"
            :min-width="list.minWidth"
            header-align="center"
            align="center"
            show-overflow-tooltip
          >
            <template #default="scope">
              <span>{{ formatDate(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="list.prop === 'updateTime'">
          <el-table-column
            :label="list.label"
            :min-width="list.minWidth"
            header-align="center"
            align="center"
            show-overflow-tooltip
          >
            <template #default="scope">
              <span>{{ formatDate(scope.row.updateTime) }}</span>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="list.prop === 'open'">
          <el-table-column
            :label="list.label"
            :min-width="list.minWidth"
            header-align="center"
            align="center"
            show-overflow-tooltip
          >
            <template #default="scope">
              <el-switch
                v-model="scope.row.open"
                :active-value="1"
                :inactive-value="0"
                @change="handleHosOpenChange"
              ></el-switch>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="list.prop === 'levelText'">
          <el-table-column
            :label="list.label"
            :min-width="list.minWidth"
            header-align="center"
            align="center"
            show-overflow-tooltip
          >
            <template #default="scope">
              <span>{{
                scope.row.levelText === 1
                  ? "一级医院"
                  : scope.row.levelText === 2
                  ? "二级医院"
                  : "三级医院"
              }}</span>
            </template>
          </el-table-column>
        </template>
        <template v-else-if="list.prop === 'picture'">
          <el-table-column
            :label="list.label"
            :min-width="list.minWidth"
            header-align="center"
            align="center"
            show-overflow-tooltip
          >
            <template #default="scope">
              <el-image
                style="width: 60px; height: 60px"
                :src="scope.row.picture"
                :preview-src-list="[scope.row.picture]"
                fit="cover"
              />
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
import { formatDate } from "@/utils";

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
  isShowIndexColumn: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits([
  "editTableData",
  "deleteTableData",
  "confirmDelete",
  "openStatusChange",
]);

// *table operate
const handleEdit = (v) => {
  emits("editTableData", v);
};

// *确定删除
const handleConfirmEvent = (v) => {
  emits("deleteTableData", v);
};

// *取消删除
const handleCancelEvent = () => {
  return;
};

// *处理医院开放状态改变
const handleHosOpenChange = (v) => {
  emits("openStatusChange", v);
};
</script>

<style lang="less" scoped>
.app-table-wrap {
  width: 100%;

  :deep(.el-table .el-table__cell) {
    z-index: 0;
  }
}
</style>
