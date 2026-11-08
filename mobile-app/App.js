import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';

// ============================================
// NXT LEVEL GAMING ESCAPE - React Native Expo App
// XHAW5112 University Project
// Booking cart + discount logic (MO03)
// ============================================

// ===== COLORS (from PowerPoint) =====
const COLORS = {
  bgDark: '#0B0B0B',
  greenHeader: '#000000',
  greenAccent: '#2B2B2B',
  orangeCTA: '#FFFFFF',
  cyanNeon: '#D9D9D9',
  textWhite: '#FFFFFF',
  cardBg: '#171717',
  textGrey: '#C4C4C4',
  textDim: '#969696'
};

// ===== PACKAGE DATA =====
const PACKAGES = [
  {
    id: '1',
    name: 'Ultimate Gaming Day',
    price: 1500,
    icon: 'GAME',
    desc: 'Full day LAN, PC + Console, VR stations, Tournaments + Snacks.',
    features: ['Full-day access (8 hrs)', 'PC + Console + VR', 'Tournament entry', 'Snacks & drinks included'],
  },
  {
    id: '2',
    name: 'Family Game Night',
    price: 1500,
    icon: 'FAM',
    desc: 'Co-op + Board Games, up to 6 players, pizza included.',
    features: ['Up to 6 players', 'Co-op & board games', 'Pizza included', '3-hour session'],
  },
  {
    id: '3',
    name: 'VR Arena Adventure',
    price: 750,
    icon: 'VR',
    desc: 'Immersive VR, multiplayer, 60-min session, all gear provided.',
    features: ['60-minute session', 'Multiplayer VR', 'All gear provided', 'Free-roam arena'],
  },
  {
    id: '4',
    name: 'E-Sports Tournament Entry',
    price: 600,
    icon: 'ESP',
    desc: 'Competitive play, prize pool, teams and solo entries welcome.',
    features: ['Competitive brackets', 'Prize pool', 'Teams & solo entry', 'Live leaderboard'],
  },
  {
    id: '5',
    name: 'Streaming & Content Creation',
    price: 800,
    icon: 'STR',
    desc: 'Pro studio, overlay & mic, 2-hour streaming slot.',
    features: ['2-hour studio slot', 'Pro overlay & mic', 'Multi-cam setup', 'Recording included'],
  },
];

// ===== DISCOUNT RULE (MO03) =====
// 1 booking = 0%, 2 = 5%, 3 = 10%, 4+ = 15%
function getDiscountRate(count) {
  if (count >= 4) return 0.15;
  if (count === 3) return 0.10;
  if (count === 2) return 0.05;
  return 0;
}

function calculateQuote(cart) {
  const count = cart.length;
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const rate = getDiscountRate(count);
  const discountAmount = Math.round(subtotal * rate);
  const total = subtotal - discountAmount;
  return { count, subtotal, rate, discountAmount, total };
}

function formatZAR(amount) {
  return 'R ' + amount.toLocaleString('en-ZA');
}

// ===== MAIN APP =====
export default function App() {
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState('Packages');

  const addToCart = useCallback((pkg) => {
    setCart((prev) => {
      if (prev.some((item) => item.id === pkg.id)) return prev;
      return [...prev, { id: pkg.id, name: pkg.name, price: pkg.price }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const isInCart = useCallback((id) => cart.some((item) => item.id === id), [cart]);

  const requestBooking = () => {
    if (cart.length === 0) {
      Alert.alert('No Packages', 'Please add at least one package before requesting a booking.');
      return;
    }
    const quote = calculateQuote(cart);
    Alert.alert(
      'Booking Confirmed!',
      `${quote.count} package(s)\n${formatZAR(quote.subtotal)} → ${formatZAR(quote.total)}\nYou saved ${formatZAR(quote.discountAmount)}!\n\nWe will contact you shortly to finalize.`,
      [{ text: 'OK' }]
    );
  };

  const renderPackageCard = ({ item }) => {
    const added = isInCart(item.id);
    return (
      <View style={styles.card}>
        <View style={styles.cardBadge}>
          <Text style={styles.cardBadgeText}>{formatZAR(item.price)}</Text>
        </View>
        <Text style={styles.cardIcon}>{item.icon}</Text>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardDesc}>{item.desc}</Text>
        {item.features.map((feat, idx) => (
          <Text key={idx} style={styles.cardFeature}>▸ {feat}</Text>
        ))}
        <TouchableOpacity
          style={[styles.addButton, added && styles.addButtonAdded]}
          onPress={() => addToCart(item)}
          disabled={added}
        >
          <Text style={styles.addButtonText}>
            {added ? 'ADDED ✓' : '+ ADD TO BOOKING'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <View style={styles.cartItemInfo}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>{formatZAR(item.price)}</Text>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
        <Text style={styles.removeButtonText}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  const quote = calculateQuote(cart);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.greenHeader} />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>NXT LEVEL</Text>
        <Text style={styles.headerSub}>GAMING ESCAPE</Text>
      </View>

      {/* CONTENT */}
      <FlatList
        data={activeTab === 'Cart' ? cart : PACKAGES}
        keyExtractor={(item) => item.id}
        renderItem={activeTab === 'Cart' ? renderCartItem : renderPackageCard}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          activeTab === 'Cart' ? (
            <Text style={styles.sectionHeading}>YOUR BOOKING</Text>
          ) : (
            <View>
              <Text style={styles.heroTitle}>
                Enter the <Text style={styles.heroHighlight}>Game</Text>.{'\n'}Escape Reality.
              </Text>
              <Text style={styles.heroSubtitle}>
                South Africa's premier esports arena, VR lounge, and gaming destination.
              </Text>
              <Text style={styles.sectionHeading}>GAMING PACKAGES</Text>
            </View>
          )
        }
        ListFooterComponent={
          <View>
            {/* QUOTATION SUMMARY */}
            <View style={styles.quotationBox}>
              <Text style={styles.quotationTitle}>QUOTATION SUMMARY</Text>

              <View style={styles.quoteRow}>
                <Text style={styles.quoteLabel}>Subtotal</Text>
                <Text style={styles.quoteValue}>{formatZAR(quote.subtotal)}</Text>
              </View>
              <View style={styles.quoteRow}>
                <Text style={styles.quoteLabel}>Bookings Count</Text>
                <Text style={styles.quoteValue}>{quote.count}</Text>
              </View>
              <View style={styles.quoteRow}>
                <Text style={styles.quoteLabel}>Discount Rate</Text>
                <Text style={styles.quoteValue}>{(quote.rate * 100)}%</Text>
              </View>
              <View style={styles.quoteRow}>
                <Text style={styles.quoteLabel}>Discount Amount</Text>
                <Text style={[styles.quoteValue, { color: '#ff6b6b' }]}>-{formatZAR(quote.discountAmount)}</Text>
              </View>

              <View style={styles.quoteDivider} />

              <View style={styles.quoteTotalRow}>
                <Text style={styles.quoteTotalLabel}>TOTAL QUOTE</Text>
                <Text style={styles.quoteTotal}>{formatZAR(quote.total)}</Text>
              </View>

              <Text style={styles.discountRule}>
                Discount Rule:{'\n'}
                1 = 0% · 2 = 5% · 3 = 10% · 4+ = 15%
              </Text>

              <TouchableOpacity style={styles.requestButton} onPress={requestBooking}>
                <Text style={styles.requestButtonText}>REQUEST BOOKING</Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: 30 }} />
          </View>
        }
      />

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        {['Explore', 'Packages', 'Cart', 'Profile'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.navItem}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.navText,
                activeTab === tab && styles.navTextActive,
              ]}
            >
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.navIndicator} />}
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

// ===== STYLES =====
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  header: {
    backgroundColor: COLORS.greenHeader,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: COLORS.cyanNeon,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.cyanNeon,
    letterSpacing: 2,
  },
  headerSub: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textWhite,
    letterSpacing: 4,
  },
  listContent: {
    padding: 16,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.textWhite,
    textAlign: 'center',
    lineHeight: 34,
    marginTop: 10,
    marginBottom: 10,
  },
  heroHighlight: {
    color: COLORS.cyanNeon,
  },
  heroSubtitle: {
    fontSize: 13,
    color: COLORS.textGrey,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textWhite,
    letterSpacing: 2,
    marginBottom: 16,
    marginTop: 8,
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 2,
    borderColor: COLORS.cyanNeon,
    borderRadius: 12,
    padding: 18,
    marginBottom: 16,
    position: 'relative',
  },
  cardBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: COLORS.orangeCTA,
          borderWidth: 1,
          borderColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  cardBadgeText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '800',
  },
  cardIcon: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.cyanNeon,
    marginBottom: 8,
    letterSpacing: 2,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textWhite,
    marginBottom: 6,
    paddingRight: 80,
  },
  cardDesc: {
    fontSize: 12,
    color: COLORS.textGrey,
    marginBottom: 10,
    lineHeight: 18,
  },
  cardFeature: {
    fontSize: 11,
    color: COLORS.textDim,
    marginBottom: 3,
  },
  addButton: {
    backgroundColor: COLORS.orangeCTA,
          borderWidth: 1,
          borderColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 6,
  },
  addButtonAdded: {
    backgroundColor: COLORS.greenAccent,
  },
  addButtonText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
  },
  // Cart items
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardBg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.18)',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textWhite,
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.orangeCTA,
  },
  removeButton: {
    width: 34,
    height: 34,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ff4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: '#ff4444',
    fontSize: 14,
    fontWeight: '700',
  },
  // Quotation
  quotationBox: {
    backgroundColor: COLORS.cardBg,
    borderWidth: 2,
    borderColor: COLORS.cyanNeon,
    borderRadius: 12,
    padding: 20,
    marginTop: 8,
  },
  quotationTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.cyanNeon,
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.18)',
  },
  quoteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  quoteLabel: {
    fontSize: 13,
    color: COLORS.textGrey,
  },
  quoteValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textWhite,
  },
  quoteDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.18)',
    marginVertical: 12,
  },
  quoteTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  quoteTotalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textWhite,
    letterSpacing: 1,
  },
  quoteTotal: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.cyanNeon,
  },
  discountRule: {
    marginTop: 16,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    fontSize: 11,
    color: COLORS.textDim,
    textAlign: 'center',
    lineHeight: 18,
  },
  requestButton: {
    backgroundColor: COLORS.orangeCTA,
          borderWidth: 1,
          borderColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 14,
  },
  requestButtonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
  // Bottom nav
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: COLORS.greenHeader,
    borderTopWidth: 2,
    borderTopColor: COLORS.cyanNeon,
    paddingVertical: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 4,
  },
  navText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textGrey,
  },
  navTextActive: {
    color: COLORS.cyanNeon,
    fontWeight: '700',
  },
  navIndicator: {
    width: 24,
    height: 3,
    backgroundColor: COLORS.cyanNeon,
    borderRadius: 2,
    marginTop: 4,
  },
});
