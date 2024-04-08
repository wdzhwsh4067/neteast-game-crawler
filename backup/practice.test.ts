import { test, expect } from '@playwright/test';
import { triggerAsyncId } from 'async_hooks';
import { chromium } from 'playwright';
// 报错待修复，超时时间貌似是累积的，总超时超过15分钟，便会报错！！！！！！所以叫全局超时？？？Test timeout of 1500000ms exceeded.

// pnpm playwright test practice.test.ts --project=chromium --headed -g "add a todo item"
test.describe("itif.org crawler", () => {
test('itif.org', async ({ }) => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  // await page.goto('https://itif.org/search/?sstartDate=2000-01-01&sendDate=2023-01-01&ssearchMode=all');
  await page.goto('https://itif.org/search/?sstartDate=2000-01-01&sendDate=2022-09-01&ssearchMode=all');
  await page.waitForLoadState();
  // await page.waitForTimeout(8000); 
  console.log('before click');

  // 循环第一页单页的10条数据 
  for(var i = 1;i<=10;i++) {
    var urlArticle = 'xpath=/html[1]/body[1]/div[1]/div[1]/main[1]/div[1]/div[1]/div[3]/div['+i+']/a[1]/h2[1]';
    await page.locator(urlArticle).click();
    const [articlePage] = await Promise.all([
    await context.waitForEvent('page')]);// wait for the new page to load
    await articlePage.waitForLoadState();// Wait for the 'DOMContentLoaded' event.
    await articlePage.bringToFront(); // bring the original page to the front
    await articlePage.waitForTimeout(6000); // wait for the page to load
      // 这里需要增加一个判断，如果没有日期，说明非常规文章，跳过
    if (await articlePage.locator("(//div[@id='convertedPDF']//div)[2]").isVisible()==false){
      await articlePage.close();
      continue // 跳过本次循环
    }
    if (await articlePage.locator("(//div[contains(@class,'block mb-4')]//div)[3]").isVisible()==false){
      await articlePage.close();
      continue // 跳过本次循环
    }
    if (await articlePage.locator("//h1[contains(@class,'text-35 ')]").isVisible()==false){
      await articlePage.close();
      continue // 跳过本次循环
    }
    // 进入页面需要等待到弹窗出现，否则会在寻找其他元素时，突然找不到
    try{
      if(await articlePage.getByRole('button', { name: 'No Thanks' }).isVisible()==true){
        console.log("遇到了登录页面！！！！！！！！！！！！！！")
        await articlePage.getByRole('button', { name: 'No Thanks' }).click()
      }
    }catch(error){
      console.log("没有遇到了登录页面，幸运！")
    }

    try {
      // 在此处总是循环，上一步的操作失灵
      if(await articlePage.locator(".underline").isVisible()==true){
        var author=await articlePage.locator(".underline").textContent()
        console.log("one author")
      }
    } catch (error) {
      var author =await articlePage.locator("(//a[@class='underline'])[1]").textContent();
      console.log("The single underline element didn't appear.There are mutl authors")
    }
    const title=await articlePage.locator("//h1[contains(@class,'text-35 ')]").textContent();
    const date=await articlePage.locator("(//div[contains(@class,'block mb-4')]//div)[3]").textContent();
    const content=await articlePage.locator("(//div[@id='convertedPDF']//div)[2]").textContent();

    var  addSql = 'INSERT INTO itifOrg(titleEn,authorEn,datePublish,contentEn) VALUES(?,?,?,?)';
    var  addSqlParams = [title,author,date,content];
    //增
    const mysql = require('mysql');
    // Cannot find name 'require'. Do you need to install type definitions for node? Try `pnpm i --save-dev @types/node`.
    var connection = mysql.createConnection({     
      host     : 'localhost',       
      user     : 'root',              
      password : 'qwe123123',       
      port: '3306',                   
      database: 'CrwalerDatabase' 
    }); 
    connection.connect();
    connection.query(addSql,addSqlParams,function (err, result) {
      if(err){
       console.log('[INSERT ERROR] - ',err.message);
       return;
      }            
     console.log('INSERT ID:',result);        
    });
    console.log("=================start=================");
    console.log("title:",title);
    // console.log("content:",content);
    console.log("author:",author);
    console.log("date:",date);
    console.log("=================over=================");

    await articlePage.close();
    await page.bringToFront(); 
 }
  // 当存在翻页按钮时候
  while (await page.locator("//a[contains(text(),'Next')]").isVisible()==true){
    await page.locator("//a[contains(text(),'Next')]").click();
    for(var i = 1;i<=10;i++) {
      var urlArticle = 'xpath=/html[1]/body[1]/div[1]/div[1]/main[1]/div[1]/div[1]/div[3]/div['+i+']/a[1]/h2[1]';
      await page.locator(urlArticle).click();
      const [articlePage] = await Promise.all([
      await context.waitForEvent('page')]);// wait for the new page to load
      await articlePage.waitForLoadState();// Wait for the 'DOMContentLoaded' event.
      await articlePage.bringToFront(); // bring the original page to the front
      await articlePage.waitForTimeout(6000); // wait for the page to load
      // 这里需要增加一个判断，如果没有日期，说明非常规文章，跳过
      if (await articlePage.locator("(//div[@id='convertedPDF']//div)[2]").isVisible()==false){
        await articlePage.close();
        continue // 跳过本次循环
      }
      if (await articlePage.locator("(//div[contains(@class,'block mb-4')]//div)[3]").isVisible()==false){
        await articlePage.close();
        continue // 跳过本次循环
      }
      if (await articlePage.locator("//h1[contains(@class,'text-35 ')]").isVisible()==false){
        await articlePage.close();
        continue // 跳过本次循环
      }
      // 进入页面需要等待到弹窗出现，否则会在寻找其他元素时，突然找不到
      try{
        if(await articlePage.getByRole('button', { name: 'No Thanks' }).isVisible()==true){
          console.log("遇到了登录页面！！！！！！！！！！！！！！")
          await articlePage.getByRole('button', { name: 'No Thanks' }).click()
        }
      }catch(error){
        console.log("没有遇到了登录页面，幸运！")
      }

      try {
        // 在此处总是循环，上一步的操作失灵
        if(await articlePage.locator(".underline").isVisible()==true){
          var author=await articlePage.locator(".underline").textContent()
          console.log("one author")
        }
      } catch (error) {
        var author =await articlePage.locator("(//a[@class='underline'])[1]").textContent();
        console.log("The single underline element didn't appear.There are mutl authors")
      }
      const title=await articlePage.locator("//h1[contains(@class,'text-35 ')]").textContent();
      const date=await articlePage.locator("(//div[contains(@class,'block mb-4')]//div)[3]").textContent();
      const content=await articlePage.locator("(//div[@id='convertedPDF']//div)[2]").textContent();

      var  addSql = 'INSERT INTO itifOrg(titleEn,authorEn,datePublish,contentEn) VALUES(?,?,?,?)';
      var  addSqlParams = [title,author,date,content];
      //增
      connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        
 
       console.log('--------------------------INSERT----------------------------');
       //console.log('INSERT ID:',result.insertId);        
       console.log('INSERT ID:',result);        
       console.log('-----------------------------------------------------------------\n\n');  
      });
      console.log("=================start=================");
      console.log("title:",title);
      // console.log("content:",content);
      console.log("author:",author);
      console.log("date:",date);
      console.log("=================over=================");
      await articlePage.close();
      await page.bringToFront(); 
    }
  }

  await page.close();
  await browser.close();
})
})
// ==================mysql操作model==========================
// close the connection of mysql
// connection.end();