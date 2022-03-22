import React, { useEffect, useState } from 'react';
// import {Useeffect} from "react";
import { StyleSheet,Text, View, TextInput, Button, SafeAreaView } from 'react-native';
import { firebase } from "../firebase/firebase";

const StartScreen = ({ navigation }) => {
	const [ login_id, setLogin_id ] = useState("");
	const [ password, setPassword ] = useState("");

	
	async function toggleLogin() {
		console.log("in toggleLogin()")
		
		// firestore内に、入力されたlogin_idとpasswordが登録されているかチェック
		const usersRef = firebase.firestore().collection("registered").where("login_id", "==", login_id ).where("password", "==", password).limit(1)
		usersRef
		.get()
		.then((docSnapshot) => {
			const docs = docSnapshot.docs;
			// 登録されている場合 => ログイン完了画面(login.js)へ
			if (docs.length != 0){
				docSnapshot.forEach(doc => {
				console.log(`${doc.id}: ${doc.data().login_id}`);
				return (navigation.navigate('Login'));
				})
				// 登録されていない場合は、登録する必要があるため、初期登録画面(register.js)へ
			} else {
				return (navigation.navigate('Register'))	
			}
		})
	}

	const testLogin = async () => {
		for(var i=0;i<login_id.length;i++){
			toggleLogin(login_id[i].login_id);
		}
	}

	return (
				<SafeAreaView style={styles.container}>
					<View style={styles.formGroup}>
						<Text style={styles.formLabel}>ログインid</Text>
						<TextInput
							style={styles.formControl}
							placeholder="login_id"
							onChangeText={(text) => setLogin_id(text)}
						/>
					</View>
					<View style={styles.formGroup}>
						<Text style={styles.formLabel}>パスワード</Text>
						<TextInput
							style={styles.formControl}
							placeholder="password"
							onChangeText={(text) => setPassword(text)}
						/>
					</View>
					<Button title="ログイン"
						onPress={() => {testLogin()}}/>

					<Text>新規登録はこちらから</Text>
					<Button title = "新規登録する"
					onPress={() => navigation.navigate('Register')}/>
					
				</SafeAreaView>
	);
}







const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  formLabel: {
    paddingRight: 16,
  },
  formControl: {
    height: 40,
    width: 160,
    padding: 8,
    borderColor: 'gray',
    borderWidth: 1
  },
  listItem: {
    height: 64,
    width: 200,
    marginBottom: 16,
    padding: 16,
    borderColor: 'gray',
    borderWidth: 1,
  }
});

export default StartScreen;
