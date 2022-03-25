import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Button,
  Text,
  View,
  TextInput,
  SafeAreaView, 
  ImageBackground 
} from "react-native";

const SearchScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [postcode, setPostcode] = useState("");

  const getPost = async () => {
    try {
      const response = await fetch(
        "https://zipcloud.ibsnet.co.jp/api/search?zipcode=" + postcode
      );
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
  };
  /*
  useEffect(() => {
    firebase.firestore().collection('bakery').get().then((querySnapshot) => {
      setBakeries(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

  }, []);
	*/

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://pictkan.com/uploads/converted/15/06/12/1571213585-background-2561_1920-jNP-1920x1280-MM-100.jpg",
        }}
        style={styles.image}
      >
        <View style={styles.box1}>
        <Text style={styles.Text}> </Text>
          {isLoading ? (
            <Text style={styles.textWhite}>住所が出ます</Text>
          ) : (
            <Text style={styles.textWhite}>
              {data[0].address1}
              {data[0].address2}
            </Text>
          )}
          <TextInput
            placeholder="郵便番号"
            onChangeText={(text) => {
              setPostcode(text);
            }}
            style={{ borderWidth: 2, borderColor: "#E11F" , margin: 20 }}
          />
          <Button
            title="送信"
            onPress={() => {
              getPost();
            }}
            color = "#F4511E"
          />
        </View>
      </ImageBackground> 
    </SafeAreaView>
  );
};

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
    height:"50%",
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
  textWhite:{
		color:"#FAFAFA"
	}
});

export default SearchScreen;
