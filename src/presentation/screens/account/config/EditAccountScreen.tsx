import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FieldValues, FormProvider, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';

import type{ UserInfo } from '../../../../infrastructure/interfaces/auth/auth.responses';
import { useAuthStore } from '../../../store/auth/useAuthStore';

import { CustomInput } from '../../../components/ui/CustomInput';
import { CustomPicker } from '../../../components/ui/CustomPicker';
import { Button } from '../../../components/ui/Button';

import { authStyles } from '../../../../config/theme/theme';
import { ThemeContext } from '../../../context/ThemeContext';


const EditAccountScreen = () => {

    const { colors } = useContext(ThemeContext);
    const { goBack } = useNavigation();

    const { user, userInfo, updateUser} = useAuthStore();

    const { ...methods } = useForm({
        mode: 'onChange',
        defaultValues: {
            day: userInfo?.date_of_birth
                ? new Date(userInfo.date_of_birth).getUTCDate().toString()
                : "15",
            month: userInfo?.date_of_birth
                ? (new Date(userInfo.date_of_birth).getUTCMonth() + 1).toString()
                : "6",
            year: userInfo?.date_of_birth
                ? new Date(userInfo.date_of_birth).getUTCFullYear().toString()
                : "2000",
            phone_number: userInfo?.phone_number ? userInfo?.phone_number : "",
            username: user?.username ? user?.username : ""
        }
    });


    const [isPosting, setIsPosting] = useState(false);
    const [formError, setError] = useState<Boolean>(false);

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 65 }, (_, i) => 1960 + i);


    const showToast = () => {
        Toast.show({
          type: 'success',
          text1: 'Changes applied successfully. ✅',
          autoHide: true,
          position: 'bottom',
          bottomOffset: 100
        });
    };


    const onSubmit: SubmitHandler<FieldValues> = async (data) => {

        const { day,month,year, username, phone_number} = data;
        const date = new Date(year, month-1, day);


        showToast();
        if (!Object.keys(methods.formState.dirtyFields).length) return;

        setIsPosting(true);
        await updateUser({username, phone_number, date_of_birth:date});
        setIsPosting(false);
        goBack();
    }

    const onError: SubmitErrorHandler<UserInfo> = (errors, e) => {
        return console.log({ errors })
    }


    return (
        <View style={{backgroundColor:colors.background, flex:1,}}>
            { formError ?
            <View>
                <Text style={{ color: 'red' }}>There was a problem with loading the form. Please try again later.</Text>
            </View>

            :

            <View style={[styles.formContainer,]}>
                <ScrollView
                contentContainerStyle={{ paddingTop:40 }}
                automaticallyAdjustKeyboardInsets
                scrollEventThrottle={400}
                showsVerticalScrollIndicator={false}
                >

                    <FormProvider {...methods}>
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
                            name="phone_number"
                            label="Phone Number"
                            placeholder="Type your phone number"
                            keyboardType="number-pad"
                            rules={{
                            required: 'Required field!',
                            min: 2,
                            }}
                            setFormError={setError}
                        />

                        <Text style={{fontSize:18, fontWeight:"500", marginBottom:10}}>Date of birth</Text>
                        <View style={styles.pickerContainer}>
                            <View style={{flex:1}}>
                                <CustomPicker
                                 name="day"
                                 label="Day:"
                                 //control={methods.control}
                                 rules={{required:'This field es required.'}}
                                 setFormError={(error) => console.error(error)}
                                 options={days.map((d) => ({ label: d.toString(), value: d.toString() }))}
                                />
                            </View>

                            <View style={{flex:1,}}>
                                <CustomPicker
                                 name="month"
                                 label="Month:"
                                 //control={methods.control}
                                 rules={{required:'This field es required.'}}
                                 setFormError={(error) => console.error(error)}
                                 options={months.map((m) => ({ label: m.toString(), value: m.toString() }))}
                                />
                            </View>

                            <View style={{flex:1}}>
                                <CustomPicker
                                 name="year"
                                 label="Year:"
                                 //control={methods.control}
                                 rules={{required:'This field es required.'}}
                                 setFormError={(error) => console.error(error)}
                                 options={years.map((y) => ({ label: y.toString(), value: y.toString() }))}
                                />
                            </View>
                        </View>

                        <View style={[authStyles.formAction, {marginBottom:200}]}>
                            <Button
                            onPress={methods.handleSubmit(onSubmit, onError)}
                            text="Save"
                            styles={authStyles.btn}
                            styleText={authStyles.btnText}
                            disabled={!methods.formState.isValid || isPosting}
                            loading={isPosting}
                            loadingSize={26}
                            />
                        </View>
                    </FormProvider>

                </ScrollView>
            </View>


            }
        </View>
    )
}

export default EditAccountScreen;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 10,
    },
    headerTitle: {
        fontSize: 19,
        fontWeight: '500',
        color: '#000',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        textAlign: 'center',
    },
    formContainer: {
        paddingHorizontal:20,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 20,
      },
    pickerContainer: {
        flex:1,
        flexDirection:"row",
        marginBottom:120,
    },
    picker: {
        height: 100,
    },
});
