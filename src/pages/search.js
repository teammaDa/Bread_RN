import React, { useEffect, useState } from 'react'
import { ActivityIndicator,FlatList,StyleSheet, Button, Text, View,TextInput  } from 'react-native'

const SearchScreen = ({ navigation }) => {
	const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
	const [postcode,setPostcode]=useState('');

  const getPost = async () => {
     try {
			const response = await fetch('https://zipcloud.ibsnet.co.jp/api/search?zipcode='+postcode);
      const json = await response.json();
      setData(json.results);
			console.log(json);
			console.log(json.results);
			console.log(json.results[0].address1);
			console.log(json.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
	/*
  useEffect(() => {
    getPost();
  }, []);
	*/
	
	return (
		<View style={styles.container}>
			<Text>ログインしてください</Text>
			
			<Button
				title="ログイン"
				onPress={() => navigation.navigate('Login')}
			/>
			{isLoading ? (<Text>住所が出ます</Text>) : (
        
        <Text>{data[0].address1}{data[0].address2}</Text>
      )}
			<TextInput 
				placeholder='郵便番号'
				onChangeText={(text)=>{setPostcode(text)}}
				style={{borderWidth:2,borderColor:'skyblue',margin:20}}
			/>
			<Button
				title="送信"
				onPress={() => {getPost()}}
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

export default SearchScreen
