import {
  defineStore
} from 'pinia'

import {
  getRoleListFetch
} from '@/api/modules/system/role'
import {
  useGlobalTips
} from '@/utils'

const useRoleStore = defineStore('role', {
  state() {
    return {
      roleList: []
    }
  },
  getters: {},
  actions: {
    async changeRoleListAction() {
      try {
        const res = await getRoleListFetch()

        if (res.code === 1) {
          this.roleList = res.result
        } else {
          throw new Error(res.message)
        }
      } catch (error) {
        return useGlobalTips('error', error.message)
      }
    }
  }
})

export default useRoleStore