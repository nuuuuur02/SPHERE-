import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import ResourcesList from '../../components/ResourcesList';

const RecursosScreen = () => {
  return (
    <SafeAreaView>
        <ScrollView>
        <ResourcesList />
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  volumeControl: {
    alignItems: 'center',
    marginBottom: 20,
  },
  volumeLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  slider: {
    width: 200,
  },
});

export default RecursosScreen;