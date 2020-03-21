const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch({
        defaultViewport: null,
        headless: false, // launch headful mode
        args: [`--window-size=1280,1024`] // new option
        //slowMo: 250, // slow down puppeteer script so that it's easier to follow visually
    });


    const userName = process.env.GOOGLE_USER;
    const password = process.env.GOOGLE_PASS;

    const pages = await browser.pages();
    const page = pages[0];

    const authurl = "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fscript.deployments%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fscript.projects%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fscript.webapp.deploy%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.metadata.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.file%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fservice.management%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Flogging.read%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcloud-platform&response_type=code&client_id=1072944905499-vm2v2i5dvn0a0d2o4ca36i1vge8cvbn0.apps.googleusercontent.com&redirect_uri=urn%3Aietf%3Awg%3Aoauth%3A2.0%3Aoob";
    
    await page.goto(authurl);

    await page.waitFor("#identifierId",{visible:true});

    await page.type("#identifierId",userName);

    await page.click("#identifierNext");
    
    await page.waitFor("#password input", { visible: true });

    await page.type("#password input", password);

    await page.keyboard.press('Enter'); 

    await page.waitForNavigation();

    await page.waitFor("#submit_approve_access", { visible: true });

    await page.click("#submit_approve_access");

    await page.waitFor("#view_container textarea", { visible: true });

    const element = await page.$("#view_container textarea");
    const code = await page.evaluate(element => element.textContent, element);

    process.stdout.write(code);

    await browser.close();
})();