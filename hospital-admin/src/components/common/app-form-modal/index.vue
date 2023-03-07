<template>
  <div class="menu-modal-wrap">
    <div class="menu-modal">
      <h3 class="modal-title">{{ title }}</h3>
      <div class="form-content">
        <slot name="content"></slot>
      </div>
      <div class="btn-wrap">
        <el-button @click="handleCancelClick">取消</el-button>
        <el-button type="primary" @click="handleConfirmClick">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
const emits = defineEmits(["cancelClick", "confirmClick"]);

// *点击取消按钮
const handleCancelClick = () => {
  emits("cancelClick");
};

// *点击确定按钮
const handleConfirmClick = () => {
  emits("confirmClick");
};
</script>

<style lang="less" scoped>
.menu-modal-wrap {
  position: fixed;
  z-index:998;
  top:0;
  right:0;
  bottom:0;
  left:0;
  min-height:800px;

  background-color: rgba(0, 0, 0, 0.5);
  .menu-modal {
    position: fixed;
    z-index: 999;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width:450px;
    min-height:500px;

    background-color: #fff;
    .modal-title {
      width: 100%;
      height: 50px;
      padding:20px 0 10px;
      line-height: 20px;

      font-size:20px;
      font-weight: 500;
      text-align: center;

      box-sizing: border-box;
    }
    .form-content {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      width: 100%;
      padding:10px 20px;
      margin-top:10px;

      box-sizing: border-box;
    }
    .btn-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      padding:20px 0;
    }
  }
}
</style>
