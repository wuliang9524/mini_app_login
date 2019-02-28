//index.js
//获取应用实例
const app = getApp();
import region from '../../utils/city.js';

Page({
  data: {

    
    /**
     * 底部导航栏数据，
     * 与App.js中的tabBar相同，
     * 若页面中这个数据改变需同步更新App.js
     */
    'tabBar': [{
        'id': 1,
        'active': true,
        'text': '首页',
        'openType': 'redirect',
        'url': '/pages/index/index',
        'iconUrl': {
          'active': '/images/icon/tabBar/grzx_sel.png',
          'normal': '/images/icon/tabBar/grzx_nor.png'
        },
      },
      {
        'id': 2,
        'active': false,
        'text': '我的',
        'openType': 'redirect',
        'url': '/pages/mine/index/index',
        'iconUrl': {
          'active': '/images/icon/tabBar/grzx_sel.png',
          'normal': '/images/icon/tabBar/grzx_nor.png'
        },
      }
    ],
  },

  onLoad: function(option) {
    
  },
})