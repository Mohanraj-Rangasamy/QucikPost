// src/screens/AddNoteScreen.js
import { useState } from 'react';
import { Alert, Button, StyleSheet, TextInput } from 'react-native';
import { addNote } from '../storage/notesStorage';

export default function AddNoteScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const save = async () => {
    if (!content.trim() && !title.trim()) {
      Alert.alert('Empty note', 'Please add a title or content');
      return;
    }
    const now = Date.now();
    const note = {
      id: now, // simple unique id
      title: title.trim(),
      content: content.trim(),
      createdAt: now,
      updatedAt: now,
    };
    await addNote(note);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title (optional)"
        value={title}
        onChangeText={setTitle}
        style={styles.title}
      />
      <TextInput
        placeholder="Write your note..."
        value={content}
        onChangeText={setContent}
        style={styles.content}
        multiline
      />
      <Button title="Save" onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  title: { borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 8, marginBottom: 8, backgroundColor: '#fff' },
  content: { flex: 1, borderWidth: 1,backgroundColor:'red', borderColor: '#c52a2aff', padding: 8, borderRadius: 8, backgroundColor: '#fff', textAlignVertical: 'top', marginBottom: 1 },
});
