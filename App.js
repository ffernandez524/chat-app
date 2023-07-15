/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable semi */
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { LogBox, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import Start from './components/Start';
import Chat from './components/Chat';

LogBox.ignoreLogs(['AsyncStorage has been extracted from']);
const Stack = createNativeStackNavigator();

const App = () => {
  // Firebase connection configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyD8PfHilEX2AUDaN8loGElGf8byF5MZEvg',
    authDomain: 'chat-app-56241.firebaseapp.com',
    projectId: 'chat-app-56241',
    storageBucket: 'chat-app-56241.appspot.com',
    messagingSenderId: '783388719831',
    appId: '1:783388719831:web:9ef2b844928cd00c28ce92',
    measurementId: 'G-8RCXHKJPDB'
  };
  // Monitor user's network connection to stay connected to firestore database
  const connectionStatus = useNetInfo();
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Storage
  const storage = getStorage(app);
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection Lost!');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Start'>
        <Stack.Screen name='Start' component={Start} />
        <Stack.Screen name='Chat' >
          {props => <Chat
            isConnected={connectionStatus.isConnected}
            db={db}
            storage={storage}
            {...props}
          />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
