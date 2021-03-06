const state = {
  /**
   * 权限
   */
  menu: null, // 菜单
  role: null, // 角色权限
  userInfo: null,
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param role
 * @param route
 */
// function hasPermission(role, route) {
//   if (route.meta && route.meta.role) {
//     return route.meta.role.indexOf(role) !== -1
//   } else {
//     return true
//   }
// }
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param role
 */
// function filterAsyncRouter(asyncRouterMap, role) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermission(role, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, role)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }

const mutations = {
  /*
  通过角色过滤出可展示的菜单
  如果是管理直接赋值
  否则过滤出符合角色的对应菜单
  目前每个用户只存在一种角色 如果业务不是如此需要修改**
  */
  filterRole(state, payload) {
    state.role = payload
    // state.menu = filterAsyncRouter(asyncRouterMap, payload)
  },
  // 登陆者信息
  userInfo(state, payload) {
    state.userInfo = payload
  },
}
export default {
  namespaced: true,
  state,
  // getters,
  // actions,
  mutations
}
