<template>
  <div class="menu-wrap">
    <div class="custom-box-card-wrapper">
      <table-header
        title="医院列表"
        btn-title="添加医院"
        @addBtnClick="handleAddMenuClick"
      ></table-header>
      <app-table
        :table-list="HospitalTableList"
        :table-data="manageTableData"
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
            <el-form-item label="医院名称" prop="name">
              <el-input v-model="formModel.name" placeholder="请输入医院名称" />
            </el-form-item>
            <el-form-item label="医院等级" prop="levelText">
              <el-select
                v-model.number="formModel.levelText"
                placeholder="请选择医院等级"
              >
                <el-option label="一级医院" value="1" />
                <el-option label="二级医院" value="2" />
                <el-option label="三级医院" value="3" />
              </el-select>
            </el-form-item>
            <el-form-item label="归属区域" prop="fatherMenu">
              <el-select v-model="formModel.field" placeholder="请选择医院归属区域">
                <template v-for="field in fieldList" :key="field.id">
                  <el-option :label="field.name" :value="field.id"></el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="delivery">
              <el-switch v-model="formModel.delivery" />
            </el-form-item>
            <el-form-item label="每天放号时间" prop="openTimeText">
              <el-time-select
                v-model="formModel.openTimeText"
                start="08:00"
                step="00:15"
                end="18:00"
                placeholder="请选择每天放号时间"
              />
            </el-form-item>
          </el-form>
        </template>
      </app-form-modal>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { storeToRefs } from "pinia";

import useManageStore from "@/store/modules/section/manage";
import { useGlobalTips } from "@/utils/index";

import { manageTableData } from "@/test/index";
import HospitalTableList from "@/assets/data/table-hospital.json";

import TableHeader from "@/components/common/table-header/index.vue";
import AppTable from "@/components/common/app-table/index.vue";
import AppFormModal from "@/components/common/app-form-modal/index.vue";

// ?数据状态
const manageStore = useManageStore();
const { fieldList } = storeToRefs(manageStore);

const isShowModal = ref(false);
const modalTitle = ref("添加医院");
const ruleFormRef = ref();

const formModel = reactive({
  name: "",
  levelText: "",
  field: "",
  delivery: true,
  openTimeText: "",
  picture: "",
});
const rules = reactive({
  name: [
    { required: true, message: "请输入合法的医院名称", trigger: "blur" },
    { min: 3, max: 10, message: "Length should be 3 to 10", trigger: "blur" },
  ],
  levelText: [
    {
      required: true,
      message: "请选择菜单等级",
      trigger: "change",
    },
  ],
  field: [
    {
      required: true,
      message: "请选择医院归属区域",
      trigger: "change",
    },
  ],
  openTimeText: [
    {
      type: "date",
      required: true,
      message: "请选择一个合适的放号时间",
      trigger: "change",
    },
  ],
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
const handleFormConfirm = async () => {};

// ?表格column的编辑
const handleEditTableColumn = async (v) => {};

// ?表格column的删除
const handleDeleteTableColumn = async (v) => {};

// *将formModal值置空
const resetFormModal = () => {};

// ?生命周期回调
onMounted(async () => {
  manageStore.changeFieldListAction();
});
</script>

<style lang="less" scoped>
.menu-wrap {
  width: 100%;
  .custom-box-card-wrapper {
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
