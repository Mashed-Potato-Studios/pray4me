import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';

const Explore = () => {
  const sampleData = [
    { id: '1', title: 'Group Prayer for Mental Health' },
    { id: '2', title: 'Financial Breakthrough Circle' },
    { id: '3', title: 'Marriage Restoration Warriors' },
    { id: '4', title: 'Global Missions Prayer Network' },
    { id: '5', title: 'Addiction Recovery Prayer Support' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Groups</Text>
      <FlatList
        data={sampleData}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16
  },
  item: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2
  },
  itemText: {
    fontSize: 18
  }
});

export default Explore;