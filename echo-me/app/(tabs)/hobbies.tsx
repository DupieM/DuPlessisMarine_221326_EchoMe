import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import axios from 'axios';
import { HobbyDropdown } from '@/components/screen_hobbies/HobbyDropdown';
import { HobbyCard } from '@/components/screen_hobbies/HobbyCard';
import { ShowcaseData } from '@/components/screen_hobbies/HobbyPrompt';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';

// Defines the message type and gets the screen height.
type Message = {
  sender: 'user' | 'bot';
  text: string;
};

const { height: screenHeight } = Dimensions.get('window');

export default function HobbiesScreen() {
  const [selectedHobby, setSelectedHobby] = useState(ShowcaseData.Hobby[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatScrollViewRef = useRef<ScrollView>(null);

  const API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

  // Sends a message to OpenAI's GPT-3.5-turbo model and returns the bot's response.
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

  // Handles sending a user message, updating chat messages, and fetching a response from OpenAI.
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
        chatScrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  // Renders the main UI for the Hobbies Screen, including hobby selection, a hobby card, and a chat interface.
  return (
    <ScrollView style={styles.mainScrollView} nestedScrollEnabled={true}>
      <ThemedView style={styles.titleContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.pageTitle}>My Hobbies</Text>
          <Text style={styles.descriptionText}>
            Curious how I unwind and stay motivated? Here are a few of my favorite hobbies that keep me going.
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
            <Text style={styles.chatTitle}>Ask me about my hobbies:</Text>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              keyboardVerticalOffset={90}
              style={{ flex: 1 }}
            >
              <ScrollView
                ref={chatScrollViewRef}
                style={styles.chatScrollView}
                contentContainerStyle={styles.chatContentContainer}
                onContentSizeChange={() => chatScrollViewRef.current?.scrollToEnd({ animated: true })}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled={true}
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
                  <Text style={{ color: 'white' }}>➤</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
      </ThemedView>
    </ScrollView>
  );
}

// Defines the stylesheets for the components.
const styles = StyleSheet.create({
  mainScrollView: {
    flex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingBottom: 20,
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
    marginTop: 30,
    paddingHorizontal: 16,
    width: '100%',
  },
  chatContainer: {
    marginTop: 4,
    backgroundColor: '#f2ede8',
    borderRadius: 10,
    padding: 10,
    height: screenHeight * 0.5,
    justifyContent: 'space-between',
  },
  chatScrollView: {
    flex: 1,
    marginBottom: 10,
  },
  chatContentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
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
    backgroundColor: '#4c2a85',
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#2A144A',
  },
  messageText: {
    fontSize: 16,
    color: 'white'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    width: '100%',
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  sendButton: {
    marginLeft: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#e157c4',
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});