import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Layout from '@/components/Layout';
import { toast } from 'react-hot-toast';

const registrationSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  ageGroup: z.enum(['8-12', '13-17', '18-25', '26-30'], {
    required_error: 'Please select an age group',
  }),
  program: z.string().min(1, 'Please select a program'),
  experience: z.enum(['beginner', 'intermediate', 'advanced'], {
    required_error: 'Please select your experience level',
  }),
  parentName: z.string().optional(),
  parentEmail: z.string().email().optional().or(z.literal('')),
  medicalConditions: z.string().optional(),
  emergencyContact: z.string().min(10, 'Emergency contact is required'),
  emergencyContactName: z.string().min(2, 'Emergency contact name is required'),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const RegisterPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const watchedAgeGroup = watch('ageGroup');

  // Set default program if one is provided in URL
  useEffect(() => {
    if (router.query.program) {
      setValue('program', router.query.program as string);
    }
  }, [router.query.program, setValue]);

  const programs = {
    '8-12': [
      { id: 'youth-basic', name: 'Youth Basic Skills', price: '$150/month' },
      { id: 'youth-development', name: 'Youth Development', price: '$200/month' },
    ],
    '13-17': [
      { id: 'teen-competitive', name: 'Teen Competitive', price: '$250/month' },
      { id: 'teen-advanced', name: 'Teen Advanced Training', price: '$300/month' },
    ],
    '18-25': [
      { id: 'adult-recreational', name: 'Adult Recreational', price: '$200/month' },
      { id: 'adult-competitive', name: 'Adult Competitive', price: '$350/month' },
    ],
    '26-30': [
      { id: 'masters-fitness', name: 'Masters Fitness', price: '$180/month' },
      { id: 'masters-competitive', name: 'Masters Competitive', price: '$280/month' },
    ],
  };

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        toast.success('Registration successful! Redirecting to payment...');
        // Redirect to payment page
        router.push(`/payment?session=${result.sessionId}`);
      } else {
        const error = await response.json();
        toast.error(error.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isMinor = watchedAgeGroup === '8-12' || watchedAgeGroup === '13-17';

  return (
    <Layout
      title="Register - AP Football Academy"
      description="Register for football training programs at AP Football Academy. Choose from various programs for ages 8-30. Secure online registration with flexible payment options."
      canonical="https://your-domain.com/register"
    >
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Join AP Football Academy
                </h1>
                <p className="text-primary-100">
                  Start your football journey with professional training
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Personal Information */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        {...register('firstName')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        {...register('lastName')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        {...register('email')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        {...register('phone')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        {...register('dateOfBirth')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      />
                      {errors.dateOfBirth && (
                        <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age Group *
                      </label>
                      <select
                        {...register('ageGroup')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      >
                        <option value="">Select age group</option>
                        <option value="8-12">Youth (8-12 years)</option>
                        <option value="13-17">Teen (13-17 years)</option>
                        <option value="18-25">Adult (18-25 years)</option>
                        <option value="26-30">Masters (26-30 years)</option>
                      </select>
                      {errors.ageGroup && (
                        <p className="mt-1 text-sm text-red-600">{errors.ageGroup.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Program Selection */}
                {watchedAgeGroup && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                      Program Selection
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Training Program *
                        </label>
                        <select
                          {...register('program')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        >
                          <option value="">Select program</option>
                          {programs[watchedAgeGroup as keyof typeof programs]?.map((program) => (
                            <option key={program.id} value={program.id}>
                              {program.name} - {program.price}
                            </option>
                          ))}
                        </select>
                        {errors.program && (
                          <p className="mt-1 text-sm text-red-600">{errors.program.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Experience Level *
                        </label>
                        <select
                          {...register('experience')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        >
                          <option value="">Select experience level</option>
                          <option value="beginner">Beginner - Just starting out</option>
                          <option value="intermediate">Intermediate - Some experience</option>
                          <option value="advanced">Advanced - Experienced player</option>
                        </select>
                        {errors.experience && (
                          <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Parent/Guardian Information (for minors) */}
                {isMinor && (
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                      Parent/Guardian Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Parent/Guardian Name *
                        </label>
                        <input
                          type="text"
                          {...register('parentName')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                          placeholder="Enter parent/guardian name"
                        />
                        {errors.parentName && (
                          <p className="mt-1 text-sm text-red-600">{errors.parentName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Parent/Guardian Email *
                        </label>
                        <input
                          type="email"
                          {...register('parentEmail')}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                          placeholder="Enter parent/guardian email"
                        />
                        {errors.parentEmail && (
                          <p className="mt-1 text-sm text-red-600">{errors.parentEmail.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Emergency Contact */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Emergency Contact
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Emergency Contact Name *
                      </label>
                      <input
                        type="text"
                        {...register('emergencyContactName')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="Enter emergency contact name"
                      />
                      {errors.emergencyContactName && (
                        <p className="mt-1 text-sm text-red-600">{errors.emergencyContactName.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Emergency Contact Phone *
                      </label>
                      <input
                        type="tel"
                        {...register('emergencyContact')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        placeholder="Enter emergency contact phone"
                      />
                      {errors.emergencyContact && (
                        <p className="mt-1 text-sm text-red-600">{errors.emergencyContact.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Medical Information
                  </h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medical Conditions or Allergies
                    </label>
                    <textarea
                      {...register('medicalConditions')}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      placeholder="Please list any medical conditions, allergies, or special requirements that our coaches should be aware of..."
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      This information will be kept confidential and used only for safety purposes.
                    </p>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        {...register('terms')}
                        className="mt-1 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <label className="ml-3 block text-sm text-gray-900">
                        I agree to the{' '}
                        <a href="/terms" className="text-primary-600 hover:text-primary-500 underline">
                          Terms and Conditions
                        </a>
                        {' '}and{' '}
                        <a href="/privacy" className="text-primary-600 hover:text-primary-500 underline">
                          Privacy Policy
                        </a>
                        . I understand that registration fees are non-refundable and that I am responsible for monthly payments.
                      </label>
                    </div>
                    {errors.terms && (
                      <p className="mt-2 text-sm text-red-600">{errors.terms.message}</p>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 text-lg"
                  >
                    {isSubmitting ? 'Processing Registration...' : 'Complete Registration & Pay'}
                  </button>
                  <p className="mt-3 text-center text-sm text-gray-500">
                    You will be redirected to a secure payment page to complete your registration.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage; 