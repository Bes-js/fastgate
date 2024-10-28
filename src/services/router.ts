import nyro from 'nyro';

export default class ProxyRouter {
  constructor() { };

  /**
   * @param url URL to send the request to
   * @param method HTTP method to use
   * @returns Promise<any>
   * @description Send a request to a URL
   */
  public static async send(url: string, method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "CONNECT" | "TRACE") {
    return new Promise((resolve, reject) => {
    nyro({
        url: url,
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
        },
        timeout: 10000
    }).then((response) => {
        resolve(response.body);
    }).catch((error) => {
        reject(error);
    })
  })
 }
 
}