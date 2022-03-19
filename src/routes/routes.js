import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../pages/home";
import LoginScreen from "../pages/login";
import SearchScreen from "../pages/search";
import Bakery_HomeScreen from "../pages/bakery_home";

const Stack = createNativeStackNavigator();

//export const AppContainer = createAppContainer(RootStack);

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="BakeryHome" component={Bakery_HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
