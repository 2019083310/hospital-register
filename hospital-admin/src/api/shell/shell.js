import {
  addHospitalFetch
} from "../modules/section/manage"

const shell = () => {
  const arr = [{
      "code": "227",
      "name": "北京水利医院",
      "picture": "//img.114yygh.com/image/image-003/23177434785924892.png",
      "levelText": "二级甲等",
      "openTimeText": "10:15",
      "maintain": false,
      "distance": null
    }, {
      "code": "232",
      "name": "北京中医医院延庆医院",
      "picture": "//img.114yygh.com/image/image-003/23177182457187149.png",
      "levelText": "二级甲等",
      "openTimeText": "10:00",
      "maintain": false,
      "distance": null
    }, {
      "code": "234",
      "name": "北京市石景山区中医医院",
      "picture": "//img.114yygh.com/image/image-003/23178682703929501.png",
      "levelText": "二级合格",
      "openTimeText": "10:15",
      "maintain": false,
      "distance": null
    },
    {
      "code": "275",
      "name": "北京市东城区妇幼保健计划生育服务中心（北京市东城区妇幼保健院北院区）",
      "picture": "//img.114yygh.com/image/image-003/23177381949988361.png",
      "levelText": "二级甲等",
      "openTimeText": "10:00",
      "maintain": false,
      "distance": null
    }, {
      "code": "H08110013",
      "name": "北京市化工职业病防治院（北京市职业病防治研究院）",
      "picture": "//img.114yygh.com/image/image-003/3096336471186096.png",
      "levelText": "二级甲等",
      "openTimeText": "18:00",
      "maintain": false,
      "distance": null
    }, {
      "code": "H04152001",
      "name": "北京市西城区妇幼保健计划生育服务中心（北京市西城区妇幼保健院）",
      "picture": "//img.114yygh.com/image/image-003/27199299121996582.jpg",
      "levelText": "二级甲等",
      "openTimeText": "10:00",
      "maintain": false,
      "distance": null
    },
    {
      "code": "797",
      "name": "北京市西城区德胜社区卫生服务中心",
      "picture": "//img.114yygh.com/naja/hospital/797.jpg",
      "levelText": "一级",
      "openTimeText": "10:00",
      "maintain": false,
      "distance": null
    }, {
      "code": "1544",
      "name": "北京美中爱瑞肿瘤医院",
      "picture": "//img.114yygh.com/image/image-003/3531069447106185.png",
      "levelText": "三级",
      "openTimeText": "09:00",
      "maintain": false,
      "distance": null
    }, {
      "code": "1078",
      "name": "北京市门头沟区龙泉医院",
      "picture": "//img.114yygh.com/image/image-003/23177310044771430.png",
      "levelText": "二级合格",
      "openTimeText": "10:00",
      "maintain": false,
      "distance": null
    }, {
      "code": "1090",
      "name": "北京核工业医院西城院区",
      "picture": "//img.114yygh.com/image/image-003/23176170190302664.png",
      "levelText": "二级合格",
      "openTimeText": "10:00",
      "maintain": false,
      "distance": null
    }, {
      "code": "1097",
      "name": "北京市怀柔区第二医院",
      "picture": "//img.114yygh.com/image/image-003/23176980333329730.png",
      "levelText": "二级合格",
      "openTimeText": "10:00",
      "maintain": false,
      "distance": null
    }, {
      "code": "1099",
      "name": "北京市羊坊店医院",
      "picture": "//img.114yygh.com/image/image-003/25390640798929243.png",
      "levelText": "二级合格",
      "openTimeText": "10:00",
      "maintain": false,
      "distance": null
    },
    {
      "code": "1102",
      "name": "北京华佑精神康复医院",
      "picture": "//img.114yygh.com/image/image-003/31451974767423791.png",
      "levelText": "二级合格",
      "openTimeText": "10:00",
      "maintain": false,
      "distance": null
    }, {
      "code": "1547",
      "name": "北京市朝阳区妇幼保健院（北院区）",
      "picture": "//img.114yygh.com/image/image-003/17353871783781009.jpg",
      "levelText": "三级",
      "openTimeText": "10:00",
      "maintain": false,
      "distance": null
    }
  ]

  for (const list of arr) {
    list.open = 1
    if (list.levelText === '三级甲等') {
      list.levelText = 3
      list.field = 12
    } else if (list.levelText === '二级甲等') {
      list.levelText = 2
      list.field = 13
    } else if (list.levelText === '一级甲等') {
      list.levelText = 1
      list.field = 14
    } else {
      list.levelText = 3
      list.field = 15
    }

    list.picture = 'http:' + list.picture

    addHospitalFetch(list)
  }
}

export default shell