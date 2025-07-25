import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();

  const validateForm = () => {
    if (!firstName || !lastName || !email || !phone || !password || !confirmPassword || !age) {
      Alert.alert('خطا', 'لطفاً تمام فیلدها را پر کنید');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('خطا', 'رمز عبور و تأیید رمز عبور یکسان نیستند');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('خطا', 'رمز عبور باید حداقل ۶ کاراکتر باشد');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('خطا', 'لطفاً ایمیل معتبر وارد کنید');
      return false;
    }

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 8 || ageNum > 30) {
      Alert.alert('خطا', 'سن باید بین ۸ تا ۳۰ سال باشد');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Mock registration API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would make an API call here
      // const response = await fetch('YOUR_API_ENDPOINT/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ 
      //     firstName, lastName, email, phone, password, age: parseInt(age)
      //   })
      // });
      
      Alert.alert('موفق', 'ثبت نام با موفقیت انجام شد!', [
        { text: 'تأیید', onPress: () => navigation.navigate('Main' as never) }
      ]);
    } catch (error) {
      Alert.alert('خطا', 'خطا در ثبت نام');
    } finally {
      setLoading(false);
    }
  };

  const navigateToLogin = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#dc2626', '#b91c1c']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>آکادمی فوتبال AP</Text>
              <Text style={styles.headerSubtitle}>ثبت نام جدید</Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.row}>
                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="نام"
                    placeholderTextColor="#666"
                    value={firstName}
                    onChangeText={setFirstName}
                    textAlign="right"
                  />
                </View>
                <View style={[styles.inputContainer, styles.halfWidth]}>
                  <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="نام خانوادگی"
                    placeholderTextColor="#666"
                    value={lastName}
                    onChangeText={setLastName}
                    textAlign="right"
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="ایمیل"
                  placeholderTextColor="#666"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  textAlign="right"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="call-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="شماره تلفن"
                  placeholderTextColor="#666"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  textAlign="right"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="calendar-outline" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="سن (۸-۳۰ سال)"
                  placeholderTextColor="#666"
                  value={age}
                  onChangeText={setAge}
                  keyboardType="numeric"
                  textAlign="right"
                />
              </View>

              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons 
                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#666" 
                    style={styles.inputIcon}
                  />
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  placeholder="رمز عبور"
                  placeholderTextColor="#666"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  textAlign="right"
                />
              </View>

              <View style={styles.inputContainer}>
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Ionicons 
                    name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color="#666" 
                    style={styles.inputIcon}
                  />
                </TouchableOpacity>
                <TextInput
                  style={styles.input}
                  placeholder="تأیید رمز عبور"
                  placeholderTextColor="#666"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  textAlign="right"
                />
              </View>

              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  با ثبت نام، شما با قوانین و مقررات آکادمی موافقت می‌کنید
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.registerButton, loading && styles.disabledButton]}
                onPress={handleRegister}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.registerButtonText}>ثبت نام</Text>
                )}
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>یا</Text>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={navigateToLogin}
              >
                <Text style={styles.loginButtonText}>ورود با حساب موجود</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                آکادمی فوتبال AP - بهترین آموزش فوتبال برای پسران و مردان جوان
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fee2e2',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 15,
    paddingBottom: 8,
  },
  halfWidth: {
    flex: 0.48,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    paddingVertical: 8,
  },
  termsContainer: {
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  termsText: {
    color: '#6b7280',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  registerButton: {
    backgroundColor: '#dc2626',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  disabledButton: {
    opacity: 0.6,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    color: '#6b7280',
    fontSize: 14,
    marginHorizontal: 15,
  },
  loginButton: {
    borderColor: '#dc2626',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#dc2626',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  footerText: {
    color: '#fee2e2',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
}); 