import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReportForm from '../components/ReportForm';
import ReportList from '../components/ReportList';
import * as Sharing from 'expo-sharing';
import * as Notifications from 'expo-notifications';

const HomeScreen = ({ navigation }) => {
  const [reports, setReports] = useState([]);
  const [editingReport, setEditingReport] = useState(null);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const storedReports = await AsyncStorage.getItem('reports');
      if (storedReports) {
        setReports(JSON.parse(storedReports));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveReports = async (newReports) => {
    try {
      await AsyncStorage.setItem('reports', JSON.stringify(newReports));
    } catch (error) {
      console.log(error);
    }
  };

  const addReport = (report) => {
    if (editingReport) {
      const updatedReports = reports.map((r) =>
        r.id === editingReport.id ? { ...report, id: editingReport.id } : r
      );
      setReports(updatedReports);
      setEditingReport(null);
      saveReports(updatedReports);
    } else {
      const newReport = { ...report, id: reports.length + 1 };
      const newReports = [...reports, newReport];
      setReports(newReports);
      saveReports(newReports);
    }
  };

  const deleteReport = (id) => {
    Alert.alert(
      'Удалить отчет',
      'Вы уверены, что хотите удалить этот отчет?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: () => {
            const newReports = reports.filter((report) => report.id !== id);
            setReports(newReports);
            saveReports(newReports);
          },
        },
      ]
    );
  };

  const exportReports = async () => {
    try {
      const storedReports = await AsyncStorage.getItem('reports');
      if (storedReports) {
        const reports = JSON.parse(storedReports);
        const csvContent = reports.map((report) => `${report.title},${report.content}`).join('\n');
        
        await Sharing.shareAsync(csvContent, { mimeType: 'text/csv', dialogTitle: 'Экспорт отчетов' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const scheduleNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Напоминание',
          body: 'Не забудьте заполнить отчет!',
        },
        trigger: { seconds: 10 }, // Example: notify 10 seconds from now
      });
      Alert.alert('Уведомление запланировано!');
    } catch (error) {
      console.log(error);
      Alert.alert('Ошибка при планировании уведомления');
    }
  };

  return (
    <View style={styles.container}>
      <ReportForm onSubmit={addReport} initialData={editingReport} />
      <ReportList
        reports={reports}
        onSelect={(report) => navigation.navigate('ReportDetail', { report })}
        onDelete={deleteReport}
        onEdit={(report) => setEditingReport(report)}
      />
      <Button title="Экспорт отчетов" onPress={exportReports} />
      <Button title="Запланировать уведомление" onPress={scheduleNotification} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default HomeScreen;
