export type Protocol = 'socks4' | 'socks5' | 'http';

export type Format = 'json' | 'text' | 'csv';

export type Anonymity = 'Elite' | 'Anonymous' | 'Transparent';

export type ProxyFormat = 'protocolipport' | 'ipport';

export interface ProxyObject {
    alive?: boolean,
    alive_since?: number,
    anonymity?: Anonymity,
    average_timeout?: number,
    first_seen?: number,
    ip_data?: {
        as?: string,
        asname?: string,
        city?: string,
        continent?: string,
        continentCode?: string,
        country?: string,
        countryCode?: string,
        district?: string,
        hosting?: boolean,
        isp?: string,
        lat?: number,
        lon?: number,
        mobile?: boolean,
        org?: string,
        proxy?: boolean,
        regionName?: string,
        status?: string,
        timezone?: string,
        zip?: string
    },
    ip_data_last_update?: number,
    last_seen?: number,
    port?: number,
    protocol?: Protocol,
    proxy?: string,
    ssl?: boolean,
    timeout?: number,
    times_alive?: number,
    times_dead?: number,
    uptime?: number,
    ip?: string
};

export interface ProxyFilterOptions {
    alive?: boolean,
    timeout?: (timeout:number) => any,
    anonymity?: Anonymity,
    protocol?: Protocol,
    ssl?: boolean,
    ip?: (ip:string) => any,
    port?: (port:number) => any,
};

export interface ProxyFetchOptions {
    proxyOptions?: ProxyFilterOptions,
    force?: boolean,
    reload?: boolean,
    reloadTimeout?: number,
    removeProxy?: boolean,
};

export interface ProxyAPIResponse {
    shown_records?: number,
    total_records?: number,
    limit?: number,
    skip?: number,
    nextpage?: boolean,
    proxies?: ProxyObject[]
};

export type OmitedProxyAPIResponse = Omit<ProxyAPIResponse, 'shown_records' | 'total_records' | 'limit' | 'skip' | 'nextpage'>;

export type Country = 'tr' | 'hr' | 'dz' | 'sl' | 'bj' | 'mw' | 'sn' | 'tg' | 'et' | 'ls' | 'ml' | 'ma' | 'gm' | 'mg' | 'bw' | 'na' | 'mu' | 'zw' | 'ao' | 'bf' | 'bi' | 'cg' | 'so' | 'gq' | 'td' | 'sd' | 'tn' | 'gn' | 'cm' | 'mz' | 'rw' | 'eg' | 'tz' | 'gh' | 'ke' | 'gi' | 'ug' | 'ng' | 'za' | 'kn' | 'ye' | 'bm' | 'vg' | 'fi' | 'sz' | 'sc' | 'tj' | 'jm' | 'ee' | 'az' | 'si' | 'cy' | 'pr' | 'sy' | 'mt' | 'pt' | 'ad' | 'ni' | 'ht' | 'fj' | 'sv' | 'nz' | 'ae' | 'lv' | 'lb' | 'mv' | 'mk' | 'ie' | 'dk' | 'il' | 'lt' | 'uy' | 'mx' | 'lk' | 'at' | 'am' | 'gr' | 'kz' | 'hn' | 'bo' | 'cl' | 'gu' | 'sa' | 'mm' | 'no' | 've' | 'tw' | 'af' | 'al' | 'pe' | 'bt' | 'md' | 'be' | 'ge' | 'sk' | 'py' | 'do' | 'uz' | 'ec' | 'mn' | 'ro' | 'me' | 'tl' | 'cz' | 'jp' | 'qa' | 'au' | 'bg' | 'it' | 'ca' | 'se' | 'co' | 'by' | 'ch' | 'jo' | 'ps' | 'vn' | 'kh' | 'cr' | 'hu' | 'my' | 'np' | 'ar' | 'kg' | 'gt' | 'ph' | 'gb' | 'rs' | 'pa' | 'pk' | 'pl' | 'es' | 'iq' | 'sg' | 'bd' | 'hk' | 'in' | 'th' | 'kr' | 'cn' | 'id' | 'br' | 'us' | 'ua' | 'ir' | 'fr' | 'de' | 'nl';

export interface ProxyAPIOptions {
    country?: Country[],
    protocol?: Protocol[],
    proxy_format?: ProxyFormat,
    format?: Format,
    anonymity?: Anonymity[],
    timeout?: number
};