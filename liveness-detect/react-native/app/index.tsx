import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading2}>Page 1 (OCR)</Text>
      <Text></Text>
      <Text></Text>
      <Link style={styles.link} href={{ pathname: '/webview/liveness-detect', params: { tokenUrl: "YOUR_LINVESS_URL"  } }}>Go to liveness-detect</Link>
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
