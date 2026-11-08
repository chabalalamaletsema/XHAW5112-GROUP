import React, { useMemo } from 'react';
import { View, Text, ScrollView, Alert, StyleSheet } from 'react-native';
import { Button, SectionTitle, Card, Row } from '../components/ui';
import { COLORS } from '../theme';
import { PACKAGES } from '../data';
import { calculateQuote, formatZAR, VAT_RATE } from '../utils/pricing';

export default function SummaryScreen({ cart, customer, navigate, onConfirm }) {
  const items = PACKAGES.filter((p) => cart.includes(p.id));
  const q = calculateQuote(items);
  const ref = useMemo(() => 'NL-' + Date.now().toString().slice(-6), []);

  if (items.length === 0) {
    return (
      <View style={s.empty}>
        <Text style={{ fontSize: 48 }}>🧾</Text>
        <Text style={s.emptyText}>No bookings selected yet.</Text>
        <Button label="CALCULATE FEES" onPress={() => navigate('Fees')} style={{ marginTop: 16, alignSelf: 'stretch' }} />
      </View>
    );
  }

  const confirm = () => {
    Alert.alert(
      'Booking Request Sent!',
      `Reference: ${ref}\nTotal: ${formatZAR(q.total)}\n\nThank you, ${customer.name.trim().split(' ')[0]}. Our consultant will contact you shortly to confirm your booking.`,
      [{ text: 'OK', onPress: onConfirm }]
    );
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <SectionTitle sub={`Quotation reference ${ref}`}>Booking Summary</SectionTitle>

      <Card>
        <Text style={s.head}>Customer</Text>
        <Text style={s.line}>{customer.name}</Text>
        <Text style={s.line}>{customer.email}</Text>
        <Text style={s.line}>{customer.phone}</Text>
      </Card>

      <Card>
        <Text style={s.head}>Invoice</Text>
        {items.map((it) => (
          <Row key={it.id} label={it.name} value={formatZAR(it.price)} />
        ))}
        <View style={s.divider} />
        <Row label="Subtotal" value={formatZAR(q.subtotal)} />
        <Row label={`Discount (${q.rate * 100}%)`} value={`-${formatZAR(q.discountAmount)}`} valueStyle={{ color: COLORS.lime }} />
        <Row label="Amount after discount" value={formatZAR(q.afterDiscount)} />
        <Row label={`VAT (${VAT_RATE * 100}%)`} value={formatZAR(q.vat)} />
        <View style={s.divider} />
        <Row label="TOTAL" value={formatZAR(q.total)} bold />
      </Card>

      <Button label="CONFIRM BOOKING REQUEST" onPress={confirm} />
      <Button label="EDIT SELECTION" variant="secondary" onPress={() => navigate('Fees')} style={{ marginTop: 10 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  emptyText: { color: COLORS.grey, fontSize: 15, marginTop: 10 },
  head: { color: COLORS.cyan, fontWeight: '800', fontSize: 15, marginBottom: 8 },
  line: { color: COLORS.white, fontSize: 14, paddingVertical: 2 },
  divider: { height: 1, backgroundColor: COLORS.line, marginVertical: 8 },
});
