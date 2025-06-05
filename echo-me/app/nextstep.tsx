import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function NextStepScreen() {
  const router = useRouter();

  // Renders a screen presenting navigation options to the user, allowing them to choose their next step.
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What’s next?</Text>

      <Text style={styles.subtitle}>Do you want to continue with exploring my academic journey?</Text>
      <TouchableOpacity style={styles.option} onPress={() => router.push('/journey')}>
        <Text style={styles.optionText}>Journey</Text>
      </TouchableOpacity>

      <Text style={styles.titletwo}>or</Text>

      <Text style={styles.subtitle}>Do you want to chat about my journey or ask for guidance?</Text>
      <TouchableOpacity style={styles.option} onPress={() => router.push('/chat')}>
        <Text style={styles.optionText}>Chat</Text>
      </TouchableOpacity>

      <Text style={styles.titletwo}>or</Text>

      <Text style={styles.subtitletwo}>
        Do you want to explore my university projects or view my hobbies?
      </Text>
      <TouchableOpacity style={styles.optiontwo} onPress={() => router.push('/showcase')}>
        <Text style={styles.optionText}>Projects</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.optionthree} onPress={() => router.push('/hobbies')}>
        <Text style={styles.optionText}>Hobbies</Text>
      </TouchableOpacity>
    </View>
  );
}

// Defines the stylesheets for the components.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 13,
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
    fontSize: 25,
    marginBottom: 7,
    color: '#1E1924',
    fontStyle: 'italic',
    marginTop: 7
  },
  subtitletwo: {
    fontSize: 25,
    color: '#1E1924',
    marginBottom: 10,
    marginTop: 0,
    textAlign: 'center'
  },
  option: {
    backgroundColor: '#F34BC0',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 15,
  },
  optiontwo: {
    backgroundColor: '#F34BC0',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: 15,
    marginLeft: -160
  },
  optionthree: {
    backgroundColor: '#F34BC0',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginTop: -50,
    marginLeft: 150
  },
  optionText: {
    color: '#F3ECE4',
    fontSize: 16,
    fontWeight: 'bold'
  },
});