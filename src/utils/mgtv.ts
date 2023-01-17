import formatter from "./formatter"

// 下载芒果 TV
const downloadMGTV = ({ url = location.href, fromac = document.querySelectorAll('body')[0].getAttribute('mg-stat-page') } = {}) => {
  // @ts-ignore
  location.href = `https://d.mgtv.com/dl?url=${encodeURIComponent(url)}&fromac=${encodeURIComponent(fromac)}`
}

// 下载小芒
const downloadMGEC = ({ url = location.href, fromac = document.querySelectorAll('body')[0].getAttribute('mg-stat-page') } = {}) => {
  location.href = `https://ecom.hitv.com/app-launch.html?schemaUrl=${encodeURIComponent(url)}&target=blank`
}

const openApp = (skeme: string, callback: any) => {
  let ifr = document.createElement('iframe')
  ifr.src = skeme
  ifr.style.display = 'none'

  document.body.appendChild(ifr)

  setTimeout(function () {
    document.body.removeChild(ifr)
    if (typeof callback === 'function') callback()
  }, 3000)
}

const changeVideo = (data: any) => {
  let url = data.url || window.location.href.split('?')[0]
  // H5直播
  let jumpLink = url + '?' + formatter.toParam({
    videoid: data.liveId || 0,
    type: 1,
    category: 'liveshow',
    sourceid: data.sourceId || 0,
    sid: 0,
    title: encodeURIComponent(data.liveTitle || 'test title'),
    v: new Date().getTime()
  })

  window.ImgotvApi.changeVideo({
    videoId: data.liveId || 0,
    sid: 0,
    cameraId: 0,
    cameraid: 0,
    category: 'liveshow',
    type: 1,
    hUrl: encodeURIComponent(jumpLink)
  })
}

// 判断 App 当前版本是不是小于 5.0.0
const judgeMGTVVersion = () => {
  let reg = /ImgoTV\-([ia][pP]hone)\/(\d\.\d\.\d)/g
  let ua = window.navigator.userAgent
  let imgo = reg.exec(ua)
  // @ts-ignore
  let curVersion = parseInt(imgo[2].split('.').join(''))

  return curVersion < 500
}

// 在H5页面打开直播播放器
const openConcertPlayer = (data: any) => {
  let url = data.url || window.location.href.split('?')[0]
  let link
  if (data.activityId) {
    // Webview外进入原生直播
    link = 'imgotv://' + (judgeMGTVVersion() ? 'concertPlayer' : 'livePlayer') + '?' + formatter.toParam({
      activityId: data.activityId || 0,
      videoId: data.liveId || 0,
      type: 0 // 0 原生直播; 1 [完美假期]直播
    })
  } else {
    let jumpLink = url + '?' + formatter.toParam({
      videoid: data.liveId || 0,
      type: 1,
      category: 'liveshow',
      sourceid: data.sourceId || 0,
      sid: 0,
      title: encodeURIComponent((data.liveTitle)),
      v: new Date().getTime()
    })
    link = 'imgotv://' + (judgeMGTVVersion() ? 'concertPlayer' : 'livePlayer') + '?' + formatter.toParam({
      videoId: data.liveId || 0,
      type: 1, // 0 原生直播; 1 [完美假期]直播
      category: 'liveshow',
      isNeedPay: 0,
      sid: 0,
      hUrl: encodeURIComponent(jumpLink)
    })
  }

  window.location.href = link
}

const jumpPc = (url = '') => {
  if (!(navigator.userAgent.match(/(iPhone|iPad|iPod|Android|Windows Phone|IEMobile|blackberry)/i))) {
    // @ts-ignore
    window.location = url
  }
}

const scrollTitle = (dir = 'left') => {
  let titleRun = () => {
    let title,firstCh,lastCh,leftStr
    if ("left" === dir) {
      title = document.title;
      firstCh = title.charAt(0);
      leftStr = title.substring(1, title.length);
      document.title = leftStr + firstCh;
    } else {
      title = document.title;
      lastCh = title.charAt(title.length - 1);
      leftStr = title.substring(0, title.length - 1);
      document.title = lastCh + leftStr;
    }
  }
  setInterval(() => titleRun(), 500)
}

//判断页面隐藏
const listenVisibility = (callback = () => { }) => {

  let visProp

  if ('hidden' in document) {
    visProp = 'hidden';
  } else {
    let prefixes = ['webkit', 'moz', 'ms', 'o'];
    for (let i = 0; i < prefixes.length; i++) {
      if ((prefixes[i] + 'Hidden') in document) visProp = prefixes[i] + 'Hidden';
    }
  }
  if (!visProp) return

  var evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange'
  document.addEventListener(evtname,
    () => {
      // console.log(document.visibilityState,"document.visibilityState");
      if (document.visibilityState === 'visible' || !document.hidden) {
        //防止回到首页加载问题
        setTimeout(() => {
          callback()
        }, 500)
      }
    },
    false
  )
}

const parseMGTVUrl = (url = '') => {
  // let url = 'http://www.mgtv.com/v/2/4467511/f/123.html'
  url = url || location.href
  let reg = /(\d{1,})(\.html)/g
  let ret = reg.exec(url)

  let ua = window.navigator.userAgent.toLowerCase()
  let isMGTV = /imgo/.test(ua)

  if (ret && isMGTV) {
      location.href = 'imgotv://player?videoId=' + ret[1]
  }
}

export default {
  downloadMGTV,
  downloadMGEC,
  openApp,
  changeVideo,
  openConcertPlayer,
  jumpPc,
  scrollTitle,
  listenVisibility,
  parseMGTVUrl
}
