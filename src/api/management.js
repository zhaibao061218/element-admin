import request from '@/utils/request'

export function getCatalogList(query) {
    return request({
        url: '/api/academy/admin/Catalog/getcatalogconfiginfo',
        method: 'get',
        params: query
    })
}
export function getContentList(query) {
    return request({
        url: '/api/academy/admin/Catalog/getcontentconfiginfo',
        method: 'get',
        params: query
    })
}
export function getFobyList(query) {
    return request({
        url: '/api/academy/admin/Catalog/getcataloginfobyid',
        method: 'get',
        params: query,
        
    })
}
export function getIndexinfo(query) {
    return request({
        url: '/api/academy/admin/Catalog/getcataloginfobyid',
        method: 'get',
        params: query,
        
    })
}

export function updataCatalog(query) {
    return request({
        url: '/api/academy/admin/Catalog/updatacatalog',
        method: 'post',
        data: query,
        headers: {
          'Content-Type': 'application/json'
        }
    })
}


























































































/**zhai yu */

export function getBrandssory(query) {
    return request({
        url: '/api/academy/admin/Catalog/getbrandstoryinfo',
        method: 'get',
        params: query
    })
}
export function updateBrandssory(query) {
    return request({
        url: '/api/academy/admin/Catalog/updatabrandstory',
        method: 'post',
        data: query,
        headers: {
          'Content-Type': 'application/json'
        }
    })
}

export function getshareInfo(query) {
    return request({
        url: '/api/academy/admin/Catalog/getshareearninfo',
        method: 'get',
        params: query
    })
}

export function deleteShare(query) {
    return request({
        url: '/api/academy/admin/Catalog/deleteshareearn',
        method: 'delete',
        params: query
    })
}

export function updateShare(query) {
    return request({
        url: '/api/academy/admin/Catalog/saveshareearninfo',
        method: 'post',
        data: query,
        headers: {
          'Content-Type': 'application/json'
        }
    })
}

export function getQaInfo(query) {
    return request({
        url: '/api/academy/admin/Catalog/getcatalogarticleinfo',
        method: 'get',
        params: query
    })
}

export function updateQaInfo(query) {
    return request({
        url: '/api/academy/admin/Catalog/updatacatalogarticle',
        method: 'post',
        data: query,
        headers: {
          'Content-Type': 'application/json'
        }
    })
}

export function getBanner(query) {
    return request({
        url: '/api/academy/admin/Catalog/getbannerconfiginfo',
        method: 'get',
        params: query
    })
}
export function updateBanner(query) {
    return request({
        url: '/api/academy/admin/Catalog/updatabannerconfig',
        method: 'post',
        data: query,
        headers: {
          'Content-Type': 'application/json'
        }
    })
}


