import React from 'react';
import ListCarts from '../components/ListCarts';
import {SafeAreaView, ScrollView} from 'react-native';

function ShoppingCart() {
  return (
    <SafeAreaView>
      <ScrollView>
        <ListCarts />
      </ScrollView>
    </SafeAreaView>
  );
}

export default ShoppingCart;
