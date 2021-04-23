import request from '@/utils/request'

export function uploadImage(uploadData) {
    request({
        url: 'https://api.trialimg.com/api/ImgUpload/ImageUpload',
        method: 'POST',
        data: uploadData
    })
}