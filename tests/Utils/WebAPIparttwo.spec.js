const{test,expect,request} = require('@playwright/test');
import { APIUtils } from './APIUtils';


const loginPayload={userEmail:"madhusekhar@gmail.com",userPassword:"Test@123"};
const orderPayload={orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
let token;
let orderId;
let response;
test.beforeAll( async()=>{
   const apiContext= await request.newContext();
     const apiUtils =new APIUtils(apiContext,loginPayload);
     response=await apiUtils.createOrder(orderPayload);
  
     //create-order
    
});

test('client app login',async({page})=>{
       await page.addInitScript(value=>{
      window.localStorage.setItem('token',value);
   },response.token);
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await  page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows=await page.locator("tbody tr");

 for(let i=0;i< await rows.count;i++){
   const orderrowId= await rows.nth(i).locator("th").textContent();
    if(response.orderId.includes(orderrowId)){
        await rows.nth(i).locator("button").first().click();
    }

}
  
});