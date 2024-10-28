import { ProxyObject, ProxyAPIOptions, ProxyAPIResponse, ProxyFetchOptions } from './types.js';

declare class Engine {
    constructor();
    static proxies: ProxyObject[];
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
    static getProxyList(options?: ProxyAPIOptions): Promise<ProxyAPIResponse>;
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
    static getProxy(fetchOptions?: ProxyFetchOptions): Promise<ProxyObject | undefined>;
}

export = Engine;
