import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const SCREENSHOTS_DIR = 'C:/Users/vibhor/.gemini/antigravity-ide/brain/32165630-7c0d-4cf5-8c7e-ffc15197f40a/screenshots';

if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function run() {
  console.log('Launching Chrome from default Windows path...');
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  page.on('console', (msg) => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', (err) => console.log('BROWSER ERROR:', err.message));
  await page.setViewport({ width: 430, height: 932, deviceScaleFactor: 2 });

  // Helper to set localStorage and reload
  async function setStateAndCapture(name, stateOverrides, customAction) {
    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
    
    // First ensure baseline state is created if localStorage is empty
    await page.evaluate((overrides) => {
      let saved = localStorage.getItem('sangam_state_v1');
      let current = saved ? JSON.parse(saved) : {};
      const updated = { ...current, ...overrides };
      localStorage.setItem('sangam_state_v1', JSON.stringify(updated));
    }, stateOverrides);

    await page.reload({ waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 800));

    if (customAction) {
      await customAction(page);
      await new Promise((r) => setTimeout(r, 600));
    }

    const filePath = path.join(SCREENSHOTS_DIR, `${name}.png`);
    const deviceShell = await page.$('.mobile-device-shell');
    if (deviceShell) {
      await deviceShell.screenshot({ path: filePath });
    } else {
      await page.screenshot({ path: filePath, fullPage: false });
    }
    console.log(`Saved screenshot: ${name}.png`);
  }

  try {
    // 1. Role selection
    await setStateAndCapture('01_role_selection', { currentView: 'GATEWAY' });

    // 2. Family dashboard
    await setStateAndCapture('02_family_dashboard', {
      currentView: 'APP',
      activeRole: 'FAMILY_MEMBER',
      activeFamilyTab: 'DASHBOARD',
    });

    // 3. Senior home
    await setStateAndCapture('03_senior_home', {
      currentView: 'APP',
      activeRole: 'OLDER_ADULT',
      activeSeniorTab: 'HOME',
    });

    // 4. Talk to Someone (Community view)
    await setStateAndCapture('04_talk_to_someone_community', {
      currentView: 'APP',
      activeRole: 'OLDER_ADULT',
      activeSeniorTab: 'COMMUNITY',
      activeSeniorCommunitySubTab: 'COMMUNITY',
    });

    // 5. Community detail / audio list
    await setStateAndCapture('05_community_memories_feed', {
      currentView: 'APP',
      activeRole: 'OLDER_ADULT',
      activeSeniorTab: 'COMMUNITY',
      activeSeniorCommunitySubTab: 'COMMUNITY',
    }, async (p) => {
      // Scroll slightly to highlight the featured memory and audio list
      await p.evaluate(() => {
        const scroller = document.querySelector('.scroll-container');
        if (scroller) scroller.scrollTop = 180;
      });
    });

    // 6. Chat (Private messages with Family, Caregiver, Doctor)
    await setStateAndCapture('06_private_chat', {
      currentView: 'APP',
      activeRole: 'OLDER_ADULT',
      activeSeniorTab: 'COMMUNITY',
      activeSeniorCommunitySubTab: 'CHAT',
    });

    // 7. Caregiver Today
    await setStateAndCapture('07_caregiver_today', {
      currentView: 'APP',
      activeRole: 'CAREGIVER',
      activeCaregiverTab: 'TODAY',
    });

    // 8. Caregiver Stats
    await setStateAndCapture('08_caregiver_stats', {
      currentView: 'APP',
      activeRole: 'CAREGIVER',
      activeCaregiverTab: 'STATS',
    });

    // 9. Caregiver task detail (with modal open)
    await setStateAndCapture('09_caregiver_task_detail', {
      currentView: 'APP',
      activeRole: 'CAREGIVER',
      activeCaregiverTab: 'TASKS',
    }, async (p) => {
      const taskCard = await p.$('.scroll-container div[role="button"], .scroll-container div[style*="cursor: pointer"]');
      if (taskCard) {
        await taskCard.click();
        await new Promise((r) => setTimeout(r, 400));
      }
    });

    // 10. Caregiver alert detail (History tab with resolutions)
    await setStateAndCapture('10_caregiver_alert_detail', {
      currentView: 'APP',
      activeRole: 'CAREGIVER',
      activeCaregiverTab: 'ALERTS',
    }, async (p) => {
      // Click History tab
      const buttons = await p.$$('button');
      for (const btn of buttons) {
        const text = await p.evaluate((el) => el.textContent, btn);
        if (text && text.includes('History')) {
          await btn.click();
          await new Promise((r) => setTimeout(r, 400));
          break;
        }
      }
    });

    // 11. Caregiver Profile
    await setStateAndCapture('11_caregiver_profile', {
      currentView: 'APP',
      activeRole: 'CAREGIVER',
      activeCaregiverTab: 'PROFILE',
    });

    console.log('All Visual QA screenshots captured successfully!');
  } catch (err) {
    console.error('Error during screenshot capture:', err);
  } finally {
    await browser.close();
  }
}

run();
