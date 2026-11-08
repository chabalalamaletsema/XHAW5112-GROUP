import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { Button, SectionTitle, Card } from '../components/ui';
import { COLORS, RADIUS } from '../theme';
import { PACKAGES, TESTIMONIALS, BUSINESS } from '../data';
import { formatZAR } from '../utils/pricing';

export default function HomeScreen({ navigate }) {
  const featured = PACKAGES.filter((p) => p.type === 'package').slice(0, 4);
  return (
    <ScrollView contentContainerStyle={s.content}>
      {/* HERO */}
      <View style={s.hero}>
        <Image source={require('../../assets/logo.png')} style={s.heroLogo} />
        <Text style={s.heroTitle}>
          Next Level Gaming &{'\n'}<Text style={{ color: COLORS.cyan }}>Esports Arena</Text>
        </Text>
        <Text style={s.heroSub}>Johannesburg's premier gaming arena</Text>
        <Text style={s.motto}>{BUSINESS.tagline.toUpperCase()}</Text>
        <Button label="BOOK NOW" onPress={() => navigate('Fees')} style={{ alignSelf: 'stretch', marginTop: 16 }} />
        <Button label="VIEW PACKAGES" variant="secondary" onPress={() => navigate('Packages')} style={{ alignSelf: 'stretch', marginTop: 10 }} />
      </View>

      {/* FEATURED PACKAGES */}
      <SectionTitle sub="Tap a package to see what's included">Featured Packages</SectionTitle>
      <View style={s.grid}>
        {featured.map((p) => (
          <TouchableOpacity key={p.id} style={s.mini} onPress={() => navigate('Detail', { id: p.id })} accessibilityLabel={p.name}>
            <Text style={{ fontSize: 28 }}>{p.icon}</Text>
            <Text style={s.miniName} numberOfLines={2}>{p.name}</Text>
            <Text style={s.miniPrice}>{formatZAR(p.price)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* TESTIMONIALS */}
      <SectionTitle>What Our Players Say</SectionTitle>
      {TESTIMONIALS.map((t) => (
        <Card key={t.id}>
          <Text style={s.quote}>“{t.text}”</Text>
          <Text style={s.who}>— {t.name}</Text>
        </Card>
      ))}

      {/* FOOTER */}
      <View style={s.footer}>
        <Text style={s.footerTitle}>{BUSINESS.name}</Text>
        <Text style={s.footerText}>{BUSINESS.address}</Text>
        <Text style={s.footerText}>{BUSINESS.hours}</Text>
        <View style={s.socials}>
          {BUSINESS.socials.map((so) => (
            <TouchableOpacity key={so.id} onPress={() => Linking.openURL(so.url)} style={s.socialBtn}>
              <Text style={s.socialText}>{so.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  content: { padding: 16, paddingBottom: 30 },
  hero: { backgroundColor: COLORS.card, borderRadius: 18, borderWidth: 1, borderColor: COLORS.cyan, padding: 22, alignItems: 'center' },
  heroLogo: { width: 96, height: 96, borderRadius: 22, marginBottom: 14 },
  heroTitle: { color: COLORS.white, fontSize: 25, fontWeight: '900', textAlign: 'center', lineHeight: 33 },
  heroSub: { color: COLORS.grey, fontSize: 14, marginTop: 8, textAlign: 'center' },
  motto: { color: COLORS.lime, fontSize: 12, fontWeight: '800', letterSpacing: 4, marginTop: 10 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  mini: { width: '48%', backgroundColor: COLORS.card, borderRadius: RADIUS, borderWidth: 1, borderColor: COLORS.line, padding: 14, marginBottom: 12, minHeight: 130 },
  miniName: { color: COLORS.white, fontWeight: '700', fontSize: 13, marginTop: 8, flex: 1 },
  miniPrice: { color: COLORS.cyan, fontWeight: '800', fontSize: 14, marginTop: 6 },
  quote: { color: COLORS.white, fontSize: 14, fontStyle: 'italic', lineHeight: 20 },
  who: { color: COLORS.cyan, fontSize: 12, fontWeight: '700', marginTop: 8 },
  footer: { marginTop: 24, padding: 16, borderRadius: RADIUS, backgroundColor: COLORS.cardAlt, alignItems: 'center' },
  footerTitle: { color: COLORS.white, fontWeight: '800', fontSize: 14, marginBottom: 6, textAlign: 'center' },
  footerText: { color: COLORS.grey, fontSize: 12, marginTop: 2, textAlign: 'center' },
  socials: { flexDirection: 'row', marginTop: 14 },
  socialBtn: { borderWidth: 1, borderColor: COLORS.cyan, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7, marginHorizontal: 5 },
  socialText: { color: COLORS.cyan, fontSize: 12, fontWeight: '700' },
});
