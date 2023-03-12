<template>
  <div class="duty-manage-wrap">
    <div class="search-wrapper">
      <app-search
        class="search-content"
        @formReset="handleFormReset"
        @searchClick="handleSearchClick"
      >
        <template #search>
          <el-form-item label="医院名称" prop="hosId">
            <el-select v-model.number="searchModel.hosId" placeholder="请选择医院">
              <template v-for="hos in hospitalList" :key="hos.id">
                <el-option :label="hos.name" :value="hos.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="一级科室" prop="depId">
            <el-input
              v-model="searchModel.depName"
              clearable
              placeholder="请输入一级科室名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="二级门诊" prop="depTwoId">
            <el-input
              v-model="searchModel.depTwoName"
              clearable
              placeholder="请输入二级门诊"
            ></el-input>
          </el-form-item>
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
        title="排班列表"
        btn-title="添加排班"
        @addBtnClick="handleAddDutyClick"
      ></table-header>
      <app-table
        :table-list="[]"
        :table-data="[]"
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
            <el-form-item label="医院名称" prop="hosId">
              <el-select
                v-model.number="formModel.hosId"
                placeholder="请选择医院"
                @change="handleSelectHosChange"
              >
                <template v-for="hos in hospitalList" :key="hos.id">
                  <el-option :label="hos.name" :value="hos.id"></el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="一级科室" prop="depId">
              <el-select
                v-model.number="formModel.depId"
                :placeholder="!formModel.hosId ? '请先选择医院' : '请选择科室'"
                :disabled="!formModel.hosId"
                @change="handleSelectDepChange"
              >
                <template v-for="dep in deponeList" :key="dep.id">
                  <el-option :label="dep.depName" :value="dep.id"></el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="二级门诊" prop="depTwoId">
              <el-select
                v-model.number="formModel.depTwoId"
                :placeholder="!formModel.depId ? '请先选择一级科室' : '请选择门诊'"
                :disabled="!formModel.depId || !formModel.hosId"
                @change="handleSelectDepTwoChange"
              >
                <template v-for="depTwo in depTwoList" :key="depTwo.id">
                  <el-option :label="depTwo.depTwoName" :value="depTwo.id"></el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="医生姓名" prop="doctorId">
              <el-select
                v-model.number="formModel.doctorId"
                :placeholder="!formModel.depTwoId ? '请先选择二级门诊' : '请选择医生'"
                :disabled="!formModel.depId || !formModel.hosId || !formModel.depTwoId"
              >
                <template v-for="doctor in doctorList" :key="doctor.id">
                  <el-option :label="doctor.doctorName" :value="doctor.id"></el-option>
                </template>
              </el-select>
            </el-form-item>
            <el-form-item label="排班日期" prop="time">
              <el-date-picker
                v-model="formModel.time"
                type="date"
                placeholder="请选择排班日期"
                size="default"
                @change="handleDateChange"
              />
            </el-form-item>
            <el-form-item label="上午状态">
              <el-switch
                v-model="formModel.mState"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
            <el-form-item label="下午状态">
              <el-switch
                v-model="formModel.aState"
                :active-value="1"
                :inactive-value="0"
              />
            </el-form-item>
            <el-form-item label="上午排班" v-if="formModel.mState" prop="mTime">
              <el-time-picker
                v-model="formModel.mTimeSegment"
                is-range
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                @change="handleMorningTimeChange"
              />
            </el-form-item>
            <el-form-item label="上午号源数量" v-if="formModel.mState">
              <el-input-number v-model.number="formModel.mNum" :min="0" :step="1" />
            </el-form-item>
            <el-form-item label="下午排班" v-if="formModel.aState" prop="aTime">
              <el-time-picker
                v-model="formModel.aTimeSegment"
                is-range
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                @change="handleAfterTimeChange"
              />
            </el-form-item>
            <el-form-item label="下午号源数量" v-if="formModel.aState">
              <el-input-number v-model.number="formModel.aNum" :min="0" :step="1" />
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
import useDoctorStore from "@/store/modules/section/doctor";

import { useGlobalTips, formatDateTwo, formatDateThree } from "@/utils/index";
import {
  addDoctorDutyFetch,
  removeDoctorDutyFetch,
  updateDoctorDutyFetch,
} from "@/api/modules/register/duty";

import AppSearch from "@/components/common/app-search/index.vue";
import TableHeader from "@/components/common/table-header/index.vue";
import AppTable from "@/components/common/app-table/index.vue";
import AppFormModal from "@/components/common/app-form-modal/index.vue";

// ?数据状态
const manageStore = useManageStore();
const deponeStore = useDeponeStore();
const depTwoStore = useDepTwoStore();
const doctorStore = useDoctorStore();
const { hospitalList } = storeToRefs(manageStore);
const { deponeList } = storeToRefs(deponeStore);
const { depTwoList } = storeToRefs(depTwoStore);
const { doctorList } = storeToRefs(doctorStore);

const isShowModal = ref(false);
const modalTitle = ref("添加排班");
const ruleFormRef = ref();
const currentEditId = ref();

const formModel = reactive({
  hosId: "",
  depId: "",
  depTwoId: "",
  doctorId: "",
  mState: 1,
  mTimeSegment: "",
  mNum: 0,
  aState: 1,
  aTimeSegment: "",
  aNum: 0,
});

const searchModel = reactive({
  hosId: "",
  depName: "",
  depTwoName: "",
  doctorName: "",
  jobId: "",
  state: "",
  regMoney: "",
});

const rules = reactive({
  doctorId: [
    {
      required: true,
      message: "请选择医生",
      trigger: "change",
    },
  ],
  hosId: [
    {
      required: true,
      message: "请选择医院",
      trigger: "change",
    },
  ],
  depId: [
    {
      required: true,
      message: "请选择一级科室",
      trigger: "change",
    },
  ],
  depTwoId: [
    {
      required: true,
      message: "请选择二级门诊",
      trigger: "change",
    },
  ],
  time: [
    {
      type: "date",
      required: true,
      message: "请选择排班日期",
      trigger: "change",
    },
  ],
  // mTime: [
  //   {
  //     required: true,
  //     validator: (rules, v, callback) => {
  //       if (formModel.mState && !formModel.mTimeSegment) {
  //         return callback("选择上午排班时间段");
  //       }
  //     },
  //   },
  // ],
  // aTime: [
  //   {
  //     required: true,
  //     validator: (rules, v, callback) => {
  //       if (formModel.aState && !formModel.aTimeSegment) {
  //         return callback("选择下午排班时间段");
  //       }
  //     },
  //   },
  // ],
});

// ?添加医生排班
const handleAddDutyClick = () => {
  modalTitle.value = "添加排班";
  isShowModal.value = true;
};

// ?添加医生排班/编辑医生排班信息取消按钮回调
const handleFormCancel = () => {
  resetFormModal();
  isShowModal.value = false;
};

// ?添加医生排班/编辑医生排班信息确认按钮回调
const handleFormConfirm = async () => {
  const valid = await ruleFormRef.value.validate();
  if (!formModel.mState && !formModel.aState) {
    return useGlobalTips("warning", "应至少选择上午或者下午某个时间段排班");
  }

  if (valid && modalTitle.value === "添加排班") {
    try {
      const res = await addDoctorDutyFetch({
        ...formModel,
        mSurplus: formModel.mNum,
        aSurplus: formModel.aNum,
      });

      if (res.code === 1) {
        isShowModal.value = false;

        resetFormModal();
        useGlobalTips("success", "添加成功");
        return;
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return useGlobalTips("error", error.message);
    }
  } else if (valid && modalTitle.value === "编辑排班信息") {
    try {
      const res = await updateDoctorDutyFetch(
        {
          ...formModel,
          mSurplus: formModel.mNum,
          aSurplus: formModel.aNum,
        },
        currentEditId.value
      );

      if (res.code === 1) {
        isShowModal.value = false;

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
  modalTitle.value = "编辑排班信息";
  formModel.hosId = v.hosId;
  formModel.depId = v.depId;
  formModel.depTwoId = v.depTwoId;
  formModel.doctorId = v.doctorId;
  currentEditId.value = v.id;

  isShowModal.value = true;
};

// ?表格column的删除
const handleDeleteTableColumn = async (v) => {
  try {
    const res = await removeDoctorDutyFetch(v.id);
    if (res.code === 1) {
      useGlobalTips("success", `删除成功`);
    } else {
      throw new Error(res.message);
    }
  } catch (error) {
    return useGlobalTips("error", error.message);
  }
};

// *将formModal值置空
const resetFormModal = () => {
  formModel.hosId = "";
  formModel.depId = "";
  formModel.depTwoId = "";
  formModel.doctorId = "";
  formModel.aNum = 0;
  formModel.aTimeSegment = "";
  formModel.aState = 1;
  formModel.mNum = 0;
  formModel.mTimeSegment = "";
  formModel.mState = 1;
  formModel.time = "";

  currentEditId.value = "";
};

// *处理选择医院
const handleSelectHosChange = (v) => {
  deponeStore.changeDeponeListAction(v);
};

// *处理选择一级科室
const handleSelectDepChange = (v) => {
  depTwoStore.changeDepTwoListAction({ hosId: formModel.hosId, depId: v.id });
};

// *处理选择二级门诊
const handleSelectDepTwoChange = (v) => {
  doctorStore.changeDoctorListAction({
    hosId: formModel.hosId,
    depId: formModel.depId,
    depTwoId: v,
  });
};

// *处理选择时间格式化
const handleDateChange = (v) => {
  formModel.time = `${formatDateThree(v)}`;
};

const handleMorningTimeChange = (v) => {
  formModel.mTimeSegment = `${formatDateTwo(v[0])}-${formatDateTwo(v[1])}`;
};

const handleAfterTimeChange = (v) => {
  formModel.aTimeSegment = `${formatDateTwo(v[0])}-${formatDateTwo(v[1])}`;
};

// ?搜索表单的重置
const handleFormReset = () => {};

const handleSearchClick = () => {};

// ?生命周期回调
onMounted(async () => {
  manageStore.changeHospitalListAction();
});
</script>

<style lang="less" scoped>
.duty-manage-wrap {
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
