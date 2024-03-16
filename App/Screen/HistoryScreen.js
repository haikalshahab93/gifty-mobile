import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch('https://your-context-endpoint.com/history')
      .then(response => response.json())
      .then(data => setHistory(data))
      .catch(error => console.error(error));
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.event}</Text>
      <Text>{item.date}</Text>
      <Text>{item.sharedWith}</Text>
    </View>
  );

  return (
    <FlatList
      data={history}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default HistoryScreen;