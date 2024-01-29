"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
const http_1 = require("./http");
const util_1 = require("./util");

async function getToken(options) {
    options = {
        surl: "https://client-api.arkoselabs.com",
        data: {},
        ...options,
    };
    if (!options.headers)
        options.headers = { "User-Agent": util_1.default.DEFAULT_USER_AGENT };
    else if (!Object.keys(options.headers).map(v => v.toLowerCase()).includes("user-agent"))
        options.headers["User-Agent"] = util_1.default.DEFAULT_USER_AGENT;
    options.headers["Accept-Language"] = "en-US,en;q=0.9";
    options.headers["Sec-Fetch-Site"] = "same-origin";
    options.headers["Accept"] = "*/*";
    options.headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8";
    options.headers["sec-fetch-dest"] = "empty";
    options.headers["sec-fetch-mode"] = "cors";
    options.headers["Sec-Ch-Ua-Platform"] = '"Windows"';
    options.headers["Sec-Ch-Ua-Mobile"] = '?0';
    options.headers["Sec-Ch-Ua"] = '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"';
    options.headers["Cookie"] = await getCookie(options)
    let arkoselab = await getVersion(options)
    if (options.site) {
        options.headers["Origin"] = options.surl;
        options.headers["Referer"] = 'https://client-api.arkoselabs.com/v2/' + arkoselab['file'];
    }
    options.funcaptcha_file = arkoselab['file']
    let ua = options.headers[Object.keys(options.headers).find(v => v.toLowerCase() == "user-agent")];
    let bda = util_1.default.getBda(ua, options)
    options.data['blob'] = 'undefined'
    let jsonBody = {
        bda: bda,
        public_key: options.pkey,
        site: options.site ? new URL(options.site).origin : undefined,
        userbrowser: ua,
        capi_version: arkoselab['version'],
        capi_mode: "inline",
        style_theme: "default",
        rnd: Math.random().toString(),
        ...Object.fromEntries(Object.keys(options.data).map(v => ["data[" + v + "]", options.data[v]])),
        language: "en",
    }
    let res = await (0, http_1.default)(options.surl, {
        method: "POST",
        path: "/fc/gt2/public_key/" + options.pkey,
        body: util_1.default.constructFormData(jsonBody),
        headers: options.headers,
    }, options.proxy);
    let response = res.body.toString()
    let reqData = JSON.parse(res.body.toString())
    reqData['cookie'] = options.headers["Cookie"]
    return reqData;
}
async function getVersion(options) {
    let getVersionHeaders = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'referer': 'https://iframe.arkoselabs.com/',
        'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-site': 'same-site',
        'user-agent': options.headers["user-agent"]
    }
    let res = await (0, http_1.default)(`https://client-api.arkoselabs.com/v2/${options.pkey}/api.js`, {
        method: "GET",
        headers: getVersionHeaders,
    }, options.proxy);
    let response = res.body.toString()
    const file = response.match(/file:"(.*?)",/)[1];
    const version = file.split('/')[0]
    return { version, file };
}
async function getCookie(options) {
    let getCookieHeaders = {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'referer': 'https://iframe.arkoselabs.com/',
        'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'script',
        'sec-fetch-mode': 'no-cors',
        'sec-fetch-site': 'same-site',
        'user-agent': options.headers["user-agent"]
    }

    let res = await (0, http_1.default)(`https://client-api.arkoselabs.com/v2/${options.pkey}/settings`, {
        method: "GET",
        headers: getCookieHeaders,
    }, options.proxy);
    let response = res.headers['set-cookie']
    return response;
}
exports.getToken = getToken;
