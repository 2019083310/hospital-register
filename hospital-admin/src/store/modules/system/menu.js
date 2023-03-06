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
          if (!menuObj[item.key]) {
            menuObj[item.key] = {
              ...item,
              children: []
            }
          } else {
            menuObj[item.key] = {
              ...item,
              ...menuObj[item.key]
            }
          }
        } else if (item.level === 2) {
          if (!menuObj[item.key]) {
            menuObj[item.key] = {
              children: []
            }
          }

          menuObj[item.key]['children'].push(item)
        }
      }

      const list = Object.values(menuObj)

      this.menuList = list
    }
  }
})

export default useMenuStore