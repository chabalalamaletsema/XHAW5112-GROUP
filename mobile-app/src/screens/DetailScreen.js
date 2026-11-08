import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button, SectionTitle, Card } from '../components/ui';
import PackageCard from '../components/PackageCard';
import { COLORS } from '../theme';
import { PACKAGES } from '../data';
import { formatZAR } from '../utils/pricing';

export default function DetailScreen({ id, navigate, cart, toggleCart }) {
  const item = PACKAGES.find((p) => p.id === id) || PACKAGES[0];
  const added = cart.includes(item.id);
  const related = PACKAGES.filter((p) => p.id !== item.id && p.type === item.type).slice(0, 2);

  return (
    <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 30 }}>
      <View style={s.hero}>
        <Text style={{ fontSize: 64 }}>{item.icon}</Text>
      </View>
      <Text style={s.name}>{item.name}</Text>
      <Text style={s.price}>{formatZAR(item.price)}</Text>
      <Text style={s.rating}>★ {item.rating}  ({item.reviews} reviews)   ⏱ {item.duration}</Text>

      <SectionTitle>Description</SectionTitle>
      <Text style={s.body}>{item.desc}</Text>

      <SectionTitle>Inclusions</SectionTitle>
      <Card>
        {item.features.map((f, i) => (
          <Text key={i} style={s.feature}><Text style={{ color: COLORS.lime }}>✓  </Text>{f}</Text>
        ))}
      </Card>

      <Button
        label={added ? 'REMOVE FROM BOOKING' : 'ADD TO BOOKING'}
        variant={added ? 'danger' : 'primary'}
        onPress={() => toggleCart(item.id)}
        style={{ marginTop: 6 }}
      />
      <Button label="GO TO FEE CALCULATOR" variant="secondary" onPress={() => navigate('Fees')} style={{ marginTop: 10 }} />

      {related.length > 0 && (
        <View>
          <SectionTitle>Related Offerings</SectionTitle>
          {related.map((r) => (
            <PackageCard key={r.id} item={r} selected={cart.includes(r.id)} onToggle={toggleCart} onDetails={(p) => navigate('Detail', { id: p.id })} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  hero: { height: 160, backgroundColor: COLORS.cardAlt, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: COLORS.cyan },
  name: { color: COLORS.white, fontSize: 24, fontWeight: '900', marginTop: 16 },
  price: { color: COLORS.cyan, fontSize: 24, fontWeight: '900', marginTop: 4 },
  rating: { color: COLORS.grey, fontSize: 13, marginTop: 6 },
  body: { color: COLORS.grey, fontSize: 14, lineHeight: 21 },
  feature: { color: COLORS.white, fontSize: 14, paddingVertical: 5 },
});
