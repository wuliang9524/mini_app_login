// wxapi.js

const wxapi = {
  /**
   * 对微信Api Promise化的公共函数
   */
  wxapi: (wxApiName, obj) => {
    return new Promise((resolve, reject) => {
      wx[wxApiName]({
        ...obj,
        success: (res) => {
          resolve(res);
        },
        fail: (res) => {
          reject(res);
        }
      });
    });
  },

  /**
   * 以下是微信Api Promise化的特殊案例
   */
  wxsetData: (pageObj, obj) => {
    if(pageObj && obj){
      return new Promise((resolve, reject) => {
        pageObj.setData(obj, resolve(obj));
      });
    }
  },
}

module.exports = wxapi;