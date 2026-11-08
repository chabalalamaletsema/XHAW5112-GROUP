import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../theme';

export default function Header({ canGoBack, onBack, onHome, cartCount, onCart }) {
  return (
    <View style={s.header}>
      <View style={s.side}>
        {canGoBack ? (
          <TouchableOpacity onPress={onBack} style={s.iconBtn} accessibilityLabel="Go back">
            <Text style={s.iconText}>‹</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <TouchableOpacity style={s.brand} onPress={onHome} accessibilityLabel="Go to home">
        <Image source={require('../../assets/logo.png')} style={s.logo} />
        <View>
          <Text style={s.title}>NEXT LEVEL</Text>
          <Text style={s.sub}>GAMING & ESPORTS</Text>
        </View>
      </TouchableOpacity>
      <View style={[s.side, { alignItems: 'flex-end' }]}>
        <TouchableOpacity onPress={onCart} style={s.iconBtn} accessibilityLabel="Open booking cart">
          <Text style={{ fontSize: 18 }}>🛒</Text>
          {cartCount > 0 ? (
            <View style={s.badge}><Text style={s.badgeText}>{cartCount}</Text></View>
          ) : null}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, backgroundColor: COLORS.navy, borderBottomWidth: 2, borderBottomColor: COLORS.cyan },
  side: { width: 48 },
  brand: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  logo: { width: 38, height: 38, borderRadius: 9, marginRight: 10 },
  title: { color: COLORS.cyan, fontSize: 16, fontWeight: '900', letterSpacing: 2 },
  sub: { color: COLORS.white, fontSize: 9, fontWeight: '700', letterSpacing: 3 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  iconText: { color: COLORS.cyan, fontSize: 32, lineHeight: 36, fontWeight: '300' },
  badge: { position: 'absolute', top: 0, right: 0, minWidth: 18, height: 18, borderRadius: 9, backgroundColor: COLORS.orange, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  badgeText: { color: COLORS.white, fontSize: 10, fontWeight: '800' },
});
