import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '../Context/AuthContext';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { updatePaymentInDatabase} from '../Services'

export default function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [accountHolder, setAccountHolder] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const {setloading,user,setUser} = useAuth()  
  const navigation = useNavigation(); // Initialize navigation

  const handleSave = async () => {
    const response = await updatePaymentInDatabase(paymentMethod,accountHolder,accountNumber,setloading,setUser);
    console.log(response  )
    if (response && response.success && user.hasSetPayment) {
      console.log(response.message)
    }else{
      console.log(response.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>One more to go, add your </Text>
      <Text style={styles.title}>Payment Information </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Payment Method"
          value={paymentMethod}
          onChangeText={text => setPaymentMethod(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Account Holder Name"
          value={accountHolder}
          onChangeText={text => setAccountHolder(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Account Number"
          value={accountNumber}
          onChangeText={text => setAccountNumber(text)}
        />
      </View>
      <Text style={styles.infoText}>This payment information will automatically added as your payment info in split bill session</Text>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
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
  infoText: {
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
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
