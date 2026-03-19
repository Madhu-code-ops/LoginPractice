const{test,expect} = require('@playwright/test');

test("child windows handle",async({browser})=>{

  const  context = await browser.newContext();
  const page  =    await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink=page.locator("a[href*='documents-request']");
  await expect(documentLink).toHaveAttribute("class","blinkingText");

  const [newPage]=await Promise.all(
    [
      context.waitForEvent('page'),
      documentLink.click()

    ])

      const text = await newPage.locator("p[class='im-para red']").textContent();

      console.log(text);
        const name =text.split("@");
        const newname=name[1];
       // console.log(newname);
        const domain=newname.split(" ");
         const newdomain=domain[0];
        // console.log(newdomain);
         
        await page.locator('#username').fill(newdomain);
        //await page.pause();

      console.log( await page.locator('#username').textContent());

      console.log(await page.locator('#username').inputValue());


});