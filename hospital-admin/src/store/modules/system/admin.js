import {
  defineStore
} from 'pinia'

import {
  useGlobalTips
} from '@/utils'
import {
  getAllAdminListFetch
} from '@/api/modules/system/admin'

const useAdminStore = defineStore('admin', {
  state() {
    return {
      adminList: []
    }
  },
  getters: {},
  actions: {
    async changeAdminListAction() {
      try {
        const res = await getAllAdminListFetch()

        if (res.code === 1) {
          this.adminList = res.result
        } else {
          throw new Error(res.message)
        }
      } catch (error) {
        return useGlobalTips('error', error.message)
      }
    }
  }
})

export default useAdminStore
