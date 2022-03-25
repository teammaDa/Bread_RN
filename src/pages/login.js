//ログイン完了画面

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { firebase } from "../firebase/firebase";

const LoginScreen = ({ navigation }) => {
  const route = useRoute();
  //start.jsから引き継いだlogin_idを使って 3/25
  //route.params.login_idを使う
  //TODO:firestoreのregisteredコレクションを検索。ログイン中のpostcodeとstorenameを取得 3/25
  const login_id = route.params.login_id; //引き継いだ値をlogin_idに代入
  const [isLoading, setLoading] = useState(true);
  const [Loggedin, setLoggedin] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("registered")
      .where("login_id", "==", login_id)
      .limit(1)
      .get()
      .then((querySnapshot) => {
        setLoggedin(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
  }, []);

  console.log(Loggedin.map((task) => task.storename));
  console.log(Loggedin.map((task) => task.postcode));

  //registerdコレクションに入っている店舗情報のうちstorenameとpostcodeだけ代入
  let storename = Loggedin.map((task) => task.storename);
  let postcode = Loggedin.map((task) => task.postcode);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://pictkan.com/uploads/converted/15/06/12/1571213585-background-2561_1920-jNP-1920x1280-MM-100.jpg",
        }}
        style={styles.image}
      >
        <View style={styles.box1}>
          <Text style={styles.textWhite}>ログインしました</Text>
					<View style={styles.buttonview}>
					<Button
            title="パン屋専用ホーム画面へ"
            //TODO: 第二引数にpostcodeとstorenameを入れ、bakery_home.jsに渡す 3/25
            onPress={() =>
              navigation.navigate("BakeryHome", {
                storename: storename[0],
                postcode: postcode[0],
              })
            }
            color="#FAFAFA"
          />
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
    height: "10%",
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
  textWhite: {
    color: "#FAFAFA",
  },
	buttonview:{
		backgroundColor: "#F4511E",
		borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
	}
});

export default LoginScreen;
