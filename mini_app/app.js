const wxpromise = require('./utils/wxpromise.js');
import {
  wxapi
} from './utils/wxapi.js';

//app.js
App({
  onLaunch: function() {
    var _this = this;

    // 获取登录态信息
    this.getLoginInfo().then(function(res) {
      if ((typeof res !== 'undefined') && res.token) {
        //获取用户全部的授权信息
        wxapi('getSetting').then(function(setting) {
          _this.gData.logined = true;
          _this.gData.userinfo = res;
          _this.gData.authsetting = setting;

          //执行页面定义的回调方法
          (_this.loginedCb && typeof(_this.loginedCb) === 'function') && _this.loginedCb();
        }, function(error) {
          return Promise.reject(error);
        });
      } else {
        return Promise.reject({
          errMsg: 'LoginInfo miss token!',
        });
      }
    }).catch(function(error) {
      console.error(error);
      wx.showModal({
        title: 'Error',
        content: error.errMsg,
      });
      return false;
    });
  },

  /**
   * [getLoginInfo 获得自定义登录态信息]
   * @param  {[string]]} loginKey [缓存的key值]
   * @return {[Promise]}          返回一个Promise对象
   */
  getLoginInfo: function(loginKey = 'loginInfo') {
    var _this = this;
    return new Promise((resolve, reject) => {
      wxapi('checkSession').then(function() {
        //登录态有效，从缓存中读取
        return wxapi('getStorage', {
          'key': loginKey
        }).then(function(res) {
          //获取loginKey缓存成功
          if (res.data) {
            //缓存获取成功，并且值有效
            return Promise.resolve(res.data);
          } else {
            //缓存获取成功，但值无效，重新登录
            return _this.exeLogin(loginKey, 3000);
          }
        }, function() {
          //获取loginKey缓存失败，重新登录
          return _this.exeLogin(loginKey, 3000);
        });
      }, function() {
        //登录态失效，重新调用登录
        return _this.exeLogin(loginKey, 3000);
      }).then(function(res) {
        resolve(res);
      }).catch(function(error) {
        reject(error);
      });
    });
  },

  /**
   * [exeLogin 执行登录流程]
   * @param  {[string]} timeout   调用wx.login的超时时间
   * @param  {[string]} loginKey  自定义登录态信息缓存的key
   * @return {[Promise]}          返回一个Promise对象
   */
  exeLogin: function(loginKey, timeout = 3000) {
    var _this = this;
    return new Promise((resolve, reject) => {
      wxapi('login', {
        'timeout': timeout
      }).then(function(res) {
        return wxapi('request', {
          'method': 'POST',
          'url': 'http://fastadmin/api/User/third',
          'header': {
            'Content-type': 'application/x-www-form-urlencoded',
          },
          'data': {
            'code': res.code,
            'platform': 'miniwechat',
          }
        })
      }).then(function(res) {
        if (res.statusCode === 200 || res.data.code === 1) {
          //获取到自定义登录态信息后存入缓存，由于我们无需在意缓存是否成功(前面代码有相应的处理逻辑)，所以这里设置缓存可以由它异步执行即可
          wxapi('setStorage', {
            'key': loginKey,
            'data': res.data.data.userinfo
          });
          //userinfo里面包含有用户昵称、头像、性别等信息，以及自定义登录态的token
          resolve(res.data.data.userinfo);
        } else {
          //当服务器内部错误500(或者其它目前我未知的情况)时，wx.request还是会执行success回调，所以这里还增加一层服务器返回的状态码的判断
          return Promise.reject({
            'errMsg': res.data.msg ? 'Api error:' + res.data.msg : 'Fail to network request!'
          });
        }
      }).catch(function(error) {
        reject(error);
      });
    });
  },

  /**
   * 小程序页面初始化
   * @param {Object}  pageObj 小程序页面对象Page
   * @return {Object}         返回Promise对象，resolve方法执行登录成功后的回调函数，reject方法是登录失败后的回调
   */
  pageInit: function(pageObj) {
    var _this = this;
    return new Promise((resolve, reject) => {
      _this.pageGetLoginInfo(pageObj).then(function(res) {
        // console.log(_this.gData.logined);
        if (res.logined === true) {
          //验证已经登录执行回调，回调中一般根据需求验证是否需要授权
          resolve(res);
        } else {
          wx.showModal({
            title: 'Error',
            content: 'Fail to login.Please feedback to manager.',
          });
          reject();
        }
      });
    });
  },

  /**
   * 获取小程序注册时返回的自定义登录态信息（小程序页面中调用）
   * 主要是解决pageObj.onLoad 之后app.onLaunch()才返回数据的问题
   */
  pageGetLoginInfo: function(pageObj) {
    var _this = this;
    return new Promise((resolve, reject) => {
      // console.log(_this.gData.logined);
      if (_this.gData.logined == true) {
        wxpromise.PSetData(pageObj, {
          'logined': _this.gData.logined,
          'authsetting': _this.gData.authsetting,
          'userinfo': _this.gData.userinfo
        }).then(function(data) {
          resolve(data);
        });
      } else {
        /**
         * 小程序注册时，登录并发起网络请求，请求可能会在 pageObj.onLoad 之后才返回数据
         * 这里加入loginedCb回调函数防止，回调方法会在接收到请求后台返回的数据后执行，详看app.onLaunch()
         */
        _this.loginedCb = () => {
          wxpromise.PSetData(pageObj, {
            'logined': _this.gData.logined,
            'authsetting': _this.gData.authsetting,
            'userinfo': _this.gData.userinfo
          }).then(function(data) {
            resolve(data);
          });
        }
      }
    });
  },

  'gData': {
    'logined': false, //用户是否登录
    'authsetting': {}, //用户授权结果
    'userinfo': null, //用户信息(包含自定义登录态token)

    'api': {
      'request': 'http://fastadmin',
      'socket': '',
      'uploadfile': '',
      'downloadfile': ''
    },
  },

  /**
   * 底部导航栏公共数据
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
})