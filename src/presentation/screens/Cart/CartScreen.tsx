import { View, Text, Pressable, StyleSheet, Image, FlatList, ScrollView } from 'react-native';
import { type NavigationProp, useNavigation } from '@react-navigation/native';

import type{ CartStackParams } from '../../router/Stack/CartStackNavigator';

import { colors, tabStyles } from '../../../config/theme/theme';

import CartProducts from '../../components/products/CartProducts';
import { CustomView } from '../../components/ui/CustomView';
import { SearchTop } from '../../components/ui/SearchTop';
import { Button } from '../../components/ui/Button';

import { useCartStore } from '../../store/products/useCartStore';





export const CartScreen = () => {

  const navigation = useNavigation<NavigationProp<CartStackParams>>();
  const { cart, total } = useCartStore();

  return (
    <View style={{ flex: 1, }}>

      {/* search bar */}
      <SearchTop />

      <CustomView style={{ paddingHorizontal: 10 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Text style={tabStyles.title}>Your Cart {cart.length>0?(cart.length):''}</Text>
          <View style={{ flex: 1 }} />
          <Text style={tabStyles.title}>Total:{' '}
            <Text style={{ color: colors.primary }}>{total}</Text>
          </Text>
        </View>

        { ( cart.length===0 )
            ? ( <Text style={{ alignSelf: 'center', paddingTop: 200 }}>Cart empty...</Text> )
            :
            (
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
                      <Text style={styles.rowLabel}>$1400</Text>
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
                      <Text style={styles.rowLabel}>$1410</Text>
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
                      <Text style={styles.rowLabel}>$1410</Text>
                    </Pressable>
                  </View>
                </View>

              </View>

              {/* checkout */}
              <View style={styles.checkoutAction}>
                <Button
                  onPress={() => { }}
                  styleContainer={styles.btnCheckout}
                  styleText={styles.btnCheckoutText}
                  text="Proced to checkout"
                />

              </View>
            </ScrollView>
            )

          }



      </CustomView>

    </View>
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
    marginBottom: 30,
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
