import {
  defineStore
} from 'pinia'

import {
  getAllDepOneListFetch
} from '@/api/modules/section/depone'
import {
  useGlobalTips
} from '@/utils'

const useDeponeStore = defineStore('depone', {
  state() {
    return {
      deponeList: []
    }
  },
  getters: {},
  actions: {
    async changeDeponeListAction(payload) {
      try {
        const res = await getAllDepOneListFetch(payload)

        if (res.code === 1) {
          this.deponeList = res.result
        } else {
          throw new Error(res.message)
        }
      } catch (error) {
        return useGlobalTips('error', error.message)
      }
    }
  }
})

export default useDeponeStore
