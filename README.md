帮助你筛选高性价比账号，轻松赚差价。

自动保存网易账号登录信息；
可拓展采集字段；
技术栈 Ts+Playwright



基础环境：
    Node.js v18/v16
    Ts

启动命令：
    npx playwright test cbg.test.test.ts --project=chromium
    或者
    pnpm playwright test cbg.test.test.ts --project=chromium

爬取字段：
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