import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditNoteScreen from '../src/screens/ EditNoteScreen';
import AddNoteScreen from '../src/screens/AddNoteScreen';
import HomeScreen from '../src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Notes" component={HomeScreen} />
      <Stack.Screen name="AddNote" component={AddNoteScreen} />
      <Stack.Screen name="EditNote" component={EditNoteScreen} />
    </Stack.Navigator>
  );
}
