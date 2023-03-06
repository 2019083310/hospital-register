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
        :title="modalTitle"
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
              <el-select
                v-model.number="formModel.level"
                placeholder="请选择菜单等级"
                :disabled="oldItemLevel === 1"
              >
                <el-option label="一级菜单" value="1" />
                <el-option label="二级菜单" value="2" />
              </el-select>
            </el-form-item>
            <template v-if="formModel.level === 2">
              <el-form-item label="父级菜单" prop="fatherMenu">
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
  updateMenuItem,
  // getFatherName,
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
const modalTitle = ref("新建菜单");
const ruleFormRef = ref();
const updateItemId = ref("");
const oldItemLevel = ref();
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
  fatherMenu: [
    {
      required: true,
      message: "请选择父级菜单",
      trigger: "change",
    },
  ],
  url: [{ required: true, message: "请输入合法的路径", trigger: "blur" }],
});

// ?新增菜单
const handleAddMenuClick = () => {
  modalTitle.value = "新增菜单";
  oldItemLevel.value = "";
  isShowModal.value = true;
};

// ?新增菜单取消按钮回调
const handleFormCancel = () => {
  isShowModal.value = false;

  resetFormModal();
};

// ?新增菜单确认按钮回调
const handleFormConfirm = async () => {
  const valid = await ruleFormRef.value.validate();

  if (valid && modalTitle.value === "新增菜单") {
    if (formModel.level === 1) {
      // *生成唯一的key
      formModel.key = Date.now().toString(36);
    } else {
      formModel.key = formModel.fatherMenu;
    }

    try {
      await addMenuItem({ ...formModel });
      menuStore.changeMenuListAction();

      resetFormModal();
      isShowModal.value = false;
      return;
    } catch (error) {
      return useGlobalTips("error", error.message);
    }
  } else if (valid && modalTitle.value === "编辑菜单") {
    if (formModel.level === 1 && oldItemLevel.value !== 1) {
      // *生成唯一的key
      formModel.key = Date.now().toString(36);
    } else {
      formModel.key = formModel.fatherMenu;
    }

    try {
      await updateMenuItem({ ...formModel, id: updateItemId.value });
      menuStore.changeMenuListAction();

      resetFormModal();
      isShowModal.value = false;
      return;
    } catch (error) {
      return useGlobalTips("error", error.message);
    }
  }
};

// ?表格column的编辑
const handleEditTableColumn = async (v) => {
  try {
    // const { result } = await getFatherName(v.key);

    modalTitle.value = "编辑菜单";
    formModel.name = v.name;
    formModel.level = v.level;
    formModel.url = v.url;
    // formModel.fatherMenu = result[0].name;
    formModel.fatherMenu = v.key;

    oldItemLevel.value = v.level;
    updateItemId.value = v.id;

    isShowModal.value = true;
  } catch (error) {
    return error;
  }
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

// *将formModal值置空
const resetFormModal = () => {
  formModel.name = "";
  formModel.level = "";
  formModel.url = "";
  formModel.fatherMenu = "";
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
