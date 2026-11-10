/* ============================================
<<<<<<< HEAD
   NEXT LEVEL GAMING & ESPORTS ARENA - JavaScript
   XHAW5112 Task 2 - Phase 1: Website
   Shared data, booking cart, discount + VAT logic,
   validation and page initialisers.
   ============================================ */

// ===== BUSINESS INFO =====
var BUSINESS = {
  phone: '+27 11 123 4567',
  email: 'info@nextlevelgaming.co.za',
  address: '123 Gaming Lane, Johannesburg, 2000',
  hours: 'Mon - Sun: 9:00 - 22:00'
};

// ===== PACKAGES + INDIVIDUAL EXPERIENCES (array) =====
var PACKAGES = [
  { id: 1, type: 'package', name: 'Ultimate Gaming Day', price: 1500, icon: '\u{1F3AE}', duration: '8 hours', rating: 4.8, reviews: 100,
    desc: 'Full day LAN, PC + Console, VR stations, Tournaments + Snacks.',
    features: ['Full-day access (8 hrs)', 'PC + Console + VR', 'Tournament entry', 'Snacks & drinks included'] },
  { id: 2, type: 'package', name: 'Family Game Night', price: 1500, icon: '\u{1F46A}', duration: '3 hours', rating: 4.7, reviews: 64,
    desc: 'Co-op + Board Games, up to 6 players, pizza included.',
    features: ['Up to 6 players', 'Co-op & board games', 'Pizza included', '3-hour session'] },
  { id: 3, type: 'package', name: 'VR Arena Adventure', price: 750, icon: '\u{1F97D}', duration: '60 minutes', rating: 4.9, reviews: 88,
    desc: 'Immersive VR, multiplayer, 60-min session, all gear provided.',
    features: ['60-minute session', 'Multiplayer VR', 'All gear provided', 'Free-roam arena'] },
  { id: 4, type: 'package', name: 'E-Sports Tournament Entry', price: 600, icon: '\u{1F3C6}', duration: 'Tournament day', rating: 4.6, reviews: 52,
    desc: 'Competitive play, prize pool, teams and solo entries welcome.',
    features: ['Competitive brackets', 'Prize pool', 'Teams & solo entry', 'Live leaderboard'] },
  { id: 5, type: 'package', name: 'Streaming & Content Creation', price: 800, icon: '\u{1F3A5}', duration: '2 hours', rating: 4.5, reviews: 31,
    desc: 'Pro studio, overlay & mic, 2-hour streaming slot.',
    features: ['2-hour studio slot', 'Pro overlay & mic', 'Multi-cam setup', 'Recording included'] },
  { id: 6, type: 'individual', name: '1 Hour Gaming', price: 120, icon: '\u{1F579}\uFE0F', duration: '1 hour', rating: 4.6, reviews: 120,
    desc: 'One hour on a high-end PC or console station.',
    features: ['PC or console station', 'Headset provided', 'Extend on the day'] },
  { id: 7, type: 'individual', name: 'VR Experience', price: 150, icon: '\u{1F576}\uFE0F', duration: '30 minutes', rating: 4.8, reviews: 76,
    desc: 'A single VR session with a staff member to guide you.',
    features: ['30-minute session', 'All gear provided', 'Beginner friendly'] },
  { id: 8, type: 'individual', name: 'Racing Simulator', price: 100, icon: '\u{1F3CE}\uFE0F', duration: '30 minutes', rating: 4.7, reviews: 59,
    desc: 'Full-motion racing rig with wheel and pedals.',
    features: ['Wheel + pedals', 'Multiple tracks', 'Lap-time board'] }
];

// ===== PRICING RULES =====
// 1 booking = 0%, 2 = 5%, 3 = 10%, more than 3 = 15%. VAT (15%) is added AFTER the discount.
var VAT_RATE = 0.15;

function getDiscountRate(count) {
  if (count > 3) return 0.15;
=======
   NXT LEVEL GAMING ESCAPE - JavaScript
   XHAW5112 University Project
   Booking cart + discount logic (MO03)
   ============================================ */

// ===== PACKAGE DATA =====
const PACKAGES = [
  {
    id: 1,
    name: "Ultimate Gaming Day",
    price: 1500,
    icon: "\u{1F3AE}",
    desc: "Full day LAN, PC + Console, VR stations, Tournaments + Snacks.",
    features: ["Full-day access (8 hrs)", "PC + Console + VR", "Tournament entry", "Snacks & drinks included"]
  },
  {
    id: 2,
    name: "Family Game Night",
    price: 1500,
    icon: "\u{1F3B5}",
    desc: "Co-op + Board Games, up to 6 players, pizza included.",
    features: ["Up to 6 players", "Co-op & board games", "Pizza included", "3-hour session"]
  },
  {
    id: 3,
    name: "VR Arena Adventure",
    price: 750,
    icon: "\u{1F9C2}",
    desc: "Immersive VR, multiplayer, 60-min session, all gear provided.",
    features: ["60-minute session", "Multiplayer VR", "All gear provided", "Free-roam arena"]
  },
  {
    id: 4,
    name: "E-Sports Tournament Entry",
    price: 600,
    icon: "\u{1F3C6}",
    desc: "Competitive play, prize pool, teams and solo entries welcome.",
    features: ["Competitive brackets", "Prize pool", "Teams & solo entry", "Live leaderboard"]
  },
  {
    id: 5,
    name: "Streaming & Content Creation",
    price: 800,
    icon: "\u{1F4F9}",
    desc: "Pro studio, overlay & mic, 2-hour streaming slot.",
    features: ["2-hour studio slot", "Pro overlay & mic", "Multi-cam setup", "Recording included"]
  }
];

// ===== STATE =====
let bookingCart = [];

// ===== DISCOUNT RULE (MO03) =====
// 1 booking = 0%, 2 = 5%, 3 = 10%, 4+ = 15%
function getDiscountRate(count) {
  if (count >= 4) return 0.15;
>>>>>>> c1f3f9865c987b8961c8b1063dc54a45e27153c3
  if (count === 3) return 0.10;
  if (count === 2) return 0.05;
  return 0;
}

<<<<<<< HEAD
function calculateQuote(items) {
  var subtotal = 0;
  for (var i = 0; i < items.length; i++) subtotal += items[i].price;
  var rate = getDiscountRate(items.length);
  var discountAmount = subtotal * rate;
  var afterDiscount = subtotal - discountAmount;
  var vat = afterDiscount * VAT_RATE;
  return { count: items.length, subtotal: subtotal, rate: rate, discountAmount: discountAmount,
           afterDiscount: afterDiscount, vat: vat, total: afterDiscount + vat };
}

function formatZAR(amount) {
  var parts = Number(amount || 0).toFixed(2).split('.');
  return 'R' + parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + parts[1];
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

// ===== VALIDATION =====
function isValidName(v) { return /^[A-Za-z\u00C0-\u00FF'\u2019 -]{2,}$/.test(v.trim()); }
function isValidEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); }
function isValidPhone(v) {
  var d = v.replace(/[\s()-]/g, '');
  return /^0\d{9}$/.test(d) || /^\+27\d{9}$/.test(d);
}

// ===== STORAGE (cart + customer kept between pages) =====
function load(key, fallback) {
  try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
}
function save(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
}
function getCartIds() { return load('nl_cart', []); }
function setCartIds(ids) { save('nl_cart', ids); updateCartBadge(); }
function getCartItems() {
  var ids = getCartIds();
  return PACKAGES.filter(function (p) { return ids.indexOf(p.id) !== -1; });
}
function toggleCart(id) {
  var ids = getCartIds();
  var i = ids.indexOf(id);
  if (i === -1) ids.push(id); else ids.splice(i, 1);
  setCartIds(ids);
}
function updateCartBadge() {
  var el = document.getElementById('cartCount');
  if (el) el.textContent = getCartIds().length;
}
function findPackage(id) {
  return PACKAGES.filter(function (p) { return p.id === Number(id); })[0];
}

// ===== SHARED UI =====
function packageCardHtml(p) {
  var inCart = getCartIds().indexOf(p.id) !== -1;
  return '<article class="package-card' + (inCart ? ' selected' : '') + '">' +
    '<span class="price-badge">' + formatZAR(p.price) + '</span>' +
    '<div class="package-icon">' + p.icon + '</div>' +
    '<div class="package-tag">' + (p.type === 'package' ? 'PACKAGE' : 'INDIVIDUAL EXPERIENCE') + '</div>' +
    '<h3 class="package-name">' + escapeHtml(p.name) + '</h3>' +
    '<p class="package-desc">' + escapeHtml(p.desc) + '</p>' +
    '<div class="package-meta">\u23F1 ' + escapeHtml(p.duration) + ' &nbsp; \u2605 ' + p.rating + '</div>' +
    '<div class="btn-row">' +
      '<a class="btn btn-outline" href="package-detail.html?id=' + p.id + '">VIEW DETAILS</a>' +
      '<button class="btn ' + (inCart ? 'btn-added' : 'btn-primary') + '" data-toggle="' + p.id + '">' +
        (inCart ? 'ADDED \u2713' : '+ SELECT') + '</button>' +
    '</div></article>';
}

// Clicking any [data-toggle] button adds/removes that package, then re-renders the page
function bindToggles(rerender) {
  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-toggle]') : null;
    if (!btn) return;
    toggleCart(Number(btn.getAttribute('data-toggle')));
    rerender();
  });
}

function setError(input, message) {
  var err = document.getElementById(input.id + 'Error');
  if (err) err.textContent = message || '';
  if (message) { input.classList.add('invalid'); input.setAttribute('aria-invalid', 'true'); }
  else { input.classList.remove('invalid'); input.removeAttribute('aria-invalid'); }
}

function invoiceRows(items, q) {
  var rows = '';
  for (var i = 0; i < items.length; i++) {
    rows += '<tr><td>' + escapeHtml(items[i].name) + '</td><td class="num">' + formatZAR(items[i].price) + '</td></tr>';
  }
  return { body: rows,
    foot: '<tr><td>Subtotal</td><td class="num">' + formatZAR(q.subtotal) + '</td></tr>' +
      '<tr><td>Discount (' + Math.round(q.rate * 100) + '%)</td><td class="num discount-val">-' + formatZAR(q.discountAmount) + '</td></tr>' +
      '<tr><td>Amount after discount</td><td class="num">' + formatZAR(q.afterDiscount) + '</td></tr>' +
      '<tr><td>VAT (' + Math.round(VAT_RATE * 100) + '%)</td><td class="num">' + formatZAR(q.vat) + '</td></tr>' +
      '<tr class="total-row"><td>TOTAL</td><td class="num">' + formatZAR(q.total) + '</td></tr>' };
}

// ===== PAGE: HOME =====
function initHome() {
  var featured = PACKAGES.filter(function (p) { return p.type === 'package'; }).slice(0, 4);
  function render() {
    var html = '';
    for (var i = 0; i < featured.length; i++) html += packageCardHtml(featured[i]);
    document.getElementById('featuredGrid').innerHTML = html;
  }
  render();
  bindToggles(render);
}

// ===== PAGE: PACKAGES =====
function initPackages() {
  var typeSel = document.getElementById('filterType');
  var sortSel = document.getElementById('sortBy');
  function render() {
    var list = PACKAGES.filter(function (p) { return typeSel.value === 'all' || p.type === typeSel.value; });
    if (sortSel.value === 'low') list.sort(function (a, b) { return a.price - b.price; });
    if (sortSel.value === 'high') list.sort(function (a, b) { return b.price - a.price; });
    if (sortSel.value === 'rating') list.sort(function (a, b) { return b.rating - a.rating; });
    var html = '', rows = '';
    for (var i = 0; i < list.length; i++) {
      html += packageCardHtml(list[i]);
      rows += '<tr><td>' + escapeHtml(list[i].name) + '</td><td>' + (list[i].type === 'package' ? 'Package' : 'Individual') +
        '</td><td>' + escapeHtml(list[i].duration) + '</td><td class="num">' + formatZAR(list[i].price) + '</td></tr>';
    }
    document.getElementById('packagesGrid').innerHTML = html;
    document.getElementById('compareBody').innerHTML = rows;
    document.getElementById('selectedInfo').textContent = getCartIds().length + ' selected';
  }
  typeSel.addEventListener('change', render);
  sortSel.addEventListener('change', render);
  render();
  bindToggles(render);
}

// ===== PAGE: PACKAGE DETAIL =====
function initDetail() {
  var params = new URLSearchParams(window.location.search);
  var p = findPackage(params.get('id')) || PACKAGES[0];
  document.title = p.name + ' | Next Level Gaming & Esports Arena';
  function render() {
    var inCart = getCartIds().indexOf(p.id) !== -1;
    var feats = '';
    for (var i = 0; i < p.features.length; i++) feats += '<li>' + escapeHtml(p.features[i]) + '</li>';
    var related = PACKAGES.filter(function (r) { return r.id !== p.id && r.type === p.type; }).slice(0, 3);
    var relHtml = '';
    for (var j = 0; j < related.length; j++) relHtml += packageCardHtml(related[j]);

    document.getElementById('detailRoot').innerHTML =
      '<div class="detail"><div class="detail-hero" aria-hidden="true">' + p.icon + '</div><div>' +
      '<h1>' + escapeHtml(p.name) + '</h1><div class="price">' + formatZAR(p.price) + '</div>' +
      '<div class="rating">\u2605 ' + p.rating + ' (' + p.reviews + ' reviews) &nbsp;\u00B7&nbsp; \u23F1 ' + escapeHtml(p.duration) + '</div>' +
      '<h3>Description</h3><p style="color:var(--grey);margin:6px 0 18px">' + escapeHtml(p.desc) + '</p>' +
      '<h3>Inclusions</h3><ul class="inclusions">' + feats + '</ul>' +
      '<div class="btn-row"><button class="btn ' + (inCart ? 'btn-danger' : 'btn-primary') + '" data-toggle="' + p.id + '">' +
      (inCart ? 'REMOVE FROM BOOKING' : 'ADD TO BOOKING') + '</button>' +
      '<a class="btn btn-outline" href="calculate.html">CALCULATE FEES</a></div></div></div>' +
      '<h2 class="section-title" style="margin-top:50px">Related Offerings</h2><div class="grid" style="margin-top:24px">' + relHtml + '</div>';
  }
  render();
  bindToggles(render);
}

// ===== PAGE: CALCULATE FEES =====
function initCalculate() {
  var form = document.getElementById('customerForm');
  var customer = load('nl_customer', { name: '', email: '', phone: '' });
  var fields = { name: document.getElementById('custName'), email: document.getElementById('custEmail'), phone: document.getElementById('custPhone') };
  fields.name.value = customer.name; fields.email.value = customer.email; fields.phone.value = customer.phone;

  function render() {
    var ids = getCartIds(), html = '';
    for (var i = 0; i < PACKAGES.length; i++) {
      var p = PACKAGES[i];
      html += '<label class="check-item"><input type="checkbox" data-check="' + p.id + '"' + (ids.indexOf(p.id) !== -1 ? ' checked' : '') + ' />' +
        '<span class="name">' + escapeHtml(p.name) + '</span><span class="cost">' + formatZAR(p.price) + '</span></label>';
    }
    document.getElementById('checkList').innerHTML = html;
    updateQuote();
  }

  function updateQuote() {
    var items = getCartItems(), q = calculateQuote(items), rows = invoiceRows(items, q);
    var banner = document.getElementById('discountBanner');
    var next = q.count === 1 ? 'Add 1 more booking to get 5% off.' : q.count === 2 ? 'Add 1 more booking to get 10% off.'
      : q.count === 3 ? 'Add 1 more booking to get 15% off.' : q.count > 3 ? 'You have the maximum discount!'
      : '2 bookings = 5% \u00B7 3 = 10% \u00B7 more than 3 = 15%';
    banner.innerHTML = '<strong>\u{1F3F7} ' + (q.rate > 0 ? Math.round(q.rate * 100) + '% discount applied' : 'Booking discounts') + '</strong><span>' + next + '</span>';
    document.getElementById('invoiceBody').innerHTML = rows.body || '<tr><td colspan="2" style="color:var(--grey)">Nothing selected yet.</td></tr>';
    document.getElementById('invoiceFoot').innerHTML = rows.foot;
  }

  document.getElementById('checkList').addEventListener('change', function (e) {
    var id = e.target.getAttribute('data-check');
    if (id) { toggleCart(Number(id)); document.getElementById('cartError').textContent = ''; updateQuote(); }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    var cartError = document.getElementById('cartError');
    cartError.textContent = '';
    if (getCartIds().length === 0) { cartError.textContent = '\u26A0 Please select at least one package or experience.'; ok = false; }

    var n = fields.name.value, em = fields.email.value, ph = fields.phone.value;
    setError(fields.name, !n.trim() ? 'Please enter your full name.' : !isValidName(n) ? 'Name can only contain letters (min 2).' : '');
    setError(fields.email, !em.trim() ? 'Please enter your email address.' : !isValidEmail(em) ? 'Enter a valid email, e.g. name@example.com.' : '');
    setError(fields.phone, !ph.trim() ? 'Please enter your phone number.' : !isValidPhone(ph) ? 'Use 10 digits (0821234567) or +27821234567.' : '');
    if (fields.name.classList.contains('invalid') || fields.email.classList.contains('invalid') || fields.phone.classList.contains('invalid')) ok = false;

    if (ok) {
      save('nl_customer', { name: n.trim(), email: em.trim(), phone: ph.trim() });
      window.location.href = 'summary.html';
    } else {
      var firstBad = form.querySelector('.invalid');
      if (firstBad) firstBad.focus(); else cartError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  render();
}

// ===== PAGE: BOOKING SUMMARY =====
function initSummary() {
  var root = document.getElementById('summaryRoot');
  var items = getCartItems();
  var customer = load('nl_customer', null);
  if (items.length === 0 || !customer || !customer.name) {
    root.innerHTML = '<div class="empty-state card"><div class="icon">\u{1F9FE}</div><h3>No quotation to show yet</h3>' +
      '<p>Select your packages and enter your details first.</p><a class="btn btn-primary" href="calculate.html">CALCULATE FEES</a></div>';
    return;
  }
  var q = calculateQuote(items), rows = invoiceRows(items, q);
  var ref = 'NL-' + String(Date.now()).slice(-6);
  root.innerHTML =
    '<p class="section-desc" style="margin:-14px 0 24px">Quotation reference <strong>' + ref + '</strong></p>' +
    '<div class="two-col"><div class="card"><h3>Customer</h3><p>' + escapeHtml(customer.name) + '</p><p>' +
    escapeHtml(customer.email) + '</p><p>' + escapeHtml(customer.phone) + '</p></div>' +
    '<div class="card"><h3>Event Details</h3><p>' + q.count + ' booking(s) selected</p><p>' + BUSINESS.address + '</p><p>' + BUSINESS.hours + '</p></div></div>' +
    '<div class="card" style="margin-top:20px"><h3>Invoice</h3><div class="table-wrap"><table><thead><tr><th>ITEM</th><th class="num">PRICE</th></tr></thead>' +
    '<tbody>' + rows.body + '</tbody><tfoot>' + rows.foot + '</tfoot></table></div></div>' +
    '<div class="btn-row" style="margin-top:20px"><button class="btn btn-primary" id="confirmBtn">CONFIRM BOOKING REQUEST</button>' +
    '<a class="btn btn-outline" href="calculate.html">EDIT SELECTION</a></div>';

  document.getElementById('confirmBtn').addEventListener('click', function () {
    var first = customer.name.trim().split(' ')[0];
    var total = formatZAR(q.total);
    setCartIds([]);
    try { localStorage.removeItem('nl_customer'); } catch (e) { /* ignore */ }
    root.innerHTML = '<div class="notice success"><h3>\u2705 Booking request sent!</h3><p style="color:var(--white)">Reference <strong>' + ref +
      '</strong> &middot; Total ' + total + '.<br/>Thank you, ' + escapeHtml(first) + '. Our consultant will contact you shortly to confirm your booking.</p></div>' +
      '<div class="btn-row" style="margin-top:20px"><a class="btn btn-primary" href="index.html">BACK TO HOME</a><a class="btn btn-outline" href="packages.html">BROWSE PACKAGES</a></div>';
    window.scrollTo(0, 0);
  });
}

// ===== PAGE: CONTACT =====
function initContact() {
  var form = document.getElementById('contactForm');
  var f = { name: document.getElementById('cName'), email: document.getElementById('cEmail'), phone: document.getElementById('cPhone'),
            subject: document.getElementById('cSubject'), message: document.getElementById('cMessage') };
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    setError(f.name, !f.name.value.trim() ? 'Please enter your name.' : !isValidName(f.name.value) ? 'Name can only contain letters.' : '');
    setError(f.email, !f.email.value.trim() ? 'Please enter your email.' : !isValidEmail(f.email.value) ? 'Enter a valid email address.' : '');
    setError(f.phone, f.phone.value.trim() && !isValidPhone(f.phone.value) ? 'Use 10 digits or +27 format.' : '');
    setError(f.subject, !f.subject.value.trim() ? 'Please add a subject.' : '');
    setError(f.message, f.message.value.trim().length < 10 ? 'Message must be at least 10 characters.' : '');
    var bad = form.querySelector('.invalid');
    var note = document.getElementById('contactNotice');
    if (bad) { bad.focus(); note.className = 'notice warn'; note.textContent = 'Please fix the highlighted fields and try again.'; return; }
    note.className = 'notice success';
    note.textContent = 'Thanks ' + f.name.value.trim().split(' ')[0] + '! Your message has been sent. We will get back to you soon.';
    form.reset();
  });
}

// ===== NAVIGATION =====
function initNav() {
  var toggle = document.getElementById('mobileToggle'), nav = document.getElementById('nav');
  if (toggle) toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  updateCartBadge();
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function () {
  initNav();
  var page = document.body.getAttribute('data-page');
  var inits = { home: initHome, packages: initPackages, detail: initDetail, calculate: initCalculate, summary: initSummary, contact: initContact };
  if (inits[page]) inits[page]();
=======
function calculateQuote() {
  const count = bookingCart.length;
  const subtotal = bookingCart.reduce(function(sum, item) {
    return sum + item.price;
  }, 0);
  var rate = getDiscountRate(count);
  var discountAmount = Math.round(subtotal * rate);
  var total = subtotal - discountAmount;
  return {
    count: count,
    subtotal: subtotal,
    rate: rate,
    discountAmount: discountAmount,
    total: total
  };
}

// ===== FORMAT CURRENCY =====
function formatZAR(amount) {
  return "R " + amount.toLocaleString('en-ZA');
}

// ===== RENDER PACKAGES =====
function renderPackages() {
  var grid = document.getElementById("packagesGrid");
  var html = "";
  for (var i = 0; i < PACKAGES.length; i++) {
    var pkg = PACKAGES[i];
    var isInCart = bookingCart.some(function(item) { return item.id === pkg.id; });
    html += '<div class="package-card">' +
      '<span class="price-badge">' + formatZAR(pkg.price) + '</span>' +
      '<div class="package-icon">' + pkg.icon + '</div>' +
      '<h3 class="package-name">' + pkg.name + '</h3>' +
      '<p class="package-desc">' + pkg.desc + '</p>' +
      '<ul class="package-features">';
    for (var j = 0; j < pkg.features.length; j++) {
      html += '<li>' + pkg.features[j] + '</li>';
    }
    html += '</ul>' +
      '<button class="btn-add' + (isInCart ? ' added' : '') + '" onclick="addToBooking(' + pkg.id + ')"' +
      (isInCart ? ' disabled' : '') + '>' +
      (isInCart ? 'ADDED \u2713' : '+ ADD TO BOOKING') +
      '</button>' +
      '</div>';
  }
  grid.innerHTML = html;
}

// ===== ADD TO BOOKING =====
function addToBooking(id) {
  var pkg = PACKAGES.find(function(p) { return p.id === id; });
  if (!pkg) return;
  if (bookingCart.some(function(item) { return item.id === id; })) return;
  bookingCart.push({ id: pkg.id, name: pkg.name, price: pkg.price });
  renderPackages();
  renderBooking();
}

// ===== REMOVE FROM BOOKING =====
function removeFromBooking(id) {
  bookingCart = bookingCart.filter(function(item) { return item.id !== id; });
  renderPackages();
  renderBooking();
}

// ===== RENDER BOOKING LIST + QUOTATION =====
function renderBooking() {
  var listEl = document.getElementById("bookingList");
  var emptyEl = document.getElementById("bookingEmpty");

  if (bookingCart.length === 0) {
    listEl.innerHTML = '<div class="booking-empty">' +
      '<p>No packages selected yet.</p>' +
      '<p class="booking-empty-hint">Browse the packages above and click <strong>+ Add to Booking</strong>.</p>' +
      '</div>';
  } else {
    var html = "";
    for (var i = 0; i < bookingCart.length; i++) {
      var item = bookingCart[i];
      html += '<div class="booking-item">' +
        '<div class="booking-item-info">' +
        '<span class="booking-item-name">' + item.name + '</span>' +
        '<span class="booking-item-price">' + formatZAR(item.price) + '</span>' +
        '</div>' +
        '<button class="btn-remove" onclick="removeFromBooking(' + item.id + ')" aria-label="Remove">&times;</button>' +
        '</div>';
    }
    listEl.innerHTML = html;
  }

  // Update quotation
  var quote = calculateQuote();
  document.getElementById("quoteSubtotal").textContent = formatZAR(quote.subtotal);
  document.getElementById("quoteCount").textContent = quote.count;
  document.getElementById("quoteDiscountRate").textContent = (quote.rate * 100) + "%";
  document.getElementById("quoteDiscountAmount").textContent = "- " + formatZAR(quote.discountAmount);
  document.getElementById("quoteTotal").textContent = formatZAR(quote.total);

  // Hide confirmation when cart changes
  var msg = document.getElementById("confirmationMsg");
  msg.classList.remove("show", "success", "warn");
}

// ===== REQUEST BOOKING =====
function requestBooking() {
  var msg = document.getElementById("confirmationMsg");
  if (bookingCart.length === 0) {
    msg.className = "confirmation-msg show warn";
    msg.textContent = "Please add at least one package before requesting a booking.";
    return;
  }
  var quote = calculateQuote();
  msg.className = "confirmation-msg show success";
  msg.innerHTML = "Booking request confirmed!<br/>" + quote.count + " package(s) &middot; " +
    formatZAR(quote.subtotal) + " &rarr; <strong>" + formatZAR(quote.total) + "</strong> " +
    "(Saved " + formatZAR(quote.discountAmount) + ")<br/>We will contact you shortly to finalize.";
}

// ===== NAVIGATION =====
function scrollToSection(id) {
  var el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
    // Close mobile menu if open
    var nav = document.getElementById("nav");
    if (nav.classList.contains("open")) {
      nav.classList.remove("open");
    }
  }
}

function toggleMenu() {
  var nav = document.getElementById("nav");
  nav.classList.toggle("open");
}

// ===== TRAILER MODAL =====
function openTrailer() {
  document.getElementById("trailerModal").classList.add("active");
}

function closeTrailer() {
  document.getElementById("trailerModal").classList.remove("active");
}

// Close modal on Escape key
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    closeTrailer();
  }
});

// ===== INIT =====
document.addEventListener("DOMContentLoaded", function() {
  renderPackages();
  renderBooking();
>>>>>>> c1f3f9865c987b8961c8b1063dc54a45e27153c3
});
