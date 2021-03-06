/**
 * 解析xlsx工具类
 */

const MyXLSX = {};

MyXLSX.install = (Vue) => {
  // 解析xlsx
  Vue.prototype.$resolveXlsx = (inputFile) => {
    return new Promise((resolve, reject) => {
      if (inputFile == null) {
        reject('');
      }
      var rABS = false; //是否将文件读取为二进制字符串
      var f = inputFile;

      var reader = new FileReader();
      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        // var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function (e) {
          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64"
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary"
            });
          }
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
          // console.log(outdata)
          resolve(outdata);
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    });
  };

};

export default MyXLSX;