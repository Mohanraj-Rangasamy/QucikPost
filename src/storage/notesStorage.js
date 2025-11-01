// src/storage/notesStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const NOTES_KEY = 'NOTES_V1';

export async function loadNotes() {
  try {
    const raw = await AsyncStorage.getItem(NOTES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load notes', e);
    return [];
  }
}

export async function saveNotes(notes) {
  try {
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (e) {
    console.error('Failed to save notes', e);
  }
}

export async function addNote(note) {
  const notes = await loadNotes();
  notes.unshift(note); // latest first
  await saveNotes(notes);
  return notes;
}

export async function updateNote(updated) {
  const notes = await loadNotes();
  const idx = notes.findIndex(n => n.id === updated.id);
  if (idx !== -1) notes[idx] = updated;
  await saveNotes(notes);
  return notes;
}

export async function deleteNote(id) {
  const notes = await loadNotes();
  const filtered = notes.filter(n => n.id !== id);
  await saveNotes(filtered);
  return filtered;
}
