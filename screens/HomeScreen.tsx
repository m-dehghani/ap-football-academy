import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const stats = [
    { icon: 'people', value: '۱۲۰+', label: 'بازیکن پسر' },
    { icon: 'trophy', value: '۹۵%', label: 'رضایت' },
    { icon: 'time', value: '۱۰+', label: 'سال تجربه' },
    { icon: 'medal', value: '۲۵+', label: 'قهرمانی' },
  ];

  const features = [
    { icon: 'school', title: 'مربیان مجرب', description: 'تیم حرفه‌ای مربیان' },
    { icon: 'fitness', title: 'تجهیزات مدرن', description: 'امکانات پیشرفته' },
    { icon: 'shield-checkmark', title: 'محیط امن', description: 'بالاترین استانداردها' },
    { icon: 'star', title: 'کیفیت بالا', description: 'آموزش استاندارد جهانی' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <LinearGradient
        colors={['#dc2626', '#b91c1c']}
        style={styles.heroSection}
      >
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>آکادمی فوتبال آسیا پسیفیک</Text>
          <Text style={styles.heroSubtitle}>
            بهترین آموزش فوتبال برای پسران و مردان جوان
          </Text>
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>ثبت نام کنید</Text>
            <Ionicons name="arrow-forward" size={20} color="#dc2626" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>آمار آکادمی</Text>
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Ionicons name={stat.icon as any} size={30} color="#dc2626" />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>ویژگی‌های آکادمی</Text>
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <TouchableOpacity key={index} style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons name={feature.icon as any} size={30} color="#dc2626" />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* News Section */}
      <View style={styles.newsSection}>
        <Text style={styles.sectionTitle}>آخرین اخبار</Text>
        <TouchableOpacity style={styles.newsCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
            }}
            style={styles.newsImage}
          />
          <View style={styles.newsContent}>
            <Text style={styles.newsTitle}>شروع دوره جدید آموزشی</Text>
            <Text style={styles.newsDescription}>
              دوره‌های جدید آموزشی برای تمام رده‌های سنی از هفته آینده آغاز می‌شود
            </Text>
            <Text style={styles.newsDate}>۲ روز پیش</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fef2f2',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  ctaButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ctaButtonText: {
    color: '#dc2626',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: width / 2 - 30,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc2626',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 5,
  },
  featuresSection: {
    padding: 20,
    backgroundColor: '#fff',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: width / 2 - 30,
    padding: 20,
    backgroundColor: '#f9fafb',
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  featureIcon: {
    backgroundColor: '#fef2f2',
    padding: 15,
    borderRadius: 50,
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 5,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  newsSection: {
    padding: 20,
  },
  newsCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  newsImage: {
    width: '100%',
    height: 150,
  },
  newsContent: {
    padding: 15,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 5,
  },
  newsDescription: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 10,
  },
  newsDate: {
    fontSize: 12,
    color: '#dc2626',
  },
}); 