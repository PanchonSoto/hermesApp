import { View, Text, StyleSheet, Pressable, ScrollView, Image } from "react-native";

import { useNavigation, NavigationProp } from "@react-navigation/native";

import { CustomView } from "../../components/ui/CustomView"
import { CustomIcon } from "../../components/ui/CustomIcon";

import { useAuthStore } from "../../store/auth/useAuthStore";
import { MenuStackParams } from "../../router/Stack/MenuStackNavigator";


export const MenuScreen = () => {

  const { logout, user } = useAuthStore();
  const navigation = useNavigation<NavigationProp<MenuStackParams>>();



  return (
    <CustomView>
      {/* header */}
      <View style={styles.header}>

        <Text numberOfLines={1} style={styles.headerTitle}>
          Settings
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {/* account section */}
        <View style={[styles.section, { paddingTop: 4 }]}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View>
            <Pressable
              onPress={() => {
                // handle onPress
              }}
              style={[styles.profile, styles.sectionBody]}>
              <Image
                alt="Profile image"
                source={require('../../../assets/profile_blank.webp')}
                style={styles.profileAvatar} />
              <View style={styles.profileBody}>
                <Text style={styles.profileName}>{user?.username}</Text>
                <Text style={styles.profileHandle}>{user?.email}</Text>
              </View>
              {/* <CustomIcon
                color="#bcbcbc"
                name="chevron-forward"
                size={22} /> */}
            </Pressable>
          </View>
        </View>
        {/* Config account */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account config</Text>
          <View>

          <View style={[styles.rowWrapper, styles.sectionBody, styles.rowFirst]}>
              <Pressable
                onPress={() => {
                  // handle onPress
                  navigation.navigate("EditAccount");
                }}
                style={({pressed})=>[styles.row,{ opacity: pressed ? 0.5 : 1, }]}>
                <Text style={styles.rowLabel}>Edit account</Text>
                <View style={styles.rowSpacer} />
                {/* <Text style={styles.rowValue}>Los Angeles, CA</Text> */}
                <CustomIcon
                  color="#bcbcbc"
                  name="chevron-forward"
                  size={19}
                />
              </Pressable>
            </View>

            <View style={[styles.rowWrapper, styles.sectionBody]}>
              <Pressable
                onPress={() => {
                  // handle onPress
                  navigation.navigate("OrdersScreen");
                }}
                style={({pressed})=>[styles.row,{ opacity: pressed ? 0.5 : 1, }]}>
                <Text style={styles.rowLabel}>My purchases</Text>
                <View style={styles.rowSpacer} />
                <CustomIcon
                  color="#bcbcbc"
                  name="chevron-forward"
                  size={19}
                />
              </Pressable>
            </View>

            <View style={[styles.rowWrapper, styles.sectionBody, styles.sectionBody]}>
              <Pressable
                onPress={() => {
                  // handle onPress
                  // navigation.navigate("AdressScreen");
                }}
                style={({pressed})=>[styles.row,{ opacity: pressed ? 0.5 : 1, }]}>
                <Text style={styles.rowLabel}>My address</Text>
                <View style={styles.rowSpacer} />
                <CustomIcon
                  color="#bcbcbc"
                  name="chevron-forward"
                  size={19}
                />
              </Pressable>
            </View>

            <View style={[styles.rowWrapper, styles.sectionBody, styles.rowLast]}>
              <Pressable
                onPress={() => {
                  // handle onPress
                }}
                style={({pressed})=>[styles.row,{ opacity: pressed ? 0.5 : 1, }]}>
                <Text style={styles.rowLabel}>Saved cards</Text>
                <View style={styles.rowSpacer} />
                <CustomIcon
                  color="#bcbcbc"
                  name="chevron-forward"
                  size={19}
                />
              </Pressable>
            </View>

          </View>
        </View>
        {/* app section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App</Text>
          <View>
            <View style={[styles.rowWrapper, styles.rowFirst, styles.sectionBody]}>
              <Pressable
                onPress={() => {
                  // handle onPress
                }}
                style={({pressed})=>[styles.row,{ opacity: pressed ? 0.5 : 1, }]}>
                <Text style={styles.rowLabel}>Contact Us</Text>
                <View style={styles.rowSpacer} />
                <CustomIcon
                  color="#bcbcbc"
                  name="chevron-forward"
                  size={19} />
              </Pressable>
            </View>
            <View style={[styles.rowWrapper, styles.sectionBody]}>
              <Pressable
                onPress={() => {
                  // handle onPress
                }}
                style={({pressed})=>[styles.row,{ opacity: pressed ? 0.5 : 1, }]}>
                <Text style={styles.rowLabel}>Rate App in PlayStore</Text>
                <View style={styles.rowSpacer} />
                <CustomIcon
                  color="#bcbcbc"
                  name="chevron-forward"
                  size={19} />
              </Pressable>
            </View>
            <View style={[styles.rowWrapper, styles.rowLast, styles.sectionBody]}>
              <Pressable
                onPress={() => {
                  // handle onPress
                }}
                style={({pressed})=>[styles.row,{ opacity: pressed ? 0.5 : 1, }]}>
                <Text style={styles.rowLabel}>Terms and Privacy</Text>
                <View style={styles.rowSpacer} />
                <CustomIcon
                  color="#bcbcbc"
                  name="chevron-forward"
                  size={19} />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={[styles.section, {marginTop:20}]}>
          <View>
            <View
              style={[
                styles.rowWrapper,
                styles.rowFirst,
                styles.rowLast,
                styles.sectionBody,
                { alignItems: 'center' },
              ]}>
              <Pressable
                onPress={logout}
                style={({pressed})=>[styles.row,{ opacity: pressed ? 0.5 : 1, }]}>
                <Text style={[styles.rowLabel, styles.rowLabelLogout]}>
                  Log Out
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* <View style={{flex:1,borderWidth:1, height:200}}>
          <View style={{flex:1,}} />
          <Text style={styles.contentFooter}>Version 1.0.0</Text>
        </View> */}
      </ScrollView>


    </CustomView>
  )
}

const styles = StyleSheet.create({
  /** Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    marginTop:20,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#000',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    textAlign: 'center',
  },
  /** Content */
  content: {
    paddingHorizontal: 10,
    paddingTop:10,
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    color: '#a69f9f',
  },
  /** Section */
  section: {
    paddingVertical: 12,
  },
  sectionTitle: {
    margin: 8,
    marginLeft: 12,
    fontSize: 13,
    letterSpacing: 0.33,
    fontWeight: '500',
    color: '#a69f9f',
    textTransform: 'uppercase',
  },
  sectionBody: {
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  /** Profile */
  profile: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginRight: 12,
  },
  profileBody: {
    marginRight: 'auto',
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#292929',
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: '400',
    color: '#858585',
  },
  /** Row */
  row: {
    height: 44,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 12,
  },
  rowWrapper: {
    paddingLeft: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#f0f0f0',
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
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ababab',
    marginRight: 4,
  },
  rowLast: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  rowLabelLogout: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '600',
    color: '#dc2626',
  },
});
