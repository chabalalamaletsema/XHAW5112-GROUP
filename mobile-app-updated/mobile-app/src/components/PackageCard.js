import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from './ui';
import { COLORS, RADIUS } from '../theme';
import { formatZAR } from '../utils/pricing';

export default function PackageCard({ item, selected, onToggle, onDetails }) {
  return (
    <View style={[s.card, selected && { borderColor: COLORS.cyan }]}>
      <View style={s.top}>
        <Text style={s.icon}>{item.icon}</Text>
        <View style={s.price}><Text style={s.priceText}>{formatZAR(item.price)}</Text></View>
      </View>
      <Text style={s.tag}>{item.type === 'package' ? 'PACKAGE' : 'INDIVIDUAL EXPERIENCE'}</Text>
      <Text style={s.name}>{item.name}</Text>
      <Text style={s.desc}>{item.desc}</Text>
      <Text style={s.meta}>⏱ {item.duration}   ★ {item.rating}</Text>
      <View style={s.btns}>
        <Button label="VIEW DETAILS" variant="secondary" onPress={() => onDetails(item)} style={{ flex: 1, marginRight: 8 }} />
        <Button label={selected ? 'ADDED ✓' : '+ SELECT'} onPress={() => onToggle(item.id)} style={[{ flex: 1 }, selected && { backgroundColor: COLORS.green }]} />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: COLORS.card, borderWidth: 1.5, borderColor: COLORS.line, borderRadius: RADIUS, padding: 16, marginBottom: 14 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  icon: { fontSize: 30 },
  price: { backgroundColor: COLORS.orange, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 6 },
  priceText: { color: COLORS.white, fontWeight: '800', fontSize: 13 },
  tag: { color: COLORS.lime, fontSize: 10, fontWeight: '800', letterSpacing: 1.5, marginTop: 10 },
  name: { color: COLORS.white, fontSize: 17, fontWeight: '800', marginTop: 4 },
  desc: { color: COLORS.grey, fontSize: 13, lineHeight: 19, marginTop: 6 },
  meta: { color: COLORS.cyan, fontSize: 12, marginTop: 8, marginBottom: 12 },
  btns: { flexDirection: 'row' },
});
