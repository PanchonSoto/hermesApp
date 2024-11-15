import { Image, ScrollView, StyleSheet, Text, View, Vibration } from "react-native";
import { useEffect, useState } from "react";

import type{ StackScreenProps } from "@react-navigation/stack";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CustomIcon } from "../../components/ui/CustomIcon";
import { colors } from "../../../config/theme/theme"
import { Button } from "../../components/ui/Button";

import type{ HomeScreenStackParams } from "../../router/Stack/HomeStackNavigator";
import type{ WishListScreenStackParams } from "../../router/Stack/WishListStackNavigator";
import type{ WishlistCachedData } from "../../store/products/useWishlistStore";

import { deleteWishlistProductsByPage } from "../../../actions/product/delete-wishlist-product";
import { createWishlistProductsByPage } from "../../../actions/product/create-wishlist-product";

import { useCartStore } from "../../store/products/useCartStore";






interface Props extends StackScreenProps<HomeScreenStackParams|WishListScreenStackParams, 'Product'>{};

export const ProductScreen = ({route, navigation}: Props) => {

  const { product } = route.params;

  const [quantity, setQuantity] = useState<number>(1);
  const [favorite, setFavorite] = useState<boolean>(false);

  const { addProductToCart } = useCartStore();

  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData<WishlistCachedData>(['wishlist', 'infinite']);

  const wishlist = cachedData?.pages.map(page => page.wishlist).flat() ?? [];
  const isWished = wishlist.some(item => item.product_id === product.id);

  useEffect(() => {
    setFavorite(isWished);
  }, [isWished]);


  const mutation = useMutation({
    mutationFn: (id:number)=> {
      return favorite
      ? deleteWishlistProductsByPage(id)
      : createWishlistProductsByPage(id);
    },
    onSuccess(data) {
      setFavorite(!favorite);
      queryClient.invalidateQueries({queryKey:['wishlist', 'infinite']});
      Vibration.vibrate([1, 1], false);
    },
  });

  const onFavorite = () => {
    mutation.mutate(product.id);
  }

  const onAddToCart = () => {
    addProductToCart(product, quantity);
  }


  return (
    <ScrollView>
      <View style={{ marginTop: 20 }}>
        {/* image container */}
        <View style={styles.imgContainer}>
          <Image
            style={styles.img}
            source={{uri:product.imageurl}}
          />
        </View>
        {/* Product info container */}
        <View style={{ paddingHorizontal: 20,}}>

          {/* product Title and icons */}
          <View style={styles.productHeader}>
            {/* product title */}
            <View style={{ width: '80%', }}>
              <Text style={{ color: 'black', fontSize: 24, fontWeight: '600',marginBottom:5}}>{product.name}</Text>
                <Text style={{ color: 'black', fontSize: 18, fontWeight: '400', }}>{product.description}</Text>
                {/* rate info */}
                <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                  <Text style={{ fontSize: 18, color: 'black', fontWeight: '500', marginRight: 2 }}>4.4</Text>
                  <CustomIcon
                    color="gold"
                    name="star"
                    size={19}
                  />
                  <Text style={{ fontSize: 16, color: 'black', fontWeight: '400', marginRight: 2 }}>(4 reviews)</Text>
                </View>
                <Text style={{ marginVertical: 10, fontSize: 20, color: 'black', fontWeight: '600' }}>${product.price}</Text>
            </View>

            <View style={{ flex: 1, }} />
            {/* icon container */}
            <View style={{ padding: 5 }}>
              <Button
                // styles={styles.btn}
                styleContainer={{borderWidth: 1, borderRadius: 100, padding: 8, borderColor: '#cccccc'}}
                text=""
                onPress={onFavorite}
                disabled={mutation.isPending}
                icon={ (favorite) ? "heart" : "heart-outline" }
                iconColor={(favorite) ? "red" : "black"}
                iconSize={24}
              />

            </View>
          </View>
          {/* product stock */}
          <View style={[styles.productInfoRow, {borderBottomWidth:2}]}>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: '400', }}>Stock</Text>
            <View style={{ flexGrow: 1, flexShrink: 1, flexBasis: 0, }} />
            <Text style={{ color: 'black', fontSize: 18, fontWeight: '400', marginRight: 10 }}>{product.stock}</Text>
            <CustomIcon
              color="#bcbcbc"
              name="file-tray-stacked"
              size={19} />
          </View>
          {/* product quantity */}
          <View style={styles.productInfoRow}>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: '400', }}>Quantity</Text>
            <View style={{ flexGrow: 1, flexShrink: 1, flexBasis: 0, }} />
            {/* btn quantity */}
            <Button
             styles={styles.btn}
             styleContainer={{alignSelf: 'flex-end', backgroundColor: '#efefef', borderTopLeftRadius: 8, borderBottomLeftRadius: 8,}}
             text=""
             onPress={()=> quantity<=1 ? undefined : setQuantity(quantity-1)}
             icon="remove"
             iconSize={16}
             iconColor="#000"
            />
            {/* counter */}
            <View style={[{ backgroundColor: '#efefef' }, styles.btn,]}>
              <Text style={[ { fontWeight: '600', color: '#000' }]}>{quantity}</Text>
            </View>
            {/* btn add */}
            <Button
             styles={styles.btn}
             styleContainer={{alignSelf: 'flex-end', backgroundColor: '#efefef', borderTopRightRadius: 8, borderBottomRightRadius: 8,}}
             text=""
             onPress={()=>{ quantity>=product.stock ? undefined : setQuantity(quantity+1)}}
             icon="add"
             iconSize={16}
             iconColor="#000"
            />
          </View>

          {/* buttons */}
          <View style={styles.contentActions}>

            <View >
              <Button onPress={onAddToCart} text="Add to cart"
                styles={styles.btnPrimary} styleText={styles.btnPrimaryText} styleContainer={{ paddingHorizontal: 6 }}
              />
              <Button onPress={() => { }} text="Buy now"
                styles={styles.btnPay} styleText={styles.btnPrimaryText} styleContainer={{ marginTop: 10 }}
              />
            </View>

          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  img:{
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  imgContainer:{
    width: '100%',
    height: 350,
    backgroundColor: '#FFF',
    paddingHorizontal:20
  },
  productHeader:{
    marginTop: 20,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#f0f0f0'
  },
  productInfoRow:{
    flexDirection: 'row',
    borderColor: '#f0f0f0',
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 30,
    height: 35,
  },
  contentActions: {
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
    marginBottom: 50,
  },
  btnPay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#000',
    borderColor: '#000',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '600',
    color: '#fff',
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderWidth: 2,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  btnPrimaryText: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '700',
    color: '#fff',
  },
});
