import axios from "axios";

const CActivityUpdate = function (sActivityUrl, iActivityTime) {
  const _this = this;
  this.sActivityUrl = sActivityUrl;
  this.iActivityTime = iActivityTime;
  this.activityInterval = null;


  // получение значения cookie
  this.getCookie = function (name) {
    const cookie = " " + document.cookie;
    const search = " " + name + "=";
    let setStr = null;
    let offset = 0;
    let end = 0;
    if (cookie.length > 0) {
      offset = cookie.indexOf(search);
      if (offset != -1) {
        offset += search.length;
        end = cookie.indexOf(";", offset)
        if (end == -1) {
          end = cookie.length;
        }
        setStr = unescape(cookie.substring(offset, end));
      }
    }
    return (setStr);
  };

  // установка значения cookie
  this.setCookie = function (sName, sValue, sExpires, sPath, sDomain, bSecure) {
    let sCookie = '';
    sCookie += sName + '=' + escape(sValue);
    sCookie += sExpires ? '; expires=' + sExpires : '';
    sCookie += sPath ? '; path=' + sPath : '';
    sCookie += sDomain ? '; domain=' + sDomain : '';
    sCookie += bSecure ? '; secure' : '';
    document.cookie = sCookie;
  };

  // выполнение "холостого" хита для обновления даты активности пользователя
  this.updateActivity = function () {
    console.log('activity');
    let iLastActivity = _this.getCookie('BX_activity');
    iLastActivity = iLastActivity ? parseInt(iLastActivity) : 0;
    const oDate = new Date();
    const iCurTime = oDate.getTime();
    const bNeedUpdate = iCurTime >= (iLastActivity + _this.iActivityTime) || iCurTime < (iLastActivity - _this.iActivityTime);
    if (bNeedUpdate) {
      const sExpires = false; //'Mon, 01-Jan-2018 00:00:00 GMT'
      _this.setCookie('BX_activity', iCurTime, sExpires, '/');
      axios.get(_this.sActivityUrl);
    }

  };

  // запуск обновления даты активности пользователя с заданным интервалом
  this.startUpdating = function () {
    _this.activityInterval = setInterval(_this.updateActivity, _this.iActivityTime);
  };
  this.stopUpdating = function () {
    clearInterval(_this.activityInterval)
  }
};

export default CActivityUpdate;