import { View, Text, StyleSheet } from 'react-native';

export default function PailPage() {
  return (
    <View style={styles.container}>
      <Text>Liveness Failed</Text>
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
