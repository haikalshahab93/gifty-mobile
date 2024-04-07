import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WishlistScreen = () => {
  const [isPersonalClicked, setIsPersonalClicked] = useState(false);
  const [isCollaborativeClicked, setIsCollaborativeClicked] = useState(false);
  const navigation = useNavigation();

  const handlePersonalClick = () => {
    setIsPersonalClicked(!isPersonalClicked);
    setIsCollaborativeClicked(false);
    navigation.navigate('Create-Wishlist', { type: 'PERSONAL' });
  };

  const handleCollaborativeClick = () => {
    setIsCollaborativeClicked(!isCollaborativeClicked);
    setIsPersonalClicked(false);
    navigation.navigate('Create-Wishlist', { type: 'COLLABORATIVE' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What type of wishlist do you want to create?</Text>
      <View style={styles.centeredView}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isPersonalClicked ? '#1FAD66' : '#CACACA' }]}
          onPress={handlePersonalClick}
        >
          <Image source={require('../../assets/pri.png')} style={styles.icon} />
          <Text style={styles.text}>Personal Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isCollaborativeClicked ? '#1FAD66' : '#CACACA' }]}
          onPress={handleCollaborativeClick}
        >
          <Image source={require('../../assets/col.png')} style={styles.icon} />
          <Text style={styles.text}>Collaborative Wishlist</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  centeredView: {
    alignItems: 'center',
    width: '80%',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    marginLeft: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default WishlistScreen;
