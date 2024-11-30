import { View, Text, TextInputProps, Platform } from "react-native";
import { useController, UseControllerProps } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";


interface Option {
    label: string;
    value: string | number;
}
interface CustomInputProps extends UseControllerProps {
    label: string;
    name: string;
    defaultValue?: string;
    setFormError: (error: string) => void;
    options: Option[];
}




export const CustomPicker = (props: CustomInputProps) => {

    const {
        name,
        label,
        defaultValue,
        options,
        control,
        rules,
        ...inputProps
    } = props;

    const {
      field: { onChange, value },
    } = useController({
      control,
      name,
      rules,
      defaultValue,
    });

    return (

      <View>
        {label && <Text style={{ margin: (Platform.OS==="ios") ? "auto" : undefined }}>{label}</Text>}
        <Picker
          selectedValue={value}
          onValueChange={(itemValue) => onChange(itemValue)}
          style={{height:100}}
          mode="dropdown"
        >
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
    );
};
