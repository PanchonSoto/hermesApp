import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { confirmPayment, useStripe } from '@stripe/stripe-react-native';
import Decimal from 'decimal.js';

import { hermesApi } from '../../../config/api/hermesApi';
import { User } from '../../../infrastructure/interfaces/auth/auth.responses';


interface Props {
    user: User;
    total: number;
}

const CustomCardForm = ({total, user}: Props) => {

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const stripe = useStripe();

  const handlePayment = async () => {

    const totalInDecimal = new Decimal(total);
    const amountInCents = totalInDecimal.times(100).toFixed(0);

    const response = await hermesApi.post(`/payment/createPaymentIntent`, {
      amount: amountInCents,
    });

    const clientSecret = response.data.clientSecret;

    // Confirmar el pago con el client secret
    const { error, paymentIntent } = await confirmPayment(clientSecret, {
    paymentMethodType: 'Card',
    paymentMethodData: {
        billingDetails: {
        email: user?.email,
        name: user?.username,

        }
    }
    });

    if (error) {
      console.error(error);
    } else {

    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Card Number"
        keyboardType="number-pad"
        value={cardNumber}
        onChangeText={setCardNumber}
        style={styles.input}
      />
      <TextInput
        placeholder="MM/YY"
        keyboardType="number-pad"
        value={expiryDate}
        onChangeText={setExpiryDate}
        style={styles.input}
      />
      <TextInput
        placeholder="CVC"
        keyboardType="number-pad"
        value={cvc}
        onChangeText={setCvc}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default CustomCardForm;
