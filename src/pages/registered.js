import React from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
} from "react-native";

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
          <Text style={styles.formLabel}>登録が完了されました</Text>
		  <Text> </Text>
          <Button
            title="ログインはこちらから"
            onPress={() => navigation.navigate("Start")}
            color="#F4511E"
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    padding: 35,
  },
  formGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  formLabel: {
    marginVertical: 8,
    color: "white",
    fontSize: 15,
  },
  formControl: {
    height: 40,
    width: 160,
    padding: 8,
    borderColor: "orange",
    borderWidth: 1,
  },
});

export default RegisteredScreen;
