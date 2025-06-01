import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { journeyPrompt } from './ChatPrompt';

export function ChatCard() {
  const [tab, setTab] = useState<'chat' | 'journey'>('chat');
  const [input, setInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: string, content: string }[]>([]);
  const [journeyMessages, setJourneyMessages] = useState<{ role: string, content: string }[]>([]);

 const sendMessage = async () => {
  if (!input) return;

  const userMessage = { role: 'user', content: input };

  const currentMessages = tab === 'journey' ? journeyMessages : chatMessages;
  const setCurrentMessages = tab === 'journey' ? setJourneyMessages : setChatMessages;

  const prompt =
    tab === 'journey'
      ? journeyPrompt(input) + '\nPlease limit your response to no more than 60 words.'
      : input + '\nPlease limit your response to no more than 60 words.';

  const updatedMessages = [...currentMessages, userMessage];
  setCurrentMessages(updatedMessages); // Add user's message to state

  try {
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
          ...updatedMessages,
          { role: 'user', content: prompt }
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
  }

  setInput('');
};


  const messages = tab === 'journey' ? journeyMessages : chatMessages;

  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setTab('chat')} style={[styles.tab, tab === 'chat' && styles.activeTab]}>
          <Text style={styles.tabText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('journey')} style={[styles.tab, tab === 'journey' && styles.activeTab]}>
          <Text style={styles.tabText}>Journey</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.chatBox}>
        {(tab === 'journey' ? journeyMessages : chatMessages).map((msg, idx) => (
          <View key={idx} style={msg.role === 'user' ? styles.userMsg : styles.aiMsg}>
            <Text style={styles.msgText}>{msg.content}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={styles.input}
          placeholder="Message"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={{ color: 'white' }}>➤</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2ede8',
    borderRadius: 5,
    padding: 10,
    height: 450,
    width: 340,
    marginLeft: -20
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tab: {
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
  chatBox: {
    flex: 1,
    marginBottom: 10
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
  }
});
