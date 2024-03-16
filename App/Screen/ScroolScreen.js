import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

export default function ScroolScreen() {
  const [activePage, setActivePage] = useState(1);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const navigation = useNavigation(); // Initialize navigation

  const scrollToPage = (pageNumber) => {
    setActivePage(pageNumber);
    scrollViewRef.current.scrollTo({ x: (pageNumber - 1) * screenWidth, animated: true });
  };

  const scrollViewRef = useRef(null);

  useEffect(() => {
    const updateScreenWidth = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateScreenWidth);

    return () => {
      Dimensions.removeEventListener('change', updateScreenWidth);
    };
  }, []);

  const handleGetStarted = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current.scrollTo({ x: (activePage - 1) * screenWidth, animated: false })}
      >
        <View style={styles.page}>
          <Text style={styles.title}>Create your wishlist everywhere</Text>
          <Image
            source={require('./../../assets/images/Brazuca_Planning.png')}
            style={styles.image}
          />
          <TouchableOpacity style={styles.button} onPress={() => scrollToPage(2)}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.page}>
          <Text style={styles.title}>Organize and share wishlist with communities </Text>
          <Image
            source={require('./../../assets/images/Hands_Procrastinating.png')}
            style={styles.image}
          />
          <TouchableOpacity style={styles.button} onPress={() => scrollToPage(3)}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.page, { marginBottom: screenWidth * 0.1 }]}>
          <Image
            source={require('./../../assets/images/Hands_Procrastinating.png')}
            style={styles.image}
          />
          <Text style={styles.title}>Share your wishes, Spread the joy</Text>
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={[styles.pagination, { marginTop: -screenWidth * 0.05 }]}>
        {[1, 2, 3].map((pageNumber) => (
          <TouchableOpacity
            key={pageNumber}
            style={[
              styles.paginationDot,
              { backgroundColor: pageNumber === activePage ? '#007bff' : '#ccc' },
            ]}
            onPress={() => scrollToPage(pageNumber)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  page: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 20,
  },
  image: {
    width: Dimensions.get('window').width - 36,
    height: (Dimensions.get('window').width - 36) * 213.9 / 339,
    marginBottom: 20,
  },
  button: {
    width: 100,
    height: 40,
    backgroundColor: '#1FAD66',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
