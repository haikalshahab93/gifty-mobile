import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import { getAllUser } from '../Services';

export default function CollaboratorScreen() {
  const [collaborators, setCollaborators] = useState([]);
  const [newCollaborator, setNewCollaborator] = useState('');
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getAllUser();
        setUserList(users.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddCollaborator = () => {
    if (newCollaborator.trim() !== '') {
      setCollaborators([...collaborators, newCollaborator]);
      setNewCollaborator('');
    }
  };

  return (
    <View>
      <Text style={styles.detailText}>Collaborators</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        value={newCollaborator}
        onChangeText={setNewCollaborator}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddCollaborator}
      >
        <Text style={styles.buttonText}>Add Collaborator</Text>
      </TouchableOpacity>
      <ScrollView style={styles.scrollView}>
        {userList.map((user, index) => (
          <TouchableOpacity key={index} onPress={() => handleAddCollaborator(user.username)}>
            <Text>{user.username}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  detailText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  scrollView: {
    maxHeight: 200,
    marginBottom: 20,
  },
});
