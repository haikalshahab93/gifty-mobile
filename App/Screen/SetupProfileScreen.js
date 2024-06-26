import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../Context/AuthContext';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { updateUsernameInDatabase} from '../Services'

export default function SetupProfileScreen() {
  const [username, setUsername] = useState('');
  const {setloading,user,setUser,setIsLoggedIn} = useAuth()  
  const navigation = useNavigation(); // Initialize navigation

  const handleNext = async () => {
    const response = await updateUsernameInDatabase(username,setloading,setUser);
    if (response && response.success && user.hasSetUsername) {
      console.log(response.message)
    }else{
      console.log(response.message);
    }

  };

  const handleLogout = async () => {
    const response = await logoutUser(setIsLoggedIn,setloading,setUser);
    if (response.success) {
    } else {
      console.log(response.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let’s setup your profile</Text>
      <Image
        source={require('./../../assets/images/coin.jpg')}
        style={[styles.image,styles.circularImage]}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {  
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  circularImage: {
    width: 100, 
    height: 100,
    borderRadius: 50, 
    overflow: 'hidden', 
  },
  input: {
    width: '60%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    width: '100%',
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
});