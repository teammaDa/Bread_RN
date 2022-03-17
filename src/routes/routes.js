import { NavigationContainer  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../pages/home'
import LoginScreen from '../pages/login'
import RegisterScreen from '../pages/register'
import RegisteredScreen from '../pages/registered'
import StartScreen from '../pages/start'

const Stack = createNativeStackNavigator();

//export const AppContainer = createAppContainer(RootStack);


export default function Router(){
	return(
    <NavigationContainer>
      <Stack.Navigator>
			<Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Registered" component={RegisteredScreen} />
        <Stack.Screen name="Start" component={StartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
