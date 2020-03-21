const puppeteer = require('puppeteer');

const headless = true;
const enableLogging = false;

(async () => {


    log("Creating puppeteer browser");
    const browser = await puppeteer.launch({
        defaultViewport: null,
        headless: headless, // launch headful mode
        args: [`--window-size=1280,1024`] // new option
        //slowMo: 250, // slow down puppeteer script so that it's easier to follow visually
    });


    try {
        //To set window enviorment variables in powershell
        //PowerSheell
        //$env: GOOGLE_USER = 'alic@acme.com'
        //$env: GOOGLE_PASS = '123456'

        

        const userName = process.env.GOOGLE_USER;
        const password = process.env.GOOGLE_PASS;

        const page = await browser.newPage();

        const authurl = "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fscript.deployments%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fscript.projects%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fscript.webapp.deploy%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.metadata.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.file%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fservice.management%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Flogging.read%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcloud-platform&response_type=code&client_id=1072944905499-vm2v2i5dvn0a0d2o4ca36i1vge8cvbn0.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob";

        log("opening url, and waiting until networkidle0");
        await page.goto(authurl, { waitUntil: "networkidle0" });

        var emailSelector = "#identifierId"
        if (headless) var emailSelector = "#Email"

        log("waiting for login screen (#identifierId)");
        await page.waitFor(emailSelector, { visible: true });

        log("entering username");
        await page.type(emailSelector, userName);

        log("pressing enter");
        await page.keyboard.press('Enter');

        var pwSelector = "#password input"
        if (headless) var pwSelector = "#Passwd"

        log("waiting for password input");
        await page.waitFor(pwSelector, { visible: true });

        log("entering password");
        await page.type(pwSelector, password);

        log("pressing enter");
        await page.keyboard.press('Enter');


        

        var approveButtonSelector = "#submit_approve_access:not([disabled])";

        log("waiting for appove button");
        await page.hover("#submit_approve_access");
        await page.waitFor(approveButtonSelector, { visible: true });

        

        log("clicking approve button");
        await page.click(approveButtonSelector, { waitUntil: "networkidle0 " });

        log("waiting for grant code");
        await page.waitFor("#view_container textarea", { visible: true });
        const element = await page.$("#view_container textarea");
        const code = await page.evaluate(element => element.textContent, element);

        log("code:" + code);
        process.stdout.write(code);
    }
    catch(err)
    {
        console.log(err);
        throw err;
    }
    finally {

        await browser.close();

    }

})();

function log(message) {
    if (enableLogging) console.log(message);
}
