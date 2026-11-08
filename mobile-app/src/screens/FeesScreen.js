import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Button, SectionTitle, Card, Field, Row } from '../components/ui';
import { COLORS } from '../theme';
import { PACKAGES } from '../data';
import { calculateQuote, formatZAR, validateCustomer, VAT_RATE } from '../utils/pricing';

export default function FeesScreen({ navigate, cart, toggleCart, customer, setCustomer }) {
  const [errors, setErrors] = useState({});
  const selected = PACKAGES.filter((p) => cart.includes(p.id)); // array of chosen items
  const q = calculateQuote(selected);

  const next = (q.count === 1) ? 'Add 1 more booking to get 5% off.'
    : q.count === 2 ? 'Add 1 more booking to get 10% off.'
    : q.count === 3 ? 'Add 1 more booking to get 15% off.'
    : null;

  const update = (key, val) => {
    setCustomer({ ...customer, [key]: val });
    if (errors[key]) setErrors({ ...errors, [key]: undefined });
  };

  const getQuotation = () => {
    if (selected.length === 0) {
      setErrors({ cart: 'Please select at least one package or experience.' });
      return;
    }
    const e = validateCustomer(customer);
    setErrors(e);
    if (Object.keys(e).length === 0) navigate('Summary');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <SectionTitle sub="Select your packages and get an instant quote">Calculate Your Event</SectionTitle>

        {/* CHECKLIST */}
        <Card>
          <Text style={s.cardHead}>Select Packages</Text>
          {PACKAGES.map((p) => {
            const on = cart.includes(p.id);
            return (
              <TouchableOpacity key={p.id} style={s.item} onPress={() => toggleCart(p.id)} accessibilityRole="checkbox" accessibilityState={{ checked: on }}>
                <View style={[s.box, on && s.boxOn]}>{on ? <Text style={s.tick}>✓</Text> : null}</View>
                <Text style={s.itemName} numberOfLines={1}>{p.name}</Text>
                <Text style={s.itemPrice}>{formatZAR(p.price)}</Text>
              </TouchableOpacity>
            );
          })}
          {errors.cart ? <Text style={s.error}>⚠ {errors.cart}</Text> : null}
        </Card>

        {/* DISCOUNT BANNER */}
        <View style={s.discount}>
          <Text style={s.discountTitle}>🏷  {q.rate > 0 ? `${q.rate * 100}% Discount applied` : 'Booking Discounts'}</Text>
          <Text style={s.discountText}>
            {next || (q.rate === 0.15 ? 'You have the maximum discount!' : '2 bookings = 5%  ·  3 = 10%  ·  more than 3 = 15%')}
          </Text>
        </View>

        {/* INVOICE ESTIMATE */}
        <Card>
          <Text style={s.cardHead}>Invoice Estimate</Text>
          <Row label={`Subtotal (${q.count} selected)`} value={formatZAR(q.subtotal)} />
          <Row label={`Discount (${q.rate * 100}%)`} value={`-${formatZAR(q.discountAmount)}`} valueStyle={{ color: COLORS.lime }} />
          <Row label={`VAT (${VAT_RATE * 100}%)`} value={formatZAR(q.vat)} />
          <View style={s.divider} />
          <Row label="TOTAL" value={formatZAR(q.total)} bold />
        </Card>

        {/* CUSTOMER DETAILS */}
        <SectionTitle sub="We need these to prepare your quotation">Your Details</SectionTitle>
        <Field label="FULL NAME *" value={customer.name} onChangeText={(v) => update('name', v)} placeholder="e.g. Thabo Mokoena" error={errors.name} autoCapitalize="words" />
        <Field label="EMAIL *" value={customer.email} onChangeText={(v) => update('email', v)} placeholder="name@example.com" keyboardType="email-address" autoCapitalize="none" error={errors.email} />
        <Field label="PHONE *" value={customer.phone} onChangeText={(v) => update('phone', v)} placeholder="0821234567" keyboardType="phone-pad" error={errors.phone} />

        <Button label="GET QUOTATION" onPress={getQuotation} style={{ marginTop: 6 }} />
        <Button label="BROWSE PACKAGES" variant="secondary" onPress={() => navigate('Packages')} style={{ marginTop: 10 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  cardHead: { color: COLORS.cyan, fontWeight: '800', fontSize: 15, marginBottom: 8 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: COLORS.line },
  box: { width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: COLORS.grey, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  boxOn: { backgroundColor: COLORS.cyan, borderColor: COLORS.cyan },
  tick: { color: COLORS.navy, fontWeight: '900', fontSize: 14 },
  itemName: { flex: 1, color: COLORS.white, fontSize: 14 },
  itemPrice: { color: COLORS.grey, fontSize: 13, fontWeight: '700', marginLeft: 8 },
  error: { color: COLORS.orange, fontSize: 12, marginTop: 8 },
  discount: { backgroundColor: COLORS.green, borderRadius: 12, padding: 14, marginBottom: 12 },
  discountTitle: { color: COLORS.white, fontWeight: '800', fontSize: 14 },
  discountText: { color: COLORS.white, opacity: 0.9, fontSize: 12, marginTop: 4 },
  divider: { height: 1, backgroundColor: COLORS.line, marginVertical: 8 },
});
