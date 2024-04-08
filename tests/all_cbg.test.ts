import { test, expect } from '@playwright/test';
import { triggerAsyncId } from 'async_hooks';
import { chromium } from 'playwright';
import { writeFileSync } from 'fs';
import { constants } from 'buffer';


test.describe("cbg", () => {
test.use({ viewport: { width: 320, height: 400 } });
test('cbg', async ({}) => {

  const fs = require('fs');
  const path = require('path');
// 这是加的
  const browser = await chromium.launch({ headless:false});
  const contextState = JSON.parse(fs.readFileSync(path.join(__dirname, 'context.json')));
  const context = await browser.newContext({ storageState: contextState });
// 对的
  // const browser = await chromium.launch({ headless:false});
  // const context = await browser.newContext();
  const page = await context.newPage();
      // Define an array of URLs
  const sites = [
    '',
    // '-vivo',
    // '-oppo',
    // '-huawei',
    // '-xiaomi',
  ]
 for (const site of sites) {
  // https://my.cbg.163.com/cgi/mweb/pl?search_type=role&equip_level_min=69&equip_level_max=69&price_max=400000&total_score=18500&order_by=selling_time%20DESC&price_min=100000&equip_special_skill_logic=and&equip_special_effect_logic=and&own_fabaos_logic=or&shen_shou_logic=and&ling_shou_logic=and&zhen_shou_logic=and&mount_list_logic=and&fashion_list_logic=and&jm_active_num=12&fruit_num=5&attrs_search.qiling_suit_name=fengqileiyong&attrs_search.qiling_suit_level=1&pass_fair_show=0
  // 69筛选公示期
  // const base_url='https://my'+site+'.cbg.163.com/cgi/mweb/pl?search_type=role&equip_level_min=69&equip_level_max=69&equip_special_skill_logic=and&equip_special_effect_logic=and&own_fabaos_logic=or&shen_shou_logic=and&ling_shou_logic=and&zhen_shou_logic=and&mount_list_logic=and&fashion_list_logic=and&school=13,9,6,1&order_by=selling_time%20DESC&price_max=600000&role_score=18000&pass_fair_show=0'
  
  // 115筛选全部
  const base_url='https://my'+site+'.cbg.163.com/cgi/mweb/pl?search_type=role&equip_level_min=90&equip_level_max=119&equip_special_skill_logic=and&equip_special_effect_logic=and&own_fabaos_logic=or&shen_shou_logic=and&ling_shou_logic=and&zhen_shou_logic=and&mount_list_logic=and&fashion_list_logic=and&school=9&order_by=price%20DESC&price_min=2200000'
  // 115筛选值得还价的账号
  // const base_url='https://my'+site+'.cbg.163.com/cgi/mweb/pl?search_type=role&equip_level_min=90&equip_level_max=119&total_score=54000&equip_special_skill_logic=and&equip_special_effect_logic=and&own_fabaos_logic=or&shen_shou_logic=and&ling_shou_logic=and&zhen_shou_logic=and&mount_list_logic=and&fashion_list_logic=and&order_by=price%20DESC&school=13,12,9,7,6,3,1,14&price_min=450000&price_max=900000'

  const filename='1127-筛选月宫115账号.csv'
    await page.goto(base_url);
    await page.waitForLoadState();
    // await page.waitForTimeout(180730); 
      // 保存浏览器上下文
    const contextState = await context.storageState();
    fs.writeFileSync(path.join(__dirname, 'context.json'), JSON.stringify(contextState));

    // Scroll until the end of the page
    let previousHeight, currentHeight = 0;
    while (previousHeight !== currentHeight) {
      previousHeight = await page.evaluate('document.body.scrollHeight');
      await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
      await page.waitForTimeout(1000); // wait for the new items to load
      currentHeight = await page.evaluate('document.body.scrollHeight');
    }
    let data = [[ '链接','等级','亮点','出售剩余时间', '公示期截止时间', '门派', '综合实力', '人物评分', '召唤灵评分', '装备评分', '历史门派', '历史角色', '昵称', '造型', '仙玉数', '总金币数', '月饼粽子食用量', '气血上限', '物理伤害', '法术伤害', '速度', '物理防御', '法术防御', '治疗强度', '魔法上限', '物理暴击', '法术暴击', '物理抗暴', '法术抗暴', '封印命中', '抵抗封印', '物理暴击伤害', '法术暴击伤害', '物理抵抗', '法术抵抗', '气血恢复效果', '当前加点方案', '永久助战', '成就点数', '称谓']];
  
    for(var i = 1; i <= 999; i++) {
      const link = "(//span[@class='name'])["+i+"]";
      if (await page.locator(link).isVisible()) {
        await page.waitForTimeout(25730); 
        await page.locator(link).click();
        await page.waitForLoadState();
        await page.locator("//a[contains(text(),'人物属性')]").click();
        try {
          var 出售剩余时间 = '';
          var 公示期截止时间 = '';
          if(await page.locator("//span[text()='上架中']").isVisible()==true){
            var 出售剩余时间 = await page.locator("(//div[contains(@class,'width-100 clearfix')]//span)[1]").textContent();
          }else{
            var 公示期截止时间 = await page.locator("//a[contains(@class,'btn btn-large')]//span[1]").textContent();
          }
          const 链接 =await page.url();

          var 亮点 = (await page.locator("//div[@data-row='highlights']//ul[1]").textContent()).replace(/\n/g, ' ');
          const 等级 = await page.locator("//span[text()='等级：']/following-sibling::span").textContent();
          const 门派 = await page.locator("//span[text()='门派：']/following-sibling::span").textContent();
          const 综合实力 = await page.locator("//span[text()='综合实力：']/following-sibling::span").textContent();
          const 人物评分 = await page.locator("//span[text()='人物评分：']/following-sibling::span").textContent();
          const 召唤灵评分 = await page.locator("//span[text()='召唤灵评分：']/following-sibling::span").textContent();
          const 装备评分 = await page.locator("//span[text()='装备评分：']/following-sibling::span").textContent();
          const 历史门派 = await page.locator("//span[text()='历史门派：']/following-sibling::span").textContent();
          const 历史角色 = await page.locator("//span[text()='历史角色：']/following-sibling::span").textContent();
          const 昵称 = await page.locator("//span[text()='昵称：']/following-sibling::span").textContent();
          const 造型 = await page.locator("//span[text()='造型：']/following-sibling::span").textContent();
          const 仙玉数 = await page.locator("//span[text()='仙玉数：']/following-sibling::span").textContent();
          var 总金币数 = await page.locator("(//li[@class='item-gold']//span)[2]").textContent();
          const 月饼粽子食用量 = await page.locator("//span[text()='月饼粽子食用量：']/following-sibling::span").textContent();
          const 气血上限 = await page.locator("//span[text()='气血上限：']/following-sibling::span").textContent();
          const 物理伤害 = await page.locator("//span[text()='物理伤害：']/following-sibling::span").textContent();
          const 法术伤害 = await page.locator("//span[text()='法术伤害：']/following-sibling::span").textContent();
          const 速度 = await page.locator("//span[text()='速度：']/following-sibling::span").textContent();
          const 物理防御 = await page.locator("//span[text()='物理防御：']/following-sibling::span").textContent();
          const 法术防御 = await page.locator("//span[text()='法术防御：']/following-sibling::span").textContent();
          const 治疗强度 = await page.locator("//span[text()='治疗强度：']/following-sibling::span").textContent();
          const 魔法上限 = await page.locator("//span[text()='魔法上限：']/following-sibling::span").textContent();
          const 物理暴击 = await page.locator("//span[text()='物理暴击：']/following-sibling::span").textContent();
          const 法术暴击 = await page.locator("//span[text()='法术暴击：']/following-sibling::span").textContent();
          const 物理抗暴 = await page.locator("//span[text()='物理抗暴：']/following-sibling::span").textContent();
          const 法术抗暴 = await page.locator("//span[text()='法术抗暴：']/following-sibling::span").textContent();
          const 封印命中 = await page.locator("//span[text()='封印命中：']/following-sibling::span").textContent();
          const 抵抗封印 = await page.locator("//span[text()='抵抗封印：']/following-sibling::span").textContent();
          const 物理暴击伤害 = await page.locator("//span[text()='物理暴击伤害：']/following-sibling::span").textContent();
          const 法术暴击伤害 = await page.locator("//span[text()='法术暴击伤害：']/following-sibling::span").textContent();
          const 物理抵抗 = await page.locator("//span[text()='物理抵抗：']/following-sibling::span").textContent();
          const 法术抵抗 = await page.locator("//span[text()='法术抵抗：']/following-sibling::span").textContent();
          const 气血恢复效果 = await page.locator("//span[text()='气血恢复效果：']/following-sibling::span").textContent();
          const 当前加点方案 = await page.locator("//p[text()='当前加点方案']/following-sibling::ul").textContent();
          const 永久助战 = await page.locator("//p[text()='永久助战']/following-sibling::ul").textContent();
          const 成就点数 = await page.locator("//span[text()='成就点数：']/following-sibling::span").textContent();
          const 称谓 = await page.locator("//span[text()='称谓：']/following-sibling::span").textContent();
          const 采集时间 = await page.locator("//span[text()='称谓：']/following-sibling::span").textContent();
          
          console.log('===================')
          console.log(综合实力)
          console.log(链接)


          data.push([ `"${链接}"`,等级,亮点,出售剩余时间, 公示期截止时间,门派, 综合实力, 人物评分, 召唤灵评分, 装备评分, 历史门派, 历史角色, 昵称, 造型, `"${仙玉数}"`, `"${总金币数}"`, 月饼粽子食用量, 气血上限, 物理伤害, 法术伤害, 速度, 物理防御, 法术防御, 治疗强度, 魔法上限, 物理暴击, 法术暴击, 物理抗暴, 法术抗暴, 封印命中, 抵抗封印, 物理暴击伤害, 法术暴击伤害, 物理抵抗, 法术抵抗, 气血恢复效果, 当前加点方案, 永久助战, 成就点数, 称谓]);
    
          const csv = data.map(row => row.join(',')).join('\n');
          const fs = require('fs');

          fs.appendFileSync(filename, csv + '\n');
          data=[]
  
        } catch (error) {
          console.log("The single underline element didn't appear.There are mutl authors")
        }
        
        await page.goBack();
        await page.waitForLoadState();
      }else{
        break
      }
    }
  }

  await browser.close();
}
);
});
