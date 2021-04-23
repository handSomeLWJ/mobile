/* 设置图片公共地址路径 */
export const IMGBASEURL = 'http://192.168.0.129:8360'

/* 首页内容请求 */
import { request } from './request'
export const homeContent = (page, size = 10) => request({
    url: '/product/pagination',
    params: { page, size }
})

/* 详情页请求数据 */
export const detailContent = (id) => request({
    url: '/product',
    params: { id }
})

/* 添加收藏  /product_like/create */
export const createLike = (product_id) => request({
    url: '/product_like/create',
    method: 'post',
    data: { product_id }
})

/* 取消收藏 /product_like/delete get */
export const deleteLike = (product_id) => request({
    url: '/product_like/delete',
    params: { product_id }
})

/* 登录 /user/signin post  name：用户名 password：密码 */
export const reqLogin = (data) => request({
    url: '/user/signin',
    method: 'post',
    data
})

/* 获取用户信息 /user/info  get */
export const reqUserInfo = () => request({
    url: '/user/info'
})

/* 加入购物车  /cart/update  post  product_id   */
export const reqUpdateCart = (product_id) => request({
    url: '/cart/update',
    method: 'post',
    data: { product_id }
})

/* 获取购物车数据  /cart/all  get */
export const reqCartAll = () => request({
    url: '/cart/all',
})

/* 删除购物车数据 /cart/delete get */
export const delCartItem = (product_id) => request({
    url: '/cart/delete',
    params: { product_id }
})

/* 修改用户地址  /user_address/update  post  url参数：id：地址id */
export const reqUpdateAddress = (id, data) => request({
    url: '/user_address/update?id=' + id,
    method: 'post',
    data
})

/* 删除用户地址  /user_address/delete  get    url参数：id：地址id  */
export const reqDeleteAddress = (id) => request({
    url: '/user_address/delete',
    params: { id }
})

/* 新增用户地址   /user_address/create */
export const reqAddAddress = data => request({
    url: '/user_address/create',
    method: 'post',
    data
})