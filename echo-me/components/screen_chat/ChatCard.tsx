import React, { useState, useEffect, useRef, useCallback } from 'react'; // Import useCallback
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Keyboard } from 'react-native';
import { journeyPrompt } from '@/components/screen_chat/ChatPrompt';
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useFocusEffect } from 'expo-router'; // Make sure useFocusEffect is imported

export function ChatCard() {
  // creating const varibles to call functions and data
  const [tab, setTab] = useState<'chat' | 'journey'>('journey');
  const [input, setInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: string, content: string }[]>([]);
  const [journeyMessages, setJourneyMessages] = useState<{ role: string, content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const { initialPrompt } = useLocalSearchParams<{ initialPrompt?: string }>();

  // Use a ref to track if the initial prompt has been processed to avoid re-processing
  const initialPromptHandled = useRef(false);
  // Use a ref to store the *last processed* initialPrompt to prevent re-processing the *same* prompt
  const lastProcessedPrompt = useRef<string | undefined>(undefined);


  // Function to generate a user-like question from the journey prompt
  const generateUserQuestionFromPrompt = async (promptText: string) => {
    setIsLoading(true);
    try {
      // ... (rest of your generateUserQuestionFromPrompt function remains the same)
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `Rephrase the following statement into a natural, common question a university student might ask. 
                        For example, if the statement is "Understanding essay structures," a good question would be 
                        "How can I understand essay structures better?" Or if it's "Balancing academics and social life",
                        it could be "How do I balance my studies with my social life?". 
                        Keep it concise and conversational. Do not answer the question, just rephrase it as a question.`
            },
            { role: 'user', content: promptText }
          ],
          temperature: 0.5,
          max_tokens: 50
        }),
      });

      const data = await response.json();
      const generatedQuestion = data.choices?.[0]?.message?.content?.trim() || promptText;

      setJourneyMessages(prev => [...prev, { role: 'user', content: generatedQuestion }]);
      sendMessage(generatedQuestion, true);
    } catch (error) {
      console.error("Error generating user question:", error);
      setJourneyMessages(prev => [...prev, { role: 'user', content: promptText }]);
      sendMessage(promptText, true);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to handle the initial prompt coming from JourneyScreen
  // This will now only trigger if initialPrompt is present AND it's a new prompt or hasn't been handled
  useEffect(() => {
    if (initialPrompt && initialPrompt !== lastProcessedPrompt.current) {
        setTab('journey');
        generateUserQuestionFromPrompt(initialPrompt);
        lastProcessedPrompt.current = initialPrompt; 
    }
  }, [initialPrompt]); 

  // Use useFocusEffect to reset the lastProcessedPrompt when the screen loses focus
  useFocusEffect(
    useCallback(() => {
      return () => {
        // This runs when the screen is unfocused
        lastProcessedPrompt.current = undefined; 
        initialPromptHandled.current = false; 
      };
    }, [])
  );

  // ... rest of your ChatCard component (sendMessage, messages useEffect, handleRefreshChat, handleRefreshJourney, return statement) ...

  const sendMessage = async (messageContent?: string, isInitialAITriggered: boolean = false) => {
    const textToSend = messageContent || input.trim();
    if (!textToSend) return;

    const userMessage = { role: 'user', content: textToSend };

    const currentMessages = tab === 'journey' ? journeyMessages : chatMessages;
    const setCurrentMessages = tab === 'journey' ? setJourneyMessages : setChatMessages;

    if (!isInitialAITriggered) {
      setCurrentMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');
    }

    setIsLoading(true);

    try {
      const promptToAI =
        tab === 'journey'
          ? journeyPrompt(textToSend) + '\nPlease limit your response to no more than 60 words.'
          : textToSend + '\nPlease limit your response to no more than 60 words.';

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content:
                tab === 'journey'
                  ? 'You are a university student giving advice based on their personal university experience.'
                  : 'You are a helpful and knowledgeable AI assistant.'
            },
            ...currentMessages,
            { role: 'user', content: promptToAI }
          ],
          temperature: 0.7
        })
      });

      const data = await response.json();
      console.log('OpenAI API Response:', data);

      if (!data.choices || !data.choices.length) {
        throw new Error('Invalid OpenAI response');
      }

      const reply = data.choices[0].message.content || 'No response';
      setCurrentMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('Chat Error:', err);
      setCurrentMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong while contacting OpenAI.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const messages = tab === 'journey' ? journeyMessages : chatMessages;

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages, isLoading]);

  const handleRefreshChat = () => {
    setChatMessages([]);
    setInput('');
    setIsLoading(false);
  };

  const handleRefreshJourney = () => {
    setJourneyMessages([]);
    setInput('');
    setIsLoading(false);
    initialPromptHandled.current = false; // Reset for potential new journey prompts
    lastProcessedPrompt.current = undefined; // Also clear this on refresh
  };

  return (
    <View style={styles.mainbox}>
      <View style={styles.container}>
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setTab('journey')} style={[styles.tab, tab === 'journey' && styles.activeTab]}>
            <Text style={styles.tabText}>My Journey</Text>
            {tab === 'journey' && (
              <TouchableOpacity onPress={handleRefreshJourney} style={styles.refreshIcon}>
                <MaterialIcons name="refresh" size={20} color="white" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setTab('chat')} style={[styles.tab, tab === 'chat' && styles.activeTab]}>
            <Text style={styles.tabText}>Ask Me Anything</Text>
            {tab === 'chat' && (
              <TouchableOpacity onPress={handleRefreshChat} style={styles.refreshIcon}>
                <MaterialIcons name="refresh" size={20} color="white" />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.chatBox}
          contentContainerStyle={{ paddingBottom: 0 }}
          scrollEnabled={true}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map((msg, idx) => (
            <View key={idx} style={msg.role === 'user' ? styles.userMsg : styles.aiMsg}>
              <Text style={styles.msgText}>{msg.content}</Text>
            </View>
          ))}
          {isLoading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="small" color="#4c2a85" />
            </View>
          )}
        </ScrollView>

        <View style={styles.inputRow}>
          <TextInput
            value={input}
            onChangeText={setInput}
            style={styles.input}
            placeholder="Message"
            onSubmitEditing={() => sendMessage()}
            blurOnSubmit={false}
          />
          <TouchableOpacity onPress={() => sendMessage()} style={styles.sendButton} disabled={isLoading}>
            <Text style={{ color: 'white' }}>➤</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainbox: {
    marginBottom: 29
  },
  container: {
    marginTop: 10,
    backgroundColor: '#f2ede8',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    height: '100%',
    width: 340,
    marginLeft: -20,
    marginBottom: 9.9
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    backgroundColor: '#d3cce3'
  },
  activeTab: {
    backgroundColor: '#4c2a85'
  },
  tabText: {
    color: 'white',
    fontWeight: 'bold'
  },
  refreshIcon: {
    marginLeft: 8,
  },
  chatBox: {
    height: 290,
  },
  scrollContent: {
    paddingVertical: 10
  },
  userMsg: {
    alignSelf: 'flex-end',
    backgroundColor: '#4c2a85',
    padding: 8,
    borderRadius: 10,
    marginBottom: 5
  },
  aiMsg: {
    alignSelf: 'flex-start',
    backgroundColor: '#6942a8',
    padding: 8,
    borderRadius: 10,
    marginBottom: 5
  },
  msgText: {
    color: 'white'
  },
  inputRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#e157c4',
    padding: 10,
    borderRadius: 20,
    width: 50,
    alignItems: 'center'
  },
  loaderContainer: {
    alignSelf: 'center',
    marginVertical: 10,
  }
});