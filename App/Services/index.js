import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = "https://gifted-pink-horse.cyclic.app/"


export const registerUser = async (name, email, password, setloading) => {
  setloading(true);
  try {
    const response = await axios.post(`${API_URL}api/auth/register`, { name, email, password });
    const data = response.data;
    console.log(data)
    await AsyncStorage.setItem('users', JSON.stringify(data));
    setloading(false)
    return data;
  } catch (error) {
    console.error('Failed to register user:', error);
    return { success: false, message: 'Failed to register user' };
  }
};

export const loginUser = async (email, password, setloading) => {
  setloading(true);
  try {
    const response = await axios.post(`${API_URL}api/auth/login`, { email, password });
    const data = response.data;
    console.log(data)
    if (response.status === 200) {
      if (data && data.data.token) {
        await AsyncStorage.setItem('userToken', data.data.token);
      }
    }
    setloading(false);
    return data;
  } catch (error) {
    setloading(false);
    console.error('Failed to login user:', error);
    return { success: false, message: 'Failed to login user' };
  }
};


export const updateUsernameInDatabase = async (username, token, setloading) => {
  setloading(true);
  console.log(username,token);
  try {
    const response = await axios.put(`${API_URL}api/user/set-username`, { username: username }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      throw new Error('Failed to update username in database');
    }
    // Update AsyncStorage
    await AsyncStorage.setItem('username', username);

    // Set loading state to false after successful update
    setloading(false);

    return response.data;
  } catch (error) {
    console.error('Error updating username in database:', error);
    setloading(false);
    throw new Error('Failed to update username in database');
  }
};

export const updatePaymentInDatabase = async (paymentMethod,accountHolder,accountNumber,setloading) => {
  setloading(true);
  console.log(paymentMethod,accountHolder,accountNumber);
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    const response = await axios.post(`${API_URL}api/user/payment-info`, { paymentMethod:paymentMethod,accountHolder:accountHolder,accountNumber:accountNumber}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    console.log(response)
    if (response.status !== 200) {
      throw new Error('Failed to update payment in database');
    }
    // Update AsyncStorage
    await AsyncStorage.setItem('paymentMethod', paymentMethod,'accountHolder', accountHolder,'accountNumber', accountNumber);

    // Set loading state to false after successful update
    setloading(false);

    return response.data;
  } catch (error) {
    console.error('Error updating payment in database:', error);
    setloading(false);
    throw new Error('Failed to update payment in database');
  }
};

export const logoutUser = async (setIsLoggedIn,setloading,setUser) => {
  try {
    await AsyncStorage.removeItem('userToken');
    setUser({})
    setIsLoggedIn(false)
    setloading(false)
    return { success: true, message: 'Logout berhasil' };
  } catch (error) {
    console.error('Gagal logout:', error);
    return { success: false, message: 'Gagal logout' };
  }
};


export const getAllUser = async (text) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    const response = await axios.get(`${API_URL}api/user/get
    `, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      params: {
        text: text 
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw new Error('Failed to fetch users');
  }
};

export const checkLoginStatus = async () => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    return userToken !== null;
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
}

export const fetchWishlist = async () => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    const response = await axios.get(`${API_URL}api/wishlist`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Failed to fetch wishlist:', error);
    throw new Error('Failed to fetch wishlist');
  }
};


export const createWishlist = async (title, date, description,type,addCollaborators) => {
  try {
    console.log(addCollaborators)
    const userToken = await AsyncStorage.getItem('userToken');
    // http://localhost:3000/api/wishlist/create-with-collaborators
    const response = await axios.post(`${API_URL}api/wishlist/create-with-collaborators`, {
      title,
      eventDate:date,
      description,
      type,
      collaborators:addCollaborators,
    }, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response)
    return response.data; 
  } catch (error) {
    console.error('Failed to create wishlist:', error);
    throw new Error('Failed to create wishlist');
  }
};


export const createItemWishlist = async (productLink, itemName, price, detail, wishlistId) => {

  const numericPrice = parseFloat(price);
  console.log(itemName,detail,numericPrice,productLink,wishlistId)
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    const response = await axios.post(`${API_URL}api/wishlist-item/${wishlistId}`, {
      name:itemName,
      details:detail,
      price:numericPrice,
      link:productLink,
    }, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response)
    return response.data; 
  } catch (error) {
    console.error('Failed to create item wishlist:', error);
    throw new Error('Failed to create item wishlist');
  }
};


export const getAllItemWishlist = async (wishlistId) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    const response = await axios.get(`${API_URL}api/wishlist-item/${wishlistId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response)
    return response.data; 
  } catch (error) {
    console.error('Failed to get all items from wishlist:', error);
    throw new Error('Failed to get all items from wishlist');
  }
};


export const deleteWishlist = async (wishlistId) => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');
    const response = await axios.delete(`${API_URL}api/wishlist/${wishlistId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Failed to delete wishlist:', error);
    throw new Error('Failed to delete wishlist');
  }
};

export const createPoll = async (wishlistId, title, options) => {
  try {
      const response = await axios.post(`${API_URL}/api/poll/createPoll/${wishlistId}`, {
          title,
          optionIds:options,
      });
      return response.data;
  } catch (error) {
      throw new Error('Failed to create poll:', error);
  }
};