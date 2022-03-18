import React from 'react'
import { StyleSheet, Button, Text, View } from 'react-native'

const StartScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text>ログインしてください</Text>
			<Button
				title="Googleアカウントでログインする"
				onPress={() => navigation.navigate('Start')}
			/>
      <Text>初期登録はこちらから</Text>
			<Button
				title="初期登録する"
				onPress={() => navigation.navigate('Register')}
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

export default StartScreen

