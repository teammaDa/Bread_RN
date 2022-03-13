import { NavigationContainer  } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../pages/home'
import LoginScreen from '../pages/login'

const Stack = createNativeStackNavigator();

//export const AppContainer = createAppContainer(RootStack);


export default function Router(){
	return(
    <NavigationContainer>
      <Stack.Navigator>
			<Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
