import{test,expect} from  '@playwright/test';
import * as XLSX from 'xlsx';

test('Reade XLsheet Data',async({page})=>{

    const workBook=XLSX.readFile(userDataPath);
      const worksheet= workBook.Sheets["sheet1"];
     const xlsxtojson= XLSX.utils.sheet_to_json(worksheet);
     console.log(xlsxtojson);

     await page.goto('https://demoblaze.com/');
  await page.locator('#login2').click();
  await page.locator('#loginusername').fill(xlsxtojson[0].username);
  await page.locator('#loginpassword').fill(xlsxtojson[0].password);
  await page.locator('button:has-text("Log in")').click();


})