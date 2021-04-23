import request from '@/utils/request'

//获取收款单详情
export function get_paymentorder_detail(query) {
    return request({
        url: '/api/Finance/get_pay_user',
        method: 'get',
        params: query
    })
}

//查询获取收款单分页集合
export function get_receiveorder_list(query) {
    return request({
        url: '/api/Finance/get_receiveorder_list',
        method: 'get',
        params: query
    })
}

//获取调拨单分页集合
export function get_transferorder_list(query) {
    return request({
        url: '/api/Finance/get_transferorder_list',
        method: 'get',
        params: query
    })
}

//获取付款单分页集合
export function get_paymentorder_list(query) {
    return request({
        url: '/api/Finance/get_paymentorder_list',
        method: 'get',
        params: query
    })
}

//新增收款单
export function put_receivepayment_order(data) {
    return request({
        url: '/api/Finance/put_receivepayment_order',
        method: 'post',
        data
    })
}

//新增调拨单
export function put_transferpay_order(data) {
    return request({
        url: '/api/Finance/put_transferpay_order',
        method: 'post',
        data
    })
}

//新增付款单
export function put_payment_order(data) {
    return request({
        url: '/api/Finance/put_payment_order',
        method: 'post',
        data
    })
}

//付款单详情查询  /api/Finance/get_paymentorder_detail
export function get_paymentorder_detailView(query) {
    return request({
        url: '/api/Finance/get_paymentorder_detail',
        method: 'get',
        params: query
    })
}

//获取收款单详情   /api/Finance/get_receiveorder_detail
export function get_receiveorder_detailView(query) {
    return request({
        url: '/api/Finance/get_receiveorder_detail',
        method: 'get',
        params: query
    })
}

//获取调拨单详情  /api/Finance/get_transferorder_detail
export function get_transferorder_detailView(query) {
    return request({
        url: '/api/Finance/get_transferorder_detail',
        method: 'get',
        params: query
    })
}

// 收款单审核   /api/Finance/put_approval_receiveorder
export function put_approval_receiveorder(data) {
    return request({
        url: '/api/Finance/put_approval_receiveorder',
        method: 'post',
        data
    })
}

//付款段审核/api/Finance/put_approval_paymentorder
export function put_approval_paymentorder(data) {
    return request({
        url: '/api/Finance/put_approval_paymentorder',
        method: 'post',
        data
    })
}

//调拨单审核/api/Finance/put_approval_transferpayorder
export function put_approval_transferpayorder(data) {
    return request({
        url: '/api/Finance/put_approval_transferpayorder',
        method: 'post',
        data
    })
}

// 获取待审核数量  /api/Finance/get_approvalorder_count
export function get_approvalorder_count(query) {
    return request({
        url: '/api/Finance/get_approvalorder_count',
        method: 'get',
        params: query
    })
}

//获取调拨单买家资金 /api/Finance/put_tranfer_transfer_buyercapital
export function put_tranfer_transfer_buyercapital(data) {
    return request({
        url: '/api/Finance/put_tranfer_transfer_buyercapital',
        method: 'post',
        data
    })
}