import {test,expect} from '@playwright/test';


test('sample form',async({page})=>{
  await page.goto("https://rahulshettyacademy.com/angularpractice/");

  await page.locator("form input[name='name']").fill("ab");
  await page.locator("input[name='email']").fill("madhusekhar@gmail.com");
  await page.getByPlaceholder("Password").fill("test@123");
  await page.getByText("Check me out if you Love IceCreams!").click();

  await page.getByLabel("Gender").selectOption("Female");

  await page.getByLabel("Employed").click();
  //await page.waitForLoadState('networkidle')
 // await page.locator("input[name='bday']").click();

  await page.getByRole("button",{name:'Submit'}).click();
  await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
  await page.getByRole("link",{name:"Shop"}).click();
  await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole("button").click();


})