import React, { useEffect, useState } from "react";
import { StyleSheet, Button, Text, View, ImageBackground } from "react-native";
import { firebase } from "../firebase/firebase";
import { useRoute } from "@react-navigation/native";
//import firestore from "@react-native-firebase/firestore";
//import { format } from "date-fns";

//パン屋としてログイン後、Home画面。ここで焼き上がり送信もする。
//保手濱担当画面

const Bakery_HomeScreen = ({ navigation }) => {
  const route = useRoute();
  //login.jsから引き継いだpostcodeとstorenameを使って 3/25
  //route.params.postcodeとroute.params.storenameを使う
  const postcode = route.params.postcode; //引き継いだ値をpostcodeに代入
  const storename = route.params.storename; //引き継いだ値をstorenameに代入
  console.log(route.params.postcode);
  console.log(route.params.storename);
	const [users, setUsers] = useState([]);
	//通知を送信
	async function sendPushNotification(expoPushToken) {
		const message = {
			to: expoPushToken,
			sound: 'default',
			title: 'パン焼けたよ',
			body: 'おいしいパンが焼けました',
			data: { someData: 'goes here' },
		};
	
		await fetch('https://exp.host/--/api/v2/push/send', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Accept-encoding': 'gzip, deflate',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(message),
		});
	}
	
	//user全員に送信
	const sendNotification= async () => {
		for(var i=0;i<users.length;i++){
			
			sendPushNotification(users[i].token);
		}
	}

	//firestoreのユーザデータ取得
  useEffect(() => {
    firebase.firestore().collection('Clients').get().then((querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

  }, []);


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

          <Text style={styles.Text}>
            {postcode}の{storename}でログイン中
          </Text>
          <Text style={styles.Text}>
            パンが焼けましたか？{"\n"}パンが焼けたことを知らせましょう！
          </Text>
          <Button
            title="パンが焼けました"
            color="#F4511E"
            style={styles.button1}
            onPress={() => {

							sendNotification();
              //Bakedコレクションに各店舗ドキュメントをつくり、そこに焼き上がり情報(タイムスタンプ)を入れる

              //login.jsから引き継いだpostcodeとstorenameを使って 3/25
              //焼きたて時刻と同時に保存する 3/25
              firebase
                .firestore()
                .collection("Baked")
                .doc(storename)
                .collection("BakedTimestamps")
                .add({
                  //焼きたて時刻のみ保存
                  bakedtime: firebase.firestore.Timestamp.now(),
                  storename: storename,
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
          <Text style={styles.Text}> </Text>
          <Button
            title="送信結果を確認する"
            color="#F4511E"
            style={styles.button1}
            onPress={() =>{

						
              navigation.navigate("BakerySentResult", {
                storename: storename,
                postcode: postcode,
              });
							
						
						}}
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
  Text: {
    color: "#FAFAFA",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  box1: {
    backgroundColor: "#48484880",
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
  button1: {
    letterSpacing: 5,
    padding: 10,
  },
});

export default Bakery_HomeScreen;
