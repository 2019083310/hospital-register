import {
  ElTable,
  ElButton,
  ElMenu,
  ElSubMenu,
  ElMenuItemGroup,
  ElMenuItem,
  ElCard,
  ElTableColumn
} from 'element-plus'

const cpnList = [ElTable, ElButton, ElMenu, ElSubMenu, ElMenuItem, ElMenuItemGroup, ElCard, ElTableColumn]

const autoImportComponent = (app) => {
  for (const cpn of cpnList) {
    app.component(cpn)
  }
}

export default autoImportComponent