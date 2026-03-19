import{test,expect} from '@playwright/test';
import { request } from 'node:http';
const payload={
  id:24,
  title: "Samsung Mobile",
  price: 49999,
  description: "Its Samsung Galaxy phone",
  category: "electronics",
  image:"https://m.media-amazon.com/images/I/71d7rfSl0wL._SX679_.jpg"
}
//let productId =1;
test("Get all products ",async({request})=>{
        const response= await request.get("https://fakestoreapi.com/products");
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        console.log(responseBody);

});

test("Add product",async({request})=>
{
  const response =await request.post("https://fakestoreapi.com/products",
{
    data:payload,
    headers:{
        'content-type':'application/json'
    }
});
expect(response.status()).toBe(201);

  const responseJson = await response.json();
  console.log(responseJson);

  const productId = responseJson.id;
  console.log("Product ID:", productId);


});

test('Get productById',async({request})=>{
     const productId = 2;
     const response= await request.get('https://fakestoreapi.com/products/'+productId);
     expect(response.status()).toBe(200);
     
      const responeJson = await response.json();
      console.log(responeJson);

});


test("Get Product Categories",async({request})=>{
    const response = await request.get("https://fakestoreapi.com/products/categories");
    
    expect(response.status()).toBe(200);
   const prodcategories = await response.json();
   console.log(prodcategories);

});

test("Get Products by category",async({request})=>{
    const category="jewelery";
   const response = await request.get("https://fakestoreapi.com/products/category/"+category);
   expect(response.status()).toBe(200);
  const prodCategory= await response.json();
  console.log(prodCategory);

})

test("InvalidId scenario",async({request})=>{
    const productId=1234;
  const response = await request.get("https://fakestoreapi.com/products/"+productId);
  expect(response.status()).toBe(200);

  const text= await response.text();
  if(text.trim()===""){
    console.log(" This is Invalid ID ")
    expect(text).toBe("");
  }else{
        const body=JSON.parse(text);
        expect(body.id).not.toBe(productId);
  }

  
});