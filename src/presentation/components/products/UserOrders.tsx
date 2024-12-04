import { View, Text, Image, StyleSheet, Pressable, FlatList } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';


import { ThemeContext } from '../../context/ThemeContext';
import { colors } from '../../../config/theme/theme';

import { UserOrder } from '../../../infrastructure/interfaces/orders/order-res.interface';

import { Collapsible } from '../ui/Collapsible';




type OrderProps = {
    order: UserOrder;
};
const OrdersCard = ({ order }: OrderProps) => {

    const { colors } = useContext(ThemeContext);

    const ordersItems = order?.orderitems;
    const product = ordersItems[0];
    const orderTotal = order?.total_price;
    const orderDate = order?.order_date;
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


    const queryClient = useQueryClient();
    // const navigation = useNavigation<NavigationProp<WishListScreenStackParams>>();


    const navToProduct = () => {
        // navigation.navigate("Product", {product:product!});
    }



    return (
        <View style={styles.product}>
            <View style={styles.productContainer}>
                <Collapsible title={product.products.name+"..."} total={orderTotal}>
                    <FlatList
                    scrollEnabled={false}
                    ListHeaderComponent={(
                        <View>
                            <Text style={{fontSize:16, paddingHorizontal:20, paddingVertical:5}}> <Text style={{fontSize:16, fontWeight:"600"}}>Order date:</Text> {
                            (new Date(orderDate).toLocaleDateString("en-US",options as Intl.DateTimeFormatOptions)) }
                            </Text>
                        </View>
                    )}

                    data={ordersItems?.flat().map(items=>items.products) ?? []}
                    keyExtractor={(item, index) => `${item?.id}-${index}`}
                    renderItem={({ item }) => (

                        <View style={styles.productContainer}>
                            <View style={styles.productImgContainer}>
                                 <Pressable onPress={navToProduct}>
                                    <Image source={{ uri: item?.imageurl }} style={{ width: '100%', height: 60, resizeMode: 'contain', alignSelf:'center',}} />
                                </Pressable>
                            </View>

                            <View style={styles.productInfo}>
                                <Pressable onPress={navToProduct}>
                                    <Text style={styles.productTitle}>{item?.name}</Text>
                                </Pressable>
                                <Text style={{marginLeft:11, fontSize:16, marginVertical:5}}>Quantity: { ordersItems.find(orderItem => orderItem.product_id === item.id)?.quantity || 0 }</Text>
                                <Text style={styles.productPrice}>${item?.price}</Text>
                                <View style={styles.contentActions}>

                                </View>
                            </View>

                        </View>
                    )}
                    />
                </Collapsible>

            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    productContainer: {
        marginVertical: 20,
        paddingHorizontal: 10,
        flexDirection:"row",
    },
    productImgContainer: {
        //   borderWidth:1,
        height: '100%',
        // borderColor: 'blue',
        // width: '40%',
        width: '100%',
        flex: 1,
        paddingVertical:10,
        // alignSelf: 'center'
    },
    productInfo: {
        //   borderWidth:1,
        // borderColor: 'red',
        // justifyContent: 'flex-start',
        // width: '60%',
        flex: 2,
        // paddingHorizontal:10,
        marginLeft: 10,
    },
    product: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 1,

        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 10,

    },
    productTitle: {
        fontSize: 18,
        fontWeight: '400',
        color: colors.primary,
        textAlign: 'left',
        paddingHorizontal: 10,
    },
    productPrice: {
        color: 'black',
        fontWeight: '600',
        fontSize: 18,
        paddingHorizontal: 10,
        paddingTop: 5,
    },
    contentActions: {
        // borderWidth:1,
        flexDirection: 'column',
        // alignItems: 'center',
        //   justifyContent: 'space-between',
        // marginTop: 18,
        marginBottom: 0,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderWidth: 1,
        backgroundColor: 'transparent',
        borderColor: 'red',
    },
    btnText: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '600',
        color: 'red',
    },
    btnPrimary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderWidth: 2,
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    btnPrimaryText: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '700',
        color: '#fff',
    },

});

export default OrdersCard;
