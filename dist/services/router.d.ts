declare class ProxyRouter {
    constructor();
    /**
     * @param url URL to send the request to
     * @param method HTTP method to use
     * @returns Promise<any>
     * @description Send a request to a URL
     */
    static send(url: string, method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "CONNECT" | "TRACE"): Promise<unknown>;
}

export = ProxyRouter;
