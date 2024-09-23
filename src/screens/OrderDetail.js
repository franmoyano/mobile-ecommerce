import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetOrderByUserQuery } from "../services/orders";
import NoContent from "./NoContent";
import { colors } from "../global/colors";
import { toCurrency } from "../utils/string-utils";

const OrderDetail = ({ route }) => {
  const { id } = route.params;
  const localId = useSelector((state) => state.auth.localId);
  const { data: order, isSuccess } = useGetOrderByUserQuery({
    localId,
    orderId: id,
  });

  useEffect(() => {
    if (isSuccess) console.log(order);
  }, [isSuccess]);

  if (!order) {
    return <NoContent />;
  }

  return (
    <View>
      <Text style={styles.date}>Fecha: {order.createdAt}</Text>
      <Text style={styles.total}>Total: {toCurrency(order.total)}</Text>
      <FlatList
        data={order.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>{toCurrency(item.price)}</Text>
            <Text style={styles.price}>Cantidad: {item.quantity}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  date: {
    fontSize: 16,
    textAlign: "center",
  },
  listItem: {
    backgroundColor: colors.blue1,
    width: "90%",
    margin: "auto",
    borderRadius: 4,
    marginTop: 4,
    padding: 15,
  },
  title: {
    fontSize: 20,
    color: "#FFF",
  },
  price: {
    color: "#FFF",
  },
  total: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 15,
  },
});
