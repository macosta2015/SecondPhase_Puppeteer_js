const puppeteer = require('puppeteer');

(async () => {
    try {
        console.log('Launching browser...');
        const browser = await puppeteer.launch({
            headless: false, // Launch Chrome with visible browser window
            userDataDir: '/Users/marioacosta/Library/Application Support/Google/Chrome/Profile 1' // Path to your user data directory
        });

        console.log('Opening new page...');
        const newPage = await browser.newPage();

        // Navigate to the URL
        console.log('Navigating to the URL...');
        await newPage.goto('https://google.com', { waitUntil: 'networkidle0' });

        // Capture mouse movements and log coordinates
        await newPage.evaluate(() => {
            document.addEventListener('mousemove', (event) => {
                console.log('Mouse coordinates:', { x: event.clientX, y: event.clientY });
            });
        });

        console.log('Move the mouse over the page to see the coordinates...');

        // Keep the page open
        await new Promise(() => { });
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();

