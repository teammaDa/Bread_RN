import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";

//パン屋としてログイン後、Home画面。ここで焼き上がり送信もする。
//保手濱担当画面
const Bread_HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="顧客登録画面"
        onPress={() => navigation.navigate("Customer Register")}
      />
      <Button
        title="顧客ログイン画面"
        onPress={() => navigation.navigate("Customer Login")}
      />
      <Button
        title="パン屋検索画面"
        onPress={() => navigation.navigate("Search Bakery")}
      />

      <Text style={styles.Text}>(パン屋住所)の(パン屋店名)でログイン中</Text>
      <Text style={styles.Text}>パンが焼けましたか？</Text>
      <Button
        title="パンが焼けました"
        onPress={() => navigation.navigate("Bread_is_Baked")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    color: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  Text: {
    color: "white",
    backgroundColor: "orange",
  },
});

export default Bread_HomeScreen;
