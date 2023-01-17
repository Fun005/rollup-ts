/**
 * 设置 storage
 * @param {*} key
 * @param {*} value
 */
const setSessionStorage = (key: string, value: any) => {
    return window.sessionStorage.setItem(key, value)
}

/**
 * 获取 storage
 * @param {*} key
 */
const getSessionStorage = (key: string) => {
    return window.sessionStorage.getItem(key)
}

/**
 * 获取 storage
 * @param {*} key
 */
const removeSessionStorage = (key: string) => {
    return window.sessionStorage.removeItem(key)
}

/**
 * 清除 storage
 * @param {*} key
 */
const clearSessionStorage = () => {
    return window.sessionStorage.clear()
}

const getLocalStorage = (name: string) => {
    return window.localStorage.getItem(name)
}

const setLocalStorage = (name: string, value: any) => {
    return window.localStorage.setItem(name, value)
}

const removeLocalStorage = (name: string) => {
    return window.localStorage.removeItem(name)
}

const clearLocalStorage = () => {
    return window.localStorage.clear()
}

const setCookie = (name: string, value: any, { domain = '', time = 30 } = {}) => {
    let innerDomain = domain
    const exp = new Date()
    exp.setTime(exp.getTime() + time * 24 * 60 * 60 * 1000)
    if (domain !== '') {
        innerDomain = `; domain=${domain}`
    }
    document.cookie = `${name}=${value}; expires=${exp.toUTCString()}; path=/${innerDomain}`
}

const getCookie = (name: string) => {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts && parts.length === 2) {
        return (parts as Array<any>).pop().split(";").shift();
    }
}

/**
 * 通过名称删除cookie
 * @param name
 */
const deleteCookie = (name: string) => {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

const clearCookie = (domain = '') => {
    let innerDomain = domain
    // eslint-disable-next-line
    let keys = document.cookie.match(/[^ =;]+(?=\=)/g)
    if (innerDomain !== '') {
        innerDomain = `; domain=${innerDomain}`
    }
    if (keys) {
        // eslint-disable-next-line no-plusplus
        for (let i = keys.length; i--; )
        document.cookie = `${keys[i]}=0;expires=${new Date(0).toUTCString()}; path=/${innerDomain}`
    }
}

const hasCookie = (key = '') => {
    return new RegExp(
        `(?:^|;\\s*)${encodeURIComponent(key).replace(/[-.+*]/g, '\\$&')}\\s*\\=`
    ).test(document.cookie)
}

const removeCookie = (key = '', path = '', domain = '') => {
    if (!key || !hasCookie(key)) { return false }
    const dm = domain ? `; domain=${domain}` : ''
    const p = path ? `; path=${path}` : ''
    document.cookie = `${encodeURIComponent(key)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT${dm}${p}`
    return true
}

export default {
    getCookie,
    setCookie,
    hasCookie,
    removeCookie,
    clearCookie,
    deleteCookie,
    getSessionStorage,
    setSessionStorage,
    removeSessionStorage,
    clearSessionStorage,
    getLocalStorage,
    setLocalStorage,
    removeLocalStorage,
    clearLocalStorage
}