/**
 * 工具插件
 */

const Util = {};

Util.install = (Vue) => {
  Vue.prototype.$$$$ = () => {
    console.log('$$$$');
  };

  // 封装确认框
  Vue.prototype.$cfm = (title, callback) => {
    if (confirm(title)) {
      if (callback) {
        callback();
      }
    }
  };


};

export default Util;