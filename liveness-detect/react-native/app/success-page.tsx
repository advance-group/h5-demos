import { View, Text, StyleSheet } from 'react-native';

export default function SuccessPage() {
  return (
    <View style={styles.container}>
      <Text>Liveness Success</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
