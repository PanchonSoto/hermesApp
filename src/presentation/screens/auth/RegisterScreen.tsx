import { useContext, useState } from 'react';
import { View, Text, KeyboardAvoidingView, Image, TextInput, Pressable, Platform, ScrollView } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { AuthStackParams } from '../../router/Stack/AuthStackNavigator';

import { ThemeContext } from '../../context/ThemeContext';

import { authStyles, globalStyles } from '../../../config/theme/theme';
import { Button } from '../../components/ui/Button';
import { CustomView } from '../../components/ui/CustomView';





const logo = require("../../../assets/logo/logo.png");

export const RegisterScreen = () => {

  const navigation = useNavigation<NavigationProp<AuthStackParams>>();
  const { colors } = useContext(ThemeContext);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });


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
        <KeyboardAvoidingView behavior={Platform.OS==='ios' ? 'padding': undefined}>
        {/* form */}
        <View style={authStyles.form}>
          <View style={authStyles.input}>
            <Text style={authStyles.inputLabel}>Full Name</Text>
            <TextInput
             clearButtonMode="while-editing"
             onChangeText={name=>setForm({...form,name})}
             placeholder="Type your name"
             placeholderTextColor="#6b7280"
             style={authStyles.inputControl}
             value={form.name}
            />
          </View>

          <View style={authStyles.input}>
              <Text style={authStyles.inputLabel}>Email Address</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={email => setForm({ ...form, email })}
                placeholder="john@example.com"
                placeholderTextColor="#6b7280"
                style={authStyles.inputControl}
                value={form.email} />
            </View>

            <View style={authStyles.input}>
              <Text style={authStyles.inputLabel}>Password</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={password => setForm({ ...form, password })}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={authStyles.inputControl}
                secureTextEntry={true}
                value={form.password} />
            </View>
            <View style={authStyles.input}>
              <Text style={authStyles.inputLabel}>Confirm Password</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={confirmPassword =>
                  setForm({ ...form, confirmPassword })
                }
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={authStyles.inputControl}
                secureTextEntry={true}
                value={form.confirmPassword} />
            </View>

            <View style={authStyles.formAction}>
              {/* <Pressable
                onPress={() => {
                  // handle onPress
                }}>
                <View style={authStyles.btn}>
                  <Text style={authStyles.btnText}>Register</Text>
                </View>
              </Pressable> */}
              <Button
                onPress={()=>{}}
                text="Register"
                styles={authStyles.btn}
                styleText={authStyles.btnText}
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


      </CustomView>

    </ScrollView>
  )
}


