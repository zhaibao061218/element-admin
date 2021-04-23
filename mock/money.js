const Mock = require('mockjs')

module.exports = [
  {
    url: '/vue-element-admin/money/DataOne',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: Mock.mock({
          'status': 200,
          "data": [
            {
              name: "全部",
              id: 1,
            },
            {
              name: "冻结",
              id: 2,
            },
            {
              name: "返现",
              id: 3,
            },
            {
              name: "解冻",
              id: 4,
            },
            {
              name: "充值",
              id: 5,
            },
            {
              name: "续费",
              id: 6,
            },
            {
              name: "服务费",
              id: 7,
            },
            {
              name: "佣金",
              id: 8,
            },
            {
              name: "邀请奖励",
              id: 9,
            },
            {
              name: "被邀请奖励",
              id: 10,
            },
            {
              name: "索评",
              id: 11,
            },
            {
              name: "提现",
              id: 12,
            },
            {
              name: "退款",
              id: 13,
            },
            {
              name: "兑换",
              id: 14,
            }]
        })
      }
    }
  },
  {
    url: '/vue-element-admin/money/redemptionCode',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: "验证码通过"
      }
    }
  },
  {
    url: '/vue-element-admin/money/chongzhi',
    type: 'get',
    response: _ => {
      const { moneyNumber } = config.query;
      if (isNaN(moneyNumber)) {

      }
      return {
        code: 20000,
        data: "充值成功"
      }
    }
  },
  {
    url: '/vue-element-admin/money/sendCode',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: Mock.mock({
          'status': 200,
          "data": Mock.mock({
              'name|min-max': 4
          })


        })
      }
    }
  },
]






