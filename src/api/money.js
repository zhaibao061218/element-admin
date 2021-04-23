import request from '@/utils/request'


export function testData(data) {
  return request({
    url: '/vue-element-admin/money/DataOne',
    method: 'get',
    data
  })
}
export function redemptionCode(code) {
  return request({
    url: '/vue-element-admin/money/redemptionCode',
    method: 'get',
    params: { code },
  })
}
export function chongzhi(moneyNumber) {
  return request({
    url: '/vue-element-admin/money/chongzhi',
    method: 'get',
    params: { moneyNumber },
  })
}
export function sendCode() {
  return request({
    url: '/vue-element-admin/money/sendCode',
    method: 'get',
    data:'',
  })
}


