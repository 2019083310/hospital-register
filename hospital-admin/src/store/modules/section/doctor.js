import {
  defineStore
} from 'pinia'

import {
  useGlobalTips
} from '@/utils'
import {
  getAllDoctorListFetch
} from '@/api/modules/section/doctor'

const useDoctorStore = defineStore('doctor', {
  state() {
    return {
      doctorList: []
    }
  },
  getters: {},
  actions: {
    async changeDoctorListAction(payload) {
      try {
        const res = await getAllDoctorListFetch(payload)

        if (res.code === 1) {
          this.doctorList = res.result
        } else {
          throw new Error(res.message)
        }
      } catch (error) {
        return useGlobalTips('error', error.message)
      }
    }
  }
})

export default useDoctorStore
