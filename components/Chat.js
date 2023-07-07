import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { collection, getDocs, addDoc, onSnapshot,
  query, where, orderBy } from 'firebase/firestore';

//Chat Screen
const Chat = ({ db, route, navigation }) => {
  const { userID, name, color } = route.params;
  const [messages, setMessages] = useState([]);
  
  //Retrieve messages when app loads
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubMessageList = onSnapshot(q, (documentsSnapshot) => {
      let newList = [];
      documentsSnapshot.forEach(doc => {
        newList.push({ 
          id: doc.id,          
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
        })
      });
      setMessages(newList);
    });
    navigation.setOptions({ 
      title: name 
    });

    //Cleanup code
    return () => {
      if (unsubMessageList) unsubMessageList();
    }
  }, []);

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

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
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