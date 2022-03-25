import React, { useState } from "react";
import { StyleSheet, Button, Text, View, TextInput, ImageBackground, SafeAreaView } from "react-native";
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
        <ImageBackground
					source={{
						uri: "https://pictkan.com/uploads/converted/15/06/12/1571213585-background-2561_1920-jNP-1920x1280-MM-100.jpg",
					}}
					style={styles.image}
					>
          <View style={styles.box1}>
            <Text style={styles.formLabel}>初期登録をしましょう</Text>
            <Text style={styles.formLabel}>お店の名前</Text>
            <View style={styles.formGroup}>
              <TextInput
                style={styles.formControl}
                placeholder="storename"
                onChangeText={(text) => setStorename(text)}
              />
            </View>

            <Text>お店の所在地を、郵便番号で登録してください</Text>
            <Text style={styles.formLabel}>郵便番号</Text>
            <View style={styles.formGroup}>
              <TextInput
                style={styles.formControl}
                placeholder="postcode"
                onChangeText={(text) => setPostcode(text)}
              />
            </View>

            <Text style={styles.formLabel}>ログインid</Text>
            <View style={styles.formGroup}>
              <TextInput
                style={styles.formControl}
                placeholder="login_id"
                onChangeText={(text) => setLogin_id(text)}
              />  
            </View>

            <Text style={styles.formLabel}>パスワード</Text>
            <View style={styles.formGroup}>
              <TextInput
                style={styles.formControl}
                placeholder="password"
                onChangeText={(text) => setPassword(text)}
              />
            </View>
          
            <Button title="データを保存する"
              onPress={() => {sendDatatoFirestore()}}
              color = "orange"
            />
            <Button title="登録する"
              onPress={() => navigation.navigate('Registered')}
              color = "orange"
              />
          </View>
        </ImageBackground>
      </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  box1:{
    backgroundColor:"#48484866",
    width:"60%",
    height:"70%",
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    alignItems:'center',
    },
  formGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  formLabel: {
    paddingRight: 16,
	  marginVertical: 8,
  },
  formControl: {
    height: 40,
    width: 160,
    padding: 8,
    borderColor: 'orange',
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
