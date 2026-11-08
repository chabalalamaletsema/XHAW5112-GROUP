import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../theme';

export const TABS = [
  { key: 'Home', icon: '🏠', label: 'Home' },
  { key: 'About', icon: 'ℹ️', label: 'About' },
  { key: 'Packages', icon: '🎮', label: 'Packages' },
  { key: 'Fees', icon: '🧮', label: 'Fees' },
  { key: 'Contact', icon: '✉️', label: 'Contact' },
];

export default function BottomNav({ active, onNavigate }) {
  return (
    <View style={s.nav}>
      {TABS.map((t) => {
        const on = active === t.key;
        return (
          <TouchableOpacity key={t.key} style={s.item} onPress={() => onNavigate(t.key)} accessibilityRole="button" accessibilityLabel={t.label}>
            <Text style={[s.icon, !on && { opacity: 0.55 }]}>{t.icon}</Text>
            <Text style={[s.label, on && s.labelOn]}>{t.label}</Text>
            {on ? <View style={s.bar} /> : null}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  nav: { flexDirection: 'row', backgroundColor: COLORS.navy, borderTopWidth: 2, borderTopColor: COLORS.cyan, paddingTop: 8, paddingBottom: 10 },
  item: { flex: 1, alignItems: 'center' },
  icon: { fontSize: 18 },
  label: { color: COLORS.grey, fontSize: 11, fontWeight: '600', marginTop: 2 },
  labelOn: { color: COLORS.cyan, fontWeight: '800' },
  bar: { width: 22, height: 3, borderRadius: 2, backgroundColor: COLORS.cyan, marginTop: 4 },
});
