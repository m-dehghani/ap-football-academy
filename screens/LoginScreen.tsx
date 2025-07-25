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

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('خطا', 'لطفاً تمام فیلدها را پر کنید');
      return;
    }

    setLoading(true);
    
    try {
      // Mock login API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would make an API call here
      // const response = await fetch('YOUR_API_ENDPOINT/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      
      Alert.alert('موفق', 'با موفقیت وارد شدید!', [
        { text: 'تأیید', onPress: () => navigation.navigate('Main' as never) }
      ]);
    } catch (error) {
      Alert.alert('خطا', 'خطا در ورود به سیستم');
    } finally {
      setLoading(false);
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('Register' as never);
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
              <Text style={styles.headerSubtitle}>ورود به حساب کاربری</Text>
            </View>

            <View style={styles.formContainer}>
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

              <TouchableOpacity 
                style={styles.forgotPassword}
                onPress={() => Alert.alert('بازیابی رمز عبور', 'این قابلیت به زودی فعال خواهد شد')}
              >
                <Text style={styles.forgotPasswordText}>فراموشی رمز عبور؟</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.loginButton, loading && styles.disabledButton]}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loginButtonText}>ورود</Text>
                )}
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>یا</Text>
                <View style={styles.dividerLine} />
              </View>

              <TouchableOpacity
                style={styles.registerButton}
                onPress={navigateToRegister}
              >
                <Text style={styles.registerButtonText}>ثبت نام جدید</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>
                با ورود به سیستم، شما با قوانین و مقررات آکادمی موافقت می‌کنید
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
    marginBottom: 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#fee2e2',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    marginBottom: 20,
    paddingBottom: 10,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
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
  loginButtonText: {
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
  registerButton: {
    borderColor: '#dc2626',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#dc2626',
    fontSize: 18,
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