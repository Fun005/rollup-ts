const { toString } = Object.prototype

/**
 * @description: 判断值是否未某个类型
 */
function isType(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`
}

/**
 * @description:  是否为函数
 */
function isFunction<T = Function>(val: unknown): val is T {
  return isType(val, 'Function')
}

/**
 * @description: 是否已定义
 */
const isDefine = <T = unknown>(val?: T): val is T => {
  return typeof val !== 'undefined'
}

const isUnDefine = <T = unknown>(val?: T): val is T => {
  return !isDefine(val)
}
/**
 * @description: 是否为对象
 */
const isObject = (val: any): val is Record<any, any> => {
  return val !== null && isType(val, 'Object')
}

/**
 * @description:  是否为时间
 */
function isDate(val: unknown): val is Date {
  return isType(val, 'Date')
}

/**
 * @description:  是否为数值
 */
function isNumber(val: unknown): val is number {
  return isType(val, 'Number')
}


/**
 * @description:  是否为字符串
 */
function isString(val: unknown): val is string {
  return isType(val, 'String')
}

function isNull(val: unknown): val is null {
  return val === null
}

function isNullAndUnDef(val: unknown): val is null | undefined {
  return isUnDefine(val) && isNull(val)
}

function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDefine(val) || isNull(val)
}

/**
 * @description:  是否为boolean类型
 */
export function isBoolean(val: unknown): val is boolean {
  return isType(val, 'Boolean')
}

/**
 * @description:  是否为数组
 */
function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val)
}


/**
 * @description:  是否为AsyncFunction
 */
function isAsyncFunction<T = any>(val: unknown): val is Promise<T> {
  return isType(val, 'AsyncFunction')
}

/**
 * @description:  是否为promise
 */
function isPromise<T = any>(val: unknown): val is Promise<T> {
  return (
    isType(val, 'Promise') &&
    isObject(val) &&
    isFunction(val.then) &&
    isFunction(val.catch)
  )
}

/**
 * @description: 是否客户端
 */
export const isClient = () => {
  return typeof window !== 'undefined'
}

/**
 * @description: 是否为浏览器
 */
const isWindow = (val: any): val is Window => {
  return typeof window !== 'undefined' && isType(val, 'Window')
}

const isElement = (val: unknown): val is Element => {
  return isObject(val) && !!val.tagName
}

const isServer = () => typeof window === 'undefined'

// 是否为图片节点
function isImageDom(el: Element) {
  return el && ['IMAGE', 'IMG'].includes(el.tagName)
}

// 检测对象是否是空对象
const isEmptyObj = (obj: {}) => {
  for (let name in obj) {
    if (obj.hasOwnProperty(name)) {
      return false
    }
  }
  return true
}

const isDot = (num) => {
  let result = num.toString().indexOf(".");
  return result > 0 ? true : false;
};

/**
 * 判断是否为正整数或0
 * @param value
 * @param isZero 0的时候也返回true
 * @returns
 */
const isInteger = (value: string | number, isZero: boolean) => {
  isZero
      ? !isNaN(value as number) &&
        (value as number) % 1 === 0 &&
        !isDot(value) &&
        value >= 0
        ? true
        : false
      : !isNaN(value as number) &&
        (value as number) % 1 === 0 &&
        !isDot(value) &&
        value > 0
      ? true
      : false;
}

/**
 * 判断字符串是否是十六进制的颜色值
 * @param value
 */
const isColor = (value: string): boolean => {
  return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(value);
}

export default {
  isType,
  isNumber,
  isString,
  isBoolean,
  isArray,
  isFunction,
  isAsyncFunction,
  isObject,
  isClient,
  isDefine,
  isUnDefine,
  isNullAndUnDef,
  isNullOrUnDef,
  isPromise,
  isWindow,
  isServer,
  isImageDom,
  isDate,
  isElement,
  isDot,
  isEmptyObj,
  isInteger,
  isColor
}
