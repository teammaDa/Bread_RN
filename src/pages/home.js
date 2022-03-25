import React from "react";
import { StyleSheet, Button, Text, View,  ImageBackground,
  SafeAreaView, } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://pictkan.com/uploads/converted/15/06/12/1571213585-background-2561_1920-jNP-1920x1280-MM-100.jpg",
        }}
        style={styles.image}
      >
      <Text style={styles.Text}>ログインしてください</Text>
      <Button title="ログイン" onPress={() => navigation.navigate("Start")} />
      <Button title="顧客画面へ" onPress={() => navigation.navigate("Customer_Home")} />
      </ImageBackground>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  box1: {
    backgroundColor: "#484848aa",
    width: "auto",
    height: "auto",
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "auto",
    marginBottom: "auto",
    alignItems: "center",
    padding:35
  },
  formLabel: {
    marginVertical: 8,
    color: "white",
    fontSize: 15,
  },

});


export default HomeScreen;