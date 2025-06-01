import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';

interface Props {
  title: string;
  backgroundColor: string;
  icon: any;
  onPress?: () => void;
}

const ActionButtonTwo: React.FC<Props> = ({ title, backgroundColor, icon }) => (
  <TouchableOpacity style={[styles.button, { backgroundColor }]}>
    <Text style={styles.text}>{title}</Text>
    <Image source={icon} style={styles.icon} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    color: '#000',
    fontWeight: '500',
  },
  icon: {
    width: 70,
    height: 62,
  },
});

export default ActionButtonTwo;