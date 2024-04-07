import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity,Modal,Pressable } from 'react-native';
import { createItemWishlist} from '../Services';
import { useRoute,useNavigation } from '@react-navigation/native';
import colors from '../Utils/Colors'

export default function CreateItemWishlistScreen() {
    const [productLink, setProductLink] = useState('');
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [detail, setDetail] = useState('');
    const route = useRoute();
    const {wishlistId} = route.params;
    const navigation = useNavigation(); 
   

    const handleSubmit = async () => {
        const result = await createItemWishlist(productLink, itemName, price, detail, wishlistId);
        console.log(result);
        navigation.goBack('');
    };
    
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Product Link"
                value={productLink}
                onChangeText={setProductLink}
            />
            <TextInput
                style={styles.input}
                placeholder="Item Name"
                value={itemName}
                onChangeText={setItemName}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.textArea}
                multiline
                placeholder="Detail"
                value={detail}
                onChangeText={setDetail}
            />

            <TouchableOpacity
                style={styles.addButton}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Add Wishlist</Text>
            </TouchableOpacity>
        </View>



    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    addButton: {
        marginTop:10,
        backgroundColor: colors.PRIMARY,
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        height: 150,
        textAlignVertical: 'top',
    },
});
