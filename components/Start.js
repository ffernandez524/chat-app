import { StyleSheet, View, Text, TextInput, 
  TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { useState } from 'react';
import { getAuth, signInAnonymously } from 'firebase/auth';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const auth = getAuth();

  const signInUser = () => {   
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate('Chat', { userID: result.user.uid, name: name, color: color });
        Alert.alert('Signed in Successfully!');
      })
      .catch((error) => {
        Alert.alert('Unable to sign in, try again later.');
      })
  }

  return (
    <ImageBackground 
    style={styles.backgroundImage}
    source={require('../assets/background.png')} resizeMode='cover'
    >   
      <View style={styles.container}>  
        <Text style={styles.title}>Chat-App</Text>   
        <View style={styles.inputContainer}>          
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Your Name'
          />
          <View>
            <Text style={styles.chooseText}>Choose Background Color: </Text>
            <View style={styles.colorContainer}>
              <TouchableOpacity
                style={[styles.colorButton, { backgroundColor: '#090C08'}]}
                onPress={() => setColor('#090C08')}
              />
              <TouchableOpacity
                style={[styles.colorButton, { backgroundColor: '#474056'}]}
                onPress={() => setColor('#474056')}
              />
              <TouchableOpacity
                style={[styles.colorButton, { backgroundColor: '#8A95A5'}]}
                onPress={() => setColor('#8A95A5')}
              />
              <TouchableOpacity
                style={[styles.colorButton, { backgroundColor: '#B9C6AE'}]}
                onPress={() => setColor('#B9C6AE')}
              />
            </View>
          </View>          
          <TouchableOpacity
            style={styles.chatButton}
            onPress={signInUser}
          >
            <Text style={styles.chatButtonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,    
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },  
  title: {
    flex: 1,
    margin: '15%',
    fontSize: 45,
    fontWeight: 600,
    color: '#FFFFFF'
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    bottom: '3%',
    width: '88%',
    height: '44%',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',   
  },
  textInput: {
    width: '88%',
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: .5,
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15
  },
  chooseText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1.0
  },
  colorContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    width: '88%',
    marginTop: 15,
    marginBottom: 15
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  chatButton: {
    width: '88%',    
    backgroundColor: '#757083',
    padding: 15,
    marginTop: 15,
    marginBottom: 15
  },
  chatButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  }
});

export default Start;