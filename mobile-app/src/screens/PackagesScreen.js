import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import PackageCard from '../components/PackageCard';
import { SectionTitle, Button } from '../components/ui';
import { COLORS } from '../theme';
import { PACKAGES } from '../data';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'package', label: 'Packages' },
  { key: 'individual', label: 'Individual' },
];

export default function PackagesScreen({ navigate, cart, toggleCart }) {
  const [filter, setFilter] = useState('all');
  const data = filter === 'all' ? PACKAGES : PACKAGES.filter((p) => p.type === filter);

  return (
    <FlatList
      data={data}
      keyExtractor={(i) => i.id}
      contentContainerStyle={{ padding: 16, paddingBottom: 30 }}
      ListHeaderComponent={
        <View>
          <SectionTitle sub="Choose the perfect experience for you">Gaming Packages</SectionTitle>
          <View style={s.tabs}>
            {FILTERS.map((f) => (
              <TouchableOpacity key={f.key} onPress={() => setFilter(f.key)} style={[s.tab, filter === f.key && s.tabOn]}>
                <Text style={[s.tabText, filter === f.key && s.tabTextOn]}>{f.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      }
      renderItem={({ item }) => (
        <PackageCard
          item={item}
          selected={cart.includes(item.id)}
          onToggle={toggleCart}
          onDetails={(p) => navigate('Detail', { id: p.id })}
        />
      )}
      ListFooterComponent={
        <Button
          label={cart.length ? `CALCULATE FEES (${cart.length} SELECTED)` : 'CALCULATE FEES'}
          onPress={() => navigate('Fees')}
          style={{ marginTop: 6 }}
        />
      }
    />
  );
}

const s = StyleSheet.create({
  tabs: { flexDirection: 'row', backgroundColor: COLORS.card, borderRadius: 12, padding: 4, marginBottom: 16 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 9 },
  tabOn: { backgroundColor: COLORS.cyan },
  tabText: { color: COLORS.grey, fontWeight: '700', fontSize: 13 },
  tabTextOn: { color: COLORS.navy, fontWeight: '800' },
});
