import axios from 'axios'
import router from '../router'
import { Toast } from 'vant'
export const request = config => {
    const inst = axios.create({
            baseURL: '/api/v4',
            timeout: 10000
        })
        // 请求拦截
    inst.interceptors.request.use(config => {
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                loadingType: 'spinner',
                duration: 0,
            });
            config.headers.Authorization = window.sessionStorage.getItem("token")
            return config
        })
        //响应拦截
    inst.interceptors.response.use(data => {
        if (data.data.errcode === 90101) {
            router.push('./login')
        }
        Toast.clear();
        return data.data
    })
    return inst(config)
}