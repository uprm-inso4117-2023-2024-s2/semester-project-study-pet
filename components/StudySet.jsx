import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function StudySet({ title, children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>[Study Set placeholder]</Text>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    marginBottom: 35,
    backgroundColor: '#fff',
    padding: 5,
    maxWidth: 500,
    width: 330,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity:  0.4,
    shadowRadius: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    maxWidth: 600,
    textAlign: 'center',
    marginTop: 20,
  },
  content: {
    marginTop: 20,
    marginBottom: 20,
  },
});
