// pages/mine/index/index.js
const app = getApp();
const common = require('../../../utils/common.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    'logined': false,
    'authsetting': null,
    'userinfo': null,
    /**
     * 底部导航栏数据，
     * 与App.js中的tabBar相同，
     * 若页面中这个数据改变需同步更新App.js
     */
    'tabBar': [{
        'id': 1,
        'active': false,
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
        'active': true,
        'text': '我的',
        'openType': 'redirect',
        'url': '/pages/mine/index/index',
        'iconUrl': {
          'active': '/images/icon/tabBar/grzx_sel.png',
          'normal': '/images/icon/tabBar/grzx_nor.png'
        },
      }
    ],

    /**
     * 页面的菜单数据
     */
    'menuSet': {
      'row': [{
          'text': '我的约拍',
          'openType': 'navigate',
          'url': '/pages/mine/index/index',
          'iconUrl': '/images/icon/save_b.png',
        },
        {
          'text': '作品相册',
          'openType': 'navigate',
          'url': '/pages/mine/index/index',
          'iconUrl': '/images/icon/save_b.png',
        },
        {
          'text': '我的收藏',
          'openType': 'navigate',
          'url': '/pages/mine/index/index',
          'iconUrl': '/images/icon/save_b.png',
        }
      ],
      'column': {
        'main': [{
            'text': '我的麻豆',
            'iconUrl': '/images/icon/save_b.png',
          },
          {
            'text': '实名认证',
            'iconUrl': '/images/icon/save_b.png',
          },
          {
            'text': '信用担保',
            'iconUrl': '/images/icon/save_b.png',
          },
        ],
        'share': [{
            'text': '邀请好友',
            'iconUrl': '/images/icon/save_b.png',
          },
          {
            'text': '加微信群',
            'iconUrl': '/images/icon/save_b.png',
          }
        ],
        'system': [{
            'text': '吐槽不爽',
            'iconUrl': '/images/icon/save_b.png',
          },
          {
            'text': '关于我们',
            'iconUrl': '/images/icon/save_b.png',
          }
        ]
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var _this = this;

    app.pageOnLoadInit(this, true).then(function(res) {
      //这里写验证登录成功后且无需验证授权 需要执行的逻辑
      //若还需验证授权成功才执行的逻辑需写在onShow方法里面

    }, function(error) {
      //登录失败
      wx.showModal({
        title: 'Error',
        content: error.errMsg ? error.errMsg : 'Fail to login.Please feedback to manager.',
      })
      return false;
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var _this = this;

    app.pageOnShowInit(this).then(function() {
      //这里写验证授权成功后 需要执行的逻辑
      
    }, function() {
      //用户没有授权
      console.warn('Auth scope.userInfo is unable.');
      return false;
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})