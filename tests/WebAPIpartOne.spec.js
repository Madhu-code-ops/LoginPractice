const{test,expect,request} = require('@playwright/test');

const loginPayload={userEmail:"madhusekhar@gmail.com",userPassword:"Test@123"};
const orderPayload={orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
let token;
let orderId;
test.beforeAll( async()=>{
   const apiContext= await request.newContext();
   const loginResponse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {data:loginPayload});

    expect(loginResponse.ok()).toBeTruthy();
     const loginResponseJson=  await loginResponse.json();

      token =loginResponseJson.token;
     console.log(token);

     //create-order
    const orderResponse= await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
         data:orderPayload,
         headers:{
            'authorization':token,
            'content-type' : 'application/json'

         },

      }
     );
    const orderResponeJson = await orderResponse.json();
    console.log(orderResponeJson);
   orderId=  orderResponeJson.orders[0];

});

test.beforeEach( ()=>{

});

test('client app login',async({page})=>{

   await page.addInitScript(value=>{
      window.localStorage.setItem('token',value);
   },token);
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await  page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows=await page.locator("tbody tr");
 for(let i=0;i< await rows.count;i++){
   const orderrowId= await rows.nth(i).locator("th").textContent();
    if(orderid.includes(orderrowId)){
        await rows.nth(i).locator("button").first().click();
    }

}
  


});