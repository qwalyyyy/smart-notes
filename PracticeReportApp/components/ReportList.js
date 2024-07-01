import React from 'react';
import { FlatList, TouchableOpacity, Text, View, Button, StyleSheet, ScrollView } from 'react-native';

const ReportList = ({ reports, onSelect, onDelete, onEdit }) => {
  return (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container}>
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelect(item)} style={styles.itemContainer}>
            <Text style={styles.item}>{item.title}</Text>
            <View style={styles.buttonsContainer}>
              <Button title="Редактировать" onPress={() => onEdit(item)} />
              <Button title="Удалить" onPress={() => onDelete(item.id)} />
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  itemContainer: {
    padding: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  item: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
});

export default ReportList;
