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
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
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
  const route = useRoute();
  const storename = route.params.storename;
  const postcode = route.params.postcode;
  const myTimestamp2 = firebase.firestore.Timestamp.now().toDate();
  const [isLoading, setLoading] = useState(true);
  const [bakeries, setBakeries] = useState([]);
  var zt = null;

  //console.log(myTimestamp2);
  //ログイン中の店舗のみでの焼きたて時刻一覧を表示 3/25
  useEffect(() => {
    firebase
      .firestore()
      .collection("Baked")
      .doc(storename)
      .collection("BakedTimestamps")
      .get()
      .then((querySnapshot) => {
        setBakeries(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
  }, []);

  console.log(bakeries.map((task) => task.bakedtime.toDate().toString()));

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://pictkan.com/uploads/converted/15/06/12/1571213585-background-2561_1920-jNP-1920x1280-MM-100.jpg",
        }}
        style={styles.image}
      >
        <View style={styles.box1}>
          <Text style={styles.Text}> </Text>
          <Text style={styles.textWhite}>{storename}のこれまでの焼きたて</Text>

          {bakeries.map((task) => (
            <Text style={styles.textWhite}>
              {task.bakedtime.toDate().toString()}
            </Text>
          ))}

          <Text> </Text>
          <Button
            title="焼きたて送信画面に戻る"
            onPress={() =>
              navigation.navigate("BakeryHome", {
                storename: storename,
                postcode: postcode,
              })
            }
            color="#F4511E"
          />
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
  textWhite: {
    color: "#FAFAFA",
  },
});

export default Bakery_sentresult;
