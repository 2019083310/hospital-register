<template>
  <div class="admin-manage-wrap">
    <div class="search-wrapper">
      <app-search
        class="search-content"
        @formReset="handleFormReset"
        @searchClick="handleSearchClick"
      >
        <template #search>
          <el-form-item label="管理员账号">
            <el-input
              v-model="searchModel.username"
              clearable
              placeholder="请输入管理员账号信息"
            ></el-input>
          </el-form-item>
          <el-form-item label="管理员状态">
            <el-select v-model.number="searchModel.state" placeholder="请选择医院状态">
              <el-option label="开放" value="1" />
              <el-option label="关闭" value="0" />
            </el-select>
          </el-form-item>
        </template>
      </app-search>
    </div>
    <el-card class="box-card">
      <table-header
        title="管理员列表"
        btn-title="添加管理员"
        @addBtnClick="handleAddAdminClick"
      ></table-header>
      <app-table
        :table-list="adminTableList"
        :table-data="adminList"
        :expand-all="false"
        :is-show-index-column="true"
        @editTableData="handleEditTableColumn"
        @deleteTableData="handleDeleteTableColumn"
        @openStatusChange="handleAdminStatusChange"
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
            <el-form-item label="管理员账号" prop="username">
              <el-input v-model="formModel.username" placeholder="请输入账号" />
            </el-form-item>
            <el-form-item label="初始密码" prop="password">
              <el-input
                v-model="formModel.password"
                type="password"
                placeholder="请输入管理员账号初始密码"
              />
            </el-form-item>
            <el-form-item label="状态" prop="state">
              <el-switch
                v-model="formModel.state"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
            <el-form-item label="管理员角色" prop="roleId">
              <el-select v-model.number="formModel.roleId" placeholder="请选择医生角色">
                <template v-for="role in roleList" :key="role.id">
                  <el-option
                    :label="role.name"
                    :value="role.id"
                    v-if="role.id <= 5"
                  ></el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="管理员证件照" prop="picture">
              <el-upload
                v-model:file-list="pictureList"
                action="http://127.0.0.1:3001/file/upload"
                list-type="picture-card"
                name="logo"
                :on-success="handlePictureUploadSuccess"
                :on-remove="handlePictureRemove"
                :on-error="handlePictureUploadError"
              >
                <el-icon><Plus /></el-icon>
              </el-upload>
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
import { Plus } from "@element-plus/icons-vue";

import useAdminStore from "@/store/modules/system/admin";
import useRoleStore from "@/store/modules/system/role";
import { removeHosLogoFetch } from "@/api/modules/section/manage";
import {
  addAdminFetch,
  removeAdminFetch,
  updateAdminInfoFetch,
} from "@/api/modules/system/admin";
import { useGlobalTips } from "@/utils/index";

import adminTableList from "@/assets/data/table-admin-list.json";

import AppSearch from "@/components/common/app-search/index.vue";
import TableHeader from "@/components/common/table-header/index.vue";
import AppTable from "@/components/common/app-table/index.vue";
import AppFormModal from "@/components/common/app-form-modal/index.vue";

// ?数据状态
const adminStore = useAdminStore();
const roleStore = useRoleStore();
const { adminList } = storeToRefs(adminStore);
const { roleList } = storeToRefs(roleStore);

const isShowModal = ref(false);
const modalTitle = ref("添加管理员");
const ruleFormRef = ref();
const pictureList = ref([]);
const currentEditId = ref();

const formModel = reactive({
  username: "",
  password: "",
  state: 1,
  roleId: "",
});

const searchModel = reactive({
  username: "",
  state: "",
});

// ?验证证件照是否上传
const customValidateLogoRule = async (rule, value, callback) => {
  if (!pictureList.value.length) {
    callback(new Error("请上传管理员证件照"));
  }
};

const rules = reactive({
  username: [
    { required: true, message: "请输入管理员账号", trigger: "blur" },
    { min: 2, max: 10, message: "Length should be 2 to 10", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入账号初始密码", trigger: "blur" },
    { min: 8, max: 20, message: "Length should be 8 to 20", trigger: "blur" },
  ],
  roleId: [
    {
      required: true,
      message: "请选择要添加的管理员角色",
      trigger: "change",
    },
  ],
  picture: [
    {
      required: true,
      validator: customValidateLogoRule,
    },
  ],
});

// ?添加管理员
const handleAddAdminClick = () => {
  modalTitle.value = "添加管理员";
  isShowModal.value = true;
};

// ?添加管理员/编辑管理员信息取消按钮回调
const handleFormCancel = () => {
  if (modalTitle.value === "编辑管理员信息" && !pictureList.value.length) {
    return useGlobalTips("error", "管理员证件照不能为空,请上传图片");
  }

  resetFormModal();
  isShowModal.value = false;
};

// ?添加管理员/编辑管理员信息确认按钮回调
const handleFormConfirm = async () => {
  const valid = await ruleFormRef.value.validate();
  if (!pictureList.value.length) return;

  if (valid && modalTitle.value === "添加管理员") {
    try {
      const res = await addAdminFetch({
        ...formModel,
        picture: pictureList.value[0]?.url,
      });
      if (res.code === 1) {
        isShowModal.value = false;
        adminStore.changeAdminListAction();

        resetFormModal();
        useGlobalTips("success", "添加成功");
        return;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return useGlobalTips("error", error.message);
    }
  } else if (valid && modalTitle.value === "编辑管理员信息") {
    try {
      const res = await updateAdminInfoFetch(
        {
          ...formModel,
          picture: pictureList.value[0]?.url,
        },
        currentEditId.value
      );
      if (res.code === 1) {
        isShowModal.value = false;
        adminStore.changeAdminListAction();
        resetFormModal();
        useGlobalTips("success", "修改信息成功");
        return;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return useGlobalTips("error", error.message);
    }
  }
};

// ?表格column的编辑
const handleEditTableColumn = async (v) => {
  modalTitle.value = "编辑管理员信息";
  formModel.username = v.username;
  formModel.state = v.state;
  formModel.password = v.password;
  formModel.roleId = v.roleId;
  currentEditId.value = v.id;

  pictureList.value = [
    {
      url: v.picture,
    },
  ];

  isShowModal.value = true;
};

// ?表格column的删除
const handleDeleteTableColumn = async (v) => {
  try {
    const res = await removeAdminFetch(v.id);
    if (res.code === 1) {
      adminStore.changeAdminListAction();
      useGlobalTips("success", `删除${v.doctorName}成功`);
    } else {
      throw new Error(res.message);
    }
  } catch (error) {
    return useGlobalTips("error", error.message);
  }
};

// ?管理员状态改变
const handleAdminStatusChange = (status) => {};

// *将formModal值置空
const resetFormModal = () => {
  formModel.username = "";
  formModel.password = "";
  formModel.state = 1;
  formModel.roleId = "";
  currentEditId.value = "";

  pictureList.value = [];
};

// *图片上传成功回调
const handlePictureUploadSuccess = (v) => {
  pictureList.value = [
    {
      url: v.pictureUrl,
    },
  ];

  useGlobalTips("success", "上传图片成功");
};

// *图片上传失败
const handlePictureUploadError = (error) => {
  return useGlobalTips("error", "图片上传失败，请检查网络，重新上传");
};

// *图片删除回调
const handlePictureRemove = async (v) => {
  const lastIndex = v.url.lastIndexOf("/");
  const id = v.url.slice(lastIndex + 1);

  try {
    const res = await removeHosLogoFetch(id);

    if (res.code === 1) {
      pictureList.value = [];

      return useGlobalTips("success", "删除成功");
    }
  } catch (error) {
    return useGlobalTips("error", error.message);
  }
};

// ?搜索表单的重置
const handleFormReset = () => {};

const handleSearchClick = () => {};

// ?生命周期回调
onMounted(async () => {
  adminStore.changeAdminListAction();
  roleStore.changeRoleListAction();
});
</script>

<style lang="less" scoped>
.admin-manage-wrap {
  width: 100%;

  background-color: #f5f5f5;

  .search-content {
    .el-form-item {
      width: 400px;
      padding: 10px 30px;

      box-sizing: border-box;

      color: #606266;
    }
  }

  .box-card {
    padding: 10px 20px;
    // margin-top:20px;
    border-radius: 5px;

    background-color: #fff;

    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
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
