import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../pages/home"; //パン屋ホーム
import LoginScreen from "../pages/login"; //パン屋ログイン完了
import Customer_HomeScreen from "../pages/customer_home"; //顧客ホーム（パン屋検索画面）
import RegisterScreen from "../pages/register"; //パン屋登録
import RegisteredScreen from "../pages/registered"; //パン屋登録結果
import StartScreen from "../pages/start"; //パン屋ログイン画面
import SearchScreen from "../pages/search"; //住所検索画面
import Bakery_HomeScreen from "../pages/bakery_home"; //焼きたて送信画面
import Bakery_sentresult from "../pages/bakery_sentresult"; //焼きたて送信結果
import Customer_sentresult from "../pages/customer_sentresult"; //焼きたて送信結果(お客さん確認用)

const Stack = createNativeStackNavigator();

//export const AppContainer = createAppContainer(RootStack);

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Customer_Home" component={Customer_HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Registered" component={RegisteredScreen} />
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="BakeryHome" component={Bakery_HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="BakerySentResult" component={Bakery_sentresult} />
        <Stack.Screen name="CustomerSentResult" component={Customer_sentresult} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
