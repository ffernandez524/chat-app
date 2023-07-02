import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { useState, useEffect } from 'react';
import { Bubble, GiftedChat } from 'react-native-gifted-chat';

//Chat Screen
const Chat = ({ route, navigation }) => {
  const { name, chosenColor } = route.params;
  const [messages, setMessages] = useState([]);
  
  //Initial Messages when app loads
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any'
        },
      },
      {
        _id: 2,
        text: 'This is a system message',
        createdAt: new Date(),
        system: true,
      },
    ]);
    navigation.setOptions({ 
      title: name 
    });
  }, []);

  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
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
    <View style={[styles.container, { backgroundColor: chosenColor }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1
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