import { View, Text, StyleSheet } from 'react-native';

export default function VerificationResultPage() {
  return (
    <View style={styles.container}>
      <Text>Verification result</Text>
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
