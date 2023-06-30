import { StyleSheet, View, Text } from 'react-native';
import { useEffect } from 'react';

const Chat = ({ route, navigation }) => {
  const { name } = route.params;
  const { chosenColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ 
      title: name 
    });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: chosenColor }]}>
      <Text style={styles.title}>Time to Chat!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    margin: '15%',
    fontSize: 45,
    fontWeight: 600,
    color: '#FFFFFF'
  },
});

export default Chat;