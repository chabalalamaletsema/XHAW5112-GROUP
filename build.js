/**
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
