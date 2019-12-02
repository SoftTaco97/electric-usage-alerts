require('dotenv').config();
const puppeteer = require('puppeteer');
const { getCurrentUsage } = require('./src/usage');
const { login } = require('./src/puppet');
const { sendMail } = require('./src/email');

/**
 * Main function
 * 
 * @async
 * @return { void }
 */
const main = async () => {
    // Variables
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Login into the dashboard
    await login(page);

    // Get and send information
    const information = await getCurrentUsage(page);
    await sendMail(information);

    // Close browsers
    browser.close();
    return;
}

if(require.main === module) {
    main().catch((err) => {
        // TODO: More error handling
        console.error(err);
        process.exit(1);
    });
}