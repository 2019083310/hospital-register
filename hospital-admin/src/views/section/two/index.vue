<template>
  <div class="department-two-wrap">
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
          <el-form-item label="一级科室名称">
            <el-input
              v-model="searchModel.depName"
              clearable
              placeholder="请输入一级科室系统名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="一级科室状态">
            <el-select
              v-model.number="searchModel.state"
              placeholder="请选择一级科室状态"
            >
              <el-option label="开放" value="1" />
              <el-option label="关闭" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="二级门诊名称">
            <el-input
              v-model="searchModel.depTwoName"
              clearable
              placeholder="请输入二级门诊名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="二级门诊状态">
            <el-select
              v-model.number="searchModel.stateTwo"
              placeholder="请选择二级门诊状态"
            >
              <el-option label="开放" value="1" />
              <el-option label="关闭" value="0" />
            </el-select>
          </el-form-item>
        </template>
      </app-search>
    </div>
    <el-card class="box-card">
      <table-header
        title="二级门诊列表"
        btn-title="添加二级门诊"
        @addBtnClick="handleAddDepTwoClick"
      ></table-header>
      <app-table
        :table-list="depTwoTableList"
        :table-data="depTwoList"
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
            <el-form-item label="门诊名称" prop="name">
              <el-input v-model="formModel.name" placeholder="请输入门诊名称" />
            </el-form-item>
            <el-form-item label="门诊状态" prop="state">
              <el-switch
                v-model="formModel.state"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
            <el-form-item label="归属医院" prop="hosId">
              <el-select
                v-model.number="formModel.hosId"
                placeholder="请选择归属医院"
                @change="handleHosSelectChange"
              >
                <template v-for="hos in hospitalList" :key="hos.id">
                  <el-option :label="hos.name" :value="hos.id"></el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="归属一级科室" prop="depId" v-if="formModel.hosId">
              <el-select
                v-model.number="formModel.depId"
                placeholder="请选择归属医院一级科室"
              >
                <template v-for="dep in deponeList" :key="dep.id">
                  <el-option :label="dep.depName" :value="dep.id"></el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="门诊地址" prop="address">
              <el-input v-model="formModel.address" placeholder="请输入门诊地址信息" />
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
import useDepTwoStore from "@/store/modules/section/deptwo";
import { useGlobalTips } from "@/utils/index";
import {
  addDepartmentTwoFetch,
  removeDepartmentTwoFetch,
  updateDepartmentTwoFetch,
} from "@/api/modules/section/deptwo";

import depTwoTableList from "@/assets/data/table-depTwo.json";

import AppSearch from "@/components/common/app-search/index.vue";
import TableHeader from "@/components/common/table-header/index.vue";
import AppTable from "@/components/common/app-table/index.vue";
import AppFormModal from "@/components/common/app-form-modal/index.vue";

// ?数据状态
const manageStore = useManageStore();
const deponeStore = useDeponeStore();
const depTwoStore = useDepTwoStore();
const { hospitalList } = storeToRefs(manageStore);
const { deponeList } = storeToRefs(deponeStore);
const { depTwoList } = storeToRefs(depTwoStore);

const isShowModal = ref(false);
const modalTitle = ref("添加科室");
const ruleFormRef = ref();
const currentEditId = ref();

const formModel = reactive({
  name: "",
  state: 1,
  hosId: "",
  depId: "",
  address: "",
});

const searchModel = reactive({
  hosName: "",
  levelText: "",
  open: "",
  state: "",
  stateTwo: "",
  depName: "",
  depTwoName: "",
});

const rules = reactive({
  name: [
    { required: true, message: "请输入的门诊名称", trigger: "blur" },
    { min: 2, max: 30, message: "Length should be 2 to 30", trigger: "blur" },
  ],
  address: [
    { required: true, message: "请输入的地址信息", trigger: "blur" },
    { min: 2, max: 50, message: "Length should be 2 to 50", trigger: "blur" },
  ],
  hosId: [
    {
      required: true,
      message: "请选择归属医院",
      trigger: "change",
    },
  ],
  depId: [
    {
      required: true,
      message: "请选择归属一级科室",
      trigger: "change",
    },
  ],
});

// ?添加科室
const handleAddDepTwoClick = () => {
  modalTitle.value = "添加门诊";
  isShowModal.value = true;
};

// ?添加科室/编辑科室信息取消按钮回调
const handleFormCancel = () => {
  resetFormModal();

  isShowModal.value = false;
};

// ?添加门诊/编辑门诊信息确认按钮回调
const handleFormConfirm = async () => {
  const valid = await ruleFormRef.value.validate();

  if (valid && modalTitle.value === "添加门诊") {
    try {
      const res = await addDepartmentTwoFetch({
        ...formModel,
      });

      if (res.code === 1) {
        isShowModal.value = false;
        depTwoStore.changeDepTwoListAction();

        resetFormModal();
        useGlobalTips("success", "添加成功");
        return;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return useGlobalTips("error", error.message);
    }
  } else if (valid && modalTitle.value === "编辑门诊信息") {
    try {
      const res = await updateDepartmentTwoFetch(
        {
          ...formModel,
        },
        currentEditId.value
      );

      if (res.code === 1) {
        isShowModal.value = false;
        depTwoStore.changeDepTwoListAction();

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
  modalTitle.value = "编辑门诊信息";
  formModel.name = v.depTwoName;
  formModel.state = v.state;
  formModel.hosId = v.hosId;
  formModel.depId = v.depId;
  formModel.address = v.address;
  currentEditId.value = v.id;
  isShowModal.value = true;

  deponeStore.changeDeponeListAction(v.hosId);
};

// ?表格column的删除
const handleDeleteTableColumn = async (v) => {
  try {
    const res = await removeDepartmentTwoFetch(v.id);

    if (res.code === 1) {
      depTwoStore.changeDepTwoListAction();
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
  formModel.depId = "";
  formModel.address = "";

  currentEditId.value = "";
};

// *处理医院变化请求一级科室列表
const handleHosSelectChange = (v) => {
  deponeStore.changeDeponeListAction(v);
};

// ?搜索表单的重置
const handleFormReset = () => {};

const handleSearchClick = () => {};

// ?生命周期回调
onMounted(async () => {
  manageStore.changeHospitalListAction();
  depTwoStore.changeDepTwoListAction();
});
</script>

<style lang="less" scoped>
.department-two-wrap {
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
