import Mock from 'mockjs'

// 人员搜索
Mock.mock('/v1.0/xxnyjyzt/getXxjyztList', 'post', {
  code: 0,
  message: '操作成功',
  data: [
    {
      // objectid: 5,
      id: 5,
      // cbfmc: '陈亚亚',
      fzr: '陈亚亚',
      // cbfzjhm: '1232131213',
      zjhm: '1232131213',
      cbfdz: '123'
    }
  ]
})

Mock.mock('/v1.0/sysDict/list', 'post', {
  code: 0,
  message: '操作成功',
  data: [
    {
      dictName: '作物分布-2023小麦',
      value: 'zwfb_341282_2023_summer'
    },
    {
      dictName: '种植结构变化-2022玉米',
      value: 'zzjgbh_341282_2022_autumn'
    }
  ]
})

Mock.mock('/v1.0/table/getYear', 'post', {
  code: 0,
  message: '操作成功',
  data: ['2023']
})

// 人员搜索-列表
Mock.mock('/v1.0/xxnyjyzt/getXxjyztListDetail', 'post', {
  code: 0,
  message: '操作成功',
  data: {
    dkArea: 133.734492622,
    dkNum: 108,
    fzr: '陈亚亚',
    id: 5,
    tgmj: 0,
    zjhm: '1232131213',
    dkSpatials: {
      features: [
        {
          geometry: {
            coordinates: [
              [
                [
                  [115.335268745, 33.117418782],
                  [115.335267227, 33.117381923],
                  [115.333729183, 33.117272451],
                  [115.333724974, 33.117310634],
                  [115.335268745, 33.117418782]
                ]
              ]
            ],
            type: 'MultiPolygon'
          },
          id: '85349',
          type: 'Feature',
          properties: {
            dkbm: '3412821072110700067',
            dkmc: '庄北地',
            dkmj: 0.9,
            lzxglx: '',
            mj: 0,
            ygcl: '',
            zwzs: '',
            zzjgName: '',
            zzzw: '小麦'
          }
        },
        {
          geometry: {
            coordinates: [
              [
                [
                  [115.333844325, 33.11534022],
                  [115.331415152, 33.114950197],
                  [115.331405673, 33.114978991],
                  [115.333835306, 33.11536837],
                  [115.333844325, 33.11534022]
                ]
              ]
            ],
            type: 'MultiPolygon'
          },
          id: '85990',
          properties: {
            dkmc: '西地',
            dkbm: '3412821072110600144',
            dkmj: 1.13,
            zzzw: '小麦',
            mj: 0,
            zwzs: '',
            ygcl: ''
          },
          type: 'Feature'
        }
      ]
    }
  }
})
