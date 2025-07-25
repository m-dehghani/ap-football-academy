import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  Image,
  Switch
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// Mock user data
const mockUser = {
  id: 1,
  firstName: 'احمد',
  lastName: 'محمدی',
  email: 'ahmad@example.com',
  phone: '۰۹۱۲۳۴۵۶۷۸۹',
  age: 16,
  registrationDate: '۱۴۰۲/۰۵/۱۵',
  program: 'برنامه نوجوانان (۱۳-۱۷ سال)',
  coach: 'مربی علی احمدی',
  avatar: null,
  stats: {
    totalSessions: 24,
    completedSessions: 22,
    averageScore: 8.5,
    nextSession: '۱۴۰۲/۰۸/۲۰'
  }
};

export default function ProfileScreen() {
  const [user] = useState(mockUser);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigation = useNavigation();

  const ProfileHeader = () => (
    <View style={styles.header}>
      <View style={styles.avatarContainer}>
        {user.avatar ? (
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Ionicons name="person" size={60} color="#dc2626" />
          </View>
        )}
      </View>
      <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
      <Text style={styles.userProgram}>{user.program}</Text>
      <Text style={styles.userCoach}>{user.coach}</Text>
    </View>
  );

  const StatsCard = () => (
    <View style={styles.statsCard}>
      <Text style={styles.sectionTitle}>آمار عملکرد</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.stats.totalSessions}</Text>
          <Text style={styles.statLabel}>کل جلسات</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.stats.completedSessions}</Text>
          <Text style={styles.statLabel}>جلسات تکمیل شده</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.stats.averageScore}</Text>
          <Text style={styles.statLabel}>میانگین نمره</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{user.stats.nextSession}</Text>
          <Text style={styles.statLabel}>جلسه بعدی</Text>
        </View>
      </View>
    </View>
  );

  const InfoCard = () => (
    <View style={styles.infoCard}>
      <Text style={styles.sectionTitle}>اطلاعات شخصی</Text>
      <View style={styles.infoRow}>
        <Ionicons name="mail-outline" size={20} color="#666" />
        <Text style={styles.infoText}>{user.email}</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="call-outline" size={20} color="#666" />
        <Text style={styles.infoText}>{user.phone}</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="calendar-outline" size={20} color="#666" />
        <Text style={styles.infoText}>{user.age} ساله</Text>
      </View>
      <View style={styles.infoRow}>
        <Ionicons name="time-outline" size={20} color="#666" />
        <Text style={styles.infoText}>عضویت از: {user.registrationDate}</Text>
      </View>
    </View>
  );

  const SettingsCard = () => (
    <View style={styles.settingsCard}>
      <Text style={styles.sectionTitle}>تنظیمات</Text>
      
      <View style={styles.settingRow}>
        <View style={styles.settingInfo}>
          <Ionicons name="notifications-outline" size={20} color="#666" />
          <Text style={styles.settingLabel}>اعلان‌ها</Text>
        </View>
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{ false: '#767577', true: '#dc2626' }}
          thumbColor={notificationsEnabled ? '#fff' : '#f4f3f4'}
        />
      </View>

      <View style={styles.settingRow}>
        <View style={styles.settingInfo}>
          <Ionicons name="moon-outline" size={20} color="#666" />
          <Text style={styles.settingLabel}>حالت تاریک</Text>
        </View>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: '#767577', true: '#dc2626' }}
          thumbColor={darkMode ? '#fff' : '#f4f3f4'}
        />
      </View>
    </View>
  );

  const ActionButtons = () => (
    <View style={styles.actionButtons}>
      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => Alert.alert('ویرایش پروفایل', 'این قابلیت به زودی فعال خواهد شد')}
      >
        <Ionicons name="create-outline" size={24} color="#dc2626" />
        <Text style={styles.actionButtonText}>ویرایش پروفایل</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => Alert.alert('تغییر رمز عبور', 'این قابلیت به زودی فعال خواهد شد')}
      >
        <Ionicons name="lock-closed-outline" size={24} color="#dc2626" />
        <Text style={styles.actionButtonText}>تغییر رمز عبور</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.actionButton}
        onPress={() => Alert.alert('پشتیبانی', 'لطفاً با شماره ۰۲۱-۱۲۳۴۵۶۷۸ تماس بگیرید')}
      >
        <Ionicons name="help-circle-outline" size={24} color="#dc2626" />
        <Text style={styles.actionButtonText}>پشتیبانی</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.actionButton, styles.logoutButton]}
        onPress={() => Alert.alert(
          'خروج از حساب',
          'آیا مطمئن هستید که می‌خواهید خارج شوید؟',
          [
            { text: 'انصراف', style: 'cancel' },
            { text: 'خروج', style: 'destructive', onPress: () => navigation.navigate('Login' as never) }
          ]
        )}
      >
        <Ionicons name="log-out-outline" size={24} color="#dc2626" />
        <Text style={styles.actionButtonText}>خروج از حساب</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#dc2626', '#b91c1c']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <ProfileHeader />
          
          <View style={styles.content}>
            <StatsCard />
            <InfoCard />
            <SettingsCard />
            <ActionButtons />
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#fee2e2',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
  userProgram: {
    fontSize: 16,
    color: '#fee2e2',
    marginBottom: 5,
    textAlign: 'center',
  },
  userCoach: {
    fontSize: 14,
    color: '#fecaca',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: 20,
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 15,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  infoText: {
    fontSize: 16,
    color: '#1f2937',
    marginLeft: 15,
    flex: 1,
    textAlign: 'right',
  },
  settingsCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: '#1f2937',
    marginLeft: 15,
  },
  actionButtons: {
    marginTop: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  logoutButton: {
    marginTop: 10,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#1f2937',
    marginLeft: 15,
    fontWeight: '500',
  },
}); 