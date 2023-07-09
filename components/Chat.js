import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

//Chat Screen
const Chat = ({ isConnected, db, route, navigation }) => {
  const { userID, name, color } = route.params;
  const [messages, setMessages] = useState([]);
  let unsubMessageList;

  //Retrieve messages when app loads
  useEffect(() => {
    console.log(isConnected);
    //If user is connected, load message list from firestore
    if(isConnected === true) {
      //Unregister snapshot listener if it exists to prevent multiple
      if(unsubMessageList) unsubMessageList();
      unsubMessageList = null;

      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
      unsubMessageList = onSnapshot(q, (documentsSnapshot) => {
        let newList = [];
        documentsSnapshot.forEach(doc => {
          newList.push({ 
            id: doc.id,          
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
          });
          cacheMessageList(newList);        
          setMessages(newList);
        });
      });    
    //If not connected, load cached message list
    } else loadCachedList();   
    //Display user's name in navigation bar
    navigation.setOptions({ 
      title: name 
    });
    //Cleanup snapshot code to avoid memory leak
    return () => {
      if (unsubMessageList) unsubMessageList();
    }
  }, [isConnected]);

  //Load cached message list if it exists in user's browser
  const loadCachedList = async () =>{
    try {
      const cachedList = await AsyncStorage.getItem('messages') || [];
      setMessages(JSON.parse(cachedList));
    } catch (error) {
      console.log(error);
    }
  }

  //Save message list to user's browser cache
  const cacheMessageList = async (listToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(listToCache));
    } catch (error) {
      console.log(error.message);
    }
  }

  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
    addDoc(collection(db, 'messages'), newMessages[0]);
  }

  //Speech bubble and colors
  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: '#000'
        },
        left: {
          backgroundColor: '#FFF'
        }
      }}
    />
  }
  
  //Hide input if user is disconnected
  const renderInputToolbar = (props) => {
    if(isConnected) return <InputToolbar {...props} />;
    else return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={messages => onSend(messages)}
        user={{
            _id: userID,
            name,
          }}
      />
      { Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height'/> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;