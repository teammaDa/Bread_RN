import React from 'react';
import { StyleSheet, Button, Text, View, SafeAreaView, ImageBackground } from 'react-native';

//データの引継ぎ
//https://qiita.com/oda3104/items/de5489cd97ba674cbee5

const RegisteredScreen = ({ navigation }) => {
	return (
		<SafeAreaView style={styles.container}>
        <ImageBackground
					source={{
						uri: "https://pictkan.com/uploads/converted/15/06/12/1571213585-background-2561_1920-jNP-1920x1280-MM-100.jpg",
					}}
					style={styles.image}
					>
          <View style={styles.box1}>

			<Text>登録が完了されました</Text>
			<Button
				title="ログインはこちらから"
				onPress={() => navigation.navigate('Start')}
				color = "orange"
			/>
			</View>
        </ImageBackground>
      </SafeAreaView>

	);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    borderColor: 'orange',
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

export default RegisteredScreen