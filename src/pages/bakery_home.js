import React, { useEffect, useState } from "react";
import { StyleSheet, Button, Text, View,ImageBackground } from "react-native";
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
      <Button
        title="顧客ホーム画面に遷移"//変更しました（小川）
				color="#F4511E"
				style={styles.button1}
        onPress={() => navigation.navigate("Customer_Home")}
      />

      <Text style={styles.Text}>(パン屋住所)の(パン屋店名)でログイン中</Text>
      <Text style={styles.Text}>パンが焼けましたか？</Text>
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
      <Button
        title="送信結果を確認する"
				color="#F4511E"
				style={styles.button1}
        onPress={() => navigation.navigate("BakerySentResult")}
      />
      <Button
        title="パン屋登録画面"//追加しました（小川）
				color="#F4511E"
				style={styles.button1}
        onPress={() => navigation.navigate("Start")}
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
    flexDirection: "column"
  },
  Text: {
    color:"#FAFAFA",
    backgroundColor: "orange",
  },
	image: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center"
	},
	box1:{
		backgroundColor:"#48484880",
		width:"50%",
		height:"50%",
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
		marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
		alignItems:'center',
	},button1:{
		letterSpacing: 5,
		padding:10,

	}
});

export default Bakery_HomeScreen;
