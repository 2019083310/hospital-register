// ?模拟测试数据
export const menuTableData = [{
  id: 3,
  createTime: '2016-05-01',
  updateTime: '2016-05-01',
  name: '预约管理',
  url: '/register',
  level: "1",
  children: [{
      id: 31,
      name: '挂号列表',
      url: '/register/list',
      level: "2",
      createTime: '2016-05-01',
      updateTime: '2016-05-01',
    },
    {
      id: 32,
      name: '医生排班',
      url: '/register/doctor',
      level: "2",
      createTime: '2016-05-01',
      updateTime: '2016-05-01',
    },
  ],
}]