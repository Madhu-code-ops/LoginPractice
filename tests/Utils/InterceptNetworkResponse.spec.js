import{test,expect,request} from '@playwright/test';

import { APIUtils } from './APIUtils';


const loginPayload={userEmail:"madhusekhar@gmail.com",userPassword:"Test@123"};
const orderPayload={orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
const fakePayloadOrders={data:[],message:"No Orders"};
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
        await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/69b11803f86ba51a65f8dd45",
         async route=>
        { 
            const response=await page.request.fetch(route.request());
            let body=JSON.stringify(fakePayloadOrders);
            route.fulfill({
                response,
                body
            })

         }   
        )
    await  page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
});