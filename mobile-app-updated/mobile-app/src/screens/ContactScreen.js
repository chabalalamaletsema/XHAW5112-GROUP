import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, Alert, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Button, SectionTitle, Card, Field } from '../components/ui';
import { COLORS } from '../theme';
import { BUSINESS } from '../data';
import { isValidName, isValidEmail, isValidPhone } from '../utils/pricing';

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '' };

export default function ContactScreen() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const set = (k, v) => {
    setForm({ ...form, [k]: v });
    if (errors[k]) setErrors({ ...errors, [k]: undefined });
  };

  const send = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    else if (!isValidName(form.name)) e.name = 'Name can only contain letters.';
    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!isValidEmail(form.email)) e.email = 'Enter a valid email address.';
    if (form.phone.trim() && !isValidPhone(form.phone)) e.phone = 'Use 10 digits or +27 format.';
    if (!form.subject.trim()) e.subject = 'Please add a subject.';
    if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters.';
    setErrors(e);
    if (Object.keys(e).length === 0) {
      Alert.alert('Message Sent', `Thanks ${form.name.trim().split(' ')[0]}! We will get back to you soon.`);
      setForm(EMPTY);
    }
  };

  const link = (url) => Linking.openURL(url).catch(() => Alert.alert('Unable to open link'));

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <SectionTitle sub="We'd love to hear from you">Contact Us</SectionTitle>

        <Card>
          <TouchableOpacity style={s.row} onPress={() => link('tel:' + BUSINESS.phone.replace(/\s/g, ''))}>
            <Text style={s.icon}>📞</Text><Text style={s.text}>{BUSINESS.phone}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.row} onPress={() => link('mailto:' + BUSINESS.email)}>
            <Text style={s.icon}>✉️</Text><Text style={s.text}>{BUSINESS.email}</Text>
          </TouchableOpacity>
          <View style={s.row}><Text style={s.icon}>📍</Text><Text style={s.text}>{BUSINESS.address}</Text></View>
          <View style={s.row}><Text style={s.icon}>🕘</Text><Text style={s.text}>{BUSINESS.hours}</Text></View>
        </Card>

        <SectionTitle>Send Us a Message</SectionTitle>
        <Field label="NAME *" value={form.name} onChangeText={(v) => set('name', v)} error={errors.name} autoCapitalize="words" />
        <Field label="EMAIL *" value={form.email} onChangeText={(v) => set('email', v)} error={errors.email} keyboardType="email-address" autoCapitalize="none" />
        <Field label="PHONE (OPTIONAL)" value={form.phone} onChangeText={(v) => set('phone', v)} error={errors.phone} keyboardType="phone-pad" />
        <Field label="SUBJECT *" value={form.subject} onChangeText={(v) => set('subject', v)} error={errors.subject} />
        <Field label="MESSAGE *" value={form.message} onChangeText={(v) => set('message', v)} error={errors.message} multiline />
        <Button label="SEND MESSAGE" onPress={send} />

        <SectionTitle>Find Us</SectionTitle>
        <TouchableOpacity style={s.map} onPress={() => link(BUSINESS.mapUrl)} accessibilityLabel="Open location in maps">
          <Text style={{ fontSize: 40 }}>📍</Text>
          <Text style={s.mapTitle}>Next Level Gaming Arena</Text>
          <Text style={s.mapSub}>{BUSINESS.address}</Text>
          <Text style={s.mapLink}>TAP TO OPEN IN MAPS ›</Text>
        </TouchableOpacity>

        <Text style={s.followLabel}>FOLLOW US</Text>
        <View style={s.socials}>
          {BUSINESS.socials.map((so) => (
            <TouchableOpacity key={so.id} onPress={() => link(so.url)} style={s.socialBtn}>
              <Text style={s.socialText}>{so.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 9 },
  icon: { fontSize: 18, width: 34 },
  text: { color: COLORS.white, fontSize: 14, flex: 1 },
  map: { backgroundColor: COLORS.cardAlt, borderRadius: 16, borderWidth: 1, borderColor: COLORS.cyan, padding: 22, alignItems: 'center' },
  mapTitle: { color: COLORS.white, fontWeight: '800', fontSize: 15, marginTop: 8 },
  mapSub: { color: COLORS.grey, fontSize: 12, marginTop: 4, textAlign: 'center' },
  mapLink: { color: COLORS.cyan, fontWeight: '800', fontSize: 12, marginTop: 12, letterSpacing: 1 },
  followLabel: { color: COLORS.grey, fontSize: 12, fontWeight: '700', letterSpacing: 2, marginTop: 22, textAlign: 'center' },
  socials: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  socialBtn: { borderWidth: 1, borderColor: COLORS.cyan, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7, marginHorizontal: 5 },
  socialText: { color: COLORS.cyan, fontSize: 12, fontWeight: '700' },
});
