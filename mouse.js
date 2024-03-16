const puppeteer = require('puppeteer');

(async () => {
    try {
        // Launch the browser with custom viewport size
        const browser = await puppeteer.launch({
            defaultViewport: { width: 800, height: 800 }, // Initial size of the browser window
            headless: false, // Launch Chrome with visible browser window
            userDataDir: '/Users/marioacosta/Library/Application Support/Google/Chrome/Profile 1' // Path to your user data directory
        });

        // Open a new page
        const page = await browser.newPage();

        // Navigate to Google
        await page.goto('https://google.com', { waitUntil: 'networkidle0' });

        // Click on specified coordinates
        await page.mouse.click(663, 352);

        console.log('Clicked on X: 663, Y: 352');

        // Keep the page open for further interaction or observation
        await new Promise(() => { });

    } catch (error) {
        console.error('An error occurred:', error);
    }
})();

