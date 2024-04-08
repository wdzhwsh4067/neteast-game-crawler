import { test, expect } from '@playwright/test';
import { triggerAsyncId } from 'async_hooks';
import { Console } from 'console';
import { TIMEOUT } from 'dns';
import { chromium } from 'playwright';
const username = 'LeeG@tqthf.onmicrosoft.com';
const username1 = 'AlexW@tqthf.onmicrosoft.com';
const username2 = 'AlexW@tqthf.onmicrosoft.com';
const username3 = 'AlexW@tqthf.onmicrosoft.com';
const password = 'Qwe134134@';
const model = '应用注册';
const appname = 'playtest';
const redirect_url1 = 'http://localhost:53682/'
const redirect_url2 = 'https://alist.nn.ci/tool/onedrive/callback'
const client_id = '';
const cliend_key = '';
const api_type = [
  'Files.Read',
  'Files.ReadWrite',
  'Files.Read.All',
  'Files.ReadWrite.All'
];
// pnpm playwright test practice.test.ts --project=chromium --headed -g "add a todo item"
test.describe("chosun.com crawler", () => {
test.use({ viewport: { width: 1400, height: 800 } });
test('portal.azure.com', async ({}) => {
  const browser = await chromium.launch({headless:false});
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://portal.azure.com/#home'); // 等待时间为60秒
  await page.waitForLoadState();

  await page.locator("[name='loginfmt']").type(username);
  await page.waitForLoadState();
  await page.locator("//input[@data-report-event='Signin_Submit']").click();
  await page.locator("[name='passwd']").type(password);
  await page.waitForLoadState();
  await page.locator("//input[@data-report-value='Submit']").click();
//div[@class='placeholderContainer']//input[1]
//   await page.locator(urlArticle).click({ modifiers: ['Meta']});
  await page.waitForLoadState();
  if (await page.locator("//input[@name='DontShowAgain']/following-sibling::span[1]").isVisible()==true){
        await page.waitForLoadState(); 
        await page.locator("id=idBtn_Back").click();
  }
  // 第一次登录会有一个按钮，需要点击“我同意”按钮
  await page.waitForLoadState();

// 检测弹窗代码块
  try {
    await page.waitForSelector("//div[@role='alertdialog']", { timeout: 5000 });
    const dialog = await page.$('div[role="alertdialog"]');
    const cancelButtonCn = await dialog.waitForSelector("//div[@title='以后再说']", { timeout: 5000 });
    const cancelButtonEn = await dialog.waitForSelector("//span[text()='Maybe later']", { timeout: 5000 });
    if (cancelButtonCn) {
      await cancelButtonCn.click();
    }
    if (cancelButtonEn) {
      await cancelButtonEn.click();
    }
  } catch (error) {
    // console.log('弹窗没有出现，继续执行');
  }


  await page.goto('https://portal.azure.com/#settings/directory');
  await page.waitForNavigation();

// 检测弹窗代码块
  try {
    await page.waitForSelector("//div[@role='alertdialog']", { timeout: 3000 });
    const dialog = await page.$('div[role="alertdialog"]');
    const cancelButtonCn = await dialog.waitForSelector("//div[@title='以后再说']", { timeout: 3000 });
    if (cancelButtonCn) {
      await cancelButtonCn.click();
    }
  } catch (error) {
    // console.log('弹窗没有出现，继续执行');
  }
  try {
    await page.waitForSelector("//div[@role='alertdialog']", { timeout: 3000 });
    const dialog = await page.$('div[role="alertdialog"]');
    const cancelButtonEn = await dialog.waitForSelector("//span[text()='Maybe later']", { timeout: 3000 });
    if (cancelButtonEn) {
      await cancelButtonEn.click();
    }
  } catch (error) {
    // console.log('弹窗没有出现，继续执行');
  }



  try {
    // 等待页面中的特定元素出现
    await page.waitForLoadState();

    // 检测是否是英文页面
    await page.waitForSelector("//span[text()='Portal settings']", { timeout: 2000 });
    // 如果是，执行以下操作
    await page.locator("//div[text()='Language + region']").click();
    await page.locator("//div[text()='English‎']").click();
    await page.locator("//span[text()='中文(简体)‎']").click();
    await page.locator("//span[text()='Apply']").click();
    await page.waitForLoadState();
    await page.locator("//span[text()='OK']").click();
    await page.waitForLoadState();
  } catch (error) {
  }
  
// 跳转地址操作块
  await page.goto('https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade');
  await page.waitForNavigation();
  try {
    await page.waitForURL('https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade/**', { timeout: 2000 });
    console.log('已经跳转到目标网址');
  } catch (error) {
    await page.goto('https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade');
   await page.waitForLoadState();
  }

// 注册程序页面
  await page.locator("(//div[@class='azc-toolbarButton-label fxs-commandBar-item-text'])[1]").click();
 await page.waitForLoadState();
  await page.locator("(//input[@data-validatable-control-valid='false'])[1]").type(appname);
//   选择   账户类型
  await page.locator("(//span[@class='azc-radio-circle']/following-sibling::span)[3]").click();

// 点击下拉框
  await page.locator("//div[text()='选择平台']").click(); 
  // await page.locator("(//span[@aria-label='切换'])[2]").click();
  // await page.locator("//span[contains(@class,'fxc-group-dropdown-arrow fxc-dropdown-open')]").click();
  await page.waitForLoadState();
// 选择weburl
  await page.locator("(//div[@role='treeitem'])[2]").click();
  await page.locator("//input[@aria-label='重定向 URI (可选)']").type(redirect_url1);
// 英文就要改了。  
  await page.locator("//div[@title='注册']").click();
  await page.waitForLoadState();
//   开始获取id和key
  const client_id = await page.locator("(//div[@class='fxc-essentials-value fxs-portal-text'])[1]").textContent();

  await page.locator("//div[@data-telemetryname='Menu-CallAnAPI']").click();
  await page.waitForLoadState();

  await page.locator("//span[text()='Microsoft Graph (1)']").click();
  await page.waitForLoadState();
  await page.locator("//a[@data-bind='fxclick: onExpandClick, text: expandButtonText']").click();
  await page.waitForLoadState();
  
  await page.locator("//span[text()='User.Read']").click();
  // const api_type=[
  //   'email',
  //   'User.Read',
  // ]
  // await page.locator("//label[text()='User.Read']/parent::div/parent::div/parent::div/parent::div/parent::div/preceding-sibling::div[1]").click();
  // await page.locator("//label[text()='email']/parent::div/parent::div/parent::div/parent::div/parent::div/preceding-sibling::div[1]").click();

  
  for (const type of api_type) {
    const xpath = `//label[text()='${type}']/parent::div/parent::div/parent::div/parent::div/parent::div/preceding-sibling::div[1]`;
    await page.locator(xpath).click();
  }
  await page.waitForLoadState();
  
  await page.locator("//div[@data-formelement='pcControl: savePermissionsButton']//div[1]").click();

  // 等待侧边栏消失
  await page.waitForSelector("//button[@class='fxs-toast-close fxs-portal-svg']", { state: 'visible' });
  await page.waitForSelector("//button[@class='fxs-toast-close fxs-portal-svg']", { state: 'hidden' });
// 生成第二个重定向url的点击步骤
  await page.locator("//div[@data-telemetryname='Menu-Authentication']").click({ clickCount: 3 });
  await page.locator("//a[contains(text(),'添加 URI')]").click();
  await page.locator("//input[@data-validatable-control-valid='false']").type(redirect_url2);
  await page.locator("//span[text()='保存']").click();
  await page.waitForLoadState();

  // playwright的下面这一行代码没有设置好，导致上下步骤无法衔接。
    // 等待保存按钮消失
  await page.waitForSelector("//button[@class='fxs-toast-close fxs-portal-svg']", { state: 'visible' });
  await page.waitForSelector("//button[@class='fxs-toast-close fxs-portal-svg']", { state: 'hidden' });

  // 等待凭据菜单可见并双击
  await page.locator("//div[@data-telemetryname='Menu-Credentials']").click();
  await page.waitForLoadState();
  await page.locator("//div[@title='新客户端密码']").click();
  await page.locator("(//div[@aria-label='截止期限'])[2]").click();
  await page.locator("//span[text()='730 天(24 个月)']").click();
  await page.locator("//span[text()='添加']").click();
  await page.waitForLoadState();
  //   开始获取id和key
  // playwright代码中，点击这个按钮后，我的粘贴板会有一个值，把这个值传给num变量
  
  await page.locator("(//div[@type='button'])[1]").click();

  const cliend_key = await page.evaluate(() => navigator.clipboard.readText());
  console.log('client_id:',client_id);
  console.log('cliend_key:',cliend_key);





  await page.waitForTimeout(600000); // wait for the page to load
})
})
