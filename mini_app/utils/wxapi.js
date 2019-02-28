// wxapi.js

module.exports = {
  wxapi: (wxApiName, obj) => {
    return new Promise((resolve, reject) => {
      wx[wxApiName]({
        ...obj,
        success: (res) => {
          resolve(res);
        },
        fail: (res) =>{
          reject(res);
        }
      });
    });
  }
};