import { View, Text, Alert, ScrollView, TextInput, Image, KeyboardAvoidingView, Pressable, Platform } from 'react-native'
import { useState } from 'react';
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { authStyles, colors, globalStyles } from '../../../config/theme/theme';
import { CustomView } from '../../components/ui/CustomView'
import { Button } from '../../components/ui/Button';

import { useAuthStore } from '../../store/auth/useAuthStore';
import type{ AuthStackParams } from '../../router/Stack/AuthStackNavigator';



const logo = require("../../../assets/logo/logoTall.png");

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Please type your email.'),
  password: Yup.string().required('Password is required')
  // .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Must contain min 8 characters, at least one uppercase letter, one special letter.'),
});


export const LoginScreen = () => {

  const navigation = useNavigation<NavigationProp<AuthStackParams>>();

  const { login } = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);


  const onLogin = async (values: { email: string, password: string }) => {
    setIsPosting(true);
    const wasSucessful = await login(values.email, values.password);
    setIsPosting(false);
    if (wasSucessful) return;
    Alert.alert('Error', 'Usuario o contrasena incorrecta');
  }

  return (
    <ScrollView style={{ backgroundColor: colors.background }}>
      <CustomView style={globalStyles.container}>


        <View style={authStyles.header}>
          <Image
            alt="HermesHub Logo"
            resizeMode="contain"
            style={authStyles.headerImg}
            source={logo}
          />
          <Text style={globalStyles.title}>
            Login in to <Text style={{ color: colors.primary }}>HermesHub</Text>
          </Text>
          <Text style={globalStyles.subtitle}>
            Get access to HermesHub store
          </Text>
        </View>

        {/*form */}
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={(values) => onLogin(values)}
        >
          {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

              <View style={authStyles.form}>

                <View style={authStyles.input}>
                  {/* email */}
                  <Text style={authStyles.inputLabel}>Email</Text>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="while-editing"
                    keyboardType="email-address"
                    placeholder="email@example.com"
                    placeholderTextColor="#6b7280"
                    style={[authStyles.inputControl, {
                      color: (touched.email && errors.email) ? 'red' : '#222'
                    }]}

                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={() => setFieldTouched('email')}
                  />
                  {touched.email && errors.email && (<Text style={{ color: 'red' }}>{errors.email}</Text>)}
                </View>

                <View style={authStyles.input}>
                  {/* password */}
                  <Text style={authStyles.inputLabel}>Password</Text>
                  <TextInput
                    autoCorrect={false}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    clearButtonMode="while-editing"
                    placeholder="***********"
                    placeholderTextColor="#6b7280"
                    style={[authStyles.inputControl, {
                      color: (touched.password && errors.password) ? 'red' : '#222'
                    }]}

                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={() => setFieldTouched('password')}
                  />
                  {touched.password && errors.password && (<Text style={{ color: 'red' }}>{errors.password}</Text>)}
                </View>

                <View style={authStyles.formAction}>
                  <Button
                    onPress={handleSubmit}
                    text="Login"
                    styles={authStyles.btn}
                    styleText={authStyles.btnText}
                    disabled={!isValid || isPosting}
                    loading={isPosting}
                    loadingSize={26}
                  />
                </View>

              </View>




              <View style={{ marginTop: 'auto', alignItems: 'center' }}>
                <Pressable
                  style={{ marginTop: 'auto' }}
                  onPress={() => navigation.navigate('RegisterScreen')}
                >
                  <Text style={authStyles.formFooter}>
                    Don't have an account?{' '}
                    <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
                  </Text>
                </Pressable>
              </View>


            </KeyboardAvoidingView>
          )}
        </Formik>


      </CustomView>

    </ScrollView>
  );
}

