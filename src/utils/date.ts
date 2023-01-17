
// 获取日期
// 1457921410 → 2016-03-14 10:10:10
const getLocalTime = (nS: string) => {
  return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, '-').replace(/日/g, ' ')
}

// 获取时间戳
// 2016-03-14 10:10:10 → 1457921410000
const getTimestamp = (datetime: string) => {
  return new Date(datetime.replace(/-/g, '/')).getTime()
}

const getYMDHM = (date = new Date()) => {
    let mm = date.getMonth() + 1
    let dd = date.getDate()
    let hh = date.getHours()
    let mi = date.getMinutes()
    let ss = date.getSeconds()
    let yyyymmdd = [date.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd
    ].join('-')

    let hhmmss = [(hh > 9 ? '' : '0') + hh,
      (mi > 9 ? '' : '0') + mi,
      (ss > 9 ? '' : '0') + ss,].join(':')

    return yyyymmdd + hhmmss
}

const getLeftTime = (time: number) => {
  let d = (Math.floor(time / 1000 / 60 / 60 / 24) < 10) ? '0' + String(Math.floor(time / 1000 / 60 / 60 / 24)) : Math.floor(time / 1000 / 60 / 60 / 24)
  let h = (Math.floor(time / 1000 / 60 / 60 % 24) < 10) ? '0' + String(Math.floor(time / 1000 / 60 / 60 % 24)) : Math.floor(time / 1000 / 60 / 60 % 24)
  let m = (Math.floor(time / 1000 / 60 % 60) < 10) ? '0' + String(Math.floor(time / 1000 / 60 % 60)) : Math.floor(time / 1000 / 60 % 60)
  let s = (Math.floor(time / 1000 % 60) < 10) ? '0' + String(Math.floor(time / 1000 % 60)) : Math.floor(time / 1000 % 60)

  return { d, h, m, s }
}

/**
 * Date转换字符串
 * @param theDate
 * @returns
 */
const getDateStr = (theDate: Date) => {
  let _hour: number | string = theDate.getHours();
  let _minute: number | string = theDate.getMinutes();
  let _second: number | string = theDate.getSeconds();
  let _year: number | string = theDate.getFullYear();
  let _month: number | string = theDate.getMonth();
  let _date: number | string = theDate.getDate();

  if (_hour < 10) {
    _hour = "0" + _hour;
  }

  if (_minute < 10) {
    _minute = "0" + _minute;
  }

  if (_second < 10) {
    _second = "0" + _second;
  }

  _month = _month + 1;

  if (_month < 10) {
    _month = "0" + _month;
  }

  if (_date < 10) {
    _date = "0" + _date;
  }

  return (
    _year +
    "-" +
    _month +
    "-" +
    _date +
    " " +
    _hour +
    ":" +
    _minute +
    ":" +
    _second
  );
}

export default {
  getLocalTime,
  getTimestamp,
  getYMDHM,
  getLeftTime,
  getDateStr
}
