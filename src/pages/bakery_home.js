import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import firestore from "@react-native-firebase/firestore";
//import { format } from "date-fns";

//パン屋としてログイン後、Home画面。ここで焼き上がり送信もする。
//保手濱担当画面

const Bakery_HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="パン屋検索画面"
        onPress={() => navigation.navigate("Search")}
      />

      <Text style={styles.Text}>(パン屋住所)の(パン屋店名)でログイン中</Text>
      <Text style={styles.Text}>パンが焼けましたか？</Text>
      <Button
        title="パンが焼けました"
        onPress={() => {
          const newTimestamp = firebase.firestore.Timestamp.now();
          //Bakedコレクションに各店舗ドキュメントをつくり、そこに焼き上がり情報(タイムスタンプ)を入れる
          firestore()
            .collection("Baked") //Bakedコレクション
            .doc("TokyoBakery") //パン屋名「東京ベーカリー」
            .set({
              //以下のデータを入れていく
              bakeryname: "TokyoBakery", //ログイン中のパン屋名
              bakery_id: "CA", //ログイン中のベーカリーID
              timestamp: newTimestamp,
            });
        }}
      />
    </View>
  );
};

//.then(() => {
//  console.log("Document successfully written!");
//})
//.catch((error) => {
//  console.error("Error writing document: ", error);
//})

//将来的に焼き上がり情報にパンの種類を入れるようになった場合、
//各店舗ドキュメント内に一度の焼き上がりサブコレクションを作り、
//そこにタイムスタンプとパンの種類を入れると思う

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

export default Bakery_HomeScreen;
