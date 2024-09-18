import { View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native'
import { useRef, useState } from 'react';
import { InfiniteData } from '@tanstack/react-query';

import { tabStyles, globalStyles } from '../../../config/theme/theme';
import { Product } from '../../../domain/entities/productEntity';
import { FakeStoreAPI } from '../../../infrastructure/interfaces/product/fakeStoreApi';

import { CustomIcon } from '../ui/CustomIcon';
import ProductsHortizontalCards from './ProductsHortizontalCards';




interface Props {
    isLoading: boolean;
    data: InfiniteData<Product | undefined, unknown> | undefined;
    recenltyProducts: FakeStoreAPI[];

    nextPage: () => void;
}

const ProductsVerticalCards = ({ isLoading, data, recenltyProducts, nextPage }: Props) => {

    const flatListRef = useRef<FlatList>(null);
    const [contentVerticalOffset, setContentVerticalOffset] = useState(0);
    const CONTENT_OFFSET_THRESHOLD = 400;

    //counts the total products of each pages "pages[[products][products]]"
    const totalProdutsFetched = data?.pages
        .map(page => page?.products?.length ?? 0)
        .reduce((acc = 0, length = 0) => acc + length, 0) ?? 0;
    //scroll to top by btn
    const scrollAtTopp = () => {
        flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    };

    //method that fetch and prevent more request if no one products left
    const handleEndReached = () => {
        if (totalProdutsFetched === data?.pages[0]?.totalProducts) return;
        nextPage();
    };

    return (
        <>
            {/* <Text style={tabStyles.title}>All products</Text> */}

            <FlatList
                ref={flatListRef}
                numColumns={2}
                data={data?.pages.map(page => page?.products).flat() ?? []}
                keyExtractor={(item, index) => `${item?.id}-${index}`}

                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.8}
                onScroll={(event)=>setContentVerticalOffset(event.nativeEvent.contentOffset.y)}
                scrollEventThrottle={200}

                renderItem={({ item }) => (
                    <View style={styles.cardContainerV}>
                        <Image style={styles.cardImageV} source={{ uri: item?.imageurl }} />

                        <Text style={[globalStyles.subtitle, { marginTop: 10, }]}>
                            {item?.name}
                        </Text>

                        <Text style={[styles.listTitle, { marginVertical: 10, }]}>${item?.price}</Text>
                    </View>
                )}


                ListFooterComponent={() => <View style={{ marginBottom: 90 }} />}
                ListHeaderComponent={() =>
                    <>
                        <ProductsHortizontalCards products={recenltyProducts} />
                        <Text style={tabStyles.title}>All products</Text>
                    </>
                }
            />



            {/* BTN scrollTop */}
            {
                contentVerticalOffset > CONTENT_OFFSET_THRESHOLD && (
                     <Pressable style={[globalStyles.btnPrimary,]} onPress={scrollAtTopp}>
                        <CustomIcon
                            color="#fff"
                            name="arrow-up"
                            size={24}

                        />
                    </Pressable>
                )
            }
        </>
    );
}

const styles = StyleSheet.create({
    listTitle: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 20,
        color: '#121a26',
        paddingHorizontal: 10,
    },

    /* card verical */
    cardContainerV: {
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
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
        marginHorizontal: 5,
        paddingTop: 20,
        paddingBottom: 10,


        // marginTop: 5,
        // marginHorizontal: 5,
        // marginBottom: 10,
        // paddingHorizontal: 20,
        // // paddingTop:5,
        // paddingBottom: 5,
        // flex: 1,
        // height: 250,
        // borderRadius: 5,
        // overflow: 'hidden',
        // justifyContent: 'center',
        // // alignContent: 'center',
        // alignItems: 'center',
        // // alignSelf: 'center'
    },
    cardImageV: {
        height: 120,
        width: '100%',
        resizeMode: 'contain',
    },
});

export default ProductsVerticalCards;
