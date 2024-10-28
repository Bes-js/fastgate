<br/>
<p align="center">
<img src="./assets/fastgate_logo.png" align="center">
</p>
<h4 align="center">Fastgate provides free, secure, and easy-to-integrate proxy services for developers.</h4>

#

<p align="center"> 
<img src="./assets/nyro_logo.png" align="center" width=200 height=100>
<span align="center">Powered By Nyro</span>
</p>

#

<p align="center">
<img src="https://img.shields.io/npm/v/fastgate?style=for-the-badge&logo=npm&logoColor=red">
<img src="https://img.shields.io/github/repo-size/Bes-js/fastgate?style=for-the-badge&logo=github&logoColor=white"> 
<img src="https://img.shields.io/npm/l/fastgate?style=for-the-badge">
<img src="https://img.shields.io/npm/unpacked-size/fastgate?style=for-the-badge"> 
<img src="https://img.shields.io/npm/dt/fastgate?style=for-the-badge&logoColor=blue"> 
<img src="https://img.shields.io/github/package-json/dependency-version/Bes-js/fastgate/sequelize?style=for-the-badge">
<a href="https://discord.gg/luppux" target="_blank"> 
<img alt="Discord" src="https://img.shields.io/badge/Support-Click%20here-7289d9?style=for-the-badge&logo=discord"> 
</a>
<a href="https://www.buymeacoffee.com/beykant" target="_blank">
<img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" width="120px" height="30px" alt="Buy Me A Coffee">
</a>
</p>

## Installation

Using npm:
```shell
$ npm install fastgate
```

Other Installations:

```bash
$ yarn add fastgate
```

```bash
$ pnpm add fastgate
```

## Usage
```js
import fastgate from 'fastgate';
    
/* Promise<ProxyAPIResponse> */
fastgate.getProxyList({
        country: ['tr'],
        protocol: ['http'],
        anonymity: ['Elite'],
        timeout: 5555
 }).then((response) => {
      console.log(response);
    });

/* Promise<ProxyObject | undefined> */
fastgate.getProxy({
   force: false,
   proxyOptions: {
     alive: true,
     timeout: (timeout) => {
      return timeout < 5000;
    },
     ip: (ip) => {
        return ip.startsWith('190');
    }
 }).then((response) => {
      console.log(response);
    });
```

## License

fastgate is licensed under the **GPL-3.0** License. See the [LICENSE](./LICENSE.md) file for details.

## Support

[![Discord Banner](https://api.weblutions.com/discord/invite/luppux/)](https://discord.gg/luppux)