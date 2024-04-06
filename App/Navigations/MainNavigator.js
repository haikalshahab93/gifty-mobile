import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ScroolScreen from '../Screen/ScroolScreen';
import ProfileScreen from '../Screen/ProfileScreen';
import HistoryScreen from '../Screen/HistoryScreen';
import SignIn from '../Screen/SignIn';
import SignUp from '../Screen/SignUp';
import SetupProfileScreen from '../Screen/SetupProfileScreen';
import PaymentScreen from '../Screen/PaymentScreen';
import CreateWishlistScreen from '../Screen/CreateWishlistScreen';
import WishlistItemScreen from '../Screen/WishlistItemScreen';
import { useAuth } from '../Context/AuthContext';
import CreateItemWishlistScreen from '../Screen/CreateItemWishlistScreen';
import WishlistScreen from '../Screen/ButtonWishlist';
import { fetchData } from '../Services';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const { user, isLoggedIn } = useAuth();
  // useEffect(() => {
  //   const fetchDataUser = async () => {
  //     const userData = await fetchData(user.userId);
  //     setUser(userData);
  //   };
  //   fetchDataUser();
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          // headerShown: false
        }}>
        {isLoggedIn && user.hasSetUsername && user.hasSetPayment ?
          (
            <>
              <Stack.Screen options={{ headerShown: false }} name="Profile" component={ProfileScreen} />
              <Stack.Screen options={{ headerShown: false }} name="SetupProfile" component={SetupProfileScreen} />
              <Stack.Screen name="History" component={HistoryScreen} />
              <Stack.Screen name="Button-Wishlist" component={WishlistScreen} />
              <Stack.Screen name="Create-Wishlist" component={CreateWishlistScreen} />
              <Stack.Screen name="Wishlist-Item" component={WishlistItemScreen} />
              <Stack.Screen name="CreateItem-Wishlist" component={CreateItemWishlistScreen} />

            </>
          ) : isLoggedIn && user.hasSetUsername ?
            (
              <>
                <Stack.Screen name="SetupPayment" component={PaymentScreen} />
              </>
            ) : isLoggedIn ?
              (
                <>
                  <Stack.Screen name="SetupProfile" component={SetupProfileScreen} />
                  <Stack.Screen name="SetupPayment" component={PaymentScreen} />
                </>
              )
              :
              (
                <>
                  {/* <Stack.Screen name="Button-Wishlist" component={ButtonWishlist} />
                  <Stack.Screen name="Create-Wishlist" component={CreateWishlistScreen} /> */}
                  <Stack.Screen options={{ headerShown: false }} name="SignIn" component={SignIn} />
                  <Stack.Screen options={{ headerShown: false }} name="Scrool" component={ScroolScreen} />
                  <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
                </>
              )
        }
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default MainNavigator;