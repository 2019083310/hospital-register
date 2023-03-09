<template>
  <div class="manage-wrap">
    <div class="search-wrapper">
      <app-search
        class="search-content"
        @formReset="handleFormReset"
        @searchClick="handleSearchClick"
      >
        <template #search>
          <!-- <el-form> -->
          <el-form-item label="医院名称">
            <el-input
              v-model="searchModel.name"
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
          <el-form-item label="医院区域">
            <el-select
              v-model.number="searchModel.field"
              placeholder="请选择医院归属区域"
            >
              <template v-for="field in fieldList" :key="field.id">
                <el-option :label="field.name" :value="field.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="医院状态">
            <el-select v-model.number="searchModel.open" placeholder="请选择医院状态">
              <el-option label="开放" value="1" />
              <el-option label="关闭" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="放号时间">
            <el-time-select
              v-model="searchModel.openTimeText"
              start="08:00"
              step="00:15"
              end="18:00"
              placeholder="请选择每天放号时间"
            />
          </el-form-item>
          <!-- </el-form> -->
        </template>
      </app-search>
    </div>
    <el-card class="box-card">
      <table-header
        title="医院列表"
        btn-title="添加医院"
        @addBtnClick="handleAddManageClick"
      ></table-header>
      <app-table
        :table-list="HospitalTableList"
        :table-data="hospitalList"
        :expand-all="false"
        :is-show-index-column="true"
        @editTableData="handleEditTableColumn"
        @deleteTableData="handleDeleteTableColumn"
        @openStatusChange="handleHosStatusChange"
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
            <el-form-item label="归属区域" prop="field">
              <el-select
                v-model.number="formModel.field"
                placeholder="请选择医院归属区域"
              >
                <template v-for="field in fieldList" :key="field.id">
                  <el-option :label="field.name" :value="field.id"></el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="open">
              <el-switch v-model="formModel.open" :active-value="1" :inactive-value="0" />
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
            <el-form-item label="医院logo" prop="picture">
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
import {
  addHospitalFetch,
  removeHosLogoFetch,
  removeHospitalFetch,
  updateHospitalInfoFetch,
} from "@/api/modules/section/manage";
import { useGlobalTips } from "@/utils/index";

// import { manageTableData } from "@/test/index";
import HospitalTableList from "@/assets/data/table-hospital.json";

import AppSearch from "@/components/common/app-search/index.vue";
import TableHeader from "@/components/common/table-header/index.vue";
import AppTable from "@/components/common/app-table/index.vue";
import AppFormModal from "@/components/common/app-form-modal/index.vue";

// ?数据状态
const manageStore = useManageStore();
const { fieldList, hospitalList } = storeToRefs(manageStore);

const isShowModal = ref(false);
const modalTitle = ref("添加医院");
const ruleFormRef = ref();
const pictureList = ref([]);
const currentEditId = ref();

const formModel = reactive({
  name: "",
  levelText: "",
  field: "",
  open: 1,
  openTimeText: "",
});

const searchModel = reactive({
  name: "",
  levelText: "",
  field: "",
  open: "",
  openTimeText: "",
});

// ?验证logo
const customValidateLogoRule = async (rule, value, callback) => {
  if (!pictureList.value.length) {
    callback(new Error("请上传医院logo"));
  }
};

const rules = reactive({
  name: [
    { required: true, message: "请输入合法的医院名称", trigger: "blur" },
    { min: 3, max: 10, message: "Length should be 3 to 10", trigger: "blur" },
  ],
  levelText: [
    {
      required: true,
      message: "请选择医院等级",
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
      required: true,
      message: "请选择一个合适的放号时间",
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

// ?添加医院
const handleAddManageClick = () => {
  modalTitle.value = "添加医院";
  isShowModal.value = true;
};

// ?添加医院/编辑医院信息取消按钮回调
const handleFormCancel = () => {
  if (modalTitle.value === "编辑医院信息" && !pictureList.value.length) {
    return useGlobalTips("error", "医院logo不能为空,请上传图片");
  }
  resetFormModal();

  isShowModal.value = false;
};

// ?添加医院/编辑医院信息确认按钮回调
const handleFormConfirm = async () => {
  const valid = await ruleFormRef.value.validate();
  if (!pictureList.value.length) return;

  if (valid && modalTitle.value === "添加医院") {
    try {
      const res = await addHospitalFetch({
        ...formModel,
        picture: pictureList.value[0]?.url,
      });

      if (res.code === 1) {
        isShowModal.value = false;
        manageStore.changeHospitalListAction();
        resetFormModal();

        useGlobalTips("success", "添加成功");
        return;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return useGlobalTips("error", error.message);
    }
  } else if (valid && modalTitle.value === "编辑医院信息") {
    try {
      const res = await updateHospitalInfoFetch(
        {
          ...formModel,
          picture: pictureList.value[0]?.url,
        },
        currentEditId.value
      );

      if (res.code === 1) {
        isShowModal.value = false;
        manageStore.changeHospitalListAction();
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
  modalTitle.value = "编辑医院信息";
  formModel.name = v.name;
  formModel.levelText = v.levelText;
  formModel.open = v.open;
  formModel.field = v.fieldId;
  formModel.openTimeText = v.openTimeText;
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
    const res = await removeHospitalFetch(v.id);

    if (res.code === 1) {
      manageStore.changeHospitalListAction();

      useGlobalTips("success", `删除${v.name}成功`);
    } else {
      throw new Error(res.message);
    }
  } catch (error) {
    return useGlobalTips("error", error.message);
  }
};

// ?医院状态改变
const handleHosStatusChange = (status) => {};

// *将formModal值置空
const resetFormModal = () => {
  formModel.name = "";
  formModel.levelText = "";
  formModel.field = "";
  formModel.openTimeText = "";
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

// *处理时间选择
// const handleTimeSelectBlur = (v) => {
// console.log(formModel.openTimeText);
// };

// ?搜索表单的重置
const handleFormReset = () => {};

const handleSearchClick = () => {};

// ?生命周期回调
onMounted(async () => {
  manageStore.changeFieldListAction();
  manageStore.changeHospitalListAction();
});
</script>

<style lang="less" scoped>
.manage-wrap {
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
