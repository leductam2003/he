const fun = require("../lib");

async function test(publicKey) {
    let token = await fun.getToken({
        pkey: publicKey,

        site: "https://twitter.com"
    });
    if (!token) {
        throw new Error("Invalid token");
    }

    if (token.token.includes("sup=1")) {
        console.log("Supressed captcha!");
        return;
    }

    let session = new fun.Session(token);
    let captcha = await session.getChallenge();

    console.table({
        game_type: captcha.gameType,
        game_variant: captcha.variant,
        difficulty: captcha.difficulty
    })
}

setImmediate(async () => {
    await test("2CB16598-CB82-4CF7-B332-5990DB66F3AB");
});
