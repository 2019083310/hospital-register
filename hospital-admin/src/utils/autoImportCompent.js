// 按需引入组件
import {
  ElTable,
  ElTableColumn,
  ElButton,
  ElMenu,
  ElSubMenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElCard,
  ElForm,
  ElFormItem,
  ElInput,
  ElSelect,
  ElOption,
  ElPopconfirm,
  ElTooltip,
  ElMessageBox,
  ElMessage,
  ElTreeV2,
  ElSwitch,
  ElTimeSelect,
  ElContainer,
  ElAside,
  ElMain,
  ElHeader,
  ElImage,
  ElUpload
} from 'element-plus'

const cpnList = [ElTable, ElButton, ElMenu, ElSubMenu, ElMenuItem, ElMenuItemGroup, ElCard,
  ElTableColumn, ElForm, ElFormItem, ElSelect, ElOption, ElInput, ElPopconfirm, ElTooltip, ElTreeV2,
  ElSwitch, ElTimeSelect, ElContainer, ElAside, ElMain, ElHeader,ElImage,ElUpload
]
// ?注册全局组件
const autoImportComponent = (app) => {
  for (const cpn of cpnList) {
    app.component(cpn)
  }
}

// ?注册ElMessage ElMessageBox
export const registerMessageCpn = (app) => {
  app.use(ElMessage)
  app.use(ElMessageBox)
}

export default autoImportComponent