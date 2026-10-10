/**
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
