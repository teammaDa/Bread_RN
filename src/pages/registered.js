import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';

const RegisteredScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text>登録が完了されました</Text>
			<Button
				title="ログインはこちらから"
				onPress={() => navigation.navigate('Start')}
			/>
		</View>
	);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RegisteredScreen