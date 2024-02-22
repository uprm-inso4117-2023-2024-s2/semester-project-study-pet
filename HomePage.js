import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';

const VerticalStripes = ({ numberOfStripes }) => {
  return (
    <View style={styles.stripesContainer}>
      {Array.from({ length: numberOfStripes }, (_, index) => (
        <View
          key={index}
          style={[
            styles.verticalStripe,
            { backgroundColor: index % 2 === 0 ? '#badeea' : '#e1e5f2' }, // Alternando colores
          ]}
        />
      ))}
    </View>
  );
};

const HomePage = () => {

  return (
    <View style={{flex: 1, paddingTop: 20, backgroundColor: '#f7ffe7'}}>
      <LinearGradient colors={['#f7ffe7', '#edf5ff']} style={styles.container}>
        
        <View style={styles.topButtons}>
          <TouchableOpacity style={styles.iconButton}><Ionicons name="paw" size={30} color="#517fa4" /></TouchableOpacity> 
          <TouchableOpacity style={styles.iconButton}><Ionicons name="stats-chart" size={30} color="#517fa4" /></TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}><Ionicons name="book" size={30} color="#517fa4" /></TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}><Ionicons name="settings" size={30} color="#517fa4" /></TouchableOpacity>
        </View>

        <View style={styles.petContainer}>
          <VerticalStripes numberOfStripes={7} />
          <Text style={styles.petPlaceholder}>Firulai vive aqui</Text>
        </View>

        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.iconButton}><FontAwesome6 name="soap" size={30} color="#cdb4db" /></TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}><MaterialCommunityIcons name="cupcake" size={30} color="#ffafcc" /></TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}><Ionicons name="game-controller" size={30} color="#a2d2ff" /></TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },

  petContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    margin: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden', 
    position: 'relative',
  },
  stripesContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  verticalStripe: {
    flex: 1, 
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.7)', // A semi-transparent white for the icon button background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default HomePage;
