/**
 * Function for logging into the portlandgeneralelectric dashboard
 * 
 * @async
 * @param { Object } page 
 * @return { void }
 */
const login = async (page) => {
    // Go to the login page
    await page.goto('https://cs.portlandgeneral.com/UserAccount');

    // Timeout so the page can load
    await page.waitFor(1000);

    // Login
    await page.type('#userNameInput', process.env.USERNAME);
    await page.type('#passwordInput', process.env.PASSWORD);
    await page.click('#submitButton', { delay: 1 });

    // Wait for the authentication
    await page.waitFor(3000);
    return;
}

module.exports = {
    login
}