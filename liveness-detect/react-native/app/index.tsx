import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading2}>Home Page</Text>
      <Text></Text>
      <Text></Text>
      <Link style={styles.link} href="/webview/liveness-detect">Go to liveness-detect</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    color: 'blue',
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  }
});
