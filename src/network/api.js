// 引入jsonp
import Vue from 'vue'
// import VueJsonp from 'vue-jsonp'
// Vue.use(VueJsonp)

/* 设置图片公共地址路径 */
export const IMGBASEURL = 'http://192.168.0.129:8360'

/* 首页内容请求 */
import { request } from './request'


export const homeContent = (page, size = 10) => request({
    url: '/product/pagination',
    params: { page, size }
})

/* 商品搜索 /product/pagination  get 加上key */
export const searchContent = (page, key) => request({
    url: '/product/pagination',
    params: { size: 10, page, key }
})

/* 定位城市  /data/city  get   */
export const reqDataCity = () => request({
    url: '/data/city'
})

/* 获取地理信息对象 http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location=22.62,114.07&output=json&pois=0  jsonp location=纬度,经度   */
export const reqLocation = (latitude, longitude) => Vue.prototype.$jsonp("http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location=" + latitude + "," + longitude + "&output=json&pois=0")

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

/* 下单  /order/create   post  参数1：orderProductList  参数2：user_address_id */
export const reqOrderCreate = (orderProductList, user_address_id) => request({
    url: '/order/create',
    method: 'post',
    data: { orderProductList, user_address_id }
})

/* 付款  /order/pay  post url参数：order_id：订单id   */
export const reqOrderPay = (order_id, pay_password) => request({
    url: "/order/pay?order_id=" + order_id,
    method: 'post',
    data: { pay_password }
})

/* 获取单个订单  /order get  url参数：订单id */
export const reqOrder = (id) => request({
    url: '/order?id=' + id,
})

/* 获取我的订单列表 /order/pagination get  page  size */
export const reqProductPaginnation = (page) => request({
    url: '/order/pagination',
    params: { page }
})

/* 获取收藏列表  /product_like/all get */
export const reqProductLikeAll = () => request({
    url: '/product_like/all'
})

/* 修改用户昵称 /user/setting  post  nickname */
export const reqChangeNickname = (nickname) => request({
    url: '/user/setting',
    method: 'post',
    data: { nickname }
})

/* 修改用户登录密码 /user/updatePassword post   password  newPassword */
export const reqUserUpdatePassword = (password, newPassword) => request({
    url: '/user/updatePassword',
    method: 'post',
    data: { password, newPassword }
})

/* 修改支付密码  /user/updatePayPassword   post  password  newPassword */
export const reqUserUpdatePayPassword = (password, newPassword) => request({
    url: '/user/updatePayPassword',
    method: 'post',
    data: { password, newPassword }
})

/* 修改用户头像 /user/avatar  post  FormData形式 avatar(用户头像):blob文件对象 */
export const reqUpdateUserAvatar = (avatar) => request({
    url: '/user/avatar',
    method: 'post',
    data: avatar
})