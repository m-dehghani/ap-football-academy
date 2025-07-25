import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

interface Program {
  id: string;
  name: string;
  description: string;
  ageGroup: string;
  price: number;
  duration: number;
  sessionCount: number;
  maxStudents: number;
  currentStudents: number;
  availableSlots: number;
  coach: {
    name: string;
    specialization: string;
    experience: number;
  };
}

export default function ProgramsScreen() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      // In a real app, this would be the actual API URL
      // For now, we'll use mock data
      const mockPrograms: Program[] = [
        {
          id: '1',
          name: 'برنامه کودکان',
          description: 'آموزش پایه و تکنیک‌های اولیه فوتبال برای پسران کودک',
          ageGroup: '8-12',
          price: 250000,
          duration: 3,
          sessionCount: 12,
          maxStudents: 15,
          currentStudents: 8,
          availableSlots: 7,
          coach: {
            name: 'احمد کریمی',
            specialization: 'آموزش کودکان و نوجوانان',
            experience: 8,
          },
        },
        {
          id: '2',
          name: 'برنامه نوجوانان',
          description: 'توسعه مهارت‌های فنی و تاکتیکی برای نوجوانان پسر',
          ageGroup: '13-17',
          price: 350000,
          duration: 4,
          sessionCount: 16,
          maxStudents: 15,
          currentStudents: 12,
          availableSlots: 3,
          coach: {
            name: 'احمد کریمی',
            specialization: 'آموزش کودکان و نوجوانان',
            experience: 8,
          },
        },
        {
          id: '3',
          name: 'برنامه بزرگسالان',
          description: 'آموزش حرفه‌ای و تخصصی برای مردان جوان',
          ageGroup: '18-25',
          price: 450000,
          duration: 5,
          sessionCount: 20,
          maxStudents: 15,
          currentStudents: 10,
          availableSlots: 5,
          coach: {
            name: 'محمد رضایی',
            specialization: 'آموزش بزرگسالان و تاکتیک',
            experience: 12,
          },
        },
        {
          id: '4',
          name: 'برنامه استادان',
          description: 'حفظ آمادگی و تکنیک برای مردان با تجربه',
          ageGroup: '26-30',
          price: 300000,
          duration: 3,
          sessionCount: 12,
          maxStudents: 15,
          currentStudents: 5,
          availableSlots: 10,
          coach: {
            name: 'حسن نوری',
            specialization: 'مربیگری حرفه‌ای',
            experience: 15,
          },
        },
      ];

      setPrograms(mockPrograms);
    } catch (error) {
      Alert.alert('خطا', 'در دریافت برنامه‌ها خطایی رخ داد');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('fa-IR') + ' تومان';
  };

  const handleRegister = (program: Program) => {
    if (program.availableSlots === 0) {
      Alert.alert('تکمیل ظرفیت', 'ظرفیت این برنامه تکمیل شده است.');
      return;
    }

    Alert.alert(
      'ثبت نام',
      `آیا می‌خواهید در ${program.name} ثبت نام کنید؟`,
      [
        { text: 'انصراف', style: 'cancel' },
        { text: 'ثبت نام', onPress: () => performRegistration(program) },
      ]
    );
  };

  const performRegistration = (program: Program) => {
    // In a real app, this would navigate to registration form or API call
    Alert.alert('موفقیت', `شما با موفقیت در ${program.name} پیش‌ثبت نام شدید.`);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#dc2626" />
        <Text style={styles.loadingText}>در حال بارگیری برنامه‌ها...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>برنامه‌های آموزشی</Text>
        <Text style={styles.headerSubtitle}>
          برنامه مناسب خود را انتخاب کنید
        </Text>
      </View>

      {programs.map((program) => (
        <View key={program.id} style={styles.programCard}>
          <View style={styles.programHeader}>
            <View style={styles.titleSection}>
              <Text style={styles.programTitle}>{program.name}</Text>
              <Text style={styles.ageGroup}>سن {program.ageGroup} سال</Text>
            </View>
            <View style={styles.priceSection}>
              <Text style={styles.price}>{formatPrice(program.price)}</Text>
              <Text style={styles.priceLabel}>ماهانه</Text>
            </View>
          </View>

          <Text style={styles.description}>{program.description}</Text>

          <View style={styles.programDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="time-outline" size={16} color="#6b7280" />
              <Text style={styles.detailText}>
                {program.duration} ماه ({program.sessionCount} جلسه)
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="person-outline" size={16} color="#6b7280" />
              <Text style={styles.detailText}>
                مربی: {program.coach.name}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Ionicons name="school-outline" size={16} color="#6b7280" />
              <Text style={styles.detailText}>
                {program.coach.experience} سال تجربه
              </Text>
            </View>
          </View>

          <View style={styles.capacitySection}>
            <View style={styles.capacityInfo}>
              <Text style={styles.capacityText}>
                ظرفیت: {program.currentStudents}/{program.maxStudents}
              </Text>
              <Text 
                style={[
                  styles.availableSlots,
                  program.availableSlots === 0 && styles.noSlots
                ]}
              >
                {program.availableSlots === 0 
                  ? 'تکمیل شده' 
                  : `${program.availableSlots} جا باقی مانده`
                }
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { width: `${(program.currentStudents / program.maxStudents) * 100}%` }
                ]}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.registerButton,
              program.availableSlots === 0 && styles.disabledButton
            ]}
            onPress={() => handleRegister(program)}
            disabled={program.availableSlots === 0}
          >
            <Text style={[
              styles.registerButtonText,
              program.availableSlots === 0 && styles.disabledButtonText
            ]}>
              {program.availableSlots === 0 ? 'تکمیل ظرفیت' : 'ثبت نام'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#6b7280',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  programCard: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  titleSection: {
    flex: 1,
  },
  programTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 5,
  },
  ageGroup: {
    fontSize: 14,
    color: '#dc2626',
    fontWeight: '500',
  },
  priceSection: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#dc2626',
  },
  priceLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
    marginBottom: 15,
  },
  programDetails: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#6b7280',
  },
  capacitySection: {
    marginBottom: 20,
  },
  capacityInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  capacityText: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  availableSlots: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '500',
  },
  noSlots: {
    color: '#dc2626',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#dc2626',
  },
  registerButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#d1d5db',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButtonText: {
    color: '#9ca3af',
  },
}); 