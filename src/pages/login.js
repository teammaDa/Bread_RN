import React from 'react'
import { StyleSheet, Button, Text, View, ImageBackground, SafeAreaView } from 'react-native'

const LoginScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground
				source={{
					uri: "https://pictkan.com/uploads/converted/15/06/12/1571213585-background-2561_1920-jNP-1920x1280-MM-100.jpg",
				}}
				style={styles.image}
			>
				<View style={styles.box1}>

				<Text>ログインしました</Text>
				<Button
					title="パン屋専用ホーム画面へ"
					onPress={() => navigation.navigate('BakeryHome')}
					color = "orange"
				/>
				</View>
			</ImageBackground>
		</SafeAreaView>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		textAlign: 'center',
		justifyContent: 'center',
	  },
	  image: {
		flex: 1,
		resizeMode: "cover",
		justifyContent: "center",
	  },
	  box1:{
		backgroundColor:"#48484866",
		width:"50%",
		height:"10%",
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
	  
	});

export default LoginScreen