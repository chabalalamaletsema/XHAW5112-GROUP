/* ============================================
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
  if (count === 3) return 0.10;
  if (count === 2) return 0.05;
  return 0;
}

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
});
