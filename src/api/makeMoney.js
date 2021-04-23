import request from '@/utils/request'

export function GetUserStatistics(query) {
    return request({
        url: '/api/PartTime/admin/BuyerPartTime/getparttimecapitallist',
        method: 'get',
        params: query
    })
}
export function GetInvitedUsers(query) {
    return request({
        url: '/api/PartTime/admin/BuyerPartTime/getparttimeloglist',
        method: 'get',
        params: query
    })
}

export function GetMoneyWater(query) {
    return request({
        url: '/api/PartTime/admin/BuyerPartTime/getparttimecapitalloglist',
        method: 'get',
        params: query
    })
}
export function GetSum(query) {
    return request({
        url: '/api/PartTime/admin/BuyerPartTime/getparttimesum',
        method: 'get',
        params: query
    })
}

export function getRunningWater(query) {
    return request({
        url: '/api/PartTime/admin/BuyerPartTime/getparttimelogbyid',
        method: 'get',
        params: query
    })
}
