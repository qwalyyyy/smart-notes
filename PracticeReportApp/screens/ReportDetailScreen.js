import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ReportDetailScreen = ({ route }) => {
  const { report } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{report.title}</Text>
      <Text style={styles.content}>{report.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
  },
});

export default ReportDetailScreen;
