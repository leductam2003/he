"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Challenge4 = exports.Challenge3 = exports.Challenge1 = exports.Challenge = void 0;
const http_1 = require("./http");
const util_1 = require("./util");
const crypt_1 = require("./crypt");
const console_1 = require("console");
class Challenge {
    constructor(data, challengeOptions) {
        this.wave = 0;
        this.data = data;
        this.userAgent = challengeOptions.userAgent;
        this.proxy = challengeOptions.proxy;
        this.cookie = challengeOptions.cookie;
        this.referer = this.getReferer()
        this.imgs = data.game_data.customGUI._challenge_imgs.map(async (v) => {
            let req = await (0, http_1.default)(v, {
                method: "GET",
                path: undefined,
                headers: {
                    'accept-language': 'en-US,en;q=0.9', 
                    "Cookie" : this.cookie,
                    'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"', 
                    'sec-ch-ua-mobile': '?0', 
                    'sec-ch-ua-platform': '"Windows"', 
                    'sec-fetch-dest': 'empty', 
                    'sec-fetch-mode': 'cors', 
                    'sec-fetch-site': 'same-origin',
                    "user-agent": this.userAgent,
                    "referer": this.referer
                },
            }, this.proxy);
            //console.log(req.body.toString())
            return req.body;
        });
        if (data.game_data.customGUI.encrypted_mode) {
            // Preload decryption key
            this.key = this.getKey();
        }
    }
    getReferer() {
        return `https://client-api.arkoselabs.com/fc/assets/ec-game-core/game-core/1.18.0/standard/index.html?session=${this.data.token}`.replaceAll('|', '&')+ '&theme=default';
    }
    async getImage() {
        let img = await this.imgs[this.wave];
        try {
            JSON.parse(img.toString()); // Image is encrypted
            img = Buffer.from(await crypt_1.default.decrypt(img.toString(), await this.getKey()), "base64");
        }
        catch (err) {
            // Image is not encrypted
            // All good!
        }
        return img;
    }
    async getKey() {
        if (this.key)
            return await this.key;
        let response = await (0, http_1.default)(this.data.tokenInfo.surl, {
            method: "POST",
            path: "/fc/ekey/",
            headers: {
                "User-Agent": this.userAgent,
                "Content-Type": "application/x-www-form-urlencoded",
                "Referer": this.data.tokenInfo.surl,
            },
            body: util_1.default.constructFormData({
                session_token: this.data.session_token,
                game_token: this.data.challengeID,
            }),
        }, this.proxy);
        this.key = JSON.parse(response.body.toString()).decryption_key;
        return this.key;
    }
    get gameType() {
        return this.data.game_data.gameType;
    }
    get variant() {
        return this.data.game_data.game_variant || this.data.game_data.instruction_string;
    }
    get instruction() {
        return this.data.string_table[`${this.data.game_data.gameType}.instructions-${this.variant}`] || this.data.string_table[`${this.data.game_data.gameType}.touch_done_info${this.data.game_data.game_variant ? `_${this.data.game_data.game_variant}` : ""}`];
    }
    get waves() {
        return this.data.game_data.waves;
    }
    async tguess(guess, dapib_url) {
        let req = await (0, http_1.default)('https://arkoselab-tguess.vercel.app', {
            method: "POST",
            path: "/tguess",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "guess": guess,
                "dapib_url": dapib_url,
                "session_token": this.data.session_token,
            }),
        }, this.proxy);
        let reqData = JSON.parse(req.body.toString());
        return reqData['tguess']
    }
}
exports.Challenge = Challenge;
class Challenge1 extends Challenge {
    constructor(data, challengeOptions) {
        super(data, challengeOptions);
        this.answerHistory = [];
        // But WHY?!
        let clr = data.game_data.customGUI._guiFontColr;
        this.increment = parseInt(clr ? clr.replace("#", "").substring(3) : "28", 16);
        this.increment = this.increment > 113 ? this.increment / 10 : this.increment;
    }
    round(num) {
        return (Math.round(num * 10) / 10).toFixed(2);
    }
    async answer(answer) {
        if (answer >= 0 && answer <= Math.round(360 / 51.4) - 1)
            this.answerHistory.push(this.round(answer * this.increment));
        else
            this.answerHistory.push(this.round(answer));
        let encrypted = await crypt_1.default.encrypt(this.answerHistory.toString(), this.data.session_token);
        let req = await (0, http_1.default)(this.data.tokenInfo.surl, {
            method: "POST",
            path: "/fc/ca/",
            headers: {
                "User-Agent": this.userAgent,
                "Content-Type": "application/x-www-form-urlencoded",
                "Referer": this.data.challengeURL
            },
            body: util_1.default.constructFormData({
                session_token: this.data.session_token,
                game_token: this.data.challengeID,
                guess: encrypted,
            }),
        }, this.proxy);
        let reqData = JSON.parse(req.body.toString());
        this.key = reqData.decryption_key || "";
        this.wave++;
        return reqData;
    }
}
exports.Challenge1 = Challenge1;
class Challenge3 extends Challenge {
    constructor(data, challengeOptions) {
        super(data, challengeOptions);
        this.answerHistory = [];
    }
    async answer(tile, dapib_url) {
        (0, console_1.assert)(tile >= 0 && tile <= 5, "Tile must be between 0 and 5");
        let pos = util_1.default.tileToLoc(tile);
        this.answerHistory.push(util_1.default.solveBreaker(!!this.data.game_data.customGUI.is_using_api_breaker_v2, this.data.game_data.customGUI.api_breaker, 3, pos));
        let encrypted = await crypt_1.default.encrypt(JSON.stringify(this.answerHistory), this.data.session_token);
        let { cookie: tCookie, value: tValue } = util_1.default.getTimestamp();
        const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        let prepareRequestId = {
            "sc": [
                getRandomNumber(200, 300),
                getRandomNumber(300, 400)
            ]
        }
        let requestedId = crypt_1.default.encrypt(JSON.stringify(prepareRequestId), `REQUESTED${this.data.session_token}ID`);
        let bodyInJson = {
            session_token: this.data.session_token,
            game_token: this.data.challengeID,
            guess: encrypted,
            analytics_tier: this.data.tokenInfo.at,
            sid: this.data.tokenInfo.r,
            bio: this.data.tokenInfo.mbio && "eyJtYmlvIjoiMTI1MCwwLDE0NywyMDQ7MTg5NCwwLDE1MSwyMDA7MTk2MCwxLDE1MiwxOTk7MjAyOSwyLDE1MiwxOTk7MjU3NSwwLDE1NSwxOTU7MjU4NSwwLDE1NiwxOTA7MjU5NSwwLDE1OCwxODU7MjYwNCwwLDE1OSwxODA7MjYxMywwLDE2MCwxNzU7MjYyMSwwLDE2MSwxNzA7MjYzMCwwLDE2MywxNjU7MjY0MCwwLDE2NCwxNjA7MjY1MCwwLDE2NSwxNTU7MjY2NCwwLDE2NiwxNTA7MjY3NywwLDE2NiwxNDQ7MjY5NCwwLDE2NywxMzk7MjcyMCwwLDE2NywxMzM7Mjc1NCwwLDE2NywxMjc7Mjc4MywwLDE2NywxMjE7MjgxMiwwLDE2NywxMTU7Mjg0MywwLDE2NywxMDk7Mjg2MywwLDE2NywxMDM7Mjg3NSwwLDE2Niw5ODsyOTA1LDAsMTY1LDkzOzMyMzIsMCwxNjUsOTk7MzI2MiwwLDE2NSwxMDU7MzI5OSwwLDE2NCwxMTA7MzM0MCwwLDE2MSwxMTU7MzM3MiwwLDE1NywxMjA7MzM5NSwwLDE1MywxMjQ7MzQwOCwwLDE0OCwxMjc7MzQyMCwwLDE0MywxMzA7MzQyOSwwLDEzOCwxMzE7MzQ0MSwwLDEzMywxMzQ7MzQ1MCwwLDEyOCwxMzU7MzQ2MSwwLDEyMywxMzg7MzQ3NiwwLDExOCwxNDA7MzQ4OSwwLDExMywxNDI7MzUwMywwLDEwOCwxNDM7MzUxOCwwLDEwMywxNDQ7MzUzNCwwLDk4LDE0NTszNTU2LDAsOTMsMTQ2OzM2MTUsMCw4OCwxNDg7MzY2MiwwLDgzLDE1MTszNjgzLDAsNzgsMTU0OzM3MDEsMCw3MywxNTc7MzcyNSwwLDY5LDE2MTszNzkzLDEsNjgsMTYyOzM4NTEsMiw2OCwxNjI7IiwidGJpbyI6IiIsImtiaW8iOiIifQ=="
        }
        if (dapib_url) {
            let tguess = JSON.stringify(await this.tguess(this.answerHistory, dapib_url))
            if (tguess) {
                bodyInJson['tguess'] = crypt_1.default.encrypt(tguess, this.data.session_token)
            }
        }
        let req = await (0, http_1.default)(this.data.tokenInfo.surl, {
            method: "POST",
            path: "/fc/ca/",
            headers: {
                "User-Agent": this.userAgent,
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Newrelic-Timestamp": tValue,
                "X-Requested-ID": requestedId,
                "Cookie": tCookie,
                "Referer": this.data.challengeURL,
                "Origin" : this.data.tokenInfo.surl,
                'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
            },
            body: util_1.default.constructFormData(bodyInJson),
        }, this.proxy);
        let reqData = JSON.parse(req.body.toString());
        this.key = reqData.decryption_key || "";
        this.wave++;
        return reqData;
    }
}
exports.Challenge3 = Challenge3;
class Challenge4 extends Challenge {
    constructor(data, challengeOptions) {
        super(data, challengeOptions);
        this.answerHistory = [];
    }
    async answer(index, dapib_url) {
        (0, console_1.assert)(index >= 0 && index <= this.data.game_data.game_difficulty - 1, "Index must be between 0 and " + (this.data.game_data.game_difficulty - 1));
        this.answerHistory.push(util_1.default.solveBreaker(!!this.data.game_data.customGUI.is_using_api_breaker_v2, this.data.game_data.customGUI.api_breaker, 4, { index }));
        let encrypted = crypt_1.default.encrypt(JSON.stringify(this.answerHistory), this.data.session_token);
        const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        let prepareRequestId = {
            "sc": [
                getRandomNumber(200, 300),
                getRandomNumber(300, 400)
            ]
        }
        let requestedId = crypt_1.default.encrypt(JSON.stringify(prepareRequestId), `REQUESTED${this.data.session_token}ID`);
        let { cookie: tCookie, value: tValue } = util_1.default.getTimestamp();
        let bodyInJson = {
            session_token: this.data.session_token,
            game_token: this.data.challengeID,
            guess: encrypted,
            render_type: 'canvas',
            analytics_tier: this.data.tokenInfo.at,
            sid: this.data.tokenInfo.r,
            bio: this.data.tokenInfo.mbio && "eyJtYmlvIjoiMTA3MCwwLDQ5NiwyNzg7MTA4NiwwLDQ1MSwzMDk7MTEwMiwwLDQxOSwzMzA7MTEyMSwwLDQwNiwzMzk7MTEzNiwwLDM5NCwzNDg7MTE1MywwLDM4NywzNTM7MTE2OSwwLDM4MiwzNTY7MTMxOSwwLDM4MCwzNTE7MTMzNiwwLDM4MCwzNDI7MTM4NiwwLDM4MCwzMzQ7MTUwMiwwLDM3OCwzNDE7MTUxOSwwLDM3NSwzNTE7MTUzNiwwLDM3MywzNTk7MTU3MCwwLDM3MCwzNjU7MTY4NywwLDM3MywzNTc7MTcwMiwwLDM4MCwzNTA7MTcxOSwwLDM4NCwzNDY7MTkzNiwwLDM4NywzNTI7MTk5NiwxLDM4NywzNTY7MjA3NywyLDM4NywzNTY7Mjg4NSwwLDM5MywzNTE7MjkwMiwwLDQwNiwzMzk7MjkxOSwwLDQxNiwzMjg7MjkzNiwwLDQyMywzMTk7Mjk1MiwwLDQyNiwzMTI7Mjk2OSwwLDQzMiwzMDI7Mjk4NiwwLDQ0MSwyODU7MzAwMiwwLDQ0NiwyNzQ7MzAxOSwwLDQ0OSwyNjg7MzA1MiwwLDQ1MCwyNjE7MzEwMiwwLDQ1MSwyNTU7MzE1MiwwLDQ1MiwyNTA7MzI1MywwLDQ1MiwyNDQ7MzMxOSwwLDQ1MywyMzY7MzM2OSwwLDQ1NywyMzA7MzQwMiwwLDQ2MiwyMjc7MzQ1MiwwLDQ3NCwyMjU7MzQ2OSwwLDQ4OSwyMjQ7MzQ4NiwwLDUwOSwyMjQ7MzUwMiwwLDUyMywyMjQ7MzUxOSwwLDUzMywyMjQ7MzUzNiwwLDU0OSwyMjM7MzU1MiwwLDU1NywyMjI7NTU1NywwLDU1NSwyNjQ7NTU1OCwwLDMyNywyMTc7NTU5NywwLDMyNSwyMjI7NTY4MywwLDMyMSwyMjc7NTcwNywwLDMxNiwyMzA7NTg4NiwxLDMxMywyMzM7NTk5NywyLDMxMywyMzM7NjI0MywwLDMyMiwyMzA7NjI1MSwwLDMyOSwyMjk7NjI2MCwwLDMzNSwyMjk7NjI2NSwwLDM0MiwyMjk7NjI3NSwwLDM1OSwyMjg7NjI4MiwwLDM2NywyMjg7NjI5MCwwLDM3MywyMjg7NjI5NiwwLDM3OSwyMjg7NjMwNywwLDM4NywyMjg7NjMxMywwLDQwMSwyMjg7NjMxNywwLDQxMiwyMjg7NjMyMywwLDQxOCwyMjk7NjMyOCwwLDQyMywyMzA7NjMzNCwwLDQyOSwyMzA7NjM0MywwLDQzNCwyMzE7NjM1MSwwLDQzOSwyMzI7NjM2NSwwLDQ0NCwyMzM7NjQ2NCwwLDQ1MCwyMzM7NjQ3NiwwLDQ1OSwyMzM7NjQ5MSwwLDQ2NSwyMzM7NjUwOCwwLDQ3MSwyMzI7NjU5OSwxLDQ3MSwyMzI7NjcxMywyLDQ3MSwyMzE7NzA3MywwLDQ2OSwyMzc7NzA4MSwwLDQ2NywyNDI7NzA4NCwwLDQ2NCwyNDc7NzA5MywwLDQ2MSwyNTI7NzEwMCwwLDQ1OCwyNTc7NzExMiwwLDQ1NCwyNjI7NzEyMywwLDQ1MSwyNjc7NzE0MywwLDQ0OCwyNzI7NzMwOCwwLDQ0MywyNzc7NzMwOCwwLDQzOCwyODM7NzMxNCwwLDQzNCwyODc7NzMyNSwwLDQzMCwyOTE7NzMyNiwwLDQyNiwyOTU7NzMzNCwwLDQyMSwyOTk7NzM0MiwwLDQxNywzMDM7NzM2MywwLDQxMywzMDc7Nzc0MCwxLDQxMywzMDg7Nzg3MCwyLDQxMywzMDg7ODAxMCwwLDQxOCwzMDY7ODAxNSwwLDQyMywzMDQ7ODAyMCwwLDQyOSwzMDI7ODAyMywwLDQzNCwzMDE7ODAyNiwwLDQzOSwyOTk7ODAyOSwwLDQ0NSwyOTc7ODAzMiwwLDQ1MSwyOTU7ODAzNCwwLDQ1NiwyOTQ7ODAzNiwwLDQ2MSwyOTM7ODA0MSwwLDQ2NiwyOTE7ODA0NCwwLDQ3NywyODg7ODA0NiwwLDQ5NSwyODU7ODA0OSwwLDUwMiwyODM7ODA1MSwwLDUwNywyODI7ODA1MywwLDUxNSwyODE7ODA1NCwwLDUyMSwyNzk7ODA1NywwLDUyOCwyNzg7ODA1OSwwLDUzNiwyNzY7ODA2MCwwLDU0MSwyNzQ7ODA2MiwwLDU0OSwyNzI7ODA2NCwwLDU1NiwyNzE7IiwidGJpbyI6IiIsImtiaW8iOiIifQ==",
        }
        if (dapib_url) {
            let tguess = JSON.stringify(await this.tguess(this.answerHistory, dapib_url))
            if (tguess) {
                bodyInJson['tguess'] = crypt_1.default.encrypt(tguess, this.data.session_token)
            }
        }
        let req = await (0, http_1.default)(this.data.tokenInfo.surl, {
            method: "POST",
            path: "/fc/ca/",
            headers: {
                "User-Agent": this.userAgent,
                "Content-Type": "application/x-www-form-urlencoded",
                "X-Newrelic-Timestamp": tValue,
                "X-Requested-ID": requestedId,
                "Cookie": tCookie,
                "Referer": this.data.challengeURL,
                "Origin" : this.data.tokenInfo.surl,
                'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
            },
            body: util_1.default.constructFormData(bodyInJson),
        }, this.proxy);
        let reqData = JSON.parse(req.body.toString());
        this.key = reqData.decryption_key || "";
        this.wave++;
        return reqData;
    }
    get difficulty() {
        return this.data.game_data.game_difficulty;
    }
}
exports.Challenge4 = Challenge4;
