import React, { useState } from "react";
// import {Useeffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { firebase } from "../firebase/firebase";

const StartScreen = ({ navigation }) => {
  const [login_id, setLogin_id] = useState("");
  const [password, setPassword] = useState("");

  async function toggleLogin() {
    console.log("in toggleLogin()");

    // firestore内に、入力されたlogin_idとpasswordが登録されているかチェック
    const usersRef = firebase
      .firestore()
      .collection("registered")
      .where("login_id", "==", login_id)
      .where("password", "==", password)
      .limit(1);
    usersRef.get().then((docSnapshot) => {
      const docs = docSnapshot.docs;
      // 登録されている場合 => ログイン完了画面(login.js)へ
      if (docs.length != 0) {
        docSnapshot.forEach((doc) => {
          console.log(`${doc.id}: ${doc.data().login_id}`);

          //ログイン完了画面に遷移 3/25
          //TODO:login_idを第二引数でlogin.jsに渡す 3/25
          //ログイン中の店舗のlogin_idを次の画面でも保持できる 3/25
          //login_id = doc.data().login_id;
          //return (navigation.navigate('Login'));
          return navigation.navigate("Login", { login_id: login_id });
        });
        // 登録されていない場合は、登録する必要があるため、初期登録画面(register.js)へ
      } else {
        return navigation.navigate("Search");
      }
    });
  }

  const testLogin = async () => {
    for (var i = 0; i < login_id.length; i++) {
      toggleLogin(login_id[i].login_id);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://pictkan.com/uploads/converted/15/06/12/1571213585-background-2561_1920-jNP-1920x1280-MM-100.jpg",
        }}
        style={styles.image}
      >
        <View style={styles.box1}>
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
					<View style={styles.buttonview}>

					
          <Button
            title="ログイン"
            onPress={() => {
              testLogin();
            }}
            color="#FAFAFA"
          />
					</View>

          <Text style={styles.formLabel}>新規登録はこちらから</Text>
          <View style={styles.formGroup}>
					<View style={styles.buttonview}>
            <Button
              title="新規登録する"
              onPress={() => navigation.navigate("Search")}
              color="#FAFAFA"
            />
						</View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  box1: {
    backgroundColor: "#48484866",
    width: "50%",
    height: "50%",
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    alignItems: "center",
  },

  formGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  formLabel: {
    paddingRight: 16,
    marginVertical: 8,
    color: "white",
  },
  formControl: {
    height: 40,
    width: 160,
    padding: 8,
    borderColor: "#F4511E",
    borderWidth: 1,
  },
  listItem: {
    height: 64,
    width: 200,
    marginBottom: 16,
    padding: 16,
    borderColor: "gray",
    borderWidth: 1,
  },
	buttonview:{
		backgroundColor: "#F4511E",
		borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
	}
});

export default StartScreen;
