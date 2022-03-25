import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Button,
  Text,
  View,
  TextInput,
  ImageBackground,
  SafeAreaView,
} from "react-native";

const SearchScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [postcode, setPostcode] = useState("");

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
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  /*
  useEffect(() => {
    firebase.firestore().collection('bakery').get().then((querySnapshot) => {
      setBakeries(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

  }, []);
	*/

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://pictkan.com/uploads/converted/15/06/12/1571213585-background-2561_1920-jNP-1920x1280-MM-100.jpg",
        }}
        style={styles.image}
      >
        <View style={styles.box1}>
          {isLoading ? (
            <Text style={styles.formLabel}>住所が出ます</Text>
          ) : (
            <Text>
              {data[0].address1}
              {data[0].address2}
            </Text>
          )}
          <View style={styles.formGroup}>
            <TextInput
              style={styles.formControl}
              placeholder="郵便番号"
              onChangeText={(text) => {
                setPostcode(text);
              }}
            />
          </View>
          <Text style={styles.formLabel}>
            検索で取得した「住所情報」は新規登録時に必要になります。{"\n"}
            画面を新規登録画面へ進む前に、メモを取っておきましょう。
          </Text>
          <Text> </Text>
          <Button
            title="送信"
            color="#F4511E"
            onPress={() => {
              getPost();
            }}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
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
  formLabel: {
    marginVertical: 8,
    color: "white",
    fontSize: 15,
  },
  formControl: {
    height: 40,
    width: 160,
    padding: 8,
    borderColor: "#F4511E",
    borderWidth: 1,
    backgroundColor: "#D3D3D3aa",
  },
  formGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
});

export default SearchScreen;
