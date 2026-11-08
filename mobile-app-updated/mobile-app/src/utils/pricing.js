// ===== DISCOUNT RULES (from the presentation) =====
// 1 booking = 0%, 2 = 5%, 3 = 10%, more than 3 = 15%. VAT = 15% added AFTER the discount.
export const VAT_RATE = 0.15;

export function getDiscountRate(count) {
  if (count > 3) return 0.15;
  if (count === 3) return 0.10;
  if (count === 2) return 0.05;
  return 0;
}

export function calculateQuote(items) {
  const count = items.length;
  let subtotal = 0;
  for (let i = 0; i < items.length; i++) subtotal += items[i].price;
  const rate = getDiscountRate(count);
  const discountAmount = subtotal * rate;
  const afterDiscount = subtotal - discountAmount;
  const vat = afterDiscount * VAT_RATE;
  const total = afterDiscount + vat;
  return { count, subtotal, rate, discountAmount, afterDiscount, vat, total };
}

export function formatZAR(amount) {
  const n = Number(amount) || 0;
  const [whole, dec] = n.toFixed(2).split('.');
  return 'R' + whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + dec;
}

// ===== VALIDATION =====
export const isValidName = (v) => /^[A-Za-zÀ-ÿ'’ -]{2,}$/.test(v.trim());
export const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
export const isValidPhone = (v) => {
  const d = v.replace(/[\s()-]/g, '');
  return /^0\d{9}$/.test(d) || /^\+27\d{9}$/.test(d);
};

export function validateCustomer({ name, email, phone }) {
  const errors = {};
  if (!name.trim()) errors.name = 'Please enter your full name.';
  else if (!isValidName(name)) errors.name = 'Name can only contain letters (min 2).';
  if (!email.trim()) errors.email = 'Please enter your email address.';
  else if (!isValidEmail(email)) errors.email = 'Enter a valid email, e.g. name@example.com.';
  if (!phone.trim()) errors.phone = 'Please enter your phone number.';
  else if (!isValidPhone(phone)) errors.phone = 'Use 10 digits (0821234567) or +27821234567.';
  return errors;
}
