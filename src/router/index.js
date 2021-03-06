import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () =>
    import ('../views/home/Home')
const Search = () =>
    import ('../views/search/Search')
const Position = () =>
    import ('../views/position/Position')
const Cart = () =>
    import ('../views/cart/Cart')
const My = () =>
    import ('../views/my/My')
const Detail = () =>
    import ('../views/detail/Detail')
const Login = () =>
    import ('../views/login/Login')
const OrderConfirm = () =>
    import ('../views/orderConfirm/OrderConfirm')
const AddressList = () =>
    import ('../views/addressList/AddressList')
const AddressEdit = () =>
    import ('../views/addressEdit/AddressEdit')
const PaySuccess = () =>
    import ('../views/paysuccess/PaySuccess')
const OrderDetail = () =>
    import ('../views/orderDetail/OrderDetail')
const MyOrder = () =>
    import ('../views/myOrder/MyOrder')
const MyLike = () =>
    import ('../views/myLike/MyLike')
const UserSetting = () =>
    import ('../views/userSetting/UserSetting')
const ChangeNickname = () =>
    import ('../views/userSetting/changeNickname/ChangeNickname')
const ChangePassword = () =>
    import ('../views/userSetting/changePassword/ChangePassword')
const ChangePayPassword = () =>
    import ('../views/userSetting/changePayPassword/ChangePayPassword')
const UpdateAvatar = () =>
    import ('../views/userSetting/updateAvatar/UpdateAvatar')


const routes = [{
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
        name: 'Home',
        meta: {
            showTabbar: true
        }
    },
    {
        path: '/search',
        component: Search,
        name: 'Search',
    },
    {
        path: '/position',
        component: Position,
        name: 'Position',
    },
    {
        path: '/cart',
        component: Cart,
        name: 'Cart',
        meta: {
            isLogin: true
        }
    },
    {
        path: '/my',
        component: My,
        name: 'My',
        meta: {
            showTabbar: true
        }
    },
    {
        path: '/detail',
        component: Detail,
        name: 'Detail'
    },
    {
        path: '/login',
        component: Login,
        name: 'Login'
    },
    /* ??????????????? */
    {
        path: '/orderConfirm',
        component: OrderConfirm,
        name: 'OrderConfirm',
        meta: {
            isLogin: true
        }
    },
    /* ??????????????? */
    {
        path: '/addressList',
        component: AddressList,
        name: 'AddressList',
        meta: {
            isLogin: true
        }
    },
    /* ?????????????????? */
    {
        path: '/addressEdit',
        component: AddressEdit,
        name: 'AddressEdit',
        meta: {
            isLogin: true
        }
    },
    /* ??????????????????PaySuccess */
    {
        path: '/paySuccess',
        component: PaySuccess,
        name: 'PaySuccess',
        meta: {
            isLogin: true
        }
    },
    /* ?????????????????? OrderDetail */
    {
        path: '/orderDetail',
        component: OrderDetail,
        name: 'OrderDetail',
        meta: {
            isLogin: true
        }
    },
    /* ???????????? */
    {
        path: '/myOrder',
        component: MyOrder,
        name: 'MyOrder',
        meta: {
            isLogin: true
        }
    },
    /* ?????????????????? MyLike */
    {
        path: '/myLike',
        component: MyLike,
        name: 'MyLike',
        meta: {
            isLogin: true
        }
    },
    /* ?????????????????? userSetting */
    {
        path: '/userSetting',
        component: UserSetting,
        name: 'UserSetting',
        meta: {
            isLogin: true
        }
    },
    /* ???????????? ChangeNickname */
    {
        path: '/changeNickname',
        component: ChangeNickname,
        name: 'ChangeNickname',
        meta: {
            isLogin: true
        }
    },
    /* ??????????????????  ChangePassword */
    {
        path: '/changePassword',
        component: ChangePassword,
        name: 'ChangePassword',
        meta: {
            isLogin: true
        }
    },
    /* ?????????????????? ChangePayPassword */
    {
        path: '/changePayPassword',
        component: ChangePayPassword,
        name: 'ChangePayPassword',
        meta: {
            isLogin: true
        }
    },
    /* ???????????? UpdateAvatar */
    {
        path: '/updateAvatar',
        component: UpdateAvatar,
        name: 'UpdateAvatar',
        meta: {
            isLogin: true
        }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// ????????????????????????
router.beforeEach((to, from, next) => {
    // ???????????????idLogin
    if (to.meta.isLogin) {
        // ??????????????????????????????
        if (sessionStorage.getItem("token")) {
            // ????????????
            next()
        } else {
            // ?????????????????????
            next('./login')
        }
    } else {
        next()
    }
})


export default router