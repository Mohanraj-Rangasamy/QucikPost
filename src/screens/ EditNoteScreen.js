// src/screens/EditNoteScreen.js
import { useEffect, useState } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { loadNotes, updateNote } from '../storage/notesStorage';

export default function EditNoteScreen({ route, navigation }) {
  const { noteId } = route.params;
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetch = async () => {
      const notes = await loadNotes();
      const found = notes.find(n => n.id === noteId);
      if (!found) {
        Alert.alert('Not found', 'Note not found.');
        navigation.goBack();
        return;
      }
      setNote(found);
      setTitle(found.title || '');
      setContent(found.content || '');
    };
    fetch();
  }, []);

  const save = async () => {
    if (!content.trim() && !title.trim()) {
      Alert.alert('Empty note', 'Please add a title or content');
      return;
    }
    const updated = {
      ...note,
      title: title.trim(),
      content: content.trim(),
      updatedAt: Date.now(),
    };
    await updateNote(updated);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.title}
      />
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        style={styles.content}
        multiline
      />
      <Button title="Save Changes" onPress={save} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  title: { borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 8, marginBottom: 8, backgroundColor: '#fff' },
  content: { flex: 1, borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 8, backgroundColor: '#fff', textAlignVertical: 'top', marginBottom: 12 },
});
