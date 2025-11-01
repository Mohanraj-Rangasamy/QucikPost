// src/components/NoteItem.js
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NoteItem({ note, onPress, onDelete }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={1}>{note.title || 'Untitled'}</Text>
          <Text style={styles.content} numberOfLines={2}>{note.content}</Text>
          <Text style={styles.date}>{new Date(note.updatedAt || note.createdAt).toLocaleString()}</Text>
        </View>
        <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
          <Text style={styles.deleteText}>🗑</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  content: { color: '#444' },
  date: { marginTop: 6, fontSize: 11, color: '#666' },
  deleteBtn: { paddingLeft: 12, justifyContent: 'center' },
  deleteText: { fontSize: 18, color: '#b00020' },
});
