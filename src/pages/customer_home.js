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

//中島さんのsearchをコピペしました！
const Customer_HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [postcode, setPostcode] = useState("");
  const [bakeries, setBakeries] = useState([]);
  const [nearbakeries, setNearBakeries] = useState([]);
  var address = "";

  const getPost = async () => {
    try {
      const response = await fetch(
        "https://zipcloud.ibsnet.co.jp/api/search?zipcode=" + postcode
      );
      const json = await response.json();
      setData(json.results);
      console.log(json);
      console.log(json.results);
      console.log(json.results[0].address1);
      console.log(json.results);
      address = json.results[0].address1 + json.results[0].address2;
      console.log(address);
      console.log("log");
      console.log(json.results[0].address1 + json.results[0].address2);

      getBakery();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const getBakery = async () => {
    nearbakeries.length = 0;
    for (var i = 0; i < bakeries.length; i++) {
      const bakery_post = await fetch(
        "https://zipcloud.ibsnet.co.jp/api/search?zipcode=" +
          bakeries[i].postcode
      );
      const json_bakery = await bakery_post.json();
      console.log("get");
      console.log(json_bakery);
      console.log(
        json_bakery.results[0].address1 + json_bakery.results[0].address2
      );

      if (
        address ==
        json_bakery.results[0].address1 + json_bakery.results[0].address2
      ) {
        setNearBakeries([...nearbakeries, { name: bakeries[i].name }]);
        console.log(bakeries[i].postcode);
        console.log(nearbakeries);
      }
      console.log(bakeries[i].name);
    }
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("bakery")
      .get()
      .then((querySnapshot) => {
        setBakeries(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="郵便番号"
        onChangeText={(text) => {
          setPostcode(text);
        }}
        style={{ borderWidth: 2, borderColor: "skyblue", margin: 20 }}
      />
      <Button
        title="送信"
        onPress={() => {
          //ここが反映されないので、改善が必要です。
          if (!bakeries[0].name && bakeries[0].postcode) {
            <Text>検索結果がありません</Text>;
            getPost();
          } else {
            getPost();
          }
        }}
      />
      {isLoading ? (
        <Text></Text>
      ) : (
        <Text>{data[0].address1 + data[0].address2}の近くのパン屋</Text>
      )}
      {nearbakeries.map((b) => (
        <Text>{b.name}</Text>
      ))}
      <Button
        title="パン屋専用ホーム画面へ（今だけログイン画面へ）"
        onPress={() => navigation.navigate("Start")}
        // ログイン画面確認のために、BakeryHome　からログイン画面に一時的に変更
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
});

export default Customer_HomeScreen;
