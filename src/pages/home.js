import React from "react";
import { StyleSheet, Button, Text, View } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>ログインしてください</Text>
      <Button title="ログイン" onPress={() => navigation.navigate("Login")} />
      <Button title="顧客画面へ" onPress={() => navigation.navigate("Customer_Home")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
