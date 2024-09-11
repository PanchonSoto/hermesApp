import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


import { CustomIcon } from './CustomIcon';




export const SearchTop = () => {

   const navigation = useNavigation<StackNavigationProp<any>>();

    return (
        <View style={styles.searchWrapper}>
            <Pressable onPress={() => navigation.navigate('SearchScreen')}>
                <View style={styles.search}>
                    <View style={styles.searchIcon}>
                        <CustomIcon
                            color="#848484"
                            name="search"
                            size={17}
                        />
                    </View>

                    <View style={styles.searchControl}>
                        <Text>Search in HermesHub...</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    )
}


const styles = StyleSheet.create({
    search: {
        position: 'relative',
        backgroundColor: '#efefef',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#3F51B5',
      },
      searchWrapper: {
        paddingTop: 15,
        paddingHorizontal: 16,
        paddingBottom: 15,
        // marginTop: 5,
        borderBottomWidth: 1,
        borderColor: '#3F51B5', //efefef
        backgroundColor: '#3F51B5',
        width: '100%'
      },
      searchIcon: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 34,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
      },
      searchControl: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        paddingLeft: 34,
        width: '100%',
        // fontSize: 16,
        // fontWeight: '500'
      },
});
