import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, FlatList, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { fetchWishlist,deleteWishlist } from '../Services';
import { useNavigation } from '@react-navigation/native';
import { logoutUser } from '../Services';
import { useAuth } from '../Context/AuthContext';

export default function ProfileScreen() {
  const [selectedTab, setSelectedTab] = useState('PERSONAL');
  const [modalVisible, setModalVisible] = useState(false);
  const [wishlistData, setWishlistData] = useState([]);
  const navigation = useNavigation();
  const {setIsLoggedIn,setloading,setUser,user} = useAuth()  
  const [selectedWishlistId, setSelectedWishlistId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchWishlist();
      setWishlistData(data.data);
    };
    fetchData();
  }, [selectedTab, modalVisible]);

  const handleDelete = async() => {
    console.log(selectedWishlistId)
      const result = await deleteWishlist(selectedWishlistId);
      console.log(result);
    setModalVisible(false);
};

const handleLogout = async () => {
  const response = await logoutUser(setIsLoggedIn,setloading,setUser);
  if (response.success) {
  } else {
    console.log(response.message);
  }
};

  const renderWishlistItem = ({ item }) => (
    <TouchableOpacity style={styles.wishlistItem} onPress={() => navigation.navigate('Wishlist-Item', { wishlistId: item.id, wishlisttitle: item.title, wishlistdate: item.eventDate })}>
      <Image source={require('./../../assets/images/coin.jpg')} style={styles.wishlistImage} />
      <View style={{ flex: 1 }}>
        <Text style={{ textAlign: 'center' }}>{item.title}</Text>
        <TouchableOpacity style={styles.optionsButton}  onPress={() => {
        setSelectedWishlistId(item.id); 
        setModalVisible(true);
    }}>
          <Text>...</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const personalData = wishlistData.filter(item => item.type === 'PERSONAL');
  const collaborativeData = wishlistData.filter(item => item.type === 'COLLABORATIVE');
  const data = selectedTab === 'PERSONAL' ? personalData : collaborativeData;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={require('./../../assets/images/coin.jpg')} style={[styles.image, styles.circularImage]} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>
        <View style={styles.followContainer}>
          <Text style={styles.followText}>100 Followers</Text>
          <Text style={styles.followText}>50 Following</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, selectedTab === 'PERSONAL' && styles.activeTab]} onPress={() => setSelectedTab('PERSONAL')}>
            <Text style={[styles.tabText, selectedTab === 'PERSONAL' && styles.activeTabText, { userSelect: 'auto' }]}>PERSONAL</Text>

          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, selectedTab === 'COLLABORATIVE' && styles.activeTab]} onPress={() => setSelectedTab('COLLABORATIVE')}>
            <Text style={[styles.tabText, selectedTab === 'COLLABORATIVE' && styles.activeTabText, { userSelect: 'auto' }]}>COLLABORATIVE</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          numColumns={2}
          renderItem={renderWishlistItem}
          keyExtractor={item => item.id.toString()}
          style={styles.wishlistContainer}
        />
      </View>

      <View style={styles.bottomMenu}>
        <TouchableOpacity style={styles.bottomMenuItem} onPress={() => { /* Handle User */ }}>
          <Icon name="user" size={20} color="black" />
          <Text>User</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomMenuItem} onPress={() => navigation.navigate('Button-Wishlist')}>
          <Icon name="plus" size={20} color="black" />
          <Text>AddList</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomMenuItem} onPress={() => { /* Handle History */ }}>
          <Icon name="history" size={20} color="black" />
          <Text>History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomMenuItem} onPress={handleLogout}>
          <Icon name="history" size={20} color="black" />
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.modalButton}>
            <Text>Edit Wishlist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={handleDelete}>
            <Text>Delete Wishlist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton}>
            <Text>Mark as Done</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
            <Text>Close Modal</Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
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
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  followContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  followText: {
    marginRight: 20,
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  wishlistContainer: {
    width: '100%',
    marginBottom: 20,
  },
  wishlistItem: {
    flex: 1,
    paddingTop: 10,
    margin: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  wishlistImage: {
    width: 153,
    height: 129,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  tab: {
    padding: 5,
  },
  tabText: {
    fontSize: 16,
    color: '#007bff',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#007bff',
  },
  activeTabText: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  optionsButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
  },
  bottomMenuItem: {
    flex: 1,
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalButton: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 4,
    marginVertical: 1,
    alignItems: 'left',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
