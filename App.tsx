import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import Home from './src/Home/view/Home';
import ProductDetail from './src/Home/view/ProductDetail';
import {CartProvider} from './src/state/CartContext';
import ShoppingCart from './src/Cart/view/ShoppingCart';
import CartButton from './src/Cart/components/CartButton';
import SplashScreen from 'react-native-splash-screen';
import {Platform} from 'react-native';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    if (Platform.OS === 'android') SplashScreen.hide();
  }, []);

  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Products',
              headerRight: () => <CartButton />,
            }}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetail}
            options={{
              title: 'Product Detail',
              headerRight: () => <CartButton />,
            }}
          />
          <Stack.Screen
            name="ShoppingCart"
            component={ShoppingCart}
            options={{title: 'Shopping Cart'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

export default App;
