import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Welcome from './app/screens/Welcome';
import PrintEzy from './app/screens/PrintEzy';
import CurrentOrders from './app/screens/Current Orders';
import PastOrders from './app/screens/Past Orders';
import StoreOwnerHomePage from './app/screens/Store Owner Home Page';
import StoreOwnerLogin from './app/screens/Store Owner Login';
import DriverLogin from './app/screens/Driver Login';
import DeliveryOrders from './app/screens/Delivery Orders';


import UserPref from './app/screens/UserPref';


const Stack=createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
      <Stack.Screen name="PrintEzy" component={PrintEzy}/>
      <Stack.Screen name="Welcome" component={Welcome}/>
      <Stack.Screen name="Store Owner Home Page" component={StoreOwnerHomePage}/>
      <Stack.Screen name="UserPref" component={UserPref}/>
      <Stack.Screen name="Delivery Orders" component={DeliveryOrders}/>
      <Stack.Screen name="Past Orders" component={PastOrders}/>
      <Stack.Screen name="Current Orders" component={CurrentOrders}/>
      <Stack.Screen name="Store Owner Login" component={StoreOwnerLogin}/>
      <Stack.Screen name="Driver Login" component={DriverLogin}/>
      
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}


