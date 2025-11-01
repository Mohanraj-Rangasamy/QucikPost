// src/screens/HomeScreen.js
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, TextInput, View } from 'react-native';
import NoteItem from '../components/NoteItem';
import { deleteNote, loadNotes } from '../storage/notesStorage';

export default function HomeScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState('');

  const refreshNotes = async () => {
    const data = await loadNotes();
    setNotes(data);
  };

  useFocusEffect(
    useCallback(() => {
      refreshNotes();
    }, [])
  );

  const handleDelete = (id) => {
    Alert.alert('Delete note', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive', onPress: async () => {
          const updated = await deleteNote(id);
          setNotes(updated);
        }
      }
    ]);
  };

  const filtered = notes.filter(n =>
    (n.title || '').toLowerCase().includes(query.toLowerCase()) ||
    (n.content || '').toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <TextInput
          placeholder="Search notes..."
          value={query}
          onChangeText={setQuery}
          style={styles.search}
        />
        <Button title="Add" onPress={() => navigation.navigate('AddNote')} />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <NoteItem
            note={item}
            onPress={() => navigation.navigate('EditNote', { noteId: item.id })}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={<View style={styles.empty}><Button title="No notes — Add one" onPress={() => navigation.navigate('AddNote')} /></View>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12,margin:20, backgroundColor: '#f2f3f5' },
  controls: { flexDirection: 'row', gap: 8, alignItems: 'center', marginVertical: 28 },
  search: { flex: 1, borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 8, marginRight: 8, backgroundColor: '#fff' },
  empty: { marginTop: 40, alignItems: 'center' },
});
