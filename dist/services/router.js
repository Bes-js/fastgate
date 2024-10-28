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
/* Package */

module.exports = ProxyRouter;
//# sourceMappingURL=router.js.map

module.exports = exports.default;
//# sourceMappingURL=router.js.map