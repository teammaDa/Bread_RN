import React, { useEffect, useState } from "react";
import { firebase } from "../firebase/firebase";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Button,
  Text,
  View,
  TextInput,
  ScrollView,
} from "react-native";
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
  const myTimestamp2 = firebase.firestore.Timestamp.now().toDate();
  const [isLoading, setLoading] = useState(true);
  const [bakeries, setBakeries] = useState([]);
  var zt = null;

  //console.log(myTimestamp2);
  useEffect(() => {
    firebase
      .firestore()
      .collection("Baked")
      .get()
      .then((querySnapshot) => {
        setBakeries(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
  }, []);

  console.log(bakeries.map((task) => task.bakedtime.toDate().toString()));

  return (
    <View style={styles.container}>
      <Text style={styles.Text}>これまでの焼きたて</Text>

      {bakeries.map((task) => (
        <li>{task.bakedtime.toDate().toString()}</li>
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
