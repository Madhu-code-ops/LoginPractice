import{test,expect} from '@playwright/test';
import path from 'node:path';

let webContext;
test.beforeAll(async({browser})=>{
   const context= await browser.newContext();
   const page =await context.newPage();

   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
   await page.locator("#userEmail").fill('madhusekhar@gmail.com');
   await page.locator("#userPassword").fill("test@123");
   await page.locator("#login").click();
   await page.waitForLoadState('networkidle');
   await context.storageState({path:'state.json'});

   // transfer storeage cookies into new browser
   webContext = await  browser.newContext({storageState:'state.json'});


});

test('client app login',async()=>{
    const produName="ZARA COAT 3";
  const page = await webContext.newPage();
   await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
 const products =  await page.locator(".card-body");
 const titles =await page.locator(".card-body b").allTextContents();

     const count =await products.count();

     for(let i=0;i<count;i++){
        if(await products.nth(i).locator("b").textContent()===produName)
        {
            await products.nth(i).locator("//button[text()=' Add To Cart']").click();
            break;

        }

     }

})