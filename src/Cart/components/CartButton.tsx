import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native';

function CartButton() {
  const navigation = useNavigation();

  return (
    <Button
      onPress={() => navigation.navigate('ShoppingCart')}
      title="🛒"
      color="#fff"
    />
  );
}

export default CartButton;
