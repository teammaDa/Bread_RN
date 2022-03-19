import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";

import { firebase } from "../firebase/firebase";
//import firestore from "@react-native-firebase/firestore";
//import { format } from "date-fns";

//パン屋としてログイン後、Home画面。ここで焼き上がり送信もする。
//保手濱担当画面
const Bakery_HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="パン屋検索画面に遷移"
        onPress={() => navigation.navigate("Search")}

      <Text style={styles.Text}>(パン屋住所)の(パン屋店名)でログイン中</Text>
      <Text style={styles.Text}>パンが焼けましたか？</Text>
      <Button
        title="パンが焼けました"
        onPress={() => {
          const newTimestamp = firebase.firestore.Timestamp.now();
          //Bakedコレクションに各店舗ドキュメントをつくり、そこに焼き上がり情報(タイムスタンプ)を入れる
          //ドキュメントが既に存在する場合、上書きされるため焼き上がり情報は常に1パン屋1つのはず
          //データを追加していくのが面倒だったので一旦上書きにしてます
          firebase
            .firestore()
            .collection("Baked")
            .doc("TokyoBakery")
            .set({
              //焼きたて時刻のみ保存
              newTimestamp,
            })
            .then(() => {
              console.log("Document successfully written!");
              navigation.navigate("BakerySentResult");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    color: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  Text: {
    color: "white",
    backgroundColor: "orange",
  },
});

export default Bakery_HomeScreen;