(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 3);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';

var messages = {};

var locale;

{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}

function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}

function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}

function setLocale$1(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom };

  }
}

function populateParameters(result) {var _result$brand =





  result.brand,brand = _result$brand === void 0 ? '' : _result$brand,_result$model = result.model,model = _result$model === void 0 ? '' : _result$model,_result$system = result.system,system = _result$system === void 0 ? '' : _result$system,_result$language = result.language,language = _result$language === void 0 ? '' : _result$language,theme = result.theme,version = result.version,platform = result.platform,fontSizeSetting = result.fontSizeSetting,SDKVersion = result.SDKVersion,pixelRatio = result.pixelRatio,deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "__UNI__EC91565",
    appName: "demoForRongyun",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.6.4",
    uniRuntimeVersion: "3.6.4",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined };


  Object.assign(result, parameters);
}

function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc' };

    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}

function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}

function getAppLanguage(defaultLanguage) {
  return getLocale$1 ?
  getLocale$1() :
  defaultLanguage;
}

function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }

  return _hostName;
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  } };


var showActionSheet = {
  args: function args(fromArgs) {
    if (typeof fromArgs === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  } };


var getAppBaseInfo = {
  returnValue: function returnValue(result) {var _result =
    result,version = _result.version,language = _result.language,SDKVersion = _result.SDKVersion,theme = _result.theme;

    var _hostName = getHostName(result);

    var hostLanguage = language.replace('_', '-');

    result = sortObject(Object.assign(result, {
      appId: "__UNI__EC91565",
      appName: "demoForRongyun",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme }));

  } };


var getDeviceInfo = {
  returnValue: function returnValue(result) {var _result2 =
    result,brand = _result2.brand,model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);

    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model }));

  } };


var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);

    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0 }));

  } };


var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {var
    locationReducedAccuracy = result.locationReducedAccuracy;

    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


/**
                    * 框架内 try-catch
                    */
/**
                        * 开发者 try-catch
                        */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}

function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}

var cid;
var cidErrMsg;
var enabled;

function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}

function invokePushCallback(
args)
{
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message) };

    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message) });

    });
  }
}

var getPushCidCallbacks = [];

function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}

function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }var _getApiCallbacks =




  getApiCallbacks(args),success = _getApiCallbacks.success,fail = _getApiCallbacks.fail,complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);

  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid };

        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '') };

        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}

var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};

var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};

var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initUnknownHooks(mpOptions, vueOptions) {var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {return initHook$1(mpOptions, hook, excludes);});
}

function findHooks(vueOptions) {var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}

function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"demoForRongyun","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: '' };

        properties.virtualHostClass = {
          type: null,
          value: '' };

      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ?
  event.detail.__args__ || [event.detail] :
  [event.detail];

  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }

  var extraObj = processEventExtra(vm, extra, event, __args__);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);

  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 2 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 4 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"demoForRongyun","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"demoForRongyun","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"demoForRongyun","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"demoForRongyun","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        triggerEvent.call(this.$scope, event, {
          __args__: toArray(arguments, 1)
        });
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize',
    'onUploadDouyinVideo'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 5 */
/*!************************************************************************************!*\
  !*** /Users/zhr/study/practice/rongyunIM/demoForRongyun/demoForRongyun/pages.json ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 12 */
/*!****************************************************************************************!*\
  !*** /Users/zhr/study/practice/rongyunIM/demoForRongyun/demoForRongyun/store/index.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 13));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

_vue.default.use(_vuex.default);

var store = new _vuex.default.Store({
  state: {
    token: '',
    cityList: '', // 城市列表
    currentCity: '', // 用户所处的当前城市名
    cityCode: '', //城市编码
    areaList: [], // 当前城市下的城区列表
    houseItemVux: [],
    imList: [],
    userList: [] },

  mutations: {
    updateUserList: function updateUserList(state, obj) {

      if (obj.isUpdateMessageNum === "newMsg") {//消息来了
        var oldUserList = uni.getStorageSync('userList');
        console.log("消息来了消息来了消息来了消息来了消息来了");
        var newArr = obj.arr.map(function (d, index) {
          console.log(d);
          if (oldUserList.find(function (item) {return d.targetId == item.targetId;})) {
            var needObj = oldUserList.find(function (item) {return d.targetId == item.targetId;});
            needObj.unreadMessageCount += 1;
            return needObj;
          } else {
            return d;
          }
        });

        // state.userList = newArr
        uni.setStorageSync('userList', newArr);

      } else if (obj.isUpdateMessageNum === true) {//清除消息条数
        state.userList = obj.arr;
        uni.setStorageSync('userList', obj.arr);

      } else {//初始化
        var _oldUserList = uni.getStorageSync('userList');
        var _newArr;
        if (_oldUserList) {
          _newArr = obj.arr.map(function (d, index) {
            if (_oldUserList.find(function (item) {return d.targetId == item.targetId;})) {
              return _oldUserList.find(function (item) {return d.targetId == item.targetId;});
            } else {
              return d;
            }
          });
        } else {
          _newArr = obj.arr;
        }
        state.userList = _newArr;
        uni.setStorageSync('userList', _newArr);


      }

      var tabbarNum = 0;
      state.userList.forEach(function (item) {
        tabbarNum += item.unreadMessageCount;
      });

      if (tabbarNum) {
        uni.setTabBarBadge({
          index: 2,
          text: tabbarNum.toString() });

      } else {
        uni.removeTabBarBadge({ index: 2 });
      }












      console.log("Vux更新会话列表", state.userList, "isUpdateMessageNum", obj.isUpdateMessageNum);
    },
    addIMMsg: function addIMMsg(state, val) {
      state.imList.push(val);
      var data = uni.getStorageSync("meInfo");
      // console.log("自己的信息",data)
      //非自己的消息震动
      if (val.senderUserId != data.id) {
        console.log('振动');

        uni.vibrateLong();

      }
      console.log("Vux更新聊天列表", state.imList);
    },
    getToken: function getToken(state, val) {
      state.token = val;
    },
    holdDate: function holdDate(state, val) {
      state.houseItemVux = val;
    },
    removeToken: function removeToken(state) {
      state.token = '';
    },
    // 修改当前城市
    setCurrentCity: function setCurrentCity(state, val) {
      state.currentCity = val;
    },
    // 设置citylist
    setCityList: function setCityList(state, val) {
      state.cityList = val;
    },
    // 设置citycode
    setCityCode: function setCityCode(state, val) {
      state.cityCode = val;
    },
    // 设置areaList
    setAreaList: function setAreaList(state, val) {
      state.areaList = val;
    } },

  getters: {
    // 根据城市名获取城市编码
    // CITY_CODE: (state,store) => {
    // 	return (cityName)=>{
    // 		console.log()
    // 		store.ALL_CITY.forEach((item,index)=>{
    // 			if(item.name===cityName){
    // 				return item.code
    // 			}
    // 		})
    // 	}
    // },
    // // 获取所有城市
    // ALL_CITY(state){
    // 	if(!state.cityList){
    // 		return []
    // 	}
    // 	return state.cityList.city
    // }
  } });var _default =



store;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 13 */
/*!**************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */


function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype[[104,111,116,85,112,100,97,116,101].map(function (item) {return String.fromCharCode(item)}).join('')] = function (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index_cjs = {
  Store: Store,
  install: install,
  version: '3.6.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

module.exports = index_cjs;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 14 */
/*!***********************************************************************************************!*\
  !*** /Users/zhr/study/practice/rongyunIM/demoForRongyun/demoForRongyun/components/request.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _store = _interopRequireDefault(__webpack_require__(/*! @/store */ 12));
var _requrl = _interopRequireDefault(__webpack_require__(/*! ./requrl.js */ 15));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
var urlHeader = _requrl.default;
var hasLogin = false;
var token = null;
var theToken = null;
/**
                      * [getToken description]
                      * @return {[type]} [description]
                      */


/**
                          * main.nvue 路径是写死的
                          */


function getToken() {
  theToken = uni.getStorageSync('token');
  hasLogin = uni.getStorageSync('hasLogin');
  if (hasLogin === false || hasLogin === "false") {
    theToken = "";
  }
  return theToken;
}

/**
   * [get description]
   * @param  {[type]} url  [description]
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
function get(url, data, type) {
  token = getToken();
  if (token === "" && type === "auth") {
    return uni.reLaunch({
      url: '/pages/user/login' });

  }
  return uni.request({
    url: urlHeader + url, //仅为示例，并非真实接口地址。
    data: data,
    method: "GET",
    dataType: "json",
    header: {
      'Authorization': token,
      'Content-Type': 'application/x-www-form-urlencoded' //自定义请求头信息
    } }).
  then(function (res) {
    if (parseInt(res[1].data.code) === 0 || res[1].data.code == 1 || res[1].data.code == 2 && parseInt(res[1].statusCode) ===
    200) {
      return res[1];
    } else if (token === null || hasLogin === false || res[1].data.code == 402 || res[1].data.code == 401) {
      uni.showToast({
        icon: 'none',
        title: "请先登录" });

      return uni.reLaunch({
        url: '/pages/user/psdlogin' });

    } else {
      return console.log(res);
    }
  }).catch(function (res) {
    uni.showToast({
      title: res,
      icon: 'none' });

    return Promise.reject();
  });
}
/**
   * [post description]
   * @param  {[type]} url  [description]
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
function post(url, data) {var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "auth";
  token = getToken();
  if (token === "" && type === "auth") {
    console.log('token:', token);
    return uni.reLaunch({
      url: '/pages/user/login' });

  }

  return uni.request({
    url: urlHeader + url, //仅为示例，并非真实接口地址。
    data: data,
    method: "POST",
    dataType: "json",
    header: {
      'Authorization': token,
      'Content-Type': 'application/json' //自定义请求头信息
    } }).
  then(function (res) {
    console.log('url:', url);
    console.log(res);
    if (res[1].data.code == 0 || res[1].data.code == 1 || res[1].data.code == 3 || res[1].data.code == 2 && res[1].statusCode ==
    200) {
      // console.log(res[1].data)
      return res[1].data;
    } else if (token === '' || hasLogin === false || res[1].data.code == 402 || res[1].data.code == 401) {
      // console.log('url:',url)
      // console.log('data:',data)
      // console.log('token:',token)
      // console.log('code:',res[1].data.code)
      uni.showToast({
        icon: 'none',
        title: "请先登录" });

      return uni.reLaunch({
        url: '/pages/user/login' });

    } else {
      return console.log(res);
    }
  }).catch(function (res) {
    uni.showToast({
      title: res,
      icon: 'none' });

    return Promise.reject();
  });
}
/**
   * [onceUpload description]
   * @param  {[type]}   url      [description]
   * @param  {[type]}   name     [description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
function upload(url, name, callback) {
  token = getToken();
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
    success: function success(res) {// 本机显示预览图  5242880
      uni.showLoading({
        title: '上传中' });

      // console.log(res.tempFiles[0].size)
      if (res.tempFiles[0].size > 5242880) {
        uni.hideLoading();
        uni.showToast({
          icon: 'none',
          title: '上传图片不能大于5M' });

      } else {
        uni.uploadFile({
          url: "".concat(urlHeader + url),
          //url: "http://fangchan.chuangmi.site/api/plugs.extend/upload",
          filePath: res.tempFilePaths[0], // 上传图
          header: {
            'Authorization': token },

          name: "".concat(name),
          success: function success(uploadFileRes) {
            // console.log(JSON.parse(uploadFileRes.data))
            if (JSON.parse(uploadFileRes.data).code == 1) {
              callback([res.tempFilePaths[0], JSON.parse(uploadFileRes.data).data.url]);
              // console.log(JSON.parse(uploadFileRes.data).data.file_path)
              // console.log(path);
            } else {
              console.log("上传失败");
              uni.showToast({
                icon: 'none',
                title: '上传失败' });

            }
          },
          fail: function fail(err) {
            console.log(err);
          },
          complete: function complete() {
            uni.hideLoading();
          } });

      }
    } });

}var _default =

{
  get: get,
  post: post,
  upload: upload };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 15 */
/*!**********************************************************************************************!*\
  !*** /Users/zhr/study/practice/rongyunIM/demoForRongyun/demoForRongyun/components/requrl.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var myurl = "http://localhost:9090/rongYunServer/rongyun";var _default =
myurl;
// http://fa.yhczfw.com
exports.default = _default;

/***/ }),
/* 16 */
/*!****************************************************************************************************************************!*\
  !*** /Users/zhr/study/practice/rongyunIM/demoForRongyun/demoForRongyun/node_modules/@rongcloud/imlib-v4/dist/index.esm.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });Object.defineProperty(exports, "ChatroomEntryType", { enumerable: true, get: function get() {return _engine.ChatroomEntryType;} });Object.defineProperty(exports, "ConnectionStatus", { enumerable: true, get: function get() {return _engine.ConnectionStatus;} });Object.defineProperty(exports, "ConversationType", { enumerable: true, get: function get() {return _engine.ConversationType;} });Object.defineProperty(exports, "FileType", { enumerable: true, get: function get() {return _engine.FileType;} });Object.defineProperty(exports, "LogLevel", { enumerable: true, get: function get() {return _engine.LogLevel;} });Object.defineProperty(exports, "MessageDirection", { enumerable: true, get: function get() {return _engine.MessageDirection;} });Object.defineProperty(exports, "NotificationStatus", { enumerable: true, get: function get() {return _engine.NotificationStatus;} });Object.defineProperty(exports, "UploadMethod", { enumerable: true, get: function get() {return _engine.UploadMethod;} });exports.init = exports.getInstance = exports.SDK_VERSION = exports.RECEIVED_STATUS = exports.RECALL_MESSAGE_TYPE = exports.NOTIFICATION_STATUS = exports.MESSAGS_TIME_ORDER = exports.MESSAGE_TYPE = exports.MESSAGE_DIRECTION = exports.MENTIONED_TYPE = exports.IMClient = exports.FILE_TYPE = exports.ERROR_CODE = exports.CONVERSATION_TYPE = exports.CONNECT_TYPE = exports.CONNECTION_STATUS = exports.CHATROOM_ORDER = exports.CHATROOM_ENTRY_TYPE = void 0;var _engine = __webpack_require__(/*! @rongcloud/engine */ 17);
/*! *****************************************************************************
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                Copyright (c) Microsoft Corporation.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                Permission to use, copy, modify, and/or distribute this software for any
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                purpose with or without fee is hereby granted.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                PERFORMANCE OF THIS SOFTWARE.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ***************************************************************************** */var _b = function b() {return (_b = Object.assign || function (t) {for (var e, n = 1, o = arguments.length; n < o; n++) {for (var r in e = arguments[n]) {Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);}}return t;}).apply(this, arguments);};function U(t, e, n, o) {return new (n || (n = Promise))(function (r, s) {function i(t) {try {c(o.next(t));} catch (t) {s(t);}}function a(t) {try {c(o.throw(t));} catch (t) {s(t);}}function c(t) {var e;t.done ? r(t.value) : (e = t.value, e instanceof n ? e : new n(function (t) {t(e);})).then(i, a);}c((o = o.apply(t, e || [])).next());});}function x(t, e) {var n,o,r,s,i = { label: 0, sent: function sent() {if (1 & r[0]) throw r[1];return r[1];}, trys: [], ops: [] };return s = { next: a(0), throw: a(1), return: a(2) }, "function" == typeof Symbol && (s[Symbol.iterator] = function () {return this;}), s;function a(s) {return function (a) {return function (s) {if (n) throw new TypeError("Generator is already executing.");for (; i;) {try {if (n = 1, o && (r = 2 & s[0] ? o.return : s[0] ? o.throw || ((r = o.return) && r.call(o), 0) : o.next) && !(r = r.call(o, s[1])).done) return r;switch (o = 0, r && (s = [2 & s[0], r.value]), s[0]) {case 0:case 1:r = s;break;case 4:return i.label++, { value: s[1], done: !1 };case 5:i.label++, o = s[1], s = [0];continue;case 7:s = i.ops.pop(), i.trys.pop();continue;default:if (!(r = i.trys, (r = r.length > 0 && r[r.length - 1]) || 6 !== s[0] && 2 !== s[0])) {i = 0;continue;}if (3 === s[0] && (!r || s[1] > r[0] && s[1] < r[3])) {i.label = s[1];break;}if (6 === s[0] && i.label < r[1]) {i.label = r[1], r = s;break;}if (r && i.label < r[2]) {i.label = r[2], i.ops.push(s);break;}r[2] && i.ops.pop(), i.trys.pop();continue;}s = e.call(t, i);} catch (t) {s = [6, t], o = 0;} finally {n = r = 0;}}if (5 & s[0]) throw s[1];return { value: s[0] ? s[1] : void 0, done: !0 };}([s, a]);};}}function P(t, e) {for (var n = 0, o = e.length, r = t.length; n < o; n++, r++) {t[r] = e[n];}return t;}var A = new _engine.Logger("RCIM"),L = { TIMEOUT: { code: -1, msg: "Network timeout" }, SDK_INTERNAL_ERROR: { code: -2, msg: "SDK internal error" }, PARAMETER_ERROR: { code: -3, msg: "Please check the parameters, the {param} expected a value of {expect} but received {current}" }, REJECTED_BY_BLACKLIST: { code: 405, msg: "Blacklisted by the other party" }, SEND_TOO_FAST: { code: 20604, msg: "Sending messages too quickly" }, NOT_IN_GROUP: { code: 22406, msg: "Not in group" }, FORBIDDEN_IN_GROUP: { code: 22408, msg: "Forbbiden from speaking in the group" }, NOT_IN_CHATROOM: { code: 23406, msg: "Not in chatRoom" }, FORBIDDEN_IN_CHATROOM: { code: 23408, msg: "Forbbiden from speaking in the chatRoom" }, KICKED_FROM_CHATROOM: { code: 23409, msg: "Kicked out and forbbiden from joining the chatRoom" }, CHATROOM_NOT_EXIST: { code: 23410, msg: "ChatRoom does not exist" }, CHATROOM_IS_FULL: { code: 23411, msg: "ChatRoom members exceeded" }, PARAMETER_INVALID_CHATROOM: { code: 23412, msg: "Invalid chatRoom parameters" }, ROAMING_SERVICE_UNAVAILABLE_CHATROOM: { code: 23414, msg: "ChatRoom message roaming service is not open, Please go to the developer to open this service" }, RECALLMESSAGE_PARAMETER_INVALID: { code: 25101, msg: "Invalid recall message parameter" }, ROAMING_SERVICE_UNAVAILABLE_MESSAGE: { code: 25102, msg: "Single group chat roaming service is not open, Please go to the developer to open this service" }, PUSHSETTING_PARAMETER_INVALID: { code: 26001, msg: "Invalid push parameter" }, OPERATION_BLOCKED: { code: 20605, msg: "Operation is blocked" }, OPERATION_NOT_SUPPORT: { code: 20606, msg: "Operation is not supported" }, MSG_BLOCKED_SENSITIVE_WORD: { code: 21501, msg: "The sent message contains sensitive words" }, REPLACED_SENSITIVE_WORD: { code: 21502, msg: "Sensitive words in the message have been replaced" }, NOT_CONNECTED: { code: 30001, msg: "Please connect successfully first" }, NAVI_REQUEST_ERROR: { code: 30007, msg: "Navigation http request failed" }, CMP_REQUEST_ERROR: { code: 30010, msg: "CMP sniff http request failed" }, CONN_APPKEY_FAKE: { code: 31002, msg: "Your appkey is fake" }, CONN_MINI_SERVICE_NOT_OPEN: { code: 31003, msg: "Mini program service is not open, Please go to the developer to open this service" }, CONN_ACK_TIMEOUT: { code: 31e3, msg: "Connection ACK timeout" }, CONN_TOKEN_INCORRECT: { code: 31004, msg: "Your token is not valid or expired" }, CONN_NOT_AUTHRORIZED: { code: 31005, msg: "AppKey and Token do not match" }, CONN_REDIRECTED: { code: 31006, msg: "Connection redirection" }, CONN_APP_BLOCKED_OR_DELETED: { code: 31008, msg: "AppKey is banned or deleted" }, CONN_USER_BLOCKED: { code: 31009, msg: "User blocked" }, CONN_DOMAIN_INCORRECT: { code: 31012, msg: "Connect domain error, Please check the set security domain" }, ROAMING_SERVICE_UNAVAILABLE: { code: 33007, msg: "Roaming service cloud is not open, Please go to the developer to open this service" }, RC_CONNECTION_EXIST: { code: 34001, msg: "Connection already exists" }, CHATROOM_KV_EXCEED: { code: 23423, msg: "ChatRoom KV setting exceeds maximum" }, CHATROOM_KV_OVERWRITE_INVALID: { code: 23424, msg: "ChatRoom KV already exists" }, CHATROOM_KV_STORE_NOT_OPEN: { code: 23426, msg: "ChatRoom KV storage service is not open, Please go to the developer to open this service" }, CHATROOM_KEY_NOT_EXIST: { code: 23427, msg: "ChatRoom key does not exist" }, MSG_KV_NOT_SUPPORT: { code: 34008, msg: "The message cannot be extended" }, SEND_MESSAGE_KV_FAIL: { code: 34009, msg: "Sending RC expansion message fail" }, EXPANSION_LIMIT_EXCEET: { code: 34010, msg: "The message expansion size is beyond the limit" }, ILLGAL_PARAMS: { code: 33003, msg: "Incorrect parameters passed in while calling the interface" }, CHATROOM_KV_STORE_NOT_ALL_SUCCESS: { code: 23428, msg: "Chatroom kv store not all success" }, CHATROOM_KV_STORE_OUT_LIMIT: { code: 23429, msg: "chatroom kv's length is out of limit" } },D = {};exports.ERROR_CODE = D;for (var k in L) {var j = L[k].code;D[j] = k;}var B = { CONNECTED: 0, CONNECTING: 1, DISCONNECTED: 2, NETWORK_UNAVAILABLE: 3, SOCKET_ERROR: 4, KICKED_OFFLINE_BY_OTHER_CLIENT: 6, BLOCKED: 12 },G = { COMET: "comet", WEBSOCKET: "websocket" },K = { DESC: 0, ASC: 1 },V = { ASC: 1, DESC: 2 },F = "RC:RcCmd",q = { ALL: 1, SINGAL: 2 },H = { TEXT: "RC:TxtMsg", VOICE: "RC:VcMsg", HQ_VOICE: "RC:HQVCMsg", IMAGE: "RC:ImgMsg", GIF: "RC:GIFMsg", RICH_CONTENT: "RC:ImgTextMsg", LOCATION: "RC:LBSMsg", FILE: "RC:FileMsg", SIGHT: "RC:SightMsg", COMBINE: "RC:CombineMsg", CHRM_KV_NOTIFY: "RC:chrmKVNotiMsg", LOG_COMMAND: "RC:LogCmdMsg", EXPANSION_NOTIFY: "RC:MsgExMsg", REFERENCE: "RC:ReferenceMsg" },W = { READ: 1, LISTENED: 2, DOWNLOADED: 4, RETRIEVED: 8, UNREAD: 0 },X = "4.5.1";exports.SDK_VERSION = X;exports.RECEIVED_STATUS = W;exports.MESSAGE_TYPE = H;exports.MENTIONED_TYPE = q;exports.RECALL_MESSAGE_TYPE = F;exports.CHATROOM_ORDER = V;exports.MESSAGS_TIME_ORDER = K;exports.CONNECT_TYPE = G;exports.CONNECTION_STATUS = B;function Y(t) {var n = t.conversationType,o = t.messageType,r = t.content,s = t.senderUserId,i = t.targetId,a = t.sentTime,c = t.receivedTime,u = t.messageUId,d = t.messageDirection,g = t.isPersited,h = t.isCounted,f = t.isOffLineMessage,p = t.canIncludeExpansion,l = t.expansion,m = t.receivedStatus,v = t.disableNotification,S = t.isMentioned,I = t.isStatusMessage,y = t.readReceiptInfo;return m || (m = _engine.ReceivedStatus.UNREAD), { messageType: o, content: r, senderUserId: s, targetId: i, type: n, sentTime: a, receivedTime: c, messageUId: u, messageDirection: d, isPersited: g, isCounted: h, isOffLineMessage: f, isMentioned: S, disableNotification: v, isStatusMessage: I, canIncludeExpansion: p, expansion: l, receivedStatus: m, readReceiptInfo: y };}function J(t) {var e = t.conversationType,n = t.targetId,o = t.latestMessage,r = t.unreadMessageCount,s = t.hasMentioned,i = t.mentionedInfo,a = t.lastUnreadTime,c = t.notificationStatus,u = t.isTop;return { type: e, targetId: n, latestMessage: o && Y(o), unreadMessageCount: r, hasMentioned: s, mentionedInfo: s ? { type: null == i ? void 0 : i.type, userIdList: null == i ? void 0 : i.userIdList } : void 0, lastUnreadTime: a, notificationStatus: c, isTop: u };}function Q(t) {(0, _engine.assert)("options.messageType", t.messageType, _engine.AssertRules.STRING, !0), (0, _engine.assert)("options.content", t.content, function (t) {return (0, _engine.isObject)(t);}, !0), (0, _engine.assert)("options.isPersited", t.isPersited, _engine.AssertRules.BOOLEAN), (0, _engine.assert)("options.isCounted", t.isCounted, _engine.AssertRules.BOOLEAN), (0, _engine.assert)("options.pushContent", t.pushContent, _engine.AssertRules.STRING), (0, _engine.assert)("options.pushData", t.pushData, _engine.AssertRules.STRING), (0, _engine.assert)("options.isVoipPush", t.isVoipPush, _engine.AssertRules.BOOLEAN), (0, _engine.assert)("options.isStatusMessage", t.isStatusMessage, _engine.AssertRules.BOOLEAN), (0, _engine.assert)("options.isMentioned", t.isMentioned, _engine.AssertRules.BOOLEAN), (0, _engine.assert)("options.mentionedType", t.mentionedType, _engine.AssertRules.NUMBER), (0, _engine.assert)("options.mentionedUserIdList", t.mentionedUserIdList, function (t) {return (0, _engine.isArray)(t) && (0 === t.length || t.every(_engine.isString));}), (0, _engine.assert)("options.directionalUserIdList", t.directionalUserIdList, function (t) {return (0, _engine.isArray)(t) && (0 === t.length || t.every(_engine.isString));}), (0, _engine.isUndefined)(t.isPersited) && (0, _engine.isUndefined)(t.isCounted) && (0, _engine.isUndefined)(t.isStatusMessage) || A.warn("The parameters `isPersited`, `isCounted`, `isStatusMessage` will be deprecated in future releases due to inconsistance of the values on mobile side and web side. Please use `registerMessageType` instead for non-integrated message type.");}var z = function z(t, e) {if (!t) return [];var n = Z(t),o = et(n.topConversationList, e),r = et(n.unToppedConversationList, e);return o.push.apply(o, r), o;},Z = function Z(t) {var e = [],n = [];return (0, _engine.forEach)(t, function (t) {var o = t.hasMentioned,r = t.mentionedInfo;t.hasMentioned = o, t.mentionedInfo = r, t.isTop || !1 ? e.push(t) : n.push(t);}), { topConversationList: e || [], unToppedConversationList: n || [] };},$ = function $(t) {return t.type + "_" + t.targetId;},et = function et(t, e) {return void 0 === e && (e = 0), ot(t, function (t, n) {n = n || {};var o = (t = t || {}).latestMessage || {},r = n.latestMessage || {},s = o.sentTime || 0,i = r.sentTime || 0;return e ? i >= s : i <= s;});},nt = function nt(t) {var e = (t = t || {}).targetId,n = t.type,o = _engine.ConversationType.PRIVATE,r = { messageType: _engine.MessageType.TextMessage, sentTime: _engine.DelayTimer.getTime(), content: { content: "" }, senderUserId: e, targetId: e, type: n };return t.type = n || o, t.targetId = e || "", t.latestMessage = t.latestMessage || r, t;},ot = function ot(t, e) {var n = function n(t, e, o, r) {if (r = r || function (t, e) {return t <= e;}, e < o) {for (var s = t[o], i = e - 1, a = void 0, c = e; c <= o; c++) {r(t[c], s) && (a = t[++i], t[i] = t[c], t[c] = a);}n(t, e, i - 1, r), n(t, i + 1, o, r);}return t;};return n(t, 0, t.length - 1, e);},rt = function rt(t) {return !t.type || !t.targetId || !(0, _engine.isObject)(t.latestMessage) || (0, _engine.isUndefined)(t.unreadMessageCount);},st = function st(t, e, n) {var o = (n = n || {}).isAllowNull;for (var r in t = t || {}, e = e || {}) {var s = e[r];(0, _engine.isUndefined)(s) && !o || (t[r] = s);}return t;},it = function () {function t(t, e) {this._context = t, this.targetId = e.targetId, this.type = e.type;}return t.prototype.destory = function () {return U(this, void 0, void 0, function () {var t, e;return x(this, function (n) {switch (n.label) {case 0:return [4, this._context.removeConversation(this.type, this.targetId)];case 1:return t = n.sent(), e = "type:" + this.type + ",targetId:" + this.targetId, A.debug("destroy conversation ->" + e), t !== _engine.ErrorCode.SUCCESS ? (A.warn("destroy conversation fail ->" + t + ":" + D[t] + "," + e), [2, Promise.reject({ code: t, msg: D[t] })]) : [2];}});});}, t.prototype.read = function () {return U(this, void 0, void 0, function () {var t, e;return x(this, function (n) {switch (n.label) {case 0:return [4, this._context.clearUnreadCount(this.type, this.targetId)];case 1:return t = n.sent(), e = "type:" + this.type + ",targetId:" + this.targetId, A.debug("clear unreadMsgNum ->" + e), t !== _engine.ErrorCode.SUCCESS ? (A.warn("clear unreadMsgNum fail ->" + t + ":" + D[t] + "," + e), [2, Promise.reject({ code: t, msg: D[t] })]) : [2];}});});}, t.prototype.getUnreadCount = function () {return U(this, void 0, void 0, function () {var t, e, n, o;return x(this, function (r) {switch (r.label) {case 0:return [4, this._context.getUnreadCount(this.type, this.targetId)];case 1:return t = r.sent(), e = t.code, n = t.data, o = "type:" + this.type + ",targetId:" + this.targetId, A.debug("get unreadCount ->" + o), e === _engine.ErrorCode.SUCCESS ? [2, n] : (A.warn("get unreadCount fail ->" + e + ":" + D[e] + "," + o), [2, Promise.reject({ code: e, msg: D[e] })]);}});});}, t.prototype.send = function (t) {return U(this, void 0, void 0, function () {var n, o, r, s;return x(this, function (i) {switch (i.label) {case 0:return Q(t), Object.prototype.hasOwnProperty.call(t, "isPersited") || (t.isPersited = !0), Object.prototype.hasOwnProperty.call(t, "isCounted") || (t.isCounted = !0), n = "type:" + this.type + ",targetId:" + this.targetId, A.debug("send message  ->" + n), [4, this._context.sendMessage(this.type, this.targetId, t)];case 1:return o = i.sent(), r = o.code, s = o.data, r === _engine.ErrorCode.SUCCESS ? [2, Y(s)] : (A.warn("send message fail ->" + r + ":" + D[r] + "," + n), [2, Promise.reject({ code: r, msg: D[r], data: Y({ isMentioned: !!t.isMentioned, content: t.content, messageType: t.messageType, isPersited: t.isPersited || !1, isCounted: t.isCounted || !1, disableNotification: !!(null == t ? void 0 : t.disableNotification), canIncludeExpansion: !!(null == t ? void 0 : t.canIncludeExpansion), expansion: (null == t ? void 0 : t.expansion) || null, conversationType: this.type, targetId: this.targetId, senderUserId: this._context.getCurrentUserId(), messageUId: "", messageDirection: _engine.MessageDirection.SEND, isOffLineMessage: !1, sentTime: (null == s ? void 0 : s.sentTime) || 0, receivedTime: 0, isStatusMessage: t.isStatusMessage || !1, receivedStatus: _engine.ReceivedStatus.UNREAD }) })]);}});});}, t.prototype.setStatus = function (t) {return U(this, void 0, void 0, function () {var e, r;return x(this, function (s) {switch (s.label) {case 0:return (0, _engine.assert)("options.notificationStatus", t.notificationStatus, function (t) {return 1 === t || 2 === t;}), (0, _engine.assert)("options.isTop", t.isTop, _engine.AssertRules.BOOLEAN), e = "type:" + this.type + ",targetId:" + this.targetId, A.debug("set conversation status ->" + e), [4, this._context.setConversationStatus(this.type, this.targetId, t.isTop, t.notificationStatus)];case 1:return (r = s.sent()) !== _engine.ErrorCode.SUCCESS ? (A.warn("set conversation status fail ->" + r + ":" + D[r] + "," + e), [2, Promise.reject({ code: r, msg: D[r] })]) : [2];}});});}, t.prototype.getMessages = function (t) {return U(this, void 0, void 0, function () {var e, r, s, i, a;return x(this, function (c) {switch (c.label) {case 0:return (0, _engine.assert)("options.timestamp", t.timestamp, _engine.AssertRules.NUMBER), (0, _engine.assert)("options.count", t.count, _engine.AssertRules.NUMBER), (0, _engine.assert)("options.order", t.order, function (t) {return 0 === t || 1 === t;}), e = "type:" + this.type + ",targetId:" + this.targetId, A.debug("get history message ->" + e), [4, this._context.getHistoryMessage(this.type, this.targetId, null == t ? void 0 : t.timestamp, null == t ? void 0 : t.count, null == t ? void 0 : t.order)];case 1:return r = c.sent(), s = r.code, i = r.data, s === _engine.ErrorCode.SUCCESS && i ? (a = i.list.map(function (t) {return Y(t);}), [2, Promise.resolve({ list: a, hasMore: i.hasMore })]) : (A.warn("get history message fail ->" + s + ":" + D[s] + "," + e), [2, Promise.reject({ code: s, msg: D[s] })]);}});});}, t.prototype.recall = function (t) {return U(this, void 0, void 0, function () {var e, r, s, i, a;return x(this, function (c) {switch (c.label) {case 0:return (0, _engine.assert)("options.messageUId", t.messageUId, _engine.AssertRules.STRING, !0), (0, _engine.assert)("options.sentTime", t.sentTime, _engine.AssertRules.NUMBER, !0), (0, _engine.assert)("options.disableNotification", null == t ? void 0 : t.disableNotification, _engine.AssertRules.BOOLEAN), (0, _engine.assert)("options.pushConfig", null == t ? void 0 : t.pushConfig, _engine.AssertRules.OBJECT), e = { user: t.user, channelId: "", disableNotification: null == t ? void 0 : t.disableNotification, pushConfig: null == t ? void 0 : t.pushConfig }, r = "type:" + this.type + ",targetId:" + this.targetId + ",messageUId:" + t.messageUId, A.debug("recall message ->" + r), [4, this._context.recallMessage(this.type, this.targetId, t.messageUId, t.sentTime, e)];case 1:return s = c.sent(), i = s.code, a = s.data, i === _engine.ErrorCode.SUCCESS && a ? [2, Y(a)] : (A.warn("recall message fail ->" + i + ":" + D[i] + "," + r), [2, Promise.reject({ code: i, msg: D[i] })]);}});});}, t.prototype.deleteMessages = function (t) {return U(this, void 0, void 0, function () {var e, r;return x(this, function (i) {switch (i.label) {case 0:return (0, _engine.assert)("options", t, function (t) {return (0, _engine.isArray)(t) && t.length;}, !0), t.forEach(function (t) {(0, _engine.assert)("options.messageUId", t.messageUId, _engine.AssertRules.STRING, !0), (0, _engine.assert)("options.sentTime", t.sentTime, _engine.AssertRules.NUMBER, !0), (0, _engine.assert)("options.messageDirection", t.messageDirection, function (t) {return 1 === t || 2 === t;}, !0);}), e = "type:" + this.type + ",targetId:" + this.targetId, A.debug("delete messages ->" + e), [4, this._context.deleteRemoteMessage(this.type, this.targetId, t)];case 1:return (r = i.sent()) !== _engine.ErrorCode.SUCCESS ? (A.warn("delete message fail ->" + r + ":" + D[r] + "," + e), [2, Promise.reject({ code: r, msg: D[r] })]) : [2];}});});}, t.prototype.clearMessages = function (t) {return U(this, void 0, void 0, function () {var e, r;return x(this, function (s) {switch (s.label) {case 0:return (0, _engine.assert)("options.timestamp", t.timestamp, _engine.AssertRules.NUMBER, !0), e = "type:" + this.type + ",targetId:" + this.targetId, A.debug("clear message ->" + e), [4, this._context.deleteRemoteMessageByTimestamp(this.type, this.targetId, t.timestamp)];case 1:return (r = s.sent()) !== _engine.ErrorCode.SUCCESS ? (A.warn("clear message ->" + r + ":" + D[r] + "," + e), [2, Promise.reject({ code: r, msg: D[r] })]) : [2];}});});}, t.prototype.updateMessageExpansion = function (t, e) {return U(this, void 0, void 0, function () {var r, s, i, a, c, u, d;return x(this, function (g) {switch (g.label) {case 0:return (0, _engine.assert)("expansion", t, _engine.AssertRules.OBJECT, !0), (0, _engine.assert)("message", e, _engine.AssertRules.OBJECT, !0), r = e.type, s = e.targetId, i = e.messageUId, a = e.canIncludeExpansion, c = e.expansion, u = "type:" + r + ",targetId:" + this.targetId + ",messageUId:" + i, A.debug("update message expansion ->" + u), [4, this._context.sendExpansionMessage({ conversationType: r, targetId: s, messageUId: i, expansion: t, canIncludeExpansion: a, originExpansion: c, channelId: "" })];case 1:return (d = g.sent().code) !== _engine.ErrorCode.SUCCESS ? (A.warn("update message expansion fail ->" + d + ":" + D[d] + "," + u), [2, Promise.reject({ code: d, msg: D[d] })]) : [2];}});});}, t.prototype.removeMessageExpansion = function (t, e) {return U(this, void 0, void 0, function () {var r, s, i, a, c, u;return x(this, function (d) {switch (d.label) {case 0:return (0, _engine.assert)("keys", t, _engine.AssertRules.ARRAY, !0), (0, _engine.assert)("message", e, _engine.AssertRules.OBJECT, !0), r = e.type, s = e.targetId, i = e.messageUId, a = e.canIncludeExpansion, c = "type:" + r + ",targetId:" + this.targetId + ",messageUId:" + i, A.debug("remove message expansion ->" + c), [4, this._context.sendExpansionMessage({ conversationType: r, targetId: s, messageUId: i, canIncludeExpansion: a, keys: t, channelId: "" })];case 1:return (u = d.sent().code) !== _engine.ErrorCode.SUCCESS ? (A.warn("remove message expansion fail ->" + u + ":" + D[u] + "," + c), [2, Promise.reject({ code: u, msg: D[u] })]) : [2];}});});}, t.prototype.setDraft = function (t) {return U(this, void 0, void 0, function () {var e, r;return x(this, function (s) {switch (s.label) {case 0:return (0, _engine.assert)("draft", t, _engine.AssertRules.STRING, !0), e = "type:" + this.type + ",targetId:" + this.targetId, A.debug("set draft ->" + e), [4, this._context.saveConversationMessageDraft(this.type, this.targetId, t)];case 1:return (r = s.sent()) === _engine.ErrorCode.SUCCESS ? [2, Promise.resolve()] : (A.warn("set draft fail ->" + r + ":" + D[r] + "," + e), [2]);}});});}, t.prototype.getDraft = function () {return U(this, void 0, void 0, function () {var t, e, n, o;return x(this, function (r) {switch (r.label) {case 0:return [4, this._context.getConversationMessageDraft(this.type, this.targetId)];case 1:return t = r.sent(), e = t.code, n = t.data, o = "type:" + this.type + ",targetId:" + this.targetId, A.debug("get draft ->" + o), e === _engine.ErrorCode.SUCCESS ? [2, Promise.resolve(n)] : (A.warn("get draft fail ->" + e + ":" + D[e] + "," + o), [2, Promise.reject({ code: e, msg: D[e] })]);}});});}, t.prototype.deleteDraft = function () {return U(this, void 0, void 0, function () {var t, e;return x(this, function (n) {switch (n.label) {case 0:return t = "type:" + this.type + ",targetId:" + this.targetId, A.debug("delete draft  ->" + t), [4, this._context.clearConversationMessageDraft(this.type, this.targetId)];case 1:return (e = n.sent()) === _engine.ErrorCode.SUCCESS ? [2, Promise.resolve()] : (A.warn("delete draft fail ->" + e + ":" + D[e] + "," + t), [2]);}});});}, t.prototype.sendReadReceiptMessage = function (t) {return U(this, void 0, void 0, function () {var e, r, s, i, a;return x(this, function (c) {switch (c.label) {case 0:for ((0, _engine.assert)("messageUIds", t, _engine.AssertRules.ARRAY, !0), e = 0, r = t; e < r.length; e++) {s = r[e], (0, _engine.assert)("messageUId", s, _engine.AssertRules.STRING);}return i = "messageUIds:" + t.join(",") + ",targetId:" + this.targetId, A.debug("send read receipt message ->" + i), [4, this._context.sendReadReceiptMessage(this.targetId, t)];case 1:return (a = c.sent().code) === _engine.ErrorCode.SUCCESS ? [2, Promise.resolve()] : (A.warn("send read receipt message fail ->" + a + ":" + D[a] + "," + i), [2, Promise.reject(a)]);}});});}, t.prototype.sendTypingStatusMessage = function (t) {return U(this, void 0, void 0, function () {var e, r, s, i, a;return x(this, function (c) {switch (c.label) {case 0:return (0, _engine.assert)("typingContentType", t, _engine.AssertRules.STRING, !0), e = "type:" + this.type + ",targetId:" + this.targetId, A.debug("send typing status message ->" + e), r = { messageType: "RC:TypSts", content: { typingContentType: t }, isStatusMessage: !0, channelId: "" }, [4, this._context.sendMessage(this.type, this.targetId, r)];case 1:return s = c.sent(), i = s.code, a = s.data, i === _engine.ErrorCode.SUCCESS ? [2, Y(a)] : (A.warn("send typing status message fail ->" + i + ":" + D[i] + "," + e), [2, Promise.reject({ code: i, msg: D[i] })]);}});});}, t.prototype.getMessageReader = function (t) {return U(this, void 0, void 0, function () {var e, r, s, i;return x(this, function (a) {switch (a.label) {case 0:return (0, _engine.assert)("messageUId", t, _engine.AssertRules.STRING, !0), e = "messageUId:" + t + ",targetId:" + this.targetId, A.debug("get message reader ->" + e), [4, this._context.getMessageReader(this.targetId, t)];case 1:return r = a.sent(), s = r.code, i = r.data, s === _engine.ErrorCode.SUCCESS ? [2, Promise.resolve(i)] : (A.warn("get message reader fail ->" + s + ":" + D[s] + "," + e), [2, Promise.reject(s)]);}});});}, t.prototype.getInfo = function () {return U(this, void 0, void 0, function () {var t, e, n;return x(this, function (o) {switch (o.label) {case 0:return [4, this._context.getConversation(this.type, this.targetId, "")];case 1:return t = o.sent(), e = t.code, n = t.data, e === _engine.ErrorCode.SUCCESS && n ? [2, J(n)] : [2, Promise.reject({ code: e, msg: D[e] })];}});});}, t.prototype.removeTags = function (t) {return U(this, void 0, void 0, function () {var e;return x(this, function (r) {switch (r.label) {case 0:return (0, _engine.assert)("tagIds", t, _engine.AssertRules.ARRAY, !0), t.forEach(function (t) {(0, _engine.assert)("tagId", t, _engine.AssertRules.STRING, !0);}), A.info("removeTags ->targetId:" + this.targetId + ",type:" + this.type), [4, this._context.removeTagsForConversation({ type: this.type, targetId: this.targetId }, t)];case 1:return (e = r.sent().code) === _engine.ErrorCode.SUCCESS ? [2, e] : (A.warn("removeTags fail ->" + e + ":" + D[e]), [2, Promise.reject({ code: e, msg: D[e] })]);}});});}, t.prototype.getTags = function () {return U(this, void 0, void 0, function () {var t, e, n;return x(this, function (o) {switch (o.label) {case 0:return A.info("getTags ->targetId:" + this.targetId + ",type:" + this.type), [4, this._context.getTagsForConversation({ type: this.type, targetId: this.targetId })];case 1:return t = o.sent(), e = t.code, n = t.data, e === _engine.ErrorCode.SUCCESS ? [2, n || []] : (A.warn("getTags fail ->" + e + ":" + D[e]), [2, Promise.reject({ code: e, msg: D[e] })]);}});});}, t;}(),at = function () {function t(t) {this._context = t;}return t.prototype.getList = function (t) {return U(this, void 0, void 0, function () {var e, n, o, r;return x(this, function (s) {switch (s.label) {case 0:return A.debug("get conversation list ->"), [4, this._context.getConversationList(null == t ? void 0 : t.count, void 0, null == t ? void 0 : t.startTime, null == t ? void 0 : t.order)];case 1:return e = s.sent(), n = e.code, o = e.data, n === _engine.ErrorCode.SUCCESS && o ? (r = o.map(function (t) {return J(t);}), [2, z(r)]) : (A.warn("get conversation list fail ->" + n + ":" + D[n]), [2, Promise.reject({ code: n, msg: D[n] })]);}});});}, t.prototype.get = function (t) {return (0, _engine.assert)("options.type", t.type, _engine.isValidConversationType, !0), new it(this._context, t);}, t.prototype.remove = function (t) {return (0, _engine.assert)("options.type", t.type, _engine.isValidConversationType, !0), new it(this._context, t).destory();}, t.prototype.getTotalUnreadCount = function (t, e) {return U(this, void 0, void 0, function () {var r, s, i, a, c, u;return x(this, function (d) {switch (d.label) {case 0:if (A.debug("get total unread count -> ConversationType:" + JSON.stringify(e) + " includeMuted:" + t), (0, _engine.assert)("includeMuted", t, _engine.AssertRules.BOOLEAN, !1), (0, _engine.assert)("conversationTypes", e, _engine.AssertRules.ARRAY, !1), e) for (r = 0, s = e; r < s.length; r++) {i = s[r], (0, _engine.assert)("conversationType", i, _engine.AssertRules.NUMBER);}return [4, this._context.getTotalUnreadCount("", e, t)];case 1:return a = d.sent(), c = a.code, u = a.data, c === _engine.ErrorCode.SUCCESS ? [2, u] : (A.warn("getTotalUnreadCount fail ->" + c + ":" + D[c]), [2, Promise.reject({ code: c, msg: D[c] })]);}});});}, t.prototype.merge = function (t) {return !t.conversationList && A.warn("Parameter option.conversationList are required!"), function (t) {var e = (t = t || {}).conversationList,n = t.updatedConversationList;e = e || [];var o = P(P([], n = n || []), e),s = {},i = [],d = [];return (0, _engine.forEach)(o, function (t) {if ((0, _engine.isObject)(t)) {var e = t.type,n = t.targetId,o = $({ type: e, targetId: n }),c = s[o] || {},g = (0, _engine.isUndefined)(c.index) ? i.length : c.index,h = c.val || {},f = h.updatedItems || {},p = t.updatedItems;t = st(t, h), (0, _engine.forEach)(f, function (e, n) {t[n] = e.val;}), (0, _engine.forEach)(p, function (e, n) {var o = (f[n] || {}).time || 0;e.time > o && (t[n] = e.val);}), s[o] = { index: g, val: t }, i[g] = t, rt(t) && d.push(g);}}), (0, _engine.forEach)(d, function (t) {var e = i[t];i[t] = nt(e);}), i = z(i), (0, _engine.map)(i, function (t) {return delete t.updatedItems, t;});}(t);}, t;}(),ct = function () {function t(t, e) {this._context = t, this.tagId = e;}return t.prototype.update = function (t) {return U(this, void 0, void 0, function () {var e;return x(this, function (r) {switch (r.label) {case 0:return (0, _engine.assert)("tagName", t, _engine.AssertRules.STRING, !0), (0, _engine.assert)("tagName", t, function (t) {return t.length <= 15;}), A.info("update ->tagId:" + this.tagId + ",tagName:" + t), [4, this._context.updateTag({ tagId: this.tagId, tagName: t })];case 1:return (e = r.sent().code) === _engine.ErrorCode.SUCCESS ? [2, e] : (A.warn("update ->code:" + e + ",tagId:" + this.tagId), [2, Promise.reject({ code: e, msg: D[e] })]);}});});}, t.prototype.remove = function () {return U(this, void 0, void 0, function () {var t;return x(this, function (e) {switch (e.label) {case 0:return A.info("remove ->tagId:" + this.tagId), [4, this._context.removeTag(this.tagId)];case 1:return (t = e.sent().code) === _engine.ErrorCode.SUCCESS ? [2, t] : (A.warn("remove ->code:" + t + ",tagId:" + this.tagId), [2, Promise.reject({ code: t, msg: D[t] })]);}});});}, t.prototype.addConversations = function (t) {return U(this, void 0, void 0, function () {var e;return x(this, function (r) {switch (r.label) {case 0:return (0, _engine.assert)("conversations", t, _engine.AssertRules.ARRAY, !0), t.forEach(function (t) {(0, _engine.assert)("conversation.type", t.type, _engine.AssertRules.NUMBER, !0), (0, _engine.assert)("conversation.targetId", t.targetId, _engine.AssertRules.STRING, !0);}), A.info("addConversations ->tagId:" + this.tagId), [4, this._context.addTagForConversations(this.tagId, t)];case 1:return (e = r.sent().code) === _engine.ErrorCode.SUCCESS ? [2, e] : (A.warn("addConversations ->code:" + e + ",tagId:" + this.tagId), [2, Promise.reject({ code: e, msg: D[e] })]);}});});}, t.prototype.removeConversations = function (t) {return U(this, void 0, void 0, function () {var e;return x(this, function (n) {switch (n.label) {case 0:return A.info("removeConversations ->tagId:" + this.tagId), [4, this._context.removeTagForConversations(this.tagId, t)];case 1:return (e = n.sent().code) === _engine.ErrorCode.SUCCESS ? [2, e] : (A.warn("removeConversations ->code:" + e + ",tagId:" + this.tagId), [2, Promise.reject({ code: e, msg: D[e] })]);}});});}, t.prototype.getConversationList = function (t, e) {return U(this, void 0, void 0, function () {var r, s, i, a;return x(this, function (c) {switch (c.label) {case 0:return (0, _engine.assert)("count", e, _engine.AssertRules.NUMBER, !0), (0, _engine.assert)("startTime", t, _engine.AssertRules.NUMBER, !0), A.info("getConversationList ->tagId:" + this.tagId), [4, this._context.getConversationListByTag(this.tagId, t, e)];case 1:return r = c.sent(), s = r.data, i = r.code, a = [], i === _engine.ErrorCode.SUCCESS ? ((s = s || []).forEach(function (t) {var e = t.channelId,n = t.conversationType,o = t.targetId,r = t.unreadMessageCount,s = t.latestMessage,i = t.hasMentioned,c = t.mentionedInfo,u = t.notificationStatus,d = t.isTop,g = t.lastUnreadTime,h = t.isTopInTag;a.push({ channelId: e, conversationType: n, targetId: o, unreadMessageCount: r, latestMessage: s, hasMentioned: i, mentionedInfo: c, notificationStatus: u, isTop: d, lastUnreadTime: g, isTopInTag: h });}), [2, a]) : (A.warn("getConversationList ->code:" + i + ",tagId:" + this.tagId), [2, Promise.reject({ code: i, msg: D[i] })]);}});});}, t.prototype.getUnreadCount = function (t) {return U(this, void 0, void 0, function () {var e, r, s;return x(this, function (i) {switch (i.label) {case 0:return (0, _engine.assert)("isIncludeNotNotification", t, _engine.AssertRules.BOOLEAN, !0), A.info("getUnreadCount ->tagId:" + this.tagId), [4, this._context.getUnreadCountByTag(this.tagId, t)];case 1:return e = i.sent(), r = e.data, (s = e.code) === _engine.ErrorCode.SUCCESS ? [2, r || 0] : (A.warn("getUnreadCount ->code:" + s + ",tagId:" + this.tagId), [2, Promise.reject({ code: s, msg: D[s] })]);}});});}, t.prototype.updateConversationIsTop = function (t, e) {return U(this, void 0, void 0, function () {var r;return x(this, function (s) {switch (s.label) {case 0:return (0, _engine.assert)("conversation.targetId", t.targetId, _engine.AssertRules.STRING, !0), (0, _engine.assert)("conversation.type", t.type, _engine.AssertRules.NUMBER, !0), (0, _engine.assert)("isTop", e, _engine.AssertRules.BOOLEAN, !0), A.info("updateConversationIsTop ->tagId:" + this.tagId), [4, this._context.setConversationStatusInTag(this.tagId, t, { isTop: e })];case 1:return (r = s.sent().code) === _engine.ErrorCode.SUCCESS ? [2, r] : (A.warn("updateConversationIsTop ->code:" + r + ",tagId:" + this.tagId), [2, Promise.reject({ code: r, msg: D[r] })]);}});});}, t;}(),ut = function () {function t(t) {this._context = t;}return t.prototype.create = function (t) {return U(this, void 0, void 0, function () {var e;return x(this, function (r) {switch (r.label) {case 0:return (0, _engine.assert)("tag.tagId", t.tagId, _engine.AssertRules.STRING, !0), (0, _engine.assert)("tag.tagId", t.tagId, function (t) {return t.length <= 10;}), (0, _engine.assert)("tag.tagName", t.tagName, function (t) {return t.length <= 15;}), (0, _engine.assert)("tag.tagName", t.tagName, _engine.AssertRules.STRING, !0), A.info("create tag->tagId:" + t.tagId + ",tagName:" + t.tagName), [4, this._context.createTag(t)];case 1:return (e = r.sent().code) === _engine.ErrorCode.SUCCESS ? [2, e] : (A.warn("create tag fail ->" + e + ":" + D[e]), [2, Promise.reject({ code: e, msg: D[e] })]);}});});}, t.prototype.getTagInfoList = function () {return U(this, void 0, void 0, function () {var t, e, n;return x(this, function (o) {switch (o.label) {case 0:return [4, this._context.getTagList()];case 1:return t = o.sent(), e = t.code, n = t.data, e === _engine.ErrorCode.SUCCESS ? [2, n || []] : (A.warn("getTagInfoList ->code:" + e), [2, Promise.reject({ code: e, msg: D[e] })]);}});});}, t.prototype.get = function (t) {return U(this, void 0, void 0, function () {return x(this, function (e) {return (0, _engine.assert)("tag.tagId", t, _engine.AssertRules.STRING, !0), (0, _engine.assert)("tag.tagId", t, function (t) {return t.length <= 10;}), [2, new ct(this._context, t)];});});}, t;}(),dt = function dt(t) {(0, _engine.assert)("options.key", t.key, _engine.AssertRules.STRING, !0), (0, _engine.assert)("options.value", t.value, _engine.AssertRules.STRING, !0), (0, _engine.assert)("options.isAutoDelete", t.isAutoDelete, _engine.AssertRules.BOOLEAN), (0, _engine.assert)("options.isSendNotification", t.isSendNotification, _engine.AssertRules.BOOLEAN), (0, _engine.assert)("options.notificationExtra", t.notificationExtra, _engine.AssertRules.STRING);},gt = function gt(t) {(0, _engine.assert)("options.key", t.key, _engine.AssertRules.STRING, !0), (0, _engine.assert)("options.isSendNotification", t.isSendNotification, _engine.AssertRules.BOOLEAN), (0, _engine.assert)("options.notificationExtra", t.notificationExtra, _engine.AssertRules.STRING);},ht = function () {function t(t, e) {this._context = t, this._id = e;}return t.prototype.join = function (t) {return U(this, void 0, void 0, function () {var e, r;return x(this, function (s) {switch (s.label) {case 0:return (0, _engine.assert)("options.count", t.count, _engine.AssertRules.NUMBER, !0), e = "id:" + this._id, A.debug("join chatroom ->" + e), [4, this._context.joinChatroom(this._id, t.count)];case 1:return (r = s.sent()) !== _engine.ErrorCode.SUCCESS ? (A.warn("join chatroom fail ->code+:" + D[r] + "," + e), [2, Promise.reject({ code: r, msg: D[r] })]) : [2];}});});}, t.prototype.joinExist = function (t) {return U(this, void 0, void 0, function () {var e, r;return x(this, function (s) {switch (s.label) {case 0:return (0, _engine.assert)("options.count", t.count, _engine.AssertRules.NUMBER, !0), e = "id:" + this._id, A.debug("join exist chatroom ->" + e), [4, this._context.joinExistChatroom(this._id, t.count)];case 1:return (r = s.sent()) !== _engine.ErrorCode.SUCCESS ? (A.warn("join exist chatroom fail ->code:" + D[r] + "," + e), [2, Promise.reject({ code: r, msg: D[r] })]) : [2];}});});}, t.prototype.quit = function () {return U(this, void 0, void 0, function () {var t, e;return x(this, function (n) {switch (n.label) {case 0:return t = "id:" + this._id, A.debug("quit chatroom ->" + t), [4, this._context.quitChatroom(this._id)];case 1:return (e = n.sent()) !== _engine.ErrorCode.SUCCESS ? (A.warn("quit chatroom fail ->code+:" + D[e] + "," + t), [2, Promise.reject({ code: e, msg: D[e] })]) : [2];}});});}, t.prototype.getInfo = function (t) {return void 0 === t && (t = {}), U(this, void 0, void 0, function () {var e, r, s, i;return x(this, function (a) {switch (a.label) {case 0:return (0, _engine.assert)("options.count", t.count, _engine.AssertRules.NUMBER), (0, _engine.assert)("options.order", t.order, function (t) {return [0, 1, 2].includes(t);}), e = "id:" + this._id, A.debug("get chatroom info ->" + e), [4, this._context.getChatroomInfo(this._id, t.count, t.order)];case 1:return r = a.sent(), s = r.code, i = r.data, s === _engine.ErrorCode.SUCCESS && i ? [2, i] : (A.warn("get chatroom info fail ->code+:" + D[s] + "," + e), [2, Promise.reject({ code: s, msg: D[s] })]);}});});}, t.prototype.setEntry = function (t) {return U(this, void 0, void 0, function () {var e, n;return x(this, function (o) {switch (o.label) {case 0:return dt(t), e = "id:" + this._id, A.debug("set chatroom entry->" + e), [4, this._context.setChatroomEntry(this._id, t)];case 1:return (n = o.sent()) !== _engine.ErrorCode.SUCCESS ? (A.warn("set chatroom entry fail ->code+:" + D[n] + "," + e), [2, Promise.reject({ code: n, msg: D[n] })]) : [2];}});});}, t.prototype.setEntries = function (t) {return U(this, void 0, void 0, function () {var e, r, s, i;return x(this, function (a) {switch (a.label) {case 0:return function (t) {t.entries.forEach(function (t) {(0, _engine.assert)("entry.key", t.key, _engine.AssertRules.STRING, !0), (0, _engine.assert)("entry.value", t.value, _engine.AssertRules.STRING, !0);}), (0, _engine.assert)("options.isAutoDelete", t.isAutoDelete, _engine.AssertRules.BOOLEAN), (0, _engine.assert)("options.notificationExtra", t.notificationExtra, _engine.AssertRules.STRING);}(t), t.entries.length > 10 ? [2, Promise.reject(L.CHATROOM_KV_STORE_OUT_LIMIT)] : (e = "id:" + this._id, A.debug("set chatroom entry->" + e), [4, this._context.setChatroomEntries(this._id, t)]);case 1:return r = a.sent(), s = r.code, i = r.data, s !== _engine.ErrorCode.SUCCESS ? (A.warn("set chatroom entry fail ->code+:" + D[s] + "," + e), [2, Promise.reject({ code: s, msg: D[s], data: i })]) : [2];}});});}, t.prototype.forceSetEntry = function (t) {return U(this, void 0, void 0, function () {var e, n;return x(this, function (o) {switch (o.label) {case 0:return dt(t), e = "id:" + this._id, A.debug("force set chatroom entry ->" + e), [4, this._context.forceSetChatroomEntry(this._id, t)];case 1:return (n = o.sent()) !== _engine.ErrorCode.SUCCESS ? (A.warn("force set chatroom entry fail ->code+:" + D[n] + "," + e), [2, Promise.reject({ code: n, msg: D[n] })]) : [2];}});});}, t.prototype.removeEntry = function (t) {return U(this, void 0, void 0, function () {var e, n;return x(this, function (o) {switch (o.label) {case 0:return gt(t), e = "id:" + this._id, A.debug("remove chatroom entry->" + e), [4, this._context.removeChatroomEntry(this._id, t)];case 1:return (n = o.sent()) !== _engine.ErrorCode.SUCCESS ? (A.warn("remove chatroom entry fail ->code+:" + D[n] + "," + e), [2, Promise.reject({ code: n, msg: D[n] })]) : [2];}});});}, t.prototype.removeEntries = function (t) {return U(this, void 0, void 0, function () {var e, r, s, i, a;return x(this, function (c) {switch (c.label) {case 0:return function (t) {t.entries.forEach(function (t) {(0, _engine.assert)("key", t, _engine.AssertRules.STRING, !0);});}(t), e = "id:" + this._id, A.debug("remove chatroom entry->" + e), (r = Object.assign({}, t)).entries = t.entries.map(function (t) {return { key: t };}), [4, this._context.removeChatroomEntries(this._id, r)];case 1:return s = c.sent(), i = s.code, a = s.data, i !== _engine.ErrorCode.SUCCESS ? (A.warn("remove chatroom entry fail ->code+:" + D[i] + "," + e), [2, Promise.reject({ code: i, msg: D[i], data: a })]) : [2];}});});}, t.prototype.forceRemoveEntry = function (t) {return U(this, void 0, void 0, function () {var e, n;return x(this, function (o) {switch (o.label) {case 0:return gt(t), e = "id:" + this._id, A.debug("force remove chatroom entry ->" + e), [4, this._context.forceRemoveChatroomEntry(this._id, t)];case 1:return (n = o.sent()) !== _engine.ErrorCode.SUCCESS ? (A.warn("force remove chatroom entry fail ->code+:" + D[n] + "," + e), [2, Promise.reject({ code: n, msg: D[n] })]) : [2];}});});}, t.prototype.getEntry = function (t) {return U(this, void 0, void 0, function () {var e, o, r, s;return x(this, function (a) {switch (a.label) {case 0:return (0, _engine.assert)("key", t, function (t) {return (0, _engine.isString)(t) && /[\w+=-]+/.test(t) && t.length <= 128;}, !0), e = "id:" + this._id, A.debug("get chatroom entry->" + e), [4, this._context.getChatroomEntry(this._id, t)];case 1:return o = a.sent(), r = o.code, s = o.data, r === _engine.ErrorCode.SUCCESS && s ? [2, s] : (A.warn("get chatroom entry fail ->code+:" + D[r] + "," + e), [2, Promise.reject({ code: r, msg: D[r] })]);}});});}, t.prototype.getAllEntries = function () {return U(this, void 0, void 0, function () {var t, e, n, o;return x(this, function (r) {switch (r.label) {case 0:return t = "id:" + this._id, A.debug("get all chatroom entries->" + t), [4, this._context.getAllChatroomEntries(this._id)];case 1:return e = r.sent(), n = e.code, o = e.data, n === _engine.ErrorCode.SUCCESS && o ? [2, o] : (A.warn("get all chatroom entries fail ->code+:" + D[n] + "," + t), [2, Promise.reject({ code: n, msg: D[n] })]);}});});}, t.prototype.send = function (t) {return U(this, void 0, void 0, function () {var e, n, o, r;return x(this, function (s) {switch (s.label) {case 0:return Q(t), e = "id:" + this._id, A.debug("send chatroom message ->" + e), Object.prototype.hasOwnProperty.call(t, "isPersited") || (t.isPersited = !0), Object.prototype.hasOwnProperty.call(t, "isCounted") || (t.isCounted = !0), [4, this._context.sendMessage(_engine.ConversationType.CHATROOM, this._id, t)];case 1:return n = s.sent(), o = n.code, r = n.data, o === _engine.ErrorCode.SUCCESS ? [2, Y(r)] : (A.warn("send chatroom message fail ->code+:" + D[o] + "," + e), [2, Promise.reject({ code: o, msg: D[o] })]);}});});}, t.prototype.getMessages = function (t) {return U(this, void 0, void 0, function () {var e, r, s, i;return x(this, function (a) {switch (a.label) {case 0:return (0, _engine.assert)("options.timestamp", t.timestamp, _engine.AssertRules.NUMBER), (0, _engine.assert)("options.count", t.count, _engine.AssertRules.NUMBER), (0, _engine.assert)("options.order", t.order, function (t) {return 0 === t || 1 === t;}), e = "id:" + this._id, A.debug("get chatroom history message->" + e), [4, this._context.getChatRoomHistoryMessages(this._id, t.count, t.order, t.timestamp)];case 1:return r = a.sent(), s = r.code, i = r.data, s === _engine.ErrorCode.SUCCESS && i ? [2, { list: i.list.map(function (t) {return Y(t);}), hasMore: i.hasMore }] : (A.warn("get chatroom history message fail ->code+:" + D[s] + "," + e), [2, Promise.reject({ code: s, msg: D[s] })]);}});});}, t.prototype.recall = function (t) {return U(this, void 0, void 0, function () {var e, r, s, i, a;return x(this, function (c) {switch (c.label) {case 0:return (0, _engine.assert)("options.messageUId", t.messageUId, _engine.AssertRules.STRING, !0), (0, _engine.assert)("options.sentTime", t.sentTime, _engine.AssertRules.NUMBER, !0), e = "id:" + this._id + ",messageUId:" + t.messageUId, A.debug("chatroom recall->" + e), r = _engine.ConversationType.CHATROOM, [4, this._context.recallMessage(r, this._id, t.messageUId, t.sentTime, { channelId: "", user: t.user })];case 1:return s = c.sent(), i = s.code, a = s.data, i === _engine.ErrorCode.SUCCESS && a ? [2, Y(a)] : (A.warn("chatroom recall fail->code+:" + D[i] + "," + e), [2, Promise.reject({ code: i, msg: D[i] })]);}});});}, t;}(),ft = function () {function t(t) {this._context = t;}return t.prototype.get = function (t) {return (0, _engine.assert)("option.id", t.id, _engine.notEmptyString, !0), new ht(this._context, t.id);}, t;}(),pt = function () {function t(t, e) {this._options = t, this._context = e, this._roomId = t.id;}return t.prototype.join = function () {return U(this, void 0, void 0, function () {var t, e, n, o;return x(this, function (r) {switch (r.label) {case 0:return t = "roomId:" + this._roomId, A.debug("join ->" + t), [4, this._context.joinRTCRoom(this._roomId, this._options.mode, this._options.broadcastType)];case 1:return e = r.sent(), n = e.code, o = e.data, n === _engine.ErrorCode.SUCCESS ? [2, o] : (A.warn("join fail ->" + n + ":" + D[n] + "," + t), [2, Promise.reject(n)]);}});});}, t.prototype.quit = function () {return U(this, void 0, void 0, function () {var t, e;return x(this, function (n) {switch (n.label) {case 0:return t = "roomId:" + this._roomId, A.debug("quit ->" + t), [4, this._context.quitRTCRoom(this._roomId)];case 1:return (e = n.sent()) === _engine.ErrorCode.SUCCESS ? [2, e] : (A.warn("quit fail ->" + e + ":" + D[e] + "," + t), [2, Promise.reject(e)]);}});});}, t.prototype.getRoomInfo = function () {return U(this, void 0, void 0, function () {var t, e, n, o;return x(this, function (r) {switch (r.label) {case 0:return t = "roomId:" + this._roomId, A.debug("get roomInfo ->" + t), [4, this._context.getRTCRoomInfo(this._roomId)];case 1:return e = r.sent(), n = e.code, o = e.data, n === _engine.ErrorCode.SUCCESS ? [2, o] : (A.warn("get roomInfo fail ->" + n + ":" + D[n] + "," + t), [2, Promise.reject(n)]);}});});}, t.prototype.setUserInfo = function (t) {return U(this, void 0, void 0, function () {var e, n;return x(this, function (o) {switch (o.label) {case 0:return e = "roomId:" + this._roomId + ",key:" + t.key + ",value:" + t.value, A.debug("set userInfo ->" + e), [4, this._context.setRTCUserInfo(this._roomId, t.key, t.value)];case 1:return (n = o.sent()) === _engine.ErrorCode.SUCCESS ? [2, n] : (A.warn("set userInfo fail ->" + n + ":" + D[n] + "," + e), [2, Promise.reject(n)]);}});});}, t.prototype.removeUserInfo = function (t) {return U(this, void 0, void 0, function () {var e, n;return x(this, function (o) {switch (o.label) {case 0:return e = "roomId:" + this._roomId + ",keys:" + (t.keys || []).join(","), A.debug("remove useerInfo ->" + e), [4, this._context.removeRTCUserInfo(this._roomId, t.keys)];case 1:return (n = o.sent()) === _engine.ErrorCode.SUCCESS ? [2, n] : (A.warn("remove userInfo fail ->" + n + ":" + D[n] + "," + e), [2, Promise.reject(n)]);}});});}, t.prototype.setData = function (t, e, n, o, r) {return U(this, void 0, void 0, function () {var s, i;return x(this, function (a) {switch (a.label) {case 0:return s = "roomId:" + this._roomId + ",key:" + t + ",value:" + e, A.debug("set data ->" + s), [4, this._context.setRTCData(this._roomId, t, e, n, o, r)];case 1:return (i = a.sent()) === _engine.ErrorCode.SUCCESS ? [2, i] : (A.warn("set data fail ->" + i + ":" + D[i] + "," + s), [2, Promise.reject(i)]);}});});}, t.prototype.setUserData = function (t, e, n, o) {return this.setData(t, e, n, _engine.RTCApiType.PERSON, o);}, t.prototype.setRTCUserData = function (t, e, n) {return U(this, void 0, void 0, function () {var o, r;return x(this, function (s) {switch (s.label) {case 0:return o = "roomId:" + this._roomId, A.debug("set rtc user ->" + o), [4, this._context.setRTCTotalRes(this._roomId, t, e, n)];case 1:return (r = s.sent()) === _engine.ErrorCode.SUCCESS ? [2, r] : (A.warn("set rtc user fail ->" + r + ":" + D[r] + "," + o), [2, Promise.reject(r)]);}});});}, t.prototype.getData = function (t, e, n) {return U(this, void 0, void 0, function () {var o, r, s, i;return x(this, function (a) {switch (a.label) {case 0:return o = "roomId:" + this._roomId, A.debug("get data ->" + o), [4, this._context.getRTCData(this._roomId, t, e, n)];case 1:return r = a.sent(), s = r.code, i = r.data, s === _engine.ErrorCode.SUCCESS ? [2, i] : (A.warn("get data fail ->" + s + ":" + D[s] + "," + o), [2, Promise.reject(s)]);}});});}, t.prototype.getUserData = function (t, e) {return this.getData(t, e, _engine.RTCApiType.PERSON);}, t.prototype.removeData = function (t, e, n, o) {return U(this, void 0, void 0, function () {var r, s;return x(this, function (i) {switch (i.label) {case 0:return r = "roomId:" + this._roomId + ",keys:" + t.join(","), A.debug("remove data ->" + r), [4, this._context.removeRTCData(this._roomId, t, e, n, o)];case 1:return (s = i.sent()) === _engine.ErrorCode.SUCCESS ? [2, s] : (A.warn("remove data fail ->" + s + ":" + D[s] + "," + r), [2, Promise.reject(s)]);}});});}, t.prototype.removeUserData = function (t, e, n) {return this.removeData(t, e, _engine.RTCApiType.PERSON, n);}, t.prototype.setRoomData = function (t, e, n, o) {return this.setData(t, e, n, _engine.RTCApiType.ROOM, o);}, t.prototype.getRoomData = function (t, e) {return this.getData(t, e, _engine.RTCApiType.ROOM);}, t.prototype.removeRoomData = function (t, e, n) {return this.removeData(t, e, _engine.RTCApiType.ROOM, n);}, t.prototype.setState = function (t) {return U(this, void 0, void 0, function () {var e, n;return x(this, function (o) {switch (o.label) {case 0:return e = "roomId:" + this._roomId, A.debug("set state ->" + e), [4, this._context.setRTCState(this._roomId, t.report)];case 1:return (n = o.sent()) === _engine.ErrorCode.SUCCESS ? [2, n] : (A.warn("set state fail ->" + n + ":" + D[n] + "," + e), [2, Promise.reject(n)]);}});});}, t.prototype.getUserList = function () {return U(this, void 0, void 0, function () {var t, e, n, o;return x(this, function (r) {switch (r.label) {case 0:return t = "roomId:" + this._roomId, A.debug("get userList ->" + t), [4, this._context.getRTCUserInfoList(this._roomId)];case 1:return e = r.sent(), n = e.code, o = e.data, n === _engine.ErrorCode.SUCCESS ? [2, o] : (A.warn("get userList fail ->" + n + ":" + D[n] + "," + t), [2, Promise.reject(n)]);}});});}, t.prototype.getUserInfoList = function () {return U(this, void 0, void 0, function () {var t, e, n, o;return x(this, function (r) {switch (r.label) {case 0:return t = "roomId:" + this._roomId, A.debug("get userInfo list ->" + t), [4, this._context.getRTCUserInfoList(this._roomId)];case 1:return e = r.sent(), n = e.code, o = e.data, n === _engine.ErrorCode.SUCCESS ? [2, null == o ? void 0 : o.users] : (A.warn("get userInfo list fail ->" + n + ":" + D[n] + "," + t), [2, Promise.reject(n)]);}});});}, t.prototype.getToken = function () {return U(this, void 0, void 0, function () {var t, e, n, o;return x(this, function (r) {switch (r.label) {case 0:return t = "roomId:" + this._roomId, A.debug("getToken ->" + t), [4, this._context.getRTCToken(this._roomId, this._options.mode, this._options.broadcastType)];case 1:return e = r.sent(), n = e.data, (o = e.code) === _engine.ErrorCode.SUCCESS ? [2, n] : (A.warn("getToken fail ->" + o + ":" + D[o] + "," + t), [2, Promise.reject(o)]);}});});}, t.prototype.ping = function () {return U(this, void 0, void 0, function () {var t, e;return x(this, function (n) {switch (n.label) {case 0:return t = "roomId:" + this._roomId, A.debug("ping ->" + t), [4, this._context.rtcPing(this._roomId, this._options.mode, this._options.broadcastType)];case 1:return (e = n.sent()) === _engine.ErrorCode.SUCCESS ? [2, e] : (A.warn("ping fail ->" + e + ":" + D[e] + "," + t), [2, Promise.reject(e)]);}});});}, t.prototype.send = function (t) {return U(this, void 0, void 0, function () {var e, n, o, r;return x(this, function (s) {switch (s.label) {case 0:return e = "roomId:" + this._roomId, A.debug("send ->" + e), [4, this._context.sendMessage(_engine.ConversationType.RTC_ROOM, this._roomId, { content: _b({}, t.content), messageType: t.messageType })];case 1:return n = s.sent(), o = n.code, r = n.data, o === _engine.ErrorCode.SUCCESS ? [2, r] : (A.warn("send fail ->" + o + ":" + D[o] + "," + e), [2, Promise.reject(o)]);}});});}, t;}(),lt = function lt() {return !("undefined" == typeof uni || !function (t) {for (var e = ["canIUse", "getSystemInfo"], n = 0, o = e.length; n < o; n++) {if (!t[e[n]]) return !1;}return !0;}(uni));},mt = lt();var vt = { tag: "browser", httpReq: function httpReq(t) {var e = t.method || _engine.HttpMethod.GET,n = t.timeout || 6e4,o = t.headers,r = t.query,s = t.body,i = (0, _engine.appendUrl)(t.url, r);return new Promise(function (t) {var r,a = (r = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest(), "undefined" != typeof XMLHttpRequest && r ? new XMLHttpRequest() : "undefined" != typeof XDomainRequest ? new XDomainRequest() : new ActiveXObject("Microsoft.XMLHTTP")),c = "[object XDomainRequest]" === Object.prototype.toString.call(a);if (a.open(e, i), o && a.setRequestHeader) for (var u in o) {a.setRequestHeader(u, o[u]);}if (c) {a.timeout = n, a.onload = function () {t({ data: a.responseText, status: a.status || 200 });}, a.onerror = function () {t({ status: a.status || 0 });}, a.ontimeout = function () {t({ status: a.status || 0 });};var d = "object" == typeof s ? JSON.stringify(s) : s;a.send(d);} else a.onreadystatechange = function () {4 === a.readyState && t({ data: a.responseText, status: a.status });}, a.onerror = function () {t({ status: a.status || 0 });}, setTimeout(function () {return t({ status: a.status || 0 });}, n), a.send(s);});}, localStorage: null === window || void 0 === window ? void 0 : window.localStorage, sessionStorage: null === window || void 0 === window ? void 0 : window.sessionStorage, isSupportSocket: function isSupportSocket() {var t = "undefined" != typeof WebSocket;return t || A.warn("websocket not support"), t;}, useNavi: !0, connectPlatform: "", isFromUniapp: mt, createWebSocket: function createWebSocket(t, e) {var n = new WebSocket(t, e);return n.binaryType = "arraybuffer", { onClose: function onClose(t) {n.onclose = function (e) {var n = e.code,o = e.reason;t(n, o);};}, onError: function onError(t) {n.onerror = t;}, onMessage: function onMessage(t) {n.onmessage = function (e) {t(e.data);};}, onOpen: function onOpen(t) {n.onopen = t;}, send: function send(t) {n.send(t);}, close: function close(t, e) {n.close(t, e);} };}, createDataChannel: function createDataChannel(t, e) {return this.isSupportSocket() && "websocket" === e ? new _engine.WebSocketChannel(this, t) : new _engine.CometChannel(this, t);} },St = lt(),It = function It(t) {return function () {for (var e = [], n = 0; n < arguments.length; n++) {e[n] = arguments[n];}try {return wx[t].apply(wx, e);} catch (t) {A.error(t);}};},yt = { setItem: It("setStorageSync"), getItem: It("getStorageSync"), removeItem: It("removeStorageSync"), clear: It("clearStorageSync") },Ct = { tag: "wechat", httpReq: function httpReq(t) {var e = t.method || _engine.HttpMethod.GET,n = t.timeout || 6e4,o = t.headers,r = t.query,s = t.body,i = (0, _engine.appendUrl)(t.url, r);return new Promise(function (t) {wx.request({ url: i, method: e, headers: o, timeout: n, data: s, success: function success(e) {t({ data: e.data, status: e.statusCode });}, fail: function fail() {t({ status: _engine.ErrorCode.RC_HTTP_REQ_TIMEOUT });} });});}, localStorage: yt, sessionStorage: yt, isSupportSocket: function isSupportSocket() {return !0;}, useNavi: !1, connectPlatform: "MiniProgram", isFromUniapp: St, createWebSocket: function createWebSocket(t, e) {var n = wx.connectSocket({ url: t, protocols: e });return { onClose: function onClose(t) {n.onClose(function (e) {t(e.code, e.reason);});}, onError: function onError(t) {n.onError(function (e) {t(e.errMsg);});}, onMessage: function onMessage(t) {n.onMessage(function (e) {t(e.data);});}, onOpen: function onOpen(t) {n.onOpen(t);}, send: function send(t) {n.send({ data: t });}, close: function close(t, e) {n.close({ code: t, reason: e });} };}, createDataChannel: function createDataChannel(t, e) {return "websocket" === e ? new _engine.WebSocketChannel(this, t) : new _engine.CometChannel(this, t);} },Et = lt(),Tt = function Tt(t) {return function () {for (var e = [], n = 0; n < arguments.length; n++) {e[n] = arguments[n];}try {return my[t].apply(my, e);} catch (t) {A.error(t);}};},_t = { setItem: Tt("setStorageSync"), getItem: Tt("getStorageSync"), removeItem: Tt("removeStorageSync"), clear: Tt("clearStorageSync") },Rt = { tag: "alipay", httpReq: function httpReq(t) {var e = t.method || _engine.HttpMethod.GET,n = t.timeout || 6e4,o = t.headers,r = t.query,s = t.body,i = (0, _engine.appendUrl)(t.url, r);return new Promise(function (t) {my.request({ url: i, method: e, headers: o, timeout: n, data: s, success: function success(e) {t({ data: e.data, status: e.status });}, fail: function fail() {t({ status: _engine.ErrorCode.RC_HTTP_REQ_TIMEOUT });} });});}, localStorage: _t, sessionStorage: _t, isSupportSocket: function isSupportSocket() {return !1;}, useNavi: !1, connectPlatform: "MiniProgram", isFromUniapp: Et, createDataChannel: function createDataChannel(t, e) {return "websocket" === e ? new _engine.WebSocketChannel(this, t) : new _engine.CometChannel(this, t);} },wt = lt(),Ot = function Ot(t) {return function () {for (var e = [], n = 0; n < arguments.length; n++) {e[n] = arguments[n];}try {return console.log("tt", tt), tt[t].apply(tt, e);} catch (t) {A.error(t);}};},Nt = { setItem: Ot("setStorageSync"), getItem: Ot("getStorageSync"), removeItem: Ot("removeStorageSync"), clear: Ot("clearStorageSync") },Mt = { tag: "toutiao", isSupportSocket: function isSupportSocket() {return !0;}, useNavi: !1, connectPlatform: "MiniProgram", isFromUniapp: wt, localStorage: Nt, sessionStorage: Nt, httpReq: function httpReq(t) {return new Promise(function (e, n) {tt.request({ url: t.url, data: t.body, header: t.headers, method: t.method, success: function success(t) {console.log("调用成功", t.data);var n = (null == t ? void 0 : t.data) || {},o = { data: JSON.stringify(n), status: t.statusCode };e(o);}, fail: function fail(t) {console.log("调用失败", t.errMsg), n({ data: t.errMsg });} });});}, createWebSocket: function createWebSocket(t, e) {var n = tt.connectSocket({ url: t, protocols: e });return { onOpen: function onOpen(t) {n.onOpen(t);}, onClose: function onClose(t) {n.onClose(function (e) {return t(e.code, e.reason);});}, onError: function onError(t) {n.onError(function (e) {return t(e.errMsg);});}, onMessage: function onMessage(t) {n.onMessage(function (e) {return t(e.data);});}, send: function send(t) {n.send({ data: t });}, close: function close(t, e) {n.close({ code: t, reason: e });} };}, createDataChannel: function createDataChannel(t, e) {return "websocket" === e ? new _engine.WebSocketChannel(this, t) : new _engine.CometChannel(this, t);} },bt = lt(),Ut = function Ut(t) {return function () {for (var e = [], n = 0; n < arguments.length; n++) {e[n] = arguments[n];}try {return console.log("swan", swan), swan[t].apply(swan, e);} catch (t) {A.error(t);}};},xt = { setItem: Ut("setStorageSync"), getItem: Ut("getStorageSync"), removeItem: Ut("removeStorageSync"), clear: Ut("clearStorageSync") },Pt = { tag: "baidu", isSupportSocket: function isSupportSocket() {return !0;}, useNavi: !1, connectPlatform: "MiniProgram", isFromUniapp: bt, localStorage: xt, sessionStorage: xt, httpReq: function httpReq(t) {return new Promise(function (e, n) {swan.request({ url: t.url, data: t.body, header: t.headers, method: t.method, success: function success(t) {console.log("调用成功", t.data);var n = (null == t ? void 0 : t.data) || {},o = { data: JSON.stringify(n), status: t.statusCode };e(o);}, fail: function fail(t) {console.log("调用失败", t.errorCode), n({ data: t.errorCode });} });});}, createWebSocket: function createWebSocket(t, e) {var n = swan.connectSocket({ url: t, protocols: e });return { onOpen: function onOpen(t) {n.onOpen(t);}, onClose: function onClose(t) {n.onClose(function (e) {return t(e.code, e.reason);});}, onError: function onError(t) {n.onError(function (e) {return t(e.errMsg);});}, onMessage: function onMessage(t) {n.onMessage(function (e) {return t(e.data);});}, send: function send(t) {n.send({ data: t });}, close: function close(t, e) {n.close({ code: t, reason: e });} };}, createDataChannel: function createDataChannel(t, e) {return "websocket" === e ? new _engine.WebSocketChannel(this, t) : new _engine.CometChannel(this, t);} },At = function At(t) {return function () {for (var e = [], n = 0; n < arguments.length; n++) {e[n] = arguments[n];}try {return uni[t].apply(uni, e);} catch (t) {A.error(t);}};},Lt = { setItem: At("setStorageSync"), getItem: At("getStorageSync"), removeItem: At("removeStorageSync"), clear: At("clearStorageSync") },Dt = { tag: "uniapp", httpReq: function httpReq(t) {var e = t.method || _engine.HttpMethod.GET,n = t.timeout || 6e4,o = t.headers,r = t.query,s = t.body,i = (0, _engine.appendUrl)(t.url, r);return new Promise(function (t) {uni.request({ url: i, method: e, headers: o, timeout: n, sslVerify: !1, data: s, success: function success(e) {t({ data: e.data, status: e.statusCode });}, fail: function fail() {t({ status: _engine.ErrorCode.RC_HTTP_REQ_TIMEOUT });} });});}, localStorage: Lt, sessionStorage: Lt, isSupportSocket: function isSupportSocket() {return !0;}, useNavi: !0, connectPlatform: "", isFromUniapp: !0, createWebSocket: function createWebSocket(t, e) {var n = { complete: function complete() {}, url: t, protocols: e },o = uni.connectSocket(n);return { onClose: function onClose(t) {o.onClose(function (e) {t(e.code, e.reason);});}, onError: function onError(t) {o.onError(function (e) {t(e.errMsg);});}, onMessage: function onMessage(t) {o.onMessage(function (e) {t(e.data);});}, onOpen: function onOpen(t) {o.onOpen(t);}, send: function send(t) {o.send({ data: t });}, close: function close(t, e) {o.close({ code: t, reason: e });} };}, createDataChannel: function createDataChannel(t, e) {return "websocket" === e ? new _engine.WebSocketChannel(this, t) : new _engine.CometChannel(this, t);} },kt = function kt(t) {return t && t.canIUse && t.getSystemInfo;},jt = "undefined" != typeof uni && kt(uni) ? function () {switch ("mp-weixin") {case "app-plus":return Dt;case "mp-baidu":return Pt;case "mp-toutiao":return Mt;case "mp-alipay":return Rt;case "mp-weixin":return Ct;case "h5":default:return vt;}}() : "undefined" != typeof wx && kt(wx) ? Ct : "undefined" != typeof my && kt(my) ? Rt : "undefined" != typeof tt && kt(tt) ? Mt : "undefined" != typeof swan && kt(swan) ? Pt : vt;_engine.VersionManage.add("imlib", "4.5.1"), _engine.VersionManage.validEngine("~4.5.1") || A.error("The current engine version '" + _engine.VersionManage.getInfo().engine + "' error，imlib required engine version at least '~4.5.1'.");var Bt,Gt = [],Kt = [],Vt = { message: function message(t) {Gt.forEach(function (e) {return e(t);});}, status: function status(t) {Kt.forEach(function (e) {return e(t);});} },Ft = function () {function t(t) {this._token = "", this._context = t, this.Conversation = new at(t), this.ChatRoom = new ft(t), this.Tag = new ut(t), this.RTC = function (e) {return (0, _engine.assert)("options.id", e.id, _engine.notEmptyString, !0), new pt(e, t);};}return t.prototype.install = function (t, e) {return this._context.install(t, e);}, t.prototype.watch = function (t) {var e = t.status,n = t.conversation,o = t.message,r = t.chatroom,s = t.expansion,i = t.typingStatus,a = t.pullFinished,c = t.messageBlocked,u = t.tag,d = {};e && (d.connectionState = function (t) {try {e({ status: t });} catch (t) {A.error(t);}}), n && (d.conversationState = function (t) {try {var e = t.map(function (t) {return n = (e = t).updatedItems, o = e.conversationType, r = e.targetId, s = e.latestMessage, i = e.unreadMessageCount, a = e.lastUnreadTime, c = e.notificationStatus, u = e.isTop, d = e.mentionedInfo, g = e.hasMentioned, h = s && Y(s), n && n.latestMessage && (n.latestMessage.val = h), { updatedItems: n, type: o, targetId: r, latestMessage: h, unreadMessageCount: i, lastUnreadTime: a, notificationStatus: c, isTop: u, mentionedInfo: d, hasMentioned: g };var e, n, o, r, s, i, a, c, u, d, g, h;});n({ updatedConversationList: e });} catch (t) {A.error(t);}}), o && (d.message = function (t) {try {o({ message: Y(t) });} catch (t) {A.error(t);}}), r && (d.chatroomState = function (t) {try {r(t);} catch (t) {A.error(t);}}), s && (d.expansion = function (t) {try {s(t);} catch (t) {A.error(t);}}), a && (d.pullFinished = function () {try {a();} catch (t) {A.error(t);}}), i && (d.typingState = function (t) {try {i(t);} catch (t) {A.error(t);}}), c && (d.messageBlocked = function (t) {try {c(t);} catch (t) {A.error(t);}}), u && (d.tag = function () {try {u();} catch (t) {A.error(t);}}), this._context.assignWatcher(d);}, t.prototype.unwatch = function () {this._context.assignWatcher({ message: void 0, connectionState: void 0, conversationState: void 0, chatroomState: void 0, expansion: void 0, pullFinished: void 0, typingState: void 0, messageBlocked: void 0 });}, t.prototype.rtcInnerWatch = function (t) {var e = t.message,n = t.status;e && Gt.push(function (t) {try {e({ message: Y(t) });} catch (t) {A.error(t);}}), n && Kt.push(function (t) {try {n({ status: t });} catch (t) {A.error(t);}}), this._context.assignWatcher({ rtcInnerWatcher: Vt });}, t.prototype.rtcInnerUnwatch = function () {Kt.length = Kt.length = 0, this._context.assignWatcher({ rtcInnerWatcher: void 0 });}, t.prototype.connect = function (t) {return U(this, void 0, void 0, function () {var e, r;return x(this, function (s) {switch (s.label) {case 0:return (0, _engine.assert)("options.token", t.token, _engine.AssertRules.STRING, !0), e = t.token, this._token = e, [4, this._context.connect(e, !0)];case 1:return (r = s.sent()).code === _engine.ErrorCode.SUCCESS ? [2, { id: r.userId }] : [2, Promise.reject({ code: r.code, msg: D[r.code] })];}});});}, t.prototype.reconnect = function () {return U(this, void 0, void 0, function () {var t;return x(this, function (e) {switch (e.label) {case 0:return [4, this._context.reconnect()];case 1:return (t = e.sent()).code === _engine.ErrorCode.SUCCESS ? [2, { id: t.userId }] : [2, Promise.reject({ code: t.code, msg: D[t.code] })];}});});}, t.prototype.disconnect = function () {return this._context.disconnect();}, t.prototype.getAppInfo = function () {return { appkey: this._context.appkey, token: this._token, navi: this._context.getInfoFromCache() };}, t.prototype.getConnectedTime = function () {return this._context.getConnectedTime();}, t.prototype.getServerTime = function () {return this._context.getServerTime();}, t.prototype.getConnectionStatus = function () {return this._context.getConnectionStatus();}, t.prototype.getConnectionUserId = function () {return this._context.getCurrentUserId();}, t.prototype.getFileToken = function (t, e, o, r) {return (0, _engine.assert)("fileType", t, _engine.isValidFileType, !0), this._context.getFileToken(t, e, o, r);}, t.prototype.getFileUrl = function (t, e, r, s, i) {return (0, _engine.assert)("fileType", t, _engine.isValidFileType, !0), (0, _engine.assert)("filename", e, _engine.AssertRules.STRING), (0, _engine.assert)("saveName", r, _engine.AssertRules.STRING), (0, _engine.assert)("serverType", i, _engine.AssertRules.NUMBER), this._context.getFileUrl(t, e, r, s, i);}, t.prototype.changeUser = function (t) {return U(this, void 0, void 0, function () {return x(this, function (e) {switch (e.label) {case 0:return A.warn("Method is deprecated"), (0, _engine.assert)("options.token", t.token, _engine.AssertRules.STRING, !0), [4, this.disconnect()];case 1:return e.sent(), [2, this.connect(t)];}});});}, t.prototype.registerMessageType = function (t, e, n, o) {this._context.registerMessageType(t, e, n, o);}, t;}(),qt = function qt(t) {if (A.setLogLevel(t.logLevel), A.setLogStdout(t.logStdout), Bt) return A.error("The instance already exists. Do not repeatedly call the init method"), Bt;(0, _engine.assert)("options.appkey", t.appkey, _engine.AssertRules.STRING, !0), (0, _engine.assert)("options.debug", t.debug, _engine.AssertRules.BOOLEAN), (0, _engine.assert)("options.navigators", t.navigators, function (t) {return (0, _engine.isArray)(t) && (0 === t.length || t.every(_engine.isHttpUrl));});var e = null == t ? void 0 : t.connectType;e ? _engine.CONNECTION_TYPE.WEBSOCKET !== e && _engine.CONNECTION_TYPE.COMET !== e && (A.warn("RongIMLib connectionType must be " + _engine.CONNECTION_TYPE.WEBSOCKET + " or " + _engine.CONNECTION_TYPE.COMET), e = _engine.CONNECTION_TYPE.WEBSOCKET) : e = _engine.CONNECTION_TYPE.WEBSOCKET;var r = _engine.APIContext.init(jt, { appkey: t.appkey, apiVersion: "4.5.1", navigators: t.navigators || [], miniCMPProxy: t.customCMP || [], connectionType: e, logLevel: t.logLevel, logStdout: t.logStdout, indexDBSwitch: t.indexDBSwitch, checkCA: t.checkCA });return A.warn("RongIMLib Version: 4.5.1, Commit: b3fede6623187cfd78369f9fc81cc5b70226faf9"), Bt = new Ft(r);},Ht = function Ht() {return Bt || A.error("Please call the init method first"), Bt;},Wt = _engine.MessageDirection,Xt = _engine.ConversationType,Yt = _engine.FileType,Jt = { DO_NOT_DISTURB: _engine.NotificationStatus.OPEN, NOTIFY: _engine.NotificationStatus.CLOSE },Qt = _engine.ChatroomEntryType;exports.CHATROOM_ENTRY_TYPE = Qt;exports.NOTIFICATION_STATUS = Jt;exports.FILE_TYPE = Yt;exports.CONVERSATION_TYPE = Xt;exports.MESSAGE_DIRECTION = Wt;exports.getInstance = Ht;exports.init = qt;exports.IMClient = Ft;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 17 */
/*!**************************************************************************************************************************!*\
  !*** /Users/zhr/study/practice/rongyunIM/demoForRongyun/demoForRongyun/node_modules/@rongcloud/engine/dist/index.esm.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {Object.defineProperty(exports, "__esModule", { value: true });exports.version = exports.validate = exports.usingCppEngine = exports.todo = exports.pushJSONToConfigs = exports.pushConfigsToJSON = exports.notEmptyString = exports.notEmptyObject = exports.notEmptyArray = exports.map = exports.isValidFileType = exports.isValidConversationType = exports.isValidChrmEntryValue = exports.isValidChrmEntryKey = exports.isUndefined = exports.isString = exports.isObject = exports.isNumber = exports.isNull = exports.isInclude = exports.isInObject = exports.isHttpUrl = exports.isFunction = exports.isBoolean = exports.isArrayBuffer = exports.isArray = exports.indexOf = exports.getUploadFileName = exports.getMimeKey = exports.getBrowser = exports.formatConnectResponseCode = exports.forEach = exports.cloneByJSON = exports.assert = exports.appendUrl = exports.WebSocketChannel = exports.WEB_SOCKET_TIMEOUT = exports.VersionManage = exports.UploadMethod = exports.TagChangeType = exports.STORAGE_ROOT_KEY = exports.STATUS_MESSAGE = exports.SEND_MESSAGE_TYPE_OPTION = exports.ReceivedStatus = exports.RTCPluginContext = exports.RTCMode = exports.RTCJoinType = exports.RTCIdentityChangeType = exports.RTCApiType = exports.RCAssertError = exports.PluginContext = exports.PUBLIC_CLOUD_NAVI_URIS = exports.PING_REQ_TIMEOUT = exports.NotificationStatus = exports.NAVI_REQ_TIMEOUT = exports.NAVI_CACHE_DURATION = exports.MessageType = exports.MessageDirection = exports.MentionedType = exports.MINI_SOCKET_CONNECT_URIS = exports.MINI_COMET_CONNECT_URIS = exports.MAX_MESSAGE_CONTENT_BYTES = exports.Logger = exports.LogType = exports.LogLevel = exports.LiveType = exports.LiveRole = exports.IM_SIGNAL_TIMEOUT = exports.IM_PING_TIMEOUT = exports.IM_PING_MIN_TIMEOUT = exports.IM_PING_INTERVAL_TIME = exports.IM_COMET_PULLMSG_TIMEOUT = exports.HttpMethod = exports.FileType = exports.EventEmitter = exports.ErrorCode = exports.DelayTimer = exports.ConversationType = exports.ConnectionStatus = exports.ConnectResultCode = exports.CometChannel = exports.ChatroomMemberChangeType = exports.ChatroomEntryType = exports.CallLibMsgType = exports.CPP_PROTOCAL_MSGTYPE_OPTION = exports.CONNECTION_TYPE = exports.AssertRules = exports.AppStorage = exports.APIContext = exports.ANavi = exports.AEngine = void 0;var e;!function (e) {e[e.READ = 1] = "READ", e[e.LISTENED = 2] = "LISTENED", e[e.DOWNLOADED = 4] = "DOWNLOADED", e[e.RETRIEVED = 8] = "RETRIEVED", e[e.UNREAD = 0] = "UNREAD";}(e || (e = {}));var t,n,i = e,r = 72e5,s = 1e4,o = 5e3,a = 5e3,u = ["https://nav.cn.ronghub.com", "https://nav2-cn.ronghub.com"],c = ["wsproxy.cn.ronghub.com", "wsap-cn.ronghub.com"],h = ["cometproxy-cn.ronghub.com", "mini-cn.ronghub.com"],l = 3e4,f = 15e3,d = 15e3,p = 2e3,_ = 131072,y = 45e3,E = "RCV4-",m = { "RC:TxtMsg": { isCounted: !0, isPersited: !0 }, "RC:ImgMsg": { isCounted: !0, isPersited: !0 }, "RC:VcMsg": { isCounted: !0, isPersited: !0 }, "RC:ImgTextMsg": { isCounted: !0, isPersited: !0 }, "RC:FileMsg": { isCounted: !0, isPersited: !0 }, "RC:HQVCMsg": { isCounted: !0, isPersited: !0 }, "RC:LBSMsg": { isCounted: !0, isPersited: !0 }, "RC:PSImgTxtMsg": { isCounted: !0, isPersited: !0 }, "RC:PSMultiImgTxtMsg": { isCounted: !0, isPersited: !0 }, "RCJrmf:RpMsg": { isCounted: !0, isPersited: !0 }, "RCJrmf:RpOpendMsg": { isCounted: !0, isPersited: !0 }, "RC:CombineMsg": { isCounted: !0, isPersited: !0 }, "RC:ReferenceMsg": { isCounted: !0, isPersited: !0 }, "RC:SightMsg": { isCounted: !0, isPersited: !0 }, "RC:GIFMsg": { isCounted: !0, isPersited: !0 }, "RC:InfoNtf": { isCounted: !1, isPersited: !0 }, "RC:ContactNtf": { isCounted: !1, isPersited: !0 }, "RC:ProfileNtf": { isCounted: !1, isPersited: !0 }, "RC:CmdNtf": { isCounted: !1, isPersited: !0 }, "RC:GrpNtf": { isCounted: !1, isPersited: !0 }, "RC:RcCmd": { isCounted: !1, isPersited: !0 }, "RC:CmdMsg": { isCounted: !1, isPersited: !1 }, "RC:TypSts": { isCounted: !1, isPersited: !1 }, "RC:PSCmd": { isCounted: !1, isPersited: !1 }, "RC:SRSMsg": { isCounted: !1, isPersited: !1 }, "RC:RRReqMsg": { isCounted: !1, isPersited: !1 }, "RC:RRRspMsg": { isCounted: !1, isPersited: !1 }, "RC:CsChaR": { isCounted: !1, isPersited: !1 }, "RC:CSCha": { isCounted: !1, isPersited: !1 }, "RC:CsEva": { isCounted: !1, isPersited: !1 }, "RC:CsContact": { isCounted: !1, isPersited: !1 }, "RC:CsHs": { isCounted: !1, isPersited: !1 }, "RC:CsHsR": { isCounted: !1, isPersited: !1 }, "RC:CsSp": { isCounted: !1, isPersited: !1 }, "RC:CsEnd": { isCounted: !1, isPersited: !1 }, "RC:CsUpdate": { isCounted: !1, isPersited: !1 }, "RC:ReadNtf": { isCounted: !1, isPersited: !1 }, "RC:chrmKVNotiMsg": { isCounted: !1, isPersited: !1 }, "RC:VCAccept": { isCounted: !1, isPersited: !1 }, "RC:VCRinging": { isCounted: !1, isPersited: !1 }, "RC:VCSummary": { isCounted: !1, isPersited: !1 }, "RC:VCHangup": { isCounted: !1, isPersited: !1 }, "RC:VCInvite": { isCounted: !1, isPersited: !1 }, "RC:VCModifyMedia": { isCounted: !1, isPersited: !1 }, "RC:VCModifyMem": { isCounted: !1, isPersited: !1 }, "RC:MsgExMsg": { isCounted: !1, isPersited: !1 }, "RC:RRMsg": { isCounted: !1, isPersited: !1 }, "RC:LogCmdMsg": { isCounted: !1, isPersited: !1 }, "RC:InterceptMsg": { isCounted: !1, isPersited: !1 } },v = { "RC:DizNtf": { isCounted: !1, isPersited: !1 } },T = ["RC:TypSts", "RC:InterceptMsg"];exports.STATUS_MESSAGE = T;exports.CPP_PROTOCAL_MSGTYPE_OPTION = v;exports.SEND_MESSAGE_TYPE_OPTION = m;exports.STORAGE_ROOT_KEY = E;exports.IM_COMET_PULLMSG_TIMEOUT = y;exports.MAX_MESSAGE_CONTENT_BYTES = _;exports.IM_PING_MIN_TIMEOUT = p;exports.IM_PING_TIMEOUT = d;exports.IM_PING_INTERVAL_TIME = f;exports.IM_SIGNAL_TIMEOUT = l;exports.MINI_COMET_CONNECT_URIS = h;exports.MINI_SOCKET_CONNECT_URIS = c;exports.PUBLIC_CLOUD_NAVI_URIS = u;exports.WEB_SOCKET_TIMEOUT = a;exports.PING_REQ_TIMEOUT = o;exports.NAVI_REQ_TIMEOUT = s;exports.NAVI_CACHE_DURATION = r;exports.ReceivedStatus = i;exports.CONNECTION_TYPE = t;!function (e) {e.WEBSOCKET = "websocket", e.COMET = "comet";}(t || (exports.CONNECTION_TYPE = t = {}));var I = function I(e) {return n || (n = { set: function set(t, n) {e.localStorage.setItem(t, JSON.stringify(n));}, get: function get(t) {var n;try {n = JSON.parse(e.localStorage.getItem(t));} catch (e) {n = null;}return n;}, remove: function remove(t) {return e.localStorage.removeItem(t);}, getKeys: function getKeys() {var t = [];for (var n in e.localStorage) {t.push(n);}return t;} }), n;},C = function () {function e(e) {this._caches = {}, e && (this._caches = e);}return e.prototype.set = function (e, t) {this._caches[e] = t;}, e.prototype.remove = function (e) {var t = this.get(e);return delete this._caches[e], t;}, e.prototype.get = function (e) {return this._caches[e];}, e.prototype.getKeys = function () {var e = [];for (var t in this._caches) {e.push(t);}return e;}, e;}(),R = function () {function e(e, t) {var n,i = t ? "RCV4-" + t : "RCV4-";this._rootStorage = I(e);var r = this._rootStorage.get(i) || {};this._cache = new C(((n = {})[i] = r, n)), this._storageKey = i;}return e.prototype._get = function () {var e = this._storageKey;return this._cache.get(e) || {};}, e.prototype._set = function (e) {var t = this._storageKey;e = e || {}, this._cache.set(t, e), this._rootStorage.set(t, e);}, e.prototype.set = function (e, t) {var n = this._get();n[e] = t, this._set(n);}, e.prototype.remove = function (e) {var t = this._get();delete t[e], this._set(t);}, e.prototype.clear = function () {var e = this._storageKey;this._rootStorage.remove(e), this._cache.remove(e);}, e.prototype.get = function (e) {return this._get()[e];}, e.prototype.getKeys = function () {var e = this._get(),t = [];for (var n in e) {t.push(n);}return t;}, e.prototype.getValues = function () {return this._get() || {};}, e;}(),_S = function S(e, t) {return (_S = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) {e.__proto__ = t;} || function (e, t) {for (var n in t) {Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);}})(e, t);};exports.AppStorage = R;function N(e, t) {if ("function" != typeof t && null !== t) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");function n() {this.constructor = e;}_S(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());}var _O = function O() {return (_O = Object.assign || function (e) {for (var t, n = 1, i = arguments.length; n < i; n++) {for (var r in t = arguments[n]) {Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);}}return e;}).apply(this, arguments);};function w(e, t, n, i) {return new (n || (n = Promise))(function (r, s) {function o(e) {try {u(i.next(e));} catch (e) {s(e);}}function a(e) {try {u(i.throw(e));} catch (e) {s(e);}}function u(e) {var t;e.done ? r(e.value) : (t = e.value, t instanceof n ? t : new n(function (e) {e(t);})).then(o, a);}u((i = i.apply(e, t || [])).next());});}function b(e, t) {var n,i,r,s,o = { label: 0, sent: function sent() {if (1 & r[0]) throw r[1];return r[1];}, trys: [], ops: [] };return s = { next: a(0), throw: a(1), return: a(2) }, "function" == typeof Symbol && (s[Symbol.iterator] = function () {return this;}), s;function a(s) {return function (a) {return function (s) {if (n) throw new TypeError("Generator is already executing.");for (; o;) {try {if (n = 1, i && (r = 2 & s[0] ? i.return : s[0] ? i.throw || ((r = i.return) && r.call(i), 0) : i.next) && !(r = r.call(i, s[1])).done) return r;switch (i = 0, r && (s = [2 & s[0], r.value]), s[0]) {case 0:case 1:r = s;break;case 4:return o.label++, { value: s[1], done: !1 };case 5:o.label++, i = s[1], s = [0];continue;case 7:s = o.ops.pop(), o.trys.pop();continue;default:if (!(r = o.trys, (r = r.length > 0 && r[r.length - 1]) || 6 !== s[0] && 2 !== s[0])) {o = 0;continue;}if (3 === s[0] && (!r || s[1] > r[0] && s[1] < r[3])) {o.label = s[1];break;}if (6 === s[0] && o.label < r[1]) {o.label = r[1], r = s;break;}if (r && o.label < r[2]) {o.label = r[2], o.ops.push(s);break;}r[2] && o.ops.pop(), o.trys.pop();continue;}s = t.call(e, o);} catch (e) {s = [6, e], i = 0;} finally {n = r = 0;}}if (5 & s[0]) throw s[1];return { value: s[0] ? s[1] : void 0, done: !0 };}([s, a]);};}}function M(e, t) {for (var n = 0, i = t.length, r = e.length; n < i; n++, r++) {e[r] = t[n];}return e;}var A,U,L = function (e) {function t(t) {return e.call(this, "TODO => " + t) || this;}return N(t, e), t;}(Error),P = function P(e) {return new L(e);},D = function D(e, t, n) {if (void 0 === t || void 0 === n) return e.toUpperCase();var i = e.slice(t, n);return e = e.replace(i, function (e) {return e.toUpperCase();});},V = function V(e, t) {void 0 === t && (t = "utf-8");var n,i = 0;if ("utf-16" === t) for (var r = 0, s = e.length; r < s; r++) {i += (n = e.charCodeAt(r)) <= 65535 ? 2 : 4;} else for (r = 0, s = e.length; r < s; r++) {i += (n = e.charCodeAt(r)) < 127 ? 1 : n <= 2047 ? 2 : n <= 65535 ? 3 : 4;}return i;},k = function k(e, t) {if (e = e.replace(/\?$/, ""), !t) return e;var n = Object.keys(t).map(function (e) {return e + "=" + t[e];}).filter(function (e) {return !!e;});return n.length ? [e, n.join("&")].join("?") : e;},x = function x(e) {return e.match(/\d+(\.\d+){2}/)[0];};exports.appendUrl = k;exports.todo = P;exports.LogType = U;exports.LogLevel = A;!function (e) {e[e.LOG = 0] = "LOG", e[e.DEBUG = 0] = "DEBUG", e[e.INFO = 1] = "INFO", e[e.WARN = 2] = "WARN", e[e.ERROR = 3] = "ERROR", e[e.FATAL = 4] = "FATAL", e[e.NONE = 1e3] = "NONE";}(A || (exports.LogLevel = A = {})), function (e) {e.IM = "IM", e.RTC = "RTC";}(U || (exports.LogType = U = {}));var B = "RC_Logs";function F(e) {var t = e.target.result;1 === e.oldVersion && t.deleteObjectStore(B), function (e, t, n) {var i;if (!e.objectStoreNames.contains(t)) {var r = _O({}, n.objectStoreParams);i = e.createObjectStore(t, r), n.indexs && n.indexs.length > 0 && n.indexs.forEach(function (e) {i.createIndex(e.indexName, e.key, { unique: e.unique });});}}(t, B, { indexs: [{ indexName: "time", key: "time", unique: !1 }], objectStoreParams: { autoIncrement: !0 } });}var q,Y = function () {function e() {}return e.init = function () {if ("undefined" != typeof window && window && window.indexedDB) {var t = window.indexedDB.open("RC_ENGINE_DB", 2);t.onerror = function (e) {console.warn("open indexDB request failed " + e.target.error);}, t.onsuccess = function (t) {e._db = t.target.result, e._db && (e._db.onclose = function (t) {var n;console.warn("The database " + (null === (n = e._db) || void 0 === n ? void 0 : n.name) + " has unexpectedly closed.", t), e._db = null, e._instance = null;}, e._db.onerror = function (t) {var n;console.warn("The database " + (null === (n = e._db) || void 0 === n ? void 0 : n.name) + " has opening error.", t), e._db = null, e._instance = null;}, e._db.onabort = function (t) {var n;console.warn("The database " + (null === (n = e._db) || void 0 === n ? void 0 : n.name) + " has opening aborted.", t), e._db = null, e._instance = null;}), e._instance = new e();}, t.onupgradeneeded = function (t) {e._db = t.target.result, F(t);};} else console.debug("IndexDB is not currently supported in the environment!");}, e.getInstance = function () {return e._instance;}, e.prototype.addList = function (t, n) {return new Promise(function (i) {if (e._db) {var r = e._db.transaction([t], "readwrite"),s = r.objectStore(t);n.forEach(function (e) {null == s || s.add(e);}), r.oncomplete = function (e) {i(!0);}, r.onerror = function (e) {i(!1);};} else i(!1);});}, e.prototype.getRangeData = function (t, n, i, r) {return new Promise(function (s) {if (e._db) {var o = e._db.transaction([t], "readwrite").objectStore(t),a = IDBKeyRange.bound(i, r),u = o.index(n),c = [],h = u.openCursor(a);h.onsuccess = function (e) {var t = e.target.result;t ? (c.push(t.value), t.continue()) : s(c);}, h.onerror = function (e) {console.error(e), s([]);};} else s([]);});}, e.prototype.getCount = function (t, n) {return new Promise(function (n) {if (e._db) {var i = e._db.transaction([t], "readonly").objectStore(t).count();i.onsuccess = function () {n(i.result);}, i.onerror = function (e) {console.error(e), n(0);};} else n(0);});}, e.prototype.removeFirstData = function (t, n, i) {return new Promise(function (n) {if (e._db) {var r = e._db.transaction([t], "readwrite").objectStore(t),s = r.getAllKeys(IDBKeyRange.lowerBound(0), i);s.onsuccess = function () {var e = s.result;e.length > 0 && (r.delete(IDBKeyRange.bound(e[0], e[e.length - 1])).onsuccess = function () {n(!0);});};} else n(!1);});}, e._db = null, e;}(),K = function K() {return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (e) {var t = 16 * Math.random() | 0;return ("x" === e ? t : 3 & t | 8).toString(16);});},H = function H() {var e = K();if (e = e.replace(/-/g, "") + "a", (e = function (e) {var t = "0123456789abcdefghigklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZa0".split(""),n = t.length + 1,i = +e,r = [];do {var s = i % n;i = (i - s) / n, r.unshift(t[s]);} while (i);return r.join("");}(e = parseInt(e, 16))).length > 22 && (e = e.slice(0, 22)), e.length < 22) for (var t = 22 - e.length, n = 0; n < t; n++) {e += "0";}return e;};!function (e) {e[e.NONE = 0] = "NONE", e[e.PRIVATE = 1] = "PRIVATE", e[e.DISCUSSION = 2] = "DISCUSSION", e[e.GROUP = 3] = "GROUP", e[e.CHATROOM = 4] = "CHATROOM", e[e.CUSTOMER_SERVICE = 5] = "CUSTOMER_SERVICE", e[e.SYSTEM = 6] = "SYSTEM", e[e.APP_PUBLIC_SERVICE = 7] = "APP_PUBLIC_SERVICE", e[e.PUBLIC_SERVICE = 8] = "PUBLIC_SERVICE", e[e.RTC_ROOM = 12] = "RTC_ROOM";}(q || (q = {}));var G,j = q;exports.ConversationType = j;!function (e) {e[e.IMAGE = 1] = "IMAGE", e[e.AUDIO = 2] = "AUDIO", e[e.VIDEO = 3] = "VIDEO", e[e.FILE = 4] = "FILE", e[e.SIGHT = 5] = "SIGHT", e[e.COMBINE_HTML = 6] = "COMBINE_HTML";}(G || (G = {}));var Q,J,W = G,z = function z(e) {return "string" == typeof e;},Z = function Z(e) {return "boolean" == typeof e;},X = function X(e) {return "number" == typeof e && !isNaN(e);},$ = function $(e) {return -1 !== Object.prototype.toString.call(e).indexOf("Array");},ee = function ee(e) {return "[object ArrayBuffer]" === Object.prototype.toString.call(e);},te = function te(e) {return z(e) && e.length > 0;},ne = function ne(e) {return $(e) && e.length > 0;},ie = function ie(e) {return "[object Object]" === Object.prototype.toString.call(e);},re = function re(e) {return "[object Function]" === Object.prototype.toString.call(e);},se = function se(e) {return void 0 === e || "[object Undefined]" === Object.prototype.toString.call(e);},oe = function oe(e) {return "[object Null]" === Object.prototype.toString.call(e);},ae = function ae(e) {return z(e) && /https?:\/\//.test(e);},ue = function ue(e) {for (var t in e) {return !0;}return !1;},ce = function ce(e) {return X(e) && Object.prototype.hasOwnProperty.call(j, e);},he = function he(e) {return X(e) && Object.prototype.hasOwnProperty.call(W, e);},le = ((Q = {})[A.DEBUG] = console.debug.bind(console), Q[A.INFO] = console.info.bind(console), Q[A.WARN] = console.warn.bind(console), Q[A.ERROR] = console.error.bind(console), Q[A.FATAL] = console.log.bind(console), Q),fe = function fe(e) {return z(e) || X(e) || se(e) || Z(e) ? e : e instanceof Error ? JSON.stringify({ name: e.name, message: e.message, stack: e.stack }) : JSON.stringify(e);},de = function () {function e(e, t, n) {this.tag = e, this.type = t, this.initiator = n, this._outLevel = A.WARN, this.debug = this.log.bind(this, A.DEBUG), this.info = this.log.bind(this, A.INFO), this.warn = this.log.bind(this, A.WARN), this.error = this.log.bind(this, A.ERROR), this.fatal = this.log.bind(this, A.FATAL);}return e.init = function (t) {e.userId = t;}, e.reset = function () {e.userId = "";}, e.prototype._defaultStdout = function (e, t) {for (var n = [], i = 2; i < arguments.length; i++) {n[i - 2] = arguments[i];}le[e].apply(le, M([t + ":"], n));}, e.prototype.__pushLocalLog = function (t, n, i) {var r;r = this.type ? this.type : ["RCRTCLog", "RCCall", "RCRTC", "RTC-A"].includes(this.tag) ? U.RTC : U.IM;var s = Date.now();V(n) >= 1e3 && (n = function (e, t, n) {if (void 0 === n && (n = "utf-8"), !e || !t) return "";var i = "utf-8" === n ? 3 : 2,r = 0,s = 0,o = "";for (s = 0; s < e.length; s++) {if (e.charCodeAt(s) > 255 ? r += i : r++, r > t) return o;o += e.charAt(s);}return e;}(n, 1e3));var o = JSON.stringify({ message: n, userId: e.userId }).replace(/"/g, '""'),a = /^[\w]+-[\w]+-[\w]+?/.test(i) ? i : (this.initiator || "L") + "-" + i + "-O",u = { sessionId: e.sessionId, time: s, level: 4 - t, content: e.sessionId + "," + Date.now() + "," + r + "," + (4 - t) + "," + a + ',"' + o + '"\n', userId: e.userId };e.databaseLogList.push(u), e.databaseLogList.length >= 100 && this.__insertLogIntoDatabase();}, e.prototype.__insertLogIntoDatabase = function () {return w(this, void 0, void 0, function () {var t, n, i;return b(this, function (r) {switch (r.label) {case 0:return t = M([], e.databaseLogList), e.databaseLogList = [], (n = Y.getInstance()) ? [4, n.addList(B, t)] : [3, 3];case 1:return i = r.sent(), [4, n.getCount(B, "time")];case 2:return r.sent() > 1e5 && n.removeFirstData(B, "time", 2e3), [2, i];case 3:return [2, !1];}});});}, e.prototype.setLogLevel = function (e) {this._outLevel = "number" != typeof e ? A.WARN : e;}, e.prototype.setLogStdout = function (e) {this._logStdout = e;}, e.prototype.log = function (e) {for (var t = [], n = 1; n < arguments.length; n++) {t[n - 1] = arguments[n];}if (e > A.DEBUG && this.__pushLocalLog(e, t.map(fe).join(" "), this.tag), !(e < this._outLevel)) {var i = new Date().toISOString() + "[" + this.tag + "][" + A[e] + "]",r = i + " - " + t.map(fe).join(" ");this._logStdout ? this._logStdout(e, r) : this._stdout ? this._stdout(e, r) : this._defaultStdout.apply(this, M([e, i], t));}}, e.prototype.reportLog = function (t, n, i) {this.__pushLocalLog(4 - t, i, n);var r = JSON.stringify({ message: i }).replace(/"/g, '""');r = '"' + r + '"';var s = { level: t, content: [e.sessionId, Date.now(), this.type, t, n, r].join() + "\n" };e.realTimeLogList.push(s), e.realTimeLogList.length >= 600 && (e.realTimeLogList = e.realTimeLogList.slice(-500));}, e.prototype.set = function (e, t) {this.warn("logger.set has being deprecated!");}, e.prototype.setStdout = function (e) {this._stdout = e;}, e.prototype.__clearRealTimeLog = function () {e.realTimeLogList = [];}, e.databaseLogList = [], e.realTimeLogList = [], e.sessionId = H(), e.userId = "", e;}(),pe = new de("RCLog"),ge = function () {function e() {this._map = {};}return e.prototype.on = function (e, t, n) {var i = this._map[e] || (this._map[e] = []);i.some(function (e) {return e.listener === t && e.target === n;}) || i.push({ listener: t, target: n });}, e.prototype.once = function (e, t, n) {var i = this._map[e] || (this._map[e] = []);i.some(function (e) {return e.listener === t && e.target === n;}) || i.push({ listener: t, target: n, once: !0 });}, e.prototype.off = function (e, t, n) {var i = this._map[e];i && ((i = i.filter(function (e) {return e.listener !== t || e.target !== n;})).length ? this._map[e] = i : delete this._map[e]);}, e.prototype.emit = function (e) {for (var t = [], n = 1; n < arguments.length; n++) {t[n - 1] = arguments[n];}var i = this._map[e];if (i) for (var r = i.length - 1; r >= 0; r -= 1) {var s = i[r],o = s.target,a = s.once,u = s.listener;a && i.splice(r, 1);try {u.call.apply(u, M([o], t));} catch (e) {pe.error(e);}}}, e.prototype.removeAll = function (e) {delete this._map[e];}, e.prototype.clear = function () {Object.keys(this._map).forEach(this.removeAll, this);}, e;}();exports.EventEmitter = ge;exports.Logger = de;exports.isValidFileType = he;exports.isValidConversationType = ce;exports.notEmptyObject = ue;exports.isHttpUrl = ae;exports.isNull = oe;exports.isUndefined = se;exports.isFunction = re;exports.isObject = ie;exports.notEmptyArray = ne;exports.notEmptyString = te;exports.isArrayBuffer = ee;exports.isArray = $;exports.isNumber = X;exports.isBoolean = Z;exports.isString = z;exports.FileType = W;!function (e) {e[e.SEND = 1] = "SEND", e[e.RECEIVE = 2] = "RECEIVE";}(J || (J = {}));var _e,ye = J;exports.MessageDirection = ye;!function (e) {e[e.TIMEOUT = -1] = "TIMEOUT", e[e.UNKNOWN = -2] = "UNKNOWN", e[e.PARAMETER_ERROR = -3] = "PARAMETER_ERROR", e[e.EXTRA_METHOD_UNDEFINED = -4] = "EXTRA_METHOD_UNDEFINED", e[e.MAIN_PROCESS_ERROR = -5] = "MAIN_PROCESS_ERROR", e[e.SUCCESS = 0] = "SUCCESS", e[e.RC_MSG_UNAUTHORIZED = 20406] = "RC_MSG_UNAUTHORIZED", e[e.RC_DISCUSSION_GROUP_ID_INVALID = 20407] = "RC_DISCUSSION_GROUP_ID_INVALID", e[e.SEND_FREQUENCY_TOO_FAST = 20604] = "SEND_FREQUENCY_TOO_FAST", e[e.NOT_IN_DISCUSSION = 21406] = "NOT_IN_DISCUSSION", e[e.FORBIDDEN_IN_GROUP = 22408] = "FORBIDDEN_IN_GROUP", e[e.RECALL_MESSAGE = 25101] = "RECALL_MESSAGE", e[e.NOT_IN_GROUP = 22406] = "NOT_IN_GROUP", e[e.NOT_IN_CHATROOM = 23406] = "NOT_IN_CHATROOM", e[e.FORBIDDEN_IN_CHATROOM = 23408] = "FORBIDDEN_IN_CHATROOM", e[e.RC_CHATROOM_USER_KICKED = 23409] = "RC_CHATROOM_USER_KICKED", e[e.RC_CHATROOM_NOT_EXIST = 23410] = "RC_CHATROOM_NOT_EXIST", e[e.RC_CHATROOM_IS_FULL = 23411] = "RC_CHATROOM_IS_FULL", e[e.RC_CHATROOM_PATAMETER_INVALID = 23412] = "RC_CHATROOM_PATAMETER_INVALID", e[e.CHATROOM_GET_HISTORYMSG_ERROR = 23413] = "CHATROOM_GET_HISTORYMSG_ERROR", e[e.CHATROOM_NOT_OPEN_HISTORYMSG_STORE = 23414] = "CHATROOM_NOT_OPEN_HISTORYMSG_STORE", e[e.CHATROOM_KV_EXCEED = 23423] = "CHATROOM_KV_EXCEED", e[e.CHATROOM_KV_OVERWRITE_INVALID = 23424] = "CHATROOM_KV_OVERWRITE_INVALID", e[e.CHATROOM_KV_STORE_NOT_OPEN = 23426] = "CHATROOM_KV_STORE_NOT_OPEN", e[e.CHATROOM_KEY_NOT_EXIST = 23427] = "CHATROOM_KEY_NOT_EXIST", e[e.SENSITIVE_SHIELD = 21501] = "SENSITIVE_SHIELD", e[e.SENSITIVE_REPLACE = 21502] = "SENSITIVE_REPLACE", e[e.JOIN_IN_DISCUSSION = 21407] = "JOIN_IN_DISCUSSION", e[e.CREATE_DISCUSSION = 21408] = "CREATE_DISCUSSION", e[e.INVITE_DICUSSION = 21409] = "INVITE_DICUSSION", e[e.GET_USERINFO_ERROR = 23407] = "GET_USERINFO_ERROR", e[e.REJECTED_BY_BLACKLIST = 405] = "REJECTED_BY_BLACKLIST", e[e.RC_NET_CHANNEL_INVALID = 30001] = "RC_NET_CHANNEL_INVALID", e[e.RC_NET_UNAVAILABLE = 30002] = "RC_NET_UNAVAILABLE", e[e.RC_MSG_RESP_TIMEOUT = 30003] = "RC_MSG_RESP_TIMEOUT", e[e.RC_HTTP_SEND_FAIL = 30004] = "RC_HTTP_SEND_FAIL", e[e.RC_HTTP_REQ_TIMEOUT = 30005] = "RC_HTTP_REQ_TIMEOUT", e[e.RC_HTTP_RECV_FAIL = 30006] = "RC_HTTP_RECV_FAIL", e[e.RC_NAVI_RESOURCE_ERROR = 30007] = "RC_NAVI_RESOURCE_ERROR", e[e.RC_NODE_NOT_FOUND = 30008] = "RC_NODE_NOT_FOUND", e[e.RC_DOMAIN_NOT_RESOLVE = 30009] = "RC_DOMAIN_NOT_RESOLVE", e[e.RC_SOCKET_NOT_CREATED = 30010] = "RC_SOCKET_NOT_CREATED", e[e.RC_SOCKET_DISCONNECTED = 30011] = "RC_SOCKET_DISCONNECTED", e[e.RC_PING_SEND_FAIL = 30012] = "RC_PING_SEND_FAIL", e[e.RC_PONG_RECV_FAIL = 30013] = "RC_PONG_RECV_FAIL", e[e.RC_MSG_SEND_FAIL = 30014] = "RC_MSG_SEND_FAIL", e[e.RC_MSG_CONTENT_EXCEED_LIMIT = 30016] = "RC_MSG_CONTENT_EXCEED_LIMIT", e[e.RC_CONN_ACK_TIMEOUT = 31e3] = "RC_CONN_ACK_TIMEOUT", e[e.RC_CONN_PROTO_VERSION_ERROR = 31001] = "RC_CONN_PROTO_VERSION_ERROR", e[e.RC_CONN_ID_REJECT = 31002] = "RC_CONN_ID_REJECT", e[e.RC_CONN_SERVER_UNAVAILABLE = 31003] = "RC_CONN_SERVER_UNAVAILABLE", e[e.RC_CONN_USER_OR_PASSWD_ERROR = 31004] = "RC_CONN_USER_OR_PASSWD_ERROR", e[e.RC_CONN_NOT_AUTHRORIZED = 31005] = "RC_CONN_NOT_AUTHRORIZED", e[e.RC_CONN_REDIRECTED = 31006] = "RC_CONN_REDIRECTED", e[e.RC_CONN_PACKAGE_NAME_INVALID = 31007] = "RC_CONN_PACKAGE_NAME_INVALID", e[e.RC_CONN_APP_BLOCKED_OR_DELETED = 31008] = "RC_CONN_APP_BLOCKED_OR_DELETED", e[e.RC_CONN_USER_BLOCKED = 31009] = "RC_CONN_USER_BLOCKED", e[e.RC_DISCONN_KICK = 31010] = "RC_DISCONN_KICK", e[e.RC_DISCONN_EXCEPTION = 31011] = "RC_DISCONN_EXCEPTION", e[e.RC_APP_AUTH_NOT_PASS = 31026] = "RC_APP_AUTH_NOT_PASS", e[e.RC_OTP_USED = 31027] = "RC_OTP_USED", e[e.RC_PLATFORM_ERROR = 31028] = "RC_PLATFORM_ERROR", e[e.RC_QUERY_ACK_NO_DATA = 32001] = "RC_QUERY_ACK_NO_DATA", e[e.RC_MSG_DATA_INCOMPLETE = 32002] = "RC_MSG_DATA_INCOMPLETE", e[e.BIZ_ERROR_CLIENT_NOT_INIT = 33001] = "BIZ_ERROR_CLIENT_NOT_INIT", e[e.BIZ_ERROR_DATABASE_ERROR = 33002] = "BIZ_ERROR_DATABASE_ERROR", e[e.BIZ_ERROR_INVALID_PARAMETER = 33003] = "BIZ_ERROR_INVALID_PARAMETER", e[e.BIZ_ERROR_NO_CHANNEL = 33004] = "BIZ_ERROR_NO_CHANNEL", e[e.BIZ_ERROR_RECONNECT_SUCCESS = 33005] = "BIZ_ERROR_RECONNECT_SUCCESS", e[e.BIZ_ERROR_CONNECTING = 33006] = "BIZ_ERROR_CONNECTING", e[e.MSG_ROAMING_SERVICE_UNAVAILABLE = 33007] = "MSG_ROAMING_SERVICE_UNAVAILABLE", e[e.MSG_INSERT_ERROR = 33008] = "MSG_INSERT_ERROR", e[e.MSG_DEL_ERROR = 33009] = "MSG_DEL_ERROR", e[e.TAG_NOT_EXIST = 33101] = "TAG_NOT_EXIST", e[e.NO_TAG_IN_CONVER = 33102] = "NO_TAG_IN_CONVER", e[e.CONVER_REMOVE_ERROR = 34001] = "CONVER_REMOVE_ERROR", e[e.CONVER_GETLIST_ERROR = 34002] = "CONVER_GETLIST_ERROR", e[e.CONVER_SETOP_ERROR = 34003] = "CONVER_SETOP_ERROR", e[e.CONVER_TOTAL_UNREAD_ERROR = 34004] = "CONVER_TOTAL_UNREAD_ERROR", e[e.CONVER_TYPE_UNREAD_ERROR = 34005] = "CONVER_TYPE_UNREAD_ERROR", e[e.CONVER_ID_TYPE_UNREAD_ERROR = 34006] = "CONVER_ID_TYPE_UNREAD_ERROR", e[e.CONVER_CLEAR_ERROR = 34007] = "CONVER_CLEAR_ERROR", e[e.EXPANSION_LIMIT_EXCEET = 34010] = "EXPANSION_LIMIT_EXCEET", e[e.MESSAGE_KV_NOT_SUPPORT = 34008] = "MESSAGE_KV_NOT_SUPPORT", e[e.CLEAR_HIS_TIME_ERROR = 34011] = "CLEAR_HIS_TIME_ERROR", e[e.CONVER_OUT_LIMIT_ERROR = 34013] = "CONVER_OUT_LIMIT_ERROR", e[e.CONVER_GET_ERROR = 34009] = "CONVER_GET_ERROR", e[e.GROUP_SYNC_ERROR = 35001] = "GROUP_SYNC_ERROR", e[e.GROUP_MATCH_ERROR = 35002] = "GROUP_MATCH_ERROR", e[e.READ_RECEIPT_ERROR = 35003] = "READ_RECEIPT_ERROR", e[e.PACKAGE_ENVIRONMENT_ERROR = 35006] = "PACKAGE_ENVIRONMENT_ERROR", e[e.CAN_NOT_RECONNECT = 35007] = "CAN_NOT_RECONNECT", e[e.SERVER_UNAVAILABLE = 35008] = "SERVER_UNAVAILABLE", e[e.HOSTNAME_ERROR = 35009] = "HOSTNAME_ERROR", e[e.HAS_OHTER_SAME_CLIENT_ON_LINE = 35010] = "HAS_OHTER_SAME_CLIENT_ON_LINE", e[e.CHATROOM_ID_ISNULL = 36001] = "CHATROOM_ID_ISNULL", e[e.CHARTOOM_JOIN_ERROR = 36002] = "CHARTOOM_JOIN_ERROR", e[e.CHATROOM_HISMESSAGE_ERROR = 36003] = "CHATROOM_HISMESSAGE_ERROR", e[e.CHATROOM_KV_NOT_FOUND = 36004] = "CHATROOM_KV_NOT_FOUND", e[e.BLACK_ADD_ERROR = 37001] = "BLACK_ADD_ERROR", e[e.BLACK_GETSTATUS_ERROR = 37002] = "BLACK_GETSTATUS_ERROR", e[e.BLACK_REMOVE_ERROR = 37003] = "BLACK_REMOVE_ERROR", e[e.DRAF_GET_ERROR = 38001] = "DRAF_GET_ERROR", e[e.DRAF_SAVE_ERROR = 38002] = "DRAF_SAVE_ERROR", e[e.DRAF_REMOVE_ERROR = 38003] = "DRAF_REMOVE_ERROR", e[e.SUBSCRIBE_ERROR = 39001] = "SUBSCRIBE_ERROR", e[e.NOT_SUPPORT = 39002] = "NOT_SUPPORT", e[e.QNTKN_FILETYPE_ERROR = 41001] = "QNTKN_FILETYPE_ERROR", e[e.QNTKN_GET_ERROR = 41002] = "QNTKN_GET_ERROR", e[e.COOKIE_ENABLE = 51001] = "COOKIE_ENABLE", e[e.GET_MESSAGE_BY_ID_ERROR = 61001] = "GET_MESSAGE_BY_ID_ERROR", e[e.HAVNODEVICEID = 24001] = "HAVNODEVICEID", e[e.DEVICEIDISHAVE = 24002] = "DEVICEIDISHAVE", e[e.FEILD = 24009] = "FEILD", e[e.VOIPISNULL = 24013] = "VOIPISNULL", e[e.NOENGINETYPE = 24010] = "NOENGINETYPE", e[e.NULLCHANNELNAME = 24011] = "NULLCHANNELNAME", e[e.VOIPDYANMICERROR = 24012] = "VOIPDYANMICERROR", e[e.NOVOIP = 24014] = "NOVOIP", e[e.INTERNALERRROR = 24015] = "INTERNALERRROR", e[e.VOIPCLOSE = 24016] = "VOIPCLOSE", e[e.CLOSE_BEFORE_OPEN = 51001] = "CLOSE_BEFORE_OPEN", e[e.ALREADY_IN_USE = 51002] = "ALREADY_IN_USE", e[e.INVALID_CHANNEL_NAME = 51003] = "INVALID_CHANNEL_NAME", e[e.VIDEO_CONTAINER_IS_NULL = 51004] = "VIDEO_CONTAINER_IS_NULL", e[e.DELETE_MESSAGE_ID_IS_NULL = 61001] = "DELETE_MESSAGE_ID_IS_NULL", e[e.CANCEL = 1] = "CANCEL", e[e.REJECT = 2] = "REJECT", e[e.HANGUP = 3] = "HANGUP", e[e.BUSYLINE = 4] = "BUSYLINE", e[e.NO_RESPONSE = 5] = "NO_RESPONSE", e[e.ENGINE_UN_SUPPORTED = 6] = "ENGINE_UN_SUPPORTED", e[e.NETWORK_ERROR = 7] = "NETWORK_ERROR", e[e.REMOTE_CANCEL = 11] = "REMOTE_CANCEL", e[e.REMOTE_REJECT = 12] = "REMOTE_REJECT", e[e.REMOTE_HANGUP = 13] = "REMOTE_HANGUP", e[e.REMOTE_BUSYLINE = 14] = "REMOTE_BUSYLINE", e[e.REMOTE_NO_RESPONSE = 15] = "REMOTE_NO_RESPONSE", e[e.REMOTE_ENGINE_UN_SUPPORTED = 16] = "REMOTE_ENGINE_UN_SUPPORTED", e[e.REMOTE_NETWORK_ERROR = 17] = "REMOTE_NETWORK_ERROR", e[e.VOIP_NOT_AVALIABLE = 18] = "VOIP_NOT_AVALIABLE", e[e.CHATROOM_KV_STORE_NOT_ALL_SUCCESS = 23428] = "CHATROOM_KV_STORE_NOT_ALL_SUCCESS", e[e.CHATROOM_KV_STORE_OUT_LIMIT = 23429] = "CHATROOM_KV_STORE_OUT_LIMIT";}(_e || (_e = {}));var Ee,me = _e;exports.ErrorCode = me;!function (e) {e[e.CONNECTED = 0] = "CONNECTED", e[e.CONNECTING = 1] = "CONNECTING", e[e.DISCONNECTED = 2] = "DISCONNECTED", e[e.NETWORK_UNAVAILABLE = 3] = "NETWORK_UNAVAILABLE", e[e.CONNECTION_CLOSED = 4] = "CONNECTION_CLOSED", e[e.KICKED_OFFLINE_BY_OTHER_CLIENT = 6] = "KICKED_OFFLINE_BY_OTHER_CLIENT", e[e.WEBSOCKET_UNAVAILABLE = 7] = "WEBSOCKET_UNAVAILABLE", e[e.WEBSOCKET_ERROR = 8] = "WEBSOCKET_ERROR", e[e.BLOCKED = 9] = "BLOCKED", e[e.DOMAIN_INCORRECT = 12] = "DOMAIN_INCORRECT", e[e.DISCONNECT_BY_SERVER = 13] = "DISCONNECT_BY_SERVER", e[e.REDIRECT = 14] = "REDIRECT", e[e.APPKEY_IS_FAKE = 20] = "APPKEY_IS_FAKE", e[e.ULTRALIMIT = 1101] = "ULTRALIMIT", e[e.REQUEST_NAVI = 201] = "REQUEST_NAVI", e[e.RESPONSE_NAVI = 202] = "RESPONSE_NAVI", e[e.RESPONSE_NAVI_ERROR = 203] = "RESPONSE_NAVI_ERROR", e[e.RESPONSE_NAVI_TIMEOUT = 204] = "RESPONSE_NAVI_TIMEOUT";}(Ee || (Ee = {}));var ve,Te = Ee,Ie = { ACCEPTED: 0, UNACCEPTABLE_PROTOCOL_VERSION: 1, IDENTIFIER_REJECTED: 2, SERVER_UNAVAILABLE: 3, TOKEN_INCORRECT: 4, NOT_AUTHORIZED: 5, REDIRECT: 6, PACKAGE_ERROR: 7, APP_BLOCK_OR_DELETE: 8, BLOCK: 9, TOKEN_EXPIRE: 10, DEVICE_ERROR: 11, HOSTNAME_ERROR: 12, HASOHTERSAMECLIENTONLINE: 13, IN_OTHER_CLUSTER: 15, APP_AUTH_NOT_PASS: 16, OTP_USED: 17, PLATFORM_ERROR: 18 };exports.ConnectResultCode = Ie;exports.ConnectionStatus = Te;!function (e) {e.TextMessage = "RC:TxtMsg", e.VOICE = "RC:VcMsg", e.HQ_VOICE = "RC:HQVCMsg", e.IMAGE = "RC:ImgMsg", e.GIF = "RC:GIFMsg", e.RICH_CONTENT = "RC:ImgTextMsg", e.LOCATION = "RC:LBSMsg", e.FILE = "RC:FileMsg", e.SIGHT = "RC:SightMsg", e.COMBINE = "RC:CombineMsg", e.CHRM_KV_NOTIFY = "RC:chrmKVNotiMsg", e.LOG_COMMAND = "RC:LogCmdMsg", e.EXPANSION_NOTIFY = "RC:MsgExMsg", e.REFERENCE = "RC:ReferenceMsg", e.RECALL = "RC:RcCmd", e.READ_RECEIPT = "RC:ReadNtf", e.READ_RECEIPT_REQUEST = "RC:RRReqMsg", e.READ_RECEIPT_RESPONSE = "RC:RRRspMsg", e.SYNC_READ_STATUS = "RC:SRSMsg", e.GROUP_READ_RECEIPT_REQUEST = "RC:RRMsg", e.CHATROOM_JOIN = "RC:ChrmJoinNtf", e.CHATROOM_LEFT = "RC:ChrmQuitNtf", e.CHATROOM_MERGE_CHANGE = "RC:ChrmMemChange", e.TYPING_STATUS = "RC:TypSts", e.INTERCEPT = "RC:InterceptMsg";}(ve || (ve = {}));var Ce,Re = ve;exports.MessageType = Re;!function (e) {e[e.OPEN = 1] = "OPEN", e[e.CLOSE = 2] = "CLOSE";}(Ce || (Ce = {}));var Se,Ne = Ce;exports.NotificationStatus = Ne;!function (e) {e[e.ALL = 1] = "ALL", e[e.SINGAL = 2] = "SINGAL";}(Se || (Se = {}));var Oe,we = Se;exports.MentionedType = we;!function (e) {e[e.QINIU = 1] = "QINIU", e[e.ALI = 2] = "ALI", e[e.AWS = 3] = "AWS", e[e.STC = 4] = "STC";}(Oe || (Oe = {}));var be,Me = Oe;exports.UploadMethod = Me;!function (e) {e[e.UPDATE = 1] = "UPDATE", e[e.DELETE = 2] = "DELETE";}(be || (be = {}));var Ae,Ue = be;exports.ChatroomEntryType = Ue;!function (e) {e[e.QUIT = 0] = "QUIT", e[e.JOIN = 1] = "JOIN";}(Ae || (Ae = {}));var Le,Pe,De,Ve = Ae;exports.ChatroomMemberChangeType = Ve;exports.LiveRole = De;exports.LiveType = Pe;exports.RTCMode = Le;!function (e) {e[e.RTC = 0] = "RTC", e[e.LIVE = 2] = "LIVE";}(Le || (exports.RTCMode = Le = {})), function (e) {e[e.AUDIO_AND_VIDEO = 0] = "AUDIO_AND_VIDEO", e[e.AUDIO = 1] = "AUDIO";}(Pe || (exports.LiveType = Pe = {})), function (e) {e[e.ANCHOR = 1] = "ANCHOR", e[e.AUDIENCE = 2] = "AUDIENCE";}(De || (exports.LiveRole = De = {}));var ke,xe,Be,Fe = { "RC:VCAccept": "RC:VCAccept", "RC:VCRinging": "RC:VCRinging", "RC:VCSummary": "RC:VCSummary", "RC:VCHangup": "RC:VCHangup", "RC:VCInvite": "RC:VCInvite", "RC:VCModifyMedia": "RC:VCModifyMedia", "RC:VCModifyMem": "RC:VCModifyMem" };exports.CallLibMsgType = Fe;exports.RTCJoinType = Be;exports.RTCIdentityChangeType = xe;exports.RTCApiType = ke;!function (e) {e[e.ROOM = 1] = "ROOM", e[e.PERSON = 2] = "PERSON";}(ke || (exports.RTCApiType = ke = {})), function (e) {e[e.AnchorToViewer = 1] = "AnchorToViewer", e[e.ViewerToAnchor = 2] = "ViewerToAnchor";}(xe || (exports.RTCIdentityChangeType = xe = {})), function (e) {e[e.KICK = 0] = "KICK", e[e.REFUSE = 1] = "REFUSE", e[e.COEXIST = 2] = "COEXIST";}(Be || (exports.RTCJoinType = Be = {}));var qe,Ye,Ke = { engine: "4.5.1" },He = function () {function e() {}return e.add = function (e, t) {Ke[e] = t;}, e.validEngine = function (e) {var t = e.match(/\d+\.\d+\.\d+/);if (!t) return pe.warn("The validation engine version '" + e + "' is invalid!"), !1;var n = t[0].split(".").map(function (e) {return e.padStart(3, "0");}).join("");return Ke.engine.match(/\d+\.\d+\.\d+/)[0].split(".").map(function (e) {return e.padStart(3, "0");}).join("") >= n;}, e.getInfo = function () {return Ke;}, e;}();exports.VersionManage = He;exports.AssertRules = Ye;!function (e) {e[e.STRING = 0] = "STRING", e[e.ONLY_STRING = 1] = "ONLY_STRING", e[e.NUMBER = 2] = "NUMBER", e[e.BOOLEAN = 3] = "BOOLEAN", e[e.OBJECT = 4] = "OBJECT", e[e.ARRAY = 5] = "ARRAY", e[e.CALLBACK = 6] = "CALLBACK";}(Ye || (exports.AssertRules = Ye = {}));var Ge,je,Qe,Je,We,ze = ((qe = {})[Ye.STRING] = te, qe[Ye.ONLY_STRING] = z, qe[Ye.NUMBER] = X, qe[Ye.BOOLEAN] = function (e) {return "boolean" == typeof e;}, qe[Ye.OBJECT] = ie, qe[Ye.ARRAY] = $, qe[Ye.CALLBACK] = function (e) {var t = !0;return ie(e) || (t = !1), (e = e || {}).onSuccess && !re(e.onSuccess) && (t = !1), e.onError && !re(e.onError) && (t = !1), t;}, qe),Ze = function (e) {function t(t) {var n = e.call(this, t) || this;return n.name = "RCAssertError", n;}return N(t, e), t;}(Error),Xe = function Xe(e, t, n, i) {if (void 0 === i && (i = !1), !$e(e, t, n, i)) throw new Ze("'" + e + "' is invalid: " + JSON.stringify(t));},$e = function $e(e, t, n, i) {void 0 === i && (i = !1), n = ze[n] || n;var r = i && !n(t) || !i && !(se(t) || null === t || n(t));return r && pe.error("'" + e + "' is invalid: " + JSON.stringify(t)), !r;},et = function et(e) {if (!ie(e) || void 0 === e.low || void 0 === e.high) return e;var t = e.low;return t < 0 && (t += 4294967296), t = t.toString(16), parseInt(e.high.toString(16) + "00000000".replace(new RegExp("0{" + t.length + "}$"), t), 16);},tt = function tt(e, t) {var n = Math.floor(1e3 * Math.random() % 1e4),i = K(),r = function (e) {e = e || "-";var t = new Date();return "" + t.getFullYear() + e + (t.getMonth() + 1) + e + t.getDate();}(),s = new Date().getTime(),o = "";if (t) {var a = t.split(".");o = "." + a[a.length - 1];}return e + "__RC-" + r + "_" + n + "_" + s + i + o;},nt = function nt(e) {var t = "application/octet-stream";switch (e) {case W.IMAGE:t = "image/jpeg";break;case W.AUDIO:t = "audio/amr";break;case W.VIDEO:t = "video/3gpp";break;case W.SIGHT:t = "video/mpeg4";break;case W.COMBINE_HTML:t = "text/html";}return t;},it = function it(e, t) {void 0 === e && (e = {}), void 0 === t && (t = {});var n = e.threadId,i = e.apnsCollapseId,r = e.category,s = e.richMediaUri,o = t.channelIdMi,a = t.channelIdHW,u = t.channelIdOPPO,c = t.typeVivo,h = t.googleConfig,l = {};l["thread-id"] = n || "", l["apns-collapse-id"] = i || "", l.category = r || "", l.richMediaUri = s || "";var f = {};f.collapse_key = null == h ? void 0 : h.collapseKey, f.imageUrl = null == h ? void 0 : h.imageUrl;var d = null == h ? void 0 : h.priority;d && !["high", "normal"].includes(d) && (d = "normal"), f.priority = d;var p = [{ HW: { channelId: a || "" } }, { MI: { channelId: o || "" } }, { OPPO: { channelId: u || "" } }, { VIVO: { classification: c || "" } }, { APNS: l }, { FCM: f }];return JSON.stringify(p);},rt = function rt(e, t) {var n = {},i = { notificationId: t || "" };if (!e) return { iOSConfig: n, androidConfig: i };try {var r = JSON.parse(e);null == r || r.forEach(function (e) {var t,r,s,o,a = Object.keys(e);if (0 !== a.length) {var u = a[0];switch (u) {case "HW":return void (i.channelIdHW = null === (t = e[u]) || void 0 === t ? void 0 : t.channelId);case "MI":return void (i.channelIdMi = null === (r = e[u]) || void 0 === r ? void 0 : r.channelId);case "OPPO":return void (i.channelIdOPPO = null === (s = e[u]) || void 0 === s ? void 0 : s.channelId);case "VIVO":return void (i.typeVivo = null === (o = e[u]) || void 0 === o ? void 0 : o.classification);case "APNS":return n.threadId = e[u]["thread-id"], n.apnsCollapseId = e[u]["apns-collapse-id"], n.category = e[u].category, void (n.richMediaUri = e[u].richMediaUri);case "FCM":i.googleConfig = { collapseKey: e[u].collapse_key || "", imageUrl: e[u].imageUrl || "", priority: e[u].priority || "" };}}});} catch (t) {pe.error("Wrong format for pushConfigs field! content: " + e);}return { iOSConfig: n, androidConfig: i };},st = function st(e) {var t = /^[A-Za-z0-9_=+-]+$/.test(e),n = e.length;return t && n <= 128 && n >= 1;},ot = function ot(e) {var t = e.length;return t <= 4096 && t >= 1;},at = function at(e, t, n) {t = t || function () {};var i = (n = n || {}).isReverse;ie(e) && function () {for (var n in e) {t(e[n], n, e);}}(), ($(e) || z(e)) && function () {if (i) for (var n = e.length - 1; n >= 0; n--) {t(e[n], n);} else for (var r = 0, s = e.length; r < s; r++) {t(e[r], r);}}();},ut = function ut(e, t) {return at(e, function (n, i) {e[i] = t(n, i);}), e;},ct = function ct(e, t) {if (e.indexOf) return e.indexOf(t);var n = -1;return at(e, function (e, i) {t === e && (n = i);}), n;},ht = function ht(e, t) {return -1 !== ct(e, t);},lt = function lt(e, t) {var n = [];return at(e, function (e) {n.push(e);}), -1 !== ct(n, t);},ft = function ft(e) {return JSON.parse(JSON.stringify(e));},dt = function dt() {return "undefined" != typeof RCCppEngine;},pt = function pt(e) {if ("browser" !== e.tag) return { type: e.tag, version: "UnKonw" };var t,n,i = navigator.userAgent,r = { IE: /rv:([\d.]+)\) like Gecko|MSIE ([\d.]+)/, Edge: /Edge\/([\d.]+)/, Firefox: /Firefox\/([\d.]+)/, Opera: /(?:OPERA|OPR).([\d.]+)/, WeChat: /MicroMessenger\/([\d.]+)/, QQBrowser: /QQBrowser\/([\d.]+)/, Chrome: /Chrome\/([\d.]+)/, Safari: /Version\/([\d.]+).*Safari/, iOSChrome: /Mobile\/([\d.]+).*Safari/ };for (var s in r) {if (r.hasOwnProperty(s)) {var o = i.match(r[s]);if (o) {n = s, t = o[1] || o[2];break;}}}return { type: n || "UnKonw", version: t || "UnKonw" };},gt = function gt(e) {switch (e) {case Ie.SERVER_UNAVAILABLE:return me.SERVER_UNAVAILABLE;case Ie.TOKEN_INCORRECT:return me.RC_CONN_USER_OR_PASSWD_ERROR;case Ie.REDIRECT:return me.RC_CONN_REDIRECTED;case Ie.APP_BLOCK_OR_DELETE:return me.RC_CONN_APP_BLOCKED_OR_DELETED;case Ie.BLOCK:return me.RC_CONN_USER_BLOCKED;case Ie.TOKEN_EXPIRE:return me.RC_CONN_USER_OR_PASSWD_ERROR;case Ie.HOSTNAME_ERROR:return me.HOSTNAME_ERROR;case Ie.HASOHTERSAMECLIENTONLINE:return me.HAS_OHTER_SAME_CLIENT_ON_LINE;case Ie.APP_AUTH_NOT_PASS:return me.RC_APP_AUTH_NOT_PASS;case Ie.OTP_USED:return me.RC_OTP_USED;case Ie.PLATFORM_ERROR:return me.RC_PLATFORM_ERROR;default:return me.RC_NET_UNAVAILABLE;}},_t = function _t(e) {var t = {},n = JSON.parse(e);return at(n, function (e, n) {t[n] = e.v;}), t;},yt = { _delayTime: 0, setTime: function setTime(e) {var t = new Date().getTime();yt._delayTime = t - e;}, getTime: function getTime() {var e = yt._delayTime;return new Date().getTime() - e;} },Et = function Et(e, t) {var n = 0;return e.isAutoDelete && (n |= 1), e.isOverwrite && (n |= 2), 2 === t && (n |= 4), n;};exports.DelayTimer = yt;exports.formatConnectResponseCode = gt;exports.getBrowser = pt;exports.usingCppEngine = dt;exports.cloneByJSON = ft;exports.isInObject = lt;exports.isInclude = ht;exports.indexOf = ct;exports.map = ut;exports.forEach = at;exports.isValidChrmEntryValue = ot;exports.isValidChrmEntryKey = st;exports.pushJSONToConfigs = rt;exports.pushConfigsToJSON = it;exports.getMimeKey = nt;exports.getUploadFileName = tt;exports.validate = $e;exports.assert = Xe;exports.RCAssertError = Ze;!function (e) {e[e.AT_MOST_ONCE = 0] = "AT_MOST_ONCE", e[e.AT_LEAST_ONCE = 1] = "AT_LEAST_ONCE", e[e.EXACTLY_ONCE = 2] = "EXACTLY_ONCE", e[e.DEFAULT = 3] = "DEFAULT";}(Ge || (Ge = {})), function (e) {e[e.SYMMETRIC = 0] = "SYMMETRIC", e[e.CONNECT = 1] = "CONNECT", e[e.CONN_ACK = 2] = "CONN_ACK", e[e.PUBLISH = 3] = "PUBLISH", e[e.PUB_ACK = 4] = "PUB_ACK", e[e.QUERY = 5] = "QUERY", e[e.QUERY_ACK = 6] = "QUERY_ACK", e[e.QUERY_CONFIRM = 7] = "QUERY_CONFIRM", e[e.SUBSCRIBE = 8] = "SUBSCRIBE", e[e.SUB_ACK = 9] = "SUB_ACK", e[e.UNSUBSCRIBE = 10] = "UNSUBSCRIBE", e[e.UNSUB_ACK = 11] = "UNSUB_ACK", e[e.PING_REQ = 12] = "PING_REQ", e[e.PING_RESP = 13] = "PING_RESP", e[e.DISCONNECT = 14] = "DISCONNECT", e[e.RESERVER2 = 15] = "RESERVER2";}(je || (je = {})), function (e) {e.CONN_ACK = "ConnAckMessage", e.DISCONNECT = "DisconnectMessage", e.PING_REQ = "PingReqMessage", e.PING_RESP = "PingRespMessage", e.PUBLISH = "PublishMessage", e.PUB_ACK = "PubAckMessage", e.QUERY = "QueryMessage", e.QUERY_CON = "QueryConMessage", e.QUERY_ACK = "QueryAckMessage";}(Qe || (Qe = {})), function (e) {e.PUB = "pub", e.QUERY = "qry";}(Je || (Je = {})), function (e) {e[e.V4 = 4] = "V4", e[e.V3 = 3] = "V3";}(We || (We = {}));var mt,vt = function () {function e(e, t, n, i) {void 0 === t && (t = !1), void 0 === n && (n = Ge.AT_LEAST_ONCE), void 0 === i && (i = !1), this._retain = !1, this.qos = Ge.AT_LEAST_ONCE, this._dup = !1, this.syncMsg = !1;var r = e > 0;e && r && 1 === arguments.length ? (this._retain = (1 & e) > 0, this.qos = (6 & e) >> 1, this._dup = (8 & e) > 0, this.type = e >> 4 & 15, this.syncMsg = 8 == (8 & e)) : (this.type = e, this._retain = t, this.qos = n, this._dup = i);}return e.prototype.encode = function () {var e = this.type << 4;return e |= this._retain ? 1 : 0, e |= this.qos << 1, e |= this._dup ? 8 : 0;}, e;}(),Tt = function () {function e() {}return e.writeUTF = function (e, t) {var n = [],i = 0;if (z(e)) for (var r = 0, s = e.length; r < s; r++) {var o = e.charCodeAt(r);o >= 0 && o <= 127 ? (i += 1, n.push(o)) : o >= 128 && o <= 2047 ? (i += 2, n.push(192 | 31 & o >> 6), n.push(128 | 63 & o)) : o >= 2048 && o <= 65535 && (i += 3, n.push(224 | 15 & o >> 12), n.push(128 | 63 & o >> 6), n.push(128 | 63 & o));}for (r = 0, s = n.length; r < s; r++) {n[r] > 255 && (n[r] &= 255);}return t ? n : i <= 255 ? [0, i].concat(n) : [i >> 8, 255 & i].concat(n);}, e.readUTF = function (e) {for (var t, n, i = [], r = -1, s = e, o = ""; ++r < s.length;) {var a = Number(s[r]);if (a === (127 & a) || (240 == (240 & a) ? a = (a = (a = (a ^= 240) << 6 | 128 ^ s[++r]) << 6 | 128 ^ s[++r]) << 6 | 128 ^ s[++r] : 224 == (224 & a) ? a = (a = (a ^= 224) << 6 | 128 ^ s[++r]) << 6 | 128 ^ s[++r] : 192 == (192 & a) && (a = (a ^= 192) << 6 | 128 ^ s[++r])), !isFinite(a) || a < 0 || a > 1114111 || Math.floor(a) !== a) throw RangeError("Invalid code point: " + a);a <= 65535 ? i.push(a) : (t = (a -= 65536) >> 10 | 55296, n = a % 1024 | 56320, i.push(t, n)), (r + 1 === s.length || i.length > 16384) && (o += String.fromCharCode.apply(null, i), i.length = 0);}return o;}, e;}(),It = function () {function e(e) {this._position = 0, this._poolLen = 0, this._pool = e, this._poolLen = e.length;}return e.prototype.check = function () {return this._position >= this._pool.length;}, e.prototype.read2Byte = function () {var e = this;if (e.check()) return -1;for (var t = "", n = 0; n < 2; n++) {var i = e._pool[e._position++].toString(16);1 === i.length && (i = "0" + i), t += i.toString();}return parseInt(t, 16);}, e.prototype.readInt = function () {var e = this;if (e.check()) return -1;for (var t = "", n = 0; n < 4; n++) {var i = e._pool[e._position++].toString(16);1 === i.length && (i = "0" + i), t += i.toString();}return parseInt(t, 16);}, e.prototype.readLong = function () {var e = this;if (e.check()) return -1;for (var t = "", n = 0; n < 8; n++) {var i = e._pool[e._position++].toString(16);1 === i.length && (i = "0" + i), t += i;}return parseInt(t, 16);}, e.prototype.readByte = function () {if (this.check()) return -1;var e = this._pool[this._position++];return e > 255 && (e &= 255), e;}, e.prototype.readUTF = function () {if (this.check()) return "";var e = this.readByte() << 8 | this.readByte(),t = this._pool.subarray(this._position, this._position += e);return Tt.readUTF(t);}, e.prototype.readAll = function () {return this._pool.subarray(this._position, this._poolLen);}, e;}(),Ct = function () {function e() {this._pool = [], this._position = 0, this._writen = 0;}return e.prototype.write = function (e) {return -1 !== Object.prototype.toString.call(e).indexOf("Array") ? this._pool = this._pool.concat(e) : e >= 0 && (e > 255 && (e &= 255), this._pool.push(e), this._writen++), e;}, e.prototype.writeArr = function (e) {return this._pool = this._pool.concat(e), e;}, e.prototype.writeUTF = function (e) {var t = Tt.writeUTF(e);this._pool = this._pool.concat(t), this._writen += t.length;}, e.prototype.getBytesArray = function () {return this._pool;}, e;}(),Rt = "UpStreamMessage",St = "PushExtra",Nt = "DownStreamMessage",Ot = "DownStreamMessages",wt = "SessionsAttQryInput",bt = "SessionsAttOutput",Mt = "SyncRequestMsg",At = "ChrmPullMsg",Ut = "NotifyMsg",Lt = "HistoryMsgInput",Pt = "HistoryMsgOuput",Dt = "RelationQryInput",Vt = "RelationsOutput",kt = "DeleteSessionsInput",xt = "SessionInfo",Bt = "DeleteSessionsOutput",Ft = "RelationsInput",qt = "DeleteMsgInput",Yt = "CleanHisMsgInput",Kt = "SessionMsgReadInput",Ht = "ChrmInput",Gt = "ChrmOutput",jt = "QueryChatRoomInfoInput",Qt = "QueryChatRoomInfoOutput",Jt = "RtcInput",Wt = "RtcUserListOutput",zt = "SetUserStatusInput",Zt = "RtcSetDataInput",Xt = "RtcUserSetDataInput",$t = "RtcDataInput",en = "RtcSetOutDataInput",tn = "MCFollowInput",nn = "RtcTokenOutput",rn = "RtcQryOutput",sn = "RtcQryUserOutDataInput",on = "RtcUserOutDataOutput",an = "RtcQueryListInput",un = "RtcRoomInfoOutput",cn = "RtcValueInfo",hn = "RtcKeyDeleteInput",ln = "GetQNupTokenInput",fn = "GetQNupTokenOutput",dn = "GetQNdownloadUrlInput",pn = "GetDownloadUrlInput",gn = "GetQNdownloadUrlOutput",_n = "GetDownloadUrlOutput",yn = "SetChrmKV",En = "SetChrmKVS",mn = "DeleteChrmKVS",vn = "ChrmKVOutput",Tn = "ChrmKVSOutput",In = "ChrmKVSOutputEntity",Cn = "QueryChrmKV",Rn = "SetUserSettingInput",Sn = "SetUserSettingOutput",Nn = "PullUserSettingInput",On = "PullUserSettingOutput",wn = "UserSettingNotification",bn = "SessionReq",Mn = "SessionStates",An = "SessionState",Un = "SessionStateItem",Ln = "SessionStateModifyReq",Pn = "SessionStateModifyResp",Dn = "GrpReadReceiptMsg",Vn = "GrpReadReceiptQryReq",kn = "GrpReadReceiptQryResp",xn = "GrpMsgReadUser",Bn = "SessionTagAddInput",Fn = "SessionTagItem",qn = "SessionTagDelInput",Yn = "SessionDisTagReq",Kn = "ReportSDKInput",Hn = "ReportSDKOutput",Gn = "RtcNotifyMsg",jn = "RtcPullKV",Qn = "RtcKVOutput",Jn = "RtcQueryUserJoinedInput",Wn = "RtcQueryUserJoinedOutput",zn = ((mt = {})[Rt] = ["sessionId", "classname", "content", "pushText", "userId", "configFlag", "appData", "extraContent", "pushExt"], mt[Ot] = ["list", "syncTime", "finished"], mt[Nt] = ["fromUserId", "type", "groupId", "classname", "content", "dataTime", "status", "msgId", "extraContent", "pushContent", "configFlag", "pushExt"], mt[St] = ["title", "templateIdNoUse", "pushId", "pushConfigs", "templateId"], mt[wt] = ["nothing"], mt[bt] = ["inboxTime", "sendboxTime", "totalUnreadCount"], mt[Mt] = ["syncTime", "ispolling", "isweb", "isPullSend", "isKeeping", "sendBoxSyncTime"], mt[At] = ["syncTime", "count"], mt[Ut] = ["type", "time", "chrmId"], mt[Lt] = ["targetId", "time", "count", "order"], mt[Pt] = ["list", "syncTime", "hasMsg"], mt[Dt] = ["type", "count", "startTime", "order"], mt[Vt] = ["info"], mt[kt] = ["sessions"], mt[xt] = ["type", "channelId"], mt[Bt] = ["nothing"], mt[Ft] = ["type", "msg", "count", "offset", "startTime", "endTime"], mt[qt] = ["type", "conversationId", "msgs"], mt[Yt] = ["targetId", "dataTime", "conversationType"], mt[Kt] = ["type", "msgTime", "channelId"], mt[Ht] = ["nothing"], mt[Gt] = ["nothing", "sessionId", "joinTime"], mt[jt] = ["count", "order"], mt[Qt] = ["userTotalNums", "userInfos"], mt[ln] = ["type", "key", "httpMethod", "queryString"], mt[dn] = ["type", "key", "fileName"], mt[pn] = ["type", "key", "fileName"], mt[fn] = ["deadline", "token", "bosToken", "bosDate", "path", "osskeyId", "ossPolicy", "ossSign", "ossBucketName"], mt[gn] = ["downloadUrl"], mt[_n] = ["downloadUrl"], mt[yn] = ["entry", "bNotify", "notification", "type"], mt[En] = ["entry", "bNotify", "notification", "type"], mt[mn] = ["entry", "bNotify", "notification", "type"], mt[vn] = ["entries", "bFullUpdate", "syncTime"], mt[Tn] = ["timestamp", "errorKeys"], mt[In] = ["key", "errorCode"], mt[Cn] = ["timestamp"], mt[Rn] = ["version", "value"], mt[Sn] = ["version", "reserve"], mt[Nn] = ["version", "reserve"], mt[On] = ["items", "version"], mt.UserSettingItem = ["targetId", "type", "key", "value", "version", "status", "tags"], mt[bn] = ["time"], mt[Mn] = ["version", "state"], mt[An] = ["type", "channelId", "time", "stateItem"], mt[Un] = ["sessionStateType", "value", "tags"], mt[Ln] = ["version", "state"], mt[Pn] = ["version"], mt[Dn] = ["msgId", "busChannel"], mt[Vn] = ["msgId", "busChannel"], mt[kn] = ["totalMemberNum", "list"], mt[xn] = ["readTime", "userId"], mt[Bn] = ["version", "tags"], mt[Fn] = ["tagId", "name", "createdTime", "isTop"], mt[qn] = ["version", "tags"], mt[Yn] = ["tagId"], mt[wn] = ["version", "reserve"], mt[Kn] = ["sdkInfo"], mt[Hn] = ["nothing"], mt[Jt] = ["roomType", "broadcastType", "extraInnerData", "needSysChatroom", "identityChangeType", "joinType"], mt[Wt] = ["users", "token", "sessionId", "roomInfo"], mt[zt] = ["status"], mt[Zt] = ["interior", "target", "key", "value", "objectName", "content"], mt[Xt] = ["valueInfo", "objectName", "content"], mt[$t] = ["interior", "target", "key", "objectName", "content"], mt[en] = ["target", "valueInfo", "objectName", "content"], mt[tn] = ["state"], mt[nn] = ["rtcToken"], mt[rn] = ["outInfo"], mt[sn] = ["userId"], mt[on] = ["user"], mt[an] = ["order"], mt[un] = ["roomId", "roomData", "userCount", "list"], mt[cn] = ["key", "value"], mt[hn] = ["key"], mt[Gn] = ["type", "time", "roomId"], mt[jn] = ["timestamp", "roomId"], mt[Qn] = ["entries", "bFullUpdate", "syncTime"], mt[Jn] = ["userId"], mt[Wn] = ["info"], mt),Zn = {},Xn = function Xn(e) {var t = zn[e];Zn[e] = function () {for (var e = {}, n = { getArrayData: function getArrayData() {return e;} }, i = function i(_i2) {var r = t[_i2],s = "set" + D(r, 0, 1);n[s] = function (t) {e[r] = t;};}, r = 0; r < t.length; r++) {i(r);}return n;}, Zn[e].decode = function (e) {var t = {};z(e) && (e = JSON.parse(e));var n = function n(_n2) {var i = "get" + D(_n2, 0, 1);t[_n2] = e[_n2], t[i] = function () {return e[_n2];};};for (var i in e) {n(i);}return t;};};for (var $n in zn) {Xn($n);}Zn.getModule = function (e) {return Zn[e]();};var ei = "\npackage Modules;\nmessage probuf {\n  message " + zt + "\n  {\n    optional int32 status=1;\n  }\n\n  message SetUserStatusOutput\n  {\n    optional int32 nothing=1;\n  }\n\n  message GetUserStatusInput\n  {\n    optional int32 nothing=1;\n  }\n\n  message GetUserStatusOutput\n  {\n    optional string status=1;\n    optional string subUserId=2;\n  }\n\n  message SubUserStatusInput\n  {\n    repeated string userid =1;\n  }\n\n  message SubUserStatusOutput\n  {\n    optional int32 nothing=1;\n  }\n  message VoipDynamicInput\n  {\n    required int32  engineType = 1;\n    required string channelName = 2;\n    optional string channelExtra = 3;\n  }\n\n  message VoipDynamicOutput\n  {\n      required string dynamicKey=1;\n  }\n  message " + Ut + " {\n    required int32 type = 1;\n    optional int64 time = 2;\n    optional string chrmId=3;\n  }\n  message " + Mt + " {\n    required int64 syncTime = 1;\n    required bool ispolling = 2;\n    optional bool isweb=3;\n    optional bool isPullSend=4;\n    optional bool isKeeping=5;\n    optional int64 sendBoxSyncTime=6;\n  }\n  message " + Rt + " {\n    required int32 sessionId = 1;\n    required string classname = 2;\n    required bytes content = 3;\n    optional string pushText = 4;\n    optional string appData = 5;\n    repeated string userId = 6;\n    optional int64 delMsgTime = 7;\n    optional string delMsgId = 8;\n    optional int32 configFlag = 9;\n    optional int64 clientUniqueId = 10;\n    optional string extraContent = 11;\n    optional PushExtra pushExt = 12;\n  }\n  message " + St + " {\n    optional string title = 1;\n    optional int32  templateIdNoUse= 2;\n    optional string pushId = 3;\n    optional string pushConfigs = 4;\n    optional string templateId = 5;\n  }\n  message " + Ot + " {\n    repeated DownStreamMessage list = 1;\n    required int64 syncTime = 2;\n    optional bool finished = 3;\n  }\n  message " + Nt + " {\n    required string fromUserId = 1;\n    required ChannelType type = 2;\n    optional string groupId = 3;\n    required string classname = 4;\n    required bytes content = 5;\n    required int64 dataTime = 6;\n    required int64 status = 7;\n    optional int64 extra = 8;\n    optional string msgId = 9;\n    optional int32 direction = 10;\n    optional int32 plantform =11;\n    optional int32 isRemoved = 12;\n    optional string source = 13;\n    optional int64 clientUniqueId = 14;\n    optional string extraContent = 15;\n    optional string pushContent = 16;\n    optional int32 configFlag = 17;\n    optional PushExtra pushExt = 18;\n  }\n  enum ChannelType {\n    PERSON = 1;\n    PERSONS = 2;\n    GROUP = 3;\n    TEMPGROUP = 4;\n    CUSTOMERSERVICE = 5;\n    NOTIFY = 6;\n    MC=7;\n    MP=8;\n  }\n  message CreateDiscussionInput {\n    optional string name = 1;\n  }\n  message CreateDiscussionOutput {\n    required string id = 1;\n  }\n  message ChannelInvitationInput {\n    repeated string users = 1;\n  }\n  message LeaveChannelInput {\n    required int32 nothing = 1;\n  }\n  message ChannelEvictionInput {\n    required string user = 1;\n  }\n  message RenameChannelInput {\n    required string name = 1;\n  }\n  message ChannelInfoInput {\n    required int32 nothing = 1;\n  }\n  message ChannelInfoOutput {\n    required ChannelType type = 1;\n    required string channelId = 2;\n    required string channelName = 3;\n    required string adminUserId = 4;\n    repeated string firstTenUserIds = 5;\n    required int32 openStatus = 6;\n  }\n  message ChannelInfosInput {\n    required int32 page = 1;\n    optional int32 number = 2;\n  }\n  message ChannelInfosOutput {\n    repeated ChannelInfoOutput channels = 1;\n    required int32 total = 2;\n  }\n  message MemberInfo {\n    required string userId = 1;\n    required string userName = 2;\n    required string userPortrait = 3;\n    required string extension = 4;\n  }\n  message GroupMembersInput {\n    required int32 page = 1;\n    optional int32 number = 2;\n  }\n  message GroupMembersOutput {\n    repeated MemberInfo members = 1;\n    required int32 total = 2;\n  }\n  message GetUserInfoInput {\n    required int32 nothing = 1;\n  }\n  message GetUserInfoOutput {\n    required string userId = 1;\n    required string userName = 2;\n    required string userPortrait = 3;\n  }\n  message GetSessionIdInput {\n    required int32 nothing = 1;\n  }\n  message GetSessionIdOutput {\n    required int32 sessionId = 1;\n  }\n  enum FileType {\n    image = " + W.IMAGE + ";\n    audio = " + W.AUDIO + ";\n    video = " + W.VIDEO + ";\n    file = " + W.FILE + ";\n  }\n  message " + ln + " {\n    required FileType type = 1;\n    optional string key = 2;\n    optional string httpMethod = 3;\n    optional string queryString = 4;\n  }\n  message " + dn + " {\n    required FileType type = 1;\n    required string key = 2;\n    optional string  fileName = 3;\n  }\n  message " + pn + " {\n    required FileType type = 1;\n    required string key = 2;\n    optional string fileName = 3;\n   }\n  message " + fn + " {\n    required int64 deadline = 1;\n    required string token = 2;\n    optional string bosToken = 3;\n    optional string bosDate = 4;\n    optional string path = 5;\n    optional string osskeyId = 6;\n    optional string ossPolicy = 7;\n    optional string ossSign = 8;\n    optional string ossBucketName = 9;\n    optional string s3Credential = 10;\n    optional string s3Algorithm = 11;\n    optional string s3Date = 12;\n    optional string s3Policy = 13;\n    optional string s3Signature = 14;\n    optional string s3BucketName = 15;\n    optional string stcAuthorization = 16;\n    optional string stcContentSha256 = 17;\n    optional string stcDate = 18;\n    optional string stcBucketName = 19;\n  }\n  message " + gn + " {\n    required string downloadUrl = 1;\n  }\n  message " + _n + " {\n    required string downloadUrl = 1;\n  }\n  message Add2BlackListInput {\n    required string userId = 1;\n  }\n  message RemoveFromBlackListInput {\n    required string userId = 1;\n  }\n  message QueryBlackListInput {\n    required int32 nothing = 1;\n  }\n  message QueryBlackListOutput {\n    repeated string userIds = 1;\n  }\n  message BlackListStatusInput {\n    required string userId = 1;\n  }\n  message BlockPushInput {\n    required string blockeeId = 1;\n  }\n  message ModifyPermissionInput {\n    required int32 openStatus = 1;\n  }\n  message GroupInput {\n    repeated GroupInfo groupInfo = 1;\n  }\n  message GroupOutput {\n    required int32 nothing = 1;\n  }\n  message GroupInfo {\n    required string id = 1;\n    required string name = 2;\n  }\n  message GroupHashInput {\n    required string userId = 1;\n    required string groupHashCode = 2;\n  }\n  message GroupHashOutput {\n    required GroupHashType result = 1;\n  }\n  enum GroupHashType {\n    group_success = 0x00;\n    group_failure = 0x01;\n  }\n  message " + Ht + " {\n    required int32 nothing = 1;\n  }\n  message " + Gt + " {\n    required int32 nothing = 1;\n    optional string sessionId = 2;\n    optional int64 joinTime = 3;\n  }\n  message " + At + " {\n    required int64 syncTime = 1;\n    required int32 count = 2;\n  }\n\n  message ChrmPullMsgNew\n  {\n    required int32 count = 1;\n    required int64 syncTime = 2;\n    optional string chrmId=3;\n  }\n  message " + Dt + "\n  {\n    optional ChannelType type = 1;\n    optional int32 count = 2;\n    optional int64 startTime = 3;\n    optional int32 order = 4;\n  }\n  message " + Ft + "\n  {\n    required ChannelType type = 1;\n    optional DownStreamMessage msg =2;\n    optional int32 count = 3;\n    optional int32 offset = 4;\n    optional int64 startTime = 5;\n    optional int64 endTime = 6;\n  }\n  message " + Vt + "\n  {\n    repeated RelationInfo info = 1;\n  }\n  message RelationInfo\n  {\n    required ChannelType type = 1;\n    required string userId = 2;\n    optional DownStreamMessage msg =3;\n    optional int64 readMsgTime= 4;\n    optional int64 unreadCount= 5;\n    optional string channelId = 6;\n  }\n  message RelationInfoReadTime\n  {\n    required ChannelType type = 1;\n    required int64 readMsgTime= 2;\n    required string targetId = 3;\n  }\n  message " + Yt + "\n  {\n      required string targetId = 1;\n      required int64 dataTime = 2;\n      optional int32 conversationType= 3;\n  }\n  message HistoryMessageInput\n  {\n    required string targetId = 1;\n    required int64 dataTime =2;\n    required int32 size  = 3;\n  }\n\n  message HistoryMessagesOuput\n  {\n    repeated DownStreamMessage list = 1;\n    required int64 syncTime = 2;\n    required int32 hasMsg = 3;\n  }\n  message " + jt + "\n  {\n    required int32 count= 1;\n    optional int32 order= 2;\n  }\n\n  message " + Qt + "\n  {\n    optional int32 userTotalNums = 1;\n    repeated ChrmMember userInfos = 2;\n  }\n  message ChrmMember\n  {\n    required int64 time = 1;\n    required string id = 2;\n  }\n  message MPFollowInput\n  {\n    required string id = 1;\n  }\n\n  message MPFollowOutput\n  {\n    required int32 nothing = 1;\n    optional MpInfo info =2;\n  }\n\n  message " + tn + "\n  {\n    required string state = 1;\n  }\n\n  message MCFollowOutput\n  {\n    required int32 nothing = 1;\n    optional MpInfo info =2;\n  }\n\n  message MpInfo\n  {\n    required string mpid=1;\n    required string name = 2;\n    required string type = 3;\n    required int64 time=4;\n    optional string portraitUrl=5;\n    optional string extra =6;\n  }\n\n  message SearchMpInput\n  {\n    required int32 type=1;\n    required string id=2;\n  }\n\n  message SearchMpOutput\n  {\n    required int32 nothing=1;\n    repeated MpInfo info = 2;\n  }\n\n  message PullMpInput\n  {\n    required int64 time=1;\n    required string mpid=2;\n  }\n\n  message PullMpOutput\n  {\n    required int32 status=1;\n    repeated MpInfo info = 2;\n  }\n  message " + Lt + "\n  {\n    optional string targetId = 1;\n    optional int64 time = 2;\n    optional int32 count  = 3;\n    optional int32 order = 4;\n  }\n\n  message " + Pt + "\n  {\n    repeated DownStreamMessage list=1;\n    required int64 syncTime=2;\n    required int32 hasMsg=3;\n  }\n  message " + an + "{\n    optional int32 order=1;\n  }\n\n  message " + hn + "{\n    repeated string key=1;\n  }\n\n  message " + cn + "{\n    required string key=1;\n    required string value=2;\n  }\n\n  message RtcUserInfo{\n    required string userId=1;\n    repeated " + cn + " userData=2; //用户资源信息\n  }\n\n  message " + Wt + "{\n    repeated RtcUserInfo users=1;\n    optional string token=2;\n    optional string sessionId=3;\n    repeated RtcValueInfo roomInfo = 4; //房间key value\n  }\n  message RtcRoomInfoOutput{\n    optional string roomId = 1;\n    repeated " + cn + " roomData = 2;\n    optional int32 userCount = 3;\n    repeated RtcUserInfo list=4;\n  }\n  message " + Jt + "{\n    required int32 roomType=1;\n    optional int32 broadcastType=2;\n    optional RtcValueInfo extraInnerData = 3;\n    optional bool needSysChatroom = 4; //是否需要同步聊天室\n    optional IdentityChangeType identityChangeType = 5; //身份变更类型\n    optional JoinType joinType = 6; // 加入房间类型\n  }\n  enum JoinType {\n    KICK = 0; //踢前一个设备\n    REFUSE = 1; //当前加入拒绝\n    COEXIST = 2; //两个设备共存\n  }\n  message RtcQryInput{\n    required bool isInterior=1;\n    required targetType target=2;\n    repeated string key=3;\n  }\n  message " + rn + "{\n    repeated " + cn + " outInfo=1;\n  }\n  message RtcDelDataInput{\n    repeated string key=1;\n    required bool isInterior=2;\n    required targetType target=3;\n  }\n  message " + $t + "{\n    required bool interior=1;\n    required targetType target=2;\n    repeated string key=3;\n    optional string objectName=4;\n    optional string content=5;\n  }\n  message " + Zt + "{\n    required bool interior=1;\n    required targetType target=2;\n    required string key=3;\n    required string value=4;\n    optional string objectName=5;\n    optional string content=6;\n  }\n  message " + Xt + " {\n    repeated " + cn + " valueInfo = 1;\n    required string objectName = 2;\n    repeated " + cn + " content = 3;\n  }\n  message RtcOutput\n  {\n    optional int32 nothing=1;\n  }\n  message " + nn + "{\n    required string rtcToken=1;\n  }\n  enum targetType {\n    ROOM =1 ;\n    PERSON = 2;\n  }\n  message " + en + "{\n    required targetType target=1;\n    repeated " + cn + " valueInfo=2;\n    optional string objectName=3;\n    optional string content=4;\n  }\n  message " + sn + "{\n    repeated string userId = 1;\n  }\n  message " + on + "{\n    repeated RtcUserInfo user = 1;\n  }\n  message " + wt + "{\n    required int32 nothing = 1;\n  }\n  message " + bt + "{\n    required int64 inboxTime = 1;\n    required int64 sendboxTime = 2;\n    required int64 totalUnreadCount = 3;\n  }\n  message " + Kt + "\n  {\n    required ChannelType type = 1;\n    required int64 msgTime = 2;\n    required string channelId = 3;\n  }\n  message SessionMsgReadOutput\n  {\n    optional int32 nothing=1;\n  }\n  message " + kt + "\n  {\n    repeated SessionInfo sessions = 1;\n  }\n  message " + xt + "\n  {\n    required ChannelType type = 1;\n    required string channelId = 2;\n  }\n  message " + Bt + "\n  {\n    optional int32 nothing=1;\n  }\n  message " + qt + "\n  {\n    optional ChannelType type = 1;\n    optional string conversationId = 2;\n    repeated DeleteMsg msgs = 3;\n  }\n  message DeleteMsg\n  {\n    optional string msgId = 1;\n    optional int64 msgDataTime = 2;\n    optional int32 direct = 3;\n  }\n  message ChrmKVEntity {\n    required string key = 1;\n    required string value = 2;\n    optional int32 status = 3;\n    optional int64 timestamp = 4;\n    optional string uid = 5;\n  }\n  message " + yn + " {\n    required ChrmKVEntity entry = 1;\n    optional bool bNotify = 2;\n    optional UpStreamMessage notification = 3;\n    optional ChannelType type = 4;\n  }\n  message " + En + " {\n    repeated ChrmKVEntity entry = 1;\n    optional bool bNotify = 2;\n    optional UpStreamMessage notification = 3;\n    optional ChannelType type = 4;\n  }\n  message " + mn + " {\n    repeated ChrmKVEntity entry = 1;\n    optional bool bNotify = 2;\n    optional UpStreamMessage notification = 3;\n    optional ChannelType type = 4;\n  }\n  message " + vn + " {\n    repeated ChrmKVEntity entries = 1;\n    optional bool bFullUpdate = 2;\n    optional int64 syncTime = 3;\n  }\n  message " + Tn + " {\n    repeated ChrmKVSOutputEntity errorKeys = 1;\n  }\n  message " + In + "\n  {\n    optional string key = 1;\n    optional int32 errorCode = 2;\n  }\n  message " + Cn + " {\n    required int64 timestamp = 1;\n  }\n  message " + Rn + " {\n    required int64 version=1;\n    required string value=2;\n  }\n  message " + Sn + " {\n    required int64 version=1;\n    required bool reserve=2;\n  }\n  message " + Nn + " {\n    required int64 version=1;\n    optional bool reserve=2;\n  }\n  message " + On + " {\n    repeated UserSettingItem items = 1;\n    required int64 version=2;\n  }\n  message UserSettingItem {\n    required string targetId= 1;\n    required ChannelType type = 2;\n    required string key = 4;\n    required bytes value = 5;\n    required int64 version=6;\n    required int32 status=7;\n    repeated SessionTagItem tags= 8;\n  }\n  message " + bn + " {\n    required int64 time = 1;\n  }\n  message " + Mn + " {\n    required int64 version=1;\n    repeated SessionState state= 2;\n  }\n  message " + An + " {\n    required ChannelType type = 1;\n    required string channelId = 2;\n    optional int64 time = 3;\n    repeated SessionStateItem stateItem = 4;\n  }\n  message " + Un + " {\n    required SessionStateType sessionStateType = 1;\n    required string value = 2;\n    repeated SessionTagItem tags = 3;\n  }\n  enum SessionStateType {\n    IsSilent = 1;\n    IsTop = 2;\n    Tags = 3;\n  }\n  message " + Ln + " {\n    required int64 version=1;\n    repeated SessionState state= 2;\n  }\n  message " + Pn + " {\n    required int64 version=1;\n  }\n  message " + Dn + " {\n    repeated string msgId=1; //已读消息ID\n    optional string busChannel = 2; // 该消息所属会话的业务标识\n  }\n  message " + Vn + " {\n    repeated string msgId=1; //已读消息ID\n    optional string busChannel = 2; // 该消息所属会话的业务标识\n  }\n  message " + kn + " {\n    required int32 totalMemberNum = 1;//群内总人数\n    repeated GrpMsgReadUser list = 2;//已读用户列表（list复类型）\n  }\n  message " + xn + " {\n    required int64 readTime = 1;//已读时间\n    required string userId = 2;//已读用户id\n  }\n  message " + Bn + " {\n    required int64 version=1;\n    repeated SessionTagItem tags=2;\n  }\n  message " + Fn + " {\n    required string tagId=1;\n    optional string name=2;\n    optional int64 createdTime=3;\n    optional bool isTop=4;\n  }\n  message " + qn + " {\n    required int64 version=1;\n    repeated SessionTagItem tags=2;\n  }\n  message " + Yn + " {\n    repeated string tagId=1;\n  }\n  message " + wn + " {\n    required int64 version=1;\n    required bool reserve=2;\n  }\n  message " + Kn + ' {\n    required string sdkInfo=1; // 用户集成的 sdk 信息,json 格式 {"web-rtc": "4.0.3.7"}\n  }\n  message ' + Hn + "\n  {\n    optional int32 nothing=1; //占位\n  }\n  message " + Gn + " \n  {\n    required int32 type= 1;   //(通知类型 1:rtc房间状态KV变更通知)\n    optional int64 time= 2;   //消息产生时间\n    optional string roomId=3; //主播房间id\n  }\n  message " + jn + "\n  {\n    required int64 timestamp = 1;\n    required string roomId = 2;\n  }\n  message " + Qn + "\n  {\n    repeated RtcKVEntity entries = 1;\n    optional bool bFullUpdate = 2;\n    optional int64 syncTime = 3; \n  }\n  message RtcKVEntity \n  {\n    required string key = 1;\n    required string value = 2;\n    optional int32 status = 3;\n    optional int64 timestamp = 4;\n    optional string uid = 5;\n  }\n  enum IdentityChangeType \n  {\n    AnchorToViewer = 1; //1为主播变观众\n    ViewerToAnchor = 2; //2为观众变主播\n  }\n  message " + Jn + "\n  {\n    required string userId = 1;\n  }\n  message " + Wn + "\n  {\n    repeated RtcJoinedInfo info = 1;\n  }\n  message RtcJoinedInfo\n  {\n    required string deviceId = 1; //设备ID\n    required string roomId = 2;   //加入的房间ID\n    optional int64 joinTime = 3;  //加入的时间\n  }\n}\n";var ti,ni,ii,ri,si,oi = (ti = ei, function (e, t) {var n,i,r = {};return r.ByteBuffer = e, r.c = e, n = e, r.Long = t || null, r.VERSION = "5.0.1", r.WIRE_TYPES = {}, r.WIRE_TYPES.VARINT = 0, r.WIRE_TYPES.BITS64 = 1, r.WIRE_TYPES.LDELIM = 2, r.WIRE_TYPES.STARTGROUP = 3, r.WIRE_TYPES.ENDGROUP = 4, r.WIRE_TYPES.BITS32 = 5, r.PACKABLE_WIRE_TYPES = [r.WIRE_TYPES.VARINT, r.WIRE_TYPES.BITS64, r.WIRE_TYPES.BITS32], r.TYPES = { int32: { name: "int32", wireType: r.WIRE_TYPES.VARINT, defaultValue: 0 }, uint32: { name: "uint32", wireType: r.WIRE_TYPES.VARINT, defaultValue: 0 }, sint32: { name: "sint32", wireType: r.WIRE_TYPES.VARINT, defaultValue: 0 }, int64: { name: "int64", wireType: r.WIRE_TYPES.VARINT, defaultValue: r.Long ? r.Long.ZERO : void 0 }, uint64: { name: "uint64", wireType: r.WIRE_TYPES.VARINT, defaultValue: r.Long ? r.Long.UZERO : void 0 }, sint64: { name: "sint64", wireType: r.WIRE_TYPES.VARINT, defaultValue: r.Long ? r.Long.ZERO : void 0 }, bool: { name: "bool", wireType: r.WIRE_TYPES.VARINT, defaultValue: !1 }, double: { name: "double", wireType: r.WIRE_TYPES.BITS64, defaultValue: 0 }, string: { name: "string", wireType: r.WIRE_TYPES.LDELIM, defaultValue: "" }, bytes: { name: "bytes", wireType: r.WIRE_TYPES.LDELIM, defaultValue: null }, fixed32: { name: "fixed32", wireType: r.WIRE_TYPES.BITS32, defaultValue: 0 }, sfixed32: { name: "sfixed32", wireType: r.WIRE_TYPES.BITS32, defaultValue: 0 }, fixed64: { name: "fixed64", wireType: r.WIRE_TYPES.BITS64, defaultValue: r.Long ? r.Long.UZERO : void 0 }, sfixed64: { name: "sfixed64", wireType: r.WIRE_TYPES.BITS64, defaultValue: r.Long ? r.Long.ZERO : void 0 }, float: { name: "float", wireType: r.WIRE_TYPES.BITS32, defaultValue: 0 }, enum: { name: "enum", wireType: r.WIRE_TYPES.VARINT, defaultValue: 0 }, message: { name: "message", wireType: r.WIRE_TYPES.LDELIM, defaultValue: null }, group: { name: "group", wireType: r.WIRE_TYPES.STARTGROUP, defaultValue: null } }, r.MAP_KEY_TYPES = [r.TYPES.int32, r.TYPES.sint32, r.TYPES.sfixed32, r.TYPES.uint32, r.TYPES.fixed32, r.TYPES.int64, r.TYPES.sint64, r.TYPES.sfixed64, r.TYPES.uint64, r.TYPES.fixed64, r.TYPES.bool, r.TYPES.string, r.TYPES.bytes], r.ID_MIN = 1, r.ID_MAX = 536870911, r.convertFieldsToCamelCase = !1, r.populateAccessors = !0, r.populateDefaults = !0, r.Util = function () {var e = {};return e.IS_NODE = !("object" != typeof process || process + "" != "[object process]" || process.browser), e.XHR = function () {var e,t = [function () {return new XMLHttpRequest();}, function () {return new ActiveXObject("Msxml2.XMLHTTP");}, function () {return new ActiveXObject("Msxml3.XMLHTTP");}, function () {return new ActiveXObject("Microsoft.XMLHTTP");}],n = null;for (e = 0; e < t.length; e++) {try {n = t[e]();} catch (e) {continue;}break;}if (!n) throw Error("XMLHttpRequest is not supported");return n;}, e.fetch = function (t, n) {if (n && "function" != typeof n && (n = null), e.IS_NODE) {if (n) g.readFile(t, function (e, t) {n(e ? null : "" + t);});else try {return g.readFileSync(t);} catch (e) {return null;}} else {var i = e.XHR();if (i.open("GET", t, !!n), i.setRequestHeader("Accept", "text/plain"), "function" == typeof i.overrideMimeType && i.overrideMimeType("text/plain"), !n) return i.send(null), 200 == i.status || 0 == i.status && "string" == typeof i.responseText ? i.responseText : null;if (i.onreadystatechange = function () {4 == i.readyState && (200 == i.status || 0 == i.status && "string" == typeof i.responseText ? n(i.responseText) : n(null));}, 4 == i.readyState) return;i.send(null);}}, e.toCamelCase = function (e) {return e.replace(/_([a-zA-Z])/g, function (e, t) {return t.toUpperCase();});}, e;}(), r.Lang = { DELIM: /[\s\{\}=;:\[\],'"\(\)<>]/g, RULE: /^(?:required|optional|repeated|map)$/, TYPE: /^(?:double|float|int32|uint32|sint32|int64|uint64|sint64|fixed32|sfixed32|fixed64|sfixed64|bool|string|bytes)$/, NAME: /^[a-zA-Z_][a-zA-Z_0-9]*$/, TYPEDEF: /^[a-zA-Z][a-zA-Z_0-9]*$/, TYPEREF: /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/, FQTYPEREF: /^(?:\.[a-zA-Z][a-zA-Z_0-9]*)+$/, NUMBER: /^-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+|([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?)|inf|nan)$/, NUMBER_DEC: /^(?:[1-9][0-9]*|0)$/, NUMBER_HEX: /^0[xX][0-9a-fA-F]+$/, NUMBER_OCT: /^0[0-7]+$/, NUMBER_FLT: /^([0-9]*(\.[0-9]*)?([Ee][+-]?[0-9]+)?|inf|nan)$/, BOOL: /^(?:true|false)$/i, ID: /^(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/, NEGID: /^\-?(?:[1-9][0-9]*|0|0[xX][0-9a-fA-F]+|0[0-7]+)$/, WHITESPACE: /\s/, STRING: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")|(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g, STRING_DQ: /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g, STRING_SQ: /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g }, r.DotProto = function (e, t) {function n(e, n) {var i = -1,r = 1;if ("-" == e.charAt(0) && (r = -1, e = e.substring(1)), t.NUMBER_DEC.test(e)) i = parseInt(e);else if (t.NUMBER_HEX.test(e)) i = parseInt(e.substring(2), 16);else {if (!t.NUMBER_OCT.test(e)) throw Error("illegal id value: " + (r < 0 ? "-" : "") + e);i = parseInt(e.substring(1), 8);}if (i = 0 | r * i, !n && i < 0) throw Error("illegal id value: " + (r < 0 ? "-" : "") + e);return i;}function i(e) {var n = 1;if ("-" == e.charAt(0) && (n = -1, e = e.substring(1)), t.NUMBER_DEC.test(e)) return n * parseInt(e, 10);if (t.NUMBER_HEX.test(e)) return n * parseInt(e.substring(2), 16);if (t.NUMBER_OCT.test(e)) return n * parseInt(e.substring(1), 8);if ("inf" === e) return 1 / 0 * n;if ("nan" === e) return NaN;if (t.NUMBER_FLT.test(e)) return n * parseFloat(e);throw Error("illegal number value: " + (n < 0 ? "-" : "") + e);}function r(e, t, n) {void 0 === e[t] ? e[t] = n : (Array.isArray(e[t]) || (e[t] = [e[t]]), e[t].push(n));}var s,o,a = {},u = function u(e) {this.source = e + "", this.index = 0, this.line = 1, this.stack = [], this._stringOpen = null;},c = u.prototype;return c._readString = function () {var e,n = '"' === this._stringOpen ? t.STRING_DQ : t.STRING_SQ;if (n.lastIndex = this.index - 1, !(e = n.exec(this.source))) throw Error("unterminated string");return this.index = n.lastIndex, this.stack.push(this._stringOpen), this._stringOpen = null, e[1];}, c.next = function () {var e, n, i, r, s;if (this.stack.length > 0) return this.stack.shift();if (this.index >= this.source.length) return null;if (null !== this._stringOpen) return this._readString();do {for (e = !1; t.WHITESPACE.test(i = this.source.charAt(this.index));) {if ("\n" === i && ++this.line, ++this.index === this.source.length) return null;}if ("/" === this.source.charAt(this.index)) if (++this.index, "/" === this.source.charAt(this.index)) {for (; "\n" !== this.source.charAt(++this.index);) {if (this.index == this.source.length) return null;}++this.index, ++this.line, e = !0;} else {if ("*" !== (i = this.source.charAt(this.index))) return "/";do {if ("\n" === i && ++this.line, ++this.index === this.source.length) return null;n = i, i = this.source.charAt(this.index);} while ("*" !== n || "/" !== i);++this.index, e = !0;}} while (e);if (this.index === this.source.length) return null;if (r = this.index, t.DELIM.lastIndex = 0, !t.DELIM.test(this.source.charAt(r++))) for (; r < this.source.length && !t.DELIM.test(this.source.charAt(r));) {++r;}return ('"' === (s = this.source.substring(this.index, this.index = r)) || "'" === s) && (this._stringOpen = s), s;}, c.peek = function () {if (0 === this.stack.length) {var e = this.next();if (null === e) return null;this.stack.push(e);}return this.stack[0];}, c.skip = function (e) {var t = this.next();if (t !== e) throw Error("illegal '" + t + "', '" + e + "' expected");}, c.omit = function (e) {return this.peek() === e && (this.next(), !0);}, c.toString = function () {return "Tokenizer (" + this.index + "/" + this.source.length + " at line " + this.line + ")";}, a.Tokenizer = u, (o = (s = function s(e) {this.tn = new u(e), this.proto3 = !1;}).prototype).parse = function () {var e,n = { name: "[ROOT]", package: null, messages: [], enums: [], imports: [], options: {}, services: [] },i = !0;try {for (; e = this.tn.next();) {switch (e) {case "package":if (!i || null !== n.package) throw Error("unexpected 'package'");if (e = this.tn.next(), !t.TYPEREF.test(e)) throw Error("illegal package name: " + e);this.tn.skip(";"), n.package = e;break;case "import":if (!i) throw Error("unexpected 'import'");"public" === (e = this.tn.peek()) && this.tn.next(), e = this._readString(), this.tn.skip(";"), n.imports.push(e);break;case "syntax":if (!i) throw Error("unexpected 'syntax'");this.tn.skip("="), "proto3" === (n.syntax = this._readString()) && (this.proto3 = !0), this.tn.skip(";");break;case "message":this._parseMessage(n, null), i = !1;break;case "enum":this._parseEnum(n), i = !1;break;case "option":this._parseOption(n);break;case "service":this._parseService(n);break;case "extend":this._parseExtend(n);break;default:throw Error("unexpected '" + e + "'");}}} catch (e) {throw e.message = "Parse error at line " + this.tn.line + ": " + e.message, e;}return delete n.name, n;}, s.parse = function (e) {return new s(e).parse();}, o._readString = function () {var e,t,n = "";do {if ("'" !== (t = this.tn.next()) && '"' !== t) throw Error("illegal string delimiter: " + t);n += this.tn.next(), this.tn.skip(t), e = this.tn.peek();} while ('"' === e || '"' === e);return n;}, o._readValue = function (e) {var n = this.tn.peek();if ('"' === n || "'" === n) return this._readString();if (this.tn.next(), t.NUMBER.test(n)) return i(n);if (t.BOOL.test(n)) return "true" === n.toLowerCase();if (e && t.TYPEREF.test(n)) return n;throw Error("illegal value: " + n);}, o._parseOption = function (e, n) {var i,r = this.tn.next(),s = !1;if ("(" === r && (s = !0, r = this.tn.next()), !t.TYPEREF.test(r)) throw Error("illegal option name: " + r);i = r, s && (this.tn.skip(")"), i = "(" + i + ")", r = this.tn.peek(), t.FQTYPEREF.test(r) && (i += r, this.tn.next())), this.tn.skip("="), this._parseOptionValue(e, i), n || this.tn.skip(";");}, o._parseOptionValue = function (e, n) {var i = this.tn.peek();if ("{" !== i) r(e.options, n, this._readValue(!0));else for (this.tn.skip("{"); "}" !== (i = this.tn.next());) {if (!t.NAME.test(i)) throw Error("illegal option name: " + n + "." + i);this.tn.omit(":") ? r(e.options, n + "." + i, this._readValue(!0)) : this._parseOptionValue(e, n + "." + i);}}, o._parseService = function (e) {var n,i = this.tn.next();if (!t.NAME.test(i)) throw Error("illegal service name at line " + this.tn.line + ": " + i);for (n = { name: i, rpc: {}, options: {} }, this.tn.skip("{"); "}" !== (i = this.tn.next());) {if ("option" === i) this._parseOption(n);else {if ("rpc" !== i) throw Error("illegal service token: " + i);this._parseServiceRPC(n);}}this.tn.omit(";"), e.services.push(n);}, o._parseServiceRPC = function (e) {var n,i,r = "rpc",s = this.tn.next();if (!t.NAME.test(s)) throw Error("illegal rpc service method name: " + s);if (n = s, i = { request: null, response: null, request_stream: !1, response_stream: !1, options: {} }, this.tn.skip("("), "stream" === (s = this.tn.next()).toLowerCase() && (i.request_stream = !0, s = this.tn.next()), !t.TYPEREF.test(s)) throw Error("illegal rpc service request type: " + s);if (i.request = s, this.tn.skip(")"), "returns" !== (s = this.tn.next()).toLowerCase()) throw Error("illegal rpc service request type delimiter: " + s);if (this.tn.skip("("), "stream" === (s = this.tn.next()).toLowerCase() && (i.response_stream = !0, s = this.tn.next()), i.response = s, this.tn.skip(")"), "{" === (s = this.tn.peek())) {for (this.tn.next(); "}" !== (s = this.tn.next());) {if ("option" !== s) throw Error("illegal rpc service token: " + s);this._parseOption(i);}this.tn.omit(";");} else this.tn.skip(";");void 0 === e[r] && (e[r] = {}), e[r][n] = i;}, o._parseMessage = function (e, i) {var r = !!i,s = this.tn.next(),o = { name: "", fields: [], enums: [], messages: [], options: {}, services: [], oneofs: {} };if (!t.NAME.test(s)) throw Error("illegal " + (r ? "group" : "message") + " name: " + s);for (o.name = s, r && (this.tn.skip("="), i.id = n(this.tn.next()), o.isGroup = !0), "[" === (s = this.tn.peek()) && i && this._parseFieldOptions(i), this.tn.skip("{"); "}" !== (s = this.tn.next());) {if (t.RULE.test(s)) this._parseMessageField(o, s);else if ("oneof" === s) this._parseMessageOneOf(o);else if ("enum" === s) this._parseEnum(o);else if ("message" === s) this._parseMessage(o);else if ("option" === s) this._parseOption(o);else if ("service" === s) this._parseService(o);else if ("extensions" === s) o.extensions = this._parseExtensionRanges();else if ("reserved" === s) this._parseIgnored();else if ("extend" === s) this._parseExtend(o);else {if (!t.TYPEREF.test(s)) throw Error("illegal message token: " + s);if (!this.proto3) throw Error("illegal field rule: " + s);this._parseMessageField(o, "optional", s);}}return this.tn.omit(";"), e.messages.push(o), o;}, o._parseIgnored = function () {for (; ";" !== this.tn.peek();) {this.tn.next();}this.tn.skip(";");}, o._parseMessageField = function (e, i, r) {var s, o, a;if (!t.RULE.test(i)) throw Error("illegal message field rule: " + i);if (s = { rule: i, type: "", name: "", options: {}, id: 0 }, "map" === i) {if (r) throw Error("illegal type: " + r);if (this.tn.skip("<"), o = this.tn.next(), !t.TYPE.test(o) && !t.TYPEREF.test(o)) throw Error("illegal message field type: " + o);if (s.keytype = o, this.tn.skip(","), o = this.tn.next(), !t.TYPE.test(o) && !t.TYPEREF.test(o)) throw Error("illegal message field: " + o);if (s.type = o, this.tn.skip(">"), o = this.tn.next(), !t.NAME.test(o)) throw Error("illegal message field name: " + o);s.name = o, this.tn.skip("="), s.id = n(this.tn.next()), "[" === (o = this.tn.peek()) && this._parseFieldOptions(s), this.tn.skip(";");} else if ("group" === (r = void 0 !== r ? r : this.tn.next())) {if (a = this._parseMessage(e, s), !/^[A-Z]/.test(a.name)) throw Error("illegal group name: " + a.name);s.type = a.name, s.name = a.name.toLowerCase(), this.tn.omit(";");} else {if (!t.TYPE.test(r) && !t.TYPEREF.test(r)) throw Error("illegal message field type: " + r);if (s.type = r, o = this.tn.next(), !t.NAME.test(o)) throw Error("illegal message field name: " + o);s.name = o, this.tn.skip("="), s.id = n(this.tn.next()), "[" === (o = this.tn.peek()) && this._parseFieldOptions(s), this.tn.skip(";");}return e.fields.push(s), s;}, o._parseMessageOneOf = function (e) {var n,i,r,s = this.tn.next();if (!t.NAME.test(s)) throw Error("illegal oneof name: " + s);for (i = s, r = [], this.tn.skip("{"); "}" !== (s = this.tn.next());) {(n = this._parseMessageField(e, "optional", s)).oneof = i, r.push(n.id);}this.tn.omit(";"), e.oneofs[i] = r;}, o._parseFieldOptions = function (e) {this.tn.skip("[");for (var t = !0; "]" !== this.tn.peek();) {t || this.tn.skip(","), this._parseOption(e, !0), t = !1;}this.tn.next();}, o._parseEnum = function (e) {var i,r = { name: "", values: [], options: {} },s = this.tn.next();if (!t.NAME.test(s)) throw Error("illegal name: " + s);for (r.name = s, this.tn.skip("{"); "}" !== (s = this.tn.next());) {if ("option" === s) this._parseOption(r);else {if (!t.NAME.test(s)) throw Error("illegal name: " + s);this.tn.skip("="), i = { name: s, id: n(this.tn.next(), !0) }, "[" === (s = this.tn.peek()) && this._parseFieldOptions({ options: {} }), this.tn.skip(";"), r.values.push(i);}}this.tn.omit(";"), e.enums.push(r);}, o._parseExtensionRanges = function () {var t,n,r,s = [];do {for (n = [];;) {switch (t = this.tn.next()) {case "min":r = e.ID_MIN;break;case "max":r = e.ID_MAX;break;default:r = i(t);}if (n.push(r), 2 === n.length) break;if ("to" !== this.tn.peek()) {n.push(r);break;}this.tn.next();}s.push(n);} while (this.tn.omit(","));return this.tn.skip(";"), s;}, o._parseExtend = function (e) {var n,i = this.tn.next();if (!t.TYPEREF.test(i)) throw Error("illegal extend reference: " + i);for (n = { ref: i, fields: [] }, this.tn.skip("{"); "}" !== (i = this.tn.next());) {if (t.RULE.test(i)) this._parseMessageField(n, i);else {if (!t.TYPEREF.test(i)) throw Error("illegal extend token: " + i);if (!this.proto3) throw Error("illegal field rule: " + i);this._parseMessageField(n, "optional", i);}}return this.tn.omit(";"), e.messages.push(n), n;}, o.toString = function () {return "Parser at line " + this.tn.line;}, a.Parser = s, a;}(r, r.Lang), r.Reflect = function (t) {function i(e, n) {if (e && "number" == typeof e.low && "number" == typeof e.high && "boolean" == typeof e.unsigned && e.low == e.low && e.high == e.high) return new t.Long(e.low, e.high, void 0 === n ? e.unsigned : n);if ("string" == typeof e) return t.Long.fromString(e, n || !1, 10);if ("number" == typeof e) return t.Long.fromNumber(e, n || !1);throw Error("not convertible to Long");}function r(e, n) {var i = n.readVarint32(),s = 7 & i,o = i >>> 3;switch (s) {case t.WIRE_TYPES.VARINT:do {i = n.readUint8();} while (128 == (128 & i));break;case t.WIRE_TYPES.BITS64:n.offset += 8;break;case t.WIRE_TYPES.LDELIM:i = n.readVarint32(), n.offset += i;break;case t.WIRE_TYPES.STARTGROUP:r(o, n);break;case t.WIRE_TYPES.ENDGROUP:if (o === e) return !1;throw Error("Illegal GROUPEND after unknown group: " + o + " (" + e + " expected)");case t.WIRE_TYPES.BITS32:n.offset += 4;break;default:throw Error("Illegal wire type in unknown group " + e + ": " + s);}return !0;}var s,o,a,u,c,h,l,f,d,p,g,_,y,E,m,v,T = {},I = function I(e, t, n) {this.builder = e, this.parent = t, this.name = n, this.className;},C = I.prototype;return C.fqn = function () {for (var e = this.name, t = this; null != (t = t.parent);) {e = t.name + "." + e;}return e;}, C.toString = function (e) {return (e ? this.className + " " : "") + this.fqn();}, C.build = function () {throw Error(this.toString(!0) + " cannot be built directly");}, T.T = I, (o = (s = function s(e, t, n, i, r) {I.call(this, e, t, n), this.className = "Namespace", this.children = [], this.options = i || {}, this.syntax = r || "proto2";}).prototype = Object.create(I.prototype)).getChildren = function (e) {var t, n, i;if (null == (e = e || null)) return this.children.slice();for (t = [], n = 0, i = this.children.length; i > n; ++n) {this.children[n] instanceof e && t.push(this.children[n]);}return t;}, o.addChild = function (e) {var t;if (t = this.getChild(e.name)) if (t instanceof c.Field && t.name !== t.originalName && null === this.getChild(t.originalName)) t.name = t.originalName;else {if (!(e instanceof c.Field && e.name !== e.originalName && null === this.getChild(e.originalName))) throw Error("Duplicate name in namespace " + this.toString(!0) + ": " + e.name);e.name = e.originalName;}this.children.push(e);}, o.getChild = function (e) {var t,n,i = "number" == typeof e ? "id" : "name";for (t = 0, n = this.children.length; n > t; ++t) {if (this.children[t][i] === e) return this.children[t];}return null;}, o.resolve = function (e, t) {var n,i = "string" == typeof e ? e.split(".") : e,r = this,s = 0;if ("" === i[s]) {for (; null !== r.parent;) {r = r.parent;}s++;}do {do {if (!(r instanceof T.Namespace)) {r = null;break;}if (!((n = r.getChild(i[s])) && n instanceof T.T && (!t || n instanceof T.Namespace))) {r = null;break;}r = n, s++;} while (s < i.length);if (null != r) break;if (null !== this.parent) return this.parent.resolve(e, t);} while (null != r);return r;}, o.qn = function (e) {var t,n,i = [],r = e;do {i.unshift(r.name), r = r.parent;} while (null !== r);for (t = 1; t <= i.length; t++) {if (n = i.slice(i.length - t), e === this.resolve(n, e instanceof T.Namespace)) return n.join(".");}return e.fqn();}, o.build = function () {var e,t,n,i = {},r = this.children;for (t = 0, n = r.length; n > t; ++t) {(e = r[t]) instanceof s && (i[e.name] = e.build());}return Object.defineProperty && Object.defineProperty(i, "$options", { value: this.buildOpt() }), i;}, o.buildOpt = function () {var e,t,n,i,r = {},s = Object.keys(this.options);for (e = 0, t = s.length; t > e; ++e) {n = s[e], i = this.options[s[e]], r[n] = i;}return r;}, o.getOption = function (e) {return void 0 === e ? this.options : void 0 !== this.options[e] ? this.options[e] : null;}, T.Namespace = s, u = (a = function a(e, n, i, r) {if (this.type = e, this.resolvedType = n, this.isMapKey = i, this.syntax = r, i && t.MAP_KEY_TYPES.indexOf(e) < 0) throw Error("Invalid map key type: " + e.name);}).prototype, a.defaultFieldValue = function (e) {if ("string" == typeof e && (e = t.TYPES[e]), void 0 === e.defaultValue) throw Error("default value for type " + e.name + " is not supported");return e == t.TYPES.bytes ? new n(0) : e.defaultValue;}, u.verifyValue = function (n) {var r,s,o,a = function (e, t) {throw Error("Illegal value for " + this.toString(!0) + " of type " + this.type.name + ": " + e + " (" + t + ")");}.bind(this);switch (this.type) {case t.TYPES.int32:case t.TYPES.sint32:case t.TYPES.sfixed32:return ("number" != typeof n || n == n && n % 1 != 0) && a(typeof n, "not an integer"), n > 4294967295 ? 0 | n : n;case t.TYPES.uint32:case t.TYPES.fixed32:return ("number" != typeof n || n == n && n % 1 != 0) && a(typeof n, "not an integer"), n < 0 ? n >>> 0 : n;case t.TYPES.int64:case t.TYPES.sint64:case t.TYPES.sfixed64:if (t.Long) try {return i(n, !1);} catch (e) {a(typeof n, e.message);} else a(typeof n, "requires Long.js");case t.TYPES.uint64:case t.TYPES.fixed64:if (t.Long) try {return i(n, !0);} catch (e) {a(typeof n, e.message);} else a(typeof n, "requires Long.js");case t.TYPES.bool:return "boolean" != typeof n && a(typeof n, "not a boolean"), n;case t.TYPES.float:case t.TYPES.double:return "number" != typeof n && a(typeof n, "not a number"), n;case t.TYPES.string:return "string" == typeof n || n && n instanceof String || a(typeof n, "not a string"), "" + n;case t.TYPES.bytes:return e.isByteBuffer(n) ? n : e.wrap(n);case t.TYPES.enum:for (r = this.resolvedType.getChildren(t.Reflect.Enum.Value), o = 0; o < r.length; o++) {if (r[o].name == n) return r[o].id;if (r[o].id == n) return r[o].id;}if ("proto3" === this.syntax) return ("number" != typeof n || n == n && n % 1 != 0) && a(typeof n, "not an integer"), (n > 4294967295 || n < 0) && a(typeof n, "not in range for uint32"), n;a(n, "not a valid enum value");case t.TYPES.group:case t.TYPES.message:if (n && "object" == typeof n || a(typeof n, "object expected"), n instanceof this.resolvedType.clazz) return n;if (n instanceof t.Builder.Message) {for (o in s = {}, n) {n.hasOwnProperty(o) && (s[o] = n[o]);}n = s;}return new this.resolvedType.clazz(n);}throw Error("[INTERNAL] Illegal value for " + this.toString(!0) + ": " + n + " (undefined type " + this.type + ")");}, u.calculateLength = function (e, i) {if (null === i) return 0;var r;switch (this.type) {case t.TYPES.int32:return i < 0 ? n.calculateVarint64(i) : n.calculateVarint32(i);case t.TYPES.uint32:return n.calculateVarint32(i);case t.TYPES.sint32:return n.calculateVarint32(n.zigZagEncode32(i));case t.TYPES.fixed32:case t.TYPES.sfixed32:case t.TYPES.float:return 4;case t.TYPES.int64:case t.TYPES.uint64:return n.calculateVarint64(i);case t.TYPES.sint64:return n.calculateVarint64(n.zigZagEncode64(i));case t.TYPES.fixed64:case t.TYPES.sfixed64:return 8;case t.TYPES.bool:return 1;case t.TYPES.enum:return n.calculateVarint32(i);case t.TYPES.double:return 8;case t.TYPES.string:return r = n.calculateUTF8Bytes(i), n.calculateVarint32(r) + r;case t.TYPES.bytes:if (i.remaining() < 0) throw Error("Illegal value for " + this.toString(!0) + ": " + i.remaining() + " bytes remaining");return n.calculateVarint32(i.remaining()) + i.remaining();case t.TYPES.message:return r = this.resolvedType.calculate(i), n.calculateVarint32(r) + r;case t.TYPES.group:return (r = this.resolvedType.calculate(i)) + n.calculateVarint32(e << 3 | t.WIRE_TYPES.ENDGROUP);}throw Error("[INTERNAL] Illegal value to encode in " + this.toString(!0) + ": " + i + " (unknown type)");}, u.encodeValue = function (e, i, r) {var s, o;if (null === i) return r;switch (this.type) {case t.TYPES.int32:i < 0 ? r.writeVarint64(i) : r.writeVarint32(i);break;case t.TYPES.uint32:r.writeVarint32(i);break;case t.TYPES.sint32:r.writeVarint32ZigZag(i);break;case t.TYPES.fixed32:r.writeUint32(i);break;case t.TYPES.sfixed32:r.writeInt32(i);break;case t.TYPES.int64:case t.TYPES.uint64:r.writeVarint64(i);break;case t.TYPES.sint64:r.writeVarint64ZigZag(i);break;case t.TYPES.fixed64:r.writeUint64(i);break;case t.TYPES.sfixed64:r.writeInt64(i);break;case t.TYPES.bool:"string" == typeof i ? r.writeVarint32("false" === i.toLowerCase() ? 0 : !!i) : r.writeVarint32(i ? 1 : 0);break;case t.TYPES.enum:r.writeVarint32(i);break;case t.TYPES.float:r.writeFloat32(i);break;case t.TYPES.double:r.writeFloat64(i);break;case t.TYPES.string:r.writeVString(i);break;case t.TYPES.bytes:if (i.remaining() < 0) throw Error("Illegal value for " + this.toString(!0) + ": " + i.remaining() + " bytes remaining");s = i.offset, r.writeVarint32(i.remaining()), r.append(i), i.offset = s;break;case t.TYPES.message:o = new n().LE(), this.resolvedType.encode(i, o), r.writeVarint32(o.offset), r.append(o.flip());break;case t.TYPES.group:this.resolvedType.encode(i, r), r.writeVarint32(e << 3 | t.WIRE_TYPES.ENDGROUP);break;default:throw Error("[INTERNAL] Illegal value to encode in " + this.toString(!0) + ": " + i + " (unknown type)");}return r;}, u.decode = function (e, n, i) {if (n != this.type.wireType) throw Error("Unexpected wire type for element");var r, s;switch (this.type) {case t.TYPES.int32:return 0 | e.readVarint32();case t.TYPES.uint32:return e.readVarint32() >>> 0;case t.TYPES.sint32:return 0 | e.readVarint32ZigZag();case t.TYPES.fixed32:return e.readUint32() >>> 0;case t.TYPES.sfixed32:return 0 | e.readInt32();case t.TYPES.int64:return e.readVarint64();case t.TYPES.uint64:return e.readVarint64().toUnsigned();case t.TYPES.sint64:return e.readVarint64ZigZag();case t.TYPES.fixed64:return e.readUint64();case t.TYPES.sfixed64:return e.readInt64();case t.TYPES.bool:return !!e.readVarint32();case t.TYPES.enum:return e.readVarint32();case t.TYPES.float:return e.readFloat();case t.TYPES.double:return e.readDouble();case t.TYPES.string:return e.readVString();case t.TYPES.bytes:if (s = e.readVarint32(), e.remaining() < s) throw Error("Illegal number of bytes for " + this.toString(!0) + ": " + s + " required but got only " + e.remaining());return (r = e.clone()).limit = r.offset + s, e.offset += s, r;case t.TYPES.message:return s = e.readVarint32(), this.resolvedType.decode(e, s);case t.TYPES.group:return this.resolvedType.decode(e, -1, i);}throw Error("[INTERNAL] Illegal decode type");}, u.valueFromString = function (e) {if (!this.isMapKey) throw Error("valueFromString() called on non-map-key element");switch (this.type) {case t.TYPES.int32:case t.TYPES.sint32:case t.TYPES.sfixed32:case t.TYPES.uint32:case t.TYPES.fixed32:return this.verifyValue(parseInt(e));case t.TYPES.int64:case t.TYPES.sint64:case t.TYPES.sfixed64:case t.TYPES.uint64:case t.TYPES.fixed64:return this.verifyValue(e);case t.TYPES.bool:return "true" === e;case t.TYPES.string:return this.verifyValue(e);case t.TYPES.bytes:return n.fromBinary(e);}}, u.valueToString = function (e) {if (!this.isMapKey) throw Error("valueToString() called on non-map-key element");return this.type === t.TYPES.bytes ? e.toString("binary") : e.toString();}, T.Element = a, (h = (c = function c(e, t, n, i, r, o) {s.call(this, e, t, n, i, o), this.className = "Message", this.extensions = void 0, this.clazz = null, this.isGroup = !!r, this._fields = null, this._fieldsById = null, this._fieldsByName = null;}).prototype = Object.create(s.prototype)).build = function (i) {var r, s, o, a;if (this.clazz && !i) return this.clazz;for (r = function (t, i) {function r(e, i, s, o) {var a, u, c, h, l, f, d;if (null === e || "object" != typeof e) return o && o instanceof t.Reflect.Enum && null !== (a = t.Reflect.Enum.getName(o.object, e)) ? a : e;if (n.isByteBuffer(e)) return i ? e.toBase64() : e.toBuffer();if (t.Long.isLong(e)) return s ? e.toString() : t.Long.fromValue(e);if (Array.isArray(e)) return u = [], e.forEach(function (e, t) {u[t] = r(e, i, s, o);}), u;if (u = {}, e instanceof t.Map) {for (h = (c = e.entries()).next(); !h.done; h = c.next()) {u[e.keyElem.valueToString(h.value[0])] = r(h.value[1], i, s, e.valueElem.resolvedType);}return u;}for (d in l = e.$type, f = void 0, e) {e.hasOwnProperty(d) && (u[d] = l && (f = l.getChild(d)) ? r(e[d], i, s, f.resolvedType) : r(e[d], i, s));}return u;}var s,o,a = i.getChildren(t.Reflect.Message.Field),u = i.getChildren(t.Reflect.Message.OneOf),c = function c(e) {var r, s, o, h;for (t.Builder.Message.call(this), r = 0, s = u.length; s > r; ++r) {this[u[r].name] = null;}for (r = 0, s = a.length; s > r; ++r) {this[(o = a[r]).name] = o.repeated ? [] : o.map ? new t.Map(o) : null, !o.required && "proto3" !== i.syntax || null === o.defaultValue || (this[o.name] = o.defaultValue);}if (arguments.length > 0) if (1 !== arguments.length || null === e || "object" != typeof e || !("function" != typeof e.encode || e instanceof c) || Array.isArray(e) || e instanceof t.Map || n.isByteBuffer(e) || e instanceof ArrayBuffer || t.Long && e instanceof t.Long) for (r = 0, s = arguments.length; s > r; ++r) {void 0 !== (h = arguments[r]) && this.$set(a[r].name, h);} else this.$set(e);},h = c.prototype = Object.create(t.Builder.Message.prototype);for (h.add = function (e, n, r) {var s = i._fieldsByName[e];if (!r) {if (!s) throw Error(this + "#" + e + " is undefined");if (!(s instanceof t.Reflect.Message.Field)) throw Error(this + "#" + e + " is not a field: " + s.toString(!0));if (!s.repeated) throw Error(this + "#" + e + " is not a repeated field");n = s.verifyValue(n, !0);}return null === this[e] && (this[e] = []), this[e].push(n), this;}, h.$add = h.add, h.set = function (e, n, r) {var s, o, a;if (e && "object" == typeof e) {for (s in r = n, e) {e.hasOwnProperty(s) && void 0 !== (n = e[s]) && this.$set(s, n, r);}return this;}if (o = i._fieldsByName[e], r) this[e] = n;else {if (!o) throw Error(this + "#" + e + " is not a field: undefined");if (!(o instanceof t.Reflect.Message.Field)) throw Error(this + "#" + e + " is not a field: " + o.toString(!0));this[o.name] = n = o.verifyValue(n);}return o && o.oneof && (a = this[o.oneof.name], null !== n ? (null !== a && a !== o.name && (this[a] = null), this[o.oneof.name] = o.name) : a === e && (this[o.oneof.name] = null)), this;}, h.$set = h.set, h.get = function (e, n) {if (n) return this[e];var r = i._fieldsByName[e];if (!(r && r instanceof t.Reflect.Message.Field)) throw Error(this + "#" + e + " is not a field: undefined");if (!(r instanceof t.Reflect.Message.Field)) throw Error(this + "#" + e + " is not a field: " + r.toString(!0));return this[r.name];}, h.$get = h.get, s = 0; s < a.length; s++) {(o = a[s]) instanceof t.Reflect.Message.ExtensionField || i.builder.options.populateAccessors && function (e) {var t,n,r,s = e.originalName.replace(/(_[a-zA-Z])/g, function (e) {return e.toUpperCase().replace("_", "");});s = s.substring(0, 1).toUpperCase() + s.substring(1), t = e.originalName.replace(/([A-Z])/g, function (e) {return "_" + e;}), n = function n(t, _n3) {return this[e.name] = _n3 ? t : e.verifyValue(t), this;}, r = function r() {return this[e.name];}, null === i.getChild("set" + s) && (h["set" + s] = n), null === i.getChild("set_" + t) && (h["set_" + t] = n), null === i.getChild("get" + s) && (h["get" + s] = r), null === i.getChild("get_" + t) && (h["get_" + t] = r);}(o);}return h.encode = function (t, n) {var r, s;"boolean" == typeof t && (n = t, t = void 0), r = !1, t || (t = new e(), r = !0), s = t.littleEndian;try {return i.encode(this, t.LE(), n), (r ? t.flip() : t).LE(s);} catch (e) {throw t.LE(s), e;}}, c.encode = function (e, t, n) {return new c(e).encode(t, n);}, h.calculate = function () {return i.calculate(this);}, h.encodeDelimited = function (e) {var t,r = !1;return e || (e = new n(), r = !0), t = new n().LE(), i.encode(this, t).flip(), e.writeVarint32(t.remaining()), e.append(t), r ? e.flip() : e;}, h.encodeAB = function () {try {return this.encode().toArrayBuffer();} catch (e) {throw e.encoded && (e.encoded = e.encoded.toArrayBuffer()), e;}}, h.toArrayBuffer = h.encodeAB, h.encodeNB = function () {try {return this.encode().toBuffer();} catch (e) {throw e.encoded && (e.encoded = e.encoded.toBuffer()), e;}}, h.toBuffer = h.encodeNB, h.encode64 = function () {try {return this.encode().toBase64();} catch (e) {throw e.encoded && (e.encoded = e.encoded.toBase64()), e;}}, h.toBase64 = h.encode64, h.encodeHex = function () {try {return this.encode().toHex();} catch (e) {throw e.encoded && (e.encoded = e.encoded.toHex()), e;}}, h.toHex = h.encodeHex, h.toRaw = function (e, t) {return r(this, !!e, !!t, this.$type);}, h.encodeJSON = function () {return JSON.stringify(r(this, !0, !0, this.$type));}, c.decode = function (e, t) {var r, s;"string" == typeof e && (e = n.wrap(e, t || "base64")), r = (e = n.isByteBuffer(e) ? e : n.wrap(e)).littleEndian;try {return s = i.decode(e.LE()), e.LE(r), s;} catch (t) {throw e.LE(r), t;}}, c.decodeDelimited = function (e, t) {var r, s, o;if ("string" == typeof e && (e = n.wrap(e, t || "base64")), (e = n.isByteBuffer(e) ? e : n.wrap(e)).remaining() < 1) return null;if (r = e.offset, s = e.readVarint32(), e.remaining() < s) return e.offset = r, null;try {return o = i.decode(e.slice(e.offset, e.offset + s).LE()), e.offset += s, o;} catch (t) {throw e.offset += s, t;}}, c.decode64 = function (e) {return c.decode(e, "base64");}, c.decodeHex = function (e) {return c.decode(e, "hex");}, c.decodeJSON = function (e) {return new c(JSON.parse(e));}, h.toString = function () {return i.toString();}, Object.defineProperty && (Object.defineProperty(c, "$options", { value: i.buildOpt() }), Object.defineProperty(h, "$options", { value: c.$options }), Object.defineProperty(c, "$type", { value: i }), Object.defineProperty(h, "$type", { value: i })), c;}(t, this), this._fields = [], this._fieldsById = {}, this._fieldsByName = {}, o = 0, a = this.children.length; a > o; o++) {if ((s = this.children[o]) instanceof g || s instanceof c || s instanceof E) {if (r.hasOwnProperty(s.name)) throw Error("Illegal reflect child of " + this.toString(!0) + ": " + s.toString(!0) + " cannot override static property '" + s.name + "'");r[s.name] = s.build();} else if (s instanceof c.Field) s.build(), this._fields.push(s), this._fieldsById[s.id] = s, this._fieldsByName[s.name] = s;else if (!(s instanceof c.OneOf || s instanceof y)) throw Error("Illegal reflect child of " + this.toString(!0) + ": " + this.children[o].toString(!0));}return this.clazz = r;}, h.encode = function (e, t, n) {var i,r,s,o,a,u = null;for (s = 0, o = this._fields.length; o > s; ++s) {r = e[(i = this._fields[s]).name], i.required && null === r ? null === u && (u = i) : i.encode(n ? r : i.verifyValue(r), t, e);}if (null !== u) throw (a = Error("Missing at least one required field for " + this.toString(!0) + ": " + u)).encoded = t, a;return t;}, h.calculate = function (e) {for (var t, n, i = 0, r = 0, s = this._fields.length; s > r; ++r) {if (n = e[(t = this._fields[r]).name], t.required && null === n) throw Error("Missing at least one required field for " + this.toString(!0) + ": " + t);i += t.calculate(n, e);}return i;}, h.decode = function (e, n, i) {var s, o, a, u, c, h, l, f, d, p, g, _;for (n = "number" == typeof n ? n : -1, c = e.offset, h = new this.clazz(); e.offset < c + n || -1 === n && e.remaining() > 0;) {if (a = (s = e.readVarint32()) >>> 3, (o = 7 & s) === t.WIRE_TYPES.ENDGROUP) {if (a !== i) throw Error("Illegal group end indicator for " + this.toString(!0) + ": " + a + " (" + (i ? i + " expected" : "not a group") + ")");break;}if (u = this._fieldsById[a]) u.repeated && !u.options.packed ? h[u.name].push(u.decode(o, e)) : u.map ? (f = u.decode(o, e), h[u.name].set(f[0], f[1])) : (h[u.name] = u.decode(o, e), u.oneof && (null !== (d = h[u.oneof.name]) && d !== u.name && (h[d] = null), h[u.oneof.name] = u.name));else switch (o) {case t.WIRE_TYPES.VARINT:e.readVarint32();break;case t.WIRE_TYPES.BITS32:e.offset += 4;break;case t.WIRE_TYPES.BITS64:e.offset += 8;break;case t.WIRE_TYPES.LDELIM:l = e.readVarint32(), e.offset += l;break;case t.WIRE_TYPES.STARTGROUP:for (; r(a, e);) {;}break;default:throw Error("Illegal wire type for unknown field " + a + " in " + this.toString(!0) + "#decode: " + o);}}for (p = 0, g = this._fields.length; g > p; ++p) {if (null === h[(u = this._fields[p]).name]) if ("proto3" === this.syntax) h[u.name] = u.defaultValue;else {if (u.required) throw (_ = Error("Missing at least one required field for " + this.toString(!0) + ": " + u.name)).decoded = h, _;t.populateDefaults && null !== u.defaultValue && (h[u.name] = u.defaultValue);}}return h;}, T.Message = c, (f = (l = function l(e, n, i, r, s, o, a, u, h, _l) {I.call(this, e, n, o), this.className = "Message.Field", this.required = "required" === i, this.repeated = "repeated" === i, this.map = "map" === i, this.keyType = r || null, this.type = s, this.resolvedType = null, this.id = a, this.options = u || {}, this.defaultValue = null, this.oneof = h || null, this.syntax = _l || "proto2", this.originalName = this.name, this.element = null, this.keyElement = null, !this.builder.options.convertFieldsToCamelCase || this instanceof c.ExtensionField || (this.name = t.Util.toCamelCase(this.name));}).prototype = Object.create(I.prototype)).build = function () {this.element = new a(this.type, this.resolvedType, !1, this.syntax), this.map && (this.keyElement = new a(this.keyType, void 0, !0, this.syntax)), "proto3" !== this.syntax || this.repeated || this.map ? void 0 !== this.options.default && (this.defaultValue = this.verifyValue(this.options.default)) : this.defaultValue = a.defaultFieldValue(this.type);}, f.verifyValue = function (e, n) {var i, r, s;if (n = n || !1, i = function (e, t) {throw Error("Illegal value for " + this.toString(!0) + " of type " + this.type.name + ": " + e + " (" + t + ")");}.bind(this), null === e) return this.required && i(typeof e, "required"), "proto3" === this.syntax && this.type !== t.TYPES.message && i(typeof e, "proto3 field without field presence cannot be null"), null;if (this.repeated && !n) {for (Array.isArray(e) || (e = [e]), s = [], r = 0; r < e.length; r++) {s.push(this.element.verifyValue(e[r]));}return s;}return this.map && !n ? e instanceof t.Map ? e : (e instanceof Object || i(typeof e, "expected ProtoBuf.Map or raw object for map field"), new t.Map(this, e)) : (!this.repeated && Array.isArray(e) && i(typeof e, "no array expected"), this.element.verifyValue(e));}, f.hasWirePresence = function (e, n) {if ("proto3" !== this.syntax) return null !== e;if (this.oneof && n[this.oneof.name] === this.name) return !0;switch (this.type) {case t.TYPES.int32:case t.TYPES.sint32:case t.TYPES.sfixed32:case t.TYPES.uint32:case t.TYPES.fixed32:return 0 !== e;case t.TYPES.int64:case t.TYPES.sint64:case t.TYPES.sfixed64:case t.TYPES.uint64:case t.TYPES.fixed64:return 0 !== e.low || 0 !== e.high;case t.TYPES.bool:return e;case t.TYPES.float:case t.TYPES.double:return 0 !== e;case t.TYPES.string:return e.length > 0;case t.TYPES.bytes:return e.remaining() > 0;case t.TYPES.enum:return 0 !== e;case t.TYPES.message:return null !== e;default:return !0;}}, f.encode = function (e, i, r) {var s, o, a, u, c;if (null === this.type || "object" != typeof this.type) throw Error("[INTERNAL] Unresolved type in " + this.toString(!0) + ": " + this.type);if (null === e || this.repeated && 0 == e.length) return i;try {if (this.repeated) {if (this.options.packed && t.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {for (i.writeVarint32(this.id << 3 | t.WIRE_TYPES.LDELIM), i.ensureCapacity(i.offset += 1), o = i.offset, s = 0; s < e.length; s++) {this.element.encodeValue(this.id, e[s], i);}a = i.offset - o, (u = n.calculateVarint32(a)) > 1 && (c = i.slice(o, i.offset), o += u - 1, i.offset = o, i.append(c)), i.writeVarint32(a, o - u);} else for (s = 0; s < e.length; s++) {i.writeVarint32(this.id << 3 | this.type.wireType), this.element.encodeValue(this.id, e[s], i);}} else this.map ? e.forEach(function (e, r) {var s = n.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, r) + n.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, e);i.writeVarint32(this.id << 3 | t.WIRE_TYPES.LDELIM), i.writeVarint32(s), i.writeVarint32(8 | this.keyType.wireType), this.keyElement.encodeValue(1, r, i), i.writeVarint32(16 | this.type.wireType), this.element.encodeValue(2, e, i);}, this) : this.hasWirePresence(e, r) && (i.writeVarint32(this.id << 3 | this.type.wireType), this.element.encodeValue(this.id, e, i));} catch (t) {throw Error("Illegal value for " + this.toString(!0) + ": " + e + " (" + t + ")");}return i;}, f.calculate = function (e, i) {var r, s, o;if (e = this.verifyValue(e), null === this.type || "object" != typeof this.type) throw Error("[INTERNAL] Unresolved type in " + this.toString(!0) + ": " + this.type);if (null === e || this.repeated && 0 == e.length) return 0;r = 0;try {if (this.repeated) {if (this.options.packed && t.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0) {for (r += n.calculateVarint32(this.id << 3 | t.WIRE_TYPES.LDELIM), o = 0, s = 0; s < e.length; s++) {o += this.element.calculateLength(this.id, e[s]);}r += n.calculateVarint32(o), r += o;} else for (s = 0; s < e.length; s++) {r += n.calculateVarint32(this.id << 3 | this.type.wireType), r += this.element.calculateLength(this.id, e[s]);}} else this.map ? e.forEach(function (e, i) {var s = n.calculateVarint32(8 | this.keyType.wireType) + this.keyElement.calculateLength(1, i) + n.calculateVarint32(16 | this.type.wireType) + this.element.calculateLength(2, e);r += n.calculateVarint32(this.id << 3 | t.WIRE_TYPES.LDELIM), r += n.calculateVarint32(s), r += s;}, this) : this.hasWirePresence(e, i) && (r += n.calculateVarint32(this.id << 3 | this.type.wireType), r += this.element.calculateLength(this.id, e));} catch (t) {throw Error("Illegal value for " + this.toString(!0) + ": " + e + " (" + t + ")");}return r;}, f.decode = function (e, n, i) {var r, s, o, u, c, h, l;if (!(!this.map && e == this.type.wireType || !i && this.repeated && this.options.packed && e == t.WIRE_TYPES.LDELIM || this.map && e == t.WIRE_TYPES.LDELIM)) throw Error("Illegal wire type for field " + this.toString(!0) + ": " + e + " (" + this.type.wireType + " expected)");if (e == t.WIRE_TYPES.LDELIM && this.repeated && this.options.packed && t.PACKABLE_WIRE_TYPES.indexOf(this.type.wireType) >= 0 && !i) {for (s = n.readVarint32(), s = n.offset + s, o = []; n.offset < s;) {o.push(this.decode(this.type.wireType, n, !0));}return o;}if (this.map) {if (u = a.defaultFieldValue(this.keyType), r = a.defaultFieldValue(this.type), s = n.readVarint32(), n.remaining() < s) throw Error("Illegal number of bytes for " + this.toString(!0) + ": " + s + " required but got only " + n.remaining());for ((c = n.clone()).limit = c.offset + s, n.offset += s; c.remaining() > 0;) {if (e = 7 & (h = c.readVarint32()), 1 == (l = h >>> 3)) u = this.keyElement.decode(c, e, l);else {if (2 !== l) throw Error("Unexpected tag in map field key/value submessage");r = this.element.decode(c, e, l);}}return [u, r];}return this.element.decode(n, e, this.id);}, T.Message.Field = l, (d = function d(e, t, n, i, r, s, o) {l.call(this, e, t, n, null, i, r, s, o), this.extension;}).prototype = Object.create(l.prototype), T.Message.ExtensionField = d, p = function p(e, t, n) {I.call(this, e, t, n), this.fields = [];}, T.Message.OneOf = p, (g = function g(e, t, n, i, r) {s.call(this, e, t, n, i, r), this.className = "Enum", this.object = null;}).getName = function (e, t) {var n,i,r = Object.keys(e);for (i = 0; i < r.length; ++i) {if (e[n = r[i]] === t) return n;}return null;}, (g.prototype = Object.create(s.prototype)).build = function (e) {var n, i, r, s;if (this.object && !e) return this.object;for (n = new t.Builder.Enum(), r = 0, s = (i = this.getChildren(g.Value)).length; s > r; ++r) {n[i[r].name] = i[r].id;}return Object.defineProperty && Object.defineProperty(n, "$options", { value: this.buildOpt(), enumerable: !1 }), this.object = n;}, T.Enum = g, (_ = function _(e, t, n, i) {I.call(this, e, t, n), this.className = "Enum.Value", this.id = i;}).prototype = Object.create(I.prototype), T.Enum.Value = _, (y = function y(e, t, n, i) {I.call(this, e, t, n), this.field = i;}).prototype = Object.create(I.prototype), T.Extension = y, ((E = function E(e, t, n, i) {s.call(this, e, t, n, i), this.className = "Service", this.clazz = null;}).prototype = Object.create(s.prototype)).build = function (e) {return this.clazz && !e ? this.clazz : this.clazz = function (e, t) {var i,r = function r(t) {e.Builder.Service.call(this), this.rpcImpl = t || function (e, t, n) {setTimeout(n.bind(this, Error("Not implemented, see: https://github.com/dcodeIO/ProtoBuf.js/wiki/Services")), 0);};},s = r.prototype = Object.create(e.Builder.Service.prototype),o = t.getChildren(e.Reflect.Service.RPCMethod);for (i = 0; i < o.length; i++) {!function (e) {s[e.name] = function (i, r) {try {try {i = e.resolvedRequestType.clazz.decode(n.wrap(i));} catch (e) {if (!(e instanceof TypeError)) throw e;}if (null === i || "object" != typeof i) throw Error("Illegal arguments");i instanceof e.resolvedRequestType.clazz || (i = new e.resolvedRequestType.clazz(i)), this.rpcImpl(e.fqn(), i, function (n, i) {if (!n) {try {i = e.resolvedResponseType.clazz.decode(i);} catch (e) {}return i && i instanceof e.resolvedResponseType.clazz ? void r(null, i) : void r(Error("Illegal response type received in service method " + t.name + "#" + e.name));}r(n);});} catch (e) {setTimeout(r.bind(this, e), 0);}}, r[e.name] = function (t, n, i) {new r(t)[e.name](n, i);}, Object.defineProperty && (Object.defineProperty(r[e.name], "$options", { value: e.buildOpt() }), Object.defineProperty(s[e.name], "$options", { value: r[e.name].$options }));}(o[i]);}return Object.defineProperty && (Object.defineProperty(r, "$options", { value: t.buildOpt() }), Object.defineProperty(s, "$options", { value: r.$options }), Object.defineProperty(r, "$type", { value: t }), Object.defineProperty(s, "$type", { value: t })), r;}(t, this);}, T.Service = E, ((m = function m(e, t, n, i) {I.call(this, e, t, n), this.className = "Service.Method", this.options = i || {};}).prototype = Object.create(I.prototype)).buildOpt = o.buildOpt, T.Service.Method = m, (v = function v(e, t, n, i, r, s, o, a) {m.call(this, e, t, n, a), this.className = "Service.RPCMethod", this.requestName = i, this.responseName = r, this.requestStream = s, this.responseStream = o, this.resolvedRequestType = null, this.resolvedResponseType = null;}).prototype = Object.create(m.prototype), T.Service.RPCMethod = v, T;}(r), r.Builder = function (e, t, n) {function i(e) {e.messages && e.messages.forEach(function (t) {t.syntax = e.syntax, i(t);}), e.enums && e.enums.forEach(function (t) {t.syntax = e.syntax;});}var r = function r(e) {this.ns = new n.Namespace(this, null, ""), this.ptr = this.ns, this.resolved = !1, this.result = null, this.files = {}, this.importRoot = null, this.options = e || {};},s = r.prototype;return r.isMessage = function (e) {return "string" == typeof e.name && void 0 === e.values && void 0 === e.rpc;}, r.isMessageField = function (e) {return "string" == typeof e.rule && "string" == typeof e.name && "string" == typeof e.type && void 0 !== e.id;}, r.isEnum = function (e) {return "string" == typeof e.name && !(void 0 === e.values || !Array.isArray(e.values) || 0 === e.values.length);}, r.isService = function (e) {return !("string" != typeof e.name || "object" != typeof e.rpc || !e.rpc);}, r.isExtend = function (e) {return "string" == typeof e.ref;}, s.reset = function () {return this.ptr = this.ns, this;}, s.define = function (e) {if ("string" != typeof e || !t.TYPEREF.test(e)) throw Error("illegal namespace: " + e);return e.split(".").forEach(function (e) {var t = this.ptr.getChild(e);null === t && this.ptr.addChild(t = new n.Namespace(this, this.ptr, e)), this.ptr = t;}, this), this;}, s.create = function (t) {var i, s, o, a, u;if (!t) return this;if (Array.isArray(t)) {if (0 === t.length) return this;t = t.slice();} else t = [t];for (i = [t]; i.length > 0;) {if (t = i.pop(), !Array.isArray(t)) throw Error("not a valid namespace: " + JSON.stringify(t));for (; t.length > 0;) {if (s = t.shift(), r.isMessage(s)) {if (o = new n.Message(this, this.ptr, s.name, s.options, s.isGroup, s.syntax), a = {}, s.oneofs && Object.keys(s.oneofs).forEach(function (e) {o.addChild(a[e] = new n.Message.OneOf(this, o, e));}, this), s.fields && s.fields.forEach(function (e) {if (null !== o.getChild(0 | e.id)) throw Error("duplicate or invalid field id in " + o.name + ": " + e.id);if (e.options && "object" != typeof e.options) throw Error("illegal field options in " + o.name + "#" + e.name);var t = null;if ("string" == typeof e.oneof && !(t = a[e.oneof])) throw Error("illegal oneof in " + o.name + "#" + e.name + ": " + e.oneof);e = new n.Message.Field(this, o, e.rule, e.keytype, e.type, e.name, e.id, e.options, t, s.syntax), t && t.fields.push(e), o.addChild(e);}, this), u = [], s.enums && s.enums.forEach(function (e) {u.push(e);}), s.messages && s.messages.forEach(function (e) {u.push(e);}), s.services && s.services.forEach(function (e) {u.push(e);}), s.extensions && (o.extensions = "number" == typeof s.extensions[0] ? [s.extensions] : s.extensions), this.ptr.addChild(o), u.length > 0) {i.push(t), t = u, u = null, this.ptr = o, o = null;continue;}u = null;} else if (r.isEnum(s)) o = new n.Enum(this, this.ptr, s.name, s.options, s.syntax), s.values.forEach(function (e) {o.addChild(new n.Enum.Value(this, o, e.name, e.id));}, this), this.ptr.addChild(o);else if (r.isService(s)) o = new n.Service(this, this.ptr, s.name, s.options), Object.keys(s.rpc).forEach(function (e) {var t = s.rpc[e];o.addChild(new n.Service.RPCMethod(this, o, e, t.request, t.response, !!t.request_stream, !!t.response_stream, t.options));}, this), this.ptr.addChild(o);else {if (!r.isExtend(s)) throw Error("not a valid definition: " + JSON.stringify(s));if (o = this.ptr.resolve(s.ref, !0)) s.fields.forEach(function (t) {var i, r, s, a;if (null !== o.getChild(0 | t.id)) throw Error("duplicate extended field id in " + o.name + ": " + t.id);if (o.extensions && (i = !1, o.extensions.forEach(function (e) {t.id >= e[0] && t.id <= e[1] && (i = !0);}), !i)) throw Error("illegal extended field id in " + o.name + ": " + t.id + " (not within valid ranges)");r = t.name, this.options.convertFieldsToCamelCase && (r = e.Util.toCamelCase(r)), s = new n.Message.ExtensionField(this, o, t.rule, t.type, this.ptr.fqn() + "." + r, t.id, t.options), a = new n.Extension(this, this.ptr, t.name, s), s.extension = a, this.ptr.addChild(a), o.addChild(s);}, this);else if (!/\.?google\.protobuf\./.test(s.ref)) throw Error("extended message " + s.ref + " is not defined");}s = null, o = null;}t = null, this.ptr = this.ptr.parent;}return this.resolved = !1, this.result = null, this;}, s.import = function (t, n) {var r,s,o,a,u,c,h,l,f = "/";if ("string" == typeof n) {if (e.Util.IS_NODE, !0 === this.files[n]) return this.reset();this.files[n] = !0;} else if ("object" == typeof n) {if (r = n.root, e.Util.IS_NODE, (r.indexOf("\\") >= 0 || n.file.indexOf("\\") >= 0) && (f = "\\"), s = r + f + n.file, !0 === this.files[s]) return this.reset();this.files[s] = !0;}if (t.imports && t.imports.length > 0) {for (a = !1, "object" == typeof n ? (this.importRoot = n.root, a = !0, o = this.importRoot, n = n.file, (o.indexOf("\\") >= 0 || n.indexOf("\\") >= 0) && (f = "\\")) : "string" == typeof n ? this.importRoot ? o = this.importRoot : n.indexOf("/") >= 0 ? "" === (o = n.replace(/\/[^\/]*$/, "")) && (o = "/") : n.indexOf("\\") >= 0 ? (o = n.replace(/\\[^\\]*$/, ""), f = "\\") : o = "." : o = null, u = 0; u < t.imports.length; u++) {if ("string" == typeof t.imports[u]) {if (!o) throw Error("cannot determine import root");if ("google/protobuf/descriptor.proto" === (c = t.imports[u])) continue;if (c = o + f + c, !0 === this.files[c]) continue;if (/\.proto$/i.test(c) && !e.DotProto && (c = c.replace(/\.proto$/, ".json")), null === (h = e.Util.fetch(c))) throw Error("failed to import '" + c + "' in '" + n + "': file not found");/\.json$/i.test(c) ? this.import(JSON.parse(h + ""), c) : this.import(e.DotProto.Parser.parse(h), c);} else n ? /\.(\w+)$/.test(n) ? this.import(t.imports[u], n.replace(/^(.+)\.(\w+)$/, function (e, t, n) {return t + "_import" + u + "." + n;})) : this.import(t.imports[u], n + "_import" + u) : this.import(t.imports[u]);}a && (this.importRoot = null);}return t.package && this.define(t.package), t.syntax && i(t), l = this.ptr, t.options && Object.keys(t.options).forEach(function (e) {l.options[e] = t.options[e];}), t.messages && (this.create(t.messages), this.ptr = l), t.enums && (this.create(t.enums), this.ptr = l), t.services && (this.create(t.services), this.ptr = l), t.extends && this.create(t.extends), this.reset();}, s.resolveAll = function () {var i;if (null == this.ptr || "object" == typeof this.ptr.type) return this;if (this.ptr instanceof n.Namespace) this.ptr.children.forEach(function (e) {this.ptr = e, this.resolveAll();}, this);else if (this.ptr instanceof n.Message.Field) {if (t.TYPE.test(this.ptr.type)) this.ptr.type = e.TYPES[this.ptr.type];else {if (!t.TYPEREF.test(this.ptr.type)) throw Error("illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);if (!(i = (this.ptr instanceof n.Message.ExtensionField ? this.ptr.extension.parent : this.ptr.parent).resolve(this.ptr.type, !0))) throw Error("unresolvable type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);if (this.ptr.resolvedType = i, i instanceof n.Enum) {if (this.ptr.type = e.TYPES.enum, "proto3" === this.ptr.syntax && "proto3" !== i.syntax) throw Error("proto3 message cannot reference proto2 enum");} else {if (!(i instanceof n.Message)) throw Error("illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.type);this.ptr.type = i.isGroup ? e.TYPES.group : e.TYPES.message;}}if (this.ptr.map) {if (!t.TYPE.test(this.ptr.keyType)) throw Error("illegal key type for map field in " + this.ptr.toString(!0) + ": " + this.ptr.keyType);this.ptr.keyType = e.TYPES[this.ptr.keyType];}} else if (this.ptr instanceof e.Reflect.Service.Method) {if (!(this.ptr instanceof e.Reflect.Service.RPCMethod)) throw Error("illegal service type in " + this.ptr.toString(!0));if (!((i = this.ptr.parent.resolve(this.ptr.requestName, !0)) && i instanceof e.Reflect.Message)) throw Error("Illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.requestName);if (this.ptr.resolvedRequestType = i, !((i = this.ptr.parent.resolve(this.ptr.responseName, !0)) && i instanceof e.Reflect.Message)) throw Error("Illegal type reference in " + this.ptr.toString(!0) + ": " + this.ptr.responseName);this.ptr.resolvedResponseType = i;} else if (!(this.ptr instanceof e.Reflect.Message.OneOf || this.ptr instanceof e.Reflect.Extension || this.ptr instanceof e.Reflect.Enum.Value)) throw Error("illegal object in namespace: " + typeof this.ptr + ": " + this.ptr);return this.reset();}, s.build = function (e) {var t, n, i;if (this.reset(), this.resolved || (this.resolveAll(), this.resolved = !0, this.result = null), null === this.result && (this.result = this.ns.build()), !e) return this.result;for (t = "string" == typeof e ? e.split(".") : e, n = this.result, i = 0; i < t.length; i++) {if (!n[t[i]]) {n = null;break;}n = n[t[i]];}return n;}, s.lookup = function (e, t) {return e ? this.ns.resolve(e, t) : this.ns;}, s.toString = function () {return "Builder";}, r.Message = function () {}, r.Enum = function () {}, r.Service = function () {}, r;}(r, r.Lang, r.Reflect), r.Map = function (e, t) {function n(e) {var t = 0;return { next: function next() {return t < e.length ? { done: !1, value: e[t++] } : { done: !0 };} };}var i = function i(e, n) {var i, r, s, o;if (!e.map) throw Error("field is not a map");if (this.field = e, this.keyElem = new t.Element(e.keyType, null, !0, e.syntax), this.valueElem = new t.Element(e.type, e.resolvedType, !1, e.syntax), this.map = {}, Object.defineProperty(this, "size", { get: function get() {return Object.keys(this.map).length;} }), n) for (i = Object.keys(n), r = 0; r < i.length; r++) {s = this.keyElem.valueFromString(i[r]), o = this.valueElem.verifyValue(n[i[r]]), this.map[this.keyElem.valueToString(s)] = { key: s, value: o };}},r = i.prototype;return r.clear = function () {this.map = {};}, r.delete = function (e) {var t = this.keyElem.valueToString(this.keyElem.verifyValue(e)),n = (t in this.map);return delete this.map[t], n;}, r.entries = function () {var e,t,i = [],r = Object.keys(this.map);for (t = 0; t < r.length; t++) {i.push([(e = this.map[r[t]]).key, e.value]);}return n(i);}, r.keys = function () {var e,t = [],i = Object.keys(this.map);for (e = 0; e < i.length; e++) {t.push(this.map[i[e]].key);}return n(t);}, r.values = function () {var e,t = [],i = Object.keys(this.map);for (e = 0; e < i.length; e++) {t.push(this.map[i[e]].value);}return n(t);}, r.forEach = function (e, t) {var n,i,r = Object.keys(this.map);for (i = 0; i < r.length; i++) {e.call(t, (n = this.map[r[i]]).value, n.key, this);}}, r.set = function (e, t) {var n = this.keyElem.verifyValue(e),i = this.valueElem.verifyValue(t);return this.map[this.keyElem.valueToString(n)] = { key: n, value: i }, this;}, r.get = function (e) {var t = this.keyElem.valueToString(this.keyElem.verifyValue(e));return t in this.map ? this.map[t].value : void 0;}, r.has = function (e) {return this.keyElem.valueToString(this.keyElem.verifyValue(e)) in this.map;}, i;}(0, r.Reflect), r.loadProto = function (e, t, n) {return ("string" == typeof t || t && "string" == typeof t.file && "string" == typeof t.root) && (n = t, t = void 0), r.loadJson(r.DotProto.Parser.parse(e), t, n);}, r.protoFromString = r.loadProto, r.loadProtoFile = function (e, t, n) {if (t && "object" == typeof t ? (n = t, t = null) : t && "function" == typeof t || (t = null), t) return r.Util.fetch("string" == typeof e ? e : e.root + "/" + e.file, function (i) {if (null !== i) try {t(null, r.loadProto(i, n, e));} catch (e) {t(e);} else t(Error("Failed to fetch file"));});var i = r.Util.fetch("object" == typeof e ? e.root + "/" + e.file : e);return null === i ? null : r.loadProto(i, n, e);}, r.protoFromFile = r.loadProtoFile, r.newBuilder = function (e) {return void 0 === (e = e || {}).convertFieldsToCamelCase && (e.convertFieldsToCamelCase = r.convertFieldsToCamelCase), void 0 === e.populateAccessors && (e.populateAccessors = r.populateAccessors), new r.Builder(e);}, r.loadJson = function (e, t, n) {return ("string" == typeof t || t && "string" == typeof t.file && "string" == typeof t.root) && (n = t, t = null), t && "object" == typeof t || (t = r.newBuilder()), "string" == typeof e && (e = JSON.parse(e)), t.import(e, n), t.resolveAll(), t;}, r.loadJsonFile = function (e, t, n) {if (t && "object" == typeof t ? (n = t, t = null) : t && "function" == typeof t || (t = null), t) return r.Util.fetch("string" == typeof e ? e : e.root + "/" + e.file, function (i) {if (null !== i) try {t(null, r.loadJson(JSON.parse(i), n, e));} catch (e) {t(e);} else t(Error("Failed to fetch file"));});var i = r.Util.fetch("object" == typeof e ? e.root + "/" + e.file : e);return null === i ? null : r.loadJson(JSON.parse(i), n, e);}, i = ti, r.loadProto(i, void 0, "").build("Modules").probuf;}(function (e) {function t(e) {var t = 0;return function () {return t < e.length ? e.charCodeAt(t++) : null;};}function n() {var e = [],t = [];return function () {return 0 === arguments.length ? t.join("") + a.apply(String, e) : (e.length + arguments.length > 1024 && (t.push(a.apply(String, e)), e.length = 0), void Array.prototype.push.apply(e, arguments));};}function i(e, t, n, i, r) {var s,o,a = 8 * r - i - 1,u = (1 << a) - 1,c = u >> 1,h = -7,l = n ? r - 1 : 0,f = n ? -1 : 1,d = e[t + l];for (l += f, s = d & (1 << -h) - 1, d >>= -h, h += a; h > 0; s = 256 * s + e[t + l], l += f, h -= 8) {;}for (o = s & (1 << -h) - 1, s >>= -h, h += i; h > 0; o = 256 * o + e[t + l], l += f, h -= 8) {;}if (0 === s) s = 1 - c;else {if (s === u) return o ? NaN : 1 / 0 * (d ? -1 : 1);o += Math.pow(2, i), s -= c;}return (d ? -1 : 1) * o * Math.pow(2, s - i);}function r(e, t, n, i, r, s) {var o,a,u,c = 8 * s - r - 1,h = (1 << c) - 1,l = h >> 1,f = 23 === r ? Math.pow(2, -24) - Math.pow(2, -77) : 0,d = i ? 0 : s - 1,p = i ? 1 : -1,g = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;for (t = Math.abs(t), isNaN(t) || 1 / 0 === t ? (a = isNaN(t) ? 1 : 0, o = h) : (o = Math.floor(Math.log(t) / Math.LN2), t * (u = Math.pow(2, -o)) < 1 && (o--, u *= 2), (t += o + l >= 1 ? f / u : f * Math.pow(2, 1 - l)) * u >= 2 && (o++, u /= 2), o + l >= h ? (a = 0, o = h) : o + l >= 1 ? (a = (t * u - 1) * Math.pow(2, r), o += l) : (a = t * Math.pow(2, l - 1) * Math.pow(2, r), o = 0)); r >= 8; e[n + d] = 255 & a, d += p, a /= 256, r -= 8) {;}for (o = o << r | a, c += r; c > 0; e[n + d] = 255 & o, d += p, o /= 256, c -= 8) {;}e[n + d - p] |= 128 * g;}var s,o,a,u,c,h = function h(e, t, n) {if (void 0 === e && (e = h.DEFAULT_CAPACITY), void 0 === t && (t = h.DEFAULT_ENDIAN), void 0 === n && (n = h.DEFAULT_NOASSERT), !n) {if ((e |= 0) < 0) throw RangeError("Illegal capacity");t = !!t, n = !!n;}this.buffer = 0 === e ? o : new ArrayBuffer(e), this.view = 0 === e ? null : new Uint8Array(this.buffer), this.offset = 0, this.markedOffset = -1, this.limit = e, this.littleEndian = t, this.noAssert = n;};return h.VERSION = "5.0.1", h.LITTLE_ENDIAN = !0, h.BIG_ENDIAN = !1, h.DEFAULT_CAPACITY = 16, h.DEFAULT_ENDIAN = h.BIG_ENDIAN, h.DEFAULT_NOASSERT = !1, h.Long = e || null, (s = h.prototype).__isByteBuffer__, Object.defineProperty(s, "__isByteBuffer__", { value: !0, enumerable: !1, configurable: !1 }), o = new ArrayBuffer(0), a = String.fromCharCode, h.accessor = function () {return Uint8Array;}, h.allocate = function (e, t, n) {return new h(e, t, n);}, h.concat = function (e, t, n, i) {var r, s, o, a, u, c;for (("boolean" == typeof t || "string" != typeof t) && (i = n, n = t, t = void 0), r = 0, o = 0, a = e.length; a > o; ++o) {h.isByteBuffer(e[o]) || (e[o] = h.wrap(e[o], t)), (s = e[o].limit - e[o].offset) > 0 && (r += s);}if (0 === r) return new h(0, n, i);for (c = new h(r, n, i), o = 0; a > o;) {(s = (u = e[o++]).limit - u.offset) <= 0 || (c.view.set(u.view.subarray(u.offset, u.limit), c.offset), c.offset += s);}return c.limit = c.offset, c.offset = 0, c;}, h.isByteBuffer = function (e) {return !0 === (e && e.__isByteBuffer__);}, h.type = function () {return ArrayBuffer;}, h.wrap = function (e, t, n, i) {var r, o;if ("string" != typeof t && (i = n, n = t, t = void 0), "string" == typeof e) switch (void 0 === t && (t = "utf8"), t) {case "base64":return h.fromBase64(e, n);case "hex":return h.fromHex(e, n);case "binary":return h.fromBinary(e, n);case "utf8":return h.fromUTF8(e, n);case "debug":return h.fromDebug(e, n);default:throw Error("Unsupported encoding: " + t);}if (null === e || "object" != typeof e) throw TypeError("Illegal buffer");if (h.isByteBuffer(e)) return (r = s.clone.call(e)).markedOffset = -1, r;if (e instanceof Uint8Array) r = new h(0, n, i), e.length > 0 && (r.buffer = e.buffer, r.offset = e.byteOffset, r.limit = e.byteOffset + e.byteLength, r.view = new Uint8Array(e.buffer));else if (e instanceof ArrayBuffer) r = new h(0, n, i), e.byteLength > 0 && (r.buffer = e, r.offset = 0, r.limit = e.byteLength, r.view = e.byteLength > 0 ? new Uint8Array(e) : null);else {if ("[object Array]" !== Object.prototype.toString.call(e)) throw TypeError("Illegal buffer");for ((r = new h(e.length, n, i)).limit = e.length, o = 0; o < e.length; ++o) {r.view[o] = e[o];}}return r;}, s.writeBitSet = function (e, t) {var n,i,r,s,o,a,u = void 0 === t;if (u && (t = this.offset), !this.noAssert) {if (!(e instanceof Array)) throw TypeError("Illegal BitSet: Not an array");if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);}for (i = t, s = (r = e.length) >> 3, o = 0, t += this.writeVarint32(r, t); s--;) {n = 1 & !!e[o++] | (1 & !!e[o++]) << 1 | (1 & !!e[o++]) << 2 | (1 & !!e[o++]) << 3 | (1 & !!e[o++]) << 4 | (1 & !!e[o++]) << 5 | (1 & !!e[o++]) << 6 | (1 & !!e[o++]) << 7, this.writeByte(n, t++);}if (r > o) {for (a = 0, n = 0; r > o;) {n |= (1 & !!e[o++]) << a++;}this.writeByte(n, t++);}return u ? (this.offset = t, this) : t - i;}, s.readBitSet = function (e) {var t,n,i,r,s,o,a,u = void 0 === e;for (u && (e = this.offset), r = (i = (n = this.readVarint32(e)).value) >> 3, s = 0, o = [], e += n.length; r--;) {t = this.readByte(e++), o[s++] = !!(1 & t), o[s++] = !!(2 & t), o[s++] = !!(4 & t), o[s++] = !!(8 & t), o[s++] = !!(16 & t), o[s++] = !!(32 & t), o[s++] = !!(64 & t), o[s++] = !!(128 & t);}if (i > s) for (a = 0, t = this.readByte(e++); i > s;) {o[s++] = !!(1 & t >> a++);}return u && (this.offset = e), o;}, s.readBytes = function (e, t) {var n,i = void 0 === t;if (i && (t = this.offset), !this.noAssert) {if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");if ((t >>>= 0) < 0 || t + e > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+" + e + ") <= " + this.buffer.byteLength);}return n = this.slice(t, t + e), i && (this.offset += e), n;}, s.writeBytes = s.append, s.writeInt8 = function (e, t) {var n,i = void 0 === t;if (i && (t = this.offset), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal value: " + e + " (not an integer)");if (e |= 0, "number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);}return (t += 1) > (n = this.buffer.byteLength) && this.resize((n *= 2) > t ? n : t), t -= 1, this.view[t] = e, i && (this.offset += 1), this;}, s.writeByte = s.writeInt8, s.readInt8 = function (e) {var t,n = void 0 === e;if (n && (e = this.offset), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");if ((e >>>= 0) < 0 || e + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength);}return 128 == (128 & (t = this.view[e])) && (t = -(255 - t + 1)), n && (this.offset += 1), t;}, s.readByte = s.readInt8, s.writeUint8 = function (e, t) {var n,i = void 0 === t;if (i && (t = this.offset), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal value: " + e + " (not an integer)");if (e >>>= 0, "number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);}return (t += 1) > (n = this.buffer.byteLength) && this.resize((n *= 2) > t ? n : t), t -= 1, this.view[t] = e, i && (this.offset += 1), this;}, s.writeUInt8 = s.writeUint8, s.readUint8 = function (e) {var t,n = void 0 === e;if (n && (e = this.offset), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");if ((e >>>= 0) < 0 || e + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength);}return t = this.view[e], n && (this.offset += 1), t;}, s.readUInt8 = s.readUint8, s.writeInt16 = function (e, t) {var n,i = void 0 === t;if (i && (t = this.offset), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal value: " + e + " (not an integer)");if (e |= 0, "number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);}return (t += 2) > (n = this.buffer.byteLength) && this.resize((n *= 2) > t ? n : t), t -= 2, this.littleEndian ? (this.view[t + 1] = (65280 & e) >>> 8, this.view[t] = 255 & e) : (this.view[t] = (65280 & e) >>> 8, this.view[t + 1] = 255 & e), i && (this.offset += 2), this;}, s.writeShort = s.writeInt16, s.readInt16 = function (e) {var t,n = void 0 === e;if (n && (e = this.offset), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");if ((e >>>= 0) < 0 || e + 2 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+2) <= " + this.buffer.byteLength);}return t = 0, this.littleEndian ? (t = this.view[e], t |= this.view[e + 1] << 8) : (t = this.view[e] << 8, t |= this.view[e + 1]), 32768 == (32768 & t) && (t = -(65535 - t + 1)), n && (this.offset += 2), t;}, s.readShort = s.readInt16, s.writeUint16 = function (e, t) {var n,i = void 0 === t;if (i && (t = this.offset), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal value: " + e + " (not an integer)");if (e >>>= 0, "number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);}return (t += 2) > (n = this.buffer.byteLength) && this.resize((n *= 2) > t ? n : t), t -= 2, this.littleEndian ? (this.view[t + 1] = (65280 & e) >>> 8, this.view[t] = 255 & e) : (this.view[t] = (65280 & e) >>> 8, this.view[t + 1] = 255 & e), i && (this.offset += 2), this;}, s.writeUInt16 = s.writeUint16, s.readUint16 = function (e) {var t,n = void 0 === e;if (n && (e = this.offset), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");if ((e >>>= 0) < 0 || e + 2 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+2) <= " + this.buffer.byteLength);}return t = 0, this.littleEndian ? (t = this.view[e], t |= this.view[e + 1] << 8) : (t = this.view[e] << 8, t |= this.view[e + 1]), n && (this.offset += 2), t;}, s.readUInt16 = s.readUint16, s.writeInt32 = function (e, t) {var n,i = void 0 === t;if (i && (t = this.offset), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal value: " + e + " (not an integer)");if (e |= 0, "number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);}return (t += 4) > (n = this.buffer.byteLength) && this.resize((n *= 2) > t ? n : t), t -= 4, this.littleEndian ? (this.view[t + 3] = 255 & e >>> 24, this.view[t + 2] = 255 & e >>> 16, this.view[t + 1] = 255 & e >>> 8, this.view[t] = 255 & e) : (this.view[t] = 255 & e >>> 24, this.view[t + 1] = 255 & e >>> 16, this.view[t + 2] = 255 & e >>> 8, this.view[t + 3] = 255 & e), i && (this.offset += 4), this;}, s.writeInt = s.writeInt32, s.readInt32 = function (e) {var t,n = void 0 === e;if (n && (e = this.offset), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");if ((e >>>= 0) < 0 || e + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+4) <= " + this.buffer.byteLength);}return t = 0, this.littleEndian ? (t = this.view[e + 2] << 16, t |= this.view[e + 1] << 8, t |= this.view[e], t += this.view[e + 3] << 24 >>> 0) : (t = this.view[e + 1] << 16, t |= this.view[e + 2] << 8, t |= this.view[e + 3], t += this.view[e] << 24 >>> 0), t |= 0, n && (this.offset += 4), t;}, s.readInt = s.readInt32, s.writeUint32 = function (e, t) {var n,i = void 0 === t;if (i && (t = this.offset), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal value: " + e + " (not an integer)");if (e >>>= 0, "number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);}return (t += 4) > (n = this.buffer.byteLength) && this.resize((n *= 2) > t ? n : t), t -= 4, this.littleEndian ? (this.view[t + 3] = 255 & e >>> 24, this.view[t + 2] = 255 & e >>> 16, this.view[t + 1] = 255 & e >>> 8, this.view[t] = 255 & e) : (this.view[t] = 255 & e >>> 24, this.view[t + 1] = 255 & e >>> 16, this.view[t + 2] = 255 & e >>> 8, this.view[t + 3] = 255 & e), i && (this.offset += 4), this;}, s.writeUInt32 = s.writeUint32, s.readUint32 = function (e) {var t,n = void 0 === e;if (n && (e = this.offset), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");if ((e >>>= 0) < 0 || e + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+4) <= " + this.buffer.byteLength);}return t = 0, this.littleEndian ? (t = this.view[e + 2] << 16, t |= this.view[e + 1] << 8, t |= this.view[e], t += this.view[e + 3] << 24 >>> 0) : (t = this.view[e + 1] << 16, t |= this.view[e + 2] << 8, t |= this.view[e + 3], t += this.view[e] << 24 >>> 0), n && (this.offset += 4), t;}, s.readUInt32 = s.readUint32, e && (s.writeInt64 = function (t, n) {var i,r,s,o = void 0 === n;if (o && (n = this.offset), !this.noAssert) {if ("number" == typeof t) t = e.fromNumber(t);else if ("string" == typeof t) t = e.fromString(t);else if (!(t && t instanceof e)) throw TypeError("Illegal value: " + t + " (not an integer or Long)");if ("number" != typeof n || n % 1 != 0) throw TypeError("Illegal offset: " + n + " (not an integer)");if ((n >>>= 0) < 0 || n + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + n + " (+0) <= " + this.buffer.byteLength);}return "number" == typeof t ? t = e.fromNumber(t) : "string" == typeof t && (t = e.fromString(t)), (n += 8) > (i = this.buffer.byteLength) && this.resize((i *= 2) > n ? i : n), n -= 8, r = t.low, s = t.high, this.littleEndian ? (this.view[n + 3] = 255 & r >>> 24, this.view[n + 2] = 255 & r >>> 16, this.view[n + 1] = 255 & r >>> 8, this.view[n] = 255 & r, n += 4, this.view[n + 3] = 255 & s >>> 24, this.view[n + 2] = 255 & s >>> 16, this.view[n + 1] = 255 & s >>> 8, this.view[n] = 255 & s) : (this.view[n] = 255 & s >>> 24, this.view[n + 1] = 255 & s >>> 16, this.view[n + 2] = 255 & s >>> 8, this.view[n + 3] = 255 & s, n += 4, this.view[n] = 255 & r >>> 24, this.view[n + 1] = 255 & r >>> 16, this.view[n + 2] = 255 & r >>> 8, this.view[n + 3] = 255 & r), o && (this.offset += 8), this;}, s.writeLong = s.writeInt64, s.readInt64 = function (t) {var n,i,r,s = void 0 === t;if (s && (t = this.offset), !this.noAssert) {if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");if ((t >>>= 0) < 0 || t + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+8) <= " + this.buffer.byteLength);}return n = 0, i = 0, this.littleEndian ? (n = this.view[t + 2] << 16, n |= this.view[t + 1] << 8, n |= this.view[t], n += this.view[t + 3] << 24 >>> 0, t += 4, i = this.view[t + 2] << 16, i |= this.view[t + 1] << 8, i |= this.view[t], i += this.view[t + 3] << 24 >>> 0) : (i = this.view[t + 1] << 16, i |= this.view[t + 2] << 8, i |= this.view[t + 3], i += this.view[t] << 24 >>> 0, t += 4, n = this.view[t + 1] << 16, n |= this.view[t + 2] << 8, n |= this.view[t + 3], n += this.view[t] << 24 >>> 0), r = new e(n, i, !1), s && (this.offset += 8), r;}, s.readLong = s.readInt64, s.writeUint64 = function (t, n) {var i,r,s,o = void 0 === n;if (o && (n = this.offset), !this.noAssert) {if ("number" == typeof t) t = e.fromNumber(t);else if ("string" == typeof t) t = e.fromString(t);else if (!(t && t instanceof e)) throw TypeError("Illegal value: " + t + " (not an integer or Long)");if ("number" != typeof n || n % 1 != 0) throw TypeError("Illegal offset: " + n + " (not an integer)");if ((n >>>= 0) < 0 || n + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + n + " (+0) <= " + this.buffer.byteLength);}return "number" == typeof t ? t = e.fromNumber(t) : "string" == typeof t && (t = e.fromString(t)), (n += 8) > (i = this.buffer.byteLength) && this.resize((i *= 2) > n ? i : n), n -= 8, r = t.low, s = t.high, this.littleEndian ? (this.view[n + 3] = 255 & r >>> 24, this.view[n + 2] = 255 & r >>> 16, this.view[n + 1] = 255 & r >>> 8, this.view[n] = 255 & r, n += 4, this.view[n + 3] = 255 & s >>> 24, this.view[n + 2] = 255 & s >>> 16, this.view[n + 1] = 255 & s >>> 8, this.view[n] = 255 & s) : (this.view[n] = 255 & s >>> 24, this.view[n + 1] = 255 & s >>> 16, this.view[n + 2] = 255 & s >>> 8, this.view[n + 3] = 255 & s, n += 4, this.view[n] = 255 & r >>> 24, this.view[n + 1] = 255 & r >>> 16, this.view[n + 2] = 255 & r >>> 8, this.view[n + 3] = 255 & r), o && (this.offset += 8), this;}, s.writeUInt64 = s.writeUint64, s.readUint64 = function (t) {var n,i,r,s = void 0 === t;if (s && (t = this.offset), !this.noAssert) {if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");if ((t >>>= 0) < 0 || t + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+8) <= " + this.buffer.byteLength);}return n = 0, i = 0, this.littleEndian ? (n = this.view[t + 2] << 16, n |= this.view[t + 1] << 8, n |= this.view[t], n += this.view[t + 3] << 24 >>> 0, t += 4, i = this.view[t + 2] << 16, i |= this.view[t + 1] << 8, i |= this.view[t], i += this.view[t + 3] << 24 >>> 0) : (i = this.view[t + 1] << 16, i |= this.view[t + 2] << 8, i |= this.view[t + 3], i += this.view[t] << 24 >>> 0, t += 4, n = this.view[t + 1] << 16, n |= this.view[t + 2] << 8, n |= this.view[t + 3], n += this.view[t] << 24 >>> 0), r = new e(n, i, !0), s && (this.offset += 8), r;}, s.readUInt64 = s.readUint64), s.writeFloat32 = function (e, t) {var n,i = void 0 === t;if (i && (t = this.offset), !this.noAssert) {if ("number" != typeof e) throw TypeError("Illegal value: " + e + " (not a number)");if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);}return (t += 4) > (n = this.buffer.byteLength) && this.resize((n *= 2) > t ? n : t), t -= 4, r(this.view, e, t, this.littleEndian, 23, 4), i && (this.offset += 4), this;}, s.writeFloat = s.writeFloat32, s.readFloat32 = function (e) {var t,n = void 0 === e;if (n && (e = this.offset), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");if ((e >>>= 0) < 0 || e + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+4) <= " + this.buffer.byteLength);}return t = i(this.view, e, this.littleEndian, 23, 4), n && (this.offset += 4), t;}, s.readFloat = s.readFloat32, s.writeFloat64 = function (e, t) {var n,i = void 0 === t;if (i && (t = this.offset), !this.noAssert) {if ("number" != typeof e) throw TypeError("Illegal value: " + e + " (not a number)");if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);}return (t += 8) > (n = this.buffer.byteLength) && this.resize((n *= 2) > t ? n : t), t -= 8, r(this.view, e, t, this.littleEndian, 52, 8), i && (this.offset += 8), this;}, s.writeDouble = s.writeFloat64, s.readFloat64 = function (e) {var t,n = void 0 === e;if (n && (e = this.offset), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");if ((e >>>= 0) < 0 || e + 8 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+8) <= " + this.buffer.byteLength);}return t = i(this.view, e, this.littleEndian, 52, 8), n && (this.offset += 8), t;}, s.readDouble = s.readFloat64, h.MAX_VARINT32_BYTES = 5, h.calculateVarint32 = function (e) {return (e >>>= 0) < 128 ? 1 : e < 16384 ? 2 : 1 << 21 > e ? 3 : 1 << 28 > e ? 4 : 5;}, h.zigZagEncode32 = function (e) {return ((e |= 0) << 1 ^ e >> 31) >>> 0;}, h.zigZagDecode32 = function (e) {return 0 | e >>> 1 ^ -(1 & e);}, s.writeVarint32 = function (e, t) {var n,i,r,s = void 0 === t;if (s && (t = this.offset), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal value: " + e + " (not an integer)");if (e |= 0, "number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");if ((t >>>= 0) < 0 || t + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+0) <= " + this.buffer.byteLength);}for ((t += i = h.calculateVarint32(e)) > (r = this.buffer.byteLength) && this.resize((r *= 2) > t ? r : t), t -= i, e >>>= 0; e >= 128;) {n = 128 | 127 & e, this.view[t++] = n, e >>>= 7;}return this.view[t++] = e, s ? (this.offset = t, this) : i;}, s.writeVarint32ZigZag = function (e, t) {return this.writeVarint32(h.zigZagEncode32(e), t);}, s.readVarint32 = function (e) {var t,n,i,r,s = void 0 === e;if (s && (e = this.offset), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");if ((e >>>= 0) < 0 || e + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength);}n = 0, i = 0;do {if (!this.noAssert && e > this.limit) throw (r = Error("Truncated")).truncated = !0, r;t = this.view[e++], n < 5 && (i |= (127 & t) << 7 * n), ++n;} while (0 != (128 & t));return i |= 0, s ? (this.offset = e, i) : { value: i, length: n };}, s.readVarint32ZigZag = function (e) {var t = this.readVarint32(e);return "object" == typeof t ? t.value = h.zigZagDecode32(t.value) : t = h.zigZagDecode32(t), t;}, e && (h.MAX_VARINT64_BYTES = 10, h.calculateVarint64 = function (t) {"number" == typeof t ? t = e.fromNumber(t) : "string" == typeof t && (t = e.fromString(t));var n = t.toInt() >>> 0,i = t.shiftRightUnsigned(28).toInt() >>> 0,r = t.shiftRightUnsigned(56).toInt() >>> 0;return 0 == r ? 0 == i ? n < 16384 ? n < 128 ? 1 : 2 : 1 << 21 > n ? 3 : 4 : i < 16384 ? i < 128 ? 5 : 6 : 1 << 21 > i ? 7 : 8 : r < 128 ? 9 : 10;}, h.zigZagEncode64 = function (t) {return "number" == typeof t ? t = e.fromNumber(t, !1) : "string" == typeof t ? t = e.fromString(t, !1) : !1 !== t.unsigned && (t = t.toSigned()), t.shiftLeft(1).xor(t.shiftRight(63)).toUnsigned();}, h.zigZagDecode64 = function (t) {return "number" == typeof t ? t = e.fromNumber(t, !1) : "string" == typeof t ? t = e.fromString(t, !1) : !1 !== t.unsigned && (t = t.toSigned()), t.shiftRightUnsigned(1).xor(t.and(e.ONE).toSigned().negate()).toSigned();}, s.writeVarint64 = function (t, n) {var i,r,s,o,a,u = void 0 === n;if (u && (n = this.offset), !this.noAssert) {if ("number" == typeof t) t = e.fromNumber(t);else if ("string" == typeof t) t = e.fromString(t);else if (!(t && t instanceof e)) throw TypeError("Illegal value: " + t + " (not an integer or Long)");if ("number" != typeof n || n % 1 != 0) throw TypeError("Illegal offset: " + n + " (not an integer)");if ((n >>>= 0) < 0 || n + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + n + " (+0) <= " + this.buffer.byteLength);}switch ("number" == typeof t ? t = e.fromNumber(t, !1) : "string" == typeof t ? t = e.fromString(t, !1) : !1 !== t.unsigned && (t = t.toSigned()), i = h.calculateVarint64(t), r = t.toInt() >>> 0, s = t.shiftRightUnsigned(28).toInt() >>> 0, o = t.shiftRightUnsigned(56).toInt() >>> 0, (n += i) > (a = this.buffer.byteLength) && this.resize((a *= 2) > n ? a : n), n -= i, i) {case 10:this.view[n + 9] = 1 & o >>> 7;case 9:this.view[n + 8] = 9 !== i ? 128 | o : 127 & o;case 8:this.view[n + 7] = 8 !== i ? 128 | s >>> 21 : 127 & s >>> 21;case 7:this.view[n + 6] = 7 !== i ? 128 | s >>> 14 : 127 & s >>> 14;case 6:this.view[n + 5] = 6 !== i ? 128 | s >>> 7 : 127 & s >>> 7;case 5:this.view[n + 4] = 5 !== i ? 128 | s : 127 & s;case 4:this.view[n + 3] = 4 !== i ? 128 | r >>> 21 : 127 & r >>> 21;case 3:this.view[n + 2] = 3 !== i ? 128 | r >>> 14 : 127 & r >>> 14;case 2:this.view[n + 1] = 2 !== i ? 128 | r >>> 7 : 127 & r >>> 7;case 1:this.view[n] = 1 !== i ? 128 | r : 127 & r;}return u ? (this.offset += i, this) : i;}, s.writeVarint64ZigZag = function (e, t) {return this.writeVarint64(h.zigZagEncode64(e), t);}, s.readVarint64 = function (t) {var n,i,r,s,o,a,u = void 0 === t;if (u && (t = this.offset), !this.noAssert) {if ("number" != typeof t || t % 1 != 0) throw TypeError("Illegal offset: " + t + " (not an integer)");if ((t >>>= 0) < 0 || t + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + t + " (+1) <= " + this.buffer.byteLength);}if (n = t, i = 0, r = 0, s = 0, o = 0, i = 127 & (o = this.view[t++]), 128 & o && (i |= (127 & (o = this.view[t++])) << 7, (128 & o || this.noAssert && void 0 === o) && (i |= (127 & (o = this.view[t++])) << 14, (128 & o || this.noAssert && void 0 === o) && (i |= (127 & (o = this.view[t++])) << 21, (128 & o || this.noAssert && void 0 === o) && (r = 127 & (o = this.view[t++]), (128 & o || this.noAssert && void 0 === o) && (r |= (127 & (o = this.view[t++])) << 7, (128 & o || this.noAssert && void 0 === o) && (r |= (127 & (o = this.view[t++])) << 14, (128 & o || this.noAssert && void 0 === o) && (r |= (127 & (o = this.view[t++])) << 21, (128 & o || this.noAssert && void 0 === o) && (s = 127 & (o = this.view[t++]), (128 & o || this.noAssert && void 0 === o) && (s |= (127 & (o = this.view[t++])) << 7, 128 & o || this.noAssert && void 0 === o)))))))))) throw Error("Buffer overrun");return a = e.fromBits(i | r << 28, r >>> 4 | s << 24, !1), u ? (this.offset = t, a) : { value: a, length: t - n };}, s.readVarint64ZigZag = function (t) {var n = this.readVarint64(t);return n && n.value instanceof e ? n.value = h.zigZagDecode64(n.value) : n = h.zigZagDecode64(n), n;}), s.writeCString = function (e, n) {var i,r,s,o = void 0 === n;if (o && (n = this.offset), r = e.length, !this.noAssert) {if ("string" != typeof e) throw TypeError("Illegal str: Not a string");for (i = 0; r > i; ++i) {if (0 === e.charCodeAt(i)) throw RangeError("Illegal str: Contains NULL-characters");}if ("number" != typeof n || n % 1 != 0) throw TypeError("Illegal offset: " + n + " (not an integer)");if ((n >>>= 0) < 0 || n + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + n + " (+0) <= " + this.buffer.byteLength);}return r = c.calculateUTF16asUTF8(t(e))[1], n += r + 1, s = this.buffer.byteLength, n > s && this.resize((s *= 2) > n ? s : n), n -= r + 1, c.encodeUTF16toUTF8(t(e), function (e) {this.view[n++] = e;}.bind(this)), this.view[n++] = 0, o ? (this.offset = n, this) : r;}, s.readCString = function (e) {var t,i,r,s = void 0 === e;if (s && (e = this.offset), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");if ((e >>>= 0) < 0 || e + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength);}return t = e, r = -1, c.decodeUTF8toUTF16(function () {if (0 === r) return null;if (e >= this.limit) throw RangeError("Illegal range: Truncated data, " + e + " < " + this.limit);return 0 === (r = this.view[e++]) ? null : r;}.bind(this), i = n(), !0), s ? (this.offset = e, i()) : { string: i(), length: e - t };}, s.writeIString = function (e, n) {var i,r,s,o = void 0 === n;if (o && (n = this.offset), !this.noAssert) {if ("string" != typeof e) throw TypeError("Illegal str: Not a string");if ("number" != typeof n || n % 1 != 0) throw TypeError("Illegal offset: " + n + " (not an integer)");if ((n >>>= 0) < 0 || n + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + n + " (+0) <= " + this.buffer.byteLength);}if (r = n, i = c.calculateUTF16asUTF8(t(e), this.noAssert)[1], n += 4 + i, s = this.buffer.byteLength, n > s && this.resize((s *= 2) > n ? s : n), n -= 4 + i, this.littleEndian ? (this.view[n + 3] = 255 & i >>> 24, this.view[n + 2] = 255 & i >>> 16, this.view[n + 1] = 255 & i >>> 8, this.view[n] = 255 & i) : (this.view[n] = 255 & i >>> 24, this.view[n + 1] = 255 & i >>> 16, this.view[n + 2] = 255 & i >>> 8, this.view[n + 3] = 255 & i), n += 4, c.encodeUTF16toUTF8(t(e), function (e) {this.view[n++] = e;}.bind(this)), n !== r + 4 + i) throw RangeError("Illegal range: Truncated data, " + n + " == " + (n + 4 + i));return o ? (this.offset = n, this) : n - r;}, s.readIString = function (e) {var t,n,i,r = void 0 === e;if (r && (e = this.offset), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");if ((e >>>= 0) < 0 || e + 4 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+4) <= " + this.buffer.byteLength);}return t = e, n = this.readUint32(e), i = this.readUTF8String(n, h.METRICS_BYTES, e += 4), e += i.length, r ? (this.offset = e, i.string) : { string: i.string, length: e - t };}, h.METRICS_CHARS = "c", h.METRICS_BYTES = "b", s.writeUTF8String = function (e, n) {var i,r,s,o = void 0 === n;if (o && (n = this.offset), !this.noAssert) {if ("number" != typeof n || n % 1 != 0) throw TypeError("Illegal offset: " + n + " (not an integer)");if ((n >>>= 0) < 0 || n + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + n + " (+0) <= " + this.buffer.byteLength);}return r = n, i = c.calculateUTF16asUTF8(t(e))[1], n += i, s = this.buffer.byteLength, n > s && this.resize((s *= 2) > n ? s : n), n -= i, c.encodeUTF16toUTF8(t(e), function (e) {this.view[n++] = e;}.bind(this)), o ? (this.offset = n, this) : n - r;}, s.writeString = s.writeUTF8String, h.calculateUTF8Chars = function (e) {return c.calculateUTF16asUTF8(t(e))[0];}, h.calculateUTF8Bytes = function (e) {return c.calculateUTF16asUTF8(t(e))[1];}, h.calculateString = h.calculateUTF8Bytes, s.readUTF8String = function (e, t, i) {var r, s, o, a, u;if ("number" == typeof t && (i = t, t = void 0), (r = void 0 === i) && (i = this.offset), void 0 === t && (t = h.METRICS_CHARS), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal length: " + e + " (not an integer)");if (e |= 0, "number" != typeof i || i % 1 != 0) throw TypeError("Illegal offset: " + i + " (not an integer)");if ((i >>>= 0) < 0 || i + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+0) <= " + this.buffer.byteLength);}if (o = 0, a = i, t === h.METRICS_CHARS) {if (s = n(), c.decodeUTF8(function () {return e > o && i < this.limit ? this.view[i++] : null;}.bind(this), function (e) {++o, c.UTF8toUTF16(e, s);}), o !== e) throw RangeError("Illegal range: Truncated data, " + o + " == " + e);return r ? (this.offset = i, s()) : { string: s(), length: i - a };}if (t === h.METRICS_BYTES) {if (!this.noAssert) {if ("number" != typeof i || i % 1 != 0) throw TypeError("Illegal offset: " + i + " (not an integer)");if ((i >>>= 0) < 0 || i + e > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + i + " (+" + e + ") <= " + this.buffer.byteLength);}if (u = i + e, c.decodeUTF8toUTF16(function () {return u > i ? this.view[i++] : null;}.bind(this), s = n(), this.noAssert), i !== u) throw RangeError("Illegal range: Truncated data, " + i + " == " + u);return r ? (this.offset = i, s()) : { string: s(), length: i - a };}throw TypeError("Unsupported metrics: " + t);}, s.readString = s.readUTF8String, s.writeVString = function (e, n) {var i,r,s,o,a = void 0 === n;if (a && (n = this.offset), !this.noAssert) {if ("string" != typeof e) throw TypeError("Illegal str: Not a string");if ("number" != typeof n || n % 1 != 0) throw TypeError("Illegal offset: " + n + " (not an integer)");if ((n >>>= 0) < 0 || n + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + n + " (+0) <= " + this.buffer.byteLength);}if (s = n, i = c.calculateUTF16asUTF8(t(e), this.noAssert)[1], r = h.calculateVarint32(i), n += r + i, o = this.buffer.byteLength, n > o && this.resize((o *= 2) > n ? o : n), n -= r + i, n += this.writeVarint32(i, n), c.encodeUTF16toUTF8(t(e), function (e) {this.view[n++] = e;}.bind(this)), n !== s + i + r) throw RangeError("Illegal range: Truncated data, " + n + " == " + (n + i + r));return a ? (this.offset = n, this) : n - s;}, s.readVString = function (e) {var t,n,i,r = void 0 === e;if (r && (e = this.offset), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");if ((e >>>= 0) < 0 || e + 1 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+1) <= " + this.buffer.byteLength);}return t = e, n = this.readVarint32(e), i = this.readUTF8String(n.value, h.METRICS_BYTES, e += n.length), e += i.length, r ? (this.offset = e, i.string) : { string: i.string, length: e - t };}, s.append = function (e, t, n) {var i, r, s;if (("number" == typeof t || "string" != typeof t) && (n = t, t = void 0), (i = void 0 === n) && (n = this.offset), !this.noAssert) {if ("number" != typeof n || n % 1 != 0) throw TypeError("Illegal offset: " + n + " (not an integer)");if ((n >>>= 0) < 0 || n + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + n + " (+0) <= " + this.buffer.byteLength);}return e instanceof h || (e = h.wrap(e, t)), (r = e.limit - e.offset) <= 0 || ((n += r) > (s = this.buffer.byteLength) && this.resize((s *= 2) > n ? s : n), n -= r, this.view.set(e.view.subarray(e.offset, e.limit), n), e.offset += r, i && (this.offset += r)), this;}, s.appendTo = function (e, t) {return e.append(this, t), this;}, s.assert = function (e) {return this.noAssert = !e, this;}, s.capacity = function () {return this.buffer.byteLength;}, s.clear = function () {return this.offset = 0, this.limit = this.buffer.byteLength, this.markedOffset = -1, this;}, s.clone = function (e) {var t = new h(0, this.littleEndian, this.noAssert);return e ? (t.buffer = new ArrayBuffer(this.buffer.byteLength), t.view = new Uint8Array(t.buffer)) : (t.buffer = this.buffer, t.view = this.view), t.offset = this.offset, t.markedOffset = this.markedOffset, t.limit = this.limit, t;}, s.compact = function (e, t) {var n, i, r;if (void 0 === e && (e = this.offset), void 0 === t && (t = this.limit), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal begin: Not an integer");if (e >>>= 0, "number" != typeof t || t % 1 != 0) throw TypeError("Illegal end: Not an integer");if (t >>>= 0, e < 0 || e > t || t > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength);}return 0 === e && t === this.buffer.byteLength ? this : 0 == (n = t - e) ? (this.buffer = o, this.view = null, this.markedOffset >= 0 && (this.markedOffset -= e), this.offset = 0, this.limit = 0, this) : (i = new ArrayBuffer(n), (r = new Uint8Array(i)).set(this.view.subarray(e, t)), this.buffer = i, this.view = r, this.markedOffset >= 0 && (this.markedOffset -= e), this.offset = 0, this.limit = n, this);}, s.copy = function (e, t) {if (void 0 === e && (e = this.offset), void 0 === t && (t = this.limit), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal begin: Not an integer");if (e >>>= 0, "number" != typeof t || t % 1 != 0) throw TypeError("Illegal end: Not an integer");if (t >>>= 0, e < 0 || e > t || t > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength);}if (e === t) return new h(0, this.littleEndian, this.noAssert);var n = t - e,i = new h(n, this.littleEndian, this.noAssert);return i.offset = 0, i.limit = n, i.markedOffset >= 0 && (i.markedOffset -= e), this.copyTo(i, 0, e, t), i;}, s.copyTo = function (e, t, n, i) {var r, s, o;if (!this.noAssert && !h.isByteBuffer(e)) throw TypeError("Illegal target: Not a ByteBuffer");if (t = (s = void 0 === t) ? e.offset : 0 | t, n = (r = void 0 === n) ? this.offset : 0 | n, i = void 0 === i ? this.limit : 0 | i, t < 0 || t > e.buffer.byteLength) throw RangeError("Illegal target range: 0 <= " + t + " <= " + e.buffer.byteLength);if (n < 0 || i > this.buffer.byteLength) throw RangeError("Illegal source range: 0 <= " + n + " <= " + this.buffer.byteLength);return 0 == (o = i - n) ? e : (e.ensureCapacity(t + o), e.view.set(this.view.subarray(n, i), t), r && (this.offset += o), s && (e.offset += o), this);}, s.ensureCapacity = function (e) {var t = this.buffer.byteLength;return e > t ? this.resize((t *= 2) > e ? t : e) : this;}, s.fill = function (e, t, n) {var i = void 0 === t;if (i && (t = this.offset), "string" == typeof e && e.length > 0 && (e = e.charCodeAt(0)), void 0 === t && (t = this.offset), void 0 === n && (n = this.limit), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal value: " + e + " (not an integer)");if (e |= 0, "number" != typeof t || t % 1 != 0) throw TypeError("Illegal begin: Not an integer");if (t >>>= 0, "number" != typeof n || n % 1 != 0) throw TypeError("Illegal end: Not an integer");if (n >>>= 0, t < 0 || t > n || n > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + t + " <= " + n + " <= " + this.buffer.byteLength);}if (t >= n) return this;for (; n > t;) {this.view[t++] = e;}return i && (this.offset = t), this;}, s.flip = function () {return this.limit = this.offset, this.offset = 0, this;}, s.mark = function (e) {if (e = void 0 === e ? this.offset : e, !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal offset: " + e + " (not an integer)");if ((e >>>= 0) < 0 || e + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + e + " (+0) <= " + this.buffer.byteLength);}return this.markedOffset = e, this;}, s.order = function (e) {if (!this.noAssert && "boolean" != typeof e) throw TypeError("Illegal littleEndian: Not a boolean");return this.littleEndian = !!e, this;}, s.LE = function (e) {return this.littleEndian = void 0 === e || !!e, this;}, s.BE = function (e) {return this.littleEndian = void 0 !== e && !e, this;}, s.prepend = function (e, t, n) {var i, r, s, o, a;if (("number" == typeof t || "string" != typeof t) && (n = t, t = void 0), (i = void 0 === n) && (n = this.offset), !this.noAssert) {if ("number" != typeof n || n % 1 != 0) throw TypeError("Illegal offset: " + n + " (not an integer)");if ((n >>>= 0) < 0 || n + 0 > this.buffer.byteLength) throw RangeError("Illegal offset: 0 <= " + n + " (+0) <= " + this.buffer.byteLength);}return e instanceof h || (e = h.wrap(e, t)), (r = e.limit - e.offset) <= 0 || ((s = r - n) > 0 ? (o = new ArrayBuffer(this.buffer.byteLength + s), (a = new Uint8Array(o)).set(this.view.subarray(n, this.buffer.byteLength), r), this.buffer = o, this.view = a, this.offset += s, this.markedOffset >= 0 && (this.markedOffset += s), this.limit += s, n += s) : new Uint8Array(this.buffer), this.view.set(e.view.subarray(e.offset, e.limit), n - r), e.offset = e.limit, i && (this.offset -= r)), this;}, s.prependTo = function (e, t) {return e.prepend(this, t), this;}, s.printDebug = function (e) {"function" != typeof e && (e = console.log.bind(console)), e(this.toString() + "\n-------------------------------------------------------------------\n" + this.toDebug(!0));}, s.remaining = function () {return this.limit - this.offset;}, s.reset = function () {return this.markedOffset >= 0 ? (this.offset = this.markedOffset, this.markedOffset = -1) : this.offset = 0, this;}, s.resize = function (e) {var t, n;if (!this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal capacity: " + e + " (not an integer)");if ((e |= 0) < 0) throw RangeError("Illegal capacity: 0 <= " + e);}return this.buffer.byteLength < e && (t = new ArrayBuffer(e), (n = new Uint8Array(t)).set(this.view), this.buffer = t, this.view = n), this;}, s.reverse = function (e, t) {if (void 0 === e && (e = this.offset), void 0 === t && (t = this.limit), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal begin: Not an integer");if (e >>>= 0, "number" != typeof t || t % 1 != 0) throw TypeError("Illegal end: Not an integer");if (t >>>= 0, e < 0 || e > t || t > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength);}return e === t || Array.prototype.reverse.call(this.view.subarray(e, t)), this;}, s.skip = function (e) {if (!this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal length: " + e + " (not an integer)");e |= 0;}var t = this.offset + e;if (!this.noAssert && (t < 0 || t > this.buffer.byteLength)) throw RangeError("Illegal length: 0 <= " + this.offset + " + " + e + " <= " + this.buffer.byteLength);return this.offset = t, this;}, s.slice = function (e, t) {if (void 0 === e && (e = this.offset), void 0 === t && (t = this.limit), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal begin: Not an integer");if (e >>>= 0, "number" != typeof t || t % 1 != 0) throw TypeError("Illegal end: Not an integer");if (t >>>= 0, e < 0 || e > t || t > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength);}var n = this.clone();return n.offset = e, n.limit = t, n;}, s.toBuffer = function (e) {var t,n = this.offset,i = this.limit;if (!this.noAssert) {if ("number" != typeof n || n % 1 != 0) throw TypeError("Illegal offset: Not an integer");if (n >>>= 0, "number" != typeof i || i % 1 != 0) throw TypeError("Illegal limit: Not an integer");if (i >>>= 0, n < 0 || n > i || i > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + n + " <= " + i + " <= " + this.buffer.byteLength);}return e || 0 !== n || i !== this.buffer.byteLength ? n === i ? o : (t = new ArrayBuffer(i - n), new Uint8Array(t).set(new Uint8Array(this.buffer).subarray(n, i), 0), t) : this.buffer;}, s.toArrayBuffer = s.toBuffer, s.toString = function (e, t, n) {if (void 0 === e) return "ByteBufferAB(offset=" + this.offset + ",markedOffset=" + this.markedOffset + ",limit=" + this.limit + ",capacity=" + this.capacity() + ")";switch ("number" == typeof e && (n = t = e = "utf8"), e) {case "utf8":return this.toUTF8(t, n);case "base64":return this.toBase64(t, n);case "hex":return this.toHex(t, n);case "binary":return this.toBinary(t, n);case "debug":return this.toDebug();case "columns":return this.toColumns();default:throw Error("Unsupported encoding: " + e);}}, u = function () {var e,t,n = {},i = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47],r = [];for (e = 0, t = i.length; t > e; ++e) {r[i[e]] = e;}return n.encode = function (e, t) {for (var n, r; null !== (n = e());) {t(i[63 & n >> 2]), r = (3 & n) << 4, null !== (n = e()) ? (t(i[63 & ((r |= 15 & n >> 4) | 15 & n >> 4)]), r = (15 & n) << 2, null !== (n = e()) ? (t(i[63 & (r | 3 & n >> 6)]), t(i[63 & n])) : (t(i[63 & r]), t(61))) : (t(i[63 & r]), t(61), t(61));}}, n.decode = function (e, t) {function n(e) {throw Error("Illegal character code: " + e);}for (var i, s, o; null !== (i = e());) {if (void 0 === (s = r[i]) && n(i), null !== (i = e()) && (void 0 === (o = r[i]) && n(i), t(s << 2 >>> 0 | (48 & o) >> 4), null !== (i = e()))) {if (void 0 === (s = r[i])) {if (61 === i) break;n(i);}if (t((15 & o) << 4 >>> 0 | (60 & s) >> 2), null !== (i = e())) {if (void 0 === (o = r[i])) {if (61 === i) break;n(i);}t((3 & s) << 6 >>> 0 | o);}}}}, n.test = function (e) {return /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(e);}, n;}(), s.toBase64 = function (e, t) {if (void 0 === e && (e = this.offset), void 0 === t && (t = this.limit), t |= 0, (e |= 0) < 0 || t > this.capacity || e > t) throw RangeError("begin, end");var i;return u.encode(function () {return t > e ? this.view[e++] : null;}.bind(this), i = n()), i();}, h.fromBase64 = function (e, n) {if ("string" != typeof e) throw TypeError("str");var i = new h(e.length / 4 * 3, n),r = 0;return u.decode(t(e), function (e) {i.view[r++] = e;}), i.limit = r, i;}, h.btoa = function (e) {return h.fromBinary(e).toBase64();}, h.atob = function (e) {return h.fromBase64(e).toBinary();}, s.toBinary = function (e, t) {if (void 0 === e && (e = this.offset), void 0 === t && (t = this.limit), t |= 0, (e |= 0) < 0 || t > this.capacity() || e > t) throw RangeError("begin, end");if (e === t) return "";for (var n = [], i = []; t > e;) {n.push(this.view[e++]), n.length >= 1024 && (i.push(String.fromCharCode.apply(String, n)), n = []);}return i.join("") + String.fromCharCode.apply(String, n);}, h.fromBinary = function (e, t) {if ("string" != typeof e) throw TypeError("str");for (var n, i = 0, r = e.length, s = new h(r, t); r > i;) {if ((n = e.charCodeAt(i)) > 255) throw RangeError("illegal char code: " + n);s.view[i++] = n;}return s.limit = r, s;}, s.toDebug = function (e) {for (var t, n = -1, i = this.buffer.byteLength, r = "", s = "", o = ""; i > n;) {if (-1 !== n && (r += (t = this.view[n]) < 16 ? "0" + t.toString(16).toUpperCase() : t.toString(16).toUpperCase(), e && (s += t > 32 && t < 127 ? String.fromCharCode(t) : ".")), ++n, e && n > 0 && n % 16 == 0 && n !== i) {for (; r.length < 51;) {r += " ";}o += r + s + "\n", r = s = "";}r += n === this.offset && n === this.limit ? n === this.markedOffset ? "!" : "|" : n === this.offset ? n === this.markedOffset ? "[" : "<" : n === this.limit ? n === this.markedOffset ? "]" : ">" : n === this.markedOffset ? "'" : e || 0 !== n && n !== i ? " " : "";}if (e && " " !== r) {for (; r.length < 51;) {r += " ";}o += r + s + "\n";}return e ? o : r;}, h.fromDebug = function (e, t, n) {for (var i, r, s = e.length, o = new h(0 | (s + 1) / 3, t, n), a = 0, u = 0, c = !1, l = !1, f = !1, d = !1, p = !1; s > a;) {switch (i = e.charAt(a++)) {case "!":if (!n) {if (l || f || d) {p = !0;break;}l = f = d = !0;}o.offset = o.markedOffset = o.limit = u, c = !1;break;case "|":if (!n) {if (l || d) {p = !0;break;}l = d = !0;}o.offset = o.limit = u, c = !1;break;case "[":if (!n) {if (l || f) {p = !0;break;}l = f = !0;}o.offset = o.markedOffset = u, c = !1;break;case "<":if (!n) {if (l) {p = !0;break;}l = !0;}o.offset = u, c = !1;break;case "]":if (!n) {if (d || f) {p = !0;break;}d = f = !0;}o.limit = o.markedOffset = u, c = !1;break;case ">":if (!n) {if (d) {p = !0;break;}d = !0;}o.limit = u, c = !1;break;case "'":if (!n) {if (f) {p = !0;break;}f = !0;}o.markedOffset = u, c = !1;break;case " ":c = !1;break;default:if (!n && c) {p = !0;break;}if (r = parseInt(i + e.charAt(a++), 16), !n && (isNaN(r) || r < 0 || r > 255)) throw TypeError("Illegal str: Not a debug encoded string");o.view[u++] = r, c = !0;}if (p) throw TypeError("Illegal str: Invalid symbol at " + a);}if (!n) {if (!l || !d) throw TypeError("Illegal str: Missing offset or limit");if (u < o.buffer.byteLength) throw TypeError("Illegal str: Not a debug encoded string (is it hex?) " + u + " < " + s);}return o;}, s.toHex = function (e, t) {if (e = void 0 === e ? this.offset : e, t = void 0 === t ? this.limit : t, !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal begin: Not an integer");if (e >>>= 0, "number" != typeof t || t % 1 != 0) throw TypeError("Illegal end: Not an integer");if (t >>>= 0, e < 0 || e > t || t > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength);}for (var n, i = new Array(t - e); t > e;) {(n = this.view[e++]) < 16 ? i.push("0", n.toString(16)) : i.push(n.toString(16));}return i.join("");}, h.fromHex = function (e, t, n) {var i, r, s, o, a;if (!n) {if ("string" != typeof e) throw TypeError("Illegal str: Not a string");if (e.length % 2 != 0) throw TypeError("Illegal str: Length not a multiple of 2");}for (r = e.length, s = new h(0 | r / 2, t), o = 0, a = 0; r > o; o += 2) {if (i = parseInt(e.substring(o, o + 2), 16), !n && (!isFinite(i) || i < 0 || i > 255)) throw TypeError("Illegal str: Contains non-hex characters");s.view[a++] = i;}return s.limit = a, s;}, c = function () {var e = { MAX_CODEPOINT: 1114111, encodeUTF8: function encodeUTF8(e, t) {var n = null;for ("number" == typeof e && (n = e, e = function e() {return null;}); null !== n || null !== (n = e());) {n < 128 ? t(127 & n) : n < 2048 ? (t(192 | 31 & n >> 6), t(128 | 63 & n)) : n < 65536 ? (t(224 | 15 & n >> 12), t(128 | 63 & n >> 6), t(128 | 63 & n)) : (t(240 | 7 & n >> 18), t(128 | 63 & n >> 12), t(128 | 63 & n >> 6), t(128 | 63 & n)), n = null;}}, decodeUTF8: function decodeUTF8(e, t) {for (var n, i, r, s, o = function o(e) {e = e.slice(0, e.indexOf(null));var t = Error(e.toString());throw t.name = "TruncatedError", t.bytes = e, t;}; null !== (n = e());) {if (0 == (128 & n)) t(n);else if (192 == (224 & n)) null === (i = e()) && o([n, i]), t((31 & n) << 6 | 63 & i);else if (224 == (240 & n)) (null === (i = e()) || null === (r = e())) && o([n, i, r]), t((15 & n) << 12 | (63 & i) << 6 | 63 & r);else {if (240 != (248 & n)) throw RangeError("Illegal starting byte: " + n);(null === (i = e()) || null === (r = e()) || null === (s = e())) && o([n, i, r, s]), t((7 & n) << 18 | (63 & i) << 12 | (63 & r) << 6 | 63 & s);}}}, UTF16toUTF8: function UTF16toUTF8(e, t) {for (var n, i = null; null !== (n = null !== i ? i : e());) {n >= 55296 && n <= 57343 && null !== (i = e()) && i >= 56320 && i <= 57343 ? (t(1024 * (n - 55296) + i - 56320 + 65536), i = null) : t(n);}null !== i && t(i);}, UTF8toUTF16: function UTF8toUTF16(e, t) {var n = null;for ("number" == typeof e && (n = e, e = function e() {return null;}); null !== n || null !== (n = e());) {n <= 65535 ? t(n) : (t(55296 + ((n -= 65536) >> 10)), t(n % 1024 + 56320)), n = null;}}, encodeUTF16toUTF8: function encodeUTF16toUTF8(t, n) {e.UTF16toUTF8(t, function (t) {e.encodeUTF8(t, n);});}, decodeUTF8toUTF16: function decodeUTF8toUTF16(t, n) {e.decodeUTF8(t, function (t) {e.UTF8toUTF16(t, n);});}, calculateCodePoint: function calculateCodePoint(e) {return e < 128 ? 1 : e < 2048 ? 2 : e < 65536 ? 3 : 4;}, calculateUTF8: function calculateUTF8(e) {for (var t, n = 0; null !== (t = e());) {n += t < 128 ? 1 : t < 2048 ? 2 : t < 65536 ? 3 : 4;}return n;}, calculateUTF16asUTF8: function calculateUTF16asUTF8(t) {var n = 0,i = 0;return e.UTF16toUTF8(t, function (e) {++n, i += e < 128 ? 1 : e < 2048 ? 2 : e < 65536 ? 3 : 4;}), [n, i];} };return e;}(), s.toUTF8 = function (e, t) {if (void 0 === e && (e = this.offset), void 0 === t && (t = this.limit), !this.noAssert) {if ("number" != typeof e || e % 1 != 0) throw TypeError("Illegal begin: Not an integer");if (e >>>= 0, "number" != typeof t || t % 1 != 0) throw TypeError("Illegal end: Not an integer");if (t >>>= 0, e < 0 || e > t || t > this.buffer.byteLength) throw RangeError("Illegal range: 0 <= " + e + " <= " + t + " <= " + this.buffer.byteLength);}var i;try {c.decodeUTF8toUTF16(function () {return t > e ? this.view[e++] : null;}.bind(this), i = n());} catch (n) {if (e !== t) throw RangeError("Illegal range: Truncated data, " + e + " != " + t);}return i();}, h.fromUTF8 = function (e, n, i) {if (!i && "string" != typeof e) throw TypeError("Illegal str: Not a string");var r = new h(c.calculateUTF16asUTF8(t(e), !0)[1], n, i),s = 0;return c.encodeUTF16toUTF8(t(e), function (e) {r.view[s++] = e;}), r.limit = s, r;}, h;}(ni = function () {function e(e, t, n) {this.low = 0 | e, this.high = 0 | t, this.unsigned = !!n;}function t(e) {return !0 === (e && e.__isLong__);}function n(e, t) {var n, i, s;return t ? (s = (e >>>= 0) >= 0 && e < 256) && (i = u[e]) ? i : (n = r(e, (0 | e) < 0 ? -1 : 0, !0), s && (u[e] = n), n) : (s = (e |= 0) >= -128 && e < 128) && (i = a[e]) ? i : (n = r(e, e < 0 ? -1 : 0, !1), s && (a[e] = n), n);}function i(e, t) {if (isNaN(e) || !isFinite(e)) return t ? g : p;if (t) {if (e < 0) return g;if (e >= l) return v;} else {if (-f >= e) return T;if (e + 1 >= f) return m;}return e < 0 ? i(-e, t).neg() : r(0 | e % h, 0 | e / h, t);}function r(t, n, i) {return new e(t, n, i);}function s(e, t, n) {var r, o, a, u, h, l, f;if (0 === e.length) throw Error("empty string");if ("NaN" === e || "Infinity" === e || "+Infinity" === e || "-Infinity" === e) return p;if ("number" == typeof t ? (n = t, t = !1) : t = !!t, (n = n || 10) < 2 || n > 36) throw RangeError("radix");if ((r = e.indexOf("-")) > 0) throw Error("interior hyphen");if (0 === r) return s(e.substring(1), t, n).neg();for (o = i(c(n, 8)), a = p, u = 0; u < e.length; u += 8) {h = Math.min(8, e.length - u), l = parseInt(e.substring(u, u + h), n), h < 8 ? (f = i(c(n, h)), a = a.mul(f).add(i(l))) : a = (a = a.mul(o)).add(i(l));}return a.unsigned = t, a;}function o(t) {return t instanceof e ? t : "number" == typeof t ? i(t) : "string" == typeof t ? s(t) : r(t.low, t.high, t.unsigned);}var a, u, c, h, l, f, d, p, g, _, y, E, m, v, T, I;return e.prototype.__isLong__, Object.defineProperty(e.prototype, "__isLong__", { value: !0, enumerable: !1, configurable: !1 }), e.isLong = t, a = {}, u = {}, e.fromInt = n, e.fromNumber = i, e.fromBits = r, c = Math.pow, e.fromString = s, e.fromValue = o, f = (l = (h = 4294967296) * h) / 2, d = n(16777216), p = n(0), e.ZERO = p, g = n(0, !0), e.UZERO = g, _ = n(1), e.ONE = _, y = n(1, !0), e.UONE = y, E = n(-1), e.NEG_ONE = E, m = r(-1, 2147483647, !1), e.MAX_VALUE = m, v = r(-1, -1, !0), e.MAX_UNSIGNED_VALUE = v, T = r(0, -2147483648, !1), e.MIN_VALUE = T, (I = e.prototype).toInt = function () {return this.unsigned ? this.low >>> 0 : this.low;}, I.toNumber = function () {return this.unsigned ? (this.high >>> 0) * h + (this.low >>> 0) : this.high * h + (this.low >>> 0);}, I.toString = function (e) {var t, n, r, s, o, a, u, h;if ((e = e || 10) < 2 || e > 36) throw RangeError("radix");if (this.isZero()) return "0";if (this.isNegative()) return this.eq(T) ? (t = i(e), r = (n = this.div(t)).mul(t).sub(this), n.toString(e) + r.toInt().toString(e)) : "-" + this.neg().toString(e);for (s = i(c(e, 6), this.unsigned), o = this, a = "";;) {if (u = o.div(s), h = (o.sub(u.mul(s)).toInt() >>> 0).toString(e), (o = u).isZero()) return h + a;for (; h.length < 6;) {h = "0" + h;}a = "" + h + a;}}, I.getHighBits = function () {return this.high;}, I.getHighBitsUnsigned = function () {return this.high >>> 0;}, I.getLowBits = function () {return this.low;}, I.getLowBitsUnsigned = function () {return this.low >>> 0;}, I.getNumBitsAbs = function () {var e, t;if (this.isNegative()) return this.eq(T) ? 64 : this.neg().getNumBitsAbs();for (e = 0 != this.high ? this.high : this.low, t = 31; t > 0 && 0 == (e & 1 << t); t--) {;}return 0 != this.high ? t + 33 : t + 1;}, I.isZero = function () {return 0 === this.high && 0 === this.low;}, I.isNegative = function () {return !this.unsigned && this.high < 0;}, I.isPositive = function () {return this.unsigned || this.high >= 0;}, I.isOdd = function () {return 1 == (1 & this.low);}, I.isEven = function () {return 0 == (1 & this.low);}, I.equals = function (e) {return t(e) || (e = o(e)), (this.unsigned === e.unsigned || this.high >>> 31 != 1 || e.high >>> 31 != 1) && this.high === e.high && this.low === e.low;}, I.eq = I.equals, I.notEquals = function (e) {return !this.eq(e);}, I.neq = I.notEquals, I.lessThan = function (e) {return this.comp(e) < 0;}, I.lt = I.lessThan, I.lessThanOrEqual = function (e) {return this.comp(e) <= 0;}, I.lte = I.lessThanOrEqual, I.greaterThan = function (e) {return this.comp(e) > 0;}, I.gt = I.greaterThan, I.greaterThanOrEqual = function (e) {return this.comp(e) >= 0;}, I.gte = I.greaterThanOrEqual, I.compare = function (e) {if (t(e) || (e = o(e)), this.eq(e)) return 0;var n = this.isNegative(),i = e.isNegative();return n && !i ? -1 : !n && i ? 1 : this.unsigned ? e.high >>> 0 > this.high >>> 0 || e.high === this.high && e.low >>> 0 > this.low >>> 0 ? -1 : 1 : this.sub(e).isNegative() ? -1 : 1;}, I.comp = I.compare, I.negate = function () {return !this.unsigned && this.eq(T) ? T : this.not().add(_);}, I.neg = I.negate, I.add = function (e) {var n, i, s, a, u, c, h, l, f, d, p;return t(e) || (e = o(e)), n = this.high >>> 16, i = 65535 & this.high, s = this.low >>> 16, a = 65535 & this.low, u = e.high >>> 16, c = 65535 & e.high, h = e.low >>> 16, l = 0, f = 0, d = 0, p = 0, d += (p += a + (65535 & e.low)) >>> 16, f += (d += s + h) >>> 16, l += (f += i + c) >>> 16, l += n + u, r((d &= 65535) << 16 | (p &= 65535), (l &= 65535) << 16 | (f &= 65535), this.unsigned);}, I.subtract = function (e) {return t(e) || (e = o(e)), this.add(e.neg());}, I.sub = I.subtract, I.multiply = function (e) {var n, s, a, u, c, h, l, f, g, _, y, E;return this.isZero() ? p : (t(e) || (e = o(e)), e.isZero() ? p : this.eq(T) ? e.isOdd() ? T : p : e.eq(T) ? this.isOdd() ? T : p : this.isNegative() ? e.isNegative() ? this.neg().mul(e.neg()) : this.neg().mul(e).neg() : e.isNegative() ? this.mul(e.neg()).neg() : this.lt(d) && e.lt(d) ? i(this.toNumber() * e.toNumber(), this.unsigned) : (n = this.high >>> 16, s = 65535 & this.high, a = this.low >>> 16, u = 65535 & this.low, c = e.high >>> 16, h = 65535 & e.high, l = e.low >>> 16, g = 0, _ = 0, y = 0, E = 0, y += (E += u * (f = 65535 & e.low)) >>> 16, _ += (y += a * f) >>> 16, y &= 65535, _ += (y += u * l) >>> 16, g += (_ += s * f) >>> 16, _ &= 65535, g += (_ += a * l) >>> 16, _ &= 65535, g += (_ += u * h) >>> 16, g += n * f + s * l + a * h + u * c, r((y &= 65535) << 16 | (E &= 65535), (g &= 65535) << 16 | (_ &= 65535), this.unsigned)));}, I.mul = I.multiply, I.divide = function (e) {var n, r, s, a, u, h, l;if (t(e) || (e = o(e)), e.isZero()) throw Error("division by zero");if (this.isZero()) return this.unsigned ? g : p;if (this.unsigned) {if (e.unsigned || (e = e.toUnsigned()), e.gt(this)) return g;if (e.gt(this.shru(1))) return y;s = g;} else {if (this.eq(T)) return e.eq(_) || e.eq(E) ? T : e.eq(T) ? _ : (n = this.shr(1).div(e).shl(1)).eq(p) ? e.isNegative() ? _ : E : (r = this.sub(e.mul(n)), s = n.add(r.div(e)));if (e.eq(T)) return this.unsigned ? g : p;if (this.isNegative()) return e.isNegative() ? this.neg().div(e.neg()) : this.neg().div(e).neg();if (e.isNegative()) return this.div(e.neg()).neg();s = p;}for (r = this; r.gte(e);) {for (n = Math.max(1, Math.floor(r.toNumber() / e.toNumber())), u = (a = Math.ceil(Math.log(n) / Math.LN2)) <= 48 ? 1 : c(2, a - 48), l = (h = i(n)).mul(e); l.isNegative() || l.gt(r);) {l = (h = i(n -= u, this.unsigned)).mul(e);}h.isZero() && (h = _), s = s.add(h), r = r.sub(l);}return s;}, I.div = I.divide, I.modulo = function (e) {return t(e) || (e = o(e)), this.sub(this.div(e).mul(e));}, I.mod = I.modulo, I.not = function () {return r(~this.low, ~this.high, this.unsigned);}, I.and = function (e) {return t(e) || (e = o(e)), r(this.low & e.low, this.high & e.high, this.unsigned);}, I.or = function (e) {return t(e) || (e = o(e)), r(this.low | e.low, this.high | e.high, this.unsigned);}, I.xor = function (e) {return t(e) || (e = o(e)), r(this.low ^ e.low, this.high ^ e.high, this.unsigned);}, I.shiftLeft = function (e) {return t(e) && (e = e.toInt()), 0 == (e &= 63) ? this : e < 32 ? r(this.low << e, this.high << e | this.low >>> 32 - e, this.unsigned) : r(0, this.low << e - 32, this.unsigned);}, I.shl = I.shiftLeft, I.shiftRight = function (e) {return t(e) && (e = e.toInt()), 0 == (e &= 63) ? this : e < 32 ? r(this.low >>> e | this.high << 32 - e, this.high >> e, this.unsigned) : r(this.high >> e - 32, this.high >= 0 ? 0 : -1, this.unsigned);}, I.shr = I.shiftRight, I.shiftRightUnsigned = function (e) {var n;return t(e) && (e = e.toInt()), 0 == (e &= 63) ? this : (n = this.high, e < 32 ? r(this.low >>> e | n << 32 - e, n >>> e, this.unsigned) : r(32 === e ? n : n >>> e - 32, 0, this.unsigned));}, I.shru = I.shiftRightUnsigned, I.toSigned = function () {return this.unsigned ? r(this.low, this.high, !1) : this;}, I.toUnsigned = function () {return this.unsigned ? this : r(this.low, this.high, !0);}, I.toBytes = function (e) {return e ? this.toBytesLE() : this.toBytesBE();}, I.toBytesLE = function () {var e = this.high,t = this.low;return [255 & t, 255 & t >>> 8, 255 & t >>> 16, 255 & t >>> 24, 255 & e, 255 & e >>> 8, 255 & e >>> 16, 255 & e >>> 24];}, I.toBytesBE = function () {var e = this.high,t = this.low;return [255 & e >>> 24, 255 & e >>> 16, 255 & e >>> 8, 255 & e, 255 & t >>> 24, 255 & t >>> 16, 255 & t >>> 8, 255 & t];}, e;}()), ni));oi.getModule = function (e) {var t = new oi[e]();return t.getArrayData = function () {var e = t.toArrayBuffer();return e = ee(e) ? [].slice.call(new Int8Array(e)) : e;}, t;};var ai,ui = "pgMsgP",ci = "chatMsg",hi = "pcMsgP",li = { PRIVATE: "ppMsgS", GROUP: "pgMsgS", CHATROOM: "chatMsgS" },fi = "delMsg",di = "joinChrm",pi = "joinChrmR",gi = "exitChrm",_i = "setKV",yi = "delKV",Ei = "setKVS",mi = "delKVS",vi = "qryRelationR",Ti = "delRelation",Ii = "setSeAtt",Ci = { PRIVATE: "cleanPMsg", GROUP: "cleanGMsg", CUSTOMER_SERVICE: "cleanCMsg", SYSTEM: "cleanSMsg" },Ri = "qryPMsg",Si = "qryGMsg",Ni = "qryCHMsg",Oi = "qryCMsg",wi = "qrySMsg",bi = ((ii = {})["ppMsgP"] = j.PRIVATE, ii[ui] = j.GROUP, ii[ci] = j.CHATROOM, ii[hi] = j.CUSTOMER_SERVICE, ii),Mi = ((ri = {})[j.PRIVATE] = Ri, ri[j.GROUP] = Si, ri[j.CHATROOM] = Ni, ri[j.CUSTOMER_SERVICE] = Oi, ri[j.SYSTEM] = wi, ri),Ai = ((si = {})[j.PRIVATE] = Ci.PRIVATE, si[j.GROUP] = Ci.GROUP, si[j.CUSTOMER_SERVICE] = Ci.CUSTOMER_SERVICE, si[j.SYSTEM] = Ci.SYSTEM, si),Ui = "1",Li = "0",Pi = 1,Di = 2,Vi = 3,ki = function () {function e(e) {this._codec = "websocket" === e ? oi : Zn, this._connectType = e;}return e.prototype.decodeByPBName = function (e, t, n) {var i,r = this,s = e,o = ((i = {})[Ot] = r._formatSyncMessages, i[Nt] = r._formatReceivedMessage, i[Rt] = r._formatSentMessage, i[Pt] = r._formatHistoryMessages, i[Vt] = r._formatConversationList, i[Qt] = r._formatChatRoomInfos, i[Wt] = r._formatRTCUserList, i[rn] = r._formatRTCData, i[vn] = r._formatChatRoomKVList, i[On] = r._formatUserSetting, i[Mn] = r._formatConversationStatus, i[kn] = r._formatGrpReadReceiptQryResp, i[Sn] = r._formatSetUserSettingOutput, i[wn] = r._formatUserSettingNotification, i[Qn] = r._formatRTCRoomKVList, i[nn] = r._formatRTCAuidenceJoinRoomData, i[Wn] = r._formatRTCJoinedUserInfo, i)[t];try {s = e.length > 0 && r._codec[t].decode(e), ie(s) && (s = function (e) {for (var t in e) {ie(e[t]) && (e[t] = et(e[t]));}return e;}(s)), re(o) && (s = o.call(this, s, n));} catch (n) {pe.error("PB parse error\n", n, e, t);}return s;}, e.prototype._readBytes = function (e) {var t = e.offset,n = e.buffer,i = e.limit;if (t) try {var r = ee(n) ? new Uint8Array(n) : n;return Tt.readUTF(r.subarray(t, i));} catch (e) {pe.info("readBytes error\n", e);}return e;}, e.prototype._formatBytes = function (e) {var t = this._readBytes(e);try {t = JSON.parse(t);} catch (e) {pe.info("formatBytes error\n", e);}return t || e;}, e.prototype._formatSyncMessages = function (e, t) {t = t || {};var n = this,i = e.list,r = e.syncTime,s = e.finished;return (se(s) || null === s) && (e.finished = !0), e.syncTime = et(r), e.list = ut(i, function (e) {return n._formatReceivedMessage(e, t);}), e;}, e.prototype._formatReceivedMessage = function (e, t) {var n = (t = t || {}).currentUserId,r = t.connectedTime,s = e.content,o = e.fromUserId,a = e.type,u = e.groupId,c = e.status,h = e.dataTime,l = e.classname,f = e.msgId,d = e.extraContent,p = e.pushContent,g = e.pushExt,_ = e.configFlag,y = (e.direction || ye.RECEIVE) === ye.SEND,E = function (e) {var t = i.READ;return { isPersited: !!(16 & e), isCounted: !!(32 & e), isMentioned: !!(64 & e), disableNotification: !!(512 & e), receivedStatus: t = 2 & e ? i.RETRIEVED : t, canIncludeExpansion: !!(1024 & e) };}(c),m = E.isPersited,v = E.isCounted,T = E.isMentioned,I = E.disableNotification,C = E.receivedStatus,R = E.canIncludeExpansion,S = [j.GROUP, j.CHATROOM, j.RTC_ROOM].indexOf(a) > -1 ? u : o,N = y ? n : o,w = et(h),b = w < r,M = a === j.CHATROOM,A = this._formatBytes(s),U = {};g && (U = rt(g.pushConfigs, g.pushId));var L,P = _O(_O({}, U), { pushTitle: null == g ? void 0 : g.title, pushContent: p, pushData: p, disablePushTitle: !!_ && Boolean(4 & _), forceShowDetailContent: !!_ && Boolean(8 & _), templateId: null == g ? void 0 : g.templateId }),D = y ? ye.SEND : ye.RECEIVE;return M && o === n && (D = ye.SEND), d && (L = {}, L = _t(d)), { conversationType: a, targetId: S, senderUserId: N, messageType: l, messageUId: f, isPersited: m, isCounted: v, isMentioned: T, sentTime: w, isOffLineMessage: b, messageDirection: D, receivedTime: yt.getTime(), disableNotification: I, receivedStatus: C, canIncludeExpansion: R, content: A, expansion: L, configFlag: _, pushConfig: P };}, e.prototype._formatSentMessage = function (e, t) {var n,i = e.content,r = e.classname,s = e.sessionId,o = e.msgId,a = e.extraContent,u = e.pushExt,c = e.pushContent,h = e.configFlag,l = t.signal,f = t.currentUserId,d = l.date,p = l.topic,g = l.targetId,_ = function (e) {return { isPersited: !!(1 & e), isCounted: !!(2 & e), disableNotification: !!(32 & e), canIncludeExpansion: !!(64 & e) };}(s),y = _.isPersited,E = _.isCounted,m = _.disableNotification,v = _.canIncludeExpansion,T = bi[p] || j.PRIVATE,I = lt(li, p),C = this._formatBytes(i),R = g;r === Re.RECALL && (T = C.conversationType || T, R = C.targetId || g), a && (n = {}, n = _t(a));var S = {};u && (S = rt(u.pushConfigs, u.pushId));var N = _O(_O({}, S), { pushTitle: null == u ? void 0 : u.title, pushContent: c, pushData: c, disablePushTitle: !!h && Boolean(4 & h), forceShowDetailContent: !!h && Boolean(8 & h), templateId: null == u ? void 0 : u.templateId });return { conversationType: T, targetId: R, messageType: r, messageUId: o, isPersited: y, isCounted: E, isStatusMessage: I, senderUserId: f, content: this._formatBytes(i), sentTime: 1e3 * d, receivedTime: yt.getTime(), messageDirection: ye.SEND, isOffLineMessage: !1, disableNotification: m, canIncludeExpansion: v, expansion: n, pushConfig: N };}, e.prototype._formatHistoryMessages = function (e, t) {var n = this,i = t.conversation || {},r = e.list,s = e.hasMsg,o = i.targetId,a = et(e.syncTime),u = [];return at(r, function (e) {var i = n._formatReceivedMessage(e, t);i.targetId = o, u.push(i);}, { isReverse: !0 }), { syncTime: a, list: u, hasMore: !!s };}, e.prototype._formatConversationList = function (e, t) {var n = this,i = e.info,r = t.afterDecode || function () {};return (i = ut(i, function (e) {var i = e.msg,s = e.userId,o = e.type,a = e.unreadCount,u = e.channelId,c = n._formatReceivedMessage(i, t);c.targetId = s;var h = { targetId: s, conversationType: o, unreadMessageCount: a, latestMessage: c, channelId: u || "" };return r(h) || h;})) || [];}, e.prototype._formatSetUserSettingOutput = function (e) {return e;}, e.prototype._formatChatRoomInfos = function (e) {var t = e.userTotalNums,n = e.userInfos;return { userCount: t, userInfos: ut(n, function (e) {var t = e.id,n = e.time;return { id: t, time: et(n) };}) };}, e.prototype._formatChatRoomKVList = function (e) {var t = e.entries,n = e.bFullUpdate,i = e.syncTime;return { kvEntries: t = ut(t = t || [], function (e) {var t = e.key,n = e.value,i = e.status,r = e.timestamp,s = e.uid,o = function (e) {return { isAutoDelete: !!(1 & e), isOverwrite: !!(2 & e), type: 4 & e ? Ue.DELETE : Ue.UPDATE };}(i);return { key: t, value: n, isAutoDelete: o.isAutoDelete, isOverwrite: o.isOverwrite, type: o.type, userId: s, timestamp: et(r) };}), isFullUpdate: n, syncTime: i };}, e.prototype._formatUserSetting = function (e) {var t = this,n = e.items,i = e.version,r = {};return at(n || [], function (e) {var n = e.key,i = e.version,s = e.value;e.version = et(i), e.value = t._readBytes(s), "Tag" === n && e.tags.forEach(function (e) {e.createdTime = et(e.createdTime), e.tagName = e.name;}), r[n] = e;}), { settings: r, version: i };}, e.prototype._formatConversationStatus = function (e) {var t = e.state,n = [];return at(t, function (e) {var t = e.type,i = e.channelId,r = e.time,s = e.stateItem,o = Ne.CLOSE,a = !1,u = [];at(s, function (e) {var t = e.sessionStateType,n = e.value,i = e.tags;switch (t) {case Pi:o = n === Ui ? Ne.OPEN : Ne.CLOSE;break;case Di:a = n === Ui;break;case Vi:u = i;}}), n.push({ type: t, targetId: i, notificationStatus: o, isTop: a, updatedTime: et(r), tags: u });}), n;}, e.prototype._formatRTCUserList = function (e) {var t = e.users,n = e.token,i = e.sessionId,r = e.roomInfo,s = {};return at(t, function (e) {var t = e.userId,n = e.userData,i = {};at(n, function (e) {var t = e.key,n = e.value;i[t] = n;}), s[t] = i;}), { users: s, token: n, sessionId: i, roomInfo: r };}, e.prototype._formatRTCData = function (e) {var t = e.outInfo,n = {};return at(t, function (e) {n[e.key] = e.value;}), n;}, e.prototype._formatRTCRoomInfo = function (e) {var t = e.roomId,n = e.userCount,i = e.roomData,r = { id: t, total: n };return at(i, function (e) {r[e.key] = e.value;}), r;}, e.prototype._formatGrpReadReceiptQryResp = function (e) {var t = e.totalMemberNum,n = e.list;return n.forEach(function (e) {e.readTime = et(e.readTime);}), { totalMemberCount: t, list: n };}, e.prototype._formatUserSettingNotification = function (e) {return e;}, e.prototype._formatRTCRoomKVList = function (e) {var t = e.entries,n = e.bFullUpdate,i = e.syncTime;return { kvEntries: t = (t = t || []).map(function (e) {var t = e.timestamp;return Object.assign(e, { timestamp: et(t) });}), isFullUpdate: n, syncTime: i };}, e.prototype._formatRTCAuidenceJoinRoomData = function (e) {return e;}, e.prototype._formatRTCJoinedUserInfo = function (e) {return (e.info || []).map(function (e) {return { deviceId: e.deviceId, roomId: e.roomId, joinTime: et(e.joinTime) };});}, e.prototype.encodeServerConfParams = function () {var e = this._codec.getModule(wt);return e.setNothing(1), e.getArrayData();}, e.prototype._getUpMsgModule = function (e, t) {var n = "comet" === this._connectType,i = e.type,r = t.messageType,s = t.isMentioned,o = t.mentionedType,a = t.mentionedUserIdList,u = t.content,c = t.pushContent,h = t.pushData,l = t.directionalUserIdList,f = t.isFilerWhiteBlacklist,d = t.isVoipPush,p = t.canIncludeExpansion,g = t.expansion,_ = t.pushConfig,y = i === j.GROUP,E = this._codec.getModule(Rt),m = function (e) {var t = e.isStatusMessage,n = e.isPersited,i = e.isCounted;t && (n = i = !1);var r = 0;return n && (r |= 1), i && (r |= 2), e.isMentioned && (r |= 4), e.disableNotification && (r |= 32), e.canIncludeExpansion && (r |= 64), r;}(t),v = _ || {},T = v.pushTitle,I = v.pushContent,C = v.pushData,R = v.iOSConfig,S = v.androidConfig,N = v.templateId,O = v.disablePushTitle,w = v.forceShowDetailContent,b = 0;E.setSessionId(m), y && s && u && (u.mentionedInfo = { userIdList: a, type: o || we.ALL });var M = I || c || "",A = C || h || "";if (M && E.setPushText(M), A && E.setAppData(A), l && E.setUserId(l), b |= d ? 1 : 0, b |= f ? 2 : 0, b |= O ? 4 : 0, b |= w ? 8 : 0, E.setConfigFlag(b), E.setClassname(r), E.setContent(JSON.stringify(u)), p && g) {var U = {};at(g, function (e, t) {U[t] = { v: e };}), E.setExtraContent(JSON.stringify(U));}if (_) {var L = this._codec.getModule(St);if (T && L.setTitle(T), R && S) {var P = it(R, S);L.setPushConfigs(P);}(null == S ? void 0 : S.notificationId) && L.setPushId(null == S ? void 0 : S.notificationId), L.setTemplateId(N || ""), E.setPushExt(n ? L.getArrayData() : L);}return E;}, e.prototype.encodeUpMsg = function (e, t) {return this._getUpMsgModule(e, t).getArrayData();}, e.prototype.encodeSyncMsg = function (e) {var t = e.sendboxTime,n = e.inboxTime,i = this._codec.getModule(Mt);return i.setIspolling(!1), i.setIsPullSend(!0), i.setSendBoxSyncTime(t), i.setSyncTime(n), i.getArrayData();}, e.prototype.encodeChrmSyncMsg = function (e, t) {e = e || 0, t = t || 0;var n = this._codec.getModule(At);return n.setCount(t), n.setSyncTime(e), n.getArrayData();}, e.prototype.encodeGetHistoryMsg = function (e, t) {var n = t.count,i = t.order,r = t.timestamp,s = this._codec.getModule(Lt);return s.setTargetId(e), s.setTime(r), s.setCount(n), s.setOrder(i), s.getArrayData();}, e.prototype.encodeGetConversationList = function (e) {var t = (e = e || {}).count,n = e.startTime,i = this._codec.getModule(Dt);return i.setType(1), i.setCount(t), i.setStartTime(n), i.getArrayData();}, e.prototype.encodeOldConversationList = function (e) {var t = (e = e || {}).count,n = e.type,i = e.startTime,r = e.order;t = t || 0, i = i || 0, r = r || 0;var s = this._codec.getModule(Dt);return s.setType(n), s.setCount(t), s.setStartTime(i), s.setOrder(r), s.getArrayData();}, e.prototype.encodeRemoveConversationList = function (e) {var t = this,n = this._codec.getModule(kt),i = [];return at(e, function (e) {var n = e.type,r = e.targetId,s = t._codec.getModule(xt);s.setType(n), s.setChannelId(r), i.push(s);}), n.setSessions(i), n.getArrayData();}, e.prototype.encodeDeleteMessages = function (e, t, n) {var i = this._codec.getModule(qt),r = [];return at(n, function (e) {r.push({ msgId: e.messageUId, msgDataTime: e.sentTime, direct: e.messageDirection });}), i.setType(e), i.setConversationId(t), i.setMsgs(r), i.getArrayData();}, e.prototype.encodeClearMessages = function (e, t) {var n = this._codec.getModule(Yt);return t = t || new Date().getTime(), n.setDataTime(t), n.setTargetId(e), n.getArrayData();}, e.prototype.encodeClearUnreadCount = function (e, t) {var n = e.type,i = e.targetId,r = t.timestamp,s = this._codec.getModule(Kt);return r = r || +new Date(), s.setType(n), s.setChannelId(i), s.setMsgTime(r), s.getArrayData();}, e.prototype.encodeJoinOrQuitChatRoom = function () {var e = this._codec.getModule(Ht);return e.setNothing(1), e.getArrayData();}, e.prototype.encodeGetChatRoomInfo = function (e, t) {var n = this._codec.getModule(jt);return n.setCount(e), n.setOrder(t), n.getArrayData();}, e.prototype.encodeGetFileToken = function (e, t, n, i) {var r = this._codec.getModule(ln);return r.setType(e), r.setKey(t), r.setHttpMethod(n), r.setQueryString(i), r.getArrayData();}, e.prototype.encodeGetFileUrl = function (e, t, n, i) {var r = this._codec.getModule(e);return r.setType(t), r.setKey(n), i && r.setFileName(i), r.getArrayData();}, e.prototype.encodeModifyChatRoomKV = function (e, t, n) {var i = "comet" === this._connectType,r = this._codec.getModule(yn),s = t.key,o = t.value,a = t.notificationExtra,u = t.isSendNotification,c = t.type || Ue.UPDATE,h = Et(t, c),l = { key: s, value: o || "", uid: n };if (se(h) || (l.status = h), r.setEntry(l), u) {var f = { type: j.CHATROOM, targetId: e },d = { key: s, value: o, extra: a, type: c },p = this._getUpMsgModule(f, { messageType: Re.CHRM_KV_NOTIFY, content: d, isPersited: !1, isCounted: !1 });i ? r.setNotification(p.getArrayData()) : r.setNotification(p), r.setBNotify(!0), r.setType(j.CHATROOM);}return r.getArrayData();}, e.prototype.encodeModifyChatRoomKVS = function (e, t, n) {this._connectType;var i = this._codec.getModule(En),r = t.entries,s = t.type || Ue.UPDATE,o = Et(t, s),a = [];return r.forEach(function (e) {var t = { key: e.key, value: e.value || "", uid: n };se(o) || (t.status = o), a.push(t);}), i.setEntry(a), i.getArrayData();}, e.prototype.encodePullChatRoomKV = function (e) {var t = this._codec.getModule(Cn);return t.setTimestamp(e), t.getArrayData();}, e.prototype.encodePullUserSetting = function (e) {var t = this._codec.getModule(Nn);return t.setVersion(e), t.getArrayData();}, e.prototype.encodeGetConversationStatus = function (e) {var t = this._codec.getModule(bn);return t.setTime(e), t.getArrayData();}, e.prototype.encodeSetConversationStatus = function (e) {var t = this,n = "comet" === this._connectType,i = this._codec.getModule(Ln),r = yt.getTime(),s = [];return at(e, function (e) {var i = t._codec.getModule(An),o = e.conversationType,a = e.targetId,u = e.notificationStatus,c = e.isTop,h = [];i.setType(o), i.setChannelId(a), i.setTime(r);var l = u === Ne.OPEN,f = {};se(u) || (f[Pi] = l), se(c) || (f[Di] = c), at(f, function (e, i) {if (!se(e)) {var r = t._codec.getModule(Un);e = e ? Ui : Li, r.setSessionStateType(Number(i)), r.setValue(e);var s = n ? r.getArrayData() : r;h.push(s);}}), i.setStateItem(h);var d = n ? i.getArrayData() : i;s.push(d);}), i.setVersion(r), i.setState(s), i.getArrayData();}, e.prototype.encodeReadReceipt = function (e, t) {var n = this._codec.getModule(Dn);return n.setMsgId(e), t && n.setChannelId(t), n.getArrayData();}, e.prototype.encodeCreateTag = function (e, t) {var n = this,i = "comet" === this._connectType,r = this._codec.getModule(Bn),s = [];return e.forEach(function (e) {var t = n._codec.getModule(Fn);t.setTagId(e.tagId), t.setName(e.tagName), s.push(i ? t.getArrayData() : t);}), r.setTags(s), r.setVersion(t), r.getArrayData();}, e.prototype.encodeMessageReader = function (e, t) {var n = this._codec.getModule(Dn);return n.setMsgId(e), t && n.setChannelId(t), n.getArrayData();}, e.prototype.encodeRemoveTag = function (e, t) {var n = this,i = "comet" === this._connectType,r = this._codec.getModule(qn),s = [];return e.forEach(function (e) {var t = n._codec.getModule(Fn);t.setTagId(e), s.push(i ? t.getArrayData() : t);}), r.setTags(s), r.setVersion(t), r.getArrayData();}, e.prototype.encodeDisConversationTag = function (e) {var t = this._codec.getModule(Yn);return t.setTagId(e), t.getArrayData();}, e.prototype.encodeUpdateConversationTag = function (e, t) {var n = this,i = "comet" === this._connectType,r = this._codec.getModule(Ln),s = [];return t.forEach(function (t) {var r = n._codec.getModule(An),o = n._codec.getModule(Un),a = [];e.forEach(function (e) {var t = n._codec.getModule(Fn);t.setTagId(e.tagId), se(e.isTop) || t.setIsTop(e.isTop), a.push(i ? t.getArrayData() : t);}), o.setSessionStateType(Vi), o.setValue(JSON.stringify(a)), o.setTags(a), r.setType(t.type), r.setChannelId(t.targetId), r.setTime(Date.now()), r.setStateItem([i ? o.getArrayData() : o]), s.push(i ? r.getArrayData() : r);}), r.setState(s), r.setVersion(yt.getTime()), r.getArrayData();}, e.prototype.encodeReportSDKInfo = function (e) {var t = this._codec.getModule(Kn);return t.setSdkInfo(e), t.getArrayData();}, e.prototype.encodeJoinRTCRoom = function (e, t, n) {var i = this._codec.getModule(Jt);return e = e || 0, i.setRoomType(e), se(t) || i.setBroadcastType(t), se(n) || i.setJoinType(n), i.getArrayData();}, e.prototype.encodeQuitRTCRoom = function () {return this._codec.getModule(zt).getArrayData();}, e.prototype.encodeSetRTCData = function (e, t, n, i, r) {var s = this._codec.getModule(Zt);if (s.setInterior(n), s.setTarget(i), s.setKey(e), s.setValue(t), r) {r.name && s.setObjectName(r.name);var o = r.content;o && (ie(o) && (o = JSON.stringify(o)), s.setContent(o));}return s.getArrayData();}, e.prototype.encodeUserSetRTCData = function (e, t, n, i) {var r = this,s = "comet" === this._connectType,o = this._codec.getModule(Xt);o.setObjectName(n);var a = this._codec.getModule(cn);a.setKey(e.name), a.setValue(e.content), s ? o.setContent([a.getArrayData()]) : o.setContent(a);var u = [];return ["uris", "mcu_uris"].forEach(function (e) {var n = r._codec.getModule(cn);n.setKey(e);var o = "uris" === e ? t : i;n.setValue(o), s ? u.push(n.getArrayData()) : u.push(n);}), o.setValueInfo(u), o.getArrayData();}, e.prototype.encodeUserSetRTCCDNUris = function (e, t) {this._connectType;var n = this._codec.getModule(Xt);n.setObjectName(e);var i = this._codec.getModule(cn);return i.setKey("cdn_uris"), i.setValue(t), n.setValueInfo(i), n.getArrayData();}, e.prototype.encodeGetRTCData = function (e, t, n) {var i = this._codec.getModule($t);return i.setInterior(t), i.setTarget(n), i.setKey(e), i.getArrayData();}, e.prototype.encodeRemoveRTCData = function (e, t, n, i) {var r = this._codec.getModule($t);r.setInterior(t), r.setTarget(n), r.setKey(e);var s = (i = i || {}).name,o = i.content;return !se(s) && r.setObjectName(s), se(o) || (ie(o) && (o = JSON.stringify(o)), r.setContent(o)), r.getArrayData();}, e.prototype.encodeSetRTCOutData = function (e, t, n) {var i = this._codec.getModule(en);i.setTarget(t), $(e) || (e = [e]), at(e, function (t, n) {t.key = t.key ? t.key.toString() : t.key, t.value = t.value ? t.value.toString() : t.value, e[n] = t;}), i.setValueInfo(e);var r = (n = n || {}).name,s = n.content;return !se(r) && i.setObjectName(r), se(s) || (ie(s) && (s = JSON.stringify(s)), i.setContent(s)), i.getArrayData();}, e.prototype.ecnodeGetRTCOutData = function (e) {var t = this._codec.getModule(sn);return t.setUserId(e), t.getArrayData();}, e.prototype.encodeSetRTCState = function (e) {var t = this._codec.getModule(tn);return t.setState(e), t.getArrayData();}, e.prototype.encodeGetRTCRoomInfo = function () {var e = this._codec.getModule(an);return e.setOrder(2), e.getArrayData();}, e.prototype.encodeSetRTCUserInfo = function (e, t) {var n = this._codec.getModule(cn);return n.setKey(e), n.setValue(t), n.getArrayData();}, e.prototype.encodeRemoveRTCUserInfo = function (e) {var t = this._codec.getModule(hn);return t.setKey(e), t.getArrayData();}, e.prototype.encodeIdentityChangeInfo = function (e, t, n) {void 0 === n && (n = !1);var i = this._codec.getModule(Jt);return i.setRoomType(Le.LIVE), t && i.setBroadcastType(t), i.setIdentityChangeType(e), i.setNeedSysChatroom(n), i.getArrayData();}, e.prototype.encodePullRTCRoomKV = function (e, t) {var n = this._codec.getModule(jn);return n.setTimestamp(t), n.setRoomId(e), n.getArrayData();}, e.prototype.encodeQueryUserJoinedInfo = function (e) {var t = this._codec.getModule(Jn);return t.setUserId(e), t.getArrayData();}, e;}(),xi = function xi(e, t) {this._watcher = t, this.codec = new ki(e);},Bi = function Bi(e, t) {return e && t ? t + "_" + e : e || Date.now();},Fi = function () {function e(e) {this.header = e, this._name = null, this.lengthSize = 0, this.messageId = 0, this.timestamp = 0, this.syncMsg = !1, this.identifier = "";}return e.prototype.getIdentifier = function () {var e = this.messageId,t = this.identifier;return Bi(e, t);}, e.prototype.read = function (e, t, n) {this.readMessage(e, t, n);}, e.prototype.readMessage = function (e, t, n) {return { stream: e, length: t };}, e;}(),qi = function () {function e(e) {this.lengthSize = 0, this.messageId = 0, this.topic = "", this.targetId = "", this.identifier = "", this._header = new vt(e, !1, Ge.AT_MOST_ONCE, !1);}return e.prototype.getIdentifier = function () {var e = this.messageId,t = this.identifier;return Bi(e, t);}, e.prototype.write = function (e) {var t = this.getHeaderFlag();e.write(t), this.writeMessage(e);}, e.prototype.setHeaderQos = function (e) {this._header.qos = e;}, e.prototype.getHeaderFlag = function () {return this._header.encode();}, e.prototype.getLengthSize = function () {return this.lengthSize;}, e.prototype.getBufferData = function () {var e = new Ct();this.write(e);var t = e.getBytesArray();return new Int8Array(t);}, e.prototype.getCometData = function () {var e = this.data || {};return JSON.stringify(e);}, e;}(),Yi = function (e) {function t() {var t = null !== e && e.apply(this, arguments) || this;return t._name = Qe.CONN_ACK, t.status = null, t.userId = null, t.timestamp = 0, t;}return N(t, e), t.prototype.readMessage = function (e, n, i) {if (e.readByte(), this.status = +e.readByte(), n <= t.MESSAGE_LENGTH) return { stream: e, length: n };if (i === We.V4) {var r = e.readByte();1 & r && (this.userId = e.readUTF()), 2 & r && e.readUTF(), 4 & r && (this.timestamp = e.readLong()), 8 & r && (this.messageId = e.read2Byte());} else {this.userId = e.readUTF();var s = e.readUTF();pe.debug("server sessionId -> " + s), this.timestamp = e.readLong();}return { stream: e, length: n };}, t.MESSAGE_LENGTH = 2, t;}(Fi),Ki = function (e) {function t() {var t = null !== e && e.apply(this, arguments) || this;return t._name = Qe.DISCONNECT, t.status = 0, t;}return N(t, e), t.prototype.readMessage = function (e, t) {return e.readByte(), this.status = +e.readByte(), { stream: e, length: t };}, t.MESSAGE_LENGTH = 2, t;}(Fi),Hi = function (e) {function t() {var t = e.call(this, je.PING_REQ) || this;return t._name = Qe.PING_REQ, t;}return N(t, e), t.prototype.writeMessage = function (e) {}, t;}(qi),Gi = function (e) {function t(t) {var n = e.call(this, t) || this;return n._name = Qe.PING_RESP, n;}return N(t, e), t;}(Fi),ji = function (e) {function t() {var t = null !== e && e.apply(this, arguments) || this;return t.messageId = 0, t;}return N(t, e), t.prototype.readMessage = function (e, t) {var n = 256 * e.readByte() + e.readByte();return this.messageId = parseInt(n.toString(), 10), { stream: e, length: t };}, t;}(Fi),Qi = function (e) {function t() {var t = null !== e && e.apply(this, arguments) || this;return t.messageId = 0, t;}return N(t, e), t.prototype.writeMessage = function (e) {var t = this.messageId,n = 255 & t,i = (65280 & t) >> 8;e.write(i), e.write(n);}, t;}(qi),Ji = function (e) {function t() {var t = null !== e && e.apply(this, arguments) || this;return t._name = Qe.PUBLISH, t.topic = "", t.targetId = "", t.syncMsg = !1, t.identifier = Je.PUB, t;}return N(t, e), t.prototype.readMessage = function (t, n) {return this.date = t.readInt(), this.topic = t.readUTF(), this.targetId = t.readUTF(), e.prototype.readMessage.call(this, t, n), this.data = t.readAll(), { stream: t, length: n };}, t;}(ji),Wi = function (e) {function t(t, n, i) {var r = e.call(this, je.PUBLISH) || this;return r._name = Qe.PUBLISH, r.syncMsg = !1, r.identifier = Je.PUB, r.topic = t, r.data = z(n) ? Tt.writeUTF(n) : n, r.targetId = i, r;}return N(t, e), t.prototype.writeMessage = function (t) {t.writeUTF(this.topic), t.writeUTF(this.targetId), e.prototype.writeMessage.call(this, t), t.write(this.data);}, t;}(Qi),zi = function (e) {function t() {var t = null !== e && e.apply(this, arguments) || this;return t._name = Qe.PUB_ACK, t.status = 0, t.date = 0, t.millisecond = 0, t.messageUId = "", t.timestamp = 0, t.identifier = Je.PUB, t.topic = "", t.targetId = "", t;}return N(t, e), t.prototype.readMessage = function (t, n) {return e.prototype.readMessage.call(this, t, n), this.date = t.readInt(), this.status = 256 * t.readByte() + t.readByte(), this.millisecond = 256 * t.readByte() + t.readByte(), this.timestamp = 1e3 * this.date + this.millisecond, this.messageUId = t.readUTF(), { stream: t, length: n };}, t;}(ji),Zi = function (e) {function t(t) {var n = e.call(this, je.PUB_ACK) || this;return n._name = Qe.PUB_ACK, n.status = 0, n.date = 0, n.millisecond = 0, n.messageUId = "", n.timestamp = 0, n.messageId = t, n;}return N(t, e), t.prototype.writeMessage = function (t) {e.prototype.writeMessage.call(this, t);}, t;}(Qi),Xi = function (e) {function t(t, n, i) {var r = e.call(this, je.QUERY) || this;return r.name = Qe.QUERY, r.identifier = Je.QUERY, r.topic = t, r.data = z(n) ? Tt.writeUTF(n) : n, r.targetId = i, r;}return N(t, e), t.prototype.writeMessage = function (t) {t.writeUTF(this.topic), t.writeUTF(this.targetId), e.prototype.writeMessage.call(this, t), t.write(this.data);}, t;}(Qi),$i = function (e) {function t(t) {var n = e.call(this, je.QUERY_CONFIRM) || this;return n._name = Qe.QUERY_CON, n.messageId = t, n;}return N(t, e), t;}(Qi),er = function (e) {function t() {var t = null !== e && e.apply(this, arguments) || this;return t._name = Qe.QUERY_ACK, t.status = 0, t.identifier = Je.QUERY, t.topic = "", t.targetId = "", t;}return N(t, e), t.prototype.readMessage = function (t, n) {return e.prototype.readMessage.call(this, t, n), this.date = t.readInt(), this.status = 256 * t.readByte() + t.readByte(), this.data = t.readAll(), { stream: t, length: n };}, t;}(ji),tr = function tr(e) {var t,n = e.type;switch (n) {case je.CONN_ACK:t = new Yi(e);break;case je.PUBLISH:(t = new Ji(e)).syncMsg = e.syncMsg;break;case je.PUB_ACK:t = new zi(e);break;case je.QUERY_ACK:t = new er(e);break;case je.SUB_ACK:case je.UNSUB_ACK:case je.PING_RESP:t = new Gi(e);break;case je.DISCONNECT:t = new Ki(e);break;default:t = new Fi(e), pe.error("No support for deserializing " + n + " messages");}return t;};!function (e) {e[e.ppMsgP = 1] = "ppMsgP", e[e.ppMsgN = 2] = "ppMsgN", e[e.ppMsgS = 3] = "ppMsgS", e[e.pgMsgP = 4] = "pgMsgP", e[e.chatMsg = 5] = "chatMsg", e[e.pcMsgP = 6] = "pcMsgP", e[e.qryPMsg = 7] = "qryPMsg", e[e.qryGMsg = 8] = "qryGMsg", e[e.qryCHMsg = 9] = "qryCHMsg", e[e.qryCMsg = 10] = "qryCMsg", e[e.qrySMsg = 11] = "qrySMsg", e[e.recallMsg = 12] = "recallMsg", e[e.prMsgS = 13] = "prMsgS", e[e.rrMsg = 14] = "rrMsg", e[e.rrList = 15] = "rrList", e[e.s_ntf = 16] = "s_ntf", e[e.s_msg = 17] = "s_msg", e[e.s_stat = 18] = "s_stat", e[e.s_cmd = 19] = "s_cmd", e[e.s_us = 20] = "s_us", e[e.pullUS = 21] = "pullUS", e[e.pgMsgS = 22] = "pgMsgS", e[e.chatMsgS = 23] = "chatMsgS", e[e.qrySessionsAtt = 24] = "qrySessionsAtt", e[e.pullMsg = 25] = "pullMsg", e[e.qrySessions = 26] = "qrySessions", e[e.delSessions = 27] = "delSessions", e[e.delMsg = 28] = "delMsg", e[e.updRRTime = 29] = "updRRTime", e[e.chrmPull = 30] = "chrmPull", e[e.joinChrm = 31] = "joinChrm", e[e.joinChrmR = 32] = "joinChrmR", e[e.exitChrm = 33] = "exitChrm", e[e.queryChrmI = 34] = "queryChrmI", e[e.setKV = 35] = "setKV", e[e.delKV = 36] = "delKV", e[e.pullKV = 37] = "pullKV", e[e.qryRelation = 38] = "qryRelation", e[e.delRelation = 39] = "delRelation", e[e.pullSeAtts = 40] = "pullSeAtts", e[e.setSeAtt = 41] = "setSeAtt", e[e.qnTkn = 42] = "qnTkn", e[e.qnUrl = 43] = "qnUrl", e[e.aliUrl = 44] = "aliUrl", e[e.s3Url = 45] = "s3Url", e[e.stcUrl = 46] = "stcUrl", e[e.cleanPMsg = 47] = "cleanPMsg", e[e.cleanGMsg = 48] = "cleanGMsg", e[e.cleanCMsg = 49] = "cleanCMsg", e[e.cleanSMsg = 50] = "cleanSMsg", e[e.rtcRJoin_data = 51] = "rtcRJoin_data", e[e.rtcRExit = 52] = "rtcRExit", e[e.rtcPing = 53] = "rtcPing", e[e.rtcSetData = 54] = "rtcSetData", e[e.rtc_ntf = 55] = "rtc_ntf", e[e.viewerJoinR = 56] = "viewerJoinR", e[e.viewerExitR = 57] = "viewerExitR", e[e.rtcPullKv = 58] = "rtcPullKv", e[e.rtcIdentityChange = 59] = "rtcIdentityChange", e[e.userSetData = 60] = "userSetData", e[e.rtcQryData = 61] = "rtcQryData", e[e.rtcDelData = 62] = "rtcDelData", e[e.rtcSetOutData = 63] = "rtcSetOutData", e[e.rtcQryUserOutData = 64] = "rtcQryUserOutData", e[e.rtcToken = 65] = "rtcToken", e[e.rtcUserState = 66] = "rtcUserState", e[e.rtcRInfo = 67] = "rtcRInfo", e[e.rtcUData = 68] = "rtcUData", e[e.rtcUPut = 69] = "rtcUPut", e[e.rtcUDel = 70] = "rtcUDel", e[e.rtcUList = 71] = "rtcUList", e[e.rtcQueryJoined = 72] = "rtcQueryJoined", e[e.addSeTag = 73] = "addSeTag", e[e.delSeTag = 74] = "delSeTag", e[e.addTag = 75] = "addTag", e[e.delTag = 76] = "delTag", e[e.disTag = 77] = "disTag", e[e.reportsdk = 78] = "reportsdk";}(ai || (ai = {}));var nr,ir = ai,rr = function rr(e, t, n) {return w(void 0, void 0, void 0, function () {var i;return b(this, function (r) {switch (r.label) {case 0:return [4, Promise.all(e.map(function (e) {return w(void 0, void 0, void 0, function () {var i, r;return b(this, function (s) {switch (s.label) {case 0:return i = Date.now(), r = t + "://" + e + "/ping?r=" + (a = 9999, (o = 1e3) + Math.floor(Math.random() * (a - o))), [4, n.httpReq({ url: r, timeout: 5e3 })];case 1:return [2, { status: s.sent().status, host: e, cost: Date.now() - i }];}var o, a;});});}))];case 1:return (i = (i = r.sent()).filter(function (e) {return 200 === e.status;})).length > 1 && (i = i.sort(function (e, t) {return e.cost - t.cost;})), [2, i.map(function (e) {return e.host;})];}});});},sr = function sr(e, t, n, i, r, s, o, a) {return e + "://" + t + "/websocket?appId=" + n + "&token=" + encodeURIComponent(i) + "&sdkVer=" + s + "&pid=" + o + "&apiVer=" + (r.isFromUniapp ? "uniapp" : "normal") + (r.connectPlatform ? "&platform=" + r.connectPlatform : "") + (a ? "&protocolVer=" + a : "");},or = function or(e) {return [ir.ppMsgS, ir.pgMsgS, ir.chatMsgS].map(function (e) {return ir[e];}).indexOf(e) >= 0;};!function (e) {e[e.REDIRECT = 0] = "REDIRECT", e[e.OTHER_DEVICE_LOGIN = 1] = "OTHER_DEVICE_LOGIN", e[e.BLOCK = 2] = "BLOCK", e[e.REMOTE_CLOSE = 3] = "REMOTE_CLOSE", e[e.LOGOUT = 4] = "LOGOUT", e[e.BLOCK_NEW = 5] = "BLOCK_NEW", e[e.REDIRECT_NEW = 6] = "REDIRECT_NEW";}(nr || (nr = {}));var ar,ur = function ur(e, t) {pe.info("websocket send -> messageId: " + e.messageId);var n = e.getBufferData();t.send(n.buffer);},cr = function (e) {function t(t, n) {var i = e.call(this, "websocket", n) || this;return i._runtime = t, i._socket = null, i._messageIds = {}, i._syncMessageIds = {}, i._failedCount = 0, i.ALLOW_FAILED_TIMES = 2, i._timer = null, i._idCount = 0, i._generateMessageId = function () {return i._idCount >= 65535 && (i._idCount = 0), ++i._idCount;}, i;}return N(t, e), t.prototype.connect = function (e, t, n, i, r, s) {return w(this, void 0, void 0, function () {var o,a,u,c,h,l,f,d,p = this;return b(this, function (g) {switch (g.label) {case 0:return r = x(r), this._watcher.status(Te.CONNECTING), pe.info("ping -> protocol: " + i + ", hosts: " + JSON.stringify(n)), [4, rr(n, i, this._runtime)];case 1:if (o = g.sent(), pe.info("valid hosts -> " + o.join(",")), 0 === o.length) return pe.error("No valid websocket server hosts!"), [2, me.RC_SOCKET_NOT_CREATED];a = i.replace("http", "ws"), c = function c(n, i) {var c, l, f;return b(this, function (i) {switch (i.label) {case 0:return c = sr(a, o[n], e, t, h._runtime, r, "", s), pe.info("conenct start -> " + c), h.sendConnectTime = Date.now(), l = h._runtime.createWebSocket(c), f = function f(e) {p._timer && (clearTimeout(p._timer), p._timer = null), p._socket === l && (p._socket = null, p._watcher.status(e));}, [4, new Promise(function (e) {l.onMessage(function (t) {if ("[object ArrayBuffer]" === Object.prototype.toString.call(t)) {var n = function (e, t) {var n = new Uint8Array(e),i = new It(n),r = i.readByte(),s = new vt(r),o = tr(s);return o.read(i, n.length - 1, t), o;}(t, s);if (n instanceof Gi && p._pingResolve) return p._pingResolve(me.SUCCESS), void (p._pingResolve = void 0);if (n instanceof Yi) return pe.info("recv connect ack -> " + n.status), n.status !== Ie.ACCEPTED ? (pe.warn("connect failed: " + n.status), void e(n.status)) : (pe.info("connect success -> " + c), p.connectedTime = n.timestamp, p.userId = n.userId || "", p._idCount = n.messageId || 0, void e(me.SUCCESS));if (n instanceof Ki) {var i = n.status;switch (pe.warn("recv disconnect signal -> status: " + i), i) {case nr.BLOCK:p._watcher.status(Te.BLOCKED);break;case nr.OTHER_DEVICE_LOGIN:p._watcher.status(Te.KICKED_OFFLINE_BY_OTHER_CLIENT);break;case nr.REDIRECT_NEW:case nr.REDIRECT:p._watcher.status(Te.REDIRECT);break;default:p._watcher.status(Te.DISCONNECT_BY_SERVER);}} else p._onReceiveSignal(n);} else pe.error("Socket received invalid data:", t);}), l.onClose(function (t, n) {pe.warn("websocket closed! code:", t, "reason:", n), f(Te.CONNECTION_CLOSED), e(t);}), l.onError(function (t) {var n;pe.error("websocket error!", null === (n = t) || void 0 === n ? void 0 : n.stack), f(Te.WEBSOCKET_ERROR), e(me.NETWORK_ERROR);}), l.onOpen(function () {return pe.debug("websocket open =>", c);}), setTimeout(function () {e(me.TIMEOUT);}, 5e3);})];case 1:return (u = i.sent()) === Ie.REDIRECT ? [2, { value: u }] : u === me.SUCCESS ? (h._socket = l, h._checkAlive(), [2, { value: u }]) : (pe.warn("connect result -> code: " + u + ", url: " + c), u = gt(u), l.close(), [2]);}});}, h = this, l = 0, f = o.length, g.label = 2;case 2:return l < f ? [5, c(l, f)] : [3, 5];case 3:if ("object" == typeof (d = g.sent())) return [2, d.value];g.label = 4;case 4:return l += 1, [3, 2];case 5:return [2, void 0 !== u ? u : me.RC_NET_UNAVAILABLE];}});});}, t.prototype._checkAlive = function () {var e;return w(this, void 0, void 0, function () {var t,n = this;return b(this, function (i) {switch (i.label) {case 0:return this._socket ? (pe.debug("send ping ->"), this.sendOnly(new Hi()), [4, new Promise(function (e) {n._pingResolve = e, n._timer && clearTimeout(n._timer), n._timer = setTimeout(function () {n._pingResolve = void 0, e(me.TIMEOUT);}, 15e3);})]) : [2];case 1:return (t = i.sent()) !== me.SUCCESS ? (this._failedCount += 1, pe.warn("ping failed count: " + this._failedCount + ", code: " + t), this._failedCount >= this.ALLOW_FAILED_TIMES ? (this._failedCount = 0, pe.warn("ping timeout, close current websocket to reconnect!"), null === (e = this._socket) || void 0 === e || e.close()) : this._checkAlive(), [2]) : (pe.debug("recv pong <-"), this._failedCount = 0, setTimeout(function () {return n._checkAlive();}, 15e3), [2]);}});});}, t.prototype._onReceiveSignal = function (e) {return w(this, void 0, void 0, function () {var t,n,i,r,s,o,a = this;return b(this, function (u) {switch (u.label) {case 0:return t = e.messageId, e.header && e.header.qos !== Ge.AT_MOST_ONCE && (e instanceof Ji && !e.syncMsg && (pe.debug("send pubAck -> " + t), this.sendOnly(new Zi(t))), e instanceof er && (pe.debug("send queryCon -> " + t), this.sendOnly(new $i(t)))), t > 0 && (e instanceof zi || e instanceof er) && (pe.debug("recv ack -> messageId: " + t), (n = this._messageIds[t]) && (n(e), delete this._messageIds[t]), (i = this._syncMessageIds[t]) && (delete this._syncMessageIds[t], i(e))), e instanceof Ji ? (r = e.syncMsg, (s = e.topic) === ir[ir.userSetData] ? [2] : !r || or(s) ? (this._watcher.signal(e), [2]) : [4, new Promise(function (e) {a._syncMessageIds[t] = e;})]) : [3, 2];case 1:o = u.sent(), delete this._syncMessageIds[t], this._watcher.signal(e, o), u.label = 2;case 2:return [2];}});});}, t.prototype.sendOnly = function (e) {this._socket && ur(e, this._socket);}, t.prototype.send = function (e, t, n, i) {return void 0 === i && (i = 3e4), w(this, void 0, void 0, function () {var r,s,o,a = this;return b(this, function (u) {switch (u.label) {case 0:return this._socket ? (r = this._generateMessageId(), e.messageId = r, ur(e, this._socket), [4, new Promise(function (e) {a._messageIds[r] = e, setTimeout(function () {a._messageIds[r] && delete a._messageIds[r], e();}, i);})]) : [3, 2];case 1:return (s = u.sent()) ? (o = t && s.data ? this.codec.decodeByPBName(s.data, t, n) : s, 0 !== s.status ? (pe.warn("send failed -> message: " + r + ", respPBName: " + t + ", status: " + s.status), [2, { code: s.status, data: t && s.data ? o : null }]) : [2, { code: me.SUCCESS, data: o }]) : (pe.warn("send timeout -> message: " + r + ", respPBName: " + t + ", timeout: " + i), [2, { code: me.TIMEOUT }]);case 2:return [2, { code: me.RC_NET_CHANNEL_INVALID }];}});});}, t.prototype.close = function () {this._socket && (this._socket.close(), this._socket = null, this._watcher.status(Te.DISCONNECTED));}, t;}(xi);exports.WebSocketChannel = cr;exports.HttpMethod = ar;!function (e) {e.GET = "GET", e.POST = "POST";}(ar || (exports.HttpMethod = ar = {}));var hr = function (e) {function t(t, n) {var i = e.call(this, "comet", n) || this;return i._runtime = t, i._messageIds = {}, i._syncMessageIds = {}, i._idCount = 0, i._generateMessageId = function () {return ++i._idCount;}, i._pid = encodeURIComponent(new Date().getTime() + Math.random() + ""), i;}return N(t, e), t.prototype.handleCometRes = function (e) {var t = this;if (200 !== e.status && 202 !== e.status) return !1;var n = z(e.data) ? JSON.parse(e.data) : e.data;return n ? !$(n) || (at(n, function (e) {return w(t, void 0, void 0, function () {var t,n,i,r,s,o,a,u,c,h,l,f = this;return b(this, function (d) {switch (d.label) {case 0:if ((t = e.sessionid) && (this._sessionid = t), n = function (e) {var t = e.headerCode,n = new vt(t),i = tr(n);for (var r in e) {i[r] = e[r];}return i;}(e), i = n.messageId, r = n._header, s = n.status, n.identifier, o = r && r.qos !== Ge.AT_MOST_ONCE, i && n.getIdentifier && ((a = this._messageIds[i]) && a(n), this._syncMessageIds[i] && this._syncMessageIds[i](n)), o && (n instanceof Ji && !n.syncMsg && (u = new Zi(i), this.sendOnly(u)), n instanceof er && (u = new $i(i), this.sendOnly(u))), n instanceof Ki) {switch (s) {case nr.OTHER_DEVICE_LOGIN:this._watcher.status(Te.KICKED_OFFLINE_BY_OTHER_CLIENT);break;case nr.BLOCK:this._watcher.status(Te.BLOCKED);break;case nr.REDIRECT_NEW:case nr.REDIRECT:this._watcher.status(Te.REDIRECT);break;default:this._watcher.status(Te.DISCONNECT_BY_SERVER);}return [2];}return n instanceof Ji ? (c = n.syncMsg, h = n.topic, !c || or(h) ? (this._watcher.signal(n), [2, !1]) : [4, new Promise(function (e) {f._syncMessageIds[i] = e;})]) : [3, 2];case 1:l = d.sent(), delete this._syncMessageIds[i], this._watcher.signal(n, l), d.label = 2;case 2:return [2];}});});}), !0) : (pe.error("received data is not a validJson", n), !1);}, t.prototype._startPullSignal = function (e) {return w(this, void 0, void 0, function () {var t, n, i, r;return b(this, function (s) {switch (s.label) {case 0:return t = new Date().getTime(), n = e + "://" + this._domain + "/pullmsg.js?sessionid=" + this._sessionid + "&timestrap=" + t + "&pid=" + this._pid, [4, this._runtime.httpReq({ url: n, body: { pid: this._pid }, timeout: 45e3 })];case 1:return i = s.sent(), r = this.handleCometRes(i), this._isDisconnected || (r ? this._startPullSignal(e) : (this._isDisconnected = !0, this._watcher.status(Te.NETWORK_UNAVAILABLE))), [2];}});});}, t.prototype.connect = function (e, t, n, i, r, s) {return w(this, void 0, void 0, function () {var s, o, a, u, c, h, l, f;return b(this, function (d) {switch (d.label) {case 0:return r = x(r), this._protocol = i, this._isDisconnected = !1, this._watcher.status(Te.CONNECTING), [4, rr(n, i, this._runtime)];case 1:if (0 === (s = d.sent()).length) return pe.error("No valid comet server hosts!"), [2, me.RC_SOCKET_NOT_CREATED];o = function o(e) {return 200 !== e.status && 202 !== e.status ? (pe.error("handle comet res -> res: " + JSON.stringify(e || {})), !1) : !!e.data && (function (e) {if (ie(e)) return !0;var t = !1;try {var n = JSON.parse(e);t = JSON.stringify(n) === e;} catch (e) {t = !1;}return t;}(e.data) ? ie(e.data) ? e.data : JSON.parse(e.data) : (pe.error("received data is not a validJson", e.data), !1));}, u = 0, c = s.length, d.label = 2;case 2:return u < c ? (h = sr(i, s[u], e, t, this._runtime, r, this._pid), [4, this._runtime.httpReq({ url: h, body: { pid: this._pid }, timeout: 5e3 })]) : [3, 5];case 3:if (l = d.sent(), f = o(l), this._domain = s[u], f && f.status === Ie.REDIRECT) return [2, f.status];if (f && 0 === f.status) return this._watcher.status(Te.CONNECTED), this._sessionid = f.sessionid, this._startPullSignal(i), this.userId = f.userId, this.connectedTime = f.timestamp, [2, f.status];pe.warn("connect result -> code: " + (null == f ? void 0 : f.status) + ", url: " + h), a = gt(null == f ? void 0 : f.status), d.label = 4;case 4:return u += 1, [3, 2];case 5:return [2, void 0 !== a ? a : me.RC_NET_UNAVAILABLE];}});});}, t.prototype.sendCometData = function (e, t) {return w(this, void 0, void 0, function () {var t, n, i, r, s, o, a, u, c, h;return b(this, function (l) {switch (l.label) {case 0:return n = (t = this)._domain, i = t._sessionid, r = t._pid, s = e.messageId, o = e.topic, a = e.targetId, e.identifier, u = e.getHeaderFlag(), c = o ? this._protocol + "://" + n + "/websocket?messageid=" + s + "&header=" + u + "&sessionid=" + i + "&topic=" + o + "&targetid=" + a + "&pid=" + r : this._protocol + "://" + n + "/websocket?messageid=" + s + "&header=" + u + "&sessionid=" + i + "&pid=" + r, [4, this._runtime.httpReq({ url: c, method: ar.POST, body: e.getCometData() })];case 1:return h = l.sent(), this.handleCometRes(h), [2];}});});}, t.prototype.sendOnly = function (e) {this.sendCometData(e);}, t.prototype.send = function (e, t, n, i) {return void 0 === i && (i = 3e4), w(this, void 0, void 0, function () {var r,s,o,a = this;return b(this, function (u) {switch (u.label) {case 0:return r = this._generateMessageId(), e.messageId = r, this.sendCometData(e), [4, new Promise(function (e) {a._messageIds[r] = e, setTimeout(function () {delete a._messageIds[r], e();}, i);})];case 1:return (s = u.sent()) ? (o = t && s.data ? this.codec.decodeByPBName(s.data, t, n) : s, 0 !== s.status ? [2, { code: s.status, data: t && s.data ? o : null }] : [2, { code: me.SUCCESS, data: o }]) : [2, { code: me.TIMEOUT }];}});});}, t.prototype.close = function () {this._isDisconnected = !0, this._watcher.status(Te.DISCONNECTED);}, t;}(xi),lr = function lr(e, t, n) {this.runtime = e, this._watcher = t, this._options = n, this.currentUserId = "", this._appkey = this._options.appkey, this._apiVer = this._options.apiVersion, this.navi = this._createNavi();},fr = function fr(e) {return ["navi", e].join("_");},dr = function () {function e(e, t) {this._runtime = e, this._options = t, this._naviInfo = null, this._appkey = this._options.appkey, this._apiVersion = x(this._options.apiVersion);}return e.prototype.getInfo = function (e, t, n, i) {return w(this, void 0, void 0, function () {var r, s;return b(this, function (o) {switch (o.label) {case 0:return n && this._clear(e), (r = function (e, t, n) {var i,r,s = fr(e);try {var o = n.getItem(s);r = o ? JSON.parse(o) : [];} catch (e) {r = [];}var a = Date.now();return r.length > 0 && (r = r.filter(function (e) {return a - e.timestamp < 72e5;})), 0 === r.length ? n.removeItem(s) : n.setItem(s, JSON.stringify(r)), (null === (i = r.find(function (e) {return e.token === t;})) || void 0 === i ? void 0 : i.naviInfo) || null;}(this._appkey, e, this._runtime.localStorage)) ? (this._naviInfo = r, [2, r]) : (s = this._options.navigators.slice(), t.length && t.forEach(function (e) {s.indexOf(e) < 0 && s.unshift(e);}), [4, this._reqNavi(s, this._appkey, e, i)]);case 1:return (r = o.sent()) ? (this._naviInfo = r, this.setNaviInfo2Cache(e, r), [2, r]) : [2, r];}});});}, e.prototype.setNaviInfo2Cache = function (e, t) {this._naviInfo = t, function (e, t, n, i) {var r,s = fr(e);try {var o = i.getItem(s);r = o ? JSON.parse(o) : [];} catch (e) {r = [];}var a = Date.now();r.length > 0 && (r = r.filter(function (e) {return a - e.timestamp < 72e5 && t !== e.token;})), r.push({ timestamp: a, naviInfo: n, token: t }), i.setItem(s, JSON.stringify(r));}(this._appkey, e, t, this._runtime.localStorage);}, e.prototype.getInfoFromCache = function (e) {return this._naviInfo;}, e.prototype._clear = function (e) {!function (e, t, n) {var i,r = fr(e);try {var s = n.getItem(r);i = s ? JSON.parse(s) : [];} catch (e) {i = [];}var o = Date.now();i.length > 0 && (i = i.filter(function (e) {return o - e.timestamp < 72e5 && t !== e.token;})), 0 === i.length ? n.removeItem(r) : n.setItem(r, JSON.stringify(i));}(this._appkey, e, this._runtime.localStorage);}, e;}(),pr = function pr(e, t, n) {return [e, t, n].join("_");},gr = function () {function e(e, t) {this._runtime = e, this._appkey = t, this._inboxTime = 0, this._outboxTime = 0;}return e.prototype.setInboxTime = function (e, t) {if (!(this._inboxTime > e)) {this._inboxTime = e;var n = pr("inbox", this._appkey, t);this._runtime.localStorage.setItem(n, e.toString());}}, e.prototype.getInboxTime = function (e) {if (0 === this._inboxTime) {var t = pr("inbox", this._appkey, e);this._inboxTime = parseInt(this._runtime.localStorage.getItem(t)) || 0;}return this._inboxTime;}, e.prototype.setOutboxTime = function (e, t) {if (!(this._outboxTime >= e)) {this._outboxTime = e;var n = pr("outbox", this._appkey, t);this._runtime.localStorage.setItem(n, e.toString());}}, e.prototype.getOutboxTime = function (e) {if (0 === this._outboxTime) {var t = pr("outbox", this._appkey, e);this._outboxTime = parseInt(this._runtime.localStorage.getItem(t)) || 0;}return this._outboxTime;}, e;}(),_r = { _caches: {}, set: function set(e, t) {this._caches[e] = t;}, get: function get(e) {return this._caches[e] || 0;}, clear: function clear(e) {this._caches[e] = 0;} },yr = function () {function e(e, t) {this._kvCaches = {}, this._chatroomId = e, this._currentUserId = t;}return e.prototype._add = function (e) {var t = e.key;e.isDeleted = !1, this._kvCaches[t] = e;}, e.prototype._remove = function (e) {var t = e.key,n = this._kvCaches[t];n && (n.isDeleted = !0, this._kvCaches[t] = n);}, e.prototype._setEntry = function (e, t) {var n = e.key,i = e.type,r = e.isOverwrite,s = e.userId,o = this._getSetUserId(n),a = i === Ue.DELETE,u = o === s,c = !this._isExisted(n),h = a ? this._remove : this._add;(t || r || u || c) && h.call(this, e);}, e.prototype.getValue = function (e) {var t = this._kvCaches[e] || {};return t.isDeleted ? null : t.value;}, e.prototype.getAllValue = function () {var e = {};for (var t in this._kvCaches) {this._kvCaches[t].isDeleted || (e[t] = this._kvCaches[t].value);}return e;}, e.prototype._getSetUserId = function (e) {return (this._kvCaches[e] || {}).userId;}, e.prototype._isExisted = function (e) {var t = this._kvCaches[e] || {},n = t.value,i = t.isDeleted;return n && !i;}, e.prototype.setEntries = function (e) {var t = this,n = e.kvEntries,i = e.isFullUpdate;n = n || [], (i = i || !1) && this.clear(), n.forEach(function (e) {t._setEntry(e, i);}), pe.debug("end setEntries");}, e.prototype.clear = function () {this._kvCaches = {};}, e;}(),Er = function () {function e(e) {this._pullQueue = [], this._isPulling = !1, this._storeCaches = {}, this._engine = e;}return e.prototype._startPull = function () {return w(this, void 0, void 0, function () {var e, t, n, i, r, s, o;return b(this, function (a) {switch (a.label) {case 0:return this._isPulling || 0 === this._pullQueue.length ? [2] : (this._isPulling = !0, e = this._pullQueue.splice(0, 1)[0], t = e.chrmId, n = e.timestamp, (i = _r.get(t)) > n ? (this._isPulling = !1, this._startPull(), [2]) : [4, this._engine.pullChatroomEntry(t, i)]);case 1:return r = a.sent(), s = r.code, o = r.data, this._isPulling = !1, s === me.SUCCESS ? (_r.set(t, o.syncTime || 0), this._startPull()) : this._startPull(), [2];}});});}, e.prototype.reset = function (e) {_r.clear(e);var t = this._storeCaches[e];t && t.clear();}, e.prototype.pullEntry = function (e, t) {this._pullQueue.push({ chrmId: e, timestamp: t }), this._startPull();}, e.prototype.setLocal = function (e, t, n) {var i = this._storeCaches[e];ue(i) || (i = new yr(e, n)), i.setEntries(t), this._storeCaches[e] = i;}, e.prototype.getValue = function (e, t) {var n = this._storeCaches[e];return n ? n.getValue(t) : null;}, e.prototype.getAll = function (e) {var t = this._storeCaches[e],n = {};return t && (n = t.getAllValue()), n;}, e;}(),mr = function () {function e(e, t, n, i) {this._runtime = e, this._appkey = t, this._userId = n, this._canJoinMulipleChrm = i, this._sessionKey = "", this._joinedChrmsInfo = {}, this._sessionKey = "sync-chrm-" + this._appkey + "-" + this._userId;}return e.prototype.set = function (e, t) {void 0 === t && (t = 10), !this._canJoinMulipleChrm && (this._joinedChrmsInfo = {}), this._joinedChrmsInfo[e] = t, this._runtime.sessionStorage.setItem(this._sessionKey, JSON.stringify(this._joinedChrmsInfo));}, e.prototype.get = function () {var e, t;try {t = this._runtime.sessionStorage.getItem(this._sessionKey), e = JSON.parse(t || "{}");} catch (n) {pe.error("parse rejoined chrm infos error -> " + t), e = {};}return e;}, e.prototype.remove = function (e) {delete this._joinedChrmsInfo[e], ue(this._joinedChrmsInfo) ? this._runtime.sessionStorage.setItem(this._sessionKey, JSON.stringify(this._joinedChrmsInfo)) : this.clear();}, e.prototype.clear = function () {this._joinedChrmsInfo = {}, this._runtime.sessionStorage.removeItem(this._sessionKey);}, e;}(),vr = "converStatusChanged",Tr = function () {function e(e, t, n) {this._eventEmitter = new ge(), this._pullQueue = [], this._isPulling = !1, this._storage = I(e.runtime), this._appkey = t, this._currentUserId = n, this._engine = e, this._storagePullTimeKey = "con-s-" + t + "-" + n;}return e.prototype._set = function (e) {var t = this;if (!se(e)) {var n = this._storage.get(this._storagePullTimeKey) || 0,i = e.length;e.forEach(function (e, r) {var s = e.updatedTime || 0;n = s > n ? s : n, e.conversationType = e.type, t._eventEmitter.emit(vr, { statusItem: e, isLastPull: r === i - 1 });}), this._storage.set(this._storagePullTimeKey, n);}}, e.prototype._startPull = function () {return w(this, void 0, void 0, function () {var e, t, n, i;return b(this, function (r) {switch (r.label) {case 0:return this._isPulling || 0 === this._pullQueue.length ? [2] : (this._isPulling = !0, e = this._pullQueue.splice(0, 1)[0], [4, this._engine.pullConversationStatus(e)]);case 1:return t = r.sent(), n = t.code, i = t.data, n === me.SUCCESS ? (this._isPulling = !1, this._set(i), this._startPull()) : this._startPull(), [2];}});});}, e.prototype.pull = function (e) {var t = this._storage.get(this._storagePullTimeKey) || 0;(e > t || 0 === e) && (this._pullQueue.push(t), this._startPull());}, e.prototype.watch = function (e) {this._eventEmitter.on(vr, function (t) {e(t);});}, e.prototype.unwatch = function () {this._eventEmitter.off(vr, function (e) {});}, e;}(),Ir = { c: { keyName: "unreadMessageCount", defaultVal: 0 }, hm: { keyName: "hasMentioned", defaultVal: !1 }, m: { keyName: "mentionedInfo", defaultVal: null }, t: { keyName: "lastUnreadTime", defaultVal: 0 }, nc: { keyName: "notificationStatus", defaultVal: 2 }, to: { keyName: "isTop", defaultVal: !1 }, tg: { keyName: "tags", defaultVal: {} } },Cr = {};exports.ANavi = dr;exports.AEngine = lr;exports.CometChannel = hr;for (var Rr in Ir) {var Sr = Ir[Rr].keyName;Cr[Sr] = Rr;}var Nr,Or = function () {function e(e, t, n) {this._appkey = t, this._currentUserId = n;var i = "con-" + t + "-" + n;this.storage = new R(e, i);}return e.prototype._getStoreKey = function (e, t) {return e + "_" + t;}, e.prototype._getConOptionByKey = function (e) {var t = (e = e || "").split("_");return t.length >= 2 ? { conversationType: t[0], targetId: e.match(/_.*/g)[0].substring(1) } : { conversationType: j.PRIVATE, targetId: "" };}, e.prototype.updateMentionedData = function (e) {var t = this,n = e.conversationType,i = e.targetId,r = e.messageType,s = e.isMentioned,o = e.content,a = e.senderUserId,u = this._getStoreKey(n, i),c = this.storage.get(u) || {},h = Cr.mentionedInfo,l = Cr.hasMentioned,f = c[h] || {},d = f.userIdList || [],p = o.mentionedInfo;if (p) {if (s && n === j.GROUP) (p.userIdList || []).forEach(function (e) {e === t._currentUserId && d.indexOf(a) < 0 && d.push(a);}), p.type === we.ALL && d.indexOf(a) < 0 && d.push(a);if (r === Re.RECALL && n === j.GROUP) {var g = d.indexOf(a);g >= 0 && d.splice(g, 1);}p = { userIdList: d, type: (null == p ? void 0 : p.type) || f.type }, 0 !== d.length ? (c[h] = p, c[l] = !0) : (delete c[h], delete c[l]), ue(c) ? this.storage.set(u, c) : this.storage.remove(u);}}, e.prototype.set = function (e, t, n) {var i = this._getStoreKey(e, t),r = this.storage.get(i) || {};for (var s in n) {var o = Cr[s],a = n[s];if (!se(o) && !se(a) && "hasMentioned" !== s && "MentionedInfo" !== s) {if (a === Ir[o].defaultVal || "tags" === s && !ue(a)) delete r[o];else if ("tags" === s) {var u = a;for (var c in u) {u[c].isTop || delete u[c].isTop;}r[o] = a;} else r[o] = a;r.c || (delete r.t, delete r.hm, delete r.m);}}ue(r) ? this.storage.set(i, r) : this.storage.remove(i);}, e.prototype.get = function (e, t) {var n = this._getStoreKey(e, t),i = this.storage.get(n) || {},r = {};for (var s in Ir) {var o = Ir[s],a = o.keyName,u = o.defaultVal;r[a] = i[s] || ft(u);}return r;}, e.prototype.getValue = function (e) {var t = this.storage.getValues() || {},n = [];for (var i in t) {var r = this._getConOptionByKey(i),s = { conversationType: r.conversationType, targetId: r.targetId },o = t[i];for (var a in o) {var u = Ir[a],c = u.keyName,h = u.defaultVal;s[c] = o[a] || ft(h);}s = e ? e(s) : s, n.push(s);}return n;}, e.prototype.getValueForTag = function () {var e = this.storage.getValues() || {},t = {};for (var n in e) {var i = this._getConOptionByKey(n),r = i.conversationType,s = i.targetId,o = {},a = e[n];for (var u in a) {var c = Ir[u],h = c.keyName,l = c.defaultVal;o[h] = a[u] || ft(l);}for (var f in o.tags) {se(t[f]) && (t[f] = []);var d = Object.assign({}, o, { conversationType: r, targetId: s });delete d.tags, t[f].push(d);}}return t;}, e;}(),wr = [j.PRIVATE, j.GROUP, j.SYSTEM, j.PUBLIC_SERVICE, j.APP_PUBLIC_SERVICE],br = "conversationChanged",Mr = function () {function e(e, t, n, i) {var r = this;this._updatedConversations = {}, this._eventEmitter = new ge(), this._draftMap = {}, this._appkey = t, this._loginUserId = n, this._store = new Or(e.runtime, t, n), this._statusManager = new Tr(e, t, n), this._statusManager.watch(function (e) {var t = e.statusItem,n = e.isLastPull;r.addStatus(t, n);}), this._eventEmitter.on(br, function (e) {i(e);});}return e.prototype._calcUnreadCount = function (e, t) {var n = e.content,i = e.messageType,r = e.sentTime,s = e.isCounted,o = e.messageDirection,a = e.senderUserId,u = o === ye.SEND && a === this._loginUserId,c = i === Re.RECALL,h = ie(n),l = !1,f = t.lastUnreadTime || 0,d = t.unreadMessageCount || 0;if (f > r || u) return { hasChanged: l, localConversation: t };(s && (t.unreadMessageCount = d + 1, t.lastUnreadTime = r, l = !0), c && h) && f >= n.sentTime && d && (t.unreadMessageCount = d - 1, l = !0);return { hasChanged: l, localConversation: t };}, e.prototype._calcMentionedInfo = function (e, t) {var n = e.content,i = (e.messageDirection, e.isMentioned);ye.SEND;var r = ie(n),s = !1;return i && r && n.mentionedInfo && (t.hasMentioned = !0, s = !0), { hasChanged: s, localConversation: t };}, e.prototype._setUpdatedConversation = function (e) {if (ie(e)) {var t = e.conversationType,n = e.targetId,i = t + "_" + n,r = this._store.get(t, n) || {};this._updatedConversations[i] = Object.assign(r, e);}}, e.prototype.addStatus = function (e, t) {var n = e.conversationType,i = e.targetId,r = e.updatedTime,s = e.notificationStatus,o = e.isTop,a = e.tags,u = {},c = {};se(s) || (c.notificationStatus = { time: r, val: s }), se(o) || (c.isTop = { time: r, val: o }), se(a) || (c.tags = { time: r, val: a }, null == a || a.forEach(function (e) {u[e.tagId] = { isTop: e.isTop };})), this._store.set(n, i, { notificationStatus: s, isTop: o, tags: u }), this._setUpdatedConversation({ conversationType: n, targetId: i, updatedItems: c }), t && this._notifyConversationChanged();}, e.prototype._notifyConversationChanged = function () {var e = [];for (var t in this._updatedConversations) {e.push(this._updatedConversations[t]);}this._eventEmitter.emit(br, e), this._updatedConversations = {};}, e.prototype.setConversationCacheByMessage = function (e, t) {var n = this,i = e.conversationType,r = e.isPersited,s = e.targetId;if (wr.indexOf(i) >= 0) {var o = !1,a = this._store.get(i, s);if ([this._calcUnreadCount, this._calcMentionedInfo].forEach(function (t) {var i = t.call(n, e, a),r = i.hasChanged,s = i.localConversation;o = o || r, a = ft(s);}), o && this._store.set(i, s, a), this._store.updateMentionedData(e), r) {var u = this._store.get(i, s);u.updatedItems = { latestMessage: { time: e.sentTime, val: e } }, u.latestMessage = e;var c = Object.assign(u, { conversationType: i, targetId: s });this._setUpdatedConversation(c);}t && this._notifyConversationChanged();}}, e.prototype.get = function (e, t) {return this._store.get(e, t);}, e.prototype.getAllUnreadCount = function (e, t, n) {var i = this._store.getValue(),r = 0;return i.forEach(function (e) {var i = e.unreadMessageCount,s = e.notificationStatus,o = e.conversationType;i = i || 0, (n || 1 !== s) && (t.length > 0 ? t.includes(Number(o)) && (r += Number(i)) : r += Number(i));}), r;}, e.prototype.getUnreadCountByTag = function (e, t) {var n = this._store.getValueForTag()[e] || [],i = 0;return n.forEach(function (e) {var n = e.unreadMessageCount,r = e.notificationStatus;(t || 1 !== r) && (n = n || 0, i += Number(n));}), i;}, e.prototype.getUnreadCount = function (e, t) {return this._store.get(e, t).unreadMessageCount || 0;}, e.prototype.clearUnreadCount = function (e, t) {var n = this._store.get(e, t),i = n.unreadMessageCount,r = n.hasMentioned;(i || r) && (n.unreadMessageCount = 0, n.hasMentioned = !1), this._store.set(e, t, n);var s = Object.assign(n, { conversationType: e, targetId: t });this._setUpdatedConversation(s), this._notifyConversationChanged();}, e.prototype.startPullConversationStatus = function (e) {this._statusManager.pull(e);}, e.prototype.setDraft = function (e, t, n) {var i = e + "_" + t;this._draftMap[i] = n;}, e.prototype.getDraft = function (e, t) {var n = e + "_" + t;return this._draftMap[n];}, e.prototype.clearDraft = function (e, t) {var n = e + "_" + t;delete this._draftMap[n];}, e.prototype.addTagStatus = function (e, t, n) {var i = this._store.get(e, t).tags;i = Object.assign(i, n), this._store.set(e, t, { tags: i });}, e.prototype.deleteTagStatus = function (e, t, n) {var i = this._store.get(e, t).tags;n.forEach(function (e) {delete i[e];}), this._store.set(e, t, { tags: i });}, e.prototype.getConversationListForTag = function () {return this._store.getValueForTag();}, e;}(),Ar = function () {function e(e, t, n, i) {this._pullQueue = [], this._isPulling = !1, this._storageTagKey = "tag-" + t + "-" + n, this._storagePullTimeKey = "us-s-" + t + "-" + n, this._storage = I(e.runtime), this._engine = e, this._tagWatcherFunc = i;}return e.prototype._updateTag = function (e) {var t = e.tags,n = {};t.forEach(function (e) {n[e.tagId] = { tagName: e.tagName, createdTime: e.createdTime };}), this._storage.set(this._storageTagKey, n), this._tagWatcherFunc();}, e.prototype.addTag = function (e, t) {var n = this._storage.get(this._storageTagKey) || {};e.forEach(function (e) {var t,i = (null === (t = n[e.tagId]) || void 0 === t ? void 0 : t.createdTime) || e.createdTime || 0;n[e.tagId] = { tagName: e.tagName, createdTime: i };}), this._storage.set(this._storageTagKey, n), this._storage.set(this._storagePullTimeKey, t);}, e.prototype.deleteTag = function (e, t) {var n = this._storage.get(this._storageTagKey) || {};e.forEach(function (e) {delete n[e];}), this._storage.set(this._storageTagKey, n), this._storage.set(this._storagePullTimeKey, t);}, e.prototype.getTagsInfo = function () {return this._storage.get(this._storageTagKey) || {};}, e.prototype.getTags = function () {var e = this._storage.get(this._storageTagKey) || {},t = [];for (var n in e) {t.push({ tagId: n, tagName: e[n].tagName, createdTime: e[n].createdTime, conversationCount: 0 });}return t.sort(function (e, t) {return (e.createdTime || 0) - (t.createdTime || 0);});}, e.prototype.getTagById = function (e) {var t = this._storage.get(this._storageTagKey) || {};return t[e] ? { tagId: e, tagName: t[e].tagName, createdTime: t[e].createdTime, conversationCount: 0 } : null;}, e.prototype._startPull = function () {return w(this, void 0, void 0, function () {var e, t, n, i, r, s, o, a;return b(this, function (u) {switch (u.label) {case 0:return this._isPulling || 0 === this._pullQueue.length ? [2] : (this._isPulling = !0, e = this._pullQueue.splice(0, 1)[0], [4, this._engine.pullUserSettings(e)]);case 1:return t = u.sent(), n = t.code, i = t.data, n !== me.SUCCESS || se(i) ? (this._isPulling = !1, this._startPull()) : (s = (r = i).settings, o = r.version, a = s.Tag, se(a) || this._updateTag(a), this._storage.set(this._storagePullTimeKey, o), this._isPulling = !1, this._startPull()), [2];}});});}, e.prototype.pullUserSettings = function (e) {var t = this._storage.get(this._storagePullTimeKey) || 0;(e > t || 0 === e) && (this._pullQueue.push(t), this._startPull());}, e.prototype.getVersion = function () {return this._storage.get(this._storagePullTimeKey) || 0;}, e;}(),Ur = function (e) {function t(t, n) {var i = e.call(this, t, n) || this;return i._miniConnectUrl = "", i._connectType = n.connectionType, i;}return N(t, e), t.prototype._formatJSONPUrl = function (e, t, n, i) {return e + "/" + (this._runtime.isSupportSocket() && "websocket" === this._connectType ? "navi" : "cometnavi") + ".js?appId=" + n + "&token=" + encodeURIComponent(t) + "&callBack=" + i + "&v=" + this._apiVersion + "&r=" + Date.now();}, t.prototype.getInfo = function (t, n, i) {var r;return w(this, void 0, void 0, function () {var s;return b(this, function (o) {return this._runtime.useNavi || (s = void 0, s = this._runtime.isSupportSocket() && "websocket" === this._connectType ? c.join(",") : h.join(","), this._miniConnectUrl = (null === (r = this._options.miniCMPProxy) || void 0 === r ? void 0 : r.length) ? this._options.miniCMPProxy.join(",") : s || "", n = []), [2, e.prototype.getInfo.call(this, t, n, i)];});});}, t.prototype._reqNavi = function (e, t, n) {return w(this, void 0, void 0, function () {var i, r, s, o, a, u, c, h;return b(this, function (l) {switch (l.label) {case 0:i = "getServerEndpoint", r = 0, s = e.length, l.label = 1;case 1:return r < s ? (o = this._formatJSONPUrl(e[r], n, t, i), pe.debug("req navi => " + o), [4, this._runtime.httpReq({ url: o, timeout: 1e4 })]) : [3, 4];case 2:if (200 !== (a = l.sent()).status) return 403 === a.status && pe.error("request navi error: " + me.RC_CONN_USER_OR_PASSWD_ERROR), 401 === a.status && pe.error("request navi error: " + me.RC_CONN_APP_BLOCKED_OR_DELETED), [3, 3];try {return u = a.data.replace(i + "(", "").replace(/\);?$/, ""), h = JSON.parse(u), c = /^https/.test(o) ? "https" : "http", h.protocol = c, this._runtime.useNavi || (h.server = "", h.backupServer = this._miniConnectUrl, h.logSwitch = 0), [2, h];} catch (e) {pe.error("parse navi err =>", e);}l.label = 3;case 3:return r += 1, [3, 1];case 4:return this._runtime.useNavi ? [2, null] : [2, h = { code: 200, protocol: "https", server: "", voipCallInfo: "", kvStorage: 0, openHttpDNS: !1, historyMsg: !1, chatroomMsg: !1, uploadServer: "https://upload.qiniup.com", bosAddr: "https://gz.bcebos.com", location: "", monitor: 0, joinMChrm: !1, openMp: 0, openUS: 0, grpMsgLimit: 0, isFormatted: 0, gifSize: 2048, logSwitch: 0, logPolicy: "", compDays: 0, msgAck: "", activeServer: "", qnAddr: "", extkitSwitch: 0, alone: !1, voipServer: "", offlinelogserver: "", backupServer: this._miniConnectUrl }];}});});}, t;}(dr),Lr = function () {function e(e) {this._pullQueue = [], this._isPulling = !1, this._pullTime = 0, this._engine = e;}return e.prototype._startPull = function () {return w(this, void 0, void 0, function () {var e, t, n, i, r, s, o;return b(this, function (a) {switch (a.label) {case 0:return this._isPulling || 0 === this._pullQueue.length ? [2] : (this._isPulling = !0, e = this._pullQueue.splice(0, 1)[0], t = e.roomId, n = e.timestamp, (i = this._pullTime) > n ? (this._isPulling = !1, this._startPull(), [2]) : [4, this._engine.pullRTCRoomEntry(t, i)]);case 1:return r = a.sent(), s = r.code, o = r.data, s === me.SUCCESS ? (this._isPulling = !1, this._pullTime = o.syncTime || 0, this._startPull()) : this._startPull(), [2];}});});}, e.prototype.pullEntry = function (e, t) {this._pullQueue.push({ roomId: e, timestamp: t }), this._startPull();}, e.prototype.reset = function () {this._pullTime = 0, this._isPulling = !1;}, e;}(),Pr = function Pr(e, t) {return ["send_msg", e, t].join("_");},Dr = function () {function e(e, t) {this._runtime = e, this._appkey = t, this._sendMessageMap = {}, this._userId = "";}return e.prototype.init = function (e) {this._userId = e;var t = Pr(this._appkey, e);this._sendMessageMap = this._getLocalInfo(t);}, e.prototype._getLocalInfo = function (e) {var t = this._runtime.localStorage.getItem(e);try {return t ? JSON.parse(t) : {};} catch (e) {return {};}}, e.prototype.setMessage = function (e, t) {this._sendMessageMap[e] = t;var n = Pr(this._appkey, this._userId),i = this._getLocalInfo(n);i[e] = t, this._runtime.localStorage.setItem(n, JSON.stringify(i));}, e.prototype.getSendMessageMap = function () {return this._sendMessageMap;}, e.prototype.removeByUID = function (e) {delete this._sendMessageMap[e];}, e.prototype.removeByTimestamp = function (e) {var t = Pr(this._appkey, this._userId),n = this._getLocalInfo(t);Object.keys(n).forEach(function (t) {n[t] < e && delete n[t];}), this._runtime.localStorage.setItem(t, JSON.stringify(n));}, e;}(),Vr = function Vr(e) {var t = "RCDeviceId",n = I(e),i = "",r = n.get(t);return r ? i = r : (i = H(), n.set(t, i)), i;};(Nr = {})[j.PRIVATE] = ir.qryPMsg, Nr[j.GROUP] = ir.qryGMsg, Nr[j.CHATROOM] = ir.qryCHMsg, Nr[j.CUSTOMER_SERVICE] = ir.qryCMsg, Nr[j.SYSTEM] = ir.qrySMsg;var kr = [ir[ir.recallMsg], ir[ir.ppMsgS], ir[ir.pgMsgS], ir[ir.ppMsgP], ir[ir.pgMsgP], ir[ir.chatMsg], ir[ir.pcMsgP], ir[ir.prMsgS]],xr = function xr(e, t, n, r, s, o) {return { conversationType: e, targetId: t, senderUserId: o, messageDirection: ye.SEND, isCounted: !!n.isCounted, isMentioned: !!n.isMentioned, content: n.content, messageType: n.messageType, isOffLineMessage: !1, isPersited: !!n.isPersited, messageUId: r, sentTime: s, receivedTime: 0, disableNotification: !!n.disableNotification, isStatusMessage: !!n.isStatusMessage, canIncludeExpansion: !!n.canIncludeExpansion, expansion: n.canIncludeExpansion ? n.expansion : null, receivedStatus: i.UNREAD, pushConfig: n.pushConfig };},Br = function (e) {function t(t, n, i) {var r = e.call(this, t, n, i) || this;return r._customMessageType = {}, r._reconnectTimer = -1, r._pullOfflineFinished = !1, r._connectedTime = 0, r._localConnectedTime = 0, r._pullingMsg = !1, r._pullQueue = [], r._chrmsQueue = {}, r._latestSyncTimestamp = 0, r._intervalTimer = -1, r._letterbox = new gr(t, i.appkey), r._sendMessageStore = new Dr(t, i.appkey), r._chrmEntryHandler = new Er(r), r;}return N(t, e), t.prototype._createNavi = function () {return new Ur(this.runtime, this._options);}, t.prototype.getConnectedTime = function () {return this._connectedTime;}, t.prototype.connect = function (e, t) {return w(this, void 0, void 0, function () {var n,i,r,s,o,a = this;return b(this, function (u) {switch (u.label) {case 0:return n = [], this._naviInfo = t, t.server ? n.push(t.server) : pe.warn("navi.server is invalid"), (i = t.backupServer) && i.split(",").forEach(function (e) {n.indexOf(e) < 0 && n.push(e);}), 0 === n.length ? (pe.error("navi invaild.", n), [2, me.UNKNOWN]) : (r = this.runtime.createDataChannel({ status: function status(i) {a._connectionStatusHandler(i, e, n, t.protocol);}, signal: this._signalHandler.bind(this) }, this._options.connectionType), s = We.V3, 1 === t.openAnti && (s = We.V4), [4, r.connect(this._appkey, e, n, t.protocol, this._apiVer, s)]);case 1:return (o = u.sent()) === me.SUCCESS ? (this._channel = r, this.currentUserId = r.userId, this._connectedTime = r.connectedTime, this._localConnectedTime = Math.floor((Date.now() + r.sendConnectTime) / 2), this._watcher.status(Te.CONNECTED), this._pullOfflineFinished = !1, this._conversationManager = new Mr(this, this._appkey, this.currentUserId, this._watcher.conversation), this._conversationManager.startPullConversationStatus(0), this._userSettingManager = new Ar(this, this._appkey, this.currentUserId, this._watcher.tag), this._userSettingManager.pullUserSettings(0), this._sendMessageStore.init(this.currentUserId), this._rtcKVManager = new Lr(this), this._joinedChrmManager = new mr(this.runtime, this._appkey, this.currentUserId, t.joinMChrm), this._startSyncInterval()) : r.close(), [2, o];}});});}, t.prototype._connectionStatusHandler = function (e, t, n, i) {if (pe.warn("connection status changed:", e), e !== Te.CONNECTING && e !== Te.CONNECTED) {if (this._channel && e !== Te.DISCONNECTED) return e === Te.BLOCKED || e === Te.KICKED_OFFLINE_BY_OTHER_CLIENT || e === Te.DISCONNECT_BY_SERVER ? (this.disconnect(), void this._watcher.status(e)) : void (e !== Te.REDIRECT ? this._try2Reconnect(t, n, i) : this._watcher.status(e));this._watcher.status(e);} else this._watcher.status(e);}, t.prototype._try2Reconnect = function (e, t, n) {return w(this, void 0, void 0, function () {var i,r = this;return b(this, function (s) {switch (s.label) {case 0:return this._channel ? (i = We.V3, 1 === this._naviInfo.openAnti && (i = We.V4), [4, this._channel.connect(this._appkey, e, t, n, this._apiVer, i)]) : [2];case 1:return s.sent() === me.SUCCESS ? (this._pullOfflineFinished = !1, this._startSyncInterval(), this._watcher.status(Te.CONNECTED), this._rejoinChrm(), pe.__insertLogIntoDatabase(), [2]) : (this._watcher.status(Te.WEBSOCKET_UNAVAILABLE), this._reconnectTimer = setTimeout(function () {r._reconnectTimer = -1, r._try2Reconnect(e, t, n);}, 5e3), [2]);}});});}, t.prototype._signalHandler = function (e, t) {var n = e.syncMsg,i = e.topic;if (n) this._receiveSyncMsg(e, t);else {var r = ir[i];if (r) switch (r) {case ir.s_ntf:pe.info("recv s_ntf -> signal.messageId: " + e.messageId), this._pullMsg(e);break;case ir.s_msg:this._receiveMsg(e);break;case ir.s_cmd:this._receiveStateNotify(e);break;case ir.s_us:this._receiveSettingNotify(e);break;case ir.rtc_ntf:this._receiveRtcKv(e);} else pe.error("unknown topic:", i);}}, t.prototype._receiveStateNotify = function (e) {var t,n = null === (t = this._channel) || void 0 === t ? void 0 : t.codec.decodeByPBName(e.data, Ut),i = n.time,r = n.type,s = n.chrmId;switch (r) {case 2:this._chrmEntryHandler.pullEntry(s, i);break;case 3:this._conversationManager.startPullConversationStatus(i);break;case 4:this._chrmEntryHandler.reset(s), this._watcher.chatroom({ chatroomDestroyed: e.targetId });}}, t.prototype._receiveSettingNotify = function (e) {var t,n = (null === (t = this._channel) || void 0 === t ? void 0 : t.codec.decodeByPBName(e.data, wn)).version;this._userSettingManager.pullUserSettings(n);}, t.prototype._receiveRtcKv = function (e) {var t,n = null === (t = this._channel) || void 0 === t ? void 0 : t.codec.decodeByPBName(e.data, Gn),i = n.time,r = n.type,s = n.roomId;switch (r) {case 1:this._rtcKVManager.pullEntry(s, i);}}, t.prototype._receiveMessageExpansion = function (e) {var t = e.content,n = t.put,i = t.del,r = t.mid;n && this._watcher.expansion({ updatedExpansion: { messageUId: r, expansion: n } }), i && this._watcher.expansion({ deletedExpansion: { messageUId: r, deletedKeys: i } });}, t.prototype._receiveSyncMsg = function (e, t) {var n;if (kr.includes(e.topic)) {var i = null === (n = this._channel) || void 0 === n ? void 0 : n.codec.decodeByPBName(e.data, Rt, { currentUserId: this.currentUserId, signal: e });i = this._handleMsgProperties(i), t && (i.sentTime = t.timestamp, i.messageUId = t.messageUId), this._pullingMsg ? this._pullQueue.push((null == t ? void 0 : t.timestamp) || i.sentTime) : (t && this._sendMessageStore.setMessage(t.messageUId, t.timestamp), i.messageType !== Re.EXPANSION_NOTIFY ? (i.messageType === Re.SYNC_READ_STATUS && this._conversationManager.clearUnreadCount(i.conversationType, i.targetId), this._conversationManager.setConversationCacheByMessage(i, !0), this._watcher.message(i)) : this._receiveMessageExpansion(i));}}, t.prototype._pullMsg = function (e) {if (this._channel) {var t = this._channel.codec.decodeByPBName(e.data, Ut),n = t.type,i = t.chrmId,r = t.time;if (pe.info("s_ntf -> type: " + n + ", chrmId: " + i + ", time: " + r), 2 === n) {var s = this._chrmsQueue[i];if (!s) return;s.queue.push(r), this._pullChrmMsg(i);} else this._pullQueue.push(r), this._syncMsg();}}, t.prototype._startSyncInterval = function () {var e = this;this._stopSyncInterval();this._intervalTimer = setInterval(function () {Date.now() - e._latestSyncTimestamp >= 18e4 && e._syncMsg();}, 3e4), this._latestSyncTimestamp = Date.now(), this._syncMsg();}, t.prototype._stopSyncInterval = function () {-1 !== this._intervalTimer && (clearInterval(this._intervalTimer), this._intervalTimer = -1);}, t.prototype._syncMsg = function () {return w(this, void 0, void 0, function () {var e,t,n,i,r,s,o,a,u,c,h,l,f,d = this;return b(this, function (p) {switch (p.label) {case 0:return this._pullingMsg ? [2] : this._channel ? (this._pullingMsg = !0, e = this._letterbox.getOutboxTime(this.currentUserId), t = this._letterbox.getInboxTime(this.currentUserId), pe.info("pullMsg -> sendboxTime: " + e + ", inboxTime: " + t), n = this._channel.codec.encodeSyncMsg({ sendboxTime: e, inboxTime: t }), i = new Xi(ir[ir.pullMsg], n, this.currentUserId), [4, this._channel.send(i, Ot, { connectedTime: this._channel.connectedTime, currentUserId: this.currentUserId })]) : (this._pullingMsg = !1, [2]);case 1:return r = p.sent(), s = r.code, o = r.data, this._latestSyncTimestamp = Date.now(), s === me.SUCCESS && o ? (a = o.list, u = o.finished, c = o.syncTime, pe.info("pullMsg success -> syncTime: " + c + ", finished: " + u), h = 0, a.forEach(function (e) {if (e.messageDirection === ye.SEND && (h = Math.max(e.sentTime, h), d._sendMessageStore.getSendMessageMap()[e.messageUId])) return void d._sendMessageStore.removeByUID(e.messageUId);if (e.messageType !== Re.EXPANSION_NOTIFY) {if (e.messageType === Re.SYNC_READ_STATUS) {if (e.senderUserId !== d.currentUserId) return;d._conversationManager.clearUnreadCount(e.conversationType, e.targetId);}var t = d._handleMsgProperties(e);d._conversationManager.setConversationCacheByMessage(t, !0), d._watcher.message(t);} else d._receiveMessageExpansion(e);}), this._letterbox.setInboxTime(c, this.currentUserId), this._letterbox.setOutboxTime(h, this.currentUserId), this._sendMessageStore.removeByTimestamp(h), this._pullingMsg = !1, l = this._pullQueue.filter(function (e) {return e > c;}), this._pullQueue.length = 0, (f = this._pullQueue).push.apply(f, l), u && !this._pullOfflineFinished && (this._pullOfflineFinished = !0, this._watcher.pullFinished()), (!u || l.length > 0) && this._syncMsg(), [2]) : (pe.warn("pullMsg failed -> code:", s, ", data: ", o), this._pullingMsg = !1, [2]);}});});}, t.prototype._receiveMsg = function (e) {if (this._channel && !this._pullingMsg) if (this._pullQueue.length > 0) this._syncMsg();else {var t = this._channel.codec.decodeByPBName(e.data, Nt, { currentUserId: this.currentUserId, connectedTime: this._channel.connectedTime });(t = this._handleMsgProperties(t)).senderUserId === this.currentUserId && this._sendMessageStore.setMessage(t.messageUId, t.sentTime), t.isStatusMessage || t.senderUserId === this.currentUserId || this._letterbox.setInboxTime(t.sentTime, this.currentUserId), t.messageType !== Re.EXPANSION_NOTIFY ? t.messageType === Re.SYNC_READ_STATUS && t.senderUserId !== this.currentUserId || (this._conversationManager.setConversationCacheByMessage(t, !0), this._watcher.message(t)) : this._receiveMessageExpansion(t);}}, t.prototype._handleMsgProperties = function (e, t) {void 0 === t && (t = !1);var n,i = e.messageType,r = e.isCounted,s = e.isPersited,o = e.isStatusMessage,a = (i in m),u = (i in this._customMessageType);return n = a ? m[i] : u ? this._customMessageType[i] : { isCounted: !oe(r) && r, isPersited: !oe(s) && s }, Object.assign(e, { isCounted: n.isCounted, isPersited: n.isPersited, isStatusMessage: T.includes(i) }), t && (e.isStatusMessage = o), e;}, t.prototype.getHistoryMessage = function (e, t, n, i, r) {return w(this, void 0, void 0, function () {var s, o, a, u, c, h, l, f, d;return b(this, function (p) {switch (p.label) {case 0:return o = (s = this).currentUserId, a = s._channel, u = Mi[e] || Ri, c = 1 === i && 0 === n, a ? (h = a.codec.encodeGetHistoryMsg(t, { timestamp: n, count: c ? 2 : i, order: r }), [4, a.send(new Xi(u, h, o), Pt, { currentUserId: o, connectedTime: a.connectedTime, conversation: { targetId: t } })]) : [3, 2];case 1:return l = p.sent(), (f = l.code) !== me.SUCCESS ? [2, { code: f }] : (d = l.data, c && 2 === d.list.length && (d.hasMore = !0, 0 === r ? d.list.shift() : d.list.pop()), [2, { code: f, data: { list: d.list, hasMore: d.hasMore } }]);case 2:return [2, { code: me.RC_NET_CHANNEL_INVALID }];}});});}, t.prototype.reportSDKInfo = function (e) {var t = this.currentUserId,n = this._channel;if (n) {pe.debug("reportSDKInfo ->", e);var i = n.codec.encodeReportSDKInfo(JSON.stringify(e)),r = new Xi(ir[ir.reportsdk], i, t);n.send(r).then(function (e) {var t = e.code;t !== me.SUCCESS && pe.warn("reportSDKInfo failed -> code: " + t);});}}, t.prototype.deleteRemoteMessage = function (e, t, n) {return w(this, void 0, void 0, function () {var i, r, s, o, a, u, c;return b(this, function (h) {switch (h.label) {case 0:return r = (i = this).currentUserId, (s = i._channel) ? (o = s.codec.encodeDeleteMessages(e, t, n), a = new Xi(fi, o, r), [4, s.send(a)]) : [3, 2];case 1:return u = h.sent(), c = u.code, me.SUCCESS, [2, c];case 2:return [2, me.RC_NET_CHANNEL_INVALID];}});});}, t.prototype.deleteRemoteMessageByTimestamp = function (e, t, n) {return w(this, void 0, void 0, function () {var i, r, s, o, a, u, c, h;return b(this, function (l) {switch (l.label) {case 0:return r = (i = this).currentUserId, (s = i._channel) ? (o = s.codec.encodeClearMessages(t, n), a = Ai[e], u = new Xi(a, o, r), [4, s.send(u)]) : [3, 2];case 1:return c = l.sent(), h = c.code, me.SUCCESS, [2, h];case 2:return [2, me.RC_NET_CHANNEL_INVALID];}});});}, t.prototype.getConversationList = function (e, t, n, i, r) {return void 0 === e && (e = 300), w(this, void 0, void 0, function () {var r,s,o,a,u,c,h,l,f = this;return b(this, function (d) {switch (d.label) {case 0:return s = (r = this).currentUserId, o = r._channel, t = t || j.PRIVATE, o ? (a = o.codec.encodeOldConversationList({ count: e, type: t, startTime: n, order: i }), u = new Xi(vi, a, s), [4, o.send(u, Vt, { currentUserId: s, connectedTime: o.connectedTime, afterDecode: function afterDecode(e) {var t = e.conversationType,n = e.targetId,i = f._conversationManager.get(t, n);return Object.assign(e, i), e;} })]) : [3, 2];case 1:return c = d.sent(), h = c.code, l = c.data, h !== me.SUCCESS ? [2, { code: h }] : [2, { code: h, data: l }];case 2:return [2, { code: me.RC_NET_CHANNEL_INVALID }];}});});}, t.prototype.removeConversation = function (e, t) {return w(this, void 0, void 0, function () {var n, i, r, s, o;return b(this, function (a) {switch (a.label) {case 0:return (n = this._channel) ? (i = n.codec.encodeOldConversationList({ type: e }), r = new Xi(Ti, i, t), [4, n.send(r)]) : [3, 2];case 1:return s = a.sent(), pe.info("RemoveConversation =>", s), o = s.code, me.SUCCESS, [2, o];case 2:return [2, me.RC_NET_CHANNEL_INVALID];}});});}, t.prototype.getConversation = function (e, t, n) {return w(this, void 0, void 0, function () {var i, r, s, o, a, u;return b(this, function (c) {switch (c.label) {case 0:return (i = this._conversationManager.get(e, t)) ? [4, this.getHistoryMessage(e, t, 0, 1, 0)] : [2, { code: me.CONVER_GET_ERROR }];case 1:return r = c.sent(), s = r.code, o = r.data, s !== me.SUCCESS ? [2, { code: me.CONVER_GET_ERROR }] : (a = (null == o ? void 0 : o.list[0]) || null, u = { conversationType: e, targetId: t, channelId: n, unreadMessageCount: i.unreadMessageCount || 0, latestMessage: a, notificationStatus: i.notificationStatus || Ne.CLOSE, isTop: i.isTop || !1, lastUnreadTime: i.lastUnreadTime || 0 }, [2, { code: me.SUCCESS, data: u }]);}});});}, t.prototype.getAllConversationUnreadCount = function (e, t, n) {var i = this._conversationManager.getAllUnreadCount(e, t, n);return Promise.resolve({ code: me.SUCCESS, data: i });}, t.prototype.getConversationUnreadCount = function (e, t) {var n = this._conversationManager.getUnreadCount(e, t);return Promise.resolve({ code: me.SUCCESS, data: n });}, t.prototype.clearConversationUnreadCount = function (e, t) {return this._conversationManager.clearUnreadCount(e, t), Promise.resolve(me.SUCCESS);}, t.prototype.getFirstUnreadMessage = function (e, t) {throw new Error("Method not implemented.");}, t.prototype.saveConversationMessageDraft = function (e, t, n) {return this._conversationManager.setDraft(e, t, n), Promise.resolve(me.SUCCESS);}, t.prototype.getConversationMessageDraft = function (e, t) {var n = this._conversationManager.getDraft(e, t);return Promise.resolve({ code: me.SUCCESS, data: n });}, t.prototype.clearConversationMessageDraft = function (e, t) {return this._conversationManager.clearDraft(e, t), Promise.resolve(me.SUCCESS);}, t.prototype.pullConversationStatus = function (e) {return w(this, void 0, void 0, function () {var t, n, i, r, s, o, a, u;return b(this, function (c) {switch (c.label) {case 0:return n = (t = this)._channel, i = t.currentUserId, n ? (r = n.codec.encodeGetConversationStatus(e), s = new Xi(ir[ir.pullSeAtts], r, i), [4, n.send(s, Mn)]) : [3, 2];case 1:return o = c.sent(), a = o.code, u = o.data, a !== me.SUCCESS ? [2, { code: a }] : [2, { code: a, data: u }];case 2:return [2, { code: me.RC_NET_CHANNEL_INVALID }];}});});}, t.prototype.batchSetConversationStatus = function (e) {return w(this, void 0, void 0, function () {var t,n,i,r,s,o,a,u,c,h = this;return b(this, function (l) {switch (l.label) {case 0:return n = (t = this).currentUserId, (i = t._channel) ? (r = i.codec.encodeSetConversationStatus(e), s = new Xi(Ii, r, n), [4, i.send(s, Pn)]) : [3, 2];case 1:return o = l.sent(), a = o.code, u = o.data, a === me.SUCCESS ? (c = u, e.forEach(function (e) {h._conversationManager.addStatus(_O(_O({}, e), { updatedTime: c.version }), !0);}), [2, a]) : [2, a];case 2:return [2, me.RC_NET_CHANNEL_INVALID];}});});}, t.prototype._joinChrm = function (e, t, n) {return w(this, void 0, void 0, function () {var i, r, s, o, a, u, c;return b(this, function (h) {switch (h.label) {case 0:return (i = this._channel) ? (r = i.codec.encodeJoinOrQuitChatRoom(), s = new Xi(n ? pi : di, r, e), [4, i.send(s, Gt)]) : [2, me.RC_NET_CHANNEL_INVALID];case 1:return o = h.sent(), a = o.code, u = o.data, a === me.SUCCESS && (c = u.joinTime, this._chrmsQueue[e] || (this._chrmsQueue[e] = { pulling: !1, queue: [], timestamp: 0 }), this._pullChrmMsg(e, t, c), this._naviInfo.kvStorage && this._chrmEntryHandler.pullEntry(e, 0), this._joinedChrmManager.set(e, t)), [2, a];}});});}, t.prototype._rejoinChrm = function () {return w(this, void 0, void 0, function () {var e, t, n, i, r, s;return b(this, function (o) {switch (o.label) {case 0:for (n in e = this._joinedChrmManager.get(), t = [], e) {t.push(n);}i = 0, o.label = 1;case 1:return i < t.length ? (r = t[i], [4, this._joinChrm(r, e[r] || 10, !0)]) : [3, 4];case 2:(s = o.sent()) === me.SUCCESS ? this._watcher.chatroom({ rejoinedRoom: { chatroomId: r, count: e[r] } }) : this._watcher.chatroom({ rejoinedRoom: { chatroomId: r, errorCode: s } }), o.label = 3;case 3:return i++, [3, 1];case 4:return [2];}});});}, t.prototype._pullChrmMsg = function (e, t, n) {return void 0 === t && (t = 10), void 0 === n && (n = 0), w(this, void 0, void 0, function () {var i,r,s,o,a,u,c,h,l,f,d,p = this;return b(this, function (g) {switch (g.label) {case 0:return this._channel ? (i = this._chrmsQueue[e], r = i.pulling, s = i.timestamp, r ? [2] : (i.pulling = !0, o = this._channel.codec.encodeChrmSyncMsg(s, t), a = new Xi(ir[ir.chrmPull], o, e), [4, this._channel.send(a, Ot, { connectedTime: this._channel.connectedTime, currentUserId: this.currentUserId })])) : [2];case 1:return u = g.sent(), c = u.code, h = u.data, i.pulling = !1, c === me.SUCCESS && h ? (l = h.list, f = h.syncTime, d = h.finished, i.timestamp = n ? Math.max(f, n) : f, i.queue = i.queue.filter(function (e) {return e > f;}), l.forEach(function (e) {e.sentTime < s || p._watcher.message(e);}), (!d || i.queue.length > 0) && this._pullChrmMsg(e), [2]) : (pe.warn("pull chatroom msg failed, code:", c, ", data:", h), [2]);}});});}, t.prototype.joinChatroom = function (e, t) {return w(this, void 0, void 0, function () {return b(this, function (n) {return [2, this._joinChrm(e, t, !1)];});});}, t.prototype.joinExistChatroom = function (e, t) {return w(this, void 0, void 0, function () {return b(this, function (n) {return [2, this._joinChrm(e, t, !0)];});});}, t.prototype.quitChatroom = function (e) {return w(this, void 0, void 0, function () {var t, n, i, r, s;return b(this, function (o) {switch (o.label) {case 0:return (t = this._channel) ? (n = t.codec.encodeJoinOrQuitChatRoom(), i = new Xi(gi, n, e), [4, t.send(i)]) : [2, me.RC_NET_CHANNEL_INVALID];case 1:return r = o.sent(), (s = r.code) === me.SUCCESS && (delete this._chrmsQueue[e], this._chrmEntryHandler.reset(e), this._joinedChrmManager.remove(e)), [2, s];}});});}, t.prototype.getChatroomInfo = function (e, t, n) {return w(this, void 0, void 0, function () {var i, r, s, o, a, u;return b(this, function (c) {switch (c.label) {case 0:return (i = this._channel) ? (r = i.codec.encodeGetChatRoomInfo(t, n), s = new Xi(ir[ir.queryChrmI], r, e), [4, i.send(s, Qt)]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];case 1:return o = c.sent(), a = o.code, u = o.data, a !== me.SUCCESS ? [2, { code: a }] : [2, { code: a, data: u }];}});});}, t.prototype.getChatroomHistoryMessages = function (e, t, n, i) {return w(this, void 0, void 0, function () {var r, s, o, a, u, c;return b(this, function (h) {switch (h.label) {case 0:return (r = this._channel) ? (s = r.codec.encodeGetHistoryMsg(e, { timestamp: t, count: n, order: i }), o = new Xi(Ni, s, e), [4, r.send(o, Pt, { conversation: { targetId: e } })]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];case 1:return a = h.sent(), u = a.code, c = a.data, u !== me.SUCCESS ? [2, { code: u }] : [2, { code: u, data: { list: c.list, hasMore: c.hasMore } }];}});});}, t.prototype._modifyChatroomKV = function (e, t) {return w(this, void 0, void 0, function () {var n, i, r, s, o, a, u, c;return b(this, function (h) {switch (h.label) {case 0:return i = (n = this)._channel, r = n.currentUserId, i ? (s = i.codec.encodeModifyChatRoomKV(e, t, r), o = t.type === Ue.UPDATE ? _i : yi, a = new Xi(o, s, e), [4, i.send(a)]) : [2, me.RC_NET_CHANNEL_INVALID];case 1:return u = h.sent(), (c = u.code) === me.SUCCESS ? (this._chrmEntryHandler.setLocal(e, { kvEntries: [t], syncTime: new Date().getTime() }, r), [2, c]) : [2, c];}});});}, t.prototype._modifyChatroomKVS = function (e, t) {return w(this, void 0, void 0, function () {var n, i, r, s, o, a, u, c, h, l, f, d;return b(this, function (p) {switch (p.label) {case 0:return i = (n = this)._channel, r = n.currentUserId, i ? (s = i.codec.encodeModifyChatRoomKVS(e, t, r), o = t.type === Ue.UPDATE ? Ei : mi, a = new Xi(o, s, e), [4, i.send(a, Tn)]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];case 1:return u = p.sent(), c = u.code, -1 !== [me.SUCCESS, me.CHATROOM_KV_STORE_NOT_ALL_SUCCESS].indexOf(c) && (l = [], delete (f = Object.assign({}, t)).entries, t.entries.forEach(function (e) {l.push(Object.assign({}, e, f));}), c === me.CHATROOM_KV_STORE_NOT_ALL_SUCCESS && (d = u.data, pe.warn("设置失败的属性：", d.errorKeys), h = d.errorKeys, d && Array.isArray(d.errorKeys) && d.errorKeys.forEach(function (e) {var t = l.findIndex(function (t) {return e.key === t.key;});-1 !== t && l.splice(t, 1);})), pe.warn("设置成功的属性：", l), this._chrmEntryHandler.setLocal(e, { kvEntries: l, syncTime: new Date().getTime() }, r)), [2, { code: c, data: h }];}});});}, t.prototype.setChatroomEntry = function (e, t) {return w(this, void 0, void 0, function () {return b(this, function (n) {return t.type = Ue.UPDATE, t.userId = t.userId || this.currentUserId, [2, this._modifyChatroomKV(e, t)];});});}, t.prototype.setChatroomEntries = function (e, t) {return w(this, void 0, void 0, function () {return b(this, function (n) {return t.type = Ue.UPDATE, t.userId = t.userId || this.currentUserId, [2, this._modifyChatroomKVS(e, t)];});});}, t.prototype.forceSetChatroomEntry = function (e, t) {return w(this, void 0, void 0, function () {return b(this, function (n) {return t.type = Ue.UPDATE, t.isOverwrite = !0, t.userId = t.userId || this.currentUserId, [2, this._modifyChatroomKV(e, t)];});});}, t.prototype.removeChatroomEntry = function (e, t) {return w(this, void 0, void 0, function () {return b(this, function (n) {return t.type = Ue.DELETE, t.userId = t.userId || this.currentUserId, [2, this._modifyChatroomKV(e, t)];});});}, t.prototype.removeChatroomEntries = function (e, t) {return w(this, void 0, void 0, function () {return b(this, function (n) {return t.type = Ue.DELETE, t.userId = t.userId || this.currentUserId, [2, this._modifyChatroomKVS(e, t)];});});}, t.prototype.forceRemoveChatroomEntry = function (e, t) {return w(this, void 0, void 0, function () {return b(this, function (n) {return t.type = Ue.DELETE, t.isOverwrite = !0, t.userId = t.userId || this.currentUserId, [2, this._modifyChatroomKV(e, t)];});});}, t.prototype.getChatroomEntry = function (e, t) {return w(this, void 0, void 0, function () {var n, i, r, s, o, a, u;return b(this, function (c) {switch (c.label) {case 0:return (n = this._chrmEntryHandler.getValue(e, t)) ? [2, Promise.resolve({ code: me.SUCCESS, data: n })] : [3, 1];case 1:return (i = this._channel) ? (r = i.codec.encodePullChatRoomKV(0), s = new Xi(ir[ir.pullKV], r, e), [4, i.send(s, vn)]) : [2, Promise.reject({ code: me.RC_NET_CHANNEL_INVALID })];case 2:return o = c.sent(), (a = o.data || {}) && a.kvEntries && a.kvEntries.length && void 0 !== (u = a.kvEntries.find(function (e) {return e.key === t;})) ? [2, Promise.resolve({ code: me.SUCCESS, data: null == u ? void 0 : u.value })] : [2, Promise.resolve({ code: me.CHATROOM_KEY_NOT_EXIST })];}});});}, t.prototype.getAllChatroomEntry = function (e) {return w(this, void 0, void 0, function () {var t, n, i, r, s, o, a;return b(this, function (u) {switch (u.label) {case 0:return (t = this._chrmEntryHandler.getAll(e)) && Object.keys(t).length ? [2, Promise.resolve({ code: me.SUCCESS, data: t })] : [3, 1];case 1:return (n = this._channel) ? (i = {}, r = n.codec.encodePullChatRoomKV(0), s = new Xi(ir[ir.pullKV], r, e), [4, n.send(s, vn)]) : [2, Promise.reject({ code: me.RC_NET_CHANNEL_INVALID })];case 2:return o = u.sent(), (a = o.data || {}) && a.kvEntries && a.kvEntries.length && a.kvEntries.forEach(function (e) {e.key && (i[e.key] = e.value || "");}), [2, Promise.resolve({ code: me.SUCCESS, data: i })];}});});}, t.prototype.pullChatroomEntry = function (e, t) {return w(this, void 0, void 0, function () {var n, i, r, s, o, a, u, c, h, l;return b(this, function (f) {switch (f.label) {case 0:return i = (n = this)._channel, r = n.currentUserId, i ? (s = i.codec.encodePullChatRoomKV(t), o = new Xi(ir[ir.pullKV], s, e), [4, i.send(o, vn)]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];case 1:return a = f.sent(), u = a.code, c = a.data, u === me.SUCCESS ? (pe.info("Pull success ChrmKV, " + JSON.stringify(a)), this._chrmEntryHandler.setLocal(e, c, r), pe.info("Save into cache success!"), h = c.kvEntries, l = [], h.length > 0 && (h.forEach(function (t) {var n = t.key,i = t.value,r = t.type,s = t.timestamp;l.push({ key: n, value: i, type: r, timestamp: s, chatroomId: e });}), this._watcher.chatroom({ updatedEntries: l })), [2, { code: u, data: c }]) : [2, { code: u }];}});});}, t.prototype.sendMessage = function (e, t, n) {return w(this, void 0, void 0, function () {var i, r, s, o, a, u, c, h, l, f;return b(this, function (d) {switch (d.label) {case 0:return this._channel ? (n = function (e, t) {return "RC:SRSMsg" === e.messageType && Object.assign(e, { directionalUserIdList: [t] }), e;}(n, this.currentUserId), n = this._handleMsgProperties(n, !0), i = !![j.PRIVATE, j.GROUP].includes(e) && n.isStatusMessage, r = i ? function (e) {var t;return (t = {}, t[j.PRIVATE] = ir.ppMsgS, t[j.GROUP] = ir.pgMsgS, t)[e];}(e) : function (e) {var t;return (t = {}, t[j.PRIVATE] = ir.ppMsgP, t[j.GROUP] = ir.pgMsgP, t[j.CHATROOM] = ir.chatMsg, t[j.CUSTOMER_SERVICE] = ir.pcMsgP, t[j.RTC_ROOM] = ir.prMsgS, t)[e];}(e) || ir.ppMsgP, i && (n.isPersited = !1, n.isCounted = !1), s = this._channel.codec.encodeUpMsg({ type: e, targetId: t }, n), (o = new Wi(ir[r], s, t)).setHeaderQos(Ge.AT_LEAST_ONCE), i ? (this._channel.sendOnly(o), [2, { code: me.SUCCESS, data: xr(e, t, _O({}, n), "", 0, this.currentUserId) }]) : (a = Date.now() - this._localConnectedTime + this._connectedTime, u = xr(e, t, _O({}, n), "", a, this.currentUserId), [4, this._channel.send(o)])) : [2, { code: me.RC_NET_CHANNEL_INVALID }];case 1:return c = d.sent(), h = c.code, l = c.data, h !== me.SUCCESS ? [2, { code: h, data: u }] : (f = l, this._sendMessageStore.setMessage(f.messageUId, f.timestamp), u.sentTime = f.timestamp, u.messageUId = f.messageUId, this._conversationManager.setConversationCacheByMessage(u, !0), [2, { code: me.SUCCESS, data: u }]);}});});}, t.prototype.recallMsg = function (e, t, n, i, r) {var s;return w(this, void 0, void 0, function () {var o, a, u, c, h, l, f, d, p, g;return b(this, function (_) {switch (_.label) {case 0:return this._channel ? (o = r.user, a = { content: { conversationType: e, targetId: t, messageUId: n, sentTime: i, user: o }, messageType: "RC:RcCmd", disableNotification: null == r ? void 0 : r.disableNotification, pushConfig: null == r ? void 0 : r.pushConfig, pushContent: (null === (s = r.pushConfig) || void 0 === s ? void 0 : s.pushContent) || r.pushContent || "" }, u = ir[ir.recallMsg], c = this._channel.codec.encodeUpMsg({ type: e, targetId: t }, a), (h = new Wi(u, c, this.currentUserId)).setHeaderQos(Ge.AT_LEAST_ONCE), [4, this._channel.send(h)]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];case 1:return l = _.sent(), f = l.code, d = l.data, f !== me.SUCCESS ? [2, { code: f }] : (p = d, this._sendMessageStore.setMessage(p.messageUId, p.timestamp), g = xr(e, t, _O(_O({}, a), { isPersited: !0 }), p.messageUId, p.timestamp, this.currentUserId), this._conversationManager.setConversationCacheByMessage(g, !0), [2, { code: me.SUCCESS, data: g }]);}});});}, t.prototype.sendReadReceiptMessage = function (e, t, n) {return w(this, void 0, void 0, function () {var i, r;return b(this, function (s) {switch (s.label) {case 0:return this._channel ? (i = this._channel.codec.encodeReadReceipt(t, n), r = new Xi(ir[ir.rrMsg], i, e), [4, this._channel.send(r)]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];case 1:return [2, s.sent()];}});});}, t.prototype.getMessageReader = function (e, t, n) {return w(this, void 0, void 0, function () {var i, r;return b(this, function (s) {switch (s.label) {case 0:return this._channel ? (i = this._channel.codec.encodeMessageReader(t, n), r = new Xi(ir[ir.rrList], i, e), [4, this._channel.send(r, kn)]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];case 1:return [2, s.sent()];}});});}, t.prototype.pullUserSettings = function (e) {return w(this, void 0, void 0, function () {var t, n;return b(this, function (i) {return this._channel ? (t = this._channel.codec.encodePullUserSetting(e), n = new Xi(ir[ir.pullUS], t, this.currentUserId), [2, this._channel.send(n, On)]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];});});}, t.prototype.getFileToken = function (e, t, n, i) {return w(this, void 0, void 0, function () {var r, s, o, a, u, c;return b(this, function (h) {switch (h.label) {case 0:return this._channel ? (r = i && "uploads" !== i ? t || "" : tt(e, t), s = this._channel.codec.encodeGetFileToken(e, r, n || "", i || ""), o = new Xi(ir[ir.qnTkn], s, this.currentUserId), [4, this._channel.send(o, fn)]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];case 1:return a = h.sent(), u = a.code, c = a.data, c = Object.assign(c, { fileName: r }), u === me.SUCCESS ? [2, { code: u, data: c }] : [2, { code: u }];}});});}, t.prototype.getFileUrl = function (e, t, n, i) {return w(this, void 0, void 0, function () {var r, s, o, a, u, c, h, l, f;return b(this, function (d) {switch (d.label) {case 0:return this._channel ? (r = "", s = "", o = "", t === Me.QINIU ? (s = dn, o = gn) : (s = pn, o = _n), r = t === Me.QINIU ? ir[ir.qnUrl] : t === Me.AWS ? ir[ir.s3Url] : t === Me.STC ? ir[ir.stcUrl] : ir[ir.aliUrl], a = this._channel.codec.encodeGetFileUrl(s, e, n, i), u = new Xi(r, a, this.currentUserId), [4, this._channel.send(u, o)]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];case 1:return c = d.sent(), h = c.code, l = c.data, f = l, h === me.SUCCESS ? [2, { code: h, data: f }] : [2, { code: h }];}});});}, t.prototype.disconnect = function () {-1 !== this._reconnectTimer && (clearTimeout(this._reconnectTimer), this._reconnectTimer = -1), this._channel && (this._channel.close(), this._channel = void 0), this._pullQueue.length = 0, this._stopSyncInterval();}, t.prototype.destroy = function () {throw new Error("JSEngine's method not implemented.");}, t.prototype.registerMessageType = function (e, t, n, i) {this._customMessageType[e] = { isPersited: t, isCounted: n };}, t.prototype.getServerTime = function () {return Date.now() - this._localConnectedTime + this._connectedTime;}, t.prototype.getCurrentUserId = function () {return this.currentUserId;}, t.prototype.createTag = function (e) {return w(this, void 0, void 0, function () {var t, n, i, r, s, o, a;return b(this, function (u) {switch (u.label) {case 0:return this._channel ? (t = this._userSettingManager.getVersion(), n = this._channel.codec.encodeCreateTag([e], t), i = new Xi(ir[ir.addSeTag], n, this.currentUserId), [4, this._channel.send(i, Sn)]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];case 1:return r = u.sent(), s = r.code, o = r.data, s !== me.SUCCESS ? [2, { code: s }] : (a = o.version, this._userSettingManager.addTag([_O(_O({}, e), { createdTime: a })], a), [2, { code: me.SUCCESS, data: o }]);}});});}, t.prototype.removeTag = function (e) {return w(this, void 0, void 0, function () {var t, n, i, r, s, o, a;return b(this, function (u) {switch (u.label) {case 0:return this._channel ? (t = this._userSettingManager.getVersion(), n = this._channel.codec.encodeRemoveTag([e], t), i = new Xi(ir[ir.delSeTag], n, this.currentUserId), [4, this._channel.send(i, Sn)]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];case 1:return r = u.sent(), s = r.code, o = r.data, s !== me.SUCCESS ? [2, { code: s }] : (a = o.version, this._userSettingManager.deleteTag([e], a), [2, { code: me.SUCCESS }]);}});});}, t.prototype.updateTag = function (e) {return w(this, void 0, void 0, function () {var t, n, i, r, s, o, a;return b(this, function (u) {switch (u.label) {case 0:return this._channel ? (t = this._userSettingManager.getVersion(), n = this._channel.codec.encodeCreateTag([e], t), i = new Xi(ir[ir.addSeTag], n, this.currentUserId), [4, this._channel.send(i, Sn)]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];case 1:return r = u.sent(), s = r.code, o = r.data, s !== me.SUCCESS ? [2, { code: s }] : (a = o.version, this._userSettingManager.addTag([e], a), [2, { code: me.SUCCESS, data: o }]);}});});}, t.prototype.getTagList = function () {return w(this, void 0, void 0, function () {var e, t;return b(this, function (n) {return e = this._userSettingManager.getTags(), t = this._conversationManager.getConversationListForTag(), e.forEach(function (e) {e.conversationCount = t[e.tagId] ? t[e.tagId].length : 0;}), [2, { code: me.SUCCESS, data: e }];});});}, t.prototype.addTagForConversations = function (e, t) {return w(this, void 0, void 0, function () {var n,i,r,s,o = this;return b(this, function (a) {switch (a.label) {case 0:return this._channel ? this._userSettingManager.getTagById(e) ? (n = this._channel.codec.encodeUpdateConversationTag([{ tagId: e }], t), i = new Xi(ir[ir.addTag], n, this.currentUserId), [4, this._channel.send(i)]) : [2, { code: me.TAG_NOT_EXIST }] : [2, { code: me.RC_NET_CHANNEL_INVALID }];case 1:return (r = a.sent().code) !== me.SUCCESS ? [2, { code: r }] : ((s = {})[e] = {}, t.forEach(function (e) {o._conversationManager.addTagStatus(e.type, e.targetId, s);}), [2, { code: me.SUCCESS }]);}});});}, t.prototype.removeTagForConversations = function (e, t) {return w(this, void 0, void 0, function () {var n,i,r,s = this;return b(this, function (o) {switch (o.label) {case 0:return this._channel ? (n = this._channel.codec.encodeUpdateConversationTag([{ tagId: e }], t), i = new Xi(ir[ir.delTag], n, this.currentUserId), [4, this._channel.send(i)]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];case 1:return (r = o.sent().code) !== me.SUCCESS ? [2, { code: r }] : (t.forEach(function (t) {s._conversationManager.deleteTagStatus(t.type, t.targetId, [e]);}), [2, { code: me.SUCCESS }]);}});});}, t.prototype.removeTagsForConversation = function (e, t) {return w(this, void 0, void 0, function () {var n, i, r, s, o, a;return b(this, function (u) {switch (u.label) {case 0:return this._channel ? (n = e.type, i = e.targetId, r = t.map(function (e) {return { tagId: e };}), s = this._channel.codec.encodeUpdateConversationTag(r, [e]), o = new Xi(ir[ir.delTag], s, this.currentUserId), [4, this._channel.send(o)]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];case 1:return (a = u.sent().code) !== me.SUCCESS ? [2, { code: a }] : (this._conversationManager.deleteTagStatus(n, i, t), [2, { code: me.SUCCESS }]);}});});}, t.prototype.getConversationListByTag = function (e, t, n) {return w(this, void 0, void 0, function () {var i, r, s, o, a, u, c, h, l;return b(this, function (f) {switch (f.label) {case 0:return r = (i = this).currentUserId, (s = i._channel) ? (o = s.codec.encodeOldConversationList({ count: n, type: j.PRIVATE, startTime: t }), a = new Xi(vi, o, r), [4, s.send(a, Vt, { currentUserId: r, connectedTime: s.connectedTime })]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];case 1:return u = f.sent(), c = u.code, h = u.data, l = this._conversationHasTagFilter(e, h), pe.info("GetConversationListByTag", l), c !== me.SUCCESS ? [2, { code: c }] : [2, { code: c, data: l }];}});});}, t.prototype._conversationHasTagFilter = function (e, t) {var n = this,i = [],r = [];function s(e, t) {return e.latestMessage && t.latestMessage ? e.latestMessage.sentTime - t.latestMessage.sentTime : 0;}return t.forEach(function (t) {var s = t.conversationType,o = t.targetId,a = n._conversationManager.get(s, o),u = a.hasMentioned,c = a.mentionedInfo,h = a.lastUnreadTime,l = a.notificationStatus,f = a.isTop,d = a.tags,p = a.unreadMessageCount,g = d && d[e];if (g) {var _ = _O(_O({}, t), { hasMentioned: u, mentionedInfo: c, lastUnreadTime: h, notificationStatus: l, isTop: f, unreadMessageCount: p });g.isTop ? i.push(_O(_O({}, _), { isTopInTag: !0 })) : r.push(_O(_O({}, _), { isTopInTag: !1 }));}}), M(M([], i.sort(s)), r.sort(s));}, t.prototype.getUnreadCountByTag = function (e, t) {return w(this, void 0, void 0, function () {var n;return b(this, function (i) {return this._channel ? (n = this._conversationManager.getUnreadCountByTag(e, t), [2, { code: me.SUCCESS, data: n }]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];});});}, t.prototype.setConversationStatusInTag = function (e, t, n) {return w(this, void 0, void 0, function () {var i, r, s, o, a, u, c, h, l;return b(this, function (f) {switch (f.label) {case 0:return this._channel ? (i = t.targetId, r = t.type, s = n.isTop, o = [{ tagId: e, isTop: s }], (a = this._conversationManager.get(r, i)).tags && Object.hasOwnProperty.call(a.tags, e) ? (u = this._channel.codec.encodeUpdateConversationTag(o, [t]), c = new Xi(ir[ir.addTag], u, this.currentUserId), [4, this._channel.send(c)]) : [2, { code: me.NO_TAG_IN_CONVER }]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];case 1:return (h = f.sent().code) !== me.SUCCESS ? [2, { code: h }] : ((l = {})[e] = {}, s && (l[e].isTop = !0), this._conversationManager.addTagStatus(r, i, l), [2, { code: me.SUCCESS }]);}});});}, t.prototype.getTagsForConversation = function (e) {var t;return w(this, void 0, void 0, function () {var n, i, r, s;return b(this, function (o) {if (!this._channel) return [2, { code: me.RC_NET_CHANNEL_INVALID }];if (n = this._conversationManager.get(e.type, e.targetId), i = this._userSettingManager.getTagsInfo(), r = [], n.tags) for (s in n.tags) {r.push({ tagId: s, tagName: null === (t = i[s]) || void 0 === t ? void 0 : t.tagName });}return [2, { code: me.SUCCESS, data: r }];});});}, t.prototype.joinRTCRoom = function (e, t, n, i) {return w(this, void 0, void 0, function () {var r, s;return b(this, function (o) {return this._channel ? (r = this._channel.codec.encodeJoinRTCRoom(t, n, i), s = new Xi(ir[ir.rtcRJoin_data], r, e), [2, this._channel.send(s, Wt)]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];});});}, t.prototype.quitRTCRoom = function (e) {return w(this, void 0, void 0, function () {var t, n;return b(this, function (i) {switch (i.label) {case 0:return this._channel ? (t = this._channel.codec.encodeQuitRTCRoom(), n = new Xi(ir[ir.rtcRExit], t, e), [4, this._channel.send(n)]) : [2, me.RC_NET_CHANNEL_INVALID];case 1:return [2, i.sent().code];}});});}, t.prototype.rtcPing = function (e, t, n) {return w(this, void 0, void 0, function () {var i, r;return b(this, function (s) {switch (s.label) {case 0:return this._channel ? (i = this._channel.codec.encodeJoinRTCRoom(t, n), r = new Xi(ir[ir.rtcPing], i, e), [4, this._channel.send(r)]) : [2, me.RC_NET_CHANNEL_INVALID];case 1:return [2, s.sent().code];}});});}, t.prototype.getRTCRoomInfo = function (e) {return w(this, void 0, void 0, function () {var t, n;return b(this, function (i) {return this._channel ? (t = this._channel.codec.encodeGetRTCRoomInfo(), n = new Xi(ir[ir.rtcRInfo], t, e), [2, this._channel.send(n, un)]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];});});}, t.prototype.getRTCUserInfoList = function (e) {return w(this, void 0, void 0, function () {var t, n, i, r, s;return b(this, function (o) {switch (o.label) {case 0:return this._channel ? (t = this._channel.codec.encodeGetRTCRoomInfo(), n = new Xi(ir[ir.rtcUData], t, e), [4, this._channel.send(n, Wt)]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];case 1:return i = o.sent(), r = i.code, s = i.data, [2, { code: r, data: s ? { users: s.users } : s }];}});});}, t.prototype.setRTCUserInfo = function (e, t, n) {return w(this, void 0, void 0, function () {var i, r;return b(this, function (s) {switch (s.label) {case 0:return this._channel ? (i = this._channel.codec.encodeSetRTCUserInfo(t, n), r = new Xi(ir[ir.rtcUPut], i, e), [4, this._channel.send(r)]) : [2, me.RC_NET_CHANNEL_INVALID];case 1:return [2, s.sent().code];}});});}, t.prototype.removeRTCUserInfo = function (e, t) {return w(this, void 0, void 0, function () {var n, i;return b(this, function (r) {switch (r.label) {case 0:return this._channel ? (n = this._channel.codec.encodeRemoveRTCUserInfo(t), i = new Wi(ir[ir.rtcUDel], n, e), [4, this._channel.send(i)]) : [2, me.RC_NET_CHANNEL_INVALID];case 1:return [2, r.sent().code];}});});}, t.prototype.setRTCData = function (e, t, n, i, r, s) {return w(this, void 0, void 0, function () {var o, a;return b(this, function (u) {switch (u.label) {case 0:return this._channel ? (o = this._channel.codec.encodeSetRTCData(t, n, i, r, s), a = new Wi(ir[ir.rtcSetData], o, e), [4, this._channel.send(a)]) : [2, me.RC_NET_CHANNEL_INVALID];case 1:return [2, u.sent().code];}});});}, t.prototype.setRTCTotalRes = function (e, t, n, i, r) {return w(this, void 0, void 0, function () {var s, o;return b(this, function (a) {switch (a.label) {case 0:return this._channel ? (s = this._channel.codec.encodeUserSetRTCData(t, n, i, r), o = new Xi(ir[ir.userSetData], s, e), [4, this._channel.send(o)]) : [2, me.RC_NET_CHANNEL_INVALID];case 1:return [2, a.sent().code];}});});}, t.prototype.setRTCCDNUris = function (e, t, n) {return w(this, void 0, void 0, function () {var i, r;return b(this, function (s) {switch (s.label) {case 0:return this._channel ? (i = this._channel.codec.encodeUserSetRTCCDNUris(t, n), r = new Xi(ir[ir.userSetData], i, e), [4, this._channel.send(r)]) : [2, me.RC_NET_CHANNEL_INVALID];case 1:return [2, s.sent().code];}});});}, t.prototype.getRTCData = function (e, t, n, i) {if (!this._channel) return Promise.resolve({ code: me.RC_NET_CHANNEL_INVALID });var r = this._channel.codec.encodeGetRTCData(t, n, i),s = new Xi(ir[ir.rtcQryData], r, e);return this._channel.send(s, rn);}, t.prototype.removeRTCData = function (e, t, n, i, r) {return w(this, void 0, void 0, function () {var s, o;return b(this, function (a) {switch (a.label) {case 0:return this._channel ? (s = this._channel.codec.encodeRemoveRTCData(t, n, i, r), o = new Wi(ir[ir.rtcDelData], s, e), [4, this._channel.send(o)]) : [2, me.RC_NET_CHANNEL_INVALID];case 1:return [2, a.sent().code];}});});}, t.prototype.setRTCOutData = function (e, t, n, i) {throw new Error("JSEngine's method not implemented.");}, t.prototype.getRTCOutData = function (e, t) {throw new Error("JSEngine's method not implemented.");}, t.prototype.getRTCToken = function (e, t, n) {return w(this, void 0, void 0, function () {var i, r;return b(this, function (s) {return this._channel ? (i = this._channel.codec.encodeJoinRTCRoom(t, n), r = new Xi(ir[ir.rtcToken], i, e), [2, this._channel.send(r, nn)]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];});});}, t.prototype.setRTCState = function (e, t) {return w(this, void 0, void 0, function () {var n, i;return b(this, function (r) {switch (r.label) {case 0:return this._channel ? (n = this._channel.codec.encodeSetRTCState(t), i = new Xi(ir[ir.rtcUserState], n, e), [4, this._channel.send(i)]) : [2, me.RC_NET_CHANNEL_INVALID];case 1:return [2, r.sent().code];}});});}, t.prototype.getRTCUserInfo = function (e) {return w(this, void 0, void 0, function () {return b(this, function (e) {throw new Error("Method not implemented.");});});}, t.prototype.getRTCUserList = function (e) {if (!this._channel) return Promise.resolve({ code: me.RC_NET_CHANNEL_INVALID });var t = this._channel.codec.encodeGetRTCRoomInfo(),n = new Xi(ir[ir.rtcUList], t, e);return this._channel.send(n, Wt);}, t.prototype.joinLivingRoomAsAudience = function (e, t, n) {return void 0 === t && (t = Le.LIVE), w(this, void 0, void 0, function () {var i,r = this;return b(this, function (s) {switch (s.label) {case 0:return i = this, [4, this.__joinLivingRoomAsAudience(e, t, n)];case 1:return i._audienceJoinRes = s.sent(), [2, new Promise(function (e, t) {r._audienceJoinResolve = e;})];}});});}, t.prototype.__joinLivingRoomAsAudience = function (e, t, n) {return void 0 === t && (t = Le.LIVE), w(this, void 0, void 0, function () {var i, r, s, o, a;return b(this, function (u) {switch (u.label) {case 0:return this._channel ? (i = this._channel.codec.encodeJoinRTCRoom(t, n), r = new Xi(ir[ir.viewerJoinR], i, e), [4, this._channel.send(r, nn)]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];case 1:return s = u.sent(), o = s.code, a = s.data, o !== me.SUCCESS ? [2, { code: o }] : (this._rtcKVManager.pullEntry(e, 0), [2, { code: o, data: { token: a.rtcToken } }]);}});});}, t.prototype.quitLivingRoomAsAudience = function (e) {return w(this, void 0, void 0, function () {var t, n, i;return b(this, function (r) {switch (r.label) {case 0:return this._channel ? (t = this._channel.codec.encodeQuitRTCRoom(), n = new Xi(ir[ir.viewerExitR], t, e), [4, this._channel.send(n)]) : [2, me.RC_NET_CHANNEL_INVALID];case 1:return i = r.sent().code, this._rtcKVManager.reset(), [2, i];}});});}, t.prototype.rtcIdentityChange = function (e, t, n) {return w(this, void 0, void 0, function () {var i, r, s, o, a;return b(this, function (u) {switch (u.label) {case 0:return this._channel ? (i = this._channel.codec.encodeIdentityChangeInfo(t, n), r = new Xi(ir[ir.rtcIdentityChange], i, e), [4, this._channel.send(r, Wt)]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];case 1:return s = u.sent(), o = s.code, a = s.data, o === me.SUCCESS && t === xe.AnchorToViewer && (this._rtcKVManager.reset(), this._rtcKVManager.pullEntry(e, 0)), o !== me.SUCCESS ? [2, { code: o }] : [2, { code: o, data: a }];}});});}, t.prototype.pullRTCRoomEntry = function (e, t) {return w(this, void 0, void 0, function () {var t, n, i, r, s, o, a, u, c;return b(this, function (h) {switch (h.label) {case 0:return n = (t = this)._channel, i = t.currentUserId, n ? (pe.info("audience in room start pull KV"), r = n.codec.encodePullRTCRoomKV(e, 0), s = new Xi(ir[ir.rtcPullKv], r, i), [4, n.send(s, Qn)]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];case 1:return o = h.sent(), a = o.code, u = o.data, pe.info("audience in room end pull KV, code: " + a + ", data: " + JSON.stringify(u || {})), a === me.SUCCESS ? (c = u.kvEntries, this._audienceJoinRes && (this._audienceJoinRes.data.kvEntries = c), this._audienceJoinResolve && this._audienceJoinResolve(this._audienceJoinRes), this._audienceJoinResolve = null, this._watcher.onRTCDataChange(c, e), [2, { code: a, data: u }]) : [2, { code: a }];}});});}, t.prototype.getRTCJoinedUserInfo = function (e) {return w(this, void 0, void 0, function () {var t, n, i, r, s, o, a, u;return b(this, function (c) {switch (c.label) {case 0:return n = (t = this)._channel, i = t.currentUserId, n ? (r = n.codec.encodeQueryUserJoinedInfo(e), s = new Xi(ir[ir.rtcQueryJoined], r, i), [4, n.send(s, Wn)]) : [2, { code: me.RC_NET_CHANNEL_INVALID }];case 1:return o = c.sent(), a = o.code, u = o.data, a === me.SUCCESS ? [2, { code: a, data: u }] : [2, { code: a }];}});});}, t.prototype.getDeviceId = function () {return Vr(this.runtime);}, t.prototype.callExtra = function (e) {for (var t = [], n = 1; n < arguments.length; n++) {t[n - 1] = arguments[n];}return Promise.resolve({ code: me.EXTRA_METHOD_UNDEFINED });}, t.prototype.clearConversations = function () {throw new Error("Method not implemented.");}, t.prototype.setUserStatusListener = function (e, t) {throw new Error("Method not implemented.");}, t.prototype.setUserStatus = function (e) {throw new Error("Method not implemented.");}, t.prototype.subscribeUserStatus = function (e) {throw new Error("Method not implemented.");}, t.prototype.getUserStatus = function (e) {throw new Error("Method not implemented.");}, t.prototype.addToBlacklist = function (e) {throw new Error("Method not implemented.");}, t.prototype.removeFromBlacklist = function (e) {throw new Error("Method not implemented.");}, t.prototype.getBlacklist = function () {throw new Error("Method not implemented.");}, t.prototype.getBlacklistStatus = function (e) {throw new Error("Method not implemented.");}, t.prototype.insertMessage = function (e, t, n) {throw new Error("Method not implemented.");}, t.prototype.deleteMessages = function (e) {throw new Error("Method not implemented.");}, t.prototype.deleteMessagesByTimestamp = function (e, t, n, i, r) {throw new Error("Method not implemented.");}, t.prototype.clearMessages = function (e, t, n) {throw new Error("Method not implemented.");}, t.prototype.getMessage = function (e) {throw new Error("Method not implemented.");}, t.prototype.setMessageContent = function (e, t, n) {throw new Error("Method not implemented.");}, t.prototype.setMessageSearchField = function (e, t, n) {throw new Error("Method not implemented.");}, t.prototype.searchConversationByContent = function (e, t, n, i) {throw new Error("Method not implemented.");}, t.prototype.searchMessageByContent = function (e, t, n, i, r, s) {throw new Error("Method not implemented.");}, t.prototype.getUnreadMentionedMessages = function (e, t) {throw new Error("Method not implemented.");}, t.prototype.setMessageSentStatus = function (e, t) {throw new Error("Method not implemented.");}, t.prototype.setMessageReceivedStatus = function (e, t) {throw new Error("Method not implemented.");}, t.prototype.clearUnreadCountByTimestamp = function (e, t, n, i) {throw new Error("Method not implemented.");}, t.prototype.getConversationNotificationStatus = function (e, t, n) {throw new Error("Method not implemented.");}, t.prototype.getRemoteHistoryMessages = function (e, t, n, i, r, s) {throw new Error("Method not implemented.");}, t;}(lr),Fr = function () {function e(e) {this._context = e;}return e.prototype.getCoreVersion = function () {return this._context.coreVersion;}, e.prototype.getAPIVersion = function () {return this._context.apiVersion;}, e.prototype.getAppkey = function () {return this._context.appkey;}, e.prototype.getCurrentId = function () {return this._context.getCurrentUserId();}, e.prototype.getConnectionStatus = function () {return this._context.getConnectionStatus();}, e.prototype.getDeviceId = function () {return this._context.getDeviceId();}, e.prototype.sendMessage = function (e, t, n) {return this._context.sendMessage(e, t, n);}, e.prototype.registerMessageType = function (e, t, n, i) {void 0 === i && (i = []), this._context.registerMessageType(e, t, n, i);}, e.prototype.getServerTime = function () {return this._context.getServerTime();}, e.prototype.getRTCJoinedUserInfo = function (e) {return this._context.getRTCJoinedUserInfo(e);}, e;}(),qr = function (e) {function t() {return null !== e && e.apply(this, arguments) || this;}return N(t, e), t.prototype.getNaviInfo = function () {return this._context.getInfoFromCache();}, t.prototype.joinRTCRoom = function (e, t, n, i) {return this._context.joinRTCRoom(e, t, n, i);}, t.prototype.quitRTCRoom = function (e) {return this._context.quitRTCRoom(e);}, t.prototype.rtcPing = function (e, t, n) {return this._context.rtcPing(e, t, n);}, t.prototype.getRTCRoomInfo = function (e) {return this._context.getRTCRoomInfo(e);}, t.prototype.getRTCUserInfoList = function (e) {return this._context.getRTCUserInfoList(e);}, t.prototype.getRTCUserInfo = function (e) {return this._context.getRTCUserInfo(e);}, t.prototype.setRTCUserInfo = function (e, t, n) {return this._context.setRTCUserInfo(e, t, n);}, t.prototype.removeRTCUserInfo = function (e, t) {return this._context.removeRTCUserInfo(e, t);}, t.prototype.setRTCData = function (e, t, n, i, r, s) {return this._context.setRTCData(e, t, n, i, r, s);}, t.prototype.setRTCTotalRes = function (e, t, n, i, r) {return this._context.setRTCTotalRes(e, t, n, i, r);}, t.prototype.setRTCCDNUris = function (e, t, n) {return this._context.setRTCCDNUris(e, t, n);}, t.prototype.getRTCData = function (e, t, n, i) {return this._context.getRTCData(e, t, n, i);}, t.prototype.removeRTCData = function (e, t, n, i, r) {return this._context.removeRTCData(e, t, n, i, r);}, t.prototype.setRTCOutData = function (e, t, n, i) {return this._context.setRTCOutData(e, t, n, i);}, t.prototype.getRTCOutData = function (e, t) {return this._context.getRTCOutData(e, t);}, t.prototype.getRTCToken = function (e, t, n) {return this._context.getRTCToken(e, t, n);}, t.prototype.setRTCState = function (e, t) {return this._context.setRTCState(e, t);}, t.prototype.getRTCUserList = function (e) {return this._context.getRTCUserList(e);}, t.prototype.joinLivingRoomAsAudience = function (e, t, n) {return this._context.joinLivingRoomAsAudience(e, t, n);}, t.prototype.quitLivingRoomAsAudience = function (e) {return this._context.quitLivingRoomAsAudience(e);}, t.prototype.rtcIdentityChange = function (e, t, n) {return this._context.rtcIdentityChange(e, t, n);}, t;}(Fr),Yr = function () {function e() {}return e.compress = function (e) {for (var t = this, n = {}, i = 0; i < e.length - 1; i++) {var r = e.charAt(i) + e.charAt(i + 1);n.hasOwnProperty(r) ? n[r].push(i) : n[r] = [i];}for (var s = [], o = [], a = function a() {if (o.length > 0) {var e = o.join("");if (o = [], e.length > 26) {var n = t.numberEncode(e.length),i = String.fromCharCode(t.dataType.NormalExt | n.length);s.push(i + n);} else {var r = String.fromCharCode(t.dataType.Normal | e.length);s.push(r);}s.push(e);}}, u = 0; u < e.length;) {var c = t.indexOf(n, e, u);if (c.length < 2) o.push(e.charAt(u++));else if (c.length < 4) o.push(e.substr(u, c.length)), u += c.length;else {var h = t.numberEncode(u - c.offset),l = t.numberEncode(c.length);if (h.length + l.length >= c.length) o.push(e.substr(u, c.length)), u += c.length;else {a();var f = String.fromCharCode(t.dataType.Compressed | h.length << 2 | l.length);s.push(f + h + l), u += c.length;}}}a();var d = t.numberEncode(e.length),p = String.fromCharCode(t.dataType.Tail | d.length);return s.push(p + d), s.join("");}, e.uncompress = function (e) {var t = this,n = 0,i = "";e: do {var r = e.charCodeAt(n++),s = r & t.dataType.Mark,o = 15 & r,a = void 0;switch (s) {case t.dataType.Compressed:var u = o >> 2,c = 3 & o;if (0 === u || 0 === c) throw new Error("Data parsing error,at " + n);var h = t.numberDecode(e.substr(n, u)),l = t.numberDecode(e.substr(n += u, c));if ((h = i.length - h) + l > i.length) throw new Error("Data parsing error,at " + n);n += c, i += i.substr(h, l);break;case t.dataType.Tail:if ((a = t.numberDecode(e.substr(n, o))) !== i.length) throw console.log(i.length), console.log(a), new Error("Data parsing error,at " + n);n += o;break e;case t.dataType.NormalExt:a = t.numberDecode(e.substr(n, o)), i += e.substr(n += o, a), n += a;break;case t.dataType.Normal:i += e.substr(n, o), n += o;break;case t.dataType.Mark:if (o > 10) throw new Error("Data parsing error,at " + n);i += e.substr(n, 16 + o), n += 16 + o;break;default:throw new Error("Data parsing error,at " + n + " header:" + s);}} while (n < e.length);return i;}, e.indexOf = function (e, t, n) {var i = { length: 0, offset: -1 };if (t.length, n >= t.length - 1) return i;var r = e[t.charAt(n) + t.charAt(n + 1)];if (r[0] === n) return i;for (var s = t.length - n, o = 0, a = r.length; o < a; o++) {var u = r[o],c = n - u;if (!(c > this.max)) {var h = Math.min(s, c);if (h <= i.length) break;if (!(i.length > 2 && t.charAt(u + i.length - 1) !== t.charAt(n + i.length - 1))) {for (var l = 2, f = l; f < h && t.charAt(u + f) === t.charAt(n + f); f++) {l++;}l >= i.length && (i.length = l, i.offset = u);}}}return i;}, e.numberEncode = function (e) {var t = this,n = [],i = 0;do {i = e % t.scale, n.push(t.chars.charAt(i)), e = (e - i) / t.scale;} while (e > 0);return n.join("");}, e.numberDecode = function (e) {for (var t = 0, n = 0, i = e.length - 1; i >= 0; i--) {if (-1 === (n = this.chars.indexOf(e.charAt(i)))) throw new Error('decode number error, data is "' + e + '"');t = t * this.scale + n;}return t;}, e.dataType = { Tail: 48, Compressed: 64, NormalExt: 80, Normal: 96, Mark: 112 }, e.chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", e.scale = e.chars.length, e.max = 238327, e;}(),Kr = 1,Hr = !1,Gr = "undefined" != typeof location && "https://" === location.protocol ? "https://" : "http://",jr = function () {function e(e) {this.info = e, this.logUrl = "logcollection.ronghub.com", this.level = 1, this.itv = 30, this.times = 5, this.deviceId = "", this.deviceInfo = "", this.logSwitch = 0, this.logUrl = e.logPolicy.url || this.logUrl, this.level = e.logPolicy.level || this.level, this.itv = e.logPolicy.itv || this.itv, this.times = e.logPolicy.times || this.times, this.deviceId = Vr(e.runtime), this.logSwitch = e.logSwitch;var t = pt(e.runtime);this.deviceInfo = t.type + "|" + t.version + "|" + de.sessionId, this.startReport();}return e.init = function (t) {return Hr = !0, e._instance || (e._instance = new e(t)), e._instance;}, e.getInstance = function () {return e._instance;}, e.prototype.startReport = function () {var e = this;if (this.logSwitch && Hr) {var t = this.itv * Math.pow(2, Kr - 1);Kr < this.times && Kr++, setTimeout(function () {e.reportRealtimeLog();}, 1e3 * t);}}, e.prototype.reportRealtimeLog = function () {var e = this,t = de.realTimeLogList.filter(function (t) {return t.level <= e.level;});if (0 !== t.length) {var n = Yr.compress(t.map(function (e) {return e.content;}).join("")),i = "" + Gr + this.logUrl + "?version=" + this.info.version + "&appkey=" + this.info.appkey + "&userId=" + this.info.userId + "&deviceId=" + this.deviceId + "&deviceInfo=" + this.deviceInfo + "&platform=Web";this.info.runtime.httpReq({ method: "POST", url: i, body: n }).then(function (t) {pe.__clearRealTimeLog(), pe.debug("report real-time log success");var n = t.data;n && (n = JSON.parse(n), e.itv = n.nextTime, e.level = n.level, e.logSwitch = n.logSwitch, Kr = 1), e.startReport();}).catch(function (t) {pe.debug("report real-time log error -> " + t), e.startReport();});} else this.startReport();}, e.prototype.reportFullLog = function (e) {return w(this, void 0, void 0, function () {var t,n,i,r,s,o,a,u,c,_h,l = this;return b(this, function (f) {switch (f.label) {case 0:return t = e.startTime, n = e.endTime, i = e.platform, r = e.logId, s = e.uri, o = Y.getInstance(), pe.debug("received report log msg, " + i.toLowerCase(), o), "web" === i.toLowerCase() && o ? t > n ? (pe.warn("report error: The start time(" + t + ") cannot be greater than the end time(" + t + ")"), [2]) : [4, pe.__insertLogIntoDatabase()] : [2];case 1:return f.sent(), [4, o.getRangeData(B, "time", t, n)];case 2:return a = (a = f.sent()).filter(function (e) {return !e.userId || e.userId === l.info.userId;}), u = Yr.compress(a.map(function (e) {return e.content;}).join("") || "no data"), 5e3, c = 1, (_h = function h() {if (!(c > 3) && Hr) {var e = s || l.logUrl,t = "" + Gr + e + "?version=" + l.info.version + "&appkey=" + l.info.appkey + "&userId=" + l.info.userId + "&logId=" + r + "&deviceId=" + l.deviceId + "&deviceInfo=" + l.deviceInfo + "&platform=Web",n = 5e3 * (c - 1);c++, setTimeout(function () {Hr && l.info.runtime.httpReq({ url: t, method: "POST", body: u }).then(function () {pe.debug("report full log success!");}).catch(function (e) {_h(), pe.warn("report full log error -> " + e);});}, n);}})(), [2];}});});}, e.prototype.distroy = function () {Kr = 1, Hr = !1;}, e;}();exports.RTCPluginContext = qr;exports.PluginContext = Fr;function Qr(e) {return Object.assign({}, e);}var Jr,Wr = function () {function e(e, t) {var n;this._runtime = e, this._token = "", this._pluginContextQueue = [], this._pluginInstanseMap = {}, this.coreVersion = "4.5.1", this._versionInfo = {}, this._typingInfo = {}, this._isInternalConnected = !1, this._connectionStatus = Te.DISCONNECTED, this._canRedirectConnect = !1, this._watcher = { message: void 0, conversationState: void 0, chatroomState: void 0, connectionState: void 0, rtcInnerWatcher: void 0, expansion: void 0, tag: void 0, conversationTagChanged: void 0, typingState: void 0, pullFinished: void 0, messageBlocked: void 0 }, this._typingInternalTimer = -1, this._typingExpireTime = 2e3, this._typingChangedList = [], this._options = Object.assign({}, t), this.appkey = this._options.appkey, this.apiVersion = this._options.apiVersion, this._options.typingExpireTime && (this._options.typingExpireTime < 2e3 ? this._typingExpireTime = 2e3 : this._options.typingExpireTime > 6e3 ? this._typingExpireTime = 6e3 : this._typingExpireTime = this._options.typingExpireTime), this._options.navigators = this._options.navigators.filter(function (e) {return /^https?:\/\//.test(e);}), this._options.navigators = this._options.navigators.map(function (e) {return e.replace(/\/$/g, "");}), 0 === this._options.navigators.length && (n = this._options.navigators).push.apply(n, u);var i = { status: this._connectionStatusListener.bind(this), message: this._messageReceiver.bind(this), chatroom: this._chatroomInfoListener.bind(this), conversation: this._conversationInfoListener.bind(this), expansion: this._expansionInfoListener.bind(this), tag: this._tagListener.bind(this), conversationTag: this._conversationTagListener.bind(this), onRTCDataChange: this._rtcDataChange.bind(this), pullFinished: this._pullFinishedListener.bind(this) };this._engine = dt() ? new RCCppEngine(e, i, this._options) : new Br(e, i, this._options);}return e.init = function (t, n) {return pe.setLogLevel(n.logLevel), pe.setLogStdout(n.logStdout), (n.indexDBSwitch || se(n.indexDBSwitch)) && Y.init(), pe.debug("APIContext.init =>", n.appkey, n.navigators), this._context ? (pe.error("Repeat initialize!"), this._context) : (pe.warn("RCEngine Commit:", "54768e91ebac53c7cb4ee3239563db82ff1dffcc"), this._context = new e(t, n), pe.__insertLogIntoDatabase(), this._context);}, e.destroy = function () {this._context && (this._context._destroy(), this._context = void 0);}, e.prototype.install = function (e, t) {if (this._pluginInstanseMap[e.tag]) return pe.warn("Repeat install plugin: " + e.tag), this._pluginInstanseMap[e.tag];var n = "RCRTC" === e.tag ? new qr(this) : new Fr(this),i = null;try {if (!e.verify(this._runtime)) return null;i = e.setup(n, this._runtime, t);} catch (e) {pe.error("install plugin error!\n", e);}return ["RCRTC", "RCCall"].includes(e.tag) && e.version && e.name && (this._versionInfo[e.name] = e.version), i && this._pluginContextQueue.push(n), i && (this._pluginInstanseMap[e.tag] = i), i;}, e.prototype._handleRedirect = function () {return w(this, void 0, void 0, function () {var e = this;return b(this, function (t) {switch (t.label) {case 0:return pe.debug("_handleRedirct", this._token), [4, this.connect(this._token, !0)];case 1:return t.sent().code !== me.SUCCESS && this._canRedirectConnect && setTimeout(function () {e._handleRedirect();}, 5e3), [2];}});});}, e.prototype._connectionStatusListener = function (e) {var t;return w(this, void 0, void 0, function () {return b(this, function (n) {return e === Te.REDIRECT && (this._canRedirectConnect = !0, this._handleRedirect()), e !== Te.BLOCKED && e !== Te.KICKED_OFFLINE_BY_OTHER_CLIENT && e !== Te.DISCONNECT_BY_SERVER || (this._canRedirectConnect = !1), this._connectionStatus = e, (null === (t = this._watcher.rtcInnerWatcher) || void 0 === t ? void 0 : t.status) && this._watcher.rtcInnerWatcher.status(e), this._pluginContextQueue.forEach(function (t) {t.onconnectionstatechange && t.onconnectionstatechange(e);}), this._watcher.connectionState && this._watcher.connectionState(e), [2];});});}, e.prototype._messageReceiver = function (e, t, n) {var i, r;if ((e.conversationType === j.RTC_ROOM || Object.prototype.hasOwnProperty.call(Fe, e.messageType)) && this._watcher.rtcInnerWatcher && this._watcher.rtcInnerWatcher.message) this._watcher.rtcInnerWatcher.message(Qr(e));else if (-1 === ["RC:ChrmJoinNtf", "RC:ChrmQuitNtf"].indexOf(e.messageType) || "function" != typeof this._watcher.chatroomState) {if ("RC:ChrmMemChange" !== e.messageType) {if (e.messageType !== Re.TYPING_STATUS || (this._addTypingInfo(Qr(e)), !this._watcher.typingState)) if (e.messageType !== Re.LOG_COMMAND || "rongcloudsystem" !== e.senderUserId) e.messageType !== Re.INTERCEPT ? this._pluginContextQueue.some(function (t) {if (!t.onmessage) return !1;try {return t.onmessage(Qr(e));} catch (e) {return pe.error("plugin error =>", e), !1;}}) || this._watcher.message && this._watcher.message(Qr(e), t, n) : this._MessageBlockedListener({ conversationType: e.conversationType, targetId: e.targetId, blockType: e.content.interceptType, blockedMessageUId: e.content.msgUId });else {var s = e.content,o = s.startTime,a = s.endTime,u = s.platform,c = s.logId,h = s.uri,l = s.packageName,f = { startTime: parseInt(o), endTime: parseInt(a), platform: u, logId: c, uri: h, packageName: l };null === (r = jr.getInstance()) || void 0 === r || r.reportFullLog(f);}} else if ("function" == typeof this._watcher.chatroomState) {var d = {};Array.isArray(e.content.userList) && e.content.userList.forEach(function (e) {d[e.userId] = e.status;}), this._watcher.chatroomState({ userChange: { users: d, chatroomId: e.targetId } });}} else this._watcher.chatroomState({ userChange: { users: (i = {}, i[e.senderUserId] = "RC:ChrmQuitNtf" === e.messageType ? Ve.QUIT : Ve.JOIN, i), chatroomId: e.targetId } });}, e.prototype._chatroomInfoListener = function (e) {this._watcher.chatroomState && this._watcher.chatroomState(e);}, e.prototype._conversationInfoListener = function (e) {this._watcher.conversationState && this._watcher.conversationState(e);}, e.prototype._expansionInfoListener = function (e) {this._watcher.expansion && this._watcher.expansion(e);}, e.prototype._tagListener = function () {this._watcher.tag && this._watcher.tag();}, e.prototype._conversationTagListener = function () {this._watcher.conversationTagChanged && this._watcher.conversationTagChanged();}, e.prototype._typingStatusListener = function (e) {this._watcher.typingState && this._watcher.typingState(e);}, e.prototype._pullFinishedListener = function () {this._watcher.pullFinished && this._watcher.pullFinished();}, e.prototype._MessageBlockedListener = function (e) {this._watcher.messageBlocked && this._watcher.messageBlocked(e);}, e.prototype._rtcDataChange = function (e, t) {this._pluginContextQueue.forEach(function (n) {n.onrtcdatachange && n.onrtcdatachange(e, t);});}, e.prototype.assignWatcher = function (e) {var t = this;Object.keys(this._watcher).forEach(function (n) {if (Object.prototype.hasOwnProperty.call(e, n)) {var i = e[n];t._watcher[n] = re(i) || ie(i) ? i : void 0;}});}, e.prototype._addTypingInfo = function (e) {var t = e.senderUserId,n = e.conversationType,i = e.targetId,r = e.content,s = e.channelId,o = r.typingContentType,a = n + "#" + i + "#" + (s || "");this._typingInfo[a] || (this._typingInfo[a] = []);var u = this._typingInfo[a].findIndex(function (e) {return e.userId === t;});u >= 0 && this._typingInfo[a][u].messageType === o ? this._typingInfo[a][u].timestamp = Date.now() : (u >= 0 && this._typingInfo[a].splice(u, 1), this._typingInfo[a].push({ userId: t, messageType: o, timestamp: Date.now() }), this._typingChangedList.includes(a) || this._typingChangedList.push(a), this._startCheckTypingInfo());}, e.prototype._startCheckTypingInfo = function () {var e = this;-1 === this._typingInternalTimer && 0 !== Object.keys(this._typingInfo).length && (this._typingInternalTimer = setInterval(function () {for (var t in e._typingInfo) {var n = e._typingInfo[t].length;e._typingInfo[t] = e._typingInfo[t].filter(function (t) {return Date.now() - t.timestamp < e._typingExpireTime;}), e._typingInfo[t].length === n || e._typingChangedList.includes(t) || e._typingChangedList.push(t), 0 === e._typingInfo[t].length && delete e._typingInfo[t];}if (e._typingChangedList.length > 0) {var i = e._typingChangedList.map(function (t) {return { conversationType: Number(t.split("#")[0]), targetId: t.split("#")[1], channelId: t.split("#")[2], list: e._typingInfo[t] || [] };});e._typingStatusListener(i), e._typingChangedList = [];}0 === Object.keys(e._typingInfo).length && (clearInterval(e._typingInternalTimer), e._typingInternalTimer = -1);}, 500));}, e.prototype.getConnectedTime = function () {return this._engine.getConnectedTime();}, e.prototype.getServerTime = function () {return this._engine.getServerTime();}, e.prototype.getDeviceId = function () {return this._engine.getDeviceId();}, e.prototype.getCurrentUserId = function () {return this._engine.currentUserId;}, e.prototype.getConnectionStatus = function () {return this._connectionStatus;}, e.prototype.connect = function (e, t) {return void 0 === t && (t = !1), w(this, void 0, void 0, function () {var n, i, r, s, o, a;return b(this, function (u) {switch (u.label) {case 0:return this._connectionStatus === Te.CONNECTED ? [2, { code: me.SUCCESS, userId: this._engine.currentUserId }] : this._connectionStatus === Te.CONNECTING ? [2, { code: me.BIZ_ERROR_CONNECTING }] : "string" != typeof e || 0 === e.length ? [2, { code: me.RC_CONN_USER_OR_PASSWD_ERROR }] : (this._token = e, n = e.split("@"), i = n[1], r = i ? i.split(";").map(function (e) {return /^https?:/.test(e) ? e : "https://" + e;}) : [], [4, this._engine.navi.getInfo(this._getTokenWithoutNavi(), r, t, this._options.checkCA)]);case 1:return (s = u.sent()) ? 1 === (null == s ? void 0 : s.type) ? [2, { code: me.PACKAGE_ENVIRONMENT_ERROR }] : (o = He.getInfo(), [4, this._engine.connect(this._getTokenWithoutNavi(), s)]) : [2, { code: me.RC_NAVI_RESOURCE_ERROR }];case 2:return a = u.sent(), pe.__insertLogIntoDatabase(), a !== Ie.REDIRECT ? [3, 4] : (this._connectionStatus = Te.REDIRECT, [4, this.connect(e, !0)]);case 3:return [2, u.sent()];case 4:return a === me.SUCCESS && (pe.info("connect success, userId: " + this._engine.currentUserId), 1 !== (null == s ? void 0 : s.type) && this._engine.reportSDKInfo && this._engine.reportSDKInfo(o), jr.init({ runtime: this._runtime, logSwitch: (null == s ? void 0 : s.logSwitch) || 0, logPolicy: JSON.parse((null == s ? void 0 : s.logPolicy) || "{}"), appkey: this.appkey, version: this.apiVersion, userId: this._engine.currentUserId }), de.init(this._engine.currentUserId), this._isInternalConnected = !0), a !== me.SUCCESS || dt() || 1 === s.openUS && this._pullUserSettings(), a !== me.SUCCESS && (this._connectionStatus = Te.CONNECTION_CLOSED), [2, { code: a, userId: this._engine.currentUserId }];}});});}, e.prototype._pullUserSettings = function () {return w(this, void 0, void 0, function () {return b(this, function (e) {return [2];});});}, e.prototype.disconnect = function () {var e;return this._isInternalConnected = !1, clearInterval(this._typingInternalTimer), this._typingInternalTimer = -1, null === (e = jr.getInstance()) || void 0 === e || e.distroy(), pe.__insertLogIntoDatabase(), de.reset(), this._engine.disconnect(), this._pluginContextQueue.forEach(function (e) {if (e.ondisconnect) try {e.ondisconnect();} catch (e) {pe.error("plugin error =>", e);}}), Promise.resolve();}, e.prototype.reconnect = function () {return this._isInternalConnected ? Promise.resolve({ code: me.CAN_NOT_RECONNECT }) : this.connect(this._getTokenWithoutNavi());}, e.prototype._getTokenWithoutNavi = function () {return this._token.replace(/@.+$/, "@");}, e.prototype.getInfoFromCache = function () {return this._engine.navi.getInfoFromCache(this._getTokenWithoutNavi());}, e.prototype.registerMessageType = function (e, t, n, i) {void 0 === i && (i = []), this._engine.registerMessageType(e, t, n, i);}, e.prototype.sendMessage = function (e, t, n, i) {var r = this.getInfoFromCache();if (1 === ((null == r ? void 0 : r.grpRRVer) || 0) && n.messageType === Re.READ_RECEIPT_RESPONSE) return Promise.resolve({ code: me.READ_RECEIPT_ERROR });var s = JSON.stringify(n.content);return V(s) > 131072 ? Promise.resolve({ code: me.RC_MSG_CONTENT_EXCEED_LIMIT }) : this._engine.sendMessage(e, t, n, i);}, e.prototype.sendExpansionMessage = function (e) {return w(this, void 0, void 0, function () {var t, n, i, r, s, o, a, u, c, h, l, f, d, p, g, _;return b(this, function (y) {switch (y.label) {case 0:if (t = e.channelId, n = e.conversationType, i = e.targetId, r = e.messageUId, s = e.keys, o = e.expansion, a = e.originExpansion, u = e.removeAll, !e.canIncludeExpansion) return [2, { code: me.MESSAGE_KV_NOT_SUPPORT }];if (c = !1, h = !1, ie(o)) for (p in a = a || {}, l = Object.keys(o).length, f = Object.assign(a, o), d = Object.keys(f).length, c = d > 300 || l > 20, o) {g = o[p], c = p.length > 32 || g.length > 64, h = !/^[A-Za-z0-9_=+-]+$/.test(p);}return c ? [2, { code: me.EXPANSION_LIMIT_EXCEET }] : h ? [2, { code: me.BIZ_ERROR_INVALID_PARAMETER }] : (_ = { mid: r }, o && (_.put = o), s && (_.del = s), u && (_.removeAll = 1), [4, this._engine.sendMessage(n, i, { content: _, messageType: Re.EXPANSION_NOTIFY, channelId: t })]);case 1:return [2, { code: y.sent().code }];}});});}, e.prototype.sendReadReceiptMessage = function (e, t, n) {return w(this, void 0, void 0, function () {var i;return b(this, function (r) {return i = this.getInfoFromCache(), 0 === ((null == i ? void 0 : i.grpRRVer) || 0) ? [2, { code: me.READ_RECEIPT_ERROR, data: "The read receipt switch is not on, please call the sendMessage method!" }] : [2, this._engine.sendReadReceiptMessage(e, t, n)];});});}, e.prototype.getMessageReader = function (e, t, n) {return w(this, void 0, void 0, function () {var i;return b(this, function (r) {return i = this.getInfoFromCache(), 0 === ((null == i ? void 0 : i.grpRRVer) || 0) ? [2, { code: me.READ_RECEIPT_ERROR }] : [2, this._engine.getMessageReader(e, t, n)];});});}, e.prototype._destroy = function () {var e;this._isInternalConnected = !1, this._watcher = { message: void 0, conversationState: void 0, chatroomState: void 0, connectionState: void 0, rtcInnerWatcher: void 0, expansion: void 0, tag: void 0, conversationTagChanged: void 0, typingState: void 0, pullFinished: void 0 }, this._engine.disconnect(), this._pluginContextQueue.forEach(function (e) {if (e.ondestroy) try {e.ondestroy();} catch (e) {pe.error("plugin error =>", e);}}), this._pluginContextQueue.length = 0, this._pluginInstanseMap = {}, null === (e = jr.getInstance()) || void 0 === e || e.distroy(), de.reset();}, e.prototype.getHistoryMessage = function (e, t, n, i, r, s, o) {return void 0 === n && (n = 0), void 0 === i && (i = 20), void 0 === r && (r = 0), void 0 === s && (s = ""), void 0 === o && (o = ""), this._engine.getHistoryMessage(e, t, n, i, r, s, o || "");}, e.prototype.getConversationList = function (e, t, n, i, r) {return void 0 === e && (e = 300), void 0 === r && (r = ""), this._engine.getConversationList(e, t, n, i, r);}, e.prototype.getConversation = function (e, t, n) {return this._engine.getConversation(e, t, n);}, e.prototype.removeConversation = function (e, t, n) {return void 0 === n && (n = ""), this._engine.removeConversation(e, t, n);}, e.prototype.clearUnreadCount = function (e, t, n) {return void 0 === n && (n = ""), this._engine.clearConversationUnreadCount(e, t, n);}, e.prototype.getUnreadCount = function (e, t, n) {return void 0 === n && (n = ""), this._engine.getConversationUnreadCount(e, t, n);}, e.prototype.getTotalUnreadCount = function (e, t, n) {return this._engine.getAllConversationUnreadCount(e, t && t.length > 0 ? t : [j.PRIVATE, j.GROUP, j.SYSTEM, j.PUBLIC_SERVICE], !!n);}, e.prototype.getFirstUnreadMessage = function (e, t, n) {return void 0 === n && (n = ""), this._engine.getFirstUnreadMessage(e, t, n);}, e.prototype.setConversationStatus = function (e, t, n, i, r) {void 0 === r && (r = "");var s = [{ conversationType: e, targetId: t, isTop: n, notificationStatus: i, channelId: r }];return this._engine.batchSetConversationStatus(s);}, e.prototype.saveConversationMessageDraft = function (e, t, n) {return this._engine.saveConversationMessageDraft(e, t, n);}, e.prototype.getConversationMessageDraft = function (e, t) {return this._engine.getConversationMessageDraft(e, t);}, e.prototype.clearConversationMessageDraft = function (e, t) {return this._engine.clearConversationMessageDraft(e, t);}, e.prototype.recallMessage = function (e, t, n, i, r) {return this._engine.recallMsg(e, t, n, i, r);}, e.prototype.deleteRemoteMessage = function (e, t, n, i) {return void 0 === i && (i = ""), this._engine.deleteRemoteMessage(e, t, n, i);}, e.prototype.deleteRemoteMessageByTimestamp = function (e, t, n, i) {return void 0 === i && (i = ""), this._engine.deleteRemoteMessageByTimestamp(e, t, n, i);}, e.prototype.joinChatroom = function (e, t) {return void 0 === t && (t = 10), this._engine.joinChatroom(e, t);}, e.prototype.joinExistChatroom = function (e, t) {return void 0 === t && (t = 10), this._engine.joinExistChatroom(e, t);}, e.prototype.quitChatroom = function (e) {return this._engine.quitChatroom(e);}, e.prototype.getChatroomInfo = function (e, t, n) {return void 0 === t && (t = 0), void 0 === n && (n = 0), this._engine.getChatroomInfo(e, t, n);}, e.prototype.setChatroomEntry = function (e, t) {var n = t.key,i = t.value;return st(n) && ot(i) ? this._engine.setChatroomEntry(e, t) : Promise.resolve(me.BIZ_ERROR_INVALID_PARAMETER);}, e.prototype.setChatroomEntries = function (e, t) {for (var n = 0; n < t.entries.length; n++) {var i = t.entries[n],r = i.key,s = i.value;if (!st(r) || !ot(s)) return Promise.resolve({ code: me.BIZ_ERROR_INVALID_PARAMETER });}return this._engine.setChatroomEntries(e, t);}, e.prototype.forceSetChatroomEntry = function (e, t) {var n = t.key,i = t.value;return st(n) && ot(i) ? this._engine.forceSetChatroomEntry(e, t) : Promise.resolve(me.BIZ_ERROR_INVALID_PARAMETER);}, e.prototype.removeChatroomEntry = function (e, t) {var n = t.key;return st(n) ? this._engine.removeChatroomEntry(e, t) : Promise.resolve(me.BIZ_ERROR_INVALID_PARAMETER);}, e.prototype.removeChatroomEntries = function (e, t) {for (var n = 0; n < t.entries.length; n++) {var i = t.entries[n].key;if (!st(i)) return Promise.resolve({ code: me.BIZ_ERROR_INVALID_PARAMETER });}return this._engine.removeChatroomEntries(e, t);}, e.prototype.forceRemoveChatroomEntry = function (e, t) {var n = t.key;return st(n) ? this._engine.forceRemoveChatroomEntry(e, t) : Promise.resolve(me.BIZ_ERROR_INVALID_PARAMETER);}, e.prototype.getChatroomEntry = function (e, t) {return this._engine.getChatroomEntry(e, t);}, e.prototype.getAllChatroomEntries = function (e) {return this._engine.getAllChatroomEntry(e);}, e.prototype.getChatRoomHistoryMessages = function (e, t, n, i) {return void 0 === t && (t = 20), void 0 === n && (n = 0), void 0 === i && (i = 0), this._engine.getChatroomHistoryMessages(e, i, t, n);}, e.prototype.getFileToken = function (e, t, n, i) {return w(this, void 0, void 0, function () {var r, s, o, a, u, c, h;return b(this, function (l) {switch (l.label) {case 0:return r = this.getInfoFromCache(), s = (null == r ? void 0 : r.bosAddr) || "", o = (null == r ? void 0 : r.uploadServer) || "", a = (null == r ? void 0 : r.ossConfig) || "", [4, this._engine.getFileToken(e, t, n, i)];case 1:return u = l.sent(), c = u.code, h = u.data, c === me.SUCCESS ? [2, Promise.resolve(Object.assign(h, { bos: s, qiniu: o, ossConfig: a }))] : [2, Promise.reject(c)];}});});}, e.prototype.getFileUrl = function (e, t, n, i, r) {return void 0 === r && (r = Me.QINIU), w(this, void 0, void 0, function () {var s, o, a;return b(this, function (u) {switch (u.label) {case 0:return (null == i ? void 0 : i.isBosRes) ? [2, Promise.resolve(i)] : [4, this._engine.getFileUrl(e, r, t, n)];case 1:return s = u.sent(), o = s.code, a = s.data, o === me.SUCCESS ? [2, Promise.resolve(a)] : [2, Promise.reject(o)];}});});}, e.prototype.createTag = function (e) {return w(this, void 0, void 0, function () {return b(this, function (t) {return [2, this._engine.createTag(e)];});});}, e.prototype.removeTag = function (e) {return w(this, void 0, void 0, function () {return b(this, function (t) {return [2, this._engine.removeTag(e)];});});}, e.prototype.updateTag = function (e) {return w(this, void 0, void 0, function () {return b(this, function (t) {return [2, this._engine.updateTag(e)];});});}, e.prototype.getTagList = function () {return w(this, void 0, void 0, function () {return b(this, function (e) {return [2, this._engine.getTagList()];});});}, e.prototype.addTagForConversations = function (e, t) {return w(this, void 0, void 0, function () {return b(this, function (n) {return t.length > 1e3 ? [2, Promise.reject(me.CONVER_OUT_LIMIT_ERROR)] : [2, this._engine.addTagForConversations(e, t)];});});}, e.prototype.removeTagForConversations = function (e, t) {return w(this, void 0, void 0, function () {return b(this, function (n) {return [2, this._engine.removeTagForConversations(e, t)];});});}, e.prototype.removeTagsForConversation = function (e, t) {return w(this, void 0, void 0, function () {return b(this, function (n) {return [2, this._engine.removeTagsForConversation(e, t)];});});}, e.prototype.getConversationListByTag = function (e, t, n, i) {return w(this, void 0, void 0, function () {return b(this, function (r) {return [2, this._engine.getConversationListByTag(e, t, n, i)];});});}, e.prototype.getUnreadCountByTag = function (e, t) {return w(this, void 0, void 0, function () {return b(this, function (n) {return [2, this._engine.getUnreadCountByTag(e, t)];});});}, e.prototype.setConversationStatusInTag = function (e, t, n) {return w(this, void 0, void 0, function () {return b(this, function (i) {return [2, this._engine.setConversationStatusInTag(e, t, n)];});});}, e.prototype.getTagsForConversation = function (e) {return w(this, void 0, void 0, function () {return b(this, function (t) {return [2, this._engine.getTagsForConversation(e)];});});}, e.prototype.callExtra = function (e) {for (var t, n = [], i = 1; i < arguments.length; i++) {n[i - 1] = arguments[i];}return (t = this._engine).callExtra.apply(t, M([e], n));}, e.prototype.clearConversations = function (e, t) {return w(this, void 0, void 0, function () {return b(this, function (n) {switch (n.label) {case 0:return [4, this._engine.clearConversations(e, t)];case 1:return [2, n.sent()];}});});}, e.prototype.setUserStatusListener = function (e, t) {return this._engine.setUserStatusListener(e, function (e) {try {t(e);} catch (e) {pe.error(e);}});}, e.prototype.addToBlacklist = function (e) {return w(this, void 0, void 0, function () {return b(this, function (t) {return [2, this._engine.addToBlacklist(e)];});});}, e.prototype.removeFromBlacklist = function (e) {return w(this, void 0, void 0, function () {return b(this, function (t) {return [2, this._engine.removeFromBlacklist(e)];});});}, e.prototype.getBlacklist = function () {return w(this, void 0, void 0, function () {return b(this, function (e) {return [2, this._engine.getBlacklist()];});});}, e.prototype.getBlacklistStatus = function (e) {return w(this, void 0, void 0, function () {return b(this, function (t) {return [2, this._engine.getBlacklistStatus(e)];});});}, e.prototype.insertMessage = function (e, t, n) {return w(this, void 0, void 0, function () {return b(this, function (i) {return [2, this._engine.insertMessage(e, t, n)];});});}, e.prototype.deleteMessages = function (e) {return w(this, void 0, void 0, function () {return b(this, function (t) {return [2, this._engine.deleteMessages(e)];});});}, e.prototype.deleteMessagesByTimestamp = function (e, t, n, i, r) {return void 0 === r && (r = ""), w(this, void 0, void 0, function () {return b(this, function (s) {return [2, this._engine.deleteMessagesByTimestamp(e, t, n, i, r)];});});}, e.prototype.clearMessages = function (e, t, n) {return void 0 === n && (n = ""), w(this, void 0, void 0, function () {return b(this, function (i) {return [2, this._engine.clearMessages(e, t, n)];});});}, e.prototype.getMessage = function (e) {return w(this, void 0, void 0, function () {return b(this, function (t) {return [2, this._engine.getMessage(e)];});});}, e.prototype.setMessageContent = function (e, t, n) {return w(this, void 0, void 0, function () {return b(this, function (i) {return [2, this._engine.setMessageContent(e, t, n)];});});}, e.prototype.setMessageSearchField = function (e, t, n) {return w(this, void 0, void 0, function () {return b(this, function (i) {return [2, this._engine.setMessageSearchField(e, t, n)];});});}, e.prototype.setMessageSentStatus = function (e, t) {return w(this, void 0, void 0, function () {return b(this, function (n) {return [2, this._engine.setMessageSentStatus(e, t)];});});}, e.prototype.setMessageReceivedStatus = function (e, t) {return w(this, void 0, void 0, function () {return b(this, function (n) {return [2, this._engine.setMessageReceivedStatus(e, t)];});});}, e.prototype.setUserStatus = function (e) {return w(this, void 0, void 0, function () {return b(this, function (t) {return [2, this._engine.setUserStatus(e)];});});}, e.prototype.subscribeUserStatus = function (e) {return w(this, void 0, void 0, function () {return b(this, function (t) {return [2, this._engine.subscribeUserStatus(e)];});});}, e.prototype.getUserStatus = function (e) {return w(this, void 0, void 0, function () {return b(this, function (t) {return [2, this._engine.getUserStatus(e)];});});}, e.prototype.searchConversationByContent = function (e, t, n, i) {return void 0 === t && (t = []), void 0 === n && (n = ""), w(this, void 0, void 0, function () {return b(this, function (r) {return [2, this._engine.searchConversationByContent(e, t, n, i)];});});}, e.prototype.searchMessageByContent = function (e, t, n, i, r, s, o) {return void 0 === o && (o = ""), w(this, void 0, void 0, function () {return b(this, function (a) {return [2, this._engine.searchMessageByContent(e, t, n, i, r, s, o)];});});}, e.prototype.getUnreadMentionedMessages = function (e, t, n) {return void 0 === n && (n = ""), this._engine.getUnreadMentionedMessages(e, t, n);}, e.prototype.clearUnreadCountByTimestamp = function (e, t, n, i) {return void 0 === i && (i = ""), this._engine.clearUnreadCountByTimestamp(e, t, n, i);}, e.prototype.getConversationNotificationStatus = function (e, t, n) {return void 0 === n && (n = ""), this._engine.getConversationNotificationStatus(e, t, n);}, e.prototype.getRemoteHistoryMessages = function (e, t, n, i, r, s) {return this._engine.getRemoteHistoryMessages(e, t, n, i, r, s);}, e.prototype.joinRTCRoom = function (e, t, n, i) {return this._engine.joinRTCRoom(e, t, n, i);}, e.prototype.quitRTCRoom = function (e) {return this._engine.quitRTCRoom(e);}, e.prototype.rtcPing = function (e, t, n) {return this._engine.rtcPing(e, t, n);}, e.prototype.getRTCRoomInfo = function (e) {return this._engine.getRTCRoomInfo(e);}, e.prototype.getRTCUserInfoList = function (e) {return this._engine.getRTCUserInfoList(e);}, e.prototype.getRTCUserInfo = function (e) {return this._engine.getRTCUserInfo(e);}, e.prototype.setRTCUserInfo = function (e, t, n) {return this._engine.setRTCUserInfo(e, t, n);}, e.prototype.removeRTCUserInfo = function (e, t) {return this._engine.removeRTCUserInfo(e, t);}, e.prototype.setRTCData = function (e, t, n, i, r, s) {return this._engine.setRTCData(e, t, n, i, r, s);}, e.prototype.setRTCTotalRes = function (e, t, n, i, r) {return void 0 === r && (r = ""), this._engine.setRTCTotalRes(e, t, n, i, r);}, e.prototype.setRTCCDNUris = function (e, t, n) {return this._engine.setRTCCDNUris(e, t, n);}, e.prototype.getRTCData = function (e, t, n, i) {return this._engine.getRTCData(e, t, n, i);}, e.prototype.removeRTCData = function (e, t, n, i, r) {return this._engine.removeRTCData(e, t, n, i, r);}, e.prototype.setRTCOutData = function (e, t, n, i) {return this._engine.setRTCOutData(e, t, n, i);}, e.prototype.getRTCOutData = function (e, t) {return this._engine.getRTCOutData(e, t);}, e.prototype.getRTCToken = function (e, t, n) {return this._engine.getRTCToken(e, t, n);}, e.prototype.setRTCState = function (e, t) {return this._engine.setRTCState(e, t);}, e.prototype.getRTCUserList = function (e) {return this._engine.getRTCUserList(e);}, e.prototype.joinLivingRoomAsAudience = function (e, t, n) {return this._engine.joinLivingRoomAsAudience(e, t, n);}, e.prototype.quitLivingRoomAsAudience = function (e) {return this._engine.quitLivingRoomAsAudience(e);}, e.prototype.rtcIdentityChange = function (e, t, n) {return this._engine.rtcIdentityChange(e, t, n);}, e.prototype.getRTCJoinedUserInfo = function (e) {return this._engine.getRTCJoinedUserInfo(e);}, e;}();exports.APIContext = Wr;exports.TagChangeType = Jr;!function (e) {e[e.add = 1] = "add", e[e.update = 2] = "update", e[e.delete = 3] = "delete";}(Jr || (exports.TagChangeType = Jr = {}));var zr = "4.5.1";exports.version = zr;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/node-libs-browser/mock/process.js */ 18)))

/***/ }),
/* 18 */
/*!********************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/process.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__(/*! path */ 19);
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),
/* 19 */
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node-libs-browser/mock/process.js */ 18)))

/***/ }),
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
/*!****************************************************************************************!*\
  !*** /Users/zhr/study/practice/rongyunIM/demoForRongyun/demoForRongyun/api/request.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;



var _App = _interopRequireDefault(__webpack_require__(/*! @/App.vue */ 6));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} //线上版本
//let urlHeader = "https://www.pinjianfang.cn/"
//测试版本
var urlHeader = "http://localhost:9090/";function post(url, data) {return uni.request({ url: urlHeader + url,
    data: data,
    header: {
      'Content-Type': 'application/json' },

    method: "POST" }).
  then(function (res) {
    if (res[1].data.code == 1) {
      return res[1].data;
    } else {
      uni.showToast({
        title: res[1].data.message,
        mask: true,
        icon: 'none',
        duration: 1000 });

      uni.reLaunch({
        url: '/pages/login/login' });

    }
  }).catch(function (err) {
    uni.showToast({
      title: err,
      icon: 'none' });

    return;
  });
}var _default =
{
  post: post };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map