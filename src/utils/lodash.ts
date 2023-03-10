/**
 * my lodash fns
 */

/**
 * 深拷贝
 * @param obj 需要深拷贝的对象
 * @returns
 */
const deepClone = (obj: Object) => {
  if (typeof obj !== 'object' || typeof obj === null) return obj

  let result: object
  if (obj instanceof Array) {
    result = []
  } else {
    result = {}
  }

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key])
    }
  }

  return result
}

/**
 * 节流函数，返回函数连续调用时，func 执行频率限定为 次 / wait
 * 参数介绍：
 * @param { function } func 回调函数
 * @param { number } wait 表示时间窗口的间隔
 * @param { object } options 如果想忽略开始函数的的调用，传入{ leading: false }。
 * 如果想忽略结尾函数的调用，传入{ trailing: false }
 * 两者不能共存，否则函数不能执行
 * @return { function } 返回用户调用函数
 **/

const throttle = (func: Function, wait: number, options: any) => {
  var context: any, args: any, result: any;
  var timeout: any = null;
  var previous = 0;
  // 如果 options 没传则设为空对象 if (!options) options = {};
  // 定时器回调函数
  var later = function () {
    // 如果设置了 leading，就将 previous 设为 0
    // 用于下面函数的第一个 if 判断
    previous = options.leading === false ? 0 : Date.now();
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    var now = Date.now();
    // 首次进入前者肯定为 true
    // 如果需要第一次不执行函数
    // 就将上次时间戳设为当前的
    // 这样在接下来计算 remaining 的值时会大于 0  if (!previous && options.leading === false) previous = now;
    // 计算剩余时间
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    // 如果当前调用已经大于上次调用时间 + wait
    // 如果设置了 trailing，只会进入这个条件
    // 如果没有设置 leading，那么第一次会进入这个条件
    // 还有一点，你可能会觉得开启了定时器那么应该不会进入这个 if 条件了
    // 其实还是会进入的，因为定时器的延时
    // 并不是准确的时间，很可能你设置了 2 秒
    // 但是他需要 2.2 秒才触发，这时候就会进入这个条件
    if (remaining <= 0 || remaining > wait) {
      // 如果存在定时器就清理掉否则会调用二次回调
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      // 判断是否设置了定时器和 trailing
      // 没有的话就开启一个定时器
      // 并且不能，不能同时设置 leading 和 trailing
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

/**
 * 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func才会执行
 * 参数说明：
 * @param { function } func 回调函数
 * @param { number } wait 表示时间窗口的间隔
 * @param { boolean } immediate 设置为true时，是否立即调用函数
 **/
function debounce(func: Function, wait: number, immediate: boolean) {
  var timeout: any, args: any, context: any, timestamp: number, result: any;
  var later = function () {
    // 现在和上一次时间戳比较
    var last = Date.now() - timestamp;
    // 如果当前时间间隔少于设定时间且大于0就重新设置定时器
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      // 否则的话就是时间到了，执行回调函数
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function () {
    context = this;
    args = arguments;
    // 获得时间戳
    timestamp = Date.now();
    // 如果定时器不存在且立即执行函数
    var callNow = immediate && !timeout;
    // 如果定时器不存在就创建一个
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      // 如果需要立即执行函数的话，通过 apply 执行
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
}

export default {
  deepClone,
  throttle,
  debounce
}