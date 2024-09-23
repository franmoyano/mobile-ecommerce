import { StyleSheet, View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import { useGetProductsQuery } from "../services/shop";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductItem from "../components/ProductItem"

const ItemListCategories = ({ route }) => {
  const { category } = route.params;
  const {
    data: products,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetProductsQuery(category);
  const [productsFiltered, setProductsFiltered] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setProductsFiltered(products);
    }
  }, [category, isSuccess]);

  const onSearch = (input) => {
    if (input) {
      setProductsFiltered(
        productsFiltered.filter((product) => product.title.includes(input))
      );
    } else {
      setProductsFiltered(products);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) {
    console.log(isError)
    console.log(error)
    return (
      <View>
        <Text>{error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Search onSearch={onSearch} />
      <FlatList
        data={productsFiltered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductItem product={item} />}
      />
    </View>
  );
};

export default ItemListCategories;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
