'use strict';

var nyro = require('nyro');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var nyro__default = /*#__PURE__*/_interopDefault(nyro);

/* Package */
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var _ProxyRouter = class _ProxyRouter {
  constructor() {
  }
  /**
   * @param url URL to send the request to
   * @param method HTTP method to use
   * @returns Promise<any>
   * @description Send a request to a URL
   */
  static async send(url, method) {
    return new Promise((resolve, reject) => {
      nyro__default.default({
        url,
        method,
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
        },
        timeout: 1e4
      }).then((response) => {
        resolve(response.body);
      }).catch((error) => {
        reject(error);
      });
    });
  }
};
__name(_ProxyRouter, "ProxyRouter");
var ProxyRouter = _ProxyRouter;

// src/services/engine.ts
var cachedProxies = [];
var lastFetchTimestamp = 0;
var _Engine = class _Engine {
  constructor() {
  }
  /**
   * Get a list of proxies
   * @param options Options for fetching the list
   * @returns ProxyAPIResponse
   * 
   * @example
   * 
   * import fastgate from 'fastgate';
   * 
   * fastgate.getProxyList({
   *    country: ['US'],
   *    protocol: ['http'],
   *    anonymity: ['elite'],
   *    timeout: 5000
   * }).then((response) => {
   *  console.log(response);
   * })
   * 
   */
  static async getProxyList(options) {
    if (!options) options = {};
    if (!options.format) options.format = "json";
    if (!options.proxy_format) options.proxy_format = "protocolipport";
    if (!options.protocol) options.protocol = ["http", "socks4", "socks5"];
    return new Promise((resolve, reject) => {
      ProxyRouter.send(
        `https://api.proxyscrape.com/v4/free-proxy-list/get?request=display_proxies${options.country ? `&country=${options.country.join(",")}` : ""}${options.protocol ? `&protocol=${options.protocol.join(",")}` : ""}${options.proxy_format ? `&proxy_format=${options.proxy_format}` : ""}${options.format ? `&format=${options.format}` : ""}${options.anonymity ? `&anonymity=${options.anonymity.join(",")}` : ""}${options.timeout ? `&timeout=${options.timeout}` : ""}`,
        "GET"
      ).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }
  /**
   * Get a proxy from the list
   * @param fetchOptions Options for fetching the proxy
   * @returns ProxyObject
   * 
   * @example 
   * 
   * import fastgate from 'fastgate';
   * 
   * fastgate.getProxy({
   *    force: false,
   *   proxyOptions: {
   *      alive: true,
   *     timeout: (timeout) => {
   *      return timeout < 5000;
   *    },
   *     ip: (ip) => {
   *        return ip.startsWith('190');
   *    }
   * }).then((response) => {
   *  console.log(response);
   * })
   * 
   */
  static async getProxy(fetchOptions) {
    if (!fetchOptions) fetchOptions = {};
    if (fetchOptions == null ? void 0 : fetchOptions.force) cachedProxies = [];
    if ((fetchOptions == null ? void 0 : fetchOptions.reload) && (fetchOptions == null ? void 0 : fetchOptions.reloadTimeout) && Date.now() - lastFetchTimestamp > (fetchOptions == null ? void 0 : fetchOptions.reloadTimeout)) {
      cachedProxies = [];
    }
    const filteredCatchProxy = /* @__PURE__ */ __name(() => {
      const findedProxy = cachedProxies.find((proxy) => {
        var _a, _b, _c, _d, _e, _f, _g;
        if (((_a = fetchOptions == null ? void 0 : fetchOptions.proxyOptions) == null ? void 0 : _a.alive) && !(proxy == null ? void 0 : proxy.alive)) return false;
        if (((_b = fetchOptions == null ? void 0 : fetchOptions.proxyOptions) == null ? void 0 : _b.timeout) && !fetchOptions.proxyOptions.timeout(proxy.timeout)) return false;
        if (((_c = fetchOptions == null ? void 0 : fetchOptions.proxyOptions) == null ? void 0 : _c.anonymity) && !fetchOptions.proxyOptions.anonymity.includes(proxy.anonymity)) return false;
        if (((_d = fetchOptions == null ? void 0 : fetchOptions.proxyOptions) == null ? void 0 : _d.protocol) && !fetchOptions.proxyOptions.protocol.includes(proxy.protocol)) return false;
        if (((_e = fetchOptions == null ? void 0 : fetchOptions.proxyOptions) == null ? void 0 : _e.ssl) !== void 0 && (proxy == null ? void 0 : proxy.ssl) !== fetchOptions.proxyOptions.ssl) return false;
        if (((_f = fetchOptions == null ? void 0 : fetchOptions.proxyOptions) == null ? void 0 : _f.ip) && !fetchOptions.proxyOptions.ip(proxy.ip)) return false;
        if (((_g = fetchOptions == null ? void 0 : fetchOptions.proxyOptions) == null ? void 0 : _g.port) && !fetchOptions.proxyOptions.port(proxy.port)) return false;
        return true;
      });
      return findedProxy;
    }, "filteredCatchProxy");
    const catchProxy = /* @__PURE__ */ __name(() => {
      if (cachedProxies.length === 0) {
        throw new Error("No proxies found");
      }
      var randomNumber = Math.floor(Math.random() * cachedProxies.length);
      var proxy = cachedProxies[randomNumber];
      if (fetchOptions == null ? void 0 : fetchOptions.removeProxy) cachedProxies.splice(randomNumber, 1);
      return proxy;
    }, "catchProxy");
    if (cachedProxies.length === 0) {
      cachedProxies = await new Promise((resolve, reject) => {
        this.getProxyList().then((response) => {
          lastFetchTimestamp = Date.now();
          if (!response.proxies) {
            reject("No proxies found");
            return;
          }
          resolve(response.proxies);
        }).catch((error) => {
          reject(error);
        });
      });
      if (fetchOptions.proxyOptions) {
        return filteredCatchProxy();
      } else {
        return catchProxy();
      }
    } else {
      if (fetchOptions.proxyOptions) {
        return filteredCatchProxy();
      } else {
        return catchProxy();
      }
    }
  }
};
__name(_Engine, "Engine");
_Engine.proxies = cachedProxies;
var Engine = _Engine;
/* Package */

module.exports = Engine;
//# sourceMappingURL=engine.js.map

module.exports = exports.default;
//# sourceMappingURL=engine.js.map