const { test, expect } = require('@playwright/test');

// ------------------------------------------------------------------
// 1. CONFIGURATION
// ------------------------------------------------------------------
const CONFIG = {
  url: 'https://www.swifttranslator.com/',
  timeouts: {
    pageLoad: 5000,
    translation: 5000, // Increased wait time
    betweenTests: 5000
  },
  selectors: {
    inputField: 'textarea', // The input is a simple textarea
    // The output is a DIV with specific styling (taken from your friend's working code)
    outputField: 'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
  }
};
// INCREASE GLOBAL TIMEOUT TO 2 MINUTES (Fixes the "30000ms exceeded" error)
test.setTimeout(120000);

// ------------------------------------------------------------------
// 2. TEST DATA (Your Specific Cases)
// ------------------------------------------------------------------
const TEST_DATA = {
  positive: [
      { id: 'POS_01', input: 'mama panthi yanavaa', expected: 'මම පන්ති යනවා' },
  { id: 'POS_02', input: 'mama iiyee gedhara giyaa.', expected: 'මම ඊයේ ගෙදර ගියා.' },
  { id: 'POS_03', input: 'mama heta enavaa.', expected: 'මම හෙට එනවා.' },
  { id: 'POS_04', input: 'api kaeema kanna yanavaa saha passe chithrapatayakuth balanavaa.', expected: 'අපි කෑම කන්න යනවා සහ පස්සෙ චිත්‍රපටයකුත් බලනවා.' },
  { id: 'POS_05', input: 'oya enavaanam mama balan innavaa.', expected: 'ඔය එනවානම් මම බලන් ඉන්නවා.' },
  { id: 'POS_06', input: 'oyaata kohomadha lamayoo?', expected: 'ඔයාට කොහොමද ලමයෝ?' },
  { id: 'POS_07', input: 'vahaama enna.', expected: 'වහාම එන්න.' },
  { id: 'POS_08', input: 'mama ennee naehae.', expected: 'මම එන්නේ නැහැ.' },
  { id: 'POS_09', input: 'karuNaakaralaa mata podi udhavvak karanna puLuvandha?', expected: 'කරුණාකරලා මට පොඩි උදව්වක් කරන්න පුළුවන්ද?' },
  { id: 'POS_10', input: 'ehema karapan.', expected: 'එහෙම කරපන්.' },
  { id: 'POS_11', input: 'mata nidhimathayi.', expected: 'මට නිදිමතයි.' },
  { id: 'POS_12', input: 'mata oona eyaava.', expected: 'මට ඕන එයාව.' },
  { id: 'POS_13', input: 'Zoom meeting ekak thiyennee', expected: 'Zoom meeting එකක් තියෙන්නේ' },
  { id: 'POS_14', input: 'api trip eka Kandy valata yamudha', expected: 'අපි trip එක Kandy වලට යමුද' },
  { id: 'POS_15', input: 'karuNaakaralaa magee lipinaya eyaata yavanna saha passe eyaa lata call ekak karanna puLuvandha?', expected: 'කරුණාකරලා මගේ ලිපිනය එයාට යවන්න සහ පස්සෙ එයා ලට call එකක් කරන්න පුළුවන්ද?' },
  { id: 'POS_16', input: 'mama dhaen vaeda karanavaa, namuth heta api gedhara yanna hadhannee, ehema naththnam api passe kathaa karamu', expected: 'මම දැන් වැඩ කරනවා, නමුත් හෙට අපි ගෙදර යන්න හදන්නේ, එහෙම නත්ත්නම් අපි පස්සෙ කතා කරමු' },
  { id: 'POS_17', input: 'mama mage yaaluvaa ekka  aavaa lunch eka ganna', expected: 'මම mage යාලුවා එක්ක  ආවා lunch එක ගන්න' },
  { id: 'POS_18', input: 'vaessa unath api yanna epaeyi, namuth vaessa naththnam api gedhara yanna puLuvan', expected: 'වැස්ස උනත් අපි යන්න එපැයි, නමුත් වැස්ස නත්ත්නම් අපි ගෙදර යන්න පුළුවන්' },
  { id: 'POS_19', input: 'mama heta office yanna hadhannee naehae, namuth api iiLaGa sathiyee project eka finish karanna oonee', expected: 'මම හෙට office යන්න හදන්නේ නැහැ, නමුත් අපි ඊළඟ සතියේ project එක finish කරන්න ඕනේ' },
  { id: 'POS_20', input: 'magee laptop eke Windows update eka hariyata vaeda karanne naethnam mata email ekak evanna saha Teams meeting ekak schedule karanna puLuvandha?', expected: 'මගේ laptop eke Windows update එක හරියට වැඩ කරන්නේ නැත්නම් මට email එකක් එවන්න සහ Teams meeting එකක් schedule කරන්න පුළුවන්ද?' },
  { id: 'POS_21', input: 'mama iiyee udhaesane paasal giyaa, passe yaluvo hamuvela kaema kaala, raeeta gedhara aevith mama hodhatama nidhagaththaa', expected: 'මම ඊයේ උදැසනෙ පාසල් ගියා, පස්සෙ යලුවො හමුවෙල කැම කාල, රෑට ගෙදර ඇවිත් මම හොදටම නිදගත්තා' },
  { id: 'POS_22', input: 'api 2026-05-21 dhavasa 7.30 AM Colombo yanna hadhannee saha eeya venuven Rs. 5343 vithara ganna oonee', expected: 'අපි 2026-05-21 දවස 7.30 AM Colombo යන්න හදන්නේ සහ ඒය වෙනුවෙන් Rs. 5343 විතර ගන්න ඕනේ' },
  { id: 'POS_23', input: 'oya enna kalin karuNaakaralaa documents tika attach karalaa email ekak evanna, ehema naethnam api meeting eka cancel karamu', expected: 'ඔය එන්න කලින් කරුණාකරලා documents ටික attach කරලා email එකක් එවන්න, එහෙම නැත්නම් අපි meeting එක cancel කරමු' },
  { id: 'POS_24', input: 'mata baya hithenavaa namuth mama ehema pennanne naehae, mokadha mama hariyata strong venna hadhanne', expected: 'මට බය හිතෙනවා නමුත් මම එහෙම පෙන්නන්නෙ නැහැ, මොකද මම හරියට strong වෙන්න හදන්නෙ' },
  { id: 'POS_25', input: 'dhitvaa suLi kuNaatuva saha gQQvathura heethuven naagarika ha graameeya pradhesha vala maarga, paalam, saha vasthu boho pramaaNayak vinaashayata path vee athara, ehi puluvaa prayojanayata ganna prathikaarakama thavath kalayak ganna bava adhikaariyo sadhahan kala', expected: 'දිට්වා සුළි කුණාටුව සහ ගංවතුර හේතුවෙන් නාගරික හ ග්‍රාමේය ප්‍රදෙශ වල මාර්ග, පාලම්, සහ වස්තු බොහො ප්‍රමාණයක් විනාශයට පත් වේ අතර, එහි පුලුවා ප්‍රයොජනයට ගන්න ප්‍රතිකාරකම තවත් කලයක් ගන්න බව අදිකාරියො සදහන් කල' }],
  negative: [
     { id: 'NEG_01', input: 'Dr.Namal', notExpected: 'Dr.Namal' },
  { id: 'NEG_02', input: 'Excuse me gayan', notExpected: 'Excuse me gayan' },
  { id: 'NEG_03', input: 'oyaage name eka Gayan', notExpected: 'ඔයාගේ name එක Gayan' },
  { id: 'NEG_04', input: 'Good morning sir', notExpected: 'Good morning sir' },
  { id: 'NEG_05', input: 'Please call me after the meeting.', notExpected: 'Please call me after the meeting.' },
  { id: 'NEG_06', input: 'niduka@gmail.com', notExpected: 'niduka@gmail.com' },
  { id: 'NEG_07', input: 'Please submit the assignment before the deadline and inform the lecturer once it is uploaded to the system.', notExpected: 'Please submit the assignment before the deadline and inform the lecturer once it is uploaded to the system.' },
  { id: 'NEG_08', input: 'Yesterday I met Gayan Perera at the Colombo office and discussed the new project requirements with him.', notExpected: 'Yesterday I met Gayan Perera at the Colombo office and discussed the new project requirements with him.' },
  { id: 'NEG_09', input: 'oyaata puLuvannam karuNaakaralaa eyaa langa innava kiyala mata kiyanna saha api dekka passe kathaa karamu.', notExpected: 'Login to the Windows system and configure the network settings before starting the application.' },
  { id: 'NEG_10', input: 'Dear Sir, Please review the attached documents and provide your feedback at your earliest convenience.', notExpected: 'Dear Sir, Please review the attached documents and provide your feedback at your earliest convenience.' }
  ],

// NEW UI DATA SECTION
  ui: [
    { 
      id: 'Pos_UI_0001', 
      input: 'kos', 
      suggestion: 'කොස්ස', 
      expected: 'කොස්ස' 
    }
  ]
};


// ------------------------------------------------------------------
// 3. PAGE OBJECT (The Helper Class)
// ------------------------------------------------------------------
class TranslatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState('networkidle'); // Wait for network to settle
  }

  async clearAndWait() {
    const input = this.page.locator(CONFIG.selectors.inputField).first();
    await input.click();
    await input.clear();
    await this.page.waitForTimeout(500);
  }

  async performTranslation(text) {
    const input = this.page.locator(CONFIG.selectors.inputField).first();
    
    // 1. Type
    await input.pressSequentially(text, { delay: 100 });
    
    // 2. Trigger (Space key + Click on Body)
    await this.page.keyboard.press('Space');
    await this.page.waitForTimeout(500);
    await this.page.locator('body').click({ position: { x: 0, y: 0 } });
    
    // 3. Wait for Output to appear
    await this.page.waitForTimeout(CONFIG.timeouts.translation);
  }

  async getActualOutput() {
    // This selector is from your friend's code which worked correctly
    // It targets the specific DIV class that holds the output
    const outputLocator = this.page.locator(CONFIG.selectors.outputField);

    // Filter to ensure we don't accidentally grab the input textarea
    // We want the DIV that is NOT the textarea
    const correctOutputBox = outputLocator.filter({ hasNot: this.page.locator('textarea') }).first();

    let actualText = "";
    try {
      actualText = await correctOutputBox.textContent();
    } catch (e) {
      actualText = "Error: Could not find output box";
    }

    return actualText ? actualText.trim() : "";
  }
}

// ------------------------------------------------------------------
// 4. TEST SUITE
// ------------------------------------------------------------------
test.describe('Assignment 1 - SwiftTranslator Automation', () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  // --- POSITIVE FUNCTIONAL TESTS ---
  test.describe('Positive Functional Tests', () => {
    for (const tc of TEST_DATA.positive) {
      test(`${tc.id}: Input "${tc.input}"`, async () => {
        await translator.clearAndWait();
        await translator.performTranslation(tc.input);
        const actual = await translator.getActualOutput();
        
        // Console Reporting
        const isMatch = actual.includes(tc.expected);
        console.log(`\nFor ${tc.id}:`);
        console.log(`Input Box has: "${tc.input}"`);
        console.log(`Expected:      "${tc.expected}"`);
        console.log(`Actual:        "${actual}"`);
        console.log(`Comparison:    ${isMatch ? 'Match! (Pass)' : 'No Match! (Fail)'}`);
        console.log('--------------------------------------------------');

        // Assertion
        expect(actual).toContain(tc.expected);
      });
    }
  });

  // --- NEGATIVE FUNCTIONAL TESTS ---
  test.describe('Negative Functional Tests', () => {
    for (const tc of TEST_DATA.negative) {
      test(`${tc.id}: Input "${tc.input}"`, async () => {
        await translator.clearAndWait();
        await translator.performTranslation(tc.input);
        const actual = await translator.getActualOutput();
        
        // Console Reporting
        const isMatch = actual.includes(tc.notExpected);
        console.log(`\nFor ${tc.id}:`);
        console.log(`Input Box has: "${tc.input}"`);
        console.log(`Should NOT contain: "${tc.notExpected}"`);
        console.log(`Actual:             "${actual}"`);
        console.log(`Comparison:         ${isMatch ? 'Match! (Fail)' : 'No Match! (Pass)'}`);
        console.log('--------------------------------------------------');

        // Assertion
        expect(actual).not.toContain(tc.notExpected);
      });
    }

    // --- NEW: UI FUNCTIONAL TESTS ---
    test.describe('UI Functional Tests', () => {
      for (const tc of TEST_DATA.ui) {
        test(`${tc.id}: Suggestion Dropdown "${tc.input}" -> "${tc.suggestion}"`, async () => {
          await translator.clearAndWait();
          
          // Use the new Dropdown Method
          await translator.performDropdownSelection(tc.input, tc.suggestion);
          
          const actual = await translator.getActualOutput();
          
          const isMatch = actual.includes(tc.expected);
          console.log(`\nFor ${tc.id}:`);
          console.log(`Typed Input:   "${tc.input}"`);
          console.log(`Selected:      "${tc.suggestion}"`);
          console.log(`Expected Out:  "${tc.expected}"`);
          console.log(`Actual Out:    "${actual}"`);
          console.log(`Comparison:    ${isMatch ? 'Match! (Pass)' : 'No Match! (Fail)'}`);
          console.log('--------------------------------------------------');

          expect(actual).toContain(tc.expected);
        });
      }
    });
  });
});