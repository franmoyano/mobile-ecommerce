import { StyleSheet, Text, View } from "react-native";

const NoContent = () => {
  return (
    <View style={styles.view}>
      <Text style={styles.mainText}>No hay nada por aquí 😥</Text>
    </View>
  );
};

export default NoContent;

const styles = StyleSheet.create({
  view: {
    display: "flex",
    height: 300,
    justifyContent: "center",
  },
  mainText: {
    fontSize: 22,
    textAlign: "center",
  },
});
