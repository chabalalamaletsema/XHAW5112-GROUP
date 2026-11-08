import React, { useState, useCallback, useEffect } from 'react';
import { View, StatusBar, SafeAreaView, BackHandler, Platform, StyleSheet } from 'react-native';
import Header from './src/components/Header';
import BottomNav from './src/components/BottomNav';
import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import PackagesScreen from './src/screens/PackagesScreen';
import DetailScreen from './src/screens/DetailScreen';
import FeesScreen from './src/screens/FeesScreen';
import SummaryScreen from './src/screens/SummaryScreen';
import ContactScreen from './src/screens/ContactScreen';
import { COLORS } from './src/theme';

// ============================================
// NEXT LEVEL GAMING & ESPORTS ARENA - React Native (Expo)
// XHAW5112 Task 2 - Phase 2: Mobile Application
// Pages: Home, About, Packages, Detail, Calculate Fees, Summary, Contact
// ============================================

const TAB_KEYS = ['Home', 'About', 'Packages', 'Fees', 'Contact'];
const TAB_FOR = { Detail: 'Packages', Summary: 'Fees' };

export default function App() {
  const [stack, setStack] = useState([{ name: 'Home' }]);
  const [cart, setCart] = useState([]); // array of selected package ids
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '' });

  const route = stack[stack.length - 1];
  const activeTab = TAB_KEYS.includes(route.name) ? route.name : TAB_FOR[route.name];

  const navigate = useCallback((name, params) => {
    if (TAB_KEYS.includes(name)) setStack([{ name }]); // tabs reset the stack
    else setStack((prev) => [...prev, { name, params }]);
  }, []);

  const goBack = useCallback(() => {
    setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  // Android hardware back button
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (stack.length > 1) { goBack(); return true; }
      return false;
    });
    return () => sub.remove();
  }, [stack, goBack]);

  const toggleCart = useCallback((id) => {
    setCart((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const finishBooking = () => {
    setCart([]);
    setCustomer({ name: '', email: '', phone: '' });
    setStack([{ name: 'Home' }]);
  };

  const common = { navigate, cart, toggleCart };
  let screen;
  switch (route.name) {
    case 'About': screen = <AboutScreen navigate={navigate} />; break;
    case 'Packages': screen = <PackagesScreen {...common} />; break;
    case 'Detail': screen = <DetailScreen {...common} id={route.params && route.params.id} />; break;
    case 'Fees': screen = <FeesScreen {...common} customer={customer} setCustomer={setCustomer} />; break;
    case 'Summary': screen = <SummaryScreen cart={cart} customer={customer} navigate={navigate} onConfirm={finishBooking} />; break;
    case 'Contact': screen = <ContactScreen />; break;
    default: screen = <HomeScreen navigate={navigate} />;
  }

  return (
    <SafeAreaView style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />
      <Header
        canGoBack={stack.length > 1}
        onBack={goBack}
        onHome={() => navigate('Home')}
        cartCount={cart.length}
        onCart={() => navigate('Fees')}
      />
      <View style={{ flex: 1 }}>{screen}</View>
      <BottomNav active={activeTab} onNavigate={navigate} />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.navy, paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0 },
});
