import { View, Text, Alert, ScrollView, Image, Pressable } from 'react-native'
import { useState } from 'react';
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { type FieldValues, type SubmitErrorHandler, type SubmitHandler, useForm, FormProvider } from 'react-hook-form';


import { authStyles, colors, globalStyles } from '../../../config/theme/theme';
import { CustomView } from '../../components/ui/CustomView'
import { Button } from '../../components/ui/Button';
import { CustomInput } from '../../components/ui/CustomInput';
import { useAuthStore } from '../../store/auth/useAuthStore';

import type { AuthStackParams } from '../../router/Stack/AuthStackNavigator';





type FormValues = {
  email: string;
  password: string;
};

const logo = require("../../../assets/logo/logoTall.png");




export const LoginScreen = () => {

  const { top, bottom } = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<AuthStackParams>>();

  const { login } = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);


  const onLogin = async (values: { email: string, password: string }) => {
    setIsPosting(true);
    const wasSucessful = await login(values.email, values.password);
    setIsPosting(false);
    if (wasSucessful) return;
    Alert.alert('Error', 'Your email or password is wrong');
  }

  // useForm hook and set default behavior/values
  const { ...methods } = useForm({ mode: 'onChange' });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log({ data });
    setIsPosting(true);
    const wasSucessful = await login(data.email, data.password);
    setIsPosting(false);
    if (wasSucessful) return;
    Alert.alert('Error', 'Your email or password is wrong');
  }

  const [formError, setError] = useState<Boolean>(false)

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    return console.log({ errors })
  }

  return (
    <CustomView style={[globalStyles.container, { paddingTop: top, paddingBottom: bottom }]}>
      <ScrollView
        automaticallyAdjustKeyboardInsets
        scrollEventThrottle={400}>


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
        <FormProvider {...methods}>

          <View style={authStyles.form}>

            <CustomInput
              name="email"
              label="Email"
              placeholder="example.doe@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              rules={{
                required: 'Email is required!',
                pattern: {
                  value: /\b[\w\\.+-]+@[\w\\.-]+\.\w{2,4}\b/,
                  message: 'Invalid email',
                },
              }}
              setFormError={setError}
            />

            <CustomInput
              name="password"
              label="Password"
              secureTextEntry
              placeholder="**********"
              rules={{ required: 'Password is required!' }}
              setFormError={setError}
            />

            <View style={authStyles.formAction}>
              <Button
                onPress={methods.handleSubmit(onSubmit, onError)}
                text="Login"
                styles={authStyles.btn}
                styleText={authStyles.btnText}
                disabled={!methods.formState.isValid || isPosting}
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
                <Text style={{ textDecorationLine: 'underline', color: colors.primary }}>Sign up</Text>
              </Text>
            </Pressable>
          </View>
        </FormProvider>



      </ScrollView>
    </CustomView>
  );
}

