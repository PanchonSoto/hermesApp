import { useState } from 'react';
import { View, Text, Image, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';


import { useForm, FormProvider, SubmitHandler, SubmitErrorHandler, FieldValues } from 'react-hook-form';


import type { AuthStackParams } from '../../router/Stack/AuthStackNavigator';

import { authStyles, colors, globalStyles } from '../../../config/theme/theme';
import { Button } from '../../components/ui/Button';
import { CustomView } from '../../components/ui/CustomView';
import { CustomInput } from '../../components/ui/CustomInput';
import { useAuthStore } from '../../store/auth/useAuthStore';



type FormValues = {
  username: string;
  email: string;
  password: string;
  confirmPass: string;
};

const logo = require("../../../assets/logo/logo.png");
// const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// let renderCount = 0;

export const RegisterScreen = () => {

  const { top, bottom } = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<AuthStackParams>>();

  const { register: registerStore } = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);



  // useForm hook and set default behavior/values
  const { ...methods } = useForm({ mode: 'onChange' });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log({ data });
    setIsPosting(true);
    await registerStore(data.username, data.email, data.password);
    setIsPosting(false);
  }

  const [formError, setError] = useState<Boolean>(false)

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    return console.log({ errors })
  }

  // renderCount++;

  return (
    <CustomView style={[globalStyles.container, { paddingTop: top, paddingBottom: bottom }]}>

      {formError ? <View><Text style={{ color: 'red' }}>There was a problem with loading the form. Please try again later.</Text></View> :
        <ScrollView
          // contentContainerStyle={{ flex: 1, }}
          automaticallyAdjustKeyboardInsets
          scrollEventThrottle={400}>


          {/* header */}
          <View style={authStyles.header}>
            <Image
              alt="HermesHub Logo"
              resizeMode="contain"
              style={authStyles.headerImg}
              source={logo}
            />
            <Text style={globalStyles.title}>Create account!</Text>
            <Text style={globalStyles.subtitle}>Fill in the fields below to create an account.</Text>
          </View>

          {/* form */}
          <FormProvider {...methods}>
            <View style={authStyles.form}>

              <CustomInput
                name="username"
                label="Full Name"
                placeholder="Type your name"
                keyboardType="default"
                rules={{
                  required: 'Required field!',
                  min: 2,
                }}
                setFormError={setError}
              />

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

              <CustomInput
                name="confirmPass"
                label="Confirm password"
                secureTextEntry
                placeholder="**********"
                rules={{
                  required: 'Confirm password!',
                  validate: (val: string) => (methods.watch('password') != val) ? 'Your password do not match' : undefined
                }}
                setFormError={setError}
              />


              <View style={{ alignItems: 'center', }}>
                <Pressable
                  onPress={() => {
                    navigation.navigate('LoginScreen');
                  }}
                >
                  <Text style={authStyles.formFooter}>
                    Already have an account?{' '}
                    <Text style={{ textDecorationLine: 'underline', color:colors.primary }}>Sign in</Text>
                  </Text>
                </Pressable>
              </View>

              {/* form submit */}
              <View style={authStyles.formAction}>
                <Button
                  onPress={methods.handleSubmit(onSubmit, onError)}
                  text="Register"
                  styles={authStyles.btn}
                  styleText={authStyles.btnText}
                  disabled={!methods.formState.isValid || isPosting}
                  loading={isPosting}
                  loadingSize={26}
                />
              </View>

            </View>
          </FormProvider>
        </ScrollView>
      }

    </CustomView>
  );
}
