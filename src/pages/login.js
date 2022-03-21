import React,{useState,useEffect,useRef} from 'react'
import { StyleSheet, Button, Text, View } from 'react-native'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

import { firebase } from "../firebase/firebase";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


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


const LoginScreen = ({ navigation }) => {
	const [expoPushToken, setExpoPushToken] = useState('');
	const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
	useEffect(() => {
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
			<Text>ログインしました</Text>
			<Button
				title="ホームへ"
				onPress={() => {
					firebase.firestore().collection("Users").doc(expoPushToken)
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
			/>
		</View>
	);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen