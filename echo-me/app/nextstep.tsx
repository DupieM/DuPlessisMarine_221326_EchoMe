import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function NextStepScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What’s next?</Text>
      <Text style={styles.subtitle}>Do you wanna chat about something specific to you (University, general questions).</Text>
      <TouchableOpacity style={styles.option} onPress={() => router.push('/chat')}>
        <Text style={styles.optionText}>Chat</Text>
      </TouchableOpacity>

      <Text style={styles.titletwo}>or</Text>

      <Text style={styles.subtitletwo}>
        Do you want to explore my the hobbies I have or view and projects I made.
      </Text>
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
    fontSize: 55, 
    fontWeight: 'bold', 
    marginBottom: 10,
    color: '#1E1924'
  },
  subtitle: { 
    fontSize: 25, 
    color: '#1E1924', 
    marginBottom: 10, 
    textAlign: 'center' 
  },
  titletwo: { 
    fontSize: 30, 
    marginBottom: 10,
    color: '#1E1924',
    fontStyle: 'italic',
    marginTop: 20
  },
  subtitletwo: { 
    fontSize: 25, 
    color: '#1E1924', 
    marginBottom: 10, 
    marginTop: 10,
    textAlign: 'center' 
  },
  option: {
    backgroundColor: '#F34BC0',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 15,
  },
  optionText: { 
    color: '#F3ECE4', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
});
