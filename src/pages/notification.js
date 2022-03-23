import React, { useEffect, useState } from 'react'
import { ActivityIndicator,FlatList,StyleSheet, Button, Text, View,TextInput  } from 'react-native'
import { collection, doc ,onSnapshot} from 'firebase/firestore';

import { firebase } from '../firebase/firebase';


const NotificationScreen = ({ navigation }) => {
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
    firebase.firestore().collection('Users').get().then((querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

  }, []);
	
	//ボタンを押すと送信
	return (
		<View style={styles.container}>
			
			
			<Button
				title="通知を送信"
				onPress={() => {sendNotification()}}
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




export default NotificationScreen