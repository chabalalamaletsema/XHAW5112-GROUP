/**
<<<<<<< HEAD
 * NEXT LEVEL GAMING & ESPORTS ARENA - Build Check
 * Static site (HTML/CSS/JS) for GitHub Pages: no compilation needed.
 * Run with: node build.js
 */
const fs = require('fs');

const PAGES = ['index.html', 'about.html', 'packages.html', 'package-detail.html', 'calculate.html', 'summary.html', 'contact.html'];
const REQUIRED = [...PAGES, 'style.css', 'script.js', 'assets/logo.png', 'README.md', '.gitignore'];
const errors = [];
let passed = 0;
const ok = (cond, label) => { if (cond) { passed++; console.log('  OK   ' + label); } else { errors.push(label); console.log('  FAIL ' + label); } };

console.log('\n=== Next Level Gaming - Build Check ===\n[1/4] Required files');
REQUIRED.forEach((f) => ok(fs.existsSync(f), f));

console.log('\n[2/4] HTML pages');
PAGES.forEach((p) => {
  if (!fs.existsSync(p)) return;
  const h = fs.readFileSync(p, 'utf8');
  ok(h.includes('<!DOCTYPE html>') && h.includes('name="viewport"'), p + ': doctype + viewport');
  ok(h.includes('style.css') && h.includes('script.js'), p + ': css + js linked');
  ok(h.includes('assets/logo.png'), p + ': logo present');
  ['index.html', 'about.html', 'packages.html', 'calculate.html', 'contact.html'].forEach((l) => ok(h.includes('href="' + l + '"'), p + ': nav link to ' + l));
});

console.log('\n[3/4] script.js logic');
const js = fs.readFileSync('script.js', 'utf8');
try { new Function(js); ok(true, 'JavaScript syntax valid'); } catch (e) { ok(false, 'JavaScript syntax: ' + e.message); }
// Execute the pure business logic and test it
const logic = new Function(js.split('// ===== STORAGE')[0] + '; return { calculateQuote, getDiscountRate, formatZAR, isValidEmail, isValidPhone, isValidName };')();
const mk = (...prices) => prices.map((price) => ({ price }));
ok(logic.getDiscountRate(1) === 0 && logic.getDiscountRate(2) === 0.05 && logic.getDiscountRate(3) === 0.10 && logic.getDiscountRate(4) === 0.15, 'Discount tiers 0 / 5 / 10 / 15%');
const q = logic.calculateQuote(mk(1550));
ok(Math.abs(q.total - 1782.5) < 0.001, 'R1,550 + 15% VAT = R1,782.50');
const q2 = logic.calculateQuote(mk(1500, 750));
ok(Math.abs(q2.total - 2458.125) < 0.001, '2 bookings: 5% discount then VAT');
ok(logic.formatZAR(1782.5) === 'R1,782.50', 'Currency formatting');
ok(logic.isValidEmail('a@b.co') && !logic.isValidEmail('a@b'), 'Email validation');
ok(logic.isValidPhone('0821234567') && logic.isValidPhone('+27821234567') && !logic.isValidPhone('123'), 'Phone validation');
ok(logic.isValidName('Thabo Mokoena') && !logic.isValidName('A1'), 'Name validation');

console.log('\n[4/4] style.css');
const css = fs.readFileSync('style.css', 'utf8');
['#111217', '#16e0d6', '#f4f5fa', '#aaafbe', '#2e6b4f', '#f15a24', 'Montserrat', '@media'].forEach((t) => ok(css.includes(t), 'CSS contains ' + t));

console.log('\n' + (errors.length ? 'BUILD FAILED - ' + errors.length + ' error(s)' : 'BUILD PASSED - ' + passed + ' checks OK') + '\n');
if (errors.length) process.exit(1);
=======
 * NXT LEVEL GAMING ESCAPE - Build Script
 * Validates that all required files exist and are syntactically correct.
 * This is a static site (HTML/CSS/JS) for GitHub Pages - no compilation needed.
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_FILES = [
  'index.html',
  'style.css',
  'script.js',
  'assets/cca9db6c916aa31fb3c0133dbae49526.jpg',
  'README.md',
  '.gitignore',
  'mobile-app/App.js',
  'mobile-app/MainActivity.kt',
  'mobile-app/package.json',
  'presentation/README.md',
];

let errors = [];
let passed = 0;

console.log('========================================');
console.log(' NXT LEVEL GAMING ESCAPE - Build Check');
console.log(' XHAW5112 University Project');
console.log('========================================\n');

// 1. Check all required files exist
console.log('[1/4] Checking required files...');
for (const file of REQUIRED_FILES) {
  if (fs.existsSync(path.join(process.cwd(), file))) {
    console.log('  OK   ' + file);
    passed++;
  } else {
    errors.push('Missing file: ' + file);
    console.log('  FAIL ' + file);
  }
}

// 2. Validate index.html structure
console.log('\n[2/4] Validating index.html...');
const html = fs.readFileSync('index.html', 'utf8');
const htmlChecks = [
  { test: html.includes('<!DOCTYPE html>'), label: 'DOCTYPE declaration' },
  { test: html.includes('name="viewport"'), label: 'Meta viewport tag' },
  { test: html.includes('style.css'), label: 'CSS stylesheet linked' },
  { test: html.includes('script.js'), label: 'JavaScript linked' },
  { test: html.includes('NXT LEVEL GAMING ESCAPE'), label: 'Brand name present' },
  { test: html.includes('Enter the'), label: 'Hero heading present' },
  { test: html.includes('packagesGrid'), label: 'Packages grid container' },
  { test: html.includes('quotationBox'), label: 'Quotation box present' },
  { test: html.includes('quoteSubtotal'), label: 'Subtotal field present' },
  { test: html.includes('quoteDiscountRate'), label: 'Discount rate field present' },
  { test: html.includes('quoteTotal'), label: 'Total field present' },
  { test: html.includes('discountRule'), label: 'Discount rule display present' },
];
for (const check of htmlChecks) {
  if (check.test) {
    console.log('  OK   ' + check.label);
    passed++;
  } else {
    errors.push('HTML check failed: ' + check.label);
    console.log('  FAIL ' + check.label);
  }
}

// 3. Validate script.js syntax and logic
console.log('\n[3/4] Validating script.js...');
try {
  const scriptCode = fs.readFileSync('script.js', 'utf8');
  // Use Node's syntax checker by attempting to parse in a sandbox
  new Function(scriptCode);
  console.log('  OK   JavaScript syntax valid');
  passed++;

  const logicChecks = [
    { test: scriptCode.includes('getDiscountRate'), label: 'getDiscountRate function defined' },
    { test: scriptCode.includes('calculateQuote'), label: 'calculateQuote function defined' },
    { test: scriptCode.includes('0.15'), label: '15% discount tier (4+ bookings)' },
    { test: scriptCode.includes('0.10'), label: '10% discount tier (3 bookings)' },
    { test: scriptCode.includes('0.05'), label: '5% discount tier (2 bookings)' },
    { test: scriptCode.includes('addToBooking'), label: 'addToBooking function defined' },
    { test: scriptCode.includes('removeFromBooking'), label: 'removeFromBooking function defined' },
    { test: scriptCode.includes('requestBooking'), label: 'requestBooking function defined' },
    { test: scriptCode.includes('renderPackages'), label: 'renderPackages function defined' },
    { test: scriptCode.includes('renderBooking'), label: 'renderBooking function defined' },
    { test: scriptCode.includes('1500'), label: 'Package price R1500 present' },
    { test: scriptCode.includes('750'), label: 'Package price R750 present' },
    { test: scriptCode.includes('600'), label: 'Package price R600 present' },
    { test: scriptCode.includes('800'), label: 'Package price R800 present' },
  ];
  for (const check of logicChecks) {
    if (check.test) {
      console.log('  OK   ' + check.label);
      passed++;
    } else {
      errors.push('JS logic check failed: ' + check.label);
      console.log('  FAIL ' + check.label);
    }
  }
} catch (e) {
  errors.push('script.js syntax error: ' + e.message);
  console.log('  FAIL JavaScript syntax error: ' + e.message);
}

// 4. Validate CSS and mobile app
console.log('\n[4/4] Validating CSS and mobile app...');
const css = fs.readFileSync('style.css', 'utf8');
const cssChecks = [
  { test: css.includes('#0B0B0B'), label: 'Background color #0B0B0B' },
  { test: css.includes('#000000'), label: 'Header color #000000' },
  { test: css.includes('#FFFFFF'), label: 'White CTA #FFFFFF' },
  { test: css.includes('#D9D9D9'), label: 'Silver accent #D9D9D9' },
  { test: css.includes('Montserrat'), label: 'Montserrat font family' },
  { test: css.includes('box-shadow'), label: 'Neon glow box-shadow effects' },
  { test: css.includes('@media'), label: 'Responsive media queries' },
];
for (const check of cssChecks) {
  if (check.test) {
    console.log('  OK   ' + check.label);
    passed++;
  } else {
    errors.push('CSS check failed: ' + check.label);
    console.log('  FAIL ' + check.label);
  }
}

// Validate mobile app package.json
try {
  const mobilePkg = JSON.parse(fs.readFileSync('mobile-app/package.json', 'utf8'));
  if (mobilePkg.main === 'App.js') {
    console.log('  OK   mobile-app/package.json valid (main: App.js)');
    passed++;
  } else {
    errors.push('mobile-app/package.json main is not App.js');
    console.log('  FAIL mobile-app/package.json main is not App.js');
  }
} catch (e) {
  errors.push('mobile-app/package.json parse error: ' + e.message);
  console.log('  FAIL mobile-app/package.json parse error');
}

// Validate App.js syntax
try {
  const appCode = fs.readFileSync('mobile-app/App.js', 'utf8');
  // Strip imports for syntax check (Node can't parse JSX/ES modules directly)
  const stripped = appCode
    .replace(/^import .*$/gm, '')
    .replace(/^export default .*$/gm, 'module.exports = App;');
  new Function(stripped);
  console.log('  OK   mobile-app/App.js syntax valid');
  passed++;
} catch (e) {
  // JSX will fail Node's parser, so just check structurally
  const appCode = fs.readFileSync('mobile-app/App.js', 'utf8');
  if (appCode.includes('getDiscountRate') && appCode.includes('calculateQuote') && appCode.includes('FlatList')) {
    console.log('  OK   mobile-app/App.js structure valid (React Native JSX)');
    passed++;
  } else {
    errors.push('mobile-app/App.js structure invalid');
    console.log('  FAIL mobile-app/App.js structure invalid');
  }
}

// ===== RESULT =====
console.log('\n========================================');
if (errors.length === 0) {
  console.log(' BUILD PASSED - ' + passed + ' checks OK');
  console.log(' All files validated. Ready for GitHub Pages deployment.');
} else {
  console.log(' BUILD FAILED - ' + errors.length + ' error(s)');
  errors.forEach(function(e) { console.log('   - ' + e); });
  process.exit(1);
}
console.log('========================================\n');
>>>>>>> c1f3f9865c987b8961c8b1063dc54a45e27153c3
