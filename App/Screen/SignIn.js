import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { loginUser} from '../Services'
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { useAuth } from '../Context/AuthContext';

export default function SignIn() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const navigation = useNavigation(); // Initialize navigation
  const {setIsLoggedIn,setloading,setUser} = useAuth()  

  const handleSignIn = async () => {
    const response = await loginUser(email, password,setloading);
    if (response && response.data && response.data.token ) {
      setIsLoggedIn(true)
      setUser(response.data)
    }else{
      console.log("Login failed");
    }
  };

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
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: 218,
    height: 47,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    width: 218,
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
    marginBottom: 10,
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
    fontSize: 12,
  },
  rememberText: {
    fontSize: 8,
  },
  signUpText: {
    marginTop: 10,
    color: 'black',
    textDecorationLine: 'underline',
  }
});
