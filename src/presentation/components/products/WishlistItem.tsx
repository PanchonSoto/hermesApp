import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type{ Products } from '../../../domain/entities/productEntity';
import type{ WishListScreenStackParams } from '../../router/Stack/WishListStackNavigator';

import { colors } from '../../../config/theme/theme';
import { Button } from '../ui/Button';

import { deleteWishlistProductsByPage } from '../../../actions/product/delete-wishlist-product';


type WishlistItemProps = {
    product: Products | undefined;
};
const WishlistItem = ({ product }: WishlistItemProps) => {

    const queryClient = useQueryClient();
    const navigation = useNavigation<NavigationProp<WishListScreenStackParams>>();


    const navToProduct = () => {
        navigation.navigate("Product", {product:product!});
    }

    const mutation = useMutation({
        mutationFn: (id:number)=>  deleteWishlistProductsByPage(id),
        onSuccess(data) {
          queryClient.invalidateQueries({queryKey:['wishlist', 'infinite']});
        },
    });

    const onDelete = () => {
        mutation.mutate(product!.id);
    }

    return (
        <View style={styles.product}>
            <View style={styles.productContainer}>

                <View style={styles.productImgContainer}>
                    <Pressable onPress={navToProduct}>
                        <Image source={{ uri: product?.imageurl }} style={{ width: '100%', height: 150, resizeMode: 'contain', alignSelf:'center',}} />
                    </Pressable>
                </View>

                <View style={styles.productInfo}>
                    <Pressable onPress={navToProduct}>
                        <Text style={styles.productTitle}>{product?.name}</Text>
                    </Pressable>
                    <Text style={styles.productPrice}>$ {product?.price}</Text>
                    <View style={styles.contentActions}>

                        <Button onPress={onDelete}
                            disabled={mutation.isPending}
                            text="Delete"
                            styles={styles.btn} styleText={styles.btnText} styleContainer={{ flex: 1, paddingHorizontal: 6, marginBottom: 5, marginTop: 20, width: '90%', alignSelf: 'center' }} />

                        <Button onPress={() => { }} text="Add to cart"
                            styles={styles.btnPrimary} styleText={styles.btnPrimaryText} styleContainer={{ flex: 1, paddingHorizontal: 6, marginBottom: 5, width: '90%', alignSelf: 'center' }} />

                    </View>
                </View>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    productContainer: {
        // borderWidth:1,
        // borderColor: 'orange',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        // justifyContent: 'space-between',
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    productImgContainer: {
        //   borderWidth:1,
        height: '100%',
        // borderColor: 'blue',
        // width: '40%',
        width: '100%',
        flex: 2,
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
        fontSize: 16,
        fontWeight: '400',
        color: '#000',
        textAlign: 'left',
        paddingHorizontal: 10,
    },
    productPrice: {
        color: 'red',
        fontWeight: '300',
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

export default WishlistItem;
