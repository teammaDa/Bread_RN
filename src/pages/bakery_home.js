import React from 'react'
import { StyleSheet, Button, Text, View } from 'react-native'

const Bread_HomeScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text>パンが焼けましたか？</Text>
			<Button
				title="パンが焼けました"
				onPress={() => navigation.navigate('Bread_is_Baked')}
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

export default Bread_HomeScreen