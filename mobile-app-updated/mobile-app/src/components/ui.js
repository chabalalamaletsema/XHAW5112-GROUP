import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, RADIUS } from '../theme';

export function Button({ label, onPress, variant = 'primary', disabled, style }) {
  const v = variant === 'secondary' ? s.btnSecondary : variant === 'danger' ? s.btnDanger : s.btnPrimary;
  const t = variant === 'primary' ? s.btnTextDark : variant === 'danger' ? s.btnTextOrange : s.btnTextCyan;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[s.btn, v, disabled && { opacity: 0.5 }, style]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={[s.btnText, t]}>{label}</Text>
    </TouchableOpacity>
  );
}

export function SectionTitle({ children, sub }) {
  return (
    <View style={{ marginTop: 22, marginBottom: 12 }}>
      <Text style={s.sectionTitle}>{children}</Text>
      <View style={s.underline} />
      {sub ? <Text style={s.sectionSub}>{sub}</Text> : null}
    </View>
  );
}

export function Card({ children, style }) {
  return <View style={[s.card, style]}>{children}</View>;
}

export function Field({ label, error, multiline, ...props }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={s.label}>{label}</Text>
      <TextInput
        placeholderTextColor={COLORS.grey}
        style={[s.input, multiline && { height: 110, textAlignVertical: 'top' }, error && { borderColor: COLORS.orange }]}
        multiline={multiline}
        {...props}
      />
      {error ? <Text style={s.error}>⚠ {error}</Text> : null}
    </View>
  );
}

export function Row({ label, value, valueStyle, bold }) {
  return (
    <View style={s.row}>
      <Text style={[s.rowLabel, bold && { color: COLORS.white, fontWeight: '800' }]}>{label}</Text>
      <Text style={[s.rowValue, bold && { fontSize: 20, color: COLORS.cyan, fontWeight: '800' }, valueStyle]}>{value}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  btn: { paddingVertical: 14, paddingHorizontal: 18, borderRadius: 10, alignItems: 'center', justifyContent: 'center', minHeight: 48 },
  btnPrimary: { backgroundColor: COLORS.cyan },
  btnSecondary: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: COLORS.cyan },
  btnDanger: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: COLORS.orange },
  btnText: { fontSize: 14, fontWeight: '800', letterSpacing: 0.8 },
  btnTextDark: { color: COLORS.navy },
  btnTextCyan: { color: COLORS.cyan },
  btnTextOrange: { color: COLORS.orange },
  sectionTitle: { color: COLORS.white, fontSize: 19, fontWeight: '800', letterSpacing: 0.5 },
  underline: { width: 44, height: 3, backgroundColor: COLORS.cyan, borderRadius: 2, marginTop: 6 },
  sectionSub: { color: COLORS.grey, fontSize: 13, marginTop: 8 },
  card: { backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.line, borderRadius: RADIUS, padding: 16, marginBottom: 12 },
  label: { color: COLORS.grey, fontSize: 12, fontWeight: '700', marginBottom: 6, letterSpacing: 0.5 },
  input: { backgroundColor: COLORS.cardAlt, color: COLORS.white, borderRadius: 10, borderWidth: 1, borderColor: COLORS.line, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15 },
  error: { color: COLORS.orange, fontSize: 12, marginTop: 5 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingVertical: 6 },
  rowLabel: { color: COLORS.grey, fontSize: 14 },
  rowValue: { color: COLORS.white, fontSize: 14, fontWeight: '600' },
});
