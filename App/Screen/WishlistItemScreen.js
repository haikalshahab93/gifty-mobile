import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { getAllItemWishlist } from '../Services';
import Icon from 'react-native-vector-icons/Ionicons'

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
                console.log(data.data)
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

    const renderStaticItem = () => (
        <TouchableOpacity style={styles.itemContainer}
            onPress={handleAddItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                <Icon name="add-outline" />
                <Text>Add Item</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.containerText}>
                <Text style={styles.title}>{wishlisttitle}<Icon style={styles.title} name="people-outline"/></Text>
                <Text style={styles.date}>{wishlistdate}</Text>
            </View>


            {items.length === 0 ? (
                <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Text style={styles.subtitle}>No items yet</Text>
                    <TouchableOpacity style={styles.addItemContainer} onPress={handleAddItem}>
                        <Text style={styles.addItemText}>+ Add Item</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    {/* onPress={() => setModalVisible(true)} */}
                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableOpacity style={styles.createPollButton} onPress={() => setModalVisible(true)}>
                            <Icon name="hand-right-outline"></Icon>
                            <Text style={styles.createPollButtonText}>Create Poll</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={[...items, { id: 'static', name: 'name', price: 'harga' }]}
                        renderItem={({ item }) => (item.id !== 'static' ? renderGridItem({ item }) : renderStaticItem())}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2}
                        contentContainerStyle={styles.itemList}
                    />
                </>
            )}

            <View style={styles.modal}></View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={[styles.modalView, { position: 'absolute', bottom: 170, left: -10, right: -10 }]}>
                    <TextInput
                        style={styles.input}
                        placeholder={wishlisttitle}
                        value={wishlisttitle}
                        editable={false}
                        selectTextOnFocus={false}
                        contextMenuHidden={true}
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
    },
    containerText: {
        alignItems: 'center'
    }
    ,
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10
    },
    date: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 3,
    },
    subtitle: {
        fontSize: 28,
    },
    addItemContainer: {
        backgroundColor: '#1FAD66',
        padding: 10,
        borderRadius: 20,
        marginTop: 20,
        alignItems: 'center',
        width: 150,
    },
    addItemText: {
        color: 'white',
        fontSize: 18,
    },
    itemList: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemContainer: {
        borderRadius: 5,
        margin: 5,
        width: 153,
        borderWidth: 1,
        backgroundColor: 'white'
    },
    itemImage: {
        width: '100%',
        height: 150,
        borderRadius: 5,
        marginBottom: 5,
    },
    itemName: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        textAlign: 'center',
        fontSize: 14,
        color: '#666',
    },
    createPollButton: {
        margin: 10,
        backgroundColor: '#1FAD66',
        padding: 5,
        borderRadius: 10,
        width: 135,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center'
    },
    createPollButtonText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center'
    },

    //modal

    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: 'auto'
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
