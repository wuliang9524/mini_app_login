// pages/login/login.js
const app = getApp();
import {
  wxapi,
  wxsetData
} from '../../utils/wxapi.js';

Page({
  /**
   * 注意：当前页面只是引导用户进行授权，与登录毫无关系，
   *      跳转到当前页面前，务必在source page中调用App.pageInit()，
   * 
   * 解析：小程序的登录是调用wx.login直接进行登录（无需用户同意score.userInfo授权），通过code请求后台返回后台服务器的自定义登录态，
   *      小程序的授权是有时候我们需要拿到用户的一些开放信息（后台逻辑需要），这里登录和授权是完全区分开来的，登录是用户进来小程序程序即可跑下去，授权则是用户点击同意授权后，通过接口把得到
   *      的用户基本信息保存到服务器，该后台接口的前提是确保用户已经登录。
   *      
   *      对于自定义登录态的过期问题，调用wx.checkSession检查登录态是否过期，过期则重新调用wx.login重新登录，未过期
   *      则通过缓存读取上一次登录时缓存好的自定义登录态信息，这里有一个bug陷阱：后台接口返回的token有一套后台接口的过期处理机制，若wx.checkSession登录态未过期，这时缓存保留的自定义登录
   *      态信息在后台的处理机制中已经过期。后台的过期处理机制设置为长期有效即可解决。
   */

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * getUserinfo回调函数
   */
  bindGetUserinfo: function(e) {
    console.log(e);
    var data = e.detail;
    console.log(data);
    if (data.errMsg === "getUserInfo:ok") {
      wxpromise.PRequest('Post', app.gData.api.request + '/api/User/thirdauth', {
        'platform': 'miniwechat',
        'token': app.gData.userinfo.token,
        'encryptedData': data.encryptedData,
        'iv': data.iv,
      }, {
        'Content-type': 'application/x-www-form-urlencoded'
      }).then(function(res) {
        var loginKey = 'loginInfo';
        if (res.code == 1) {
          wxpromise.PSetStorage(loginKey, res.data.userinfo).then(function() {
            //生成新缓存成功
            app.gData.authsetting['scope.userInfo'] = true;
            app.gData.userinfo = res.data.userinfo;
            var pages = getCurrentPages();
            var currPage = pages[pages.length - 1]; //当前页面
            var prevPage = pages[pages.length - 2]; //上一个页面

            prevPage.setData({
              'userinfo': res.data.userinfo,
              'authsetting.scope\\.userInfo': true
            }, function() {
              wx.navigateBack({
                delta: 1,
                fail: function(error) {
                  wx.showModal({
                    title: 'Error',
                    content: error.errMsg ? error.errMsg : 'Fail to navigate back.',
                  });
                  return false;
                }
              })
            });
          }).catch(function(error) {
            console.log(error);
            wx.showModal({
              title: 'Error',
              content: error.errMsg ? error.errMsg : 'Fail to set storage.',
            });
            return false;
          });
        } else {
          //授权操作失败
          wx.showModal({
            title: 'Error',
            content: 'Fail to authorize.Please feedback to manager.',
          });
          return false;
        }
      });
    } else {
      return false;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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