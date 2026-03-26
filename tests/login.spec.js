const{test,expect} = require('@playwright/test');

test("login test",async({page})=>{
  const email="madhusekhar@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill("Test@123");
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    const titles = await page.locator(".card-body b").allTextContents();
    //console.log(await page.locator(".card-body b").first().textContent());
    console.log(titles);
     const products = page.locator(".card-body");

     const count =await products.count();
     const productName="ZARA COAT 3";
     for(let i=0;i<count;i++){

        if(await products.nth(i).locator("b").textContent()=== productName){
           await  products.nth(i).locator("text= Add To Cart").click();
              break;
        }
     }
     await page.locator("[routerlink*='cart']").click();
     await page.locator("div  li").first().waitFor();
     const bool=await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
     expect(bool).toBeTruthy();

     await page.locator("text=Checkout").click();

     await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay:150});
     const dropdown =  page.locator(".ta-results");
        await dropdown.waitFor();
      const optionsCount = await page.locator("button").count();
      for(let i=0;i<optionsCount;i++){
          const text = await dropdown.locator("button").nth(i).textContent();
          if(text===" India"){
            await dropdown.locator("button").nth(i).click();
            break;
          }
      }
     
      
      await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);

      await page.locator(".action__submit").click();

       
       
    await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order.");
     
    const orderid =  await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderid);

   await  page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows=await page.locator("tbody tr");

   for(let i=0;i< await rows.count;i++){
   const orderrowId= await rows.nth(i).locator("th").textContent();
    if(orderid.includes(orderrowId)){
        await rows.nth(i).locator("button").first().click();
    }

}
//await page.locator("tr[class='ng-star-inserted'] th").waitFor()
  const orderIdDetails = await page.locator("tr[class='ng-star-inserted'] th").first().textContent();
   expect(orderid.includes(orderIdDetails)).toBeTruthy();
});
