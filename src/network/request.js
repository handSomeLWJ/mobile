import axios from 'axios'
export const request = config => {
    const inst = axios.create({
            baseURL: '/api/v4',
            timeout: 10000
        })
        // 请求拦截
    inst.interceptors.request.use(config => {
            return config
        })
        //响应拦截
    inst.interceptors.response.use(data => {
        return data.data
    })
    return inst(config)
}