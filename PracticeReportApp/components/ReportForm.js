import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ReportForm = ({ onSubmit, initialData }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      // Загрузка фото, если есть в initialData.photo
      setPhoto(initialData.photo);
    }
  }, [initialData]);

  const handleSubmit = () => {
    onSubmit({ title, content, photo });
    setTitle('');
    setContent('');
    setPhoto(null); // Сброс фото после отправки
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Название отчета"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 200 }]}
        placeholder="Содержание отчета"
        multiline
        value={content}
        onChangeText={setContent}
      />
      {photo && <Image source={{ uri: photo }} style={styles.imagePreview} />}
      <Button title="Выбрать фото" onPress={pickImage} />
      <Button title="Сохранить отчет" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    padding: 8,
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 12,
  },
});

export default ReportForm;
