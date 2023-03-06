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
  ElPopconfirm
} from 'element-plus'

const cpnList = [ElTable, ElButton, ElMenu, ElSubMenu, ElMenuItem, ElMenuItemGroup, ElCard,
  ElTableColumn, ElForm, ElFormItem, ElSelect, ElOption, ElInput, ElPopconfirm
]
const autoImportComponent = (app) => {
  for (const cpn of cpnList) {
    app.component(cpn)
  }
}

export default autoImportComponent