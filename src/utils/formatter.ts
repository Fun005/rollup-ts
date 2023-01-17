import types from './types'
import storage from './storage'

const parseQuery = (url = '') => {
    url = url ? url : location.search
    let theRequest = {
        ticket: '',
        code: ''
    }
    if (url.indexOf('?') !== -1) {
        let str = url.substr(1)
        let strs = str.split('&')
        for (let i = 0; i < strs.length; i++) {
            // 暂时没找到解决中文乱码的方法，先这么处理着 -.-||
            try {
                // 解决中文乱码
                // @ts-ignore
                theRequest[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
            } catch (e) {
                // @ts-ignore
                theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
            }
        }
    }
    return theRequest
}

const delUrlQuery = (paramKey = '', url = location.href) => {
    const urlParam = url.substr(url.indexOf('?') + 1)
    const beforeUrl = url.substr(0, url.indexOf('?'))
    let nextUrl = '';

    let arr: any[] = []
    if (urlParam !== '') {
        let urlParamArr = urlParam.split('&');

        for (let i = 0; i < urlParamArr.length; i++) {
            const paramArr = urlParamArr[i].split('=')
            if (paramArr[0] !== paramKey) {
                arr.push(urlParamArr[i])
            }
        }
    }

    if (arr.length > 0) {
        nextUrl = '?' + arr.join('&')
    }
    url = beforeUrl + nextUrl
    return url
}

// 参数透传
const getParamsInherit = (url = '', paramsNeed = []) => {
    let paramsNeedArr: string[] = []
    let paramsNeedStr = ""
    let targetUrl = new URL(url)//目的页面对象
    let currentUrl = new URL(location.href)//当前页面对象

    paramsNeed.forEach((item) => {
        let currentValue = parseQuery()[item]
        if(currentValue != undefined && currentValue != "" && currentValue != "undefined"){
            paramsNeedArr.push(item + "=" + currentValue)
        }
    })

    paramsNeedStr = paramsNeedArr.join("&");
    //如果有search了则去掉当前页面?后拼接
    if(targetUrl.search && currentUrl.search){
        return url + "&" + paramsNeedStr
    } else if(!targetUrl.search && currentUrl.search){
        //如果目标页面没有search但是当前页面有则直接拼接
        return url + "?" + paramsNeedStr
    } else {
        return url
    }
}

const toParam = (obj: any) => {
    let result: string[] = []
    for (let key in obj) {
        result.push(key + '=' + obj[key])
    }
    return result.join('&')
}

// 过滤XSS
const filterXSS = (str = '') => {
    if (!types.isString(str)) return str
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\'/g, '&quot;').replace(/\'/g, '&apos;')
}

// 时间补零
const fillZero = (n: number): string => (n < 10 ? `0${n}` : `${n}`)

// 图片转换
const converImage = (url: string, mode: Array<string> = []): string => {
  if (!url) return url

  let innerUrl = url

  if (Object.prototype.toString.call(innerUrl) !== '[object String]') {
    return innerUrl
  }

  if (!innerUrl.includes('?x-oss-process=image')) {
    innerUrl += '?x-oss-process=image'
  }
  if (mode.length) {
    // eslint-disable-next-line array-callback-return
    mode.map((item) => {
      innerUrl += `/${item}`
    })
  }

  // 支持webp
  if (storage.getLocalStorage('isWebp') === 'true') {
    innerUrl += '/format,webp'
  } else {
    innerUrl += '/quality,Q_80'
  }

  return innerUrl
}

export default {
    parseQuery,
    delUrlQuery,
    getParamsInherit,
    toParam,
    filterXSS,
    fillZero,
    converImage
}
