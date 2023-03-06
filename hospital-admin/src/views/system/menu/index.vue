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
        :table-data="menuList"
        :expand-all="false"
        @editTableData="handleEditTableColumn"
        @deleteTableData="handleDeleteTableColumn"
      ></app-table>
      <app-form-modal
        title="新建菜单"
        v-if="isShowModal"
        @cancelClick="handleFormCancel"
        @confirmClick="handleFormConfirm"
      >
        <template #content>
          <el-form
            :model="formModel"
            :rules="rules"
            label-width="120px"
            ref="ruleFormRef"
          >
            <el-form-item label="菜单名称" prop="name">
              <el-input v-model="formModel.name" placeholder="请输入菜单名称" />
            </el-form-item>
            <el-form-item label="菜单等级" prop="level">
              <el-select v-model.number="formModel.level" placeholder="请选择菜单等级">
                <el-option label="一级菜单" value="1" />
                <el-option label="二级菜单" value="2" />
              </el-select>
            </el-form-item>
            <template v-if="formModel.level === 2">
              <el-form-item label="父级菜单" prop="">
                <el-select v-model="formModel.fatherMenu" placeholder="请选择父级菜单">
                  <template v-for="list in menuList">
                    <el-option :label="list.name" :value="list.key"></el-option>
                  </template>
                </el-select>
              </el-form-item>
            </template>
            <el-form-item label="菜单url" prop="url">
              <el-input v-model="formModel.url" placeholder="请输入菜单对应的url" />
            </el-form-item>
          </el-form>
        </template>
      </app-form-modal>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { storeToRefs } from "pinia";

import useMenuStore from "@/store/modules/system/menu";
import {
  addMenuItem,
  removeMenuItem,
  removeMenuFistItem,
} from "@/api/modules/system/menu";
import { useGlobalTips } from "@/utils/index";

// import { menuTableData } from "@/test/index";
import MenuTableList from "@/assets/data/table-menu.json";

import TableHeader from "@/components/common/table-header/index.vue";
import AppTable from "@/components/common/app-table/index.vue";
import AppFormModal from "@/components/common/app-form-modal/index.vue";

// ?数据状态
const menuStore = useMenuStore();
const { menuList } = storeToRefs(menuStore);

const isShowModal = ref(false);
const ruleFormRef = ref();
const formModel = reactive({
  name: "",
  level: "",
  url: "",
  key: "",
  fatherMenu: "",
});
const rules = reactive({
  name: [
    { required: true, message: "请输入合法的菜单名称", trigger: "blur" },
    { min: 3, max: 10, message: "Length should be 3 to 10", trigger: "blur" },
  ],
  level: [
    {
      required: true,
      message: "请选择菜单等级",
      trigger: "change",
    },
  ],
  url: [{ required: true, message: "请输入合法的路径", trigger: "blur" }],
});

// ?新增菜单
const handleAddMenuClick = () => {
  isShowModal.value = true;
};

// ?新增菜单取消按钮回调
const handleFormCancel = () => {
  isShowModal.value = false;
};

// ?新增菜单确认按钮回调
const handleFormConfirm = async () => {
  const valid = await ruleFormRef.value.validate();

  if (valid) {
    try {
      if (formModel.level === 1) {
        // *生成唯一的key
        formModel.key = Date.now().toString(36);
      } else {
        formModel.key = formModel.fatherMenu;
      }

      await addMenuItem({ ...formModel });
      menuStore.changeMenuListAction();

      ruleFormRef.value.resetFields();
      isShowModal.value = false;
      return;
    } catch (error) {
      return useGlobalTips("error", error.message);
    }
  }
};

// ?表格column的编辑
const handleEditTableColumn = (v) => {
  console.log(v);
};
// ?表格column的删除
const handleDeleteTableColumn = async (v) => {
  try {
    let res;
    if (v.level === 1) {
      res = await removeMenuFistItem(v.key);
    } else {
      res = await removeMenuItem(v.id);
    }

    if (res.code === 1) {
      menuStore.changeMenuListAction();
    }
  } catch (error) {
    return;
  }
};

// ?生命周期回调
onMounted(async () => {
  menuStore.changeMenuListAction();
});
</script>

<style lang="less" scoped>
.menu-wrap {
  .box-card {
    // @media screen and (min-width: 1200px) {
    //   overflow-x: auto;
    // }
    .el-form {
      .el-form-item {
        margin-top: 20px;
        .el-form-item__content {
          .el-input {
            width: 250px;
          }
        }
      }
    }
  }
}
</style>
