import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function NextStepScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What’s next?</Text>
      <Text style={styles.subtitle}>Choose how you'd like to continue.</Text>
      <TouchableOpacity style={styles.option} onPress={() => router.push('/chat')}>
        <Text style={styles.optionText}>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => router.push('/showcase')}>
        <Text style={styles.optionText}>Projects</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => router.push('/hobbies')}>
        <Text style={styles.optionText}>Hobbies</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#A6BCE6' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  subtitle: { 
    fontSize: 16, 
    color: '#666', 
    marginBottom: 30, 
    textAlign: 'center' 
  },
  option: {
    backgroundColor: '#ba1fa4',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 15,
  },
  optionText: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
});
