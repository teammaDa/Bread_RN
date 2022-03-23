import { NavigationContainer  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen from '../pages/home'
import LoginScreen from '../pages/login'
import Customer_HomeScreen from '../pages/customer_home'
import RegisterScreen from '../pages/register'
import RegisteredScreen from '../pages/registered'
import StartScreen from '../pages/start'
import SearchScreen from "../pages/search";
import Bakery_HomeScreen from "../pages/bakery_home";
import Bakery_sentresult from "../pages/bakery_sentresult";
import NotificationScreen from "../pages/notification"


const Stack = createNativeStackNavigator();

//export const AppContainer = createAppContainer(RootStack);


export default function Router(){
	return(
    <NavigationContainer>
      <Stack.Navigator>
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Customer_Home" component={Customer_HomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Registered" component={RegisteredScreen} />
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="BakeryHome" component={Bakery_HomeScreen} />
        <Stack.Screen name="BakerySentResult" component={Bakery_sentresult} />
				<Stack.Screen name="Notification" component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
