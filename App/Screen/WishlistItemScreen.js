import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { getAllItemWishlist } from '../Services';

const WishlistItemScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { wishlistId, wishlisttitle, wishlistdate } = route.params;
    const [items, setItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [options, setOptions] = useState(['', '', '']);


    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await getAllItemWishlist(wishlistId);
                setItems(data.data);
            } catch (error) {
                console.error('Failed to fetch items:', error);
            }
        };
        fetchItems();
    }, [wishlistId]);


    const handleSave = () => {
        // Handle save logic here
        console.log('Title:', title);
        console.log('Options:', options);
        setModalVisible(false);
    };

    const handleAddItem = () => {
        navigation.navigate('CreateItem-Wishlist', { wishlistId: wishlistId });
    };

    const handleCreatePoll = () => {
        // Navigasi ke layar CreatePoll
    };

    const renderGridItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer}>
            <Image
                source={require('./../../assets/images/coin.jpg')}
                style={styles.itemImage}
                resizeMode="cover"
            />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>

            <Text style={styles.title}>{wishlisttitle}</Text>
            <Text style={styles.date}>{wishlistdate}</Text>

            {items.length === 0 ? (
                <Text style={styles.subtitle}>No items yet</Text>
            ) : (
                <>
                    {/* onPress={() => setModalVisible(true)} */}
                    <TouchableOpacity style={styles.createPollButton} onPress={() => setModalVisible(true)}>
                        <Text style={styles.createPollButtonText}>Create Poll</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={items}
                        renderItem={renderGridItem}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        contentContainerStyle={styles.itemList}
                    />
                </>
            )}
            <TouchableOpacity style={styles.addItemContainer} onPress={handleAddItem}>
                <Text style={styles.addItemText}>+ Add Item</Text>
            </TouchableOpacity>


            <View style={styles.modal}></View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        onChangeText={(text) => setTitle(text)}
                        value={title}
                    />
                    {options.map((option, index) => (
                        <TextInput
                            key={index}
                            style={styles.input}
                            placeholder={`Option ${index + 1}`}
                            onChangeText={(text) => {
                                const newOptions = [...options];
                                newOptions[index] = text;
                                setOptions(newOptions);
                            }}
                            value={option}
                        />
                    ))}
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 16,
        marginTop: 20,
    },
    addItemContainer: {
        backgroundColor: '#1FAD66',
        padding: 10,
        borderRadius: 5,
        marginTop: 40,
    },
    addItemText: {
        color: 'white',
        fontSize: 16,
    },
    itemList: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    itemContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
        padding: 10,
        margin: 5,
        width: '45%', // 2 items per row
        alignItems: 'center',
    },
    itemImage: {
        width: '100%',
        height: 150,
        borderRadius: 5,
        marginBottom: 5,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 14,
        color: '#666',
    },
    createPollButton: {
        backgroundColor: '#1FAD66',
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
    },
    createPollButtonText: {
        color: 'white',
        fontSize: 14,
    },

    //modal

    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
    },
    modalView: {
        margin: 25,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    saveButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    closeButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
});

export default WishlistItemScreen;
