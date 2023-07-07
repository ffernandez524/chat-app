import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';

import Start from './components/Start';
import Chat from './components/Chat';

const Stack = createNativeStackNavigator();

const App= () => {
  const firebaseConfig = {
    apiKey: "AIzaSyD8PfHilEX2AUDaN8loGElGf8byF5MZEvg",
    authDomain: "chat-app-56241.firebaseapp.com",
    projectId: "chat-app-56241",
    storageBucket: "chat-app-56241.appspot.com",
    messagingSenderId: "783388719831",
    appId: "1:783388719831:web:9ef2b844928cd00c28ce92",
    measurementId: "G-8RCXHKJPDB"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='Chat' >
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
