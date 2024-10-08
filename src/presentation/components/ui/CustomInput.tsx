import React from 'react';

import { View, TextInput, TextInputProps, Text } from 'react-native';

import { useController, useFormContext, UseControllerProps } from 'react-hook-form';
import { authStyles } from '../../../config/theme/theme';


interface CustomInputProps extends TextInputProps, UseControllerProps {
    label: string;
    name: string;
    defaultValue?: string
    setFormError: Function;
}


const ControlledInput = (props: CustomInputProps) => {

    const formContext = useFormContext();
    const { formState } = formContext;

    const {
        name,
        label,
        rules,
        defaultValue,
        ...inputProps
    } = props;

    const { field } = useController({ name, rules, defaultValue });

    const hasError = Boolean(formState?.errors[name]);

    return (
        <View style={authStyles.input}>
            <Text style={authStyles.inputLabel}>{label}</Text>

            <TextInput
                clearButtonMode="while-editing"
                placeholderTextColor="#6b7280"
                style={[authStyles.inputControl, {
                    color: (formState.errors[name]) ? 'red' : '#222'
                }]}
                {...inputProps}
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
            />
            {hasError && (
                <Text style={{ color: 'red' }}>
                    {typeof formState.errors[name]?.message === 'string' && formState.errors[name]?.message}
                </Text>
            )}
        </View>
    );
}

export const CustomInput = (props: CustomInputProps) => {

    const {
        name,
        rules,
        label,
        defaultValue,
        setFormError,
        ...inputProps
    } = props;

    const formContext = useFormContext();

    // Placeholder until input name is initialized
    if (!formContext || !name) {
        const msg = !formContext ? "TextInput must be wrapped by the FormProvider" : "Name must be defined"
        console.error(msg)
        setFormError(true)
        return null
    }

    return <ControlledInput {...props} />;

};
