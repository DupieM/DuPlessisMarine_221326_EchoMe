import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';
import { HobbyDropdown } from '@/components/screen_hobbies/HobbyDropdown';
import { HobbyCard } from '@/components/screen_hobbies/HobbyCard';
import { ShowcaseData } from '@/components/screen_hobbies/HobbyPrompt';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';

type Message = {
  sender: 'user' | 'bot';
  text: string;
};

export default function HobbiesScreen() {
  const [selectedHobby, setSelectedHobby] = useState(ShowcaseData.Hobby[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

  const askOpenAI = async (userMessage: string, hobbyDescription: string): Promise<string> => {
    const systemPrompt = `You are a friendly assistant. Answer questions based on the hobby: "${hobbyDescription}" '\nPlease limit your response to no more than 40 words.'`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content.trim();
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const botText = await askOpenAI(input, selectedHobby.description);
      const botMsg: Message = { sender: 'bot', text: botText };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error('OpenAI request failed:', error);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, something went wrong.' }]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <ScrollView>
      <ThemedView style={styles.titleContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.pageTitle}>My Hobbies</Text>
          <Text style={styles.descriptionText}>
            View a list of my hobbies that I like to do in my free time
          </Text>
        </View>

        <View style={styles.container}>
          <HobbyDropdown
            options={ShowcaseData.Hobby}
            onSelect={setSelectedHobby}
            selected={selectedHobby}
          />

          <HobbyCard
            imageSource={selectedHobby.image}
            description={selectedHobby.description}
          />

          <View style={styles.chatContainer}>
            <Text style={styles.chatTitle}>Ask me about this hobby:</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              keyboardVerticalOffset={90}
              style={{ flex: 1 }}
            >
              <ScrollView
                ref={scrollViewRef}
                style={styles.chatContainertwo}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                keyboardShouldPersistTaps="handled"
              >
                {messages.map((msg, index) => (
                  <View
                    key={index}
                    style={[
                      styles.messageBubble,
                      msg.sender === 'user' ? styles.userBubble : styles.botBubble,
                    ]}
                  >
                    <Text style={styles.messageText}>{msg.text}</Text>
                  </View>
                ))}
                {loading && <ActivityIndicator size="small" color="#888" />}
              </ScrollView>

              <View style={styles.inputContainer}>
                <TextInput
                  value={input}
                  onChangeText={setInput}
                  style={styles.input}
                  placeholder="Message"
                  onSubmitEditing={handleSend}
                  returnKeyType="send"
                />
                <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>

      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
   titleContainer: {
    alignItems: 'center',
  },
  headerContent: {
    width: 300,
    height: 160,
    marginBottom: 20
  },
  pageTitle: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#1E1924',
    marginBottom: 10,
    textAlign: 'center',
    fontStyle: 'italic'
  },
  descriptionText: {
    fontSize: 23,
    color: '#1E1924',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  chatContainer: {
    marginTop: 4,
    backgroundColor: '#F3ECE4',
    borderRadius: 10,
    padding: 10,
    maxHeight: 400,
    flexGrow: 1,
  },
  chatContainertwo: {
    maxHeight: 300,
  },
  chatTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  messageBubble: {
    marginVertical: 6,
    padding: 10,
    borderRadius: 8,
    maxWidth: '80%',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    bottom: 0,
    width: 300,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
  },
  sendButton: {
    marginLeft: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
