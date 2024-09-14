import { View, Text, useWindowDimensions, Alert, ScrollView, TextInput, Image, StyleSheet, KeyboardAvoidingView, Pressable, Platform } from 'react-native'
import React, { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { CustomView } from '../../components/ui/CustomView'
import { authStyles, colors, globalStyles } from '../../../config/theme/theme';
import { AuthStackParams } from '../../router/Stack/AuthStackNavigator';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { Button } from '../../components/ui/Button';



const logo = require("../../../assets/logo/logoTall.png");



export const LoginScreen = () => {

  const { height } = useWindowDimensions();
  const navigation = useNavigation<NavigationProp<AuthStackParams>>();

  const { login } = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onLogin = async() => {
    if(form.email.length===0 || form.password.length===0) {
      return;
    }
    await login(form.email, form.password);
    setIsPosting(true);
    const wasSucessful = await login(form.email, form.password);
    setIsPosting(false);
    if(wasSucessful) return;

    Alert.alert('Error', 'Usuario o contrasena incorrecta');
  }

  return (
    <ScrollView style={{backgroundColor:colors.background}}>
      <CustomView style={globalStyles.container}>


        <View style={authStyles.header}>
          <Image
            alt="HermesHub Logo"
            resizeMode="contain"
            style={authStyles.headerImg}
            source={logo}
          />
          <Text style={globalStyles.title}>
            Login in to <Text style={{color:'#075eec'}}>HermesHub</Text>
          </Text>
          <Text style={globalStyles.subtitle}>
            Get access to HermesHub store
          </Text>
        </View>

        {/*form */}
        <KeyboardAvoidingView behavior={Platform.OS==='ios' ? 'padding': undefined}>
          <View style={authStyles.form}>

            <View style={authStyles.input}>
              {/* email */}
              <Text style={authStyles.inputLabel}>Email</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={email=>setForm({...form,email})}
                placeholder="email@example.com"
                placeholderTextColor="#6b7280"
                style={authStyles.inputControl}
                value={form.email}
              />
            </View>

            <View style={authStyles.input}>
            {/* password */}
              <Text style={authStyles.inputLabel}>Password</Text>
                <TextInput
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={password=>setForm({...form,password})}
                  placeholder="***********"
                  placeholderTextColor="#6b7280"
                  style={authStyles.inputControl}
                  secureTextEntry={true}
                  value={form.password}
                />
            </View>

            <View style={authStyles.formAction}>
              {/* <Pressable onPress={onLogin}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Login</Text>
                </View>
              </Pressable> */}
              <Button
                onPress={onLogin}
                text="Login"
                styles={authStyles.btn}
                styleText={authStyles.btnText}
              />
            </View>

          </View>


          <View style={{marginTop:'auto', alignItems:'center'}}>
                <Pressable
                  style={{marginTop:'auto'}}
                  onPress={()=>navigation.navigate('RegisterScreen')}
                >
                  <Text style={authStyles.formFooter}>
                    Don't have an account?{' '}
                    <Text style={{textDecorationLine:'underline'}}>Sign up</Text>
                  </Text>
                </Pressable>
          </View>
        </KeyboardAvoidingView>


      </CustomView>

    </ScrollView>
  );
}

