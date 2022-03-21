import React, { useState } from 'react';
import { StyleSheet,Text, View, TextInput, Button, FlatList, SafeAreaView } from 'react-native';

const StartScreen = ({ navigation }) => {
	const [ login_id, setLogin_id ] = useState("");
	const [ password, setPassword ] = useState("");

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
						onPress={() => navigation.navigate('Login')}
						/* 	if(){
								navigation.navigate('Register')
							} else {
								navigation.navigate('Start')
							}	
						}
						*/
					/>

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

export default StartScreen