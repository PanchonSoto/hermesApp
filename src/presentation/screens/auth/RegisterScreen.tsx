import { useContext, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Image, TextInput, Pressable, Platform, ScrollView, Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import type{ AuthStackParams } from '../../router/Stack/AuthStackNavigator';

import { ThemeContext } from '../../context/ThemeContext';

import { authStyles, globalStyles } from '../../../config/theme/theme';
import { Button } from '../../components/ui/Button';
import { CustomView } from '../../components/ui/CustomView';
import { useAuthStore } from '../../store/auth/useAuthStore';





const logo = require("../../../assets/logo/logo.png");

const RegisterSchema = Yup.object().shape({
  username: Yup.string().min(2).required('Type your name'),
  email: Yup.string().email('Invalid email').required('Please type your email.'),
  password: Yup.string().min(8).required('password is required')
  .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Must contain min 8 characters, at least one uppercase letter, special letter and a number'),
  confirmPassword: Yup.string().min(8).oneOf([Yup.ref('password')], 'Your password do not match.').required('confirm password is required'),
});




export const RegisterScreen = () => {

  const navigation = useNavigation<NavigationProp<AuthStackParams>>();
  const { colors } = useContext(ThemeContext);

  const { register } = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);


  const onRegister = async(values:{username:string,email: string, password: string})=> {
    setIsPosting(true);
    const wasSucessful = await register(values.username,values.email, values.password);
    setIsPosting(false);
  }


  return (
    <ScrollView style={{backgroundColor:colors.background}}>
      <CustomView style={globalStyles.container}>
        {/* header */}
        <View style={authStyles.header}>
          <Image
            alt="HermesHub Logo"
            resizeMode="contain"
            style={authStyles.headerImg}
            source={logo}
          />
          <Text style={globalStyles.title}>
            Let's Get Started!
          </Text>
          <Text style={globalStyles.subtitle}>
            Fill in the fields below to create an account.
          </Text>
        </View>

        <Formik
          initialValues={{username:'', email: '', password: '',confirmPassword:''}}
          validationSchema={RegisterSchema}
          onSubmit={(values) => onRegister(values)}
        >
          {({ values, errors, touched, handleChange, setFieldTouched, isValid, handleSubmit }) => (
            <KeyboardAvoidingView behavior={Platform.OS==='ios' ? 'padding': undefined}>
            {/* form */}
            <View style={authStyles.form}>

              <View style={authStyles.input}>
                <Text style={authStyles.inputLabel}>Full Name</Text>
                <TextInput
                clearButtonMode="while-editing"
                placeholder="Type your name"
                placeholderTextColor="#6b7280"
                style={[authStyles.inputControl,{
                  color: (touched.username && errors.username) ? 'red' : '#222'
                }]}

                value={values.username}
                onChangeText={handleChange('username')}
                onBlur={()=>setFieldTouched('username')}
              />
              {touched.username && errors.username && (<Text style={{ color: 'red' }}>{errors.username}</Text>)}
              </View>

              <View style={authStyles.input}>
                  <Text style={authStyles.inputLabel}>Email Address</Text>
                  <TextInput
                    autoCorrect={false}
                    autoCapitalize="none"
                    clearButtonMode="while-editing"
                    keyboardType="email-address"
                    placeholder="john@example.com"
                    placeholderTextColor="#6b7280"
                    style={[authStyles.inputControl,{
                      color: (touched.email && errors.email) ? 'red' : '#222'
                    }]}

                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={()=>setFieldTouched('email')}
                  />
                  {touched.email && errors.email && (<Text style={{ color: 'red' }}>{errors.email}</Text>)}
                </View>

                <View style={authStyles.input}>
                  <Text style={authStyles.inputLabel}>Password</Text>
                  <TextInput
                    autoCorrect={false}
                    secureTextEntry={true}
                    clearButtonMode="while-editing"
                    placeholder="********"
                    placeholderTextColor="#6b7280"
                    style={[authStyles.inputControl,{
                      color: (touched.password && errors.password) ? 'red' : '#222'
                    }]}

                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={()=>setFieldTouched('password')}
                  />
                  {touched.password && errors.password && (<Text style={{ color: 'red' }}>{errors.password}</Text>)}
                </View>

                <View style={authStyles.input}>
                  <Text style={authStyles.inputLabel}>Confirm Password</Text>
                  <TextInput
                    autoCorrect={false}
                    clearButtonMode="while-editing"
                    placeholder="********"
                    placeholderTextColor="#6b7280"
                    secureTextEntry={true}
                    style={[authStyles.inputControl,{
                      color: (touched.confirmPassword && errors.confirmPassword) ? 'red' : '#222'
                    }]}

                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={()=>setFieldTouched('confirmPassword')}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (<Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>)}
                </View>

                <View style={authStyles.formAction}>
                  <Button
                    onPress={handleSubmit}
                    text="Register"
                    styles={authStyles.btn}
                    styleText={authStyles.btnText}
                    disabled={!isValid}
                    loading={isPosting}
                    loadingSize={26}
                  />
                </View>
              </View>


            <View style={{marginTop:'auto', alignItems:'center'}}>
              <Pressable
                onPress={() => {
                  navigation.navigate('LoginScreen');
                }}
                style={{ marginTop: 'auto' }}>
                <Text style={authStyles.formFooter}>
                  Already have an account?{' '}
                  <Text style={{ textDecorationLine: 'underline' }}>Sign in</Text>
                </Text>
              </Pressable>
            </View>

            </KeyboardAvoidingView>
          )}
        </Formik>

      </CustomView>

    </ScrollView>
  )
}


