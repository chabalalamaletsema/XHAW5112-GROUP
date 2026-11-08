import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Button, SectionTitle, Card } from '../components/ui';
import { COLORS, RADIUS } from '../theme';
import { SERVICES, LEADERS } from '../data';

export default function AboutScreen({ navigate }) {
  return (
    <ScrollView contentContainerStyle={s.content}>
      <View style={s.banner}>
        <Text style={s.bannerTitle}>About Us</Text>
        <Text style={s.bannerSub}>Our Story, Mission & Vision</Text>
      </View>

      <SectionTitle>Our Story</SectionTitle>
      <Text style={s.body}>
        Next Level Gaming & Esports Arena was founded by Jason Naidoo in Johannesburg in 2023. We bring modern gaming
        technology, tournaments and social gaming experiences together under one roof, for individual gamers, families,
        birthday groups, schools, gaming clubs and corporate clients.
      </Text>

      <SectionTitle>Mission & Vision</SectionTitle>
      <Card>
        <Text style={s.cardHead}>🎯 Our Mission</Text>
        <Text style={s.body}>To provide an inclusive, competitive and exciting gaming environment for everyone.</Text>
      </Card>
      <Card>
        <Text style={s.cardHead}>🚀 Our Vision</Text>
        <Text style={s.body}>To be Africa's leading esports and gaming entertainment destination.</Text>
      </Card>

      <SectionTitle>Our Services</SectionTitle>
      <View style={s.grid}>
        {SERVICES.map((sv) => (
          <View key={sv.id} style={s.service}>
            <Text style={{ fontSize: 26 }}>{sv.icon}</Text>
            <Text style={s.serviceLabel}>{sv.label}</Text>
          </View>
        ))}
      </View>

      <SectionTitle>Our Leadership</SectionTitle>
      {LEADERS.map((l) => (
        <Card key={l.id} style={s.leader}>
          <View style={s.avatar}><Text style={s.avatarText}>{l.name.charAt(0)}</Text></View>
          <View>
            <Text style={s.leaderName}>{l.name}</Text>
            <Text style={s.leaderRole}>{l.role}</Text>
          </View>
        </Card>
      ))}

      <Button label="EXPLORE PACKAGES" onPress={() => navigate('Packages')} style={{ marginTop: 16 }} />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  content: { padding: 16, paddingBottom: 30 },
  banner: { backgroundColor: COLORS.purple, borderRadius: 18, padding: 26, alignItems: 'center' },
  bannerTitle: { color: COLORS.white, fontSize: 28, fontWeight: '900' },
  bannerSub: { color: COLORS.white, opacity: 0.85, marginTop: 4, fontSize: 13 },
  body: { color: COLORS.grey, fontSize: 14, lineHeight: 21 },
  cardHead: { color: COLORS.cyan, fontWeight: '800', fontSize: 15, marginBottom: 6 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  service: { width: '48%', backgroundColor: COLORS.card, borderRadius: RADIUS, borderWidth: 1, borderColor: COLORS.line, paddingVertical: 18, alignItems: 'center', marginBottom: 12 },
  serviceLabel: { color: COLORS.white, fontWeight: '700', fontSize: 13, marginTop: 6 },
  leader: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: COLORS.cyan, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  avatarText: { color: COLORS.navy, fontWeight: '900', fontSize: 18 },
  leaderName: { color: COLORS.white, fontWeight: '800', fontSize: 15 },
  leaderRole: { color: COLORS.grey, fontSize: 12, marginTop: 2 },
});
