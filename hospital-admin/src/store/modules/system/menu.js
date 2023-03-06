import {
  defineStore
} from "pinia"
import {
  getMenuList
} from "@/api/modules/system/menu"

const useMenuStore = defineStore('menu', {
  state() {
    return {
      menuList: []
    }
  },
  getters: {

  },
  actions: {
    async changeMenuListAction() {
      const {
        result
      } = await getMenuList()

      const menuObj = {}
      for (const item of result) {
        if (item.level === 1) {
          menuObj[item.key] = {
            ...item,
            children: []
          }
        } else if (item.level === 2) {
          menuObj[item.key]['children'].push(item)
        }
      }

      const list = Object.values(menuObj)

      this.menuList = list
    }
  }
})

export default useMenuStore