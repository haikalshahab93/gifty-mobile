import React from 'react';
import MainNavigator from './App/Navigations/MainNavigator';
import { StyleSheet, View } from 'react-native';
import { AuthProvider } from './App/Context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <View style={styles.container}>
        <MainNavigator />
      </View>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


export default App;