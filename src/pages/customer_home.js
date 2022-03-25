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
} from "react-native";
//import css from "./style.css";

//中島さんのsearchをコピペしました！
const Customer_HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [postcode, setPostcode] = useState("");
  const [bakeries, setBakeries] = useState([]);
  const [nearbakeries, setNearBakeries] = useState([]);
	const [address,setAddress]=useState("");
  

  const getPost = async () => {
    try {
      const response = await fetch(
        "https://zipcloud.ibsnet.co.jp/api/search?zipcode=" + postcode
      );
      const json = await response.json();
      setData(json.results);
      setAddress(json.results[0].address1 + json.results[0].address2);
      if (!json.results[0].address1) {
        buttonAlert();
      }
      setLoading(false);
    } catch (error) {
      buttonAlert();
      setLoading(true);
    } finally {
      setLoading(false);
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
        <ImageBackground
          source={{
            uri: "https://pictkan.com/uploads/converted/15/06/12/1571213585-background-2561_1920-jNP-1920x1280-MM-100.jpg",
          }}
          style={styles.image}
        >
          <View style={styles.box1}>
            <Text style={styles.Text}> </Text>
						<Text style={styles.textWhite}>郵便番号を入力すると</Text>
						<Text style={styles.textWhite}>近くのパン屋を検索します</Text>
            <TextInput
              class="textInput"
              placeholder="郵便番号"
              onChangeText={(text) => {
                setPostcode(text);
              }}
              style={{ borderWidth: 2, borderColor: "#E11F", margin: 20 }}
            />

            <Button
              class="button"
              title="送信"
							color="#F4511E"
              onPress={() => {
                getPost();
              }}
            ></Button>
            {isLoading ? (
            <Text> </Text>
            ) : (
              <Text  style={styles.textWhite}>{data[0].address1 + data[0].address2}の近くのパン屋</Text>
            )}
          {bakeries.map((b) => (
							<View>
								{b.address==address?(
									<Text key={b.id} style={styles.textWhite}>{b.name}</Text>
								):
								(
									<Text key={b.id} style={styles.textWhite}></Text>
								)	
								}
							</View>
            ))}
            <Text> </Text>
            <Button
              title="これまでの焼き上がり時刻を検索する"
              onPress={() => navigation.navigate("CustomerSentResult")}
              color = "#F4511E"
            />
        </View>
        <Button
          class="button"
          title="パン屋専用ホーム画面へ"
          color="#F4511E"
          onPress={() => navigation.navigate("BakeryHome")} //3/19 Bakery_Homeとなっていたため保手濱がデバッグ
        />
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column"
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
	},
	textWhite:{
		color:"#FAFAFA"
	}
 });

export default Customer_HomeScreen;