import React, { useEffect, useState } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { firebase } from "../firebase/firebase";
//import firestore from "@react-native-firebase/firestore";
//import { format } from "date-fns";

//保手濱担当画面
//焼きたて情報送信結果画面
//bakery_home.jsでも書いた通り、焼きたて情報はパン屋別ドキュメントにて上書きされるため
//常に1つだけ焼きたて時刻が残ってるはず
//const db = firebase.firestore();
//var docRef = db.collection("bakery");
//var bakedtime = []; //時刻を読み込んで格納するarrayを宣言

const Bakery_sentresult = ({ navigation }) => {
  console.log("OK1!");
  const [bakeries, setBakeries] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    firebase
      .firestore()
      .collection("bakery")
      .get()
      .then((querySnapshot) => {
        console.log("OK2!");
        setBakeries(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        console.log("OK3!");
        console.log(bakeries.length);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error");
      });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.Text}>これまでの焼きたて</Text>
      {bakeries.map((b) => (
        <Text>{b.bakery}</Text>
      ))}

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
