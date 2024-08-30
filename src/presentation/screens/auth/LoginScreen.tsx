import { View, Text, useWindowDimensions, Alert, ScrollView, TextInput, SafeAreaView, Image, StyleSheet, KeyboardAvoidingView, Pressable, Platform } from 'react-native'
import React, { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { CustomView } from '../../components/ui/CustomView'
import { colors } from '../../../config/theme/theme';
import { AuthStackParams } from '../../router/Stack/AuthStackNavigator';
import { useAuthStore } from '../../store/auth/useAuthStore';



const logo = require("../../../assets/logo/logo.png");



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
    await login(form.email, form.password);
    // if(form.email.length===0 || form.password.length===0) {
    //   return;
    // }
    // setIsPosting(true);
    // const wasSucessful = await login(form.email, form.password);
    // setIsPosting(false);
    // if(wasSucessful) return;

    // Alert.alert('Error', 'Usuario o contrasena incorrecta');
  }

  return (
    <ScrollView style={{backgroundColor:colors.background}}>
      <CustomView style={styles.container}>


        <View style={styles.header}>
          <Image
            alt="HermesHub Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={logo}
          />
          <Text style={styles.title}>
            Login in to <Text style={{color:'#075eec'}}>HermesHub</Text>
          </Text>
          <Text style={styles.subtitle}>
            Get access to HermesHub store
          </Text>
        </View>

        {/*form */}
        <KeyboardAvoidingView behavior={Platform.OS==='ios' ? 'padding': undefined}>
          <View style={styles.form}>

            <View style={styles.input}>
              {/* email */}
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={email=>setForm({...form,email})}
                placeholder="email@example.com"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.email}
              />
            </View>

            <View style={styles.input}>
            {/* password */}
              <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={password=>setForm({...form,password})}
                  placeholder="***********"
                  placeholderTextColor="#6b7280"
                  style={styles.inputControl}
                  secureTextEntry={true}
                  value={form.password}
                />
            </View>

            <View style={styles.formAction}>
              <Pressable onPress={onLogin}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Login</Text>
                </View>
              </Pressable>
            </View>

          </View>


          <View style={{marginTop:'auto', alignItems:'center'}}>
                <Pressable
                  style={{marginTop:'auto'}}
                  onPress={()=>navigation.navigate('RegisterScreen')}
                >
                  <Text style={styles.formFooter}>
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

const styles = StyleSheet.create({
  container: {
    paddingVertical:24,
    paddingHorizontal:0,
    flexGrow:1,
    flexShrink:1,
    flexBasis:0
  },
  title: {
    fontSize:31,
    fontWeight:'700',
    color:'#1D2A32',
    marginBottom:6
  },
  subtitle: {
    fontSize:15,
    fontWeight:'500',
    color:'#929292'
  },
  /** Header */
  header: {
    alignItems:'center',
    justifyContent:'center',
    marginVertical:50,
  },
  headerImg: {
    width:80,
    height:80,
    alignSelf:'center',
    marginBottom:36
  },
  /** Form */
  form: {
    marginBottom:24,
    paddingHorizontal:24,
    flexGrow:1,
    flexShrink:1,
    // flexBasis:1,
  },
  formAction: {
    marginTop:4,
    marginBottom:16,
  },
  formLink: {
    fontSize:16,
    fontWeight:'600',
    color:'#075eec',
    textAlign:'center',
  },
  formFooter: {
    fontSize:15,
    fontWeight:'600',
    color:'#222',
    marginBottom:8,
  },
  /** Input */
  input: {
    marginBottom:16
  },
  inputLabel: {
    fontSize:17,
    fontWeight:'600',
    color:'#222',
    marginBottom:8,
  },
  inputControl: {
    height:50,
    backgroundColor:'#fff',
    paddingHorizontal:16,
    borderRadius:12,
    fontSize:15,
    fontWeight:'500',
    color:'#222',
    borderWidth:1,
    borderColor:'#C9D3DB',
    borderStyle:'solid',
  },
  /** Button */
  btn: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:15,
    paddingVertical:10,
    paddingHorizontal:20,
    borderWidth:1,
    backgroundColor:'#075eec',
    borderColor:'#075eec'
  },
  btnText: {
    fontSize:18,
    lineHeight:26,
    fontWeight:'600',
    color:'#fff'
  },
});

