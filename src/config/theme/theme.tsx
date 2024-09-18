import { Dimensions,StyleSheet } from "react-native";


const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');

export interface ThemeColors {
  primary: string;
  secondary?: string,
  text: string;
  background: string;
  cardBackground: string;
  buttonTextColor: string;
  liteColor: string;
  disabled: string;
}

export const colors: ThemeColors = {
  primary: "#3F51B5",
  text: "black",

  background: "#F3F2F7",
  cardBackground: "white",
  buttonTextColor: "white",
  liteColor: "#40444b",
  disabled: "#5856d626",
  // secondary: "#E91E63"
};

export const lightColors: ThemeColors = {
  primary: "#3F51B5",
  text: "black",

  background: "#F3F2F7",
  cardBackground: "white",
  buttonTextColor: "white",
  liteColor: "#40444b",
  disabled: "#5856d626",
};

export const darkColors: ThemeColors = {
  primary: "#5856D6",
  text: "white",

  background: "#2f3136",
  cardBackground: "#40444b",
  buttonTextColor: "white",
  liteColor: "#99aab5",
  disabled: "#5856d626",
};

export const globalStyles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1D2A32',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '400',
    color: '#929292',
  },
  inputLbl: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    // borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
    // color: colors.text,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff'
  },
  mainContainer: {
    flex: 1,
    // backgroundColor: colors.background,
  },
  globalMargin: {
    paddingHorizontal: 20,
    flex: 1,
  },

  btnPrimary: {
    // backgroundColor: colors.primary,
    position: 'absolute',
    left: WINDOW_WIDTH-45,
    top: WINDOW_HEIGHT - 200,
    // borderWidth:1,
    // borderColor: '#cccccc',
    borderRadius:50,
    padding:5,
    backgroundColor:colors.primary
  },
  btnPrimaryText: {
    // color: colors.primary,
    fontSize: 16,
  },
});

export const authStyles = StyleSheet.create({
  /** Header auth*/
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  headerImg: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginBottom: 36,
    borderRadius:10,
  },

  /* Form auth */
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    // flexBasis:1,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: '600',
    color: '#075eec',
    textAlign: 'center',
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },

  /** Input */
  input: {
    marginBottom: 16
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
    borderStyle: 'solid',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec'
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff'
  },
});

export const tabStyles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22,
    color: '#121a26',
    marginTop: 15,
    marginBottom: 10,
    paddingHorizontal: 16,

  },



});
