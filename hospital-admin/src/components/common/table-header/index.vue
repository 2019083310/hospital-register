<template>
  <div class="table-header-wrap">
    <h2 class="header-title">{{ title }}</h2>
    <el-button type="primary" @click="handleBtnClick">{{ btnTitle }}</el-button>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  btnTitle: String,
});

const emits = defineEmits(["addBtnClick"]);
// *触发按钮点击事件，父子组件通信
const handleBtnClick = () => {
  emits("addBtnClick");
};
</script>

<style lang="less" scoped>
.table-header-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 60px;

  .header-title {
    font-size: 18px;
    font-weight: 700;
  }
}
</style>
