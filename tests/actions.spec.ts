import {test, expect} from '@playwright/test';

test('actions demo - fill - press sequential', async ({page})=> {
    await page.goto('https://the-internet.herokuapp.com/login');
    await page.locator('#username').fill('tomsmith');
    await page.locator('#password')
    .pressSequentially('SuperSecretPassword!', {delay: 100});
    await page.locator('#password').press('Enter');
    // await page.click('#login > button');
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
    await page.close();
})

test('actions demo - click- left- right- double click', async ({page})=> {
    await page.goto('https://play1.automationcamp.ir/mouse_events.html');
    await page.locator('[id="click_area"]').click();
    await expect(page.locator('#click_type')).toHaveText('Click');

    await page.locator('[id="click_area"]').dblclick();
    await expect(page.locator('#click_type')).toHaveText('Double-Click');

    await page.locator('[id="click_area"]').click({button: 'right'});
    await expect(page.locator('#click_type')).toHaveText('Right-Click');

    await page.close();
})

test('actions demo - radio button', async ({page})=> {
    await page.goto('http://test.rubywatir.com/radios.php');
    await page.locator('[type="radio"]').nth(3).check();

    await page.waitForTimeout(2000);
    await page.close();
})

test('actions demo - check boxes', async ({page})=> {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    await expect(page.locator('(//form[@id="checkboxes"]//input)[1]')).not.toBeChecked();

    await page.locator('(//form[@id="checkboxes"]//input)[1]').check();
    await expect(page.locator('(//form[@id="checkboxes"]//input)[1]')).toBeChecked();
    await page.waitForTimeout(2000);
    await page.close();
})

test('actions demo - drop down', async ({page})=> {
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    // await page.locator('#dropdown').selectOption({label: 'Option 2'});
    // await page.selectOption('#dropdown', {label: 'Option 2'});
    // await page.locator('#dropdown').selectOption({value: '1'});
    await page.locator('#dropdown').selectOption({index: 1});


    await page.waitForTimeout(2000);
    await page.close();
})

test('actions demo - multi select options', async ({page})=> {
    await page.goto('https://www.lambdatest.com/selenium-playground/select-dropdown-demo');
    // await page.pause();
    await page.selectOption('#multi-select', [
        {label: 'California'}, 
        {index: 2},
        {value: 'Texas'}
        ]
    );
    await page.waitForTimeout(2000);
    await page.close();
})

test('actions demo - dynamic drop down', async ({page})=> {
    await page.goto('https://demo.automationtesting.in/Register.html');
    // await page.pause();
    await page.locator('[role="combobox"]').click();
    await page.locator('//ul[@id="select2-country-results"]/li[text() = "South Africa"]').click();

    await page.pause();
    await page.waitForTimeout(2000);
    await page.close();
})

test('actions demo - js alert', async ({page})=> {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    // await page.pause();

    // page.on('dialog', async alert => {
    //     const text = alert.message();
    //     expect(text).toBe('I am a JS Alert');
    //     await alert.accept();
    // });
    // await page.locator('[onclick="jsAlert()"]').click();
    // await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');

    // page.on('dialog', async alert => {
    //     const text = alert.message();
    //     expect(text).toBe('I am a JS Confirm');
    //     await alert.accept();
    // })
    
    // await page.locator('[onclick="jsConfirm()"]').click();

    // await expect(page.locator('#result')).toHaveText('You clicked: Ok');

    page.on('dialog', async alert => {
        expect(alert.message()).toBe('I am a JS prompt');
        await alert.accept('hello');
        await expect(page.locator('#result')).toHaveText('You entered: hello');

    });

    await page.locator('[onclick="jsPrompt()"]').click();

    await page.pause();
    await page.waitForTimeout(2000);
    await page.close();
})

test('actions demo - frames', async ({page})=> {
    await page.goto('https://the-internet.herokuapp.com/nested_frames');
    let bottomFrame =  page.frameLocator('[src="/frame_bottom"]') // locator for iframe
                        .locator('//body[contains(text(), "BOTTOM")]');
    await expect(bottomFrame).toHaveText('BOTTOM');

    let topFrame = page.frame('frame-top'); // get iframe by id or name
    let topFrameChilds = topFrame.childFrames();
    let leftFrame = topFrameChilds[0];
    let middleFrame = topFrameChilds[1];
    let rightFrame = topFrameChilds[2];

    await expect(middleFrame.locator('//div[@id="content"]')).toHaveText('MIDDLE');
    await expect(leftFrame.locator('//body[contains(text(), "LEFT")]')).toHaveText('LEFT');
    await expect(rightFrame.locator('//body[contains(text(), "RIGHT")]')).toHaveText('RIGHT');

    await page.pause();
    await page.waitForTimeout(2000);
    await page.close();
})


test('actions demo - new window', async ({page})=> {
    await page.goto('https://the-internet.herokuapp.com/windows');

    const [browserTabs] = await Promise.all([
        page.waitForEvent('popup'),
        await page.locator('a[href="/windows/new"]').click()
    ]);

    await browserTabs.waitForLoadState();
    const pages = browserTabs.context().pages();
    const defaultPage = pages[0];
    await expect(defaultPage.locator('#content h3')).toHaveText('Opening a new window');
    const newPage = pages[pages.length - 1];
    await expect(newPage.locator('h3')).toHaveText('New Window');


    await browserTabs.close();

    await page.pause();
    await page.waitForTimeout(2000);
    await page.close();
})


test('actions demo - new separate window', async ({page})=> {
    await page.goto('https://demo.automationtesting.in/Windows.html');
    await page.locator('a[href="#Seperate"]').click();
    const [newWindow] = await Promise.all([
        page.context().waitForEvent('page'),
        await page.locator('button[onclick="newwindow()"]').click()
    ]);

    await newWindow.locator('[href="/downloads"]').click();
    await expect(newWindow.locator('[class="d-1"]')).toHaveText('Downloads');

    await page.locator('[href="Index.html"]').click();
    await expect(page.locator('#btn1')).toHaveText('Sign In');
    
})

test('actions demo - drag and drop', async ({page})=> {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');

    await page.locator('#column-a').hover();
    await page.mouse.down();
    await page.locator('#column-b').hover();
    await page.mouse.up();

    await expect(page.locator('#column-b')).toHaveText('A');
    await expect(page.locator('#column-a')).toHaveText('B');

    // await page.pause();
    await page.waitForTimeout(2000);
    await page.close();
})


test('actions demo - drag and drop 2', async ({page})=> {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');

    const boxA = page.locator('#column-a');
    const boxB = page.locator('#column-b');

    await boxA.hover();
    await page.mouse.down();
    await boxB.hover();
    await page.mouse.up();

    await expect(boxB).toHaveText('A');
    await expect(boxA).toHaveText('B');

    await page.waitForTimeout(2000);
    // method 2
    await boxA.dragTo(boxB);

    await expect(boxB).toHaveText('B');
    await expect(boxA).toHaveText('A');
    await page.close();
})

test('actions demo - download', async ({page})=> {
    await page.goto('https://the-internet.herokuapp.com/download');

    const download = await Promise.all([
        page.waitForEvent('download'),
        page.locator('[href="download/image2.jpeg"]').click()
    ])
    const downloadedFile = download[0];
    const filePath = await downloadedFile.path();
    const fileName = downloadedFile.suggestedFilename();
    // await downloadedFile.saveAs('./downloads/image2.jpeg');
    await downloadedFile.saveAs(fileName);

    console.log('file path', filePath);
    console.log('file name', fileName);

    console.log(filePath);
    await page.close();
})

test('actions demo - file upload', async ({page})=> {
    await page.goto('https://the-internet.herokuapp.com/upload');

    const upload = await Promise.all([
        page.waitForEvent('filechooser'),
        page.locator('#file-upload').click()
    ])
    await upload[0].setFiles(['./notes.html']);
    await page.waitForTimeout(2000);
    await page.locator('#file-submit').click();
    await expect(page.locator('h3')).toHaveText('File Uploaded!');
    await page.close();
})