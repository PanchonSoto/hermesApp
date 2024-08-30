import { useContext, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Image, TextInput, Pressable, Platform, ScrollView } from 'react-native';
import { CustomView } from '../../components/ui/CustomView';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthStackParams } from '../../router/Stack/AuthStackNavigator';
import { ThemeContext } from '../../context/ThemeContext';





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
      <CustomView style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <Image
            alt="HermesHub Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={logo}
          />
          <Text style={styles.title}>
            Let's Get Started!
          </Text>
          <Text style={styles.subtitle}>
            Fill in the fields below to create an account.
          </Text>
        </View>
        <KeyboardAvoidingView behavior={Platform.OS==='ios' ? 'padding': undefined}>
        {/* form */}
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
             clearButtonMode="while-editing"
             onChangeText={name=>setForm({...form,name})}
             placeholder="Type your name"
             placeholderTextColor="#6b7280"
             style={styles.inputControl}
             value={form.name}
            />
          </View>

          <View style={styles.input}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={email => setForm({ ...form, email })}
                placeholder="john@example.com"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.email} />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={password => setForm({ ...form, password })}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password} />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={confirmPassword =>
                  setForm({ ...form, confirmPassword })
                }
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.confirmPassword} />
            </View>

            <View style={styles.formAction}>
              <Pressable
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Register</Text>
                </View>
              </Pressable>
            </View>
          </View>



        <Pressable
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}
          style={{ marginTop: 'auto' }}>
          <Text style={styles.formFooter}>
            Already have an account?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Sign in</Text>
          </Text>
        </Pressable>
        </KeyboardAvoidingView>
      </CustomView>

    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingVertical:25,
    paddingHorizontal:0,
    flexGrow:1,
    flexShrink:1,
    flexBasis:0,
  },
  title: {
    fontSize:31,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom:6,

  },
  subtitle: {
    fontSize:15,
    fontWeight: '500',
    color: '#929292',

  },
  /** Header */
  header: {
    alignItems:'center',
    justifyContent:'center',
    marginVertical:50,
  },
  headerBack: {

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
    // flexBasis:0
  },
  formAction: {
    marginTop:4,
    marginBottom:16,

  },
  formFooter: {
    fontSize:15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing:0.15,

  },
  /** Input */
  input: {
    marginBottom:16
  },
  inputLabel: {
    fontSize:17,
    fontWeight:'600',
    color: '#222',
    marginBottom:8,

  },
  inputControl: {
    height:50,
    backgroundColor: '#fff',
    paddingHorizontal:16,
    borderRadius:12,
    fontSize:15,
    fontWeight: '500',
    color: '#222',
    borderWidth:1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid'
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:30,
    paddingVertical:10,
    paddingHorizontal:20,
    borderWidth:1,
    backgroundColor: '#075eec',
    borderColor: '#075eec'
  },
  btnText: {
    fontSize:18,
    lineHeight:26,
    fontWeight: '600',
    color: '#fff'
  },
});

