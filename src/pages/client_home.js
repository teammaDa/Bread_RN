import React from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  TextInput,
  ScrollView,
  SliderComponent,
} from "react-native";

const Home_ClientScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <Text>パン屋検索</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
        defaultValue="郵便番号を入力してください"
      />
      <Button title="検索" onPress={() => navigation.navigate("Login")} />
      <Button title="パン屋専用ホーム画面へ" onPress={() => navigation.navigate("Login")}/>
    </ScrollView>
  );
};

export default Home_ClientScreen;