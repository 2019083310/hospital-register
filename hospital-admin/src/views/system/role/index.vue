<template>
  <div class="role-wrap">
    <el-card class="box-card">
      <table-header
        title="角色列表"
        btn-title="新增角色"
        @addBtnClick="handleAddRoleClick"
      ></table-header>
      <app-table
        :table-list="RoleTableList"
        :table-data="roleList"
        :is-show-index-column="true"
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
            <el-form-item label="角色名称" prop="name">
              <el-input v-model="formModel.name" placeholder="请输入角色名称" />
            </el-form-item>
            <el-form-item label="角色描述" prop="desc">
              <el-input v-model="formModel.desc" placeholder="请输入相应的角色描述" />
            </el-form-item>
          </el-form>
          <el-tree-v2
            ref="treeRef"
            :data="menuList"
            :props="props"
            :height="208"
            :default-checked-keys="defaultCheckedKeys"
            :default-expanded-keys="defaultCheckedKeys"
            show-checkbox
            empty-text="暂时无菜单数据"
          />
        </template>
      </app-form-modal>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { storeToRefs } from "pinia";

import useMenuStore from "@/store/modules/system/menu";
import useRoleStore from "@/store/modules/system/role";
import {
  addRoleFetch,
  removeRoleFetch,
  updateRoleFetch,
  verifyUniqueFetch,
} from "@/api/modules/system/role";
import { filterMenuFetch } from "@/api/modules/system/menu";
import { useGlobalTips } from "@/utils";

// import { roleTableData } from "@/test/index";
import RoleTableList from "@/assets/data/table-role.json";

import TableHeader from "@/components/common/table-header/index.vue";
import AppTable from "@/components/common/app-table/index.vue";
import AppFormModal from "@/components/common/app-form-modal/index.vue";

//?组件状态 pinia
const menuStore = useMenuStore();
const roleStore = useRoleStore();
const { menuList } = storeToRefs(menuStore);
const { roleList } = storeToRefs(roleStore);

// ?组件状态 ref reactiveAPi
const ruleFormRef = ref();
const treeRef = ref();
const isShowModal = ref(false);
const modalTitle = ref("新建角色");
const defaultCheckedKeys = ref([]);
const currentEditId = ref();

// *虚拟树的匹配值类型
const props = {
  value: "id",
  label: "name",
  children: "children",
};

const formModel = reactive({
  name: "",
  desc: "",
});
// ?角色名称失去焦点
const customValidateNameRule = async (rule, value, callback) => {
  try {
    if (value.length === 0) {
      callback(new Error("请输入合法的角色名称"));
    } else if (value.length < 2 || value.length > 10) {
      callback(new Error("角色名称必须在2-10个字符之间"));
    } else {
      if (modalTitle.value === "编辑角色") return;
      const res = await verifyUniqueFetch(value);

      if (res.code === 1 && res.ret) {
        callback(new Error("角色名称已存在"));
      }
    }
  } catch (error) {
    return useGlobalTips("error", error.message);
  }
};

const rules = reactive({
  name: [
    { validator: customValidateNameRule, trigger: "blur" },
    { required: true, trigger: "blur" },
  ],
  desc: [{ required: true, message: "请输入相应的角色描述", trigger: "blur" }],
});

// ?新增角色
const handleAddRoleClick = () => {
  modalTitle.value = "新增角色";

  isShowModal.value = true;
};

// ?新增角色/编辑角色取消按钮回调
const handleFormCancel = () => {
  isShowModal.value = false;

  resetFormModal();
};

// ?新增/修改角色确认按钮回调
const handleFormConfirm = async () => {
  const valid = await ruleFormRef.value.validate();

  if (valid && modalTitle.value === "新增角色") {
    try {
      const checkedKeys = JSON.stringify(treeRef.value.getCheckedKeys());
      const res = await addRoleFetch(formModel.name, formModel.desc, checkedKeys);
      // console.log(res);

      if (res.code === 1) {
        isShowModal.value = false;
        roleStore.changeRoleListAction();

        useGlobalTips("success", "添加角色信息成功");
        resetFormModal();
        return;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return useGlobalTips("error", error.message);
    }
  } else if (valid && modalTitle.value === "编辑角色") {
    try {
      const checkedKeys = JSON.stringify(treeRef.value.getCheckedKeys());
      const res = await updateRoleFetch(
        formModel.name,
        formModel.desc,
        checkedKeys,
        currentEditId.value
      );

      if (res.code === 1) {
        isShowModal.value = false;
        roleStore.changeRoleListAction();

        useGlobalTips("success", "修改角色信息成功");
        resetFormModal();
        return;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return useGlobalTips("error", error.message);
    }
  }
};

// ?编辑权限item
const handleEditTableColumn = async (v) => {
  modalTitle.value = "编辑角色";

  formModel.name = v.name;
  formModel.desc = v.desc;
  currentEditId.value = v.id;

  const menulist = v.menu
    .slice(1, -1)
    .split(",")
    .map((i) => Number(i));

  try {
    const res = await filterMenuFetch(menulist);

    if (res.code === 1) {
      defaultCheckedKeys.value = res.result;
      isShowModal.value = true;
    } else {
      throw new Error(res.message);
    }
  } catch (error) {
    return useGlobalTips("error", error.message);
  }
};

// ?删除权限item
const handleDeleteTableColumn = async (v) => {
  try {
    const res = await removeRoleFetch(v.id);

    if (res.code === 1) {
      roleStore.changeRoleListAction();

      return useGlobalTips("success", `删除${v.name}角色成功`);
    } else {
      throw new Error(res.message);
    }
  } catch (error) {
    return useGlobalTips("error", error.message);
  }
};

// *将formModal值置空
const resetFormModal = () => {
  formModel.name = "";
  formModel.desc = "";
  currentEditId.value = "";

  defaultCheckedKeys.value = [];
};

// ?挂载到Dom上发起网络请求
onMounted(() => {
  roleStore.changeRoleListAction();
  menuStore.changeMenuListAction();
});
</script>

<style lang="less" scoped>
.role-wrap {
  .box-card {
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

    :deep(.el-tree) {
      margin-top: 5px;
      padding-left: 45px;

      color: #333;
    }
  }
}
</style>
