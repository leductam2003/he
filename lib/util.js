"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fingerprint_1 = require("./fingerprint");
const murmur_1 = require("./murmur");
const crypt_1 = require("./crypt");
const DEFAULT_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
let apiBreakers = {
    v1: {
        3: {
            default: (c) => c,
            method_1: (c) => ({ x: c.y, y: c.x }),
            method_2: (c) => ({ x: c.x, y: (c.y + c.x) * c.x }),
            method_3: (c) => ({ a: c.x, b: c.y }),
            method_4: (c) => [c.x, c.y],
            method_5: (c) => [c.y, c.x].map((v) => Math.sqrt(v)),
        },
        4: {
            default: (c) => c
        }
    },
    v2: {
        3: {
            value: {
                alpha: (c) => ({ x: c.x, y: (c.y + c.x) * c.x, px: c.px, py: c.py }),
                beta: (c) => ({ x: c.y, y: c.x, py: c.px, px: c.py }),
                gamma: (c) => ({ x: c.y + 1, y: -c.x, px: c.px, py: c.py }),
                delta: (c) => ({ x: c.y + 0.25, y: c.x + 0.5, px: c.px, py: c.py }),
                epsilon: (c) => ({ x: c.x * 0.5, y: c.y * 5, px: c.px, py: c.py }),
                zeta: (c) => ({ x: c.x + 1, y: c.y + 2, px: c.px, py: c.py }),
                method_1: (c) => ({ x: c.x, y: c.y, px: c.px, py: c.py }),
                method_2: (c) => ({ x: c.y, y: (c.y + c.x) * c.x, px: c.px, py: c.py }),
                method_3: (c) => ({ x: Math.sqrt(c.x), y: Math.sqrt(c.y), px: c.px, py: c.py }),
            },
            key: {
                alpha: (c) => [c.y, c.px, c.py, c.x],
                beta: (c) => JSON.stringify({ x: c.x, y: c.y, px: c.px, py: c.py }),
                gamma: (c) => [c.x, c.y, c.px, c.py].join(" "),
                delta: (c) => [1, c.x, 2, c.y, 3, c.px, 4, c.py],
                epsilon: (c) => ({ answer: { x: c.x, y: c.y, px: c.px, py: c.py } }),
                zeta: (c) => [c.x, [c.y, [c.px, [c.py]]]],
                method_1: (c) => ({ a: c.x, b: c.y, px: c.px, py: c.py }),
                method_2: (c) => [c.x, c.y],
                method_3: (c) => [c.y, c.x],
            }
        },
        4: {
            value: {
                // @ts-ignore
                alpha: (c) => ({ index: String(c.index) + 1 - 2 }),
                beta: (c) => ({ index: -c.index }),
                gamma: (c) => ({ index: 3 * (3 - c.index) }),
                delta: (c) => ({ index: 7 * c.index }),
                epsilon: (c) => ({ index: 2 * c.index }),
                zeta: (c) => ({ index: c.index ? 100 / c.index : c.index }),
                va: (c) => ({ index: c.index + 3 }),
                vb: (c) => ({ index: -c.index }),
                vc: (c) => ({ index: 10 - c.index }),
                vd: (c) => ({ index: 3 * c.index }),
            },
            key: {
                alpha: (c) => [Math.round(100 * Math.random()), c.index, Math.round(100 * Math.random())],
                beta: (c) => ({ size: 50 - c.index, id: c.index, limit: 10 * c.index, req_timestamp: Date.now() }),
                gamma: (c) => c.index,
                delta: (c) => ({ index: c.index }),
                epsilon: (c) => {
                    const arr = [];
                    const len = Math.round(5 * Math.random()) + 1;
                    const rand = Math.round(Math.random() * len);
                    for (let i = 0; i < len; i++) {
                        arr.push(i === rand ? c.index : Math.round(10 * Math.random()));
                    }
                    arr.push(rand);
                    return arr;
                },
                zeta: (c) => Array(Math.round(5 * Math.random()) + 1).concat(c.index),
                ka: (c) => c.index,
                kb: (c) => [c.index],
                kc: (c) => ({ guess: c.index }),
            }
        }
    }
};
function tileToLoc(tile) {
    let xClick = (tile % 3) * 100 + (tile % 3) * 3 + 3 + 10 + Math.floor(Math.random() * 80);
    let yClick = Math.floor(tile / 3) * 100 + Math.floor(tile / 3) * 3 + 3 + 10 + Math.floor(Math.random() * 80);
    const fraction = number => (number.toString().length >= 3) ? (parseInt(number.toString().slice(-2)) / 100).toString() : (number / 100).toString();

    return {
        x: xClick,
        y: yClick,
        px: fraction(xClick),
        py: fraction(yClick),
    };
}
function constructFormData(data) {
    return Object.keys(data)
        .filter((v) => data[v] !== undefined)
        .map((k) => `${k}=${encodeURIComponent(data[k])}`)
        .join("&");
}
function random() {
    return Array(32)
        .fill(0)
        .map(() => "0123456789abcdef"[Math.floor(Math.random() * 16)])
        .join("");
}
function getTimestamp() {
    const time = (new Date()).getTime().toString();
    const value = `${time.substring(0, 7)}00${time.substring(7, 13)}`;
    return { cookie: `timestamp=${value};path=/;secure;samesite=none`, value };
}
function getBda(userAgent, opts) {
    let fp = fingerprint_1.default.getFingerprint();
    let fe = fingerprint_1.default.prepareFe(fp);
    let enhanced_fp = fingerprint_1.default.getEnhancedFingerprint(fp, userAgent, opts)
    let f_hash = (0, murmur_1.default)(fingerprint_1.default.prepareF(fingerprint_1.default), 31)
    let wh = `${random()}|72627afbfd19a741c7da1732218301ac`
    let bda = [
        { key: "api_type", value: "js" },
        { key: "f", value: '90d38b56802c7f31283986f4d5b16b96' },
        {
            key: "n",
            value: Buffer.from(Math.round(Date.now() / (1000 - 0)).toString()).toString("base64"),
        },
        { key: "wh", value: wh },
        //note
        {
            "key": "enhanced_fp",
            "value": enhanced_fp
        },
        {
            key: "fe", value: fe
        },
        { key: "ife_hash", value: (0, murmur_1.default)(fe.join(", "), 38) },
        {
            key: "jsbd",
            value: JSON.stringify({
                HL: Math.floor(Math.random() * (10 - 5 + 1)) + 5,
                NCE: true,
                DT: "",
                NWD: "false",
                DMTO: 1,
                DOTO: 1,
            }),
        },
    ];
    //const bda_string = JSON.stringify(bda)
    const fs = require('fs')
    let time = new Date().getTime() / 1000;
    let key = userAgent + Math.round(time - (time % 21600));
    let s = JSON.stringify(bda);
    fs.writeFileSync('bda.json', s)
    let encrypted = crypt_1.default.encrypt(s, key);
    let base64 = Buffer.from(encrypted).toString("base64")
    fs.writeFileSync('bda.txt', base64)
    return base64;
}
function solveBreaker(v2, breaker = "default", gameType, value) {
    if (!v2 && typeof breaker === "string")
        return (apiBreakers.v1[gameType][breaker || "default"] || ((v) => v))(value);
    if (typeof breaker !== "string") {
        let b = apiBreakers.v2[gameType];
        let v = breaker.value.reduce((acc, cur) => {
            if (b.value[cur])
                return b.value[cur](acc);
            else
                return cur;
        }, value);
        return b.key[breaker.key](v);
    }
    else {
        return value;
    }
}
exports.default = {
    DEFAULT_USER_AGENT,
    tileToLoc,
    constructFormData,
    getBda,
    apiBreakers,
    getTimestamp,
    random,
    solveBreaker
};