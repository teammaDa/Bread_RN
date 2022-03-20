import React, {useState} from "react";
import { StyleSheet, Button, Text, View, TextInput } from "react-native";



const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [note, setNote] = useState('');
  
  const buttonpress = () => {
      console.log(email);
      console.log(number);
      console.log(note);
  };
  return (
  <View style={styles.container}>
  <Text>初期登録をしましょう</Text>
  
  <Text>お店の名前</Text>
  <TextInput placeholder="store name" style={styles.input}
    onChangeText={(text) => this.setState({number:text})} />
  <Text>お店の所在地を、郵便番号で登録してください</Text>
  <TextInput placeholder="postcode" style={styles.input}
    onChangeText={(text) => this.setState({number:text})} />
  <Button title="登録する" onPress={() => navigation.navigate("Registered")}/>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#777",
    padding: 8,
    margin: 10,
    width: 200,
  },
});

export default RegisterScreen;
