import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function StudySet({ title, children }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleCollapse}>
        <Text style={styles.title}>{[title]}
          [Study Set placeholder]
        </Text>
      </TouchableOpacity>
      {!isCollapsed && (
        <View style={styles.content}>
          {children}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    marginBottom: 35,
    backgroundColor: '#afeeee',
    borderRadius: 5,
    padding: 5,
    maxWidth: 500,
    maxHeight: 'auto',
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
    margin: 10
  },
  content: {
    overflow: 'auto',
    marginTop: 20,
    marginBottom: 20,
  },
});
