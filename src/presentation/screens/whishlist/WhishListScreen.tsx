import React from 'react';
import { View, Text, FlatList, Image, Pressable } from 'react-native';
import { Button } from '../../components/ui/Button';
import { WishListScreenStackParams } from '../../router/Stack/WishListStackNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const products: Product[] = [
  { id: 1, name: 'Product 1', price: 100, imageUrl: 'https://m.media-amazon.com/images/I/51UtM-A3fdL.jpg' },
  { id: 2, name: 'Product 2', price: 200, imageUrl: 'https://images.samsung.com/is/image/samsung/p6pim/mx/2401/gallery/mx-galaxy-s24-s928-sm-s928bzkmltm-539300146?$650_519_PNG$' },
  // Add more products as needed
];

const WishlistItem = ({ product }: { product: Product }) => (
  <View style={{ marginBottom: 20 }}>
    <Image source={{ uri: product.imageUrl }} style={{ width: 150, height: 150 }} />
    <Text>{product.name}</Text>
    <Text>${product.price}</Text>
    <Button text="Remove from Wishlist" onPress={() => console.log(`Removed ${product.name}`)} />
  </View>
);

export const WhishListScreen: React.FC = () => {

  const navigation = useNavigation<NavigationProp<WishListScreenStackParams>>();

  return (
    <>
      <Pressable onPress={()=>navigation.navigate('Product',{productId:'123'})}>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 24, marginBottom: 10 }}>Wishlist</Text>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <WishlistItem product={item} />}
          />
        </View>
      </Pressable>
    </>

  );
};
