import React, {useContext, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Product} from '../../common/interfaces/product';
import instance from '../../common/api/axios';
import {CartContext} from '../../state/CartContext';

function ProductById({id}) {
  const [product, setProduct] = useState<Product>([]);
  const {cart, addToCart} = useContext(CartContext);
  // const [isAdded, setIsAdded] = useState<boolean>(false);

  const getProduct = async () => {
    try {
      const response = await instance.get<Product>(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  // const handleAddToCart = product => {
  //   addToCart(product);
  //   setIsAdded(true);
  //   Alert.alert('Product added to cart');
  // };
  const isAdded = (product: Product): boolean => {
    return cart.some(item => item.id === product.id);
  };

  const handleAddToCart = (product: Product) => {
    if (isAdded(product)) {
      Alert.alert('Product is already in the cart');
    } else {
      addToCart(product);
      Alert.alert('Product added to cart');
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          {product && product.image ? (
            <>
              <View style={styles.infoContainer}>
                <Text style={{fontSize: 12, color: '#888'}}>Nuevo | +1000 vendidos</Text>
                <Text style={{color: '#fc5a03'}}>
                  {product.rating.rate} ★★★★☆({product.rating.count})
                </Text>
              </View>
              <Text style={styles.title}>{product.title}</Text>
              <Image source={{uri: product.image}} style={styles.image} />
              <Text style={styles.price}>$ {product.price}</Text>
              <Text style={{color: '#fc5a03', marginVertical: 10}}>
                View payment methods
              </Text>
              <Text style={{color: '#000', fontSize: 16}}>
                Arrives Friday for $11.99
              </Text>
              <Text style={{color: '#fc5a03', marginVertical: 10}}>
                More delivery methods
              </Text>
              <Text
                style={{color: '#178a00', fontSize: 17, fontWeight: 'bold'}}>
                Free return
              </Text>
              <Text style={{color: '#888888'}}>You have 30 days after you receive it</Text>
              <Text style={{color: '#fc5a03'}}>Learn more</Text>
              <Text style={{color: '#000', fontSize: 16, marginVertical: 10}}>
                Stock available
              </Text>
              <View style={styles.quantityContainer}>
                <Text style={{color: '#000', fontSize: 16, marginVertical: 10}}>
                  Quantity: 1
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    marginVertical: 10,
                    paddingLeft: '20%',
                    color: '#888888'
                  }}>
                  (5 available)
                </Text>
              </View>
              <TouchableOpacity style={styles.button}>
                <Text style={{color: '#fff', fontSize: 16, fontWeight: '700'}}>
                  Buy now
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonCart}
                disabled={isAdded(product)}
                onPress={() => handleAddToCart(product)}>
                <Text
                  style={{color: '#fc5a03', fontSize: 16, fontWeight: '700'}}>
                  {isAdded(product) ? 'Added to cart' : 'Add to cart'}
                </Text>
              </TouchableOpacity>
              <View style={{borderLeftWidth: 2, paddingLeft: 5}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{color: '#000'}}>Sold by </Text>
                  <Text style={{color: '#fc5a03'}}>FASHIONASTY</Text>
                </View>
                <Text style={{color: '#000', fontWeight: 600}}>+500 solds</Text>
              </View>
              <View>
                <Text style={{flexWrap: 'wrap'}}>
                  <Text style={{color: '#fc5a03'}}>
                    🛡️ Protected purchase,{' '}
                  </Text>
                  <Text style={{color: '#000'}}>
                    receive the product you were expecting.
                  </Text>
                </Text>
              </View>
              <Text
                style={{
                  color: '#000',
                  fontSize: 20,
                  fontWeight: 700,
                  marginVertical: 10,
                }}>
                Product features
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: 20,
                  marginBottom: 5,
                }}>
                Description
              </Text>
              <Text style={{color: '#000', textAlign: 'justify'}}>
                {product.description}
              </Text>
            </>
          ) : (
            <Text>Cargando...</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'normal',
    marginBottom: 10,
    color: '#000',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  price: {
    fontSize: 24,
    color: '#000',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#fc5a03',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  buttonCart: {
    marginVertical: 10,
    backgroundColor: '#FDCBB2',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
});

export default ProductById;
