import React, { useEffect, useState ,useRef} from "react";
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
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

//import styles from "../styles/styles";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

//トークンを取得
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}


//中島さんのsearchをコピペしました！
const Customer_HomeScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [postcode, setPostcode] = useState("");
  const [bakeries, setBakeries] = useState([]);
  const [nearbakeries, setNearBakeries] = useState([]);
	const [address,setAddress]=useState("");
  const [expoPushToken, setExpoPushToken] = useState('');
	const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [storename, setStorename] = useState("");

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
      .collection("registered")
      .get()
      .then((querySnapshot) => {
        setBakeries(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
			registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
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
            placeholderTextColor={"white"}
            class="textInput"
            placeholder="郵便番号"
            onChangeText={(text) => {
              setPostcode(text);
            }}
            style={{ borderWidth: 2, borderColor: "#E11F", margin: 20 }}
          />
					<View style={styles.buttonview}>
            <Button
              class="button"
              title="送信"
							color="#FAFAFA"
              onPress={() => {
                getPost();
								firebase.firestore().collection("Clients").doc(expoPushToken)
						.set({
								//焼きたて時刻のみ保存
								token:expoPushToken,
						}).then(() => {
								console.log("Document successfully written!");
								navigation.navigate('Notification');
						}).catch((error) => {
								console.error("Error writing document: ", error);
						});
              }}
            ></Button>
						</View>
            {isLoading ? (
            <Text> </Text>
          ) : (
            <Text style={styles.textWhite}>
              {data[0].address1 + data[0].address2}の近くのパン屋
            </Text>
          )}
          {bakeries.map((b) => (
            <View>
              {b.postcode == address ? (
                <Text key={b.id} style={styles.textWhite}>
                  {b.storename}
                </Text>
              ) : (
                <Text key={b.id} style={styles.textWhite}></Text>
              )}
            </View>
          ))}
          <Text> </Text>
          <Text style={styles.textWhite}>
            お気に入りのお店のこれまでの焼き上がりを検索してみましょう
          </Text>
          <TextInput
            placeholderTextColor={"white"}
            class="textInput"
            placeholder="お店の名前"
            onChangeText={(text) => setStorename(text)}
            style={{ borderWidth: 2, borderColor: "#E11F", margin: 20 }}
          />
					<View style={styles.buttonview}>
          <Button
            title="検索する"
            onPress={() =>
              navigation.navigate("CustomerSentResult", {
                storename: storename,
              })
            }
            color="#FAFAFA"
          />
					</View>
        </View>
				<View style={styles.buttonview}>
        <Button
          class="button"
          title="パン屋専用ホーム画面へ"
          color="#FAFAFA"
          onPress={() => navigation.navigate("Start")} //3/19 Bakery_Homeとなっていたため保手濱がデバッグ
        />
				</View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  box1: {
    backgroundColor: "#48484880",
    width: "50%",
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
  },
  textWhite: {
    color: "#FAFAFA",
  },
	buttonview:{
		backgroundColor: "#F4511E",
		borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
	}
});
export default Customer_HomeScreen;
