import React, { useState } from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  TextInput,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { firebase } from "../firebase/firebase";

const RegisterScreen = ({ navigation }) => {
  const [storename, setStorename] = useState("");
  const [postcode, setPostcode] = useState("");
  const [login_id, setLogin_id] = useState("");
  const [password, setPassword] = useState("");

  async function sendDatatoFirestore() {
    firebase
      .firestore()
      .collection("registered")
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
          <Text style={styles.text}>初期登録をしましょう</Text>
          <Text style={styles.formLabel}>お店の名前</Text>
          <View style={styles.formGroup}>
            <TextInput
              style={styles.formControl}
              placeholder="storename"
              onChangeText={(text) => setStorename(text)}
            />
          </View>

          <Text style={styles.text}>
            郵便番号から取得した住所を登録してください
          </Text>
          <Text style={styles.formLabel}>住所</Text>
          <View style={styles.formGroup}>
            <TextInput
              style={styles.formControl}
              placeholder="address from postcode"
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
          <Button
            title="データを保存する"
            onPress={() => {
              sendDatatoFirestore();
            }}
            color="#F4511E"
          />
          <Text> </Text>
          <Button
            title="登録する"
            onPress={() => navigation.navigate("Registered")}
            color="#F4511E"
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  box1: {
    backgroundColor: "#484848aa",
    width: "auto",
    height: "auto",
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    alignItems: "center",
    padding: 35
  },
  formGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  formLabel: {
    marginVertical: 8,
    color: "white",
    fontSize: 15,
  },
  formControl: {
    height: 40,
    width: 160,
    padding: 8,
    borderColor: "#F4511E",
    borderWidth: 1,
    backgroundColor: "#D3D3D3aa",
  },
  text: {
    paddingRight: 16,
    marginVertical: 8,
    color: "white",
    fontSize: 18,
  },
});

export default RegisterScreen;
