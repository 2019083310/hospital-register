<template>
  <div class="login-wrap">
    <div class="content-wrap">
      <div class="login-left">
        <img src="@/assets/imgs/login_left.png" alt="" />
      </div>
      <div class="login-right">
        <h2 class="title">后台管理系统</h2>
        <ul class="tab-header">
          <li
            class="tab-header-item"
            @click="currentLog = 'doctor'"
            :style="{ color: currentLog === 'doctor' ? '#409eef' : '#333' }"
          >
            医生登录
          </li>
          <li
            class="tab-header-item"
            @click="currentLog = 'admin'"
            :style="{ color: currentLog === 'admin' ? '#409eef' : '#333' }"
          >
            管理员登录
          </li>
        </ul>
        <template v-if="currentLog === 'doctor'">
          <div class="tab-content">
            <el-input
              v-model="doctorFormModel.jobId"
              :suffix-icon="User"
              placeholder="请输入您的工号"
            />
            <el-input
              type="password"
              show-password
              :suffix-icon="Lock"
              v-model="doctorFormModel.password"
              placeholder="请输入密码"
            ></el-input>
            <div class="btn-control">
              <el-button :icon="CloseBold" @click="handleResetForm('doctor')">
                重置
              </el-button>
              <el-button :icon="User" type="primary" @click="handleLoginClick('doctor')"
                >登录</el-button
              >
            </div>
          </div>
        </template>
        <template v-if="currentLog === 'admin'">
          <div class="tab-content">
            <el-input
              v-model="adminFormModel.username"
              :suffix-icon="User"
              placeholder="请输入管理员账号"
              size="large"
            />
            <el-input
              type="password"
              show-password
              :suffix-icon="Lock"
              v-model="adminFormModel.password"
              placeholder="请输入密码"
            ></el-input>
            <div class="btn-control">
              <el-button :icon="CloseBold" @click="handleResetForm('admin')">
                重置
              </el-button>
              <el-button :icon="User" type="primary" @click="handleLoginClick('admin')"
                >登录</el-button
              >
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { User, Lock, CloseBold } from "@element-plus/icons-vue";

import { adminLoginFetch, doctorLoginFetch } from "@/api/modules/login";
import { getMenuList } from "@/api/modules/system/menu";
import { useGlobalTips, mapMenusToRoutes,resetRouter } from "@/utils";
import { concurrency } from "@/api/request/concurrency";

// ?组件状态
const router = useRouter();
const currentLog = ref("doctor");

const doctorFormModel = reactive({
  jobId: "",
  password: "",
});

const adminFormModel = reactive({
  username: "",
  password: "",
});

// ?重置表单
const handleResetForm = (type) => {
  if (type === "doctor") {
    doctorFormModel.jobId = "";
    doctorFormModel.password = "";
  } else {
    adminFormModel.username = "";
    adminFormModel.password = "";
  }
};

// ?登录
const handleLoginClick = async (type) => {
  if (type === "doctor") {
    if (!doctorFormModel.jobId || !doctorFormModel.password) {
      return useGlobalTips("warning", "账号或者密码信息不完善");
    }

    try {
      const res = await doctorLoginFetch(doctorFormModel);

      if (res.code === 1) {
        localStorage.setItem("token", JSON.stringify(res.data?.token));
        localStorage.setItem("menu", JSON.stringify(res.data?.menu));

        const arrFetch = res.data?.menu
          ?.slice(1, -1)
          ?.split(",")
          ?.map((v) => {
            return () => getMenuList(Number(v));
          });

        await concurrency(arrFetch, "menuList");

        resetRouter()

        router.push("/home");
        return useGlobalTips("success", "登录成功，欢迎光临");
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return useGlobalTips("error", error.message);
    }
  } else if (type === "admin") {
    if (!adminFormModel.username || !adminFormModel.password) {
      return useGlobalTips("warning", "账号或者密码信息不完善");
    }

    try {
      const res = await adminLoginFetch(adminFormModel);

      if (res.code === 1) {
        localStorage.setItem("token", JSON.stringify(res.data?.token));
        localStorage.setItem("menu", JSON.stringify(res.data?.menu));

        const arrFetch = res.data?.menu
          ?.slice(1, -1)
          ?.split(",")
          ?.map((v) => {
            return () => getMenuList(Number(v));
          });

        await concurrency(arrFetch, "menuList");

        resetRouter()
        // console.log(router.getRoutes())

        router.push("/home");
        return useGlobalTips("success", "登录成功，欢迎光临");
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return useGlobalTips("error", error.message);
    }
  }
};
</script>

<style lang="less" scoped>
.login-wrap {
  width: 100%;
  height: 100%;
  padding-top: 30px;

  // vue中使用vite打包工具对于图片的引入直接使用相对路径即可
  background: url("../../assets/imgs/login_bg.svg") no-repeat center;
  background-color: #eee;

  overflow-x: auto;
  overflow-y: auto;

  box-sizing: border-box;

  .content-wrap {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 96%;
    height: 94%;
    margin: 0 auto;
    min-height: 550px;
    min-width: 450px;
    padding: 0 50px;
    border-radius: 10px;

    box-sizing: border-box;

    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);

    .login-left {
      width: 800px;

      img {
        width: 100%;
        height: 100%;

        object-fit: cover;
      }
    }

    .login-right {
      width: 420px;
      border: 1px solid #eee;
      border-radius: 10px;

      background-color: #fff;
      box-shadow: 2px 3px 7px #0003;
      box-sizing: border-box;

      .title {
        padding-top: 20px;

        font-size: 30px;
        font-weight: 400;
        text-align: center;
        color: #34495e;
      }

      .tab-header {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 50px;
        padding: 10px 0;

        .tab-header-item {
          width: 50%;

          font-size: 16px;
          text-align: center;

          cursor: pointer;
        }
      }

      .tab-content {
        padding: 10px 45px 40px;

        :deep(.el-input) {
          height: 30px;
          margin-bottom: 30px;

          .el-input__wrapper {
            height: 40px;
          }
        }

        .btn-control {
          display: flex;
          justify-content: space-between;
          align-items: center;

          width: 100%;

          box-sizing: border-box;

          :deep(.el-button) {
            width: 150px;
            height: 40px;
            line-height: 40px;
            margin-top: 10px;

            border-radius: 10px;
          }
        }
      }
    }
  }
}
</style>
