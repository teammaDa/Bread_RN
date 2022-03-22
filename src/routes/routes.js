import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../pages/home"; //パン屋ログイン
import LoginScreen from "../pages/login"; //パン屋ホーム???
import Customer_HomeScreen from "../pages/customer_home"; //顧客ホーム
import RegisterScreen from "../pages/register"; //パン屋登録
import RegisteredScreen from "../pages/registered"; //パン屋登録結果
import StartScreen from "../pages/start"; //???
import SearchScreen from "../pages/search"; //パン屋検索画面
import Bakery_HomeScreen from "../pages/bakery_home"; //焼きたて送信画面
import Bakery_sentresult from "../pages/bakery_sentresult"; //焼きたて送信結果

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
        <Stack.Screen name="BakerySentResult" component={Bakery_sentresult} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}