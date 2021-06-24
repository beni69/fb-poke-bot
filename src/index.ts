import dotenv from "dotenv";
import { join } from "path";
import puppeteer from "puppeteer";
dotenv.config();

const BASE = "https://www.facebook.com";
const { FB_USER, FB_PASSWD } = process.env;

const scriptPath = join(__dirname, "poke.js");
console.log("using poke script at", scriptPath);

//* main
(async () => {
    if (!FB_USER || !FB_PASSWD) {
        throw new Error("no facebook login found, put them in a .env file");
        process.exit(1);
    }

    //* create browser
    const browser = await puppeteer.launch({ headless: true });
    const context = browser.defaultBrowserContext();
    context.overridePermissions(BASE, []);
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(100000);
    await page.setViewport({ width: 1600, height: 1200 });

    //* log in
    await page.goto(`${BASE}/login`, { waitUntil: "networkidle2" });
    // accept cookie prompt
    const cAcceptBtn = await page.$(
        '[data-testid="cookie-policy-dialog-accept-button"]'
    );
    if (cAcceptBtn) await cAcceptBtn.click();
    // type in details
    await page.type("#email", FB_USER, { delay: 30 });
    await page.type("#pass", FB_PASSWD, { delay: 30 });
    await page.click("#loginbutton");
    // wait for homepage to load
    await page.waitForNavigation({ waitUntil: "load" });

    try {
        await page.waitForSelector('a[href="/me/"]', {
            timeout: 10000,
        });
        console.log("login successful!");
    } catch (err) {
        console.error("failed to login");

        throw err;
        process.exit(1);
    }

    //* pokes
    await page.goto(`${BASE}/pokes`, { waitUntil: "networkidle2" });
    await page.setJavaScriptEnabled(true);
    await page.addScriptTag({ path: scriptPath });
    console.log("script injected!");
})();

// based on this article
// https://levelup.gitconnected.com/automated-facebook-login-with-puppeteer-2a3b63437c3c
