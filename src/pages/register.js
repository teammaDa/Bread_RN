import React, { useEffect, useState } from "react";
import { StyleSheet, Button, Text, View, TextInput, SafeAreaView } from "react-native";
import { firebase } from "../firebase/firebase";



const RegisterScreen = ({ navigation }) => {
  const [storename, setStorename] = useState('');
  const [postcode, setPostcode] = useState('');
  const [login_id, setLogin_id] = useState('');
  const [password, setPassword] = useState('');

  async function sendDatatoFirestore() {
        firebase
        .firestore()
        .collection('registered')
        .add({
          storename: storename,
          postcode: postcode,
          login_id: login_id,
          password: password,
        })
        .then(function () {
          console.log("登録されました");
        });
    
}


  return (
      <SafeAreaView style={styles.container}>
        <Text>初期登録をしましょう</Text>
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>お店の名前</Text>
          <TextInput
            style={styles.formControl}
            placeholder="storename"
            onChangeText={(text) => setStorename(text)}
          />
        </View>

        <Text>お店の所在地を、郵便番号で登録してください</Text>
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>郵便番号</Text>
          <TextInput
            style={styles.formControl}
            placeholder="postcode"
            onChangeText={(text) => setPostcode(text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>ログインid</Text>
          <TextInput
            style={styles.formControl}
            placeholder="login_id"
            onChangeText={(text) => setLogin_id(text)}
          />  
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>パスワード</Text>
          <TextInput
            style={styles.formControl}
            placeholder="password"
            onChangeText={(text) => setPassword(text)}
          />
        </View>
      
        <Button title="データを保存する"
          onPress={() => {sendDatatoFirestore()}}
        />
        <Button title="登録する"
          onPress={() => navigation.navigate('Registered')}/>
      
      </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  formLabel: {
    paddingRight: 16,
  },
  formControl: {
    height: 40,
    width: 160,
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1
  },
  listItem: {
    height: 64,
    width: 200,
    marginBottom: 16,
    padding: 16,
    borderColor: 'gray',
    borderWidth: 1,
  }
});

export default RegisterScreen;
