import { View, Text, Pressable, StyleSheet, Image, FlatList, ScrollView, Alert } from 'react-native';
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import { Details } from '@stripe/stripe-react-native/lib/typescript/src/types/components/CardFieldInput';
import Decimal from 'decimal.js';

import type { CartStackParams } from '../../router/Stack/CartStackNavigator';

import { colors, tabStyles } from '../../../config/theme/theme';

import CartProducts from '../../components/products/CartProducts';
import { CustomView } from '../../components/ui/CustomView';
import { SearchTop } from '../../components/ui/SearchTop';
import { Button } from '../../components/ui/Button';

import { hermesApi } from '../../../config/api/hermesApi';
import { useCartStore } from '../../store/products/useCartStore';
import { useAuthStore } from '../../store/auth/useAuthStore';




export const CartScreen = () => {

  const navigation = useNavigation<NavigationProp<CartStackParams>>();
  const queryClient = useQueryClient();
  const { confirmPayment } = useConfirmPayment();

  const [cardDetails, setCardDetails] = useState<Details>();

  const { cart, total, resetCart } = useCartStore();
  const { user } = useAuthStore();



  async function handlePayment() {

    try {
      const totalInDecimal = new Decimal(total);
      const amountInCents = totalInDecimal.times(100).toFixed(0);

      const response = await hermesApi.post(`/payment/createPaymentIntent`, {
        amount: amountInCents,
      });

      const clientSecret = response.data.clientSecret;

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
        console.error('Payment confirmation error', error);

        Alert.alert(`Pago fallido: ${error.message}`);

      } else if (paymentIntent) {

        await hermesApi.post(`/orders/createOrder`, {
          paymentId: paymentIntent.id,
          cartItems: cart,
        });

        Alert.alert(`Compra realizada correctamente`);

        queryClient.invalidateQueries({queryKey:['orders', 'infinite']});
        resetCart();

      }
    } catch (error) {
      console.log({error});
      throw new Error(JSON.stringify(error));
    }

  }

  return (

    <CustomView>

      {/* search bar */}
      <SearchTop />

      <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
        <Text style={tabStyles.title}>Your Cart {cart.length > 0 ? (cart.length) : ''}</Text>
        <View style={{ flex: 1 }} />
        <Text style={tabStyles.title}>Total:{' $'}
          <Text style={{ color: colors.primary }}>{total}</Text>
        </Text>
      </View>

      {(cart.length === 0)
        ? (<Text style={{ alignSelf: 'center', paddingTop: 200 }}>Cart empty...</Text>)
        :
        (
          <View style={{ paddingHorizontal: 10, flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <FlatList
                data={cart}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <CartProducts product={item} />}
                scrollEnabled={false}
                style={{ marginBottom: 20 }}
              />


              {/* summary */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Summary:</Text>
                <View style={styles.sectionBody}>
                  <View style={[styles.rowWrapper, styles.rowFirst]}>
                    <Pressable
                      onPress={() => {
                        // handle onPress
                      }}
                      style={styles.row}>
                      <Text style={styles.rowLabel}>Products total:</Text>
                      <View style={styles.rowSpacer} />
                      <Text style={styles.rowLabel}>${total}</Text>
                    </Pressable>
                  </View>
                  <View style={styles.rowWrapper}>
                    <Pressable
                      onPress={() => {
                        // handle onPress
                      }}
                      style={styles.row}>
                      <Text style={styles.rowLabel}>Shipping:</Text>
                      <View style={styles.rowSpacer} />
                      <Text style={styles.rowLabel}>$10</Text>
                    </Pressable>
                  </View>
                  <View style={styles.rowWrapper}>
                    <Pressable
                      onPress={() => {
                        // handle onPress
                      }}
                      style={styles.row}>
                      <Text style={styles.rowLabel}>Subtotal:</Text>
                      <View style={styles.rowSpacer} />
                      <Text style={styles.rowLabel}>${total}</Text>
                    </Pressable>
                  </View>
                  <View style={[styles.rowWrapper, styles.rowLast]}>
                    <Pressable
                      onPress={() => {
                        // handle onPress
                      }}
                      style={styles.row}>
                      <Text style={styles.rowLabel}>Total (taxes included):</Text>
                      <View style={styles.rowSpacer} />
                      <Text style={styles.rowLabel}>${total+10}</Text>
                    </Pressable>
                  </View>
                </View>

              </View>


              {/* checkout */}
              <View style={styles.checkoutAction}>

              {/* <CustomCardForm total={total} user={user!}/> */}
              <CardField
                postalCodeEnabled={false}
                placeholders={{
                  number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                  backgroundColor: '#FFFFFF',
                  textColor: '#000000',
                }}
                style={{
                  width: '100%',
                  height: 50,
                  // marginVertical: 30,
                  marginBottom:20
                }}
                onCardChange={(cardDetails) => {
                  setCardDetails(cardDetails);
                }}
              />

                <Button
                  onPress={() => handlePayment()}
                  styleContainer={styles.btnCheckout}
                  styleText={styles.btnCheckoutText}
                  text="Proced to checkout"
                  disabled={ !cardDetails?.complete}
                />

              </View>
            </ScrollView>
          </View>
        )

      }



    </CustomView>
  );
}

const styles = StyleSheet.create({
  /* summary */
  section: {
    // justifyContent:'flex-end',
    // alignContent: 'flex-end',
    // alignItems: 'flex-end',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 22,
    color: '#121a26',
    marginTop: 15,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  sectionBody: {
    borderRadius: 12,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,
    // elevation: 1,
  },
  row: {
    height: 44,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 5,
  },
  rowWrapper: {
    // borderWidth:1,
    paddingLeft: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
    // borderWidth:1,
    // flexDirection: 'row',
  },
  rowFirst: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,

  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    color: '#000',
  },
  rowSpacer: {
    // borderWidth:1,
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowLast: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginBottom: 50,
  },

  /* checkout */
  checkoutAction: {
    marginBottom: 20,
  },
  btnCheckout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  btnCheckoutText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  }
});
