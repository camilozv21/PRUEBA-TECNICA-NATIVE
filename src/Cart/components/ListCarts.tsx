import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useContext} from 'react';
import {CartContext} from '../../state/CartContext';

function listCarts() {
  const {cart, removeFromCart} = useContext(CartContext);
  const total = cart.reduce((sum, product) => sum + product.price, 0);
  const windowHeight = Dimensions.get('window').height - 83;

  return (
    <SafeAreaView style={{height: windowHeight}}>
      <ScrollView>
        {cart.map((product, idx) => (
          <View key={product.id + idx} style={styles.container}>
            <View style={styles.infoContainer}>
              <Image
                source={{uri: product.image}}
                style={{width: 50, height: 50, marginRight: 10}}
              />
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {product.title}
              </Text>
            </View>
            <Text style={styles.price}>$ {product.price}</Text>
            <TouchableOpacity
              onPress={() => removeFromCart(product.id)}
              style={{
                backgroundColor: '#b01d1a',
                padding: 10,
                borderRadius: 5,
                alignItems: 'center',
                marginTop: 10,
              }}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>
                Remove
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.total}>Total: $ {total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
    marginHorizontal: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    flex: 1,
  },
  price: {
    fontSize: 16,
    color: '#000',
    textAlign: 'right',
    fontWeight: 'bold',
    paddingRight: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  total: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: '#fc5a03',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '80%',
    marginTop: 10,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default listCarts;
