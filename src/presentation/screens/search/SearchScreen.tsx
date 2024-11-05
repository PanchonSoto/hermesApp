import { StyleSheet, SafeAreaView, View, ScrollView, Text, TextInput, TouchableOpacity, Pressable, Animated, Platform } from 'react-native';
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { CustomIcon } from '../../components/ui/CustomIcon';
import { CustomView } from '../../components/ui/CustomView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const products = [
    {
        img: '',
        name: 'Xiaomi Celular Poco X6 5G Blue 12GB RAM 256GB ROM',
    },
    {
        img: 'https://m.media-amazon.com/images/I/51kzGR56-qL._AC_SL1000_.jpg',
        name: 'Xiaomi Celular Poco X6 5G Blue 12GB RAM 256GB ROM',
    },
    {
        img: 'https://m.media-amazon.com/images/I/51MAObV9ekL._AC_SL1000_.jpg',
        name: 'Apple iPhone 13, 128GB',
    },
    {
        img: 'https://m.media-amazon.com/images/I/51250UmEzsL._AC_SL1000_.jpg',
        name: 'Apple 2024 MacBook Air (de 13 Pulgadas, Chip M3 CPU de 8 núcleos y GPU de 8 núcleos, 8GB Memoria unificada, 256 GB)',
    },
    {
        img: 'https://m.media-amazon.com/images/I/51MZUePm+SL._AC_SL1215_.jpg',
        name: 'ACER Laptop Aspire Lite 16" WUXGA',
    },
    {
        img: 'https://m.media-amazon.com/images/I/613aL6vxQGL._AC_SL1200_.jpg',
        name: 'SAMSUNG Celular Galaxy M35 5G',
    },
    {
        img: 'https://m.media-amazon.com/images/I/71DIt6oIe3L._AC_SL1500_.jpg',
        name: '2020 Apple MacBook Pro con chip Apple M1',
    },
    {
        img: 'https://m.media-amazon.com/images/I/61x3nRatR9L._AC_SL1500_.jpg',
        name: 'Keychron K3 versión 2',
    },
];

export const SearchScreen = () => {

  const {top, bottom} = useSafeAreaInsets();
  console.log({top, bottom});

  const navigation = useNavigation<NavigationProp<any>>();
  const [input, setInput] = useState('');

  const filteredRows = useMemo(() => {
    const rows = [];
    const query = input.toLowerCase();

    for (const item of products) {
      const nameIndex = item.name.toLowerCase().search(query);

      if (nameIndex !== -1) {
        rows.push({
          ...item,
          index: nameIndex,
        });
      }
    }

    return rows.sort((a, b) => a.index - b.index);
  }, [input]);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    // <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

      <CustomView style={styles.container}>

        <View style={styles.searchWrapper}>
          <Animated.View style={{opacity: fadeAnim,justifyContent: 'center', marginHorizontal: 10, }}>
            <Pressable style={{flex:1,justifyContent:'center'}}
            onPress={()=>navigation.goBack()}>
                <CustomIcon
                  color="#fff"
                  name="arrow-back"
                  size={24}
                />
            </Pressable>
          </Animated.View>
          <View style={styles.search}>
            <View style={styles.searchIcon}>
              <CustomIcon
                color="#848484"
                name="search"
                size={17}
              />
            </View>

            <TextInput
              autoFocus
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={val => setInput(val)}
              placeholder="Search in HermesHub..."
              placeholderTextColor="#848484"
              returnKeyType="done"
              style={styles.searchControl}
              value={input} />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.searchContent} showsVerticalScrollIndicator={false}>
          {filteredRows.length ? (
            filteredRows.map(({ img, name }, index) => {
              return (
                <View key={index} style={styles.cardWrapper}>
                  <TouchableOpacity
                    onPress={() => {
                      // handle onPress
                    }}>
                    <View style={styles.card}>

                    <View style={styles.cardAction}>
                        <CustomIcon
                          color="#9ca3af"
                          name="refresh"
                          size={22}
                        />
                      </View>

                      <View style={styles.cardBody}>
                        <Text style={styles.cardTitle}>{name.slice(0,40)}</Text>
                      </View>

                      <View style={{marginHorizontal:5}}>
                        <CustomIcon
                          color="#9ca3af"
                          name="close"
                          size={22} />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <Text style={styles.searchEmpty}>No results</Text>
          )}
        </ScrollView>
      </CustomView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Search */
  search: {
    position: 'relative',
    backgroundColor: '#efefef',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#3F51B5',
    flex:1,
    marginRight:16
  },
  searchWrapper: {
    flexDirection:'row',
    paddingTop: 15,
    // paddingHorizontal: 10,
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
    // paddingVertical: 5,
    // paddingHorizontal: 14,
    // paddingLeft: 34,
    // width: '100%',
    paddingVertical: (Platform.OS==="ios" ? 10 : 6),
    paddingHorizontal: 14,
    paddingLeft: 34,
    width: '100%',

    // fontSize: 16,
    // fontWeight: '500'
  },

  searchContent: {
    paddingHorizontal: 10,
  },
  searchEmpty: {
    textAlign: 'center',
    paddingTop: 16,
    fontWeight: '500',
    fontSize: 15,
    color: '#9ca1ac',
  },

  /** Card */
  card: {
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  cardWrapper: {
    borderBottomWidth: 1,
    borderColor: '#d6d6d6',
  },
  cardImg: {
    width: 42,
    height: 42,
    borderRadius: 12,
  },
  cardAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9ca1ac',
  },
  cardAvatarText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardBody: {
    marginRight: 'auto',
    marginLeft: 12,
    width:'80%'
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  cardPhone: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '500',
    color: '#616d79',
    marginTop: 3,
  },
  cardAction: {
    paddingRight: 5,
  },
});
