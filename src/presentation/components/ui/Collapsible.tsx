import { PropsWithChildren, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { CustomIcon } from './CustomIcon';


export function Collapsible({ children, title, total }: PropsWithChildren & { title: string, total:string }) {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={{flex:1}}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <CustomIcon
            color="#bcbcbc"
            name="chevron-forward"
            size={26}
            style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />
        <Text style={{fontWeight:"400", fontSize:18}}>{title.slice(0,18)}</Text>
        <Text style={{fontWeight:"600", fontSize:18}}>{ "Total: $"+total}</Text>
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 20,
    // marginLeft: 24,
  },
});
