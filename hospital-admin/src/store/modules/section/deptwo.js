import {
  defineStore
} from 'pinia'

import {
  useGlobalTips
} from '@/utils'
import {
  getAllDepTwoListFetch
} from '@/api/modules/section/deptwo'

const useDepTwoStore = defineStore('deptwo', {
  state() {
    return {
      depTwoList: []
    }
  },
  getters: {},
  actions: {
    async changeDepTwoListAction(payload) {
      try {
        const res = await getAllDepTwoListFetch(payload)

        if (res.code === 1) {
          this.depTwoList = res.result
        } else {
          throw new Error(res.message)
        }
      } catch (error) {
        return useGlobalTips('error', error.message)
      }
    }
  }
})

export default useDepTwoStore
