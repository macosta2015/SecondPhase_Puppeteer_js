const puppeteer = require('puppeteer');
require('dotenv').config(); // Load environment variables from .env file

(async () => {
    let browser;
    try {
        console.log('Launching browser...');
        browser = await puppeteer.launch({
            headless: false, // Launch Chrome with visible browser window
            userDataDir: '/Users/marioacosta/Library/Application Support/Google/Chrome/Profile 1' // Path to your user data directory
        });

        console.log('Opening new page...');
        const newPage = await browser.newPage();

        // Function to log mouse coordinates
        const logMouseCoordinates = async (event) => {
            console.log(`Mouse X: ${event.pageX}, Mouse Y: ${event.pageY}`);
        };

        // Expose logMouseCoordinates function to the page
        await newPage.exposeFunction('logMouseCoordinates', logMouseCoordinates);

        // Add event listener to the page to capture mousemove events
        await newPage.evaluateOnNewDocument(() => {
            document.addEventListener('mousemove', (event) => {
                window.logMouseCoordinates({
                    pageX: event.pageX,
                    pageY: event.pageY
                });
            });
        });

        // Navigate to the URL
        console.log('Navigating to the URL...');
        await newPage.goto('https://cad.onshape.com/documents?resourceType=resourcecompanyowner&nodeId=65efc5e06e5bec02f57742fe', { waitUntil: 'networkidle0', timeout: 0 });


        // Wait after navigation
        console.log('Waiting for 5 seconds after navigation...');
        await newPage.waitForTimeout(50000);
        // Fill out form fields
        console.log('Filling out form fields...');
        await newPage.type('input[name="email"].form-control', process.env.EMAIL);
        await newPage.type('input[name="password"].form-control', process.env.PASSWORD);

        // Click on the submit button
        console.log('Clicking on the submit button...');
        await newPage.click('button.btn.btn-primary.os-signin-button');

        // Wait for navigation
        console.log('Waiting for 10 seconds after navigation...');
        await newPage.waitForTimeout(10000);

        // Scroll to the element
        console.log('Scrolling to the element...');
        await newPage.evaluate(() => {
            const thirdButton = document.querySelectorAll('.documents-filter-icon')[2];
            if (thirdButton) {
                thirdButton.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            } else {
                console.error('Third button not found.');
            }
        });

        // Wait after scrolling
        console.log('Waiting for 2 seconds after scrolling...');
        await newPage.waitForTimeout(2000);

        // Click on the third element
        console.log('Clicking on the third element...');
        await newPage.evaluate(() => {
            const thirdButton = document.querySelectorAll('.documents-filter-icon')[2];
            if (thirdButton) {
                thirdButton.click();
            } else {
                console.error('Third button not found.');
            }
        });

        // Wait after selecting "Created By Me"
        console.log('Waiting for 2 seconds after selecting the "Created By Me"...');
        await newPage.waitForTimeout(2000);

        // Click on the "Scale Sketch Example - Copy" element
        console.log('Clicking on the "Scale Sketch Example - Copy" element...');
        await newPage.evaluate(() => {
            const documentNameElement = document.querySelector('span[aria-label="Document name: Scale Sketch Example - Copy"][ng-bind-html="document.resultHighlight"]');
            if (documentNameElement) {
                documentNameElement.click();
            } else {
                console.error('Element with text "Scale Sketch Example - Copy" not found.');
            }
        });

        // Wait after navigation
        console.log('Waiting for 10 seconds after navigation...');
        await newPage.waitForTimeout(5000);

        // Scroll to the element
        console.log('Scrolling to the element...');
        await newPage.evaluate(() => {
            const thirdButton = document.querySelectorAll('.os-list-item-name')[2];
            if (thirdButton) {
                thirdButton.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            } else {
                console.error('Third button not found.');
            }
        });

        // Wait after scrolling
        console.log('Waiting for 2 seconds after scrolling...');
        await newPage.waitForTimeout(2000);

        // Click on the fifth element
        console.log('Clicking on the fifth element...');
        await newPage.evaluate(() => {
            const fifthButton = document.querySelectorAll('.os-list-item-name')[5];
            if (fifthButton) {
                fifthButton.click();
            } else {
                console.error('Fifth button not found.');
            }
        });

        // Right click
        console.log('Right Click...');
        await newPage.click('div[data-id="Dg4JdGx6jlZTm4XD"]', { button: 'right' });

        // Wait after right click
        console.log('Waiting for 10 seconds after Right Click...');
        await newPage.waitForTimeout(10000);

        // Scroll to the bottom of the page
        console.log('Scrolling to the bottom of the page...');
        await newPage.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        // Wait for the "Edit" options to appear
        console.log('Waiting for the "Edit" options to appear...');
        await newPage.waitForSelector('.context-menu-item-span', { visible: true });

        // Wait after navigation
        console.log('Waiting for 5 seconds after navigation...');
        await newPage.waitForTimeout(5000);

        // Get all "Edit" options
        console.log('Getting all "Edit" options...');
        const editOptions = await newPage.evaluate(() => {
            const menuItems = document.querySelectorAll('.context-menu-item-span');
            return Array.from(menuItems).map(item => item.textContent.trim());
        });

        // Wait after navigation
        console.log('Waiting for 5 seconds after navigation...');
        await newPage.waitForTimeout(5000);

        // Log "Edit" options
        console.log('Edit options:', editOptions);

        // Click on the second "Edit" option
        console.log('Clicking on the second "Edit" option...');
        const desiredEditOption = 'Edit…'; // Text of the desired option
        const desiredEditOptionIndex = editOptions.indexOf(desiredEditOption);
        if (desiredEditOptionIndex !== -1) {
            const editOptionElement = await newPage.evaluateHandle((index) => {
                const menuItems = document.querySelectorAll('.context-menu-item-span');
                return menuItems[index];
            }, desiredEditOptionIndex);

            if (editOptionElement) {
                await editOptionElement.click();
            } else {
                console.error(`${desiredEditOption} option element not found.`);
            }
        } else {
            console.error(`${desiredEditOption} option not found.`);
        }

        // Wait after navigation
        console.log('Waiting for 5 seconds after navigation...');
        await newPage.waitForTimeout(5000);

        // Click on the "Search tools" button
        console.log('Clicking on the "Search tools" button...');
        await newPage.click('button.command-search-trigger');

        // Wait after navigation
        console.log('Waiting for 5 seconds after navigation...');
        await newPage.waitForTimeout(50000);

        // Typing "transform" into the search input field
        console.log('Typing "transform" into the search input field...');
        await newPage.type('.os-search-box-input', 'transform');

        // Wait after navigation
        console.log('Waiting for 5 seconds after navigation...');
        await newPage.waitForTimeout(50000);

        // Pressing "Enter" to perform the search
        console.log('Pressing "Enter" to perform the search...');
        await newPage.keyboard.press('Enter');

        // Wait after navigation
        console.log('Waiting for 5 seconds after navigation...');
        await newPage.waitForTimeout(5000);

        // Log mouse coordinates after clicking on the canvas
        console.log('Mouse coordinates after clicking on the canvas:');
        await newPage.evaluate(() => {
            document.querySelector('#canvas').addEventListener('click', (event) => {
                console.log(`Mouse X: ${event.pageX}, Mouse Y: ${event.pageY}`);
            });
        });

        // Take a screenshot
        console.log('Taking a screenshot...');
        await newPage.screenshot({ path: 'form_submission.png' });

        // Wait after navigation
        console.log('Waiting for 5 seconds after navigation...');
        await newPage.waitForTimeout(50000);

        console.log('Script completed successfully.');

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Close the browser
        console.log('Closing the browser...');
        await browser.close();
    }
})();

