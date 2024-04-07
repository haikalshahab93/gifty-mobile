import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { createWishlist, getAllUser } from '../Services';
import { useRoute, useNavigation } from '@react-navigation/native';
import color from '../Utils/Colors'
import Icon from 'react-native-vector-icons/Ionicons'

export default function CreateWishlistScreen() {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [addCollaborators, setAddCollaborators] = useState([]);
    const [newCollaborator, setNewCollaborator] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const route = useRoute();
    const { type } = route.params;
    const navigation = useNavigation();

    const handleSubmit = async () => {
        const result = await createWishlist(title, date, description, type, addCollaborators);
        navigation.replace('Profile');

    };

    const handleInputChange = async (text) => {
        setNewCollaborator(text);
        try {
            const response = await getAllUser(text)
            const suggestions = response.data.filter((user) => {
                const username = user.username;
                return username && username.toLowerCase().includes(text.toLowerCase());
            });
            setSuggestions(suggestions);
        } catch (error) {
            console.error('Failed to fetch suggestions:', error);
        }
    };

    const handleAddCollaborator = () => {
        if (typeof newCollaborator === 'string' && newCollaborator.trim() !== '') {
            // Jika newCollaborator masih berupa string, tambahkan ke addCollaborators
            setAddCollaborators([...addCollaborators, newCollaborator]);
            setNewCollaborator('');
        } else if (typeof newCollaborator === 'object' && newCollaborator.id) {
            // Jika newCollaborator berupa objek user (dari suggestions), tambahkan id-nya ke addCollaborators
            setAddCollaborators([...addCollaborators, newCollaborator.id,newCollaborator.username]);
            setNewCollaborator('');
        }
    };

    return (
        <View style={styles.container}>
            <Text>Title</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <Text>Event Date</Text>
            <TextInput
                style={styles.input}
                placeholder="Date(yyyy-mm-dd)"
                value={date}
                onChangeText={setDate}
            />
            <Text>Description</Text>
            <TextInput
                style={styles.textArea}
                multiline
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />

            {type === "PERSONAL" ? (
                // Tampilkan jika type adalah "PERSONAL"
                <></>
            ) : (
                // Tampilkan jika type bukan "PERSONAL"
                <>
                    <View>
                        <Text style={styles.detailText}>Collaborators</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={addCollaborators.join(", ")}
                            onChangeText={handleInputChange}
                        />
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={handleAddCollaborator}
                        >
                            <Text style={styles.buttonText}>Add Collaborator</Text>
                        </TouchableOpacity>
                       

                        {suggestions.length>0 && suggestions.map((suggestion, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.input}
                                onPress={() => setNewCollaborator(suggestion)}
                            >
                                <View style={styles.addUser}>
                                <Icon name="person-circle-outline" size={30} ></Icon>
                                <Text>{suggestion.username}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
            )}
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
        justifyContent:'center'
    },
    addButton: {
        backgroundColor: color.PRIMARY,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop:10

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
    addUser:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:"center",

    }
});
