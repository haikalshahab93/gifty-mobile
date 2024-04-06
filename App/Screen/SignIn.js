import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { loginUser } from '../Services'
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { useAuth } from '../Context/AuthContext';

export default function SignIn() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const navigation = useNavigation(); // Initialize navigation
  const { setIsLoggedIn, setloading, setUser } = useAuth()

  const handleSignIn = async () => {
    if (email, password != '') {
      const response = await loginUser(email, password, setloading,setUser);
      if (response.success) {
        setIsLoggedIn(true)
      } else {  
        console.log(response.message)
      }
    }else{
      console.log('login kosong')
    }

  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <View style={styles.rememberContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setRememberPassword(!rememberPassword)}
        >
          {rememberPassword ? (
            <Text style={styles.checkboxText}>☑</Text>
          ) : (
            <Text style={styles.checkboxText}>☐</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.rememberText}>Remember Password</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <Text style={styles.signUpText} onPress={() => navigation.navigate('Scrool')}>
        Don't have an account yet? Sign Up
      </Text>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#1FAD66'
  },
  input: {
    width: 280,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    width: 280,
    height: 47,
    backgroundColor: '#1FAD66',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 10,
  },
  rememberText: {
    fontSize: 8,
  },
  signUpText: {
    marginTop: 10,
    color: '#1FAD66',
    textDecorationLine: 'underline',
  }
});
