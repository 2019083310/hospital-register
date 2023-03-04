import {
  ElTable,
  ElButton
} from 'element-plus'

const cpnList = [ElTable, ElButton]

const autoImportComponent = (app) => {
  for (const cpn of cpnList) {
    app.component(cpn)
  }
}

export default autoImportComponent