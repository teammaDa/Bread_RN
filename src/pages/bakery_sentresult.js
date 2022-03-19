import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { firebase } from "../firebase/firebase";
//import firestore from "@react-native-firebase/firestore";
//import { format } from "date-fns";

//保手濱担当画面
//焼きたて情報送信結果画面
//bakery_home.jsでも書いた通り、焼きたて情報はパン屋別ドキュメントにて上書きされるため
//常に1つだけ焼きたて時刻が残ってるはず
const db = firebase.firestore();
var docRef = db.collection("Baked").doc("TokyoBakery");
let bakedtime; //時刻を読み込んで格納する変数を宣言
docRef
  .get()
  .then((doc) => {
    if (doc.exists) {
      bakedtime = doc.data();
      console.log(doc.data());
    } else {
      console.log("404");
    }
  })
  .catch((error) => {
    console.log("error");
  });

const Bakery_sentresult = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>これまでの焼きたて</Text>
      <Text style={styles.Text}>{bakedtime}</Text>
      <Button
        title="パン屋検索画面に遷移"
        onPress={() => navigation.navigate("Search")}
      />
      <Button
        title="焼きたて送信画面に遷移"
        onPress={() => navigation.navigate("BakeryHome")}
      />
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
  Text: {
    color: "black",
    backgroundColor: "orange",
  },
});

export default Bakery_sentresult;
