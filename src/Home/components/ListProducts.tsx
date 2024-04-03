import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import instance from '../../common/api/axios';
import {Product} from '../../common/interfaces/product';
import {useNavigation} from '@react-navigation/native';
import {CartContext} from '../../state/CartContext';

function ListProducts(): React.JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const {cart, addToCart} = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');

  const navigation = useNavigation();

  const getProducts = useCallback(async () => {
    try {
      const response = await instance.get<Product[]>('/products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getProductsBySearch = useCallback(async () => {
    try {
      const response = await instance.get<Product[]>(
        `/products/category/${searchTerm.toLowerCase().trim()}`,
      );
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [searchTerm]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      getProducts();
    } else {
      getProductsBySearch();
    }
  }, [getProducts, getProductsBySearch, searchTerm]);

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
        <TextInput
          style={styles.searchBar}
          placeholder="🔍electronics, jewelery..."
          placeholderTextColor="#888888" 
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Text style={{color: '#000', padding: 10}}>
          This are the categories: electronics, jewelery, men's clothing,
          women's clothing
        </Text>
        <View style={styles.container}>
          <Text style={styles.header}>Inspired by the latest you saw</Text>
          <View
            style={{
              borderBottomColor: 'gray',
              borderBottomWidth: 1,
              marginVertical: 3,
            }}
          />
          {products.length === 0 ? (
            <Text>Loading...</Text>
          ) : (
            products.map((product: Product, idx) => (
              <View
                style={{borderBottomColor: '#000', borderBottomWidth: 1}}
                key={product.id + idx}>
                <Pressable
                  onPress={() =>
                    navigation.navigate('ProductDetail', {id: product.id})
                  }>
                  <View style={styles.card} key={product.id}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={{uri: product.image}}
                        style={styles.image}
                      />
                    </View>
                    <View style={styles.infoContainer}>
                      <Text
                        style={styles.title}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {product.title}
                      </Text>
                      <Text
                        style={styles.description}
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {product.description}
                      </Text>
                      <Text style={styles.price}>$ {product.price}</Text>
                      <Text style={styles.shipping}>Free shipping</Text>
                    </View>
                  </View>
                </Pressable>
                <TouchableOpacity
                  style={styles.buttonCart}
                  disabled={isAdded(product)}
                  onPress={() => handleAddToCart(product)}>
                  <Text
                    style={{
                      color: '#fc5a03',
                      fontSize: 16,
                      fontWeight: '700',
                    }}>
                    {isAdded(product) ? 'Added to cart' : 'Add to cart'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    margin: 15,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  card: {
    flexDirection: 'row',
    width: '100%',
    marginVertical: 5,
    padding: 10,
    paddingBottom: 0,
  },
  imageContainer: {
    flex: 1,
  },
  infoContainer: {
    flex: 2,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  price: {
    fontSize: 18,
    color: '#000000',
  },
  description: {
    fontSize: 13,
    color: '#000000',
    textAlign: 'justify',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  shipping: {
    fontSize: 12,
    color: '#178a00',
    fontWeight: 'bold',
  },
  buttonCart: {
    marginVertical: 10,
    backgroundColor: '#FDCBB2',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginHorizontal: 15,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    paddingLeft: 15,
    color: '#000000',
    
  },
});

export default ListProducts;
