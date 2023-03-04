import {
  defineStore
} from 'pinia'
// *defineStore创建的容器是一个reactive响应式对象，不是ref,如果要转为ref响应式对象，需要通过storeToRefs()

const mainStore = defineStore('main', {
  state() {
    return {
      userInfo: {
        name: 'coder'
      }
    }
  },
  getters:{
    
  },
  actions: {

  }
})

export default mainStore