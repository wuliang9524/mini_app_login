/**
 * WxAPI异步函数Promise化
 */

const wxpromise = {

  /**
   * 验证登录态
   */
  PCheckSession: () => {
    return new Promise((resolve, reject) => {
      wx.checkSession({
        success: () => {
          resolve();
        },
        fail: () => {
          reject();
        },
      });
    });
  },

  /**
   * 设置缓存信息
   */
  PSetStorage: (k, d) => {
    return new Promise(function(resolve, reject) {
      wx.setStorage({
        key: k,
        data: d,
        success: () => {
          resolve(d);
        },
        fail: (error) => {
          reject(error);
        }
      });
    });
  },

  /**
   * 读取缓存信息
   */
  PGetStorage: (k) => {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: k,
        success: (res) => {
          resolve(res.data);
        },
        fail: (error) => {
          reject(error);
        }
      })
    });
  },

  /**
   * 网络请求
   */
  PRequest: (method, url, data, header) => {
    return new Promise((resolve, reject) => {
      wx.request({
        url: url,
        method: method,
        header: header,
        data: data,
        success: (res) => {
          if (res.data.code) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        },
        fail: (error) => {
          reject(error);
        }
      })
    });
  },

  /**
   * 登录接口
   */
  PLogin: (time) => {
    return new Promise((resolve, reject) => {
      wx.login({
        timeout: time,
        success: (res) => {
          if (res.code) {
            resolve(res.code);
          } else {
            reject(res);
          }
        },
        fail: (error) => {
          reject(error);
        }
      });
    });
  },

  /**
   * 获取用户的当前设置
   * 返回值中只会出现小程序已经向用户请求过的权限
   */
  PGetSetting: () => {
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: (res) => {
          resolve(res.authSetting);
        },
        fail: (error) => {
          reject(error);
        }
      })
    });
  },

  /**
   * 页面setData
   */
  PSetData: (pageobj, data) => {
    if (pageobj && data) {
      return new Promise((resolve, reject) => {
        pageobj.setData(data, resolve(data));
      });
    }
  },
}

module.exports = wxpromise;