import React, { useEffect, useState } from "react";
import { StyleSheet, Button, Text, View, ImageBackground } from "react-native";
import { firebase } from "../firebase/firebase";
//import firestore from "@react-native-firebase/firestore";
//import { format } from "date-fns";

//パン屋としてログイン後、Home画面。ここで焼き上がり送信もする。
//保手濱担当画面

const Bakery_HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://pictkan.com/uploads/converted/15/06/12/1571213585-background-2561_1920-jNP-1920x1280-MM-100.jpg",
        }}
        style={styles.image}
      >
        <View style={styles.box1}>
          <Text style={styles.Text}> </Text>
          <Button
            title="お客さん専用ページへ" //変更しました（小川）
            color="#F4511E"
            style={styles.button1}
            onPress={() => navigation.navigate("Customer_Home")}
          />
          <Text> </Text>
          <Text style={styles.formLabel}>
            (パン屋住所)の(パン屋店名)でログイン中
          </Text>
          <Text style={styles.formLabel}>
            パンが焼けましたか？{"\n"}パンが焼けたことを知らせましょう！
          </Text>
          <Text> </Text>
          <Button
            title="パンが焼けました"
            color="#F4511E"
            style={styles.button1}
            onPress={() => {
              //const newTimestamp = firebase.firestore.Timestamp.now();
              //Bakedコレクションに各店舗ドキュメントをつくり、そこに焼き上がり情報(タイムスタンプ)を入れる
              //ドキュメントが既に存在する場合、上書きされるため焼き上がり情報は常に1パン屋1つのはず
              //データを追加していくのが面倒だったので一旦上書きにしてます
              firebase
                .firestore()
                .collection("Baked")
                .doc("TokyoBakery")
                .set({
                  //焼きたて時刻のみ保存
                  bakedtime: firebase.firestore.Timestamp.now(),
                })
                .then(() => {
                  console.log("Document successfully written!");
                  //navigation.navigate("BakerySentResult");
                })
                .catch((error) => {
                  console.error("Error writing document: ", error);
                });
            }}
          />
          <Text> </Text>
          <Button
            title="送信結果を確認する"
            color="#F4511E"
            style={styles.button1}
            onPress={() => navigation.navigate("BakerySentResult")}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
//将来的に焼き上がり情報にパンの種類を入れるようになった場合、
//各店舗ドキュメント内に一度の焼き上がりサブコレクションを作り、
//そこにタイムスタンプとパンの種類を入れると思う

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  formLabel: {
    marginVertical: 8,
    color: "white",
    fontSize: 15,
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
    padding: 35,
  },
});

export default Bakery_HomeScreen;
