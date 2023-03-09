<template>
  <div class="department-wrap">
    <div class="search-wrapper">
      <app-search
        class="search-content"
        @formReset="handleFormReset"
        @searchClick="handleSearchClick"
      >
        <template #search>
          <el-form-item label="医院名称">
            <el-input
              v-model="searchModel.hosName"
              clearable
              placeholder="请输入医院名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="医院级别">
            <el-select
              v-model.number="searchModel.levelText"
              placeholder="请选择医院级别"
            >
              <el-option label="一级医院" value="1" />
              <el-option label="二级医院" value="2" />
              <el-option label="三级医院" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="医院状态">
            <el-select v-model.number="searchModel.open" placeholder="请选择医院状态">
              <el-option label="开放" value="1" />
              <el-option label="关闭" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="科室名称">
            <el-input
              v-model="searchModel.depName"
              clearable
              placeholder="请输入科室系统名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="科室状态">
            <el-select v-model.number="searchModel.state" placeholder="请选择科室状态">
              <el-option label="开放" value="1" />
              <el-option label="关闭" value="0" />
            </el-select>
          </el-form-item>
        </template>
      </app-search>
    </div>
    <el-card class="box-card">
      <table-header
        title="科室列表"
        btn-title="添加科室"
        @addBtnClick="handleAddDepClick"
      ></table-header>
      <app-table
        :table-list="depOneTableList"
        :table-data="deponeList"
        :expand-all="false"
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
            <el-form-item label="科室名称" prop="name">
              <el-input v-model="formModel.name" placeholder="请输入科室名称" />
            </el-form-item>
            <el-form-item label="状态" prop="state">
              <el-switch
                v-model="formModel.state"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
            <el-form-item label="归属医院" prop="hosId">
              <el-select v-model.number="formModel.hosId" placeholder="请选择归属医院">
                <template v-for="hos in hospitalList" :key="hos.id">
                  <el-option :label="hos.name" :value="hos.id"></el-option>
                </template>
              </el-select>
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

import useManageStore from "@/store/modules/section/manage";
import useDeponeStore from "@/store/modules/section/depone";
import { useGlobalTips } from "@/utils/index";
import {
  addDepartmentFetch,
  removeDepartmentFetch,
  updateDepartmentFetch,
} from "@/api/modules/section/depone";

import depOneTableList from "@/assets/data/table-depOne.json";

import AppSearch from "@/components/common/app-search/index.vue";
import TableHeader from "@/components/common/table-header/index.vue";
import AppTable from "@/components/common/app-table/index.vue";
import AppFormModal from "@/components/common/app-form-modal/index.vue";

// ?数据状态
const manageStore = useManageStore();
const deponeStore = useDeponeStore();
const { hospitalList } = storeToRefs(manageStore);
const { deponeList } = storeToRefs(deponeStore);

const isShowModal = ref(false);
const modalTitle = ref("添加科室");
const ruleFormRef = ref();
const currentEditId = ref();

const formModel = reactive({
  name: "",
  state: 1,
  hosId: "",
});

const searchModel = reactive({
  hosName: "",
  levelText: "",
  open: "",
  depName: "",
  state: "",
});

const rules = reactive({
  name: [
    { required: true, message: "请输入合法的科室名称", trigger: "blur" },
    { min: 2, max: 10, message: "Length should be 2 to 10", trigger: "blur" },
  ],
  hosId: [
    {
      required: true,
      message: "请选择归属医院",
      trigger: "change",
    },
  ],
});

// ?添加科室
const handleAddDepClick = () => {
  modalTitle.value = "添加科室";
  isShowModal.value = true;
};

// ?添加科室/编辑科室信息取消按钮回调
const handleFormCancel = () => {
  resetFormModal();

  isShowModal.value = false;
};

// ?添加科室/编辑科室信息确认按钮回调
const handleFormConfirm = async () => {
  const valid = await ruleFormRef.value.validate();

  if (valid && modalTitle.value === "添加科室") {
    try {
      const res = await addDepartmentFetch({
        ...formModel,
      });

      if (res.code === 1) {
        isShowModal.value = false;
        deponeStore.changeDeponeListAction();

        resetFormModal();
        useGlobalTips("success", "添加成功");
        return;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return useGlobalTips("error", error.message);
    }
  } else if (valid && modalTitle.value === "编辑科室信息") {
    try {
      const res = await updateDepartmentFetch(
        {
          ...formModel,
        },
        currentEditId.value
      );

      if (res.code === 1) {
        isShowModal.value = false;
        deponeStore.changeDeponeListAction();

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
  modalTitle.value = "编辑科室信息";
  formModel.name = v.depName;
  formModel.state = v.state;
  formModel.hosId = v.hosId;
  currentEditId.value = v.id;

  isShowModal.value = true;
};

// ?表格column的删除
const handleDeleteTableColumn = async (v) => {
  try {
    const res = await removeDepartmentFetch(v.id);

    if (res.code === 1) {
      deponeStore.changeDeponeListAction();
      useGlobalTips("success", `删除${v.depName}成功`);
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
  formModel.state = 1;
  formModel.hosId = "";

  currentEditId.value = "";
};

// ?搜索表单的重置
const handleFormReset = () => {};

const handleSearchClick = () => {};

// ?生命周期回调
onMounted(async () => {
  manageStore.changeHospitalListAction();
  deponeStore.changeDeponeListAction();
});
</script>

<style lang="less" scoped>
.department-wrap {
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
