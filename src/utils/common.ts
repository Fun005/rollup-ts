import formatter from "./formatter"

const getRandom = (m: number, n: number) => {
  return Math.floor((n - m) * Math.random() + m)
}

/**
 * @desc 获取字节长度，中文算两个
 * @returns {Number}
 */
const getByteLength = (s: string) => {
  return (s + '').replace(/[^\x00-\xff]/g, 'mm').length
}

/**
 * 清除字符串所有空格
 * @param str
 * @returns
 */
const removeAllSpace = (str: string) => {
  return str && Object.prototype.toString.call(str) === "[object String]"
    ? str.replace(/\s+/g, "")
    : str;
}

// 去掉所有 html 标记
const delHtmlTag = (str = '') => {
  return str.replace(/<[^>]+>/g, '')
}

const hidePhone = (phone = '') => {
  return phone.substr(0, 3) + '****' + phone.substr(7, 11)
}

/**
 * 空字符串 空数组 空对象值统一处理成null
 * @param values
 * @returns
 */
const filterEmptyValue = (values: object): any => {
  Object.keys(values).forEach((key) => {
    let type = Object.prototype.toString.call(values[key]);
    if (!values[key] && values[key] !== 0 && values[key] !== false)
      values[key] = null;
    else if (type === "[object Object]") {
      if (Object.keys(values[key]).length === 0) {
        values[key] = null;
      } else {
        filterEmptyValue(values[key]);
      }
    } else if (type === "[object Array]") {
      if (values[key].length === 0) {
        values[key] = null;
      } else {
        filterEmptyValue(values[key]);
      }
    }
  });
  return values;
}

/**
 * 判断数组内容是否相同 忽略顺序
 * @param arr1
 * @param arr2
 * @returns
 */
const arrIsEqualContent = (arr1: Array<string | number>, arr2: Array<string | number>) => {
  let flag = true;
  if (arr1.length !== arr2.length) {
    flag = false;
  } else {
    arr1.forEach((item) => {
      if (arr2.indexOf(item) === -1) {
        flag = false;
      }
    });
  }
  return flag;
}


// 判断浏览器及终端
const os = (u: string = window?.navigator.userAgent): object => {
  return {
    isMobile:
      !!u.match(/AppleWebKit.*Mobile/i) ||
      !!u.match(
        /MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/
      ),
    isWechat: !!u.match(/MicroMessenger/i),
    isQQ: !!u.match(/QQ/i) && !u.match(/MQQBrowser/i),
    isIos: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    isAndroid: !!u.match(/(Android);?[\s/]+([\d.]+)?/),
    isiPhone: !!u.match(/(iPhone\sOS)\s([\d_]+)/),
    isSafari: !!u.match(/Safari/),
    isFirefox: !!u.match(/Firefox/),
    isOpera: !!u.match(/Opera/),
    isChrome:
      u.match(/Chrome/i) !== null &&
      u.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i) === null,
    isDeskTop: ((): boolean => {
      const AgentList: Array<string> = [
        'Android',
        'iPhone',
        'SymbianOS',
        'Windows Phone',
        'iPad',
        'iPod'
      ]
      return !AgentList.some((item) => u.includes(item))
    })()
  }
}

export default {
  os,
  getRandom,
  getByteLength,
  delHtmlTag,
  removeAllSpace,
  hidePhone,
  filterEmptyValue,
  arrIsEqualContent
}
