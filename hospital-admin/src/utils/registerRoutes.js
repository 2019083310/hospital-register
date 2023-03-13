// ?动态添加路由工具函数
import router from '@/router/index'

// !vite中动态导入不能使用模板字符串，必须借助import.meta.glob()来使用模板字符串
const modules =
  import.meta.glob('@/views/**/*.vue')
// *等价于 这样就实现了动态引入组件(懒加载)
// const modules={
// 'name(以.vue结尾的文件名)':()=>import('path')
// }

// *加了一个{eager:true}属性之后，就变成了引入文件内容
const routerModules =
  import.meta.glob('@/router/**/*.js', {
    eager: true
  })

// *动态添加路由
export const addRoutes = (routes, parentName) => {
  for (const route of routes) {
    const obj = {}
    if (route.level !== 1) {
      obj.path = route?.url
      obj.name = route?.url.slice(1).replace(/\//, '-')
      // /* @vite-ignore */
      // *vite动态引入组件的方式
      obj.component = modules[`/src/views/${route.url.slice(1)}/index.vue`]
      // *webpack动态引入组件的方式
      // obj.component = (resolve) => require([`@/views${route.url}/index.vue`],resolve)
      parentName ? router.addRoute(parentName, obj) : router.addRoute(obj)
    }

    if (route.children && route.children.length) {
      addRoutes(route.children, 'home')
    }
  }
}

// todo 1.注册路由，用户切换账号由需要移除localStorage中的内容 通过直接读取menu文件添加route
export const registerRoutes = () => {
  // const mapList = JSON.parse(localStorage.getItem('menuList'))
  // const menuArr=listToArray(mapList)

  // return new Promise((resolve, reject) => {
  //   if (menuArr.length) {
  //     addRoutes(menuArr, 'home')
  //     resolve(true)
  //   } else {

  //   }
  // })
}

// todo 2.注册路由通过动态读取文件 添加路由文件导出的内容
export function mapMenusToRoutes(userMenus) {
  const routes = []

  // 1.先去加载默认所有的routes
  const allRoutes = []

  Object.keys(routerModules).forEach((key) => {
    if (`@/${key.slice(5)}`.startsWith('@/router/index')) return
    // !webpack中可以这样使用，vite中使用import.meta.glob('*',{eager:true})
    // const route = import(`@/${key.slice(5)}`)

    const route = routerModules[`/src/${key.slice(5)}`]
    allRoutes.push(route.default)
  })
  // console.log(allRoutes)

  // 2.根据菜单获取需要添加的routes
  const _recurseGetRoute = (menus) => {
    for (const menu of menus) {
      if (menu.code === 1 && menu.result && menu.result[0]?.level === 2) {
        const route = allRoutes.find((route) => route.path === menu.result[0]?.url)
        if (route) routes.push(route)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

// *将列表转为树形结构
export const listToArray = (mapList) => {
  const menuObj = {}
  for (const data of mapList) {
    if (data.code === 1) {
      const item = data.result[0]

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
  }

  const menuArr = Object.values(menuObj)
  return menuArr
}

export const resetRouter=()=>{
  const mapList = JSON.parse(localStorage.getItem("menuList"));

  const routes = mapMenusToRoutes(mapList);

  routes.forEach((route) => {
    router.addRoute("basicMain", route);
  });
}
