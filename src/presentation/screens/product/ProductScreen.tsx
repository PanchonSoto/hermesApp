import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"

import { CustomIcon } from "../../components/ui/CustomIcon";
import { colors } from "../../../config/theme/theme"







export const ProductScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ marginTop: 20 }}>
        {/* image container */}
        <View style={{ width: '100%', height: 350, backgroundColor: '#FFF' }}>
          <Image
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            source={{ uri: 'https://m.media-amazon.com/images/I/51nGxi-shlL._AC_SL1000_.jpg' }}
          />
        </View>
        {/* Product info container */}
        <View style={{ marginHorizontal: 20 }}>

          {/* product Title and icons */}
          <View style={{ marginTop: 20, flexDirection: 'row', borderBottomWidth: 2, borderColor: '#f0f0f0' }}>
            {/* product title */}
            <View style={{ width: '80%',}}>
              <Text style={{ color: 'black', fontSize: 18, fontWeight: '400', }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum omnis sint illo similique, dicta molestias eos.</Text>
              {/* rate info */}
              <View style={{ flexDirection: 'row', marginTop: 5, alignItems: 'center' }}>
                <Text style={{ fontSize: 18, color: 'black', fontWeight: '400', marginRight: 2 }}>4.4</Text>
                <CustomIcon
                  color="black"
                  name="star"
                  size={19}
                />
                <Text style={{ fontSize: 16, color: 'black', fontWeight: '300', marginRight: 2 }}>(4 reviews)</Text>
              </View>
              <Text style={{ marginVertical: 5, fontSize: 20, color: 'black', fontWeight: '600' }}>$100</Text>
            </View>

            <View style={{ flex: 1, }} />
            {/* icon container */}
            <View style={{ padding: 5 }}>
              <View style={{ borderWidth: 1, borderRadius: 100, padding: 8, borderColor: '#cccccc' }}>
                <CustomIcon
                  color="black"
                  size={24}
                  name="heart-outline"
                />
              </View>
            </View>
          </View>
          {/* product color */}
          <View style={{ flexDirection: 'row', borderBottomWidth: 2, borderColor: '#f0f0f0', paddingVertical: 12, width: "100%", alignItems: "center", justifyContent: "flex-start", }}>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: '400', }}>Color</Text>
            <View style={{ flexGrow: 1, flexShrink: 1, flexBasis: 0, }} />
            <Text style={{ color: 'black', fontSize: 18, fontWeight: '400', marginRight: 5 }}>Black</Text>
            <CustomIcon
              color="#bcbcbc"
              name="chevron-forward"
              size={19} />
          </View>
          {/* product quantity */}
          <View style={{ flexDirection: 'row',borderColor: '#f0f0f0', paddingVertical: 12, width: "100%", alignItems: "center", justifyContent: "flex-start", }}>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: '400', }}>Quantity</Text>
            <View style={{ flexGrow: 1, flexShrink: 1, flexBasis: 0, }} />
            {/* btn quantity */}
            <Pressable
              onPress={() => {
                // handle onPress
              }}
              style={{ alignSelf: 'flex-end', backgroundColor: '#F3F2F7', borderTopLeftRadius: 8, borderBottomLeftRadius: 8, }}>
              <View style={[styles.btn,]}>
                <CustomIcon
                  name="remove"
                  size={16}
                  color="#000"
                />
              </View>
            </Pressable>
            {/* counter */}
            <View style={{ alignSelf: 'flex-end', backgroundColor: '#F3F2F7' }}>
              <Text style={[styles.btn, { fontWeight: '600', color: '#000' }]}>1</Text>
            </View>
            {/* btn add */}
            <Pressable
              onPress={() => {
                // handle onPress
              }}
              style={{ alignSelf: 'flex-end', backgroundColor: '#F3F2F7', borderTopRightRadius: 8, borderBottomRightRadius: 8 }}>
              <View style={styles.btn}>
                <CustomIcon
                  name="add"
                  size={16}
                  color="#000"
                />
              </View>
            </Pressable>
          </View>

          {/* buttons */}
          <View style={styles.contentActions}>
            <Pressable
              onPress={() => {
                // handle onPress
              }}
              style={{ paddingHorizontal: 6 }}>
              <View style={styles.btnPrimary}>
                <Text style={styles.btnPrimaryText}>Add to cart</Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => {
                // handle onPress
              }}
              style={{paddingHorizontal: 6, marginBottom: 5, marginTop: 10 }}>
              <View style={styles.btnPay}>
                <Text style={styles.btnText}>Buy Now</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
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
    marginTop:50,
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
