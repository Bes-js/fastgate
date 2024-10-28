import ProxyRouter from "./router";
import { 
    ProxyAPIOptions,
    ProxyAPIResponse,
    ProxyFilterOptions,
    ProxyFetchOptions,
    OmitedProxyAPIResponse,
    ProxyObject
 } from './types';

var cachedProxies: any[] = [];
var lastFetchTimestamp: number = 0;

export default class Engine {
    constructor() {};

    public static proxies: ProxyObject[] = cachedProxies;
    
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
    public static async getProxyList(options?: ProxyAPIOptions): Promise<ProxyAPIResponse> {
        if(!options) options = {};
        if(!options.format) options.format = 'json';
        if(!options.proxy_format) options.proxy_format = 'protocolipport';
        if(!options.protocol) options.protocol = ['http', 'socks4', 'socks5'];

        return new Promise((resolve, reject) => {
         ProxyRouter.send(
         `https://api.proxyscrape.com/v4/free-proxy-list/get?request=display_proxies${
                options.country ? `&country=${options.country.join(',')}` : ''
            }${
                options.protocol ? `&protocol=${options.protocol.join(',')}` : ''
            }${
                options.proxy_format ? `&proxy_format=${options.proxy_format}` : ''
            }${
                options.format ? `&format=${options.format}` : ''
            }${
                options.anonymity ? `&anonymity=${options.anonymity.join(',')}` : ''
            }${
                options.timeout ? `&timeout=${options.timeout}` : ''
            }`,
         'GET'
        ).then((response) => {
            resolve(response as ProxyAPIResponse);
        }).catch((error) => {
            reject(error);
        });
    });
   };

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
   public static async getProxy(fetchOptions?: ProxyFetchOptions): Promise<ProxyObject|undefined> {

    if(!fetchOptions) fetchOptions = {};
    if(fetchOptions?.force) cachedProxies = [];
    if(
        fetchOptions?.reload &&
        fetchOptions?.reloadTimeout &&
        Date.now() - lastFetchTimestamp > fetchOptions?.reloadTimeout
     ) {
        cachedProxies = [];
     }
     
     const filteredCatchProxy = (): ProxyObject | undefined => {
        const findedProxy: ProxyObject | undefined = cachedProxies.find((proxy) => {
         
            if (fetchOptions?.proxyOptions?.alive && !proxy?.alive) return false;
            if (fetchOptions?.proxyOptions?.timeout && !fetchOptions.proxyOptions.timeout(proxy.timeout)) return false;
            if (fetchOptions?.proxyOptions?.anonymity && !fetchOptions.proxyOptions.anonymity.includes(proxy.anonymity)) return false;
            if (fetchOptions?.proxyOptions?.protocol && !fetchOptions.proxyOptions.protocol.includes(proxy.protocol)) return false;
            if (fetchOptions?.proxyOptions?.ssl !== undefined && proxy?.ssl !== fetchOptions.proxyOptions.ssl) return false;
            if (fetchOptions?.proxyOptions?.ip && !fetchOptions.proxyOptions.ip(proxy.ip)) return false;
            if (fetchOptions?.proxyOptions?.port && !fetchOptions.proxyOptions.port(proxy.port)) return false;
    
            return true;
        });
    
        return findedProxy;
    };

     const catchProxy = (): ProxyObject => {
        if(cachedProxies.length === 0) {
            throw new Error('No proxies found');
        };
        var randomNumber = Math.floor(Math.random() * cachedProxies.length);
        var proxy = cachedProxies[randomNumber];
        if(fetchOptions?.removeProxy) cachedProxies.splice(randomNumber, 1);
        return proxy;
     };

     if(cachedProxies.length === 0) {
     cachedProxies = await new Promise((resolve, reject) => {
        this.getProxyList().then((response) => {
            lastFetchTimestamp = Date.now();
            if(!response.proxies) {
                reject('No proxies found');
                return;
            }

            resolve(response.proxies);
        }).catch((error) => {
            reject(error);
        });
    });

    if(fetchOptions.proxyOptions) {
        return filteredCatchProxy();
    } else {
        return catchProxy();
    }
    } else {
    if(fetchOptions.proxyOptions) {
        return filteredCatchProxy();
    } else {
        return catchProxy();
    }
    }

   };


}