import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";

import CartItem from "../components/CartItem";
import { colors } from "../global/colors";
import { useDispatch, useSelector } from "react-redux";
import { usePostOrderMutation } from "../services/orders";
import { clearCart } from "../features/cart/cartSlice";
import NoContent from "./NoContent";
import { toCurrency } from "../utils/string-utils";

const Cart = ({ navigation }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const localId = useSelector((state) => state.auth.localId);
  const [triggerPostOrder] = usePostOrderMutation();

  const handleAddOrder = () => {
    const createdAt = new Date().toLocaleString();
    const order = {
      ...cart,
      createdAt,
    };
    triggerPostOrder({ localId, order });
    dispatch(clearCart());
    navigation.navigate("OrdersStack");
  };
  if (cart.total === 0) {
    return <NoContent />;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={cart.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItem item={item} />}
      />
      <View style={styles.containerConfirm}>
        <Pressable onPress={handleAddOrder}>
          <Text style={styles.textConfirm}>Confirmar</Text>
        </Pressable>
        <Text style={styles.textConfirm}>Total: {toCurrency(cart.total)}</Text>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
  containerConfirm: {
    backgroundColor: colors.blue2,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textConfirm: {
    color: "white",
    fontSize: 20,
  },
});
