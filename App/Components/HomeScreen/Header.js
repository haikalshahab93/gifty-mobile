import { View, Text, Image, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Colors from '../../Utils/Colors';
import Coin from '../../../assets/images/coin.png'
import { Ionicons } from '@expo/vector-icons'

export default function Header() {
  const { isLoaded, isSignedIn, user } = useUser();
  return isLoaded && (
    <View>
      <View style={[{ justifyContent: 'space-between' }, styles.rowStyle]}>
        <View style={styles.rowStyle}>
          <Image source={{ uri: user?.imageUrl }} style={{ width: 50, height: 50, borderRadius: 99 }} />
          <View>
            <Text styles={styles.mainText}>Welcome</Text>
            <Text style={styles.mainText}>{user?.fullName}</Text>
          </View>
        </View>
        <View style={styles.rowStyle}>
          <Image source={Coin} style={{ width: 35, height: 35 }} />
          <Text style={styles.mainText}>3500</Text>
        </View>
      </View>
      <View style={{ backgroundColor: Colors.WHITE, paddingLeft: 20, paddingRight: 5, marginTop: 25, borderRadius: 99, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <TextInput placeholder="Search Course" style={{ fontFamily: 'outfit', fontSize: 18 }} />
        <Ionicons name='search-circle' size={50} color={Colors.PRIMARY} />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  mainText: {
    color: Colors.WHITE,
    fontSize: 20,
    fontFamily: 'outfit'
  },

  rowStyle: {
    display: 'flex', flexDirection: 'row'
  }
})