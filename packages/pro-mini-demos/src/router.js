import { RouterMount, createRouter } from 'uni-simple-router';

const router = createRouter({
     platform: process.env.VUE_APP_PLATFORM,
     routes: [
          { path: '/pages/index/index', name: 'home', aliasPath: '/' },
          { path: '/pages/popup/index', aliasPath: '/popup' },
          { path: '/pages/picker/index', aliasPath: '/picker' },
          { path: '/pages/image-preview/index', aliasPath: '/image-preview' },
          { path: '/pages/watermark/index', aliasPath: '/watermark' },
          { path: '/pages/finish-mobile/index', aliasPath: '/finish-mobile' },
          { path: '/pages/py-selector/index', aliasPath: '/py-selector' },
          { path: '/pages/virtual-list/index', aliasPath: '/virtual-list' },
     ]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
     next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
     console.log('跳转结束')
})

export {
     router,
     RouterMount
}
