import {
  defineStore
} from 'pinia'

import {
  getAllFieldFetch
} from '@/api/modules/section/manage'
import {
  useGlobalTips
} from '@/utils'

const useManageStore = defineStore('manage', {
  state() {
    return {
      fieldList: []
    }
  },
  getters: {},
  actions: {
    async changeFieldListAction() {
      try {
        const res = await getAllFieldFetch()

        if (res.code === 1) {
          this.fieldList = res.result
        } else {
          throw new Error(res.message)
        }
      } catch (error) {
        return useGlobalTips('error', error.message)
      }
    }
  }
})

export default useManageStore