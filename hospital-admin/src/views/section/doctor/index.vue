<template>
  <div class="doctor-manage-wrap">
    <div class="search-wrapper">
      <app-search
        class="search-content"
        @formReset="handleFormReset"
        @searchClick="handleSearchClick"
      >
        <template #search>
          <el-form-item label="医生姓名">
            <el-input
              v-model="searchModel.doctorName"
              clearable
              placeholder="请输入医生姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="医生工号">
            <el-input
              v-model="searchModel.jobId"
              clearable
              placeholder="请输入医生工号"
            ></el-input>
          </el-form-item>
          <el-form-item label="医生状态">
            <el-select v-model.number="searchModel.state" placeholder="请选择医院状态">
              <el-option label="开放" value="1" />
              <el-option label="关闭" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="医生诊断费用">
            <el-input
              v-model.number="searchModel.regMoney"
              clearable
              placeholder="请输入医生诊断费用"
            ></el-input>
          </el-form-item>
        </template>
      </app-search>
    </div>
    <el-card class="box-card">
      <table-header
        title="医生列表"
        btn-title="添加医生"
        @addBtnClick="handleAddDoctorClick"
      ></table-header>
      <app-table
        :table-list="DoctorTableList"
        :table-data="doctorList"
        :expand-all="false"
        :is-show-index-column="true"
        @editTableData="handleEditTableColumn"
        @deleteTableData="handleDeleteTableColumn"
        @openStatusChange="handleDoctorStatusChange"
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
            <el-form-item label="医生姓名" prop="name">
              <el-input v-model="formModel.name" placeholder="请输入医生姓名" />
            </el-form-item>
            <el-form-item label="医生jobId" prop="jobId">
              <el-input v-model="formModel.jobId" placeholder="请输入医生工号" />
            </el-form-item>
            <el-form-item label="初始密码" prop="password">
              <el-input
                v-model="formModel.password"
                type="password"
                placeholder="请输入医生账号初始密码"
              />
            </el-form-item>
            <el-form-item label="归属医院" prop="hosId">
              <el-select
                v-model.number="formModel.hosId"
                placeholder="请选择归属医院"
                @change="handleSelectHosChange"
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
                @change="handleSelectDepChange"
              >
                <template v-for="dep in deponeList" :key="dep.id">
                  <el-option :label="dep.depName" :value="dep.id"></el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="归属二级门诊" prop="depTwoId" v-if="formModel.depId">
              <el-select
                v-model.number="formModel.depTwoId"
                placeholder="请选择归属医院二级门诊"
              >
                <template v-for="depTwo in depTwoList" :key="depTwo.id">
                  <el-option :label="depTwo.depTwoName" :value="depTwo.id"></el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="在职状态" prop="state">
              <el-switch
                v-model="formModel.state"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
            <el-form-item label="诊断价格" prop="regMoney">
              <el-input
                v-model.number="formModel.regMoney"
                placeholder="请输入医生出诊价格"
              />
            </el-form-item>
            <el-form-item label="职业宣言" prop="brief">
              <el-input v-model="formModel.brief" placeholder="请输入医生职业宣言" />
            </el-form-item>
            <el-form-item label="医生角色" prop="roleId">
              <el-select v-model.number="formModel.roleId" placeholder="请选择医生角色">
                <template v-for="role in roleList" :key="role.id">
                  <el-option
                    :label="role.name"
                    :value="role.id"
                    v-if="role.id > 5"
                  ></el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="医生证件照" prop="picture">
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

import useManageStore from "@/store/modules/section/manage";
import useDeponeStore from "@/store/modules/section/depone";
import useDepTwoStore from "@/store/modules/section/deptwo";
import useDoctorStore from "@/store/modules/section/doctor";
import useRoleStore from "@/store/modules/system/role";
import { useGlobalTips } from "@/utils/index";
import {
  addDoctorFetch,
  removeDoctorFetch,
  updateDoctorInfoFetch,
} from "@/api/modules/section/doctor";
import { removeHosLogoFetch } from "@/api/modules/section/manage";

import DoctorTableList from "@/assets/data/table-doctor-list.json";

import AppSearch from "@/components/common/app-search/index.vue";
import TableHeader from "@/components/common/table-header/index.vue";
import AppTable from "@/components/common/app-table/index.vue";
import AppFormModal from "@/components/common/app-form-modal/index.vue";

// ?数据状态
const manageStore = useManageStore();
const doctorStore = useDoctorStore();
const deponeStore = useDeponeStore();
const depTwoStore = useDepTwoStore();
const roleStore = useRoleStore();
const { hospitalList } = storeToRefs(manageStore);
const { doctorList } = storeToRefs(doctorStore);
const { deponeList } = storeToRefs(deponeStore);
const { depTwoList } = storeToRefs(depTwoStore);
const { roleList } = storeToRefs(roleStore);

const isShowModal = ref(false);
const modalTitle = ref("添加医生");
const ruleFormRef = ref();
const pictureList = ref([]);
const currentEditId = ref();

const formModel = reactive({
  name: "",
  jobId: "",
  password: "",
  hosId: "",
  depId: "",
  depTwoId: "",
  state: 1,
  regMoney: "",
  brief: "",
  roleId: "",
});

const searchModel = reactive({
  doctorName: "",
  jobId: "",
  state: "",
  regMoney: "",
});

// ?验证证件照是否上传
const customValidateLogoRule = async (rule, value, callback) => {
  if (!pictureList.value.length) {
    callback(new Error("请上传医生证件照"));
  }
};

const rules = reactive({
  name: [
    { required: true, message: "请输入医生真实姓名", trigger: "blur" },
    { min: 2, max: 10, message: "Length should be 2 to 10", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入账号初始密码", trigger: "blur" },
    { min: 8, max: 20, message: "Length should be 8 to 20", trigger: "blur" },
  ],
  jobId: [
    {
      required: true,
      message: "请输入医生工号",
      trigger: "blur",
    },
    { min: 1, max: 20, message: "Length should be 1 to 20", trigger: "blur" },
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
  roleId: [
    {
      required: true,
      message: "请选择要添加的医生角色",
      trigger: "change",
    },
  ],
  depTwoId: [
    {
      required: true,
      message: "请选择归属二级门诊",
      trigger: "change",
    },
  ],
  regMoney: [
    {
      required: true,
      message: "请输入医生出诊价格",
      trigger: "blur",
    },
  ],
  picture: [
    {
      required: true,
      validator: customValidateLogoRule,
    },
  ],
});

// ?添加医生
const handleAddDoctorClick = () => {
  modalTitle.value = "添加医生";
  isShowModal.value = true;
};

// ?添加医生/编辑医生信息取消按钮回调
const handleFormCancel = () => {
  if (modalTitle.value === "编辑医生信息" && !pictureList.value.length) {
    return useGlobalTips("error", "医生证件照不能为空,请上传图片");
  }

  resetFormModal();
  isShowModal.value = false;
};

// ?添加医生/编辑医生信息确认按钮回调
const handleFormConfirm = async () => {
  const valid = await ruleFormRef.value.validate();
  if (!pictureList.value.length) return;

  if (valid && modalTitle.value === "添加医生") {
    try {
      const res = await addDoctorFetch({
        ...formModel,
        picture: pictureList.value[0]?.url,
      });

      if (res.code === 1) {
        isShowModal.value = false;
        doctorStore.changeDoctorListAction();
        resetFormModal();

        useGlobalTips("success", "添加成功");
        return;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return useGlobalTips("error", error.message);
    }
  } else if (valid && modalTitle.value === "编辑医生信息") {
    try {
      const res = await updateDoctorInfoFetch(
        {
          ...formModel,
          picture: pictureList.value[0]?.url,
        },
        currentEditId.value
      );

      if (res.code === 1) {
        isShowModal.value = false;
        doctorStore.changeDoctorListAction();
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
  modalTitle.value = "编辑医生信息";
  formModel.name = v.doctorName;
  formModel.state = v.state;
  formModel.hosId = v.hosId;
  formModel.depId = v.depId;
  formModel.depTwoId = v.depTwoId;
  formModel.jobId = v.jobId;
  formModel.brief = v.brief;
  formModel.regMoney = v.regMoney;
  formModel.password = v.password;
  formModel.roleId = v.roleId;
  currentEditId.value = v.id;

  deponeStore.changeDeponeListAction(v.hosId);
  depTwoStore.changeDepTwoListAction({ hosId: v.hosId, depId: v.depId });
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
    const res = await removeDoctorFetch(v.id);

    if (res.code === 1) {
      doctorStore.changeDoctorListAction();

      useGlobalTips("success", `删除${v.doctorName}成功`);
    } else {
      throw new Error(res.message);
    }
  } catch (error) {
    return useGlobalTips("error", error.message);
  }
};

// ?医生状态改变
const handleDoctorStatusChange = (status) => {};

// *将formModal值置空
const resetFormModal = () => {
  formModel.name = "";
  formModel.jobId = "";
  formModel.password = "";
  formModel.hosId = "";
  formModel.depId = "";
  formModel.depTwoId = "";
  formModel.state = 1;
  formModel.regMoney = "";
  formModel.brief = "";
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

// *处理选择医院
const handleSelectHosChange = (v) => {
  deponeStore.changeDeponeListAction(v);
};

// *处理选择一级科室
const handleSelectDepChange = (v) => {
  depTwoStore.changeDepTwoListAction({ hosId: formModel.hosId, depId: v.id });
};

// ?搜索表单的重置
const handleFormReset = () => {};

const handleSearchClick = () => {};

// ?生命周期回调
onMounted(async () => {
  doctorStore.changeDoctorListAction();
  roleStore.changeRoleListAction();
  manageStore.changeHospitalListAction();
});
</script>

<style lang="less" scoped>
.doctor-manage-wrap {
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
