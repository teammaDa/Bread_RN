import React from 'react'
import { StyleSheet, Button, Text, View } from 'react-native'

const LoginScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text>ログインしました</Text>
			<Button
				title="ホームへ"
				onPress={() => navigation.navigate('Home')}
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