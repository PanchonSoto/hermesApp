import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

import { FakeStoreAPI } from '../../../infrastructure/interfaces/product/fakeStoreApi';
import { tabStyles } from '../../../config/theme/theme';




interface Props {
    products: FakeStoreAPI[];
}

const ProductsHortizontalCards = ({ products }: Props) => {
    return (
        <>
            <Text style={tabStyles.title}>Recently viewed</Text>

            {/* <View style={styles.listHeader}> */}
            <FlatList
                data={products}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.cardContainerH}>
                        <Image style={styles.cardImageH} source={{ uri: item.image }} />
                    </View>
                )}
            />
        </>
    );
}

const styles = StyleSheet.create({
    // listHeader: {
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   justifyContent: 'space-between',
    //   paddingHorizontal: 24,
    // },
    /** card horizontal*/
    cardContainerH: {
        marginTop: 10,
        marginHorizontal: 5,
        width: 120,
        backgroundColor: '#fff',
        // borderWidth:1,
        // borderColor: '#C9D3DB',//C9D3DB
        borderRadius: 8,
        overflow: 'hidden',
        height: 120,
        padding: 10,
    },
    cardImageH: {
        height: 100,
        width: '100%',
        resizeMode: 'contain',
    },
})

export default ProductsHortizontalCards
